import React from 'react';
import { MDBCard, MDBCardBody, MDBIcon, MDBRow, MDBCol } from 'mdbreact';

const descriptionCard = text => {  if(text != null)
   return <MDBCardBody className="mb-0 pb-1 pt-1"><p>{text}</p></MDBCardBody>
   else return <MDBCardBody></MDBCardBody>}


export const ScoreCard = props => {
  var color = "primary-color"
  if (props.color != null){
    color = props.color
  }
  var stars = []
  var score = props.score == null ? 0 : parseInt(props.score)
  for(var i = 1; i <= 5; i++){
    var star = i <= score ? "amber-text" : "grey-text"
    stars.push(<i class={"fas fa-star fa-3x " + star}></i>)
  }
  return(
    <React.Fragment>
      <MDBCard color={color} className="classic-admin-card">
        <MDBCardBody>
        <div class="float-left">Score</div>
        <div class="float-right">
          <MDBRow><MDBCol>{stars}</MDBCol></MDBRow>
        </div>
        </MDBCardBody>
      </MDBCard>
    </React.Fragment>
  )
}
   

export const CountCard = props => {
  var color = "primary-color"
  if (props.color != null){
    color = props.color
  }
  
  return (
    <React.Fragment>
    <MDBCard color={color} className="classic-admin-card">
      <MDBCardBody className="pb-4">
        <div className="float-right"><MDBIcon icon={props.icon} size="3x"/></div>
        <p className="white-text">{props.title}</p>
        <div className="float-left pb-1"><h4><strong>{props.value}</strong></h4></div>
      </MDBCardBody>
      {descriptionCard(props.description)}
    </MDBCard>
    </React.Fragment>
  )
}

export const ProgressCard = props => {
    const progress = props.progress + '%';
    var color = "primary-color"
    var barColor = "grey darken-3"
    if (props.color != null){
      color = props.color
    }
    if(barColor != null){
      barColor = props.barColor
    }
    return (
        <React.Fragment>
        <MDBCard color={color} className="classic-admin-card mb-3">
          <MDBCardBody>
            <div className="float-right"><MDBIcon icon={props.icon} size="3x"/></div>
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
          {descriptionCard(props.description)}
          </MDBCard>
        </React.Fragment>
    )
}