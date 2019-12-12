import React from 'react';
import { Route, Switch } from 'react-router-dom';
import TDInterestDashPage from './referencematerial/TDInterestDashPage';
import TDPrincipalDashPage from './referencematerial/TDPrincipalDashPage';
import TDNewCodeDashPage from './referencematerial/TDNewCodeDashPage';
import SecurityDashPage from './referencematerial/SecurityDashPage';
import EnergyDashPage from './referencematerial/EnergyDashPage';
import ForecastDashPage from './referencematerial/ForecastDashPage';
import ForecastEnergyDashPage from './referencematerial/ForecastEnergyDashPage';
import ForecastSecurityDashPage from './referencematerial/ForecastSecurityDashPage';
import OptimalCheckpoint from './referencematerial/OptimalCheckpointPage';

import MapsPage from './referencematerial/MapsPage';
import NotFoundPage from './pages/NotFoundPage';
import DashboardPage from './referencematerial/DashboardPage';
import ProfilePage from './referencematerial/ProfilePage';
import TablesPage from './referencematerial/TablesPage';

class Routes extends React.Component {
  render() {
    return (
      <Switch>
        {/* Actual routes (incomplete, please refer to API design document) */}
        <Route path='/profile' component={ProfilePage} />
        
        <Route path='/tdinterest' component={TDInterestDashPage}/>        
        <Route path='/tdprincipal' component={TDPrincipalDashPage}/>
        <Route path='/tdnewcode' component={TDNewCodeDashPage}/>
		
		<Route path='/optimalcheckpoint' component={OptimalCheckpoint}/>
        <Route path='/security' component={SecurityDashPage} />
        <Route path='/energy' component={EnergyDashPage} />
        <Route path='/tdforecast' component={ForecastDashPage}/>
        <Route path='/energyforecast' component={ForecastEnergyDashPage}/>
        <Route path='/securityforecast' component={ForecastSecurityDashPage}/>
        <Route path='/dashboard' component={DashboardPage} />
        <Route path='/' exact component={DashboardPage} />


        {/* Examples and templates  */}
        <Route path='/tables' component={TablesPage} />
        <Route path='/maps' component={MapsPage} />
        <Route path='/404' component={NotFoundPage} />
      </Switch>
    );
  }
}

export default Routes;
