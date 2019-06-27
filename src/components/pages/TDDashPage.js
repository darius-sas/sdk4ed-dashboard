import React from 'react';
import {PagePanel} from './sections/PagePanel';
import { MDBCol, MDBRow} from "mdbreact";
import {ProgressCard, CountCard, ScoreCard} from './sections/StatusCards'
import PlotlyChart from './sections/Chart';
import BasicTable from './sections/Table';
import 'whatwg-fetch';
import { get } from 'http';
import { stat } from 'fs';

const PrincipalPanel = props => {
  return (
      <PagePanel header="Technical debt principal" linkTo="/techdebt/principal">
      <MDBRow className="mb-3">
          <MDBCol>
            <PlotlyChart title="Principal over time" 
              data={props.principal}
              layout={{
                width: 650,
                margin: {l:40, r:40, t:50, b:50}}}
              />
          </MDBCol>
          <MDBCol>
          <MDBRow className="mb-3">
            <MDBCol>
                  <ScoreCard title="Quality score" color="blue darken-3" score={props.mysummary.qualityScore}/>
            </MDBCol>
            </MDBRow>
            <MDBRow className="mb-3">
            <MDBCol>
                  <ProgressCard title="Coverage" color="grey darken-3" barColor="green" progress={props.mysummary.coverage} icon="check-circle" description="Unit tests"/>
            </MDBCol>
            <MDBCol>
                  <CountCard title="Vulnerabilities" color="red darken" icon="lock" value={props.mysummary.vulnerabilities.count} description={props.mysummary.vulnerabilities.critical + " of them are critical"}/>

            </MDBCol>
            </MDBRow>

            <MDBRow className="mb-3">
            <MDBCol>
                  <CountCard title="Code Smells" color="orange darken-3" value={props.mysummary.codeSmells} icon="radiation-alt"/>
            </MDBCol>
            <MDBCol>
                  <ProgressCard title="Duplicated Code" color="blue lighten-1" barColor="red" progress={props.mysummary.duplCode} icon="clone"/>
            </MDBCol>
            </MDBRow>
            <MDBRow>
            <MDBCol>
                  <CountCard title="Lines of code" color="purple darken-3" value={props.mysummary.linesOfCode} icon="code"/>
            </MDBCol>
            <MDBCol>
                <CountCard title="Bugs" color="grey darken-3" value={props.mysummary.bugs} icon="bug"/>
            </MDBCol>
            </MDBRow>
          </MDBCol>
      </MDBRow>
      </PagePanel>
)}

const InterestPanel = props => {
 // var result = window.fetch('http://localhost:3001').then(resp => resp.text())
  
  return(
  <PagePanel header="Technical debt interest" linkTo="/techdebt/interest">
      <MDBRow className="mb-3">
          <MDBCol size="3" mr="1">
            <BasicTable title="Top 5 Violations" data={props.violations}/>
          </MDBCol>
          <MDBCol size="6">
            <PlotlyChart title="Interest accumulated" data={props.interest}
                         layout={{ width: 650, margin: {l:40, r:40, t:50, b:50}}} />
          </MDBCol>
          <MDBCol size="3">
                <MDBRow className="mb-3">
                  <MDBCol>
                  <CountCard title="Breaking point" color="red darken-2" value={props.mysummary.breakpoint} icon="calendar-alt" description={props.mysummary.breakpointDaysLeft + " days left"}/>
                  </MDBCol>
                </MDBRow>
                <MDBRow className="mb-3">
                  <MDBCol>
                  <CountCard title="Interest probability" color="green darken-3" value={props.mysummary.interestprob} description={"Ranking " + props.mysummary.interestrank} icon="dollar-sign"/>
                  </MDBCol>
                </MDBRow>
                <MDBRow className="mb-3">
                  <MDBCol>
                  </MDBCol>
                </MDBRow>
          </MDBCol>
      </MDBRow>
  </PagePanel>
  )
}

const NewCodePanel = props =>{
  return (
    <PagePanel header="Technical debt new code" linkTo="/techdebt/interest">
    <MDBRow className="mb-3">
        <MDBCol size="3" mr="1">
          <PlotlyChart title="TD density of new code vs existing" data={props.densitycomparison}
          layout={{width: 300, height:600}} />
        </MDBCol>
        <MDBCol size="6">
          <PlotlyChart title="TD Density of new code over time" data={props.density}
                      layout={{ width: 650, margin: {l:40, r:40, t:50, b:50}}} />
        </MDBCol>
        <MDBCol size="3">
          <BasicTable title="Top 5 Violations in new code" data={props.violations}/>
        </MDBCol>
    </MDBRow>
    </PagePanel>
  )
}

class TDDashPage extends React.Component {
  constructor(props){
    super(props);
    
    this.state = {
      systemSummary: null,
      interestSummary: null,
      principalOverTimeChart: null,
      interestOverTimeChart: null,
      topViolations: null,
      topViolationsNewCode: null,
      densityComparisonChart: null,
      densityOverTimeChart: null
    }
  }

  componentDidMount(){
    fetch("http://127.0.0.1:3001")
    .then(resp => resp.json())
    .then(resp => {
      console.log("Data received")
      this.setState(resp)
    })
  }

  render(){
    if(this.state.systemSummary == null){
      console.log("State is null")
      return (<div className="spinner-border text-primary" role="status">
              <span className="sr-only">Loading...</span>
              </div>)
    }else{
      console.log("State is not null: " + this.state)
      return(
          <React.Fragment>
              <PrincipalPanel mysummary={this.state.systemSummary} 
                              principal={this.state.principalOverTimeChart}/>
              <InterestPanel violations={this.state.topViolations} 
                            mysummary={this.state.interestSummary} interest={this.state.interestOverTimeChart}/>
              <NewCodePanel violations={this.state.topViolationsNewCode}
                            densitycomparison={this.state.densityComparisonChart}
                            density={this.state.densityOverTimeChart}/>
            </React.Fragment>)
    }
  }

}

export default TDDashPage;