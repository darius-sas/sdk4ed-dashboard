import React from 'react';
import Plot from 'react-plotly.js';
import { MDBCard, MDBCardBody, MDBCardTitle, MDBCardText, MDBCardHeader, MDBBtn, MDBContainer } from 'mdbreact'

const ChartContainer = props => {
    return (
        <MDBContainer>
        <MDBCard>
        <MDBCardHeader>{props.title}</MDBCardHeader>
        <MDBCardBody className="pl-0 pr-0">
            {props.children}
        </MDBCardBody>
        </MDBCard>
        </MDBContainer>
    )
  }
  

class PlotlyChart extends React.Component {
    constructor(props) {
        super(props);
        this.state = { data: props.data, layout: props.layout, frames: props.frames, config: props.frames };
    }

    render() {
        return (
            <ChartContainer title={this.props.title} ref="plotContainer" >
            <Plot className="" 
                data={this.state.data}
                layout={this.state.layout}
                frames={this.state.frames}
                config={this.state.config}
                onInitialized={(figure) => this.setState(figure)}
                onUpdate={(figure) => this.setState(figure)}
            />
            </ChartContainer>
        );
    }
}

export default PlotlyChart;