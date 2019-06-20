import React from 'react';
import { MDBCard, MDBCardBody, MDBCardTitle, MDBCardText, MDBCardHeader, MDBBtn, MDBContainer } from "mdbreact";
import { NavLink,Link } from 'react-router-dom';

export const ChartContainer = props => {
  return (
      <MDBContainer>
      <MDBCard>
      <MDBCardHeader>{props.title}</MDBCardHeader>
      <MDBCardBody>
          {props.children}
      </MDBCardBody>
      </MDBCard>
      </MDBContainer>
  )
}

export const PagePanel = props => {
return (
    <React.Fragment>
    <MDBCard className="card-body pt-0 pl-0 pr-0" style={{boxShadow: "0px 0px"}}>
      <MDBCardHeader color="primary-color" tag="h3">
        <Link to={props.linkTo}>{props.header}</Link> 
      </MDBCardHeader>
      <MDBCardBody className="pl-1 pr-1">
      {props.children}
      </MDBCardBody>
    </MDBCard>
    </React.Fragment>
);
};