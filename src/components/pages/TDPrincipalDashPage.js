import React from 'react';
import {PagePanel} from './sections/PagePanel';
import { MDBCol, MDBRow} from "mdbreact";
import {ProgressCard, CountCard, ScoreCard} from './sections/StatusCards'
import PlotlyChart from './sections/Chart';
import BasicTable from './sections/Table';
import 'whatwg-fetch';
import { Line, Radar } from 'react-chartjs-2';
import Loader from './sections/Loading'
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




const PrincipalPanel = props => {
		
	function normalize(min, max) 
	{
		var delta = max - min;
		return function (val) {
			return (val - min) / delta;
		};
	}

	var numbers = [parseFloat(props.principal.bugs), parseFloat(props.principal.vulnerabilities), parseFloat(props.principal.duplCode), parseFloat(props.principal.codeSmells)];

	console.log(numbers.map(normalize(Math.min(...numbers), Math.max(...numbers))));

	numbers = numbers.map(normalize(Math.min(...numbers), Math.max(...numbers)))

	const PrincipalRadarPanel =  {
        labels: ['Bugs', 'Vulnerabilities', 'Duplicated Lines  Density', 'Code Smells'], 
        datasets: [
            {
                label: 'Principal Indicators',
                backgroundColor: 'rgba(84,130,53,0.05)',
                borderColor: 'rgba(84,130,53,1)',
                pointRadius: 4,
                pointHitRadius: 4,
                pointBackgroundColor: 'rgba(84,130,53,1)',
                pointBorderColor: '#c1c7d1',
                pointHoverBackgroundColor : '#fff',
                pointHoverBorderColor: 'rgba(84,130,53,1)',
                data: [numbers[0], numbers[1], numbers[2], numbers[3]]
            }
        ]
    }
	
	
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
      
      <MDBRow className="mb-3">
      
       <MDBCol size="12">
                <MDBRow className="mb-3">
                  <MDBCol>
                  <CountCard title="TD IN DAYS"  value={props.principal.tdInMinutes} icon="clock" />
                  </MDBCol>
                  <MDBCol>
                  <CountCard title="TD IN CURRENCY" color="#33691e light-green darken-4" value={props.principal.tdInCurrency} icon="money-bill-alt"/>
                  </MDBCol>
                  <MDBCol>
                  <CountCard title="BUGS" color="#33691e light-green darken-4" value={props.principal.bugs} icon="bug"/>
                  </MDBCol>
                   </MDBRow>
                  <MDBRow className="mb-3">
                  <MDBCol>
                  <CountCard title="VULNERABILITIES" color="#33691e light-green darken-4" value={props.principal.vulnerabilities} icon="lock-open"/>
                  </MDBCol>
				  <MDBCol>
                  <CountCard title="CODE SMELLS" color="#33691e light-green darken-4" value={props.principal.codeSmells} icon="compress-arrows-alt"/>
                  </MDBCol>
                   <MDBCol>
                  <CountCard title="DUPLICATIONS (%)" color="#33691e light-green darken-4" value={props.principal.duplCode} icon="copy"/>
                  </MDBCol>
                </MDBRow>
          </MDBCol>
      </MDBRow>
      
       <MDBRow className="mb-3">
  
   <MDBCol md="12" lg="12" className="mb-12">
                <MDBCard className="mb-12">
                <MDBCardHeader className="sdk4ed-color">Principal Indicators</MDBCardHeader>
                <MDBCardBody>
                    <MDBContainer>
                        <Radar data={PrincipalRadarPanel} options={radarChartOptions} />
                    </MDBContainer>
                </MDBCardBody>
                </MDBCard>
            </MDBCol> 
   </MDBRow>
   
          <MDBCol md="12">
            <BasicTable title="Principal Indicators" data={props.principalArtifacts}/>
          </MDBCol>
          
        
      </PagePanel>
)}



const FileExplorerPanel = () => {
  return (
    <ContentPanel title="Project explorer">
      <FileExplorer></FileExplorer>
    </ContentPanel>
  )
}


// Function to extract values from json
function returnValues(data) {
    var values = []
    for(var i = 0; i < data.length; i++) {
        values.push(data[i].eval)
    }
    return values
}

/**
 * The technical debt dashboard page. The page is assembled using multiple panels.
 * The data is retrieved asynchronously.
 */
class TDPrincipalDashPage extends React.Component {
  constructor(props){
    super(props);
    
    this.state = {
		isLoading: false,
		name: '',
		principalIndicatorsSummary: {},
		principalIndicators: {},
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
					principalIndicatorsSummary: resp.neurasmusTD.principalSummary,
					principalIndicators: resp.neurasmusTD.principalIndicators,
					principalLineChart: resp.neurasmusTD.lineChartTD,
				})
			})
		}else if(projectName === 'holisun_arassistance'){
			fetch("http://127.0.0.1:3001")
			.then(resp => resp.json())
			.then(resp => {
				this.setState({
					isLoading: false,
					name: resp.holisun_arassistanceTD.projectName,
					principalIndicatorsSummary: resp.holisun_arassistanceTD.principalSummary,
					principalIndicators: resp.holisun_arassistanceTD.principalIndicators,
				})
			})
		}else if(projectName === 'airbus'){
			fetch("http://127.0.0.1:3001")
			.then(resp => resp.json())
			.then(resp => {
				this.setState({
					isLoading: false,
					name: resp.airbusTD.projectName,
					principalIndicatorsSummary: resp.airbusTD.principalSummary,
					principalIndicators: resp.airbusTD.principalIndicators,
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
				principalIndicatorsSummary: resp.holisun_arassistanceTD.principalSummary,
				principalIndicators: resp.holisun_arassistanceTD.principalIndicators,
			})
    })
  }

  render(){
	  		const { isLoading, name, principalIndicatorsSummary, principalIndicators } = this.state

	  
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
              <PrincipalPanel 
					   myprojectName = {name}
                       updateProjectData={this.updateProjectData} 
                       principal = {principalIndicatorsSummary}
                       principalArtifacts = {principalIndicators}
               />
              
              </MDBCol>
              </MDBRow>
            </React.Fragment>
            )
    }
  }

}

export default TDPrincipalDashPage;
