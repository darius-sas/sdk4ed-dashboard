import React from 'react';
import { MDBCard, MDBCardBody, MDBCardTitle, MDBCardText, MDBCardHeader, MDBBtn, MDBContainer } from 'mdbreact'

const ContentPanel = props => {
    return (
        <MDBContainer>
        <MDBCard>
        <MDBCardHeader>{props.title}</MDBCardHeader>
        <MDBCardBody className={props.className}>
            {props.children}
        </MDBCardBody>
        </MDBCard>
        </MDBContainer>
    )
  }
  
export default ContentPanel;