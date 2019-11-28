import React, { Component } from 'react';
import {
    MDBCol,
    MDBCard,
    MDBCardBody,
    MDBCardHeader,
    MDBRow,
    MDBListGroup,
    MDBListGroupItem,
    MDBBadge,
    MDBIcon,
    MDBContainer
} from 'mdbreact';
import { Bar, Pie } from 'react-chartjs-2';

class SmellList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modal: false,
            events: [
                {
                    uid: 1,
                    type: "10:00",
                    age: "Breakfast with Simon",
                    dateIntro: "21/11/1990",
                    size: "Lounge Caffe",
                    numEdges: "Discuss Q3 targets"
                },
                {
                    uid: 2,
                    type: "10:00",
                    age: "Breakfast with Simon",
                    dateIntro: "21/11/1990",
                    size: "Lounge Caffe",
                    numEdges: "Discuss Q3 targets"
                },
                {
                    uid: 3,
                    type: "10:00",
                    age: "Breakfast with Simon",
                    dateIntro: "21/11/1990",
                    size: "Lounge Caffe",
                    numEdges: "Discuss Q3 targets"
                },
                {
                    uid: 4,
                    type: "10:00",
                    age: "Breakfast with Simon",
                    dateIntro: "21/11/1990",
                    size: "Lounge Caffe",
                    numEdges: "Discuss Q3 targets"
                }
            ]
        };
    }
    render(){
        return (
            <React.Fragment>
                {this.state.events.map(smell => (
                    <Smell
                        key={smell.uid}
                        uid={smell.uid}
                        type={smell.type}
                        age={smell.age}
                        dateIntro={smell.dateIntro}
                        size={smell.size}
                        numEdges={smell.numEdges}
                    />
                ))}
            </React.Fragment>
        )
    }
}

class Smell extends Component {
    render() {
        return (
            <MDBRow className="mb-4">
                <div className="p-5 border border-right-0 border-default">
                    <MDBIcon icon="bug" size="6x"/>
                </div>

                <MDBCol md="9" className="mb-8 border border-left-0 border-default">
                    <div className="p-5">
                    <MDBRow className="mb-4">
                        <MDBCol md="4"><div>{this.props.type} ({this.props.uid})</div></MDBCol>
                        <MDBCol md="4"><div>{this.props.size}</div></MDBCol>
                    </MDBRow>
                    <MDBRow>
                        <MDBCol md="4"><div>{this.props.age}</div></MDBCol>
                        <MDBCol md="4"><div>{this.props.numEdges}</div></MDBCol>
                    </MDBRow>
                    </div>
                </MDBCol>
            </MDBRow>
        );
    }
}


export default SmellList;