import React from 'react';
import logo from "../assets/logo.png";
import { MDBListGroup, MDBListGroupItem, MDBIcon } from 'mdbreact';
import { NavLink } from 'react-router-dom';

const sdk4ed_style={background: '#467a39', color: 'white'}

const TopNavigation = () => {
    return (
        <div className="sidebar-fixed position-fixed">
            <a href="#!" className="logo-wrapper waves-effect">
                <img alt="SDK4ED logo" className="img-fluid" src={logo}/>
            </a>
            <MDBListGroup className="list-group-flush">
                <NavLink exact={true} to="/" activeClassName="activeClass">
                    <MDBListGroupItem>
                        <MDBIcon icon="chart-pie" className="mr-3"/>
                        Main Dashboard
                    </MDBListGroupItem>
                </NavLink>
                <NavLink to="/profile" activeClassName="activeClass">
                    <MDBListGroupItem>
                        <MDBIcon icon="user" className="mr-3"/>
                        Profile
                    </MDBListGroupItem>
                </NavLink>
                <NavLink to="/energy" activeClassName="activeClass">
                    <MDBListGroupItem>
                        <MDBIcon icon="chart-bar" className="mr-3"/>
                        Energy
                    </MDBListGroupItem>
                </NavLink>
                <NavLink to="/security" activeClassName="activeClass">
                    <MDBListGroupItem>
                        <MDBIcon icon="chart-line" className="mr-3"/>
                        Security 
                    </MDBListGroupItem>
                </NavLink>
                <NavLink to="/techdebt" activeClassName="activeClass">
                    <MDBListGroupItem>
                        <MDBIcon icon="chart-area" className="mr-3"/>
                        Technical Debt
                    </MDBListGroupItem>
                </NavLink>
                <NavLink to="/tdforecast" activeClassName="activeClass">
                    <MDBListGroupItem>
                        <MDBIcon icon="compass" className="mr-3"/>
                        TD Forecast
                    </MDBListGroupItem>
                </NavLink>
                <NavLink to="/energyforecast" activeClassName="activeClass">
                    <MDBListGroupItem>
                        <MDBIcon icon="compass" className="mr-3"/>
                        Energy Forecast
                    </MDBListGroupItem>
                </NavLink>
                <NavLink to="/securityforecast" activeClassName="activeClass">
                    <MDBListGroupItem>
                        <MDBIcon icon="compass" className="mr-3"/>
                        Security Forecast
                    </MDBListGroupItem>
                </NavLink>
                <NavLink to="/tradeoffs" activeClassName="activeClass">
                    <MDBListGroupItem>
                        <MDBIcon icon="exchange-alt" className="mr-3"/>
                        Trade-off Manager
                    </MDBListGroupItem>
                </NavLink>
                <NavLink to="/refactoring" activeClassName="activeClass">
                    <MDBListGroupItem>
                        <MDBIcon icon="hammer" className="mr-3"/>
                        Refactorings
                    </MDBListGroupItem>
                </NavLink>
            </MDBListGroup>
        </div>
    );
}

export default TopNavigation;