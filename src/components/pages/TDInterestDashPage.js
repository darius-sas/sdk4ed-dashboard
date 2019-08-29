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

const InterestPanel = props => {
  //============== Example code ==============//
    var seriesData = [];
    const options = {
        chart: {
        polar: true,
        type: 'line'
    },

    title: {
        text: 'Breaking Point over Time',
        x: -80
    },

    pane: {
        size: '80%'
    },

    xAxis: {
        
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
        name: 'Interest',
        data: [500, 190, 600, 350, 372, 424, 819, 233, 414, 245],
        pointPlacement: 'on'
    }, {
        name: 'Principal',
        data: [230, 243, 231, 242, 424, 245, 525, 384, 839, 493],
        pointPlacement: 'on'
    }, {
        name: 'Breaking Point',
        data: [235, 542, 234, 224, 876, 234, 493, 583, 205, 295],
        pointPlacement: 'on'
    }, {
        name: 'Cumulative Interest',
        data: [378, 829, 829, 940, 998, 483, 443, 593, 493, 583],
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
	
  
  return(
  <PagePanel header="Technical debt interest" linkTo="interest">
      <MDBRow className="mb-3">  
         <MDBCol size="12">
                <MDBRow className="mb-3">
                  <MDBCol>
                  <CountCard title="BREAKING POINT" color="#33691e light-green darken-4" value="28 Months" />
                  </MDBCol>
                  <MDBCol>
                  <CountCard title="TOTAL INTEREST" color="#33691e light-green darken-4" value="800$" />
                  </MDBCol>
                  <MDBCol>
                  <CountCard title="MAINTAINABILITY RANKING" color="#33691e light-green darken-4" value="10%" />
                  </MDBCol>
                   </MDBRow>
                  <MDBRow className="mb-3">
				  <MDBCol>
                  <CountCard title="INTEREST PROBABILITY" color="#33691e light-green darken-4" value="38%" />
                  </MDBCol>
                   <MDBCol>
                  <CountCard title="INSTABILITY" color="#33691e light-green darken-4" value="25%" />
                  </MDBCol>
                   <MDBCol>
                  <CountCard title="INTEREST PROBABILITY RANKING" color="#33691e light-green darken-4" value="40%" />
                  </MDBCol>
                </MDBRow>
          </MDBCol>
          
           <MDBCol size="6" mr="1">
            <BasicTable title="Top 10 Most Probable Violations" data={props.violations}/>
          </MDBCol>
          
           <MDBCol size="6">
            {/*============== Render Highchart here ==============*/}
            <HighchartsReact
                highcharts={Highcharts}
                options={options}
            />
            {/*=========================================*/}
        </MDBCol>
      </MDBRow>
  </PagePanel>
  )
}


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
class TDInterestDashPage extends React.Component {
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
              <InterestPanel violations={this.state.topViolations} 
                            mysummary={this.state.interestSummary} interest={this.state.interestOverTimeChart}/>
              </MDBCol>
              </MDBRow>
            </React.Fragment>
            )
    }
  }

}

export default TDInterestDashPage;
