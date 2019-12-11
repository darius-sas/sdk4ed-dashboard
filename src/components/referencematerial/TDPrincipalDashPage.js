import React from 'react';
import {PagePanel} from '../pages/sections/PagePanel';
import { MDBCol, MDBRow} from "mdbreact";
import {CountCard} from '../pages/sections/StatusCards'
import 'whatwg-fetch';
import { Radar } from 'react-chartjs-2';
import Loader from '../pages/sections/Loading'
import FileExplorer from '../pages/sections/FileExplorer';
import ContentPanel from '../pages/sections/ContentPanel';
import { MDBCard, MDBCardBody, MDBCardHeader, MDBContainer, MDBDropdown, MDBDropdownToggle, MDBDropdownMenu, MDBDropdownItem, MDBFormInline, } from 'mdbreact';
import { parseSonarqubeFiles } from '../pages/sections/Tree';


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
                                Select project
                            </MDBDropdownToggle>
                            <MDBDropdownMenu basic>
                            {props.projects.map((element, index) => (
                                <MDBDropdownItem key={index} onClick={() => props.fetchData(element)}>
                                {element}
                                </MDBDropdownItem>
                            ))}
                            </MDBDropdownMenu>
                        </MDBDropdown>
                        <h4 className="ml-3" style={{color:'#548235'}}>{props.currentProjectName}</h4>
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
    this.updatePrincipalSummary = this.updatePrincipalSummary.bind(this)
    this.updateFileSystemTree = this.updateFileSystemTree.bind(this)
    this.updateOnSelect = this.updateOnSelect.bind(this)

    this.state = {
      principalSummary: null, // Principal-related summary information
      principalIndicatorsRadar: null,
      projectNodes: null, // File structure of the project
      rawData: null, // Raw data as received from the server for a given project.
      currentProjectName: "", // Current project full name
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
    console.log("Fetching project data " + project)
    let args = {
      metricKeys: "ncloc,code_smells,bugs,duplicated_lines_density,coverage,effort_to_reach_maintainability_rating_a", 
      component: project
    }
    const link = `${this.getApiURL()}measures/component_tree?metricKeys=${encodeURIComponent(args.metricKeys)}&component=${encodeURIComponent(args.component)}`
    
    fetch(link, { headers: {"Accept": "*/*"}})
      .then(resp => resp.json())
      .then(this.updatePrincipalSummary)
      .catch(err => console.log("Failed to updated principal summary: " + err))
    
    const linkDirs = `${this.getApiURL()}components/tree?component=${encodeURIComponent(args.component)}`

    fetch(linkDirs)
      .then(resp => resp.json())
      .then(this.updateFileSystemTree)
      .catch(err => console.log("Failed to render file system tree: " + err))
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
                  <FileExplorer onFetchData={() => {return this.state.projectNodes} }
                                onSelect={this.updateOnSelect}>
                  </FileExplorer>
              </ContentPanel>
              </MDBCol>
              <MDBCol>
              <PrincipalPanel principal={this.state.principalSummary}
                              projects={projects}
                              fetchData={this.fetchProjectData}
                              currentProjectName={this.state.currentProjectName}/>
              </MDBCol>
              </MDBRow>
            </React.Fragment>)
    }
  }

  updatePrincipalSummary(data){
    this.setState({rawData: data, currentProjectName: data.baseComponent.name})
    data = data.baseComponent.measures
    this.setState({principalSummary: this.buildPrincipalSummary(data)})
  }

  updateFileSystemTree(data){
      const projectNodes = parseSonarqubeFiles(data)  
      this.setState({projectNodes})
  }

  updateOnSelect(file){
    let data = this.state.rawData.components.find(c => {
      let trimmedPath = file.path
      if(file.path.lastIndexOf("/") == (file.path.length - 1)){
        trimmedPath = file.path.substring(0, file.path.length - 1)
      }
      return trimmedPath === c.path
    })
    if(!data){
      console.log("Could not find selected component: " + file.path)
      return
    }
    data = data.measures
    this.setState({principalSummary: this.buildPrincipalSummary(data)})
  }

  buildPrincipalSummary(data){
    const getMetricValue = (data, name) => {const value = data.find((data)=> data.metric === name); return value ? value.value : 0;};
    const principalSummary = {
      tdInDays: Number(getMetricValue(data, "effort_to_reach_maintainability_rating_a") / 24).toFixed(0),
      tdInCurrency: 0,
      bugs: getMetricValue(data, "bugs"),
      vulnerabilities: 0,
      codeSmells: getMetricValue(data, "code_smells"),
      coverage: getMetricValue(data, "coverage"),
      duplCode: getMetricValue(data, "duplicated_lines_density")
    }
    return principalSummary;
  }
}

export default TDPrincipalDashPage;
