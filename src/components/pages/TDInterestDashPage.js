import React from 'react';
import {PagePanel} from './sections/PagePanel';
import { MDBCol, MDBRow} from "mdbreact";
import {ProgressCard, CountCard, ScoreCard} from './sections/StatusCards'
import PlotlyChart from './sections/Chart';
import BasicTable from './sections/Table';
import 'whatwg-fetch';
import Loader from './sections/Loading'
import { Line, Radar } from 'react-chartjs-2';
import FileExplorer from './sections/FileExplorer';
import ContentPanel from './sections/ContentPanel';
import { MDBCard, MDBCardBody, MDBCardHeader, MDBContainer, MDBDropdown, MDBDropdownToggle, MDBDropdownMenu, MDBDropdownItem, MDBFormInline, MDBTable, MDBTableBody, MDBTableHead } from 'mdbreact';
//============== Import Highcharts ==============//
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

// Styling options for RadarChart - Edit only for styling modifications 
const radarChartOptions = {
    scale: {
        ticks: {
            min: 0,
            max: 1,
            stepSize: 0.2
        },
        pointLabels: {
            fontSize: 15
        },
    },
    responsive: true,
    legend: false,
}
// Change the values 
const InterestRadarPanel =  {
        labels: ['MPC', 'DIT', 'NOCC', 'RFC', 'LCOM', 'WMPC', 'DAC', 'NOM', 'SIZE1', 'SIZE2'], 
        datasets: [
            {
                label: 'Interest Indicators',
                backgroundColor: 'rgba(84,130,53,0.05)',
                borderColor: 'rgba(84,130,53,1)',
                pointRadius: 4,
                pointHitRadius: 4,
                pointBackgroundColor: 'rgba(84,130,53,1)',
                pointBorderColor: '#c1c7d1',
                pointHoverBackgroundColor : '#fff',
                pointHoverBorderColor: 'rgba(84,130,53,1)',
                data:[0.9805476228578603, 1.0, 0.7897392767031118, 0.28, 0.30952380952380953, 1.0, 0.7411386145858887, 0.9220016554845056, 0.5198202773272929, 0.45591192971313643] // data values from prop var are loaded here
            }
        ]
    }


const InterestPanel = props => {
  //============== Example code ==============//
    var seriesData = [];
    const options = {
        chart: {
        polar: true,
        type: 'line'
    },

    title: {
        text: 'Evolution of TD Aspects throught Software Versions',
        x: -80,
        align: 'center'
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
        align: 'right'
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
    
    const radarChartOptions={		
		chart: {
        polar: true
    },

    title: {
        text: 'Highcharts Polar Chart'
    },

    subtitle: {
        text: 'Also known as Radar Chart'
    },

    pane: {
        startAngle: 0,
        endAngle: 360
    },

    xAxis: {
        tickInterval: 45,
        min: 0,
        max: 360,
        labels: {
            format: '{value}°'
        }
    },

    yAxis: {
        min: 0
    },

    plotOptions: {
        series: {
            pointStart: 0,
            pointInterval: 45
        },
        column: {
            pointPadding: 0,
            groupPadding: 0
        }
    },

    series: [{
        type: 'column',
        name: 'Column',
        data: [8, 7, 6, 5, 4, 3, 2, 1],
        pointPlacement: 'between'
    }, {
        type: 'line',
        name: 'Line',
        data: [1, 2, 3, 4, 5, 6, 7, 8]
    }, {
        type: 'area',
        name: 'Area',
        data: [1, 8, 2, 7, 3, 6, 4, 5]
    }]
		
	}
       
    //=========================================//	
	
  
  return(
  <PagePanel header="Technical debt interest" linkTo="interest">
    
               
   <MDBRow className="mb-4">
            <MDBCol md="12" lg="12" className="mb-12">
                <MDBCard className="mb-12">
                <MDBCardHeader className="sdk4ed-color">Project</MDBCardHeader>
                <MDBCardBody>
                    <MDBFormInline className="md-form m-0">
                        <MDBDropdown>
                            <MDBDropdownToggle caret className="white-text" color="  light-green darken-4">
                                Project
                            </MDBDropdownToggle>
                            <MDBDropdownMenu basic>
                                <MDBDropdownItem onClick={(param) => props.updateProjectData('Holisun Arassistance')}>Holisun Arassistance</MDBDropdownItem>
                                <MDBDropdownItem onClick={(param) => props.updateProjectData('MaQuali')}>Holisun MaQuali</MDBDropdownItem>
                                <MDBDropdownItem onClick={(param) => props.updateProjectData('Neurasmus')}>Neurasmus</MDBDropdownItem>
                            </MDBDropdownMenu>
                        </MDBDropdown>
                        <h4 style={{color:'#548235'}}>{props.myprojectName}</h4>
                    </MDBFormInline>
                </MDBCardBody>
                </MDBCard>
            </MDBCol>
      </MDBRow>
  
	 <MDBRow className="mb-6">
	 
	 <MDBCol>
            {/*============== Render Highchart here ==============*/}
            <HighchartsReact
                highcharts={Highcharts}
                options={options}
            />
            {/*=========================================*/}
        </MDBCol>
	 
	 </MDBRow>
  
      <MDBRow className="mb-6">  
         <MDBCol size="12">
                <MDBRow className="mb-3">
                  <MDBCol>
                  <CountCard title="BREAKING POINT (version)" color="#33691e light-green darken-4" value={props.interest.breakpoint} icon="hat-wizard" />
                  </MDBCol>
                  <MDBCol>
                  <CountCard title="TOTAL INTEREST ($)" color="#33691e light-green darken-4" value={props.interest.totalInterest} icon="dollar-sign"/>
                  </MDBCol>
                  <MDBCol>
                  <CountCard title="MAINTAINABILITY RANKING (%)" color="#33691e light-green darken-4" value="10" icon="percent"/>
                  </MDBCol>
                   </MDBRow>
                  <MDBRow className="mb-3">
				  <MDBCol>
                  <CountCard title="INTEREST PROBABILITY (%)" color="#33691e light-green darken-4" value={props.interest.interestProbability} icon="percent"/>
                  </MDBCol>
                   <MDBCol>
                  <CountCard title="INSTABILITY (%)" color="#33691e light-green darken-4" value="25" icon="balance-scale"/>
                  </MDBCol>
                   <MDBCol>
                  <CountCard title="INTEREST PROBABILITY RANKING (%)"  color="#33691e light-green darken-4" value="40" icon="percent"/>
                  </MDBCol>
                </MDBRow>
          </MDBCol>
          
           <MDBCol size="6" mr="1">
            <BasicTable title="Interest Indicators" data={props.violations}/>
          </MDBCol>
          
          
          

            <MDBCol md="12" lg="6" className="mb-12">
                <MDBCard className="mb-6">
                <MDBCardHeader className="sdk4ed-color">Interest Indicators</MDBCardHeader>
                <MDBCardBody>
                    <MDBContainer>
                        <Radar data={InterestRadarPanel} options={radarChartOptions} />
                    </MDBContainer>
                </MDBCardBody>
                </MDBCard>
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
                            interest={this.state.interestSummary}/>
              </MDBCol>
              </MDBRow>
            </React.Fragment>
            )
    }
  }

}

export default TDInterestDashPage;
