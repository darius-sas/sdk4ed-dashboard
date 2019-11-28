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
import ProjectInfo from "./sections/ProjectInfo";
import SmellList from "./sections/SmellList";

class ChartSection1 extends Component {
    render() {
        return(
            <React.Fragment>
                <ProjectInfo />
                <SmellList/>
            </React.Fragment>
        )
    }
}

export default ChartSection1;

