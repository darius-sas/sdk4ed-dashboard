import React, { Component } from 'react';
import { MDBCol, MDBCard, MDBCardBody, MDBCardHeader, MDBRow, MDBListGroup, MDBListGroupItem, MDBBadge, MDBIcon } from 'mdbreact';
import { Bar, Line } from 'react-chartjs-2';

class ProjectInfo extends Component {
    render(){
        const dataBar = {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
            datasets: [
                {
                    label: '#1',
                    data: [12, 39, 3, 50, 2, 32, 84],
                    backgroundColor: 'rgba(245, 74, 85, 0.5)',
                    borderWidth: 1
                }, {
                    label: '#2',
                    data: [56, 24, 5, 16, 45, 24, 8],
                    backgroundColor: 'rgba(90, 173, 246, 0.5)',
                    borderWidth: 1
                }, {
                    label: '#3',
                    data: [12, 25, 54, 3, 15, 44, 3],
                    backgroundColor: 'rgba(245, 192, 50, 0.5)',
                    borderWidth: 1
                }
            ]
        };
        const dataLine = {
            labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
            datasets: [
                {
                    label: 'My First dataset',
                    fill: false,
                    lineTension: 0.1,
                    backgroundColor: 'rgba(75,192,192,0.4)',
                    borderColor: 'rgba(75,192,192,1)',
                    borderCapStyle: 'butt',
                    borderDash: [],
                    borderDashOffset: 0.0,
                    borderJoinStyle: 'miter',
                    pointBorderColor: 'rgba(75,192,192,1)',
                    pointBackgroundColor: '#fff',
                    pointBorderWidth: 1,
                    pointHoverRadius: 5,
                    pointHoverBackgroundColor: 'rgba(75,192,192,1)',
                    pointHoverBorderColor: 'rgba(220,220,220,1)',
                    pointHoverBorderWidth: 2,
                    pointRadius: 1,
                    pointHitRadius: 10,
                    data: [65, 59, 80, 81, 56, 55, 40]
                }
            ]
        };

        const barChartOptions = {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                xAxes: [{
                    barPercentage: 1,
                    gridLines: {
                        display: true,
                        color: 'rgba(0, 0, 0, 0.1)'
                    }
                }],
                yAxes: [{
                    gridLines: {
                        display: true,
                        color: 'rgba(0, 0, 0, 0.1)'
                    },
                    ticks: {
                        beginAtZero: true
                    }
                }]
            }
        };

        return (

            <MDBRow className="mb-4">
                <MDBCol md="6" style={{paddingLeft: 0}}>
                    <MDBCard>
                        <MDBCardHeader>Smells over time</MDBCardHeader>
                        <MDBCardBody>
                            <Line data={dataLine} height={50}  />
                        </MDBCardBody>
                    </MDBCard>
                </MDBCol>
                <MDBCol md="4" className="mb-4" style={{paddingRight: 0}}>
                    <MDBCard className="mb-4">
                        <MDBCardHeader>Project name</MDBCardHeader>
                        <MDBCardBody>
                            <h3 className="h3-responsive font-weight-bold mr-3">

                            </h3>
                        </MDBCardBody>
                    </MDBCard>
                </MDBCol>
            </MDBRow>
        )
    }
}

export default ProjectInfo;

