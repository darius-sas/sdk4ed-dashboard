import React, { Component } from 'react';
import { MDBNavbar, MDBNavbarBrand, MDBNavbarNav, MDBNavbarToggler, MDBCollapse, MDBNavItem, MDBNavLink, MDBIcon, MDBDropdown, MDBDropdownToggle, MDBDropdownMenu, MDBDropdownItem, MDBListGroupItem, MDBContainer, MDBRow, MDBCol } from 'mdbreact';
import { NavLink } from 'react-router-dom';
import logo from "../assets/logo.png"

class TopNavigation extends Component {
    state = {
        collapse: false
    }

    onClick = () => {
        this.setState({
            collapse: !this.state.collapse,
        });
    }

    toggle = () => {
        this.setState({
            dropdownOpen: !this.state.dropdownOpen
        });
    }

    render() {
        return (
            <React.Fragment>
                <MDBNavbar className="flexible-navbar" light expand="md" scrolling>
                    <a href="#!" className="navbar-left logo-wrapper waves-effect">
                        <img alt="SDK4ED logo" className="mr-3 ml-4" src={logo} style={{height:40}}/>
                    </a>
                    <MDBNavbarToggler onClick={this.onClick} />
                    <MDBCollapse isOpen={this.state.collapse} navbar>
                        <MDBNavbarNav left>
                            <MDBNavItem active>
                                <MDBNavLink to="#">Home</MDBNavLink>
                            </MDBNavItem>
                            <MDBNavItem>
                                <MDBNavLink to="#">Projects</MDBNavLink>
                            </MDBNavItem>
                            <MDBNavItem>
                                <MDBNavLink to="#">Settings</MDBNavLink>
                            </MDBNavItem>
                            <MDBNavItem>
                                <MDBNavLink to="#">Documentation</MDBNavLink>
                            </MDBNavItem>
                        </MDBNavbarNav>
                        <MDBNavbarNav right>
                            <MDBNavItem>
                                <a className="nav-link navbar-link" rel="noopener noreferrer" target="_blank" href="https://www.facebook.com/sdk4ed/"><MDBIcon fab icon="facebook" /></a>
                            </MDBNavItem>
                            <MDBNavItem>
                                <a className="nav-link navbar-link" rel="noopener noreferrer" target="_blank" href="https://twitter.com/SDK4ED"><MDBIcon fab icon="twitter" /></a>
                            </MDBNavItem>
                            <MDBNavItem>
                                <a className="border border-light rounded mr-1 nav-link Ripple-parent" rel="noopener noreferrer" href="http://160.40.52.130/" target="_blank"><MDBIcon fab icon="gitlab" className="mr-2" />SDK4ED GitLab</a>
                            </MDBNavItem>
                        </MDBNavbarNav>
                    </MDBCollapse>
                </MDBNavbar>

                <MDBNavbar className="flexible-navbar z-depth-0" expand="md" scrolling>
                    <MDBNavbarToggler onClick={this.onClick} />
                    <MDBCollapse isOpen={this.state.collapse} navbar>
                        <MDBNavbarNav left>
                            <MDBContainer><MDBRow><MDBCol md="3" className="my-1 mx-0">
                                <MDBNavItem active>
                                    <NavLink exact={true} to="/" activeClassName="activeClass">
                                        <MDBListGroupItem>
                                            <MDBIcon icon="home" className="mr-3" />
                                            Main Dashboard
                                    </MDBListGroupItem>
                                    </NavLink>
                                </MDBNavItem></MDBCol>
                                <MDBCol md="3" className="my-1 mx-0">
                                    <MDBNavItem>
                                        <NavLink to="/profile" activeClassName="activeClass">
                                            <MDBListGroupItem>
                                                <MDBIcon icon="user" className="mr-3" />
                                                Profile
                                    </MDBListGroupItem>
                                        </NavLink>
                                    </MDBNavItem></MDBCol>

                                <MDBCol md="3" className="my-1 mx-0"><MDBNavItem >
                                    <NavLink to="/energy" activeClassName="activeClass">
                                        <MDBListGroupItem className="h-100">
                                            <MDBIcon icon="bolt" className="mr-3" />
                                            Energy
                                </MDBListGroupItem>
                                    </NavLink>
                                </MDBNavItem></MDBCol>


								<MDBCol md="3" className="my-1 mx-0">
                                    <MDBNavItem  activeClassName="activeClass">
                                        <MDBDropdown activeClassName="activeClass">
                                            <MDBListGroupItem activeClassName="activeClass">
                                                <MDBDropdownToggle className="pb-0 pr-0 pl-0 pt-0" nav caret activeClassName="activeClass">
                                                    <MDBIcon icon="tasks" className="mr-3" />
                                                    <span className="mr-2">Dependability</span>
                                                </MDBDropdownToggle>
                                                <MDBDropdownMenu>
                                                    <MDBDropdownItem>
                                                        <NavLink to="/security" activeClassName="activeClass">
		                                                Security
        				                                </NavLink>
                                                    </MDBDropdownItem>
                                                    <MDBDropdownItem>
                                                        <NavLink to="/optimalcheckpoint" activeClassName="activeClass">
                                                            Optimal Checkpoint
                                      				  </NavLink>
                                                    </MDBDropdownItem>

                                                </MDBDropdownMenu>
                                            </MDBListGroupItem>
                                        </MDBDropdown>

                                    </MDBNavItem> 
                                    
                                     </MDBCol>
                                                                                               
                                                                    
                                    <MDBCol md="3" className="my-1 mx-0">
                                    <MDBNavItem  activeClassName="activeClass">
                                        <MDBDropdown activeClassName="activeClass">
                                            <MDBListGroupItem activeClassName="activeClass">
                                                <MDBDropdownToggle className="pb-0 pr-0 pl-0 pt-0" nav caret activeClassName="activeClass">
                                                    <MDBIcon icon="chart-area" className="mr-3" />
                                                    <span className="mr-2">Technical Debt</span>
                                                </MDBDropdownToggle>
                                                <MDBDropdownMenu>
                                                    <MDBDropdownItem>
                                                        <NavLink to="/tdinterest" activeClassName="activeClass">
                                                            TD Interest
                                        </NavLink>
                                                    </MDBDropdownItem>
                                                    <MDBDropdownItem>
                                                        <NavLink to="/tdprincipal" activeClassName="activeClass">
                                                            TD Principal
                                        </NavLink>
                                                    </MDBDropdownItem>
                                                    <MDBDropdownItem>
                                                        <NavLink to="/tdnewcode" activeClassName="activeClass">
                                                            TD New Code
                                       </NavLink>
                                                    </MDBDropdownItem>
                                                    <MDBDropdownItem>
                                                        <NavLink to="/atdpage" activeClassName="activeClass">
                                                            ATD Dashboard
                                        </NavLink>
                                                    </MDBDropdownItem>
                                                </MDBDropdownMenu>
                                            </MDBListGroupItem>
                                        </MDBDropdown>

                                    </MDBNavItem>                                     
                                 </MDBCol>
                                
                                
                                <MDBCol md="3" className="my-1 mx-0">
                                    <MDBNavItem  activeClassName="activeClass">
                                        <MDBDropdown activeClassName="activeClass">
                                            <MDBListGroupItem activeClassName="activeClass">
                                                <MDBDropdownToggle className="pb-0 pr-0 pl-0 pt-0" nav caret activeClassName="activeClass">
                                                    <MDBIcon icon="chart-line" className="mr-3" />
                                                    <span className="mr-2">Forecast</span>
                                                </MDBDropdownToggle>
                                                <MDBDropdownMenu>
                                                    <MDBDropdownItem>
                                                        <NavLink to="/tdforecast" activeClassName="activeClass">
                                                            TD Forecast
                                        </NavLink>
                                                    </MDBDropdownItem>
                                                    <MDBDropdownItem>
                                                        <NavLink to="/energyforecast" activeClassName="activeClass">
                                                            Energy Forecast
                                        </NavLink>
                                                    </MDBDropdownItem>
                                                    <MDBDropdownItem>
                                                        <NavLink to="/securityforecast" activeClassName="activeClass">
                                                            Security Forecast
                                       </NavLink>
                                                    </MDBDropdownItem>
                                                </MDBDropdownMenu>
                                            </MDBListGroupItem>
                                        </MDBDropdown>

                                    </MDBNavItem> 
                                    
                                     </MDBCol>
                                    
                                <MDBCol md="3" className="my-1 mx-0">                            <MDBNavItem >
                                    <NavLink to="/tradeoffs" activeClassName="activeClass">
                                        <MDBListGroupItem>
                                            <MDBIcon icon="balance-scale" className="mr-3" />
                                            Trade-off Manager
                                </MDBListGroupItem>
                                    </NavLink>
                                </MDBNavItem>   </MDBCol>
                                <MDBCol md="3" className="my-1 mx-0">                            <MDBNavItem >
                                    <NavLink to="/refactoring" activeClassName="activeClass">
                                        <MDBListGroupItem>
                                            <MDBIcon icon="hammer" className="mr-3" />
                                            Refactorings
                                </MDBListGroupItem>
                                    </NavLink>
                                </MDBNavItem>
                                </MDBCol>
                            </MDBRow></MDBContainer>
                        </MDBNavbarNav>
                    </MDBCollapse>
                </MDBNavbar>
            </React.Fragment >
        );
    }
}

export default TopNavigation;
