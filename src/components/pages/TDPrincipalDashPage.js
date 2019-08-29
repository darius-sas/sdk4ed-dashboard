import React from 'react';
import {PagePanel} from './sections/PagePanel';
import { MDBCol, MDBRow} from "mdbreact";
import {ProgressCard, CountCard, ScoreCard} from './sections/StatusCards'
import PlotlyChart from './sections/Chart';
import BasicTable from './sections/Table';
import 'whatwg-fetch';
import Loader from './sections/Loading'
import FileExplorer from './sections/FileExplorer';
import ContentPanel from './sections/ContentPanel';

//============== Import Highcharts ==============//
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

const PrincipalPanel = props => {
   //============== Example code ==============//
    var seriesData = [];
    const options = {
        chart: {
        polar: true,
        type: 'line'
    },

    title: {
        text: 'Principal over time',
        x: -80
    },

    pane: {
        size: '80%'
    },

    xAxis: {
        categories: ['Code Smells', 'Bugs', 'Vulnerabilities', 'Duplicated Lines Density'],
        tickmarkPlacement: 'on',
        lineWidth: 0
    },

    yAxis: {
        gridLineInterpolation: 'polygon',
        lineWidth: 0,
        min: 0
    },

    tooltip: {
        shared: true,
        pointFormat: '<span style="color:{series.color}">{series.name}: <b>${point.y:,.0f}</b><br/>'
    },

    legend: {
        align: 'right',
        verticalAlign: 'middle'
    },

    series: [{
        name: 'Artifact Value',
        data: [500, 190, 600, 350],
        pointPlacement: 'on'
    }, {
        name: 'Average Value',
        data: [230, 243, 231, 242],
        pointPlacement: 'on'
    }],

    responsive: {
        rules: [{
            condition: {
                maxWidth: 500
            },
            chartOptions: {
                legend: {
                    align: 'center',
                    verticalAlign: 'bottom'
                },
                pane: {
                    size: '70%'
                }
            }
        }]
    }

    }
    
    
    //=========================================//
    
  return (
      <PagePanel header="Technical debt principal" linkTo="principal">
      <MDBRow className="mb-3">
      
       <MDBCol size="12">
                <MDBRow className="mb-3">
                  <MDBCol>
                  <CountCard title="TD IN DAYS" color="#33691e light-green darken-4 " value="21" icon="clock" />
                  </MDBCol>
                  <MDBCol>
                  <CountCard title="TD IN CURRENCY" color="#33691e light-green darken-4" value="150K" icon="money-bill-alt"/>
                  </MDBCol>
                  <MDBCol>
                  <CountCard title="BUGS" color="#33691e light-green darken-4" value="168" icon="bug"/>
                  </MDBCol>
                  <MDBCol>
                  <CountCard title="VULNERABILITIES" color="#33691e light-green darken-4" value="55" icon="lock-open"/>
                  </MDBCol>
                   </MDBRow>
                  <MDBRow className="mb-3">
				  <MDBCol>
                  <CountCard title="CODE SMELLS" color="#33691e light-green darken-4" value="1.4K" icon="compress-arrows-alt"/>
                  </MDBCol>
                   <MDBCol>
                  <CountCard title="COVERAGE" color="#33691e light-green darken-4" value="12.2%" icon="fire-alt"/>
                  </MDBCol>
                   <MDBCol>
                  <CountCard title="DUPLICATIONS" color="#33691e light-green darken-4" value="2.3%" icon="copy"/>
                  </MDBCol>
                </MDBRow>
          </MDBCol>
      </MDBRow>
      </PagePanel>
)}



const FileExplorerPanel = () => {
  return (
    <ContentPanel title="Project explorer">
      <FileExplorer></FileExplorer>
    </ContentPanel>
  )
}

/**
 * The technical debt dashboard page. The page is assembled using multiple panels.
 * The data is retrieved asynchronously.
 */
class TDPrincipalDashPage extends React.Component {
  constructor(props){
    super(props);
    
    this.state = {
      systemSummary: null, // Principal-related summary information
      interestSummary: null, // Interest-related summary information
      principalOverTimeChart: null, // Chart for principal over time
      interestOverTimeChart: null, // Chart for interest over time
      topViolations: null, // The top violations wrt frequency
      topViolationsNewCode: null, // The top violations wrt frequency in new code
      densityComparisonChart: null, // Chart of the density of TD in new and existing code
      densityOverTimeChart: null // Chart of the density over time
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
      return (<Loader/>)
    }else{
      return(
          <React.Fragment>
            <MDBRow>
              <MDBCol size="2">
              <FileExplorerPanel/>
              </MDBCol>
              <MDBCol>
              <PrincipalPanel mysummary={this.state.systemSummary} 
                              principal={this.state.principalOverTimeChart}/>
              
              </MDBCol>
              </MDBRow>
            </React.Fragment>
            )
    }
  }

}

export default TDPrincipalDashPage;
