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

class SmellList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error: false,
            hasMore: true,
            isLoading: false,
            modal: false,
            page: 1,
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

    loadSmells(page) {
        fetch("http://localhost:3001/smells?_page="+page)
            .then(res => res.json())
            .then(smelldata => this.appendSmells(smelldata))
    }

    appendSmells(data) {
        const newSmells = this.state.smells.concat(data);
        this.setState( {smells: newSmells});
    }

    componentDidMount() {
        this.loadSmells(1)
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
            <MDBRow>
                <MDBCol md="8">
                    <MDBCard>
                        <MDBCardHeader>Project Name</MDBCardHeader>
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
            open: false,
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

    render() {
        return(
            <React.Fragment>
                <MDBRow>
                    <MDBCol md="3" className={"lighter"}>
                        <MDBRow>
                            <MDBCol md="12" className={"lighter"}>
                                <div className="text-center" style={{height: "50%"}}><h5>Parameter</h5></div>
                            </MDBCol>
                        </MDBRow>
                        <React.Fragment>
                            {Object.keys(this.props.characteristics).map((item) => (
                                <MDBRow key={item}>
                                    <MDBCol md="12" className={"lighter"}>
                                        <div className="text-center" style={{height: "50%"}}><h5>{item}</h5></div>
                                    </MDBCol>
                                </MDBRow>
                            ))}
                        </React.Fragment>
                    </MDBCol>

                    <MDBCol md="3" className={"lighter"}>
                        <MDBRow>
                            <MDBCol md="12" className={"lighter"}>
                                <div className="text-center" style={{height: "50%"}}><h5>Value</h5></div>
                            </MDBCol>
                        </MDBRow>
                        <React.Fragment>
                            {Object.keys(this.props.characteristics).map(item => (
                                <MDBRow key={item}>
                                    <MDBCol md="12" className={"lighter"}>
                                        <div className="text-center" style={{height: "50%"}}><h5>{this.props.characteristics[item]}</h5></div>
                                    </MDBCol>
                                </MDBRow>
                            ))}
                        </React.Fragment>
                    </MDBCol>
                    <MDBCol md="3" className={"lighter"}>
                        <MDBRow>
                            <MDBCol md="12" className={"lighter"}>
                                <div className="text-center" style={{height: "50%"}}><h5>Affected Components</h5></div>
                            </MDBCol>
                        </MDBRow>
                        <React.Fragment>
                            {this.props.affectedComponents.map(item => (
                                <MDBRow key={item}>
                                    <MDBCol md="12" className={"lighter"}>
                                        <div className="text-center" style={{height: "50%"}}><h5>{item}</h5></div>
                                    </MDBCol>
                                </MDBRow>
                            ))}
                        </React.Fragment>
                    </MDBCol>
                    <MDBCol md="3" className={"lighter"}>

                    </MDBCol>
                </MDBRow>

            </React.Fragment>
        );
    }
}


export default SmellList;