
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
import { MDBCard, MDBCardBody, MDBCardHeader, MDBDropdown, MDBDropdownToggle, MDBDropdownMenu, MDBDropdownItem, MDBFormInline, MDBTable, MDBTableBody, MDBTableHead } from 'mdbreact';
//============== Import Highcharts ==============//
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

const NewCodePanel = props =>{
	
	const options = {
	
            chart: {
        type: 'column'
    },
    title: {
        text: 'Technical Debt Evolution over time'
    },
    xAxis: {
        categories: ['Transition 1', 'Transition 2', 'Transition 3', 'Transition 4']
    },
    yAxis: {
        min: 0,
        title: {
            text: 'Technical Debt'
        },
        stackLabels: {
            enabled: true,
            style: {
                fontWeight: 'bold',
                color: ( // theme
                    Highcharts.defaultOptions.title.style &&
                    Highcharts.defaultOptions.title.style.color
                ) || 'gray'
            }
        }
    },
    legend: {
        align: 'right',
        x: -30,
        verticalAlign: 'top',
        y: 25,
        floating: true,
        backgroundColor:
            Highcharts.defaultOptions.legend.backgroundColor || 'white',
        borderColor: '#CCC',
        borderWidth: 1,
        shadow: false
    },
    tooltip: {
        headerFormat: '<b>{point.x}</b><br/>',
        pointFormat: '{series.name}: {point.y}<br/>Total: {point.stackTotal}'
    },
   
    series: [{
        name: 'TD Density New Code',
        data: props.densityNC.data,
        color: "#278649",
    }, {
        name: 'TD Density',
        data: props.densityTD.data,
        color: "#8E2E26",
    }]
    };
	
	
  return (
    <PagePanel header="TD New Code" linkTo="new_code">    
                 
   <MDBRow className="mb-4">
            <MDBCol md="12" lg="12" className="mb-12">
                <MDBCard className="mb-12">
                <MDBCardHeader className="sdk4ed-color">Project</MDBCardHeader>
                <MDBCardBody>
                    <MDBFormInline className="md-form m-0">
                        <MDBDropdown>
                        
                         {/*
                            <MDBDropdownToggle caret className="white-text" color="  light-green darken-4">
                                Project
                            </MDBDropdownToggle>
                            
                           
                            
                            <MDBDropdownMenu basic>
                                <MDBDropdownItem onClick={(param) => props.updateProjectData('holisun_arassistance')}>Holisun Arassistance</MDBDropdownItem>
                                <MDBDropdownItem onClick={(param) => props.updateProjectData('airbus')}>Airbus</MDBDropdownItem>
                                <MDBDropdownItem onClick={(param) => props.updateProjectData('neurasmus')}>Neurasmus</MDBDropdownItem>				
                            </MDBDropdownMenu>
                             
                            */}
                          
                        </MDBDropdown>
                        <h4 style={{color:'#548235'}}>{props.myprojectName}</h4>
                    </MDBFormInline>
                </MDBCardBody>
                </MDBCard>
            </MDBCol>
      </MDBRow>
      
    
    <MDBRow className="mb-12">
    
        <MDBCol size="12">
            {/*============== Render Highchart here ==============*/}
            <HighchartsReact
                highcharts={Highcharts}
                options={options}
            />
            {/*=========================================*/}
        </MDBCol>
        
    </MDBRow>
    
   <MDBRow className="mb-12">
     
        <MDBCol size="12">
          <BasicTable title="Top 5 Violations in new code" data={props.violations}/>
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
class TDNewCodeDashPage extends React.Component {
  constructor(props){
    super(props);
    
    this.state = {
		
	isLoading: false,
	name: '',
	topViolationsNewCode: {}, 
	densityComparisonChart: {},
	densityOverTimeChart: {},
	densitycomparison: null,
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
				topViolationsNewCode: resp.topViolationsNewCode,
				densityComparisonChart: resp.newCodeLineChartTD,
				densityOverTimeChart: resp.newCodeLineChartNC,
				densitycomparison: resp.densityComparisonChart,


			})
    })
  }

  render(){
	 const { isLoading, name, topViolationsNewCode, densityComparisonChart, densityOverTimeChart, densitycomparison } = this.state

    
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
              <NewCodePanel 
              				myprojectName = {name}
							violations={topViolationsNewCode}
                            densityTD={densityComparisonChart}
                            densityNC={densityOverTimeChart}
                            comp={densitycomparison}/>
              </MDBCol>
              </MDBRow>
            </React.Fragment>
            )
    }
  }

}

export default TDNewCodeDashPage;
