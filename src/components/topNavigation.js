import React, { Component } from 'react';
import { MDBNavbar, MDBNavbarBrand, MDBNavbarNav, MDBNavbarToggler, MDBCollapse, MDBNavItem, MDBNavLink, MDBIcon, MDBDropdown, MDBDropdownToggle, MDBDropdownMenu, MDBDropdownItem, MDBListGroupItem, MDBContainer, MDBRow, MDBCol } from 'mdbreact';
import { NavLink } from 'react-router-dom';

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
                    <MDBNavbarBrand href="/">
                        <strong>SDK4ED</strong>
                    </MDBNavbarBrand>
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
                                            <MDBIcon icon="chart-pie" className="mr-3" />
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
                                            <MDBIcon icon="chart-bar" className="mr-3" />
                                            Energy
                                </MDBListGroupItem>
                                    </NavLink>
                                </MDBNavItem></MDBCol>

                                <MDBCol md="3" className="my-1 mx-0">
                                    <MDBNavItem >
                                        <NavLink to="/security" activeClassName="activeClass">
                                            <MDBListGroupItem>
                                                <MDBIcon icon="chart-line" className="mr-3" />
                                                Security
                                </MDBListGroupItem>
                                        </NavLink>
                                    </MDBNavItem>
                                </MDBCol>
                                <MDBCol md="3" className="my-1 mx-0">
                                    <MDBNavItem >
                                        <NavLink to="/techdebt" activeClassName="activeClass">
                                            <MDBListGroupItem>
                                                <MDBIcon icon="chart-area" className="mr-3" />
                                                Technical Debt
                                </MDBListGroupItem>
                                        </NavLink>
                                    </MDBNavItem>
                                </MDBCol>
                                <MDBCol md="3" className="my-1 mx-0">
                                    <MDBNavItem  activeClassName="activeClass">
                                        <MDBDropdown activeClassName="activeClass">
                                            <MDBListGroupItem activeClassName="activeClass">
                                                <MDBDropdownToggle className="pb-0 pr-0 pl-0 pt-0" nav caret activeClassName="activeClass">
                                                    <MDBIcon icon="compass" className="mr-3" />
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

                                    </MDBNavItem>                                                           </MDBCol>
                                <MDBCol md="3" className="my-1 mx-0">                            <MDBNavItem >
                                    <NavLink to="/tradeoffs" activeClassName="activeClass">
                                        <MDBListGroupItem>
                                            <MDBIcon icon="exchange-alt" className="mr-3" />
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