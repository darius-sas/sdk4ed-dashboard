import React from 'react';
import { MDBCard, MDBCardBody, MDBIcon, MDBRow, MDBCol } from 'mdbreact';

export const CountBar = props => {
  var color = "primary-color"
  if (props.color != null){
    color = props.color
  }
  var description = ""
  if(props.description != null){
    description = <MDBCardBody className="mt-0"><p>{props.description}</p></MDBCardBody>
  }
  return (
    <React.Fragment>
    <MDBCard color={color} className="classic-admin-card">
      <MDBCardBody>
        <div className="float-right"><MDBIcon far icon={props.icon}/></div>
        <p className="white-text">{props.title}</p>
        <div className="float-left"><h4><strong>{props.value}</strong></h4></div>
      </MDBCardBody>
      {description}
      </MDBCard>
    </React.Fragment>
  )
}

export const ProgressBar = props => {
    const progress = props.progress + '%';
    var color = "primary-color"
    var barColor = "grey darken-3"
    if (props.color != null){
      color = props.color
    }
    if(barColor != null){
      barColor = props.barColor
    }
    var description = ""
    if(props.description != null){
      description = <MDBCardBody><p>{props.description}</p></MDBCardBody>
    }

    return (
        <React.Fragment>
        <MDBCard color={color} className="classic-admin-card">
          <MDBCardBody>
            <div className="float-right"><MDBIcon far icon={props.icon}/></div>
            <p className="white-text">{props.title}</p>
            <h4><strong>{props.value}</strong></h4>
          </MDBCardBody>
          <div className="progress">
            <div aria-valuemax="100" 
                  aria-valuemin="0" 
                  aria-valuenow={props.progress} 
                  className={"progress-bar progress-bar-striped bg " + barColor} 
                  role="progressbar" 
                  style={{width: `${progress}`}}>
            </div>
          </div>
          {description}
          </MDBCard>
        </React.Fragment>
    )
}