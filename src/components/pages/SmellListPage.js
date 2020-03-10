import React, { Component } from 'react';
import Select from 'react-select';
import {
    MDBCol,
    MDBRow,
    MDBDropdownMenu,
    MDBDropdownItem,
    MDBDropdown,
    MDBDropdownToggle,
    MDBCardHeader, MDBCardBody, MDBCard, MDBTable, MDBTableHead, MDBTableBody
} from 'mdbreact';
import {Line} from "react-chartjs-2";

const SERVER_IP = process.env.REACT_APP_ATD_TOOL_SERVER_IP
// TODO:
// - [done] add project selection
// - [done] fix visualization
// - [] pagination with table https://mdbootstrap.com/docs/react/tables/pagination/
// - [] integrate into dashboard
// - [] add components


class SmellList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error: false,
            hasMore: true,
            isLoading: false,
            modal: false,
            project: "",
            smells: [],
            versions: {},
            components: [], 
            smellTypes: ["Cyclic Dependency", "Unstable Dependency", 
                        "Hublike Dependency", "God Component"],
            smellColours: ["rgba(55,43,96,1)", "rgba(235,94,85,1)", "rgba(98,195,112,1)", "rgba(242,220,93,1)"]
        };
    }

    updatedProject = (project) => {
        this.setState({project: project});
        console.log("In updated project: " + project);
        this.loadData(project);
    }

    loadData(project) {
        var url = SERVER_IP + "/system?system="+project
        console.log("Requesting data for " + project + " " + url)
        fetch(url)
            .then(res => res.json())
            .then(system => {
                console.log("Data for project: " + project)
                this.setState( {smells: system.system.smells, versions: system.system.versions, components: system.system.components});
            });
    }

    calculateLine() {
        const smellCount = {};
        this.state.smellTypes.forEach(t => {
            smellCount[t] = {}
            Object.keys(this.state.versions).forEach(v => smellCount[t][v] = 0)
        });
        for(const smell of this.state.smells){
            for(const version of smell.spanningVersions) {
                smellCount[smell.type][version] += 1;
            }
        }
        const dataLine = { labels: Object.keys(this.state.versions), datasets:[]}
        this.state.smellTypes.forEach((t, index) => {
            var dataset = {
                label: t, // series name
                fill: false,
                pointStrokeColor: 'rgba(38,84,124,1)',
                pointHighlightFill: 'rgba(38,84,124,1)',
                pointHighlightStroke: 'rgba(38,84,124,1)',
                lineTension: 0.1,
                backgroundColor: this.state.smellColours[index],
                borderColor: this.state.smellColours[index],
                borderCapStyle: 'butt',
                borderDash: [],
                borderDashOffset: 0.0,
                borderJoinStyle: 'miter',
                pointBorderColor: '#467a39',
                pointBackgroundColor: '#fff',
                pointBorderWidth: 1,
                pointHoverRadius: 5,
                pointHoverBackgroundColor: this.state.smellColours[index],
                pointHoverBorderColor: '#121212',
                pointHoverBorderWidth: 2,
                pointRadius: 1,
                pointHitRadius: 10,
                data: Object.values(smellCount[t]) // series data
            }
            dataLine.datasets.push(dataset);
        })
        return dataLine;
    }

    render(){
        const dataLine = this.calculateLine();
        return (
            <React.Fragment>
            <MDBRow style={{marginBottom: 15}}>
                <MDBCol md="8">
                    <ProjectSelector onProjectChange={this.updatedProject}></ProjectSelector>
                </MDBCol>
            </MDBRow>
            
            <MDBRow>
                <MDBCol md="8">
                    <MDBCard>
                        <MDBCardHeader>Project: {this.state.project}</MDBCardHeader>
                        <MDBCardBody>
                            <MDBCard style={{marginBottom: 5}}>
                                <MDBCardHeader>Smells over time</MDBCardHeader>
                                <MDBCardBody>
                                    <Line data={dataLine} height={100}  />
                                </MDBCardBody>
                            </MDBCard>
                            <React.Fragment>
                                {this.state.smells.map((smell, index) => (
                                    <Smell
                                        key = {index}
                                        id={smell.id}
                                        characteristics={smell.characteristics}
                                        spanningVersions={smell.spanningVersions}
                                        age={smell.age}
                                        firstVersionAppeared={smell.firstVersionAppeared}
                                        lastVersionDetected={smell.lastVersionDetected}
                                        affectedComponents={smell.affectedComponents}
                                        type={smell.type}
                                        first={smell.first}
                                        last={smell.last}
                                    />
                                ))}
                            </React.Fragment>
                        </MDBCardBody>
                    </MDBCard>
                </MDBCol>
            </MDBRow>
            </React.Fragment>
        )
    }
}

class Smell extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
        };

    }

    toggle() {
        this.setState({
            open: !this.state.open
        });
    }

    render() {
        return (
            <MDBCard style={{marginBottom: 5}}>
                <MDBCardBody className="w-100">
                        <MDBRow className="w-100" style={{marginTop: 5}}>
                            <MDBCol className="w-100" style={{backgroundColor: "white", padding: 5}}>
                                <MDBTable bordered striped>
                                    <MDBTableHead>
                                        <tr>
                                            <th>ID</th>
                                            <th>Type</th>
                                            <th>Age</th>
                                            <th>Affects</th>
                                            <th>Commit first appeared</th>
                                            <th>Commit last detected</th>
                                        </tr>
                                    </MDBTableHead>
                                    <MDBTableBody>
                                        <tr>
                                            <td className="font-weight-bold">{this.props.id}</td>
                                            <td>{this.props.type}</td>
                                            <td>{this.props.age}</td>
                                            <td>{this.props.characteristics[Object.keys(this.props.characteristics)[0]]['Affected Component Type']}</td>
                                            <td>{this.props.firstVersionAppeared}</td>
                                            <td>{this.props.lastVersionDetected}</td>
                                        </tr>
                                    </MDBTableBody>
                                </MDBTable>
                                <button className="btn sdk4ed-color" 
                                        onClick={this.toggle.bind(this)}>  
                                Historical Details
                                </button>
                                </MDBCol>
                        </MDBRow>
                        <div id="outer" className={"collapse" + (this.state.open ? ' in' : '')} style={{marginBottom: 5, paddingBottom: 5}}>
                            {<Versions
                                spanningVersions = {this.props.spanningVersions.reverse()}
                                characteristics = {this.props.characteristics}
                                affectedComponents = {this.props.affectedComponents}
                            />}
                        </div>
                </MDBCardBody>
            </MDBCard>
        );
    }
}

class Versions extends Component {
    constructor(props) {
        super(props);
        this.state = {
            version: this.props.spanningVersions[0]
        };
    }

    handleClick(item) {
        this.setState({version: item})
    }

    render() {
        return(
            <React.Fragment>
                <MDBDropdown>
                    <MDBDropdownToggle caret className="white-text" color="  light-green darken-4">
                        Version {this.state.version}
                    </MDBDropdownToggle>
                    <MDBDropdownMenu basic>
                            {this.props.spanningVersions.map((item) => (
                                <MDBDropdownItem key={item} onClick={() => this.handleClick(item)}>{item}</MDBDropdownItem>
                            ))}
                    </MDBDropdownMenu>
                </MDBDropdown>
                <VersionDetails
                    version = {this.state.version}
                    characteristics = {this.props.characteristics[this.state.version]}
                    affectedComponents = {this.props.affectedComponents[this.state.version]}
                />
            </React.Fragment>
        );
    }
}

class VersionDetails extends Component {
    constructor(props) {
        super(props);
    }

    format(item) {
        /* if item is a number it rounds with max 4 fraction decimals */
        if (!isNaN(item)) {
            return parseFloat(parseFloat(item).toFixed(4));
        }
        return item;
    }

    render() {
        return(
            <MDBRow>
                <MDBCol md="8">
                    <table className="table table-striped table-bordered">
                        <thead>
                            <tr>
                                <th scope="col">Parameter</th>
                                <th scope="col">Value</th>
                            </tr>
                        </thead>
                        <tbody>
                            {Object.keys(this.props.characteristics).map((item) => (
                                <tr key={item}>
                                    <td>{item}</td>
                                    <td>{this.format(this.props.characteristics[item])}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </MDBCol>
                <MDBCol md="4">
                    <table className="table table-striped table-bordered">
                        <thead>
                        <tr>
                            <th scope="col">Affected Components</th>
                        </tr>
                        </thead>
                        <tbody>
                            {this.props.affectedComponents.map(item => (
                                <tr key={item}>
                                    <td>{item}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </MDBCol>
            </MDBRow>
        );
    }
}

class ProjectSelector extends Component {
    constructor(props){
        super(props)
        this.state = {
            selected: "no-project",
            projects: []
        }
        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount(){
        this.getProjectsList();
        if(this.state.projects.length > 0){
            this.setState({select: this.state.projects[0]})
        }
    }

    handleChange(optionSelected){
        this.setState({selected: optionSelected.value})
        console.log("Changed state " + this.state.selected + " " + optionSelected.value)
        this.props.onProjectChange(optionSelected.value);
    }

    getProjectsList(){
        var url = SERVER_IP + "/projects"
        console.log("Requesting projects " + url);
        fetch(url)
            .then(res => res.json())
            .then(projects => {
                var projOptions = []
                projects.projects.forEach(e => projOptions.push({value: e, label: e}))
                console.log(projOptions)
                this.setState({projects: projOptions})
            })
    }

    render(){
        return (
            <React.Fragment>
                <MDBCard>
                <MDBCardHeader>Choose an analysed project</MDBCardHeader>
                <MDBCardBody>
                    <div>
                        <label>Pick the project to show:
                        <Select 
                            value={this.state.selected}
                            options={this.state.projects} 
                            onChange={this.handleChange} />
                        </label>
                    </div>
                </MDBCardBody>
                </MDBCard>
            </React.Fragment>);
    }
}

export default SmellList;