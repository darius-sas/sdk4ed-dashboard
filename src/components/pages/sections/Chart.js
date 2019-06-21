import React from 'react';
import Plot from 'react-plotly.js';
import ContentPanel from './ContentPanel' 

class PlotlyChart extends React.Component {
    constructor(props) {
        super(props);
        this.state = { data: props.data, layout: props.layout, frames: props.frames, config: props.frames };
    }

    render() {
        return (
            <ContentPanel title={this.props.title} className="pl-0 pr-0">
            <Plot 
                data={this.state.data}
                layout={this.state.layout}
                frames={this.state.frames}
                config={this.state.config}
                onInitialized={(figure) => this.setState(figure)}
                onUpdate={(figure) => this.setState(figure)}
            />
            </ContentPanel>
        );
    }
}

export default PlotlyChart;