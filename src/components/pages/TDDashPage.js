import React from 'react';
import {PagePanel, ChartContainer} from './sections/PagePanel';
import { MDBCol, MDBRow } from "mdbreact";
import {ProgressBar, CountBar} from './sections/ProgressBars'
import PlotlyChart from './sections/Chart'


const dataDoughnut = {
    labels: ["Red", "Green", "Yellow", "Grey", "Dark Grey"],
    datasets: [{
        data: [300, 50, 100, 40, 120],
        backgroundColor: ["#F7464A", "#46BFBD", "#FDB45C", "#949FB1", "#4D5360"],
        hoverBackgroundColor: ["#FF5A5E", "#5AD3D1", "#FFC870", "#A8B3C5", "#616774"]
    }]
};

const lineChart = [{
  y: [65, 59, 80, 81, 56, 55, 40],
  x: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
  type: 'scatter',
  mode: 'line',
  marker: {color: 'red'},
  autosize: true,
  margin: {l:20, r:20, t:50, b:50}
}];

const dataRadar = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
    datasets: [
        {
          label: '#1',
          backgroundColor: 'rgba(245, 74, 85, 0.5)',
          data: [65, 59, 80, 81, 56, 55, 40]
        },
        {
          label: '#2',
          backgroundColor: 'rgba(90, 173, 246, 0.5)',
          data: [12, 42, 121, 56, 24, 12, 2]
        },
        {
          label: '#3',
          backgroundColor: 'rgba(245, 192, 50, 0.5)',
          data: [2, 123, 154, 76, 54, 23, 5]
        }
      ]
};

const TDDashPage =  () => {
  return (
        <PagePanel header="Technical debt principal" linkTo="/techdebt/principal">
        <MDBRow className="mb-3">
            <MDBCol sm="6">
              <PlotlyChart title="Principal over time" 
                data={lineChart}
                layout={{
                  width: 650,
                  margin: {l:40, r:40, t:50, b:50}}}
                />
            </MDBCol>
            <MDBCol sm="2">
                  <ProgressBar title="coverage" color="grey darken-3" barColor="green" value="90%" progress="90" icon="check-circle"/>
            </MDBCol>
            <MDBCol sm="2">
                  <CountBar title="bugs" color="red darken-3" value="350" icon="bug" description="A"/>
            </MDBCol>
        </MDBRow>
        </PagePanel>
  )
}

export default TDDashPage;