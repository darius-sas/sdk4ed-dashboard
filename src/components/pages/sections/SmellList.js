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
                        <button className="btn btn-default" onClick={this.toggle.bind(this)}>
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
                    <MDBCol className="" md="2" style={{backgroundColor: "white", padding: 5}}>

                    </MDBCol>
                </MDBRow>
                <div id="demo" className={"collapse" + (this.state.open ? ' in' : '')} style={{marginBottom: 5}}>
                    <MDBRow>
                        <MDBCol className="" md="3" style={{backgroundColor: "white", padding: 5}}>
                            <div className="text-center" style={{backgroundColor: "white", height: "50%"}}><h5>Affected versions, expandable table with characteristics</h5></div>
                        </MDBCol>
                        <MDBCol className="" md="4" style={{backgroundColor: "white", padding: 5}}>
                            <React.Fragment>
                                {Object.keys(this.props.characteristics).map(item =>
                                    <MDBRow>
                                        <MDBCol md="3">
                                            <h5>Page rank average</h5>
                                        </MDBCol>
                                        <MDBCol md="1">
                                            <h5>{item + this.props.characteristics[item].pageRankAvrg}</h5>
                                        </MDBCol>
                                    </MDBRow>
                                )}
                            </React.Fragment>
                        </MDBCol>
                    </MDBRow>
                </div>
            </React.Fragment>

        );
    }
}


export default SmellList;