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


// SELECT sum(principal), sum(interest) FROM `analyjed_jar_project_classes` WHERE project_name='Holisun Arassistance' GROUP by version

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

const InterestPanel = props => {
	
	const InterestRadarPanel =  {
        labels: ['MPC', 'DIT', 'NOCC', 'RFC', 'LCOM', 'WMPC', 'DAC', 'CC', 'LOC', 'NoF', 'CD'], 
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
                data:[0.7, 0.9805476228578603, 1.0, 0.7897392767031118, 0.28, 0.30952380952380953, 1.0, 0.7411386145858887, 0.9220016554845056, 0.5198202773272929, 0.45591192971313643] // data values from prop var are loaded here
            }
        ]
    }
	
	
  //============== Example code ==============//
  
 {/* 
	var interestLine = String(props.myinterestLineChart.values); //string typeof
	
	var principalLine = String(props.myprincipalLineChart.values);
	
	var breakPointlLine = String(props.mybreakingpointLineChart.values);

	var cumulativeInterestLine = String(props.mycumulativeInterestLineChart.values);
	
	var i = interestLine.split(',');
	var j = principalLine.split(',');
	var k = breakPointlLine.split(',');
	var l = cumulativeInterestLine.split(',');

	var interValues = [];
	var princValues = [];
	var breakpointValues = [];
	var cumInterValues = [];
	
	for (var index=0; index < i.length; index++)
	{
		interValues.push(parseFloat(i[index]));
		princValues.push(parseFloat(j[index]));
		breakpointValues.push(parseFloat(k[index]));
		cumInterValues.push(parseFloat(l[index]));
	}
	* 
	* 
	* */}
	
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
        data: props.myinterestLineChart.values,
        pointPlacement: 'on'
    }, {
        name: 'Principal',
        data: props.myprincipalLineChart.values,
        pointPlacement: 'on'
    }, {
        name: 'Breaking Point',
        data: props.mybreakingpointLineChart.values,
        pointPlacement: 'on'
    }, {
        name: 'Cumulative Interest',
        data: props.mycumulativeInterestLineChart.values,
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
                                <MDBDropdownItem onClick={(param) => props.updateProjectData('holisun_arassistance')}>Holisun Arassistance</MDBDropdownItem>
                                <MDBDropdownItem onClick={(param) => props.updateProjectData('airbus')}>Airbus</MDBDropdownItem>
                                <MDBDropdownItem onClick={(param) => props.updateProjectData('neurasmus')}>Neurasmus</MDBDropdownItem>
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
                  <CountCard title="INTEREST PROBABILITY (%)" color="#33691e light-green darken-4" value={props.interest.interestProbability} icon="percent"/>
                  </MDBCol>
                   </MDBRow>
                  <MDBRow className="mb-3">
				  <MDBCol>
                  <CountCard title="MAINTAINABILITY RANKING (%)" color="#33691e light-green darken-4" value="-" icon="trophy"/>
                  </MDBCol>
                   <MDBCol>
                  <CountCard title="INTEREST PROBABILITY RANKING (%)"  color="#33691e light-green darken-4" value="-" icon="trophy"/>
                  </MDBCol>
                </MDBRow>
          </MDBCol>
           </MDBRow>
           
            <MDBCol md="12" lg="qw" className="mb-12">
                <MDBCard className="mb-6">
                <MDBCardHeader className="sdk4ed-color">Interest Indicators</MDBCardHeader>
                <MDBCardBody>
                    <MDBContainer>
                        <Radar data={InterestRadarPanel} />
                    </MDBContainer>
                </MDBCardBody>
                </MDBCard>
            </MDBCol>
            
            
		<MDBRow className="mb-12">
           <MDBCol size="12" mr="1">
            <BasicTable title="Interest Indicators" data={props.interestArtifacts}/>
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
		isLoading: false,
		name: '',
		interestIndicatorsSummary: {},
		interestIndicators: {},
		interestLineChart: {},
		principalLineChart: {},
		breakingPointLineChart: {},
		cumulativeInterestLineChart: {},
    }
  }
  
  
 // Update project 
	updateProjectData = (projectName) => {
		this.setState({ 
            isLoading: true,
        });
		
		if(projectName === 'neurasmus'){
			fetch("http://127.0.0.1:3001")
			.then(resp => resp.json())
			.then(resp => {
				this.setState({
					isLoading: false,
					name: resp.neurasmusTD.projectName,
					interestIndicatorsSummary: resp.neurasmusTD.interestSummary,
					interestIndicators: resp.neurasmusTD.interestIndicators,
					
					interestLineChart: resp.neurasmusTD.lineChartInterestTD,
					principalLineChart: resp.neurasmusTD.lineChartPrincipalTD,
					breakingPointLineChart: resp.neurasmusTD.lineChartBreakingPointTD,
					cumulativeInterestLineChart: resp.neurasmusTD.lineChartCumulativeInterestTD,
				})
			})
		}else if(projectName === 'holisun_arassistance'){
			fetch("http://127.0.0.1:3001")
			.then(resp => resp.json())
			.then(resp => {
				this.setState({
					isLoading: false,
					name: resp.holisun_arassistanceTD.projectName,
					interestIndicatorsSummary: resp.holisun_arassistanceTD.interestSummary,
					interestIndicators: resp.holisun_arassistanceTD.interestIndicators,
					
					interestLineChart: resp.holisun_arassistanceTD.lineChartInterestTD,
					principalLineChart: resp.holisun_arassistanceTD.lineChartPrincipalTD,
					breakingPointLineChart: resp.holisun_arassistanceTD.lineChartBreakingPointTD,
					cumulativeInterestLineChart: resp.holisun_arassistanceTD.lineChartCumulativeInterestTD,
				})
			})
		}else if(projectName === 'airbus'){
			fetch("http://127.0.0.1:3001")
			.then(resp => resp.json())
			.then(resp => {
				this.setState({
					isLoading: false,
					name: resp.airbusTD.projectName,
					interestIndicatorsSummary: resp.airbusTD.interestSummary,
					interestIndicators: resp.airbusTD.interestIndicators,
					
					interestLineChart: resp.airbusTD.lineChartInterestTD,
					principalLineChart: resp.airbusTD.lineChartPrincipalTD,
					breakingPointLineChart: resp.airbusTD.lineChartBreakingPointTD,
					cumulativeInterestLineChart: resp.airbusTD.lineChartCumulativeInterestTD,
				})
			})
		}
	}
  

  componentDidMount(){
    fetch("http://127.0.0.1:3001")
    .then(resp => resp.json())
    .then(resp => {
      console.log("Data received")
		this.setState({
				isLoading: false,
				name: resp.holisun_arassistanceTD.projectName,
				interestIndicatorsSummary: resp.holisun_arassistanceTD.interestSummary,
				interestIndicators: resp.holisun_arassistanceTD.interestIndicators,
				
				interestLineChart: resp.holisun_arassistanceTD.lineChartInterestTD,
				principalLineChart: resp.holisun_arassistanceTD.lineChartPrincipalTD,
				breakingPointLineChart: resp.holisun_arassistanceTD.lineChartBreakingPointTD,
				cumulativeInterestLineChart: resp.holisun_arassistanceTD.lineChartCumulativeInterestTD,
			})
    })
  }

  render(){
	  	  const { isLoading, name, interestIndicatorsSummary, interestIndicators, interestLineChart, principalLineChart, breakingPointLineChart, cumulativeInterestLineChart} = this.state
	  
     if(this.isLoading){
      return (<Loader/>)
    }else{
      return(
          <React.Fragment>
            <MDBRow>
            {/*
              <MDBCol size="2">
              <FileExplorerPanel/>
              </MDBCol>*/}
              <MDBCol> 
              <InterestPanel 			
					myprojectName = {name}
					updateProjectData={this.updateProjectData} 
					interest = {interestIndicatorsSummary}
					interestArtifacts = {interestIndicators}
					myinterestLineChart={interestLineChart}
					myprincipalLineChart = {principalLineChart}
					mybreakingpointLineChart = {breakingPointLineChart}
					mycumulativeInterestLineChart = {cumulativeInterestLineChart}
               />
              </MDBCol>
              </MDBRow>
            </React.Fragment>
            )
    }
  }

}

export default TDInterestDashPage;
