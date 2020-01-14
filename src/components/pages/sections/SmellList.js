import React, { Component } from 'react';
import {MDBCol, MDBRow, MDBIcon} from 'mdbreact';
import style from './temp.css'

class SmellList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modal: false,
            smells: []
        };
    }
    componentDidMount() {
        fetch("http://localhost:3001/smells")
            .then(res => res.json())
            .then(smells => this.setState({ smells }));
    }
    render(){
        return (
            <React.Fragment>
                {this.state.smells.map(smell => (
                    <Smell
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
            <React.Fragment>
                <MDBRow style={{marginTop: 5}}>
                    <MDBCol md="1" style={{backgroundColor: "white"}}>
                        <button className="btn sdk4ed-color" onClick={this.toggle.bind(this)}>
                            Smell viewer
                        </button>
                    </MDBCol>
                    <MDBCol className="" md="1" style={{backgroundColor: "white", padding: 5}}>
                        <div className="text-center" style={{backgroundColor: "white", height: "50%"}}><h5>ID: {this.props.id}</h5></div>
                        <div className="text-center" style={{backgroundColor: "white", height: "50%"}}><h5>Type: {this.props.type}</h5></div>
                    </MDBCol>
                    <MDBCol className="" md="2" style={{backgroundColor: "white", padding: 5}}>
                        <div className="text-center" style={{backgroundColor: "white", height: "50%"}}><h5>First version appeared: {this.props.firstVersionAppeared}</h5></div>
                        <div className="text-center" style={{backgroundColor: "white", height: "50%"}}><h5>Last version detected: {this.props.lastVersionDetected}</h5></div>
                    </MDBCol>
                    <MDBCol className="" md="1" style={{backgroundColor: "white", padding: 5}}>
                        <div className="text-center" style={{backgroundColor: "white", height: "50%"}}><h5>Age: {this.props.age}</h5></div>
                    </MDBCol>
                    <MDBCol className="" md="1" style={{backgroundColor: "white", padding: 5}}>

                    </MDBCol>
                </MDBRow>
                <div id="outer" className={"collapse" + (this.state.open ? ' in' : '')} style={{marginBottom: 5}}>
                    <React.Fragment>
                        {Object.keys(this.props.characteristics).map((item, index) => (
                            <VersionDetails
                                version = {item}
                                data = {this.props.characteristics[item]}
                            />
                        ))}
                    </React.Fragment>
                </div>
            </React.Fragment>
        );
    }
}

class VersionDetails extends Component {
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
        return(
            <React.Fragment>
                <MDBRow>
                    <MDBCol md="1" className="light">
                        <button className="btn sdk4ed-color" onClick={this.toggle.bind(this)} >
                            Version {this.props.version}
                        </button>
                    </MDBCol>
                </MDBRow>
                    <div id="inner" className={"collapse" + (this.state.open ? ' in' : '')} style={{marginBottom: 5}}>
                        <MDBRow>
                            <MDBCol md="2" className={"lighter"}>
                                <div className="text-center" style={{height: "50%"}}><h5>Parameter</h5></div>
                            </MDBCol>
                            <MDBCol md="2" className={"lighter"}>
                                <div className="text-center" style={{height: "50%"}}><h5>Value</h5></div>
                            </MDBCol>
                        </MDBRow>
                        <React.Fragment>
                            {Object.keys(this.props.data).map(item => (
                                <MDBRow>
                                    <MDBCol md="2" className={"lighter"} style={{padding: 5}}>
                                        <div className="text-center" style={{height: "50%"}}><h5>{item}</h5></div>
                                    </MDBCol>
                                    <MDBCol className={"lighter"} md="2" style={{padding: 5}}>
                                        <div className="text-center" style={{height: "50%"}}><h5>{this.props.data[item]}</h5></div>
                                    </MDBCol>
                                </MDBRow>
                            ))}
                        </React.Fragment>
                    </div>
            </React.Fragment>
        );
    }
}


export default SmellList;