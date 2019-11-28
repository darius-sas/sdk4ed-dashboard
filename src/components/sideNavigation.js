import React from 'react';
import { MDBListGroup, MDBListGroupItem, MDBIcon, MDBNavLink} from 'mdbreact';

const TopNavigation = () => {
    return (
        <div className="sidebar-fixed position-fixed">
            <a href="#!" className="logo-wrapper waves-effect">
                {/*<img alt="MDB React Logo" className="img-fluid" src={logo}/>*/}
            </a>
            <MDBListGroup className="list-group-flush">
                <MDBNavLink exact={true} to="/" activeClassName="activeClass">
                    <MDBListGroupItem>
                        <MDBIcon icon="chart-pie" className="mr-3"/>
                        Dashboard
                    </MDBListGroupItem>
                </MDBNavLink>
                <MDBNavLink to="/profile" activeClassName="activeClass">
                    <MDBListGroupItem>
                        <MDBIcon icon="user" className="mr-3"/>
                        Profile
                    </MDBListGroupItem>
                </MDBNavLink>
                <MDBNavLink to="/tables" activeClassName="activeClass">
                    <MDBListGroupItem>
                        <MDBIcon icon="table" className="mr-3"/>
                        Tables
                    </MDBListGroupItem>
                </MDBNavLink>
                <MDBNavLink to="/maps" activeClassName="activeClass">
                    <MDBListGroupItem>
                        <MDBIcon icon="map" className="mr-3"/>
                        Maps
                    </MDBListGroupItem>
                </MDBNavLink>
                <MDBNavLink to="/404" activeClassName="activeClass">
                    <MDBListGroupItem>
                        <MDBIcon icon="exclamation" className="mr-3"/>
                        404
                    </MDBListGroupItem>
                </MDBNavLink>
            </MDBListGroup>
        </div>
    );
}

export default TopNavigation;