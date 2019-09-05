import React from 'react';
import {PagePanel} from './sections/PagePanel';
import { MDBCol, MDBRow} from "mdbreact";
import {CountCard} from './sections/StatusCards'
import 'whatwg-fetch';
import { Radar } from 'react-chartjs-2';
import Loader from './sections/Loading'
import FileExplorer from './sections/FileExplorer';
import ContentPanel from './sections/ContentPanel';
import { MDBCard, MDBCardBody, MDBCardHeader, MDBContainer, MDBDropdown, MDBDropdownToggle, MDBDropdownMenu, MDBDropdownItem, MDBFormInline, } from 'mdbreact';
import { parseSonarqubeFiles } from './sections/Tree';


const projects = ["neurasmus8", "maquali13", "arassistance4"]

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

const InterestRadarPanel =  {
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
                data:[0.9805476228578603, 1.0, 0.7897392767031118, 0.28] // data values from prop var are loaded here
            }
        ]
    }


const PrincipalPanel = props => {    
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
                            {props.projects.map((element, index) => (
                                <MDBDropdownItem key={index} onClick={() => props.fetchData(element)}>
                                {element}
                                </MDBDropdownItem>
                            ))}
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
                  <CountCard title="TD IN DAYS"  value={props.principal.tdInDays} icon="clock" />
                  </MDBCol>
                  <MDBCol>
                  <CountCard title="TD IN CURRENCY" color="#33691e light-green darken-4" value={props.principal.tdInCurrency} icon="money-bill-alt"/>
                  </MDBCol>
                  <MDBCol>
                  <CountCard title="BUGS" color="#33691e light-green darken-4" value={props.principal.bugs} icon="bug"/>
                  </MDBCol>
                  <MDBCol>
                  <CountCard title="VULNERABILITIES" color="#33691e light-green darken-4" value={props.principal.vulnerabilities} icon="lock-open"/>
                  </MDBCol>
                   </MDBRow>
                  <MDBRow className="mb-3">
				  <MDBCol>
                  <CountCard title="CODE SMELLS" color="#33691e light-green darken-4" value={props.principal.codeSmells} icon="compress-arrows-alt"/>
                  </MDBCol>
                   <MDBCol>
                  <CountCard title="COVERAGE (%)" color="#33691e light-green darken-4" value={props.principal.coverage} icon="fire-alt"/>
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
                            {/* TODO: Data to fetch */}
                            <Radar data={InterestRadarPanel} options={radarChartOptions} />
                        </MDBContainer>
                    </MDBCardBody>
                    </MDBCard>
                </MDBCol>
      
      </MDBRow>
      </PagePanel>
)}

/**
 * The technical debt dashboard page. The page is assembled using multiple panels.
 * The data is retrieved asynchronously.
 */
class TDPrincipalDashPage extends React.Component {
  constructor(props){
    super(props);
    
    this.fetchProjectData = this.fetchProjectData.bind(this)

    this.state = {
      principalSummary: null, // Principal-related summary information
      principalIndicatorsRadar: null,
      projectNodes: null // File structure of the project
    }
  }

  getApiURL(){
    const host = "http://se.uom.gr:9906/api/"
    return host;
  }

  componentDidMount(){
    this.fetchProjectData("neurasmus8")
  }

  fetchProjectData(project){
    console.log("Fetching project " + project)
    let args = {
      metricKeys: "ncloc,code_smells,bugs,duplicated_lines_density,coverage,effort_to_reach_maintainability_rating_a", 
      component: project
    }
    const link = `http://se.uom.gr:9906/api/measures/component_tree?metricKeys=${encodeURIComponent(args.metricKeys)}&component=${encodeURIComponent(args.component)}`
    
    fetch(link, { headers: {"Accept": "*/*"}})
      .then(resp => resp.json())
      .then(data => {
        data = data.baseComponent.measures
        const getMetricValue = (data, name) => data.filter((data)=> data.metric == name)[0].value;
        const principalSummary = {
          tdInDays: getMetricValue(data, "effort_to_reach_maintainability_rating_a"),
          tdInCurrency: 0,
          bugs: getMetricValue(data, "bugs"),
          vulnerabilities: 0,
          codeSmells: getMetricValue(data, "code_smells"),
          coverage: getMetricValue(data, "coverage"),
          duplCode: getMetricValue(data, "duplicated_lines_density")
        }
        this.setState({principalSummary})
      })
      .catch(err => console.log("Failed to fetch " + err))

    args = {
      qualifiers:"DIR",
      component: project
    }
    
    const linkDirs = `http://se.uom.gr:9906/api/components/tree?component=${encodeURIComponent(args.component)}`

    fetch(linkDirs)
      .then(resp => resp.json())
      .then(data => {
        const projectNodes = parseSonarqubeFiles(data)  
        this.setState({projectNodes})
      })
    }

  render(){
    if(this.state.principalSummary == null){
      return (<Loader/>)
    }else{
      return(
          <React.Fragment>
            <MDBRow>
              <MDBCol size="3">
              <ContentPanel title="Project explorer">
                  <FileExplorer onFetchData={() => {return this.state.projectNodes} }></FileExplorer>
              </ContentPanel>
              </MDBCol>
              <MDBCol>
              <PrincipalPanel principal={this.state.principalSummary}
                              projects={projects}
                              fetchData={this.fetchProjectData}/>
              </MDBCol>
              </MDBRow>
            </React.Fragment>)
    }
  }

}

export default TDPrincipalDashPage;
