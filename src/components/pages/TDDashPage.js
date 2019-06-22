import React from 'react';
import {PagePanel} from './sections/PagePanel';
import { MDBCol, MDBRow} from "mdbreact";
import {ProgressCard, CountCard, ScoreCard} from './sections/StatusCards'
import PlotlyChart from './sections/Chart'
import BasicTable from './sections/Table'

const lineChart = [{
  y: [65, 59, 80, 81, 56, 55, 40],
  x: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
  type: 'scatter',
  mode: 'line',
  marker: {color: 'red'},
  autosize: true,
  margin: {l:20, r:20, t:50, b:50}
}];

const systemSummary = {qualityScore: 3, coverage: 90, vulnerabilities: {count: 42, critical: 3}, codeSmells: 154, duplCode: 10, bugs: 350, linesOfCode: 8502}

const top5violations = {
  columns: [
    {label: "Violation", field: "violation"}, 
    {label: "Frequency", field: "frequency"},
    {label: "Occurrences", field: "occurrences"}],
  rows: [{violation: "Long method", frequency: "30%", occurrences: 54}, {violation: "God Package", frequency: "16%", occurrences: 28},  {violation: "Feature envy", frequency: "10%", occurrences: 17},  {violation: "Commented code", frequency: "5%", occurrences: 10},  {violation: "Possible null pointer", frequency: "3%", occurrences: 5}]
}

const PrincipalPanel = (props) => {
  return (
      <PagePanel header="Technical debt principal" linkTo="/techdebt/principal">
      <MDBRow className="mb-3">
          <MDBCol sm="6">
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
                  <ScoreCard title="Quality score" color="blue darken-3" score={props.summary.qualityScore}/>
            </MDBCol>
            </MDBRow>
            <MDBRow className="mb-3">
            <MDBCol>
                  <ProgressCard title="Coverage" color="grey darken-3" barColor="green" progress={props.summary.coverage} icon="check-circle" description="Unit tests"/>
            </MDBCol>
            <MDBCol>
                  <CountCard title="Vulnerabilities" color="red darken" icon="lock" value={props.vulnerabilities.count} description={props.vulnerabilities.critical + " of them are critical"}/>

            </MDBCol>
            </MDBRow>

            <MDBRow className="mb-3">
            <MDBCol>
                  <CountCard title="Code Smells" color="orange darken-3" value={props.summary.codeSmells} icon="radiation-alt"/>
            </MDBCol>
            <MDBCol>
                  <ProgressCard title="Duplicated Code" color="blue lighten-1" barColor="red" progress={props.summary.duplCode} icon="clone"/>
            </MDBCol>
            </MDBRow>
            <MDBRow>
            <MDBCol>
                  <CountCard title="Lines of code" color="purple darken-3" value={props.summary.linesOfCode} icon="code"/>
            </MDBCol>
            <MDBCol>
                <CountCard title="Bugs" color="grey darken-3" value={props.summary.bugs} icon="bug"/>
            </MDBCol>
            </MDBRow>
          </MDBCol>
      </MDBRow>
      </PagePanel>
  )}

const InterestPanel = (props) => {
  return(
  <PagePanel header="Technical debt interest" linkTo="/techdebt/interest">
      <MDBRow className="mb-3">
          <MDBCol>
            <BasicTable title="Top 5 Violations" data={props.violations}/>
          </MDBCol>
          <MDBCol>

          </MDBCol>
          <MDBCol></MDBCol>
      </MDBRow>
  </PagePanel>
  )
}

class TDDashPage extends React.Component {
  render(){
    return (
      <React.Fragment>
        <PrincipalPanel principal={lineChart} summary={systemSummary}/>
        <InterestPanel violations={top5violations}/>
        <PrincipalPanel/>        
      </React.Fragment>
    )
  }
}

export default TDDashPage;