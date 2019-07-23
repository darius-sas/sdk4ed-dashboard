import React from 'react';
import {PagePanel} from './sections/PagePanel';
import { MDBCol, MDBRow} from "mdbreact";
import {ProgressCard, CountCard, ScoreCard} from './sections/StatusCards'
import PlotlyChart from './sections/Chart';
import BasicTable from './sections/Table';
import 'whatwg-fetch';
import Loader from './sections/Loading'

const HotspotsPanel = props => {
  return (
      <PagePanel header="Energy Hot-spots" linkTo="/energy/hotspots">
      <MDBRow className="mb-3">
          <MDBCol size="5" mr="2">
            <BasicTable title="Top 5 Hot-spots" data={props.hotspots}/>
          </MDBCol>

          <MDBCol>
          <MDBRow className="mb-3">
            <MDBCol>
                  <CountCard title="CPU cycles" color="grey darken-3" value={props.mysummary.cpucycles} icon="fas fa-microchip" description="Profilling Tools"/>
            </MDBCol>
            </MDBRow>
            <MDBRow className="mb-3">
            <MDBCol>
            		<ProgressCard title="Ratio of branch misses" color="orange darken-3" progress={props.mysummary.branchmiss} icon="fas fa-code-branch"/>
            </MDBCol>
             <MDBCol>
                  <CountCard title="Memory accesses" color="purple darken-3" value={props.mysummary.memoryaccesses} icon="fas fa-memory"/>
            </MDBCol>
            </MDBRow>

            <MDBRow className="mb-3">

            <MDBCol>
            	  <ProgressCard title="D Cache miss rate" color="red darken" icon="fas fa-database" progress={props.mysummary.cachemiss} description="Data cache L1"/>
            </MDBCol>
            <MDBCol>
            	  <ProgressCard title="I Cache miss rate" color="blue darken" icon="fas fa-terminal" progress={props.mysummary.Icachemiss}/>
            </MDBCol>
            </MDBRow>
            <MDBRow>
            <MDBCol>
                  <CountCard title="Memory accesses" color="purple darken-3" value={props.mysummary.memoryaccesses} icon="fas fa-memory"/>
            </MDBCol>
            <MDBCol>
                <CountCard title="Data Races" color="grey darken-3" value={props.mysummary.dataraces} icon="fas fa-traffic-light"/>
            </MDBCol>
            </MDBRow>
          </MDBCol>
      </MDBRow>
      </PagePanel>
)}

const OffloadingPanel = props => {
  
  return (
      <PagePanel header="GPU energy consumption estimation" linkTo="/energy/offloading">
      <MDBRow className="mb-3">
          <MDBCol size="5" mr="2">
            <BasicTable title="Top 5 Hot-spots" data={props.hotspots}/>
          </MDBCol>

          <MDBCol>
          <MDBRow className="mb-3">
            <MDBCol>
                  <CountCard title="Independent operations in window size" color="grey darken-3" value={props.mysummary.ilp} icon="fas fa-list-ol" description="Pin Tools"/>
            </MDBCol>
            <MDBCol>
                  <CountCard title="Independent operations in window size Rate" color="grey darken-3" value={props.mysummary.ilpRate} icon="fas fa-list-ol" description="Pin Tools"/>
            </MDBCol>
            </MDBRow>
            <MDBRow className="mb-3">
            <MDBCol>
            		<ProgressCard title="Memory" color="red darken-3" progress={props.mysummary.mem} icon="fas fa-memory"/>
            </MDBCol>
             <MDBCol>
                  <ProgressCard title="Control" color="orange darken-3" progress={props.mysummary.cont} icon="fas fa-code-branch"/>
            </MDBCol>
            <MDBCol>
                  <ProgressCard title="Integer" color="green darken-3" progress={props.mysummary.int} icon="fas fa-sort-numeric-up"/>
            </MDBCol>
            <MDBCol>
                  <ProgressCard title="Floating Point" color="purple darken-3" progress={props.mysummary.fp} icon="fas fa-sort-numeric-up"/>
            </MDBCol>
            <MDBCol>
                  <ProgressCard title="Division" color="purple darken-3" progress={props.mysummary.div} icon="fas fa-divide"/>
            </MDBCol>
            </MDBRow>

            <MDBRow className="mb-3">
            <MDBCol>
            	  <ProgressCard title="Cache cold misses" color="blue" icon="fas fa-thermometer-empty" progress={props.mysummary.coldmiss}/>
            </MDBCol>
            <MDBCol>
            	  <ProgressCard title="Stride 0" color="orange darken" icon="fas fa-walking" progress={props.mysummary.stride}/>
            </MDBCol>
            </MDBRow>
            <MDBRow>
            </MDBRow>
          </MDBCol>
      </MDBRow>
      </PagePanel>
)
}

//const NewCodePanel = props =>{
//  return (
//    <PagePanel header="Technical debt new code" linkTo="/techdebt/interest">
//    <MDBRow className="mb-3">
//        <MDBCol size="3" mr="1">
//          <PlotlyChart title="TD density of new code vs existing" data={props.densitycomparison}
//          layout={{width: 300, height:600}} />
//        </MDBCol>
//        <MDBCol size="6">
//          <PlotlyChart title="TD Density of new code over time" data={props.density}
//                      layout={{ width: 650, margin: {l:40, r:40, t:50, b:50}}} />
//        </MDBCol>
//        <MDBCol size="3">
//          <BasicTable title="Top 5 Violations in new code" data={props.violations}/>
//        </MDBCol>
//    </MDBRow>
//    </PagePanel>
//  )
//}

/**
 * The technical debt dashboard page. The page is assembled using multiple panels.
 * The data is retrieved asynchronously.
 */
class EnergyDashPage extends React.Component {
  constructor(props){
    super(props);
    
    this.state = {
      energyIndicatorsSummary: null, // Principal-related summary information
      interestSummary: null, // Interest-related summary information
      principalOverTimeChart: null, // Chart for principal over time
      interestOverTimeChart: null, // Chart for interest over time
      topHotspots: null, // The top violations wrt frequency
      topHotspotsGPU: null, // The top violations wrt frequency in new code
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
    if(this.state.energyIndicatorsSummary == null){
      return (<Loader/>)
    }else{
      return(
          <React.Fragment>
              <HotspotsPanel mysummary={this.state.energyIndicatorsSummary} 
                              principal={this.state.principalOverTimeChart}
                              hotspots={this.state.topHotspots} />
              <OffloadingPanel hotspots={this.state.topHotspotsGPU} 
                            mysummary={this.state.acelerationIndicatorsSummary} interest={this.state.interestOverTimeChart} hotspots={this.state.topHotspotsGPU}/>
            </React.Fragment>)
    }
  }

}

export default EnergyDashPage;
