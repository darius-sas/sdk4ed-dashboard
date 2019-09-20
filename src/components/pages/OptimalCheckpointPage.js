import React from 'react';
import {PagePanel} from './sections/PagePanel';
import { MDBCol, MDBRow, MDBCard,MDBCardHeader, MDBCardBody, MDBTable, MDBTableHead, MDBTableBody} from "mdbreact";
import PropTypes from 'prop-types'
import {ProgressCard, CountCard, ScoreCard} from './sections/StatusCards'
import PlotlyChart from './sections/Chart';
import 'whatwg-fetch';
import Loader from './sections/Loading'


/**
 * A simple table to show some simple tabular data.
 * This table is meant to show short tabular data and is shown within a content panel for convenience.
 * For more complex data, refer to https://mdbootstrap.com/docs/react/tables/additional/
 */
class BasicTable extends React.Component {

    static propTypes = {
        /**
         * An object that respects as defined here https://mdbootstrap.com/docs/react/tables/additional/
         * It contains the data that will be visualized in the table
         */
        data: PropTypes.object,

        /**
         * The title of the table.
         */
        title: PropTypes.string
    }

    render(){
        var data = this.props.data
        var rows = []
        var uniqueId = 0
        for(var i in data.rows){
            var row = data.rows[i]
            var r = []
            for(var j in data.columns){
                var field = data.columns[j]['field']
                r.push(<td key={uniqueId++}>{row[field]}</td>)
            }
            rows.push(<tr key={uniqueId++}>{r}</tr>)
        }
        var header = []
        for(var h in data.columns)
            header.push(<th key={uniqueId++}>{data.columns[h]['label']}</th>)


        return(
                <MDBTable striped small bordered responsive hover maxHeight="31vh">
                    <MDBTableHead><tr>{header}</tr></MDBTableHead>
                    <MDBTableBody>{rows}</MDBTableBody>
                </MDBTable>
        )
    }
}

const GainOverNumberOfInstructionsPanel = props =>{
  return (
	<PagePanel header="Gain over number of Instructions Between Checkpoints" linkTo="/dependability/gain">
	<MDBRow className="mb-3">
		<MDBCol size="6">
			<PlotlyChart title="Gain over number of Instructions Between Checkpoints" data={props.gain}
                      layout={{ width: 650, margin: {l:40, r:40, t:50, b:50}}} />
        </MDBCol>
		<MDBCol>
			<MDBRow className="mb-3">
				<MDBCol>
    		        <ProgressCard title="Maximum Gain" color="blue darken-3" icon="gain" progress={props.calculationSummary.maximumGain}/>
    		    </MDBCol>
				<MDBCol>
    		        <CountCard title="Number of instructions between checkpoints" color="blue darken-3" icon="cube" value={props.calculationSummary.valueKIndex} description="Instructions"/>
    		    </MDBCol>
			</MDBRow>
			<MDBRow className="mb-3">
	            <MDBCol className="mb-12">
	                <MDBCard className="mb-12">
	                <MDBCardHeader>Gain in respect to Number of Instructions</MDBCardHeader>
	                <MDBCardBody>
	                    <BasicTable title="Gain" data={props.gainTable}/>
	                </MDBCardBody>
	                </MDBCard>
	            </MDBCol>
			</MDBRow>
		</MDBCol>
	</MDBRow>
	</PagePanel>
 )
}

const ExecutionTimeOverNumberOfInstructionsPanel = props =>{
  return (
	<PagePanel header="Execution Time over number of Instructions Between Checkpoints" linkTo="/dependability/ExecutionTime">
	<MDBRow className="mb-3">
		<MDBCol size="6">
			<PlotlyChart title="Execution Time over number of Instructions Between Checkpoints" data={props.executionTime}
                      layout={{ width: 650, margin: {l:40, r:40, t:50, b:50}}} />
        </MDBCol>
		<MDBCol>
			<MDBRow className="mb-3">
					<MDBCol>
    			        <CountCard title="Minimum Execution Time" color="blue darken-3" icon="clock" value={props.calculationSummary.minimumEcp} description="Unit Time"/>
    			    </MDBCol>
					<MDBCol>
    			        <CountCard title="Number of instructions between checkpoints" color="blue darken-3" icon="cube" value={props.calculationSummary.valueKIndex} description="Instructions"/>
    			    </MDBCol>
			</MDBRow>
			<MDBRow className="mb-3">
					<MDBCol className="mb-12">
	                <MDBCard className="mb-12">
	                <MDBCardHeader>Execution Time in respect to Number of Instructions</MDBCardHeader>
	                <MDBCardBody>
	                    <BasicTable title="Gain" data={props.executionTimeTable}/>
	                </MDBCardBody>
	                </MDBCard>
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
class OptimalCheckpointPage extends React.Component {
  constructor(props){
    super(props);
    
    this.state = {
	  gainOverNumberOfInstructions: null,
	  executionTimeOverNumberOfInstructions: null,
	  calculationSummary: null,
	  gainTable: null,
	  executionTimeTable: null
    }
  }

  componentDidMount(){
    fetch("http://127.0.0.1:3002",{
	method: "POST",
	body: "DependabilityDashPageDataPlease",
	headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
    },
	}).then(resp => resp.json())
    .then(resp => {
      console.log("Data received")
      this.setState(resp)
    })
  }

  render(){
    if(this.state.gainOverNumberOfInstructions == null 
		|| this.state.executionTimeOverNumberOfInstructions == null
		|| this.state.calculationSummary == null
		|| this.state.gainTable == null
		|| this.state.executionTimeTable == null){
      return (<Loader/>)
    }else{
      return(
          <React.Fragment>
			  <GainOverNumberOfInstructionsPanel gain={this.state.gainOverNumberOfInstructions}
			  					calculationSummary={this.state.calculationSummary}
								gainTable={this.state.gainTable}/>
			  <ExecutionTimeOverNumberOfInstructionsPanel executionTime={this.state.executionTimeOverNumberOfInstructions}
			  					calculationSummary={this.state.calculationSummary}
								executionTimeTable={this.state.executionTimeTable}/>
            </React.Fragment>)
    }
  }

}

export default OptimalCheckpointPage;
