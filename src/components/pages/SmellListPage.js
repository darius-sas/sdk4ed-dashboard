import React, { Component } from 'react';
import {
    MDBCol,
    MDBRow,
    MDBDropdownMenu,
    MDBDropdownItem,
    MDBDropdown,
    MDBDropdownToggle,
    MDBCardHeader, MDBCardBody, MDBCard
} from 'mdbreact';
import {Line} from "react-chartjs-2";
import debounce from "lodash.debounce";

const SERVER_IP = process.env.REACT_APP_ATD_TOOL_SERVER_IP
// TODO:
// - add project selection
// - 


class SmellList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error: false,
            hasMore: true,
            isLoading: false,
            modal: false,
            page: 1,
            project: "",
            smells: []
        };
        window.onscroll = debounce(() => {
            const {
                loadSmells,
                state: {
                    error,
                    isLoading,
                    hasMore,
                },
            } = this;

            if (error || isLoading || !hasMore) return;

            if (
                window.innerHeight + document.documentElement.scrollTop
                === document.documentElement.offsetHeight
            ) {
                this.setState({page: this.state.page+1});
                this.loadSmells(this.state.page);
            }
        }, 100);
    }

    updatedProject = (project) => {
        this.setState({project: project});
        console.log("In updated project")
        this.loadSmells(1);
    }

    loadSmells(page) {
        var url = SERVER_IP + "/smells?system="+this.state.project
        fetch(url)
            .then(res => res.json())
            .then(smelldata => this.appendSmells(smelldata))
    }

    appendSmells(data) {
        const newSmells = this.state.smells.concat(data);
        this.setState( {smells: newSmells});
    }

    componentDidMount() {
        //this.loadSmells(1)
    }

    calculateLine() {
        const versionCounts = {};
        for(const [index, value] of this.state.smells.entries()){
            for(const [index, value] of this.state.smells[index].spanningVersions.entries()) {
                if (value in versionCounts) {
                    versionCounts[value]++;
                } else {
                    versionCounts[value] = 1;
                }
            }
        }
        return versionCounts;
    }



    render(){
        const dataobject = this.calculateLine();
        const dataLine = {
            labels: Object.keys(dataobject),
            datasets: [
                {
                    label: '# smells',
                    fill: false,
                    lineTension: 0.1,
                    backgroundColor: '#467a39',
                    borderColor: '#467a39',
                    borderCapStyle: 'butt',
                    borderDash: [],
                    borderDashOffset: 0.0,
                    borderJoinStyle: 'miter',
                    pointBorderColor: '#467a39',
                    pointBackgroundColor: '#fff',
                    pointBorderWidth: 1,
                    pointHoverRadius: 5,
                    pointHoverBackgroundColor: 'rgba(75,192,192,1)',
                    pointHoverBorderColor: 'rgba(220,220,220,1)',
                    pointHoverBorderWidth: 2,
                    pointRadius: 1,
                    pointHitRadius: 10,
                    data: Object.values(dataobject)
                }
            ]
        };
        this.calculateLine();
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
                                    <Line data={dataLine} height={50}  />
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
                <MDBCardBody>
                    <React.Fragment>
                        <MDBRow style={{marginTop: 5}}>
                            <MDBCol md="2" style={{backgroundColor: "white"}}>
                                <button className="btn sdk4ed-color" onClick={this.toggle.bind(this)}>
                                    Smell viewer
                                </button>
                            </MDBCol>
                            <MDBCol className="" md="1" style={{backgroundColor: "white", padding: 5}}>
                                <div className="text-center" style={{backgroundColor: "white", height: "50%"}}><h5>ID: {this.props.id}</h5></div>
                            </MDBCol>
                            <MDBCol className="" md="2" style={{backgroundColor: "white", padding: 5}}>
                                <div className="text-center" style={{backgroundColor: "white", height: "50%"}}><h5>Type: {this.props.type}</h5></div>
                            </MDBCol>
                            <MDBCol className="" md="1" style={{backgroundColor: "white", padding: 5}}>
                                <div className="text-center" style={{backgroundColor: "white", height: "50%"}}><h5>Age: {this.props.age}</h5></div>
                            </MDBCol>
                            <MDBCol className="" md="3" style={{backgroundColor: "white", padding: 5}}>
                                <div className="text-center" style={{backgroundColor: "white", height: "50%"}}><h5>First version appeared: {this.props.firstVersionAppeared}</h5></div>
                            </MDBCol>
                            <MDBCol className="" md="3" style={{backgroundColor: "white", padding: 5}}>
                                <div className="text-center" style={{backgroundColor: "white", height: "50%"}}><h5>Last version detected: {this.props.lastVersionDetected}</h5></div>
                            </MDBCol>

                        </MDBRow>
                        <div id="outer" className={"collapse" + (this.state.open ? ' in' : '')} style={{marginBottom: 5, paddingBottom: 5}}>
                            {<Versions
                                spanningVersions = {this.props.spanningVersions}
                                characteristics = {this.props.characteristics}
                                affectedComponents = {this.props.affectedComponents}
                            />}
                        </div>
                    </React.Fragment>
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
                        <React.Fragment>
                            {this.props.spanningVersions.map((item) => (
                                <MDBDropdownItem key={item} onClick={() => this.handleClick(item)}>{item}</MDBDropdownItem>
                            ))}
                        </React.Fragment>
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
                    <table className="table table-striped">
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
                    <table className="table table-striped">
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
            projects: ["prova", "ciao", "aooo"]
        }
        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount(){
        this.getProjectsList();
    }

    handleChange(event) {
        this.setState({selected: event.target.value});
        this.props.onProjectChange(event.target.value);
        console.log("In handle change");
    }

    getProjectsList(){
        var url = SERVER_IP + "/projects"
        console.log("Requesting projects " + url);
        fetch(url)
            .then(res => res.json())
            .then(projects => this.setState({projects: projects.projects}))
    }

    render(){
        return (
            <React.Fragment>
                <MDBCard>
                <MDBCardHeader>Choose an analysed project</MDBCardHeader>
                <MDBCardBody>
                    <div>
                    <select className="browser-default custom-select" value={this.state.selected} onChange={this.handleChange}>
                        <option value="no-project">Choose your option</option>
                        {this.state.projects.map((projectItem, index) => (
                            <option key={index} value={projectItem}>{projectItem}</option>
                        ))}
                    </select>
                    </div>
                </MDBCardBody>
                </MDBCard>
            </React.Fragment>);
    }
}

export default SmellList;