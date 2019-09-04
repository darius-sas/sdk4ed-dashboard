import React from 'react';
import {PagePanel} from './sections/PagePanel';
import { MDBCol, MDBRow, MDBCard, MDBCardBody, MDBDropdown, MDBDropdownToggle, MDBDropdownMenu, MDBDropdownItem } from "mdbreact";
import {ProgressCard, CountCard} from './sections/StatusCards'
import BasicTable from './sections/Table';
import 'whatwg-fetch';
import Loader from './sections/Loading'

// The Project Panel
const ProjectPanel = props => {
    return (
        <MDBRow className="mb-4">
            <MDBCol md="12" lg="12" className="mb-12">
                <MDBCard className="mb-12">
                <MDBCardBody>
                    <MDBRow>
                        <MDBCol>
                            <h3 style={{color:'#548235'}}>Project: <span style={{color:'#000000'}}>{props.myprojectName}</span></h3>
                        </MDBCol>
                        <MDBCol>
                            <MDBDropdown>
                                <MDBDropdownToggle caret className="white-text" color="  light-green darken-4">
                                    Select Project
                                </MDBDropdownToggle>
                                <MDBDropdownMenu basic>
                                    <MDBDropdownItem onClick={(param) => props.updateProjectData('holisun')}>Holisun</MDBDropdownItem>
                                    <MDBDropdownItem onClick={(param) => props.updateProjectData('neurasmus')}>Neurasmus</MDBDropdownItem>
                                    <MDBDropdownItem onClick={(param) => props.updateProjectData('airbus')}>Airbus</MDBDropdownItem>
                                </MDBDropdownMenu>
                            </MDBDropdown>
                        </MDBCol>
                    </MDBRow>
                </MDBCardBody>
                </MDBCard>
            </MDBCol>
        </MDBRow>
    )
}

const HotspotsPanel = props => {
	return (
		<PagePanel header="Energy Hot-spots" linkTo="/energy/hotspots">
			<MDBRow className="mb-3">			

				<MDBCol size="5" mr="2">			

					<MDBDropdown>
	                    <MDBDropdownToggle caret className="white-text" color="  light-green darken-4">
	                        Hotspot Granularity
	                    	</MDBDropdownToggle>
	                    	<MDBDropdownMenu basic>
	                    		<MDBDropdownItem onClick={(param) => props.updateHotspotsData('function',props.myprojectName)}>Function Level</MDBDropdownItem>
	                    		<MDBDropdownItem onClick={(param) => props.updateHotspotsData('loop',props.myprojectName)}>Statements Level</MDBDropdownItem>
	                		</MDBDropdownMenu>
	                    </MDBDropdown>	

					<BasicTable title="Energy Hot-spots" data={props.hotspots}/>
				</MDBCol>

				<MDBCol>
					<MDBRow className="mb-3">
						<MDBCol>
							<CountCard title="CPU cycles" color="#33691e light-green darken-4" value={props.myEnergySummary.cpucycles} icon="fas fa-microchip" description="Profilling Tools"/>
						</MDBCol>
						<MDBCol>
							<CountCard title="Data Races" color="#33691e light-green darken-4" value={props.myEnergySummary.dataraces} icon="fas fa-traffic-light"/>
						</MDBCol>
						<MDBCol>
							<CountCard title="Memory accesses" color="#33691e light-green darken-4" value={props.myEnergySummary.memoryaccesses} icon="fas fa-memory"/>
						</MDBCol>
					</MDBRow>
					<MDBRow className="mb-3">
						<MDBCol>
							<CountCard title="Ratio of branch misses" color="#33691e light-green darken-4" value={props.myEnergySummary.branchmiss} icon="fas fa-code-branch"/>
						</MDBCol>
						<MDBCol>
							<CountCard title="I Cache miss rate" color="#33691e light-green darken-4" icon="fas fa-terminal" value={props.myEnergySummary.Icachemiss}/>
						</MDBCol>
						<MDBCol>
							<CountCard title="D Cache miss rate" color="#33691e light-green darken-4" icon="fas fa-database" value={props.myEnergySummary.cachemiss} description="Data cache L1"/>
						</MDBCol>
					</MDBRow>
				</MDBCol>
			</MDBRow>
		</PagePanel>
	)
}

const OffloadingPanel = props => {
  	if (props.myprojectName != 'neurasmus'){
  		return (null)
  	}
	return (
		<PagePanel header="GPU energy consumption estimation" linkTo="/energy/offloading">
			<MDBRow className="mb-3">

				<MDBCol size="5" mr="2">

					<MDBDropdown>
	                    <MDBDropdownToggle caret className="white-text" color="  light-green darken-4">
	                        Hotspot Granularity
	                    	</MDBDropdownToggle>
	                    	<MDBDropdownMenu basic>
	                    		<MDBDropdownItem onClick={(param) => props.updateHotspotsData('function',props.myprojectName)}>Function Level</MDBDropdownItem>
	                    		<MDBDropdownItem onClick={(param) => props.updateHotspotsData('loop',props.myprojectName)}>Statements Level</MDBDropdownItem>
	                		</MDBDropdownMenu>
	                </MDBDropdown>

					<BasicTable title="Energy Hot-spots" data={props.hotspotsGPU}/>
				</MDBCol>
				<MDBCol>
					<MDBRow className="mb-3">
						<MDBCol>
							<CountCard title="Independent operations in window size" color="grey darken-3" value={props.myAccelerationSummary.ilp} icon="fas fa-list-ol"/>
						</MDBCol>
						<MDBCol>
							<CountCard title="Independent operations in window size Rate" color="grey darken-3" value={props.myAccelerationSummary.ilpRate} icon="fas fa-list-ol"/>
						</MDBCol>
					</MDBRow>
					<MDBRow className="mb-3">
						<MDBCol>
							<CountCard title="Memory" color="red darken-3" value={props.myAccelerationSummary.mem} icon="fas fa-memory"/>
						</MDBCol>
						<MDBCol>
							<CountCard title="Control" color="orange darken-3" value={props.myAccelerationSummary.cont} icon="fas fa-code-branch"/>
						</MDBCol>
						<MDBCol>
							<CountCard title="Cache cold misses" color="blue" icon="fas fa-thermometer-empty" value={props.myAccelerationSummary.coldmiss}/>
						</MDBCol>
						<MDBCol>
							<CountCard title="Stride 0" color="orange darken" icon="fas fa-walking" value={props.myAccelerationSummary.stride}/>
						</MDBCol>
					</MDBRow>
					<MDBRow className="mb-3">
						<MDBCol>
							<CountCard title="Integer" color="green darken-3" value={props.myAccelerationSummary.int} icon="fas fa-sort-numeric-up"/>
						</MDBCol>
						<MDBCol>
							<CountCard title="Floating Point" color="purple darken-3" value={props.myAccelerationSummary.fp} icon="fas fa-sort-numeric-up"/>
						</MDBCol>
						<MDBCol>
							<CountCard title="Division" color="cyan darken-3" value={props.myAccelerationSummary.div} icon="fas fa-divide"/>
						</MDBCol>
					</MDBRow>
				</MDBCol>
			</MDBRow>
		</PagePanel>
	)
}


/**
 * The technical debt dashboard page. The page is assembled using multiple panels.
 * The data is retrieved asynchronously.
 */
class EnergyDashPage extends React.Component {
	
	constructor(props){
		super(props);
		
		this.state = {
			isLoading: false,
			name: '',
			energyIndicatorsSummary: {},
			acelerationIndicatorsSummary: {},
			topHotspots: {},
			topHotspotsGPU: {}
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
					name: resp.neurasmus.projectName,
					energyIndicatorsSummary: resp.neurasmus.energyIndicatorsSummary,
					acelerationIndicatorsSummary: resp.neurasmus.acelerationIndicatorsSummary,
					topHotspots: resp.neurasmus.topHotspotsFunction,
					topHotspotsGPU: resp.neurasmus.topHotspotsGPUFunction,
				})
			})
		}else if(projectName === 'airbus'){
			fetch("http://127.0.0.1:3001")
			.then(resp => resp.json())
			.then(resp => {
				this.setState({
					isLoading: false,
					name: resp.airbus.projectName,
					energyIndicatorsSummary: resp.airbus.energyIndicatorsSummary,
					acelerationIndicatorsSummary: resp.airbus.acelerationIndicatorsSummary,
					topHotspots: resp.airbus.topHotspotsFunction,
					topHotspotsGPU: resp.airbus.topHotspotsGPUFunction,
				})
			})
		}else if(projectName === 'holisun'){
			fetch("http://127.0.0.1:3001")
			.then(resp => resp.json())
			.then(resp => {
				this.setState({
					isLoading: false,
					name: resp.holisun.projectName,
					energyIndicatorsSummary: resp.holisun.energyIndicatorsSummary,
					acelerationIndicatorsSummary: resp.holisun.acelerationIndicatorsSummary,
					topHotspots: resp.holisun.topHotspotsFunction,
					topHotspotsGPU: resp.holisun.topHotspotsGPUFunction,
				})
			})
		}
	}

	updateHotspotsData = (granularity,projectName) => {
		this.setState({ 
            isLoading: false,
        });
		
		if (granularity === 'function'){
			console.log(projectName)
			if(projectName === 'neurasmus'){
				console.log("heyyyyyyyyyy")
				fetch("http://127.0.0.1:3001")
				.then(resp => resp.json())
				.then(resp => {
					this.setState({
						isLoading: false,
						topHotspots: resp.neurasmus.topHotspotsFunction,
						topHotspotsGPU: resp.neurasmus.topHotspotsGPUFunction,
					})
				})
			}else if(projectName === 'airbus'){
				fetch("http://127.0.0.1:3001")
				.then(resp => resp.json())
				.then(resp => {
					this.setState({
						isLoading: false,
						topHotspots: resp.airbus.topHotspotsFunction,
						topHotspotsGPU: resp.airbus.topHotspotsGPUFunction,
					})
				})
			}else if(projectName === 'holisun'){
				fetch("http://127.0.0.1:3001")
				.then(resp => resp.json())
				.then(resp => {
					this.setState({
						isLoading: false,
						topHotspots: resp.holisun.topHotspotsFunction,
						topHotspotsGPU: resp.holisun.topHotspotsGPUFunction,
					})
				})
			}

		}else if (granularity === 'loop'){
			console.log("heeeyyyy")
			if(projectName === 'neurasmus'){
				console.log("heeeyyyy")
				fetch("http://127.0.0.1:3001")
				.then(resp => resp.json())
				.then(resp => {
					this.setState({
						isLoading: false,
						topHotspots: resp.neurasmus.topHotspotsLoop,
						topHotspotsGPU: resp.neurasmus.topHotspotsGPULoop,
					})
				})
			}else if(projectName === 'airbus'){
				fetch("http://127.0.0.1:3001")
				.then(resp => resp.json())
				.then(resp => {
					this.setState({
						isLoading: false,
						topHotspots: resp.airbus.topHotspotsLoop,
						topHotspotsGPU: resp.airbus.topHotspotsGPULoop,
					})
				})
			}else if(projectName === 'holisun'){
				fetch("http://127.0.0.1:3001")
				.then(resp => resp.json())
				.then(resp => {
					this.setState({
						isLoading: false,
						topHotspots: resp.holisun.topHotspotsLoop,
						topHotspotsGPU: resp.holisun.topHotspotsGPULoop,
					})
				})
			}			
		}
	}

	componentDidMount(){
		this.setState({ 
            isLoading: true,
        });
		
		fetch("http://127.0.0.1:3001")
		.then(resp => resp.json())
		.then(resp => {
			this.setState({
				isLoading: false,
				name: resp.neurasmus.projectName,
				energyIndicatorsSummary: resp.neurasmus.energyIndicatorsSummary,
				acelerationIndicatorsSummary: resp.neurasmus.acelerationIndicatorsSummary,
				topHotspots: resp.neurasmus.topHotspotsFunction,
				topHotspotsGPU: resp.neurasmus.topHotspotsGPUFunction,
			})
		})
	}

	render(){
		const { isLoading, name, energyIndicatorsSummary, acelerationIndicatorsSummary, topHotspotsFunction, topHotspotsLoop, topHotspotsGPUFunction, topHotspotsGPULoop } = this.state
		
		if(isLoading){
            return (<Loader/>)
        }
		
		return(
			<React.Fragment>
				<ProjectPanel
					myprojectName={name}
					updateProjectData={this.updateProjectData}
				/>
				<HotspotsPanel 
					myprojectName={name}
					updateHotspotsData={this.updateHotspotsData}
					myEnergySummary={energyIndicatorsSummary} 
					hotspots={this.state.topHotspots}
				/>
				<OffloadingPanel
					myprojectName={name}
					updateHotspotsData={this.updateHotspotsData}
					hotspotsGPU={this.state.topHotspotsGPU} 
					myAccelerationSummary={acelerationIndicatorsSummary}
				/>
			</React.Fragment>
		)
	}
}

export default EnergyDashPage;
