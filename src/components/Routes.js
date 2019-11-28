import React from 'react';
import { Route, Switch } from 'react-router-dom';
import TDInterestDashPage from './pages/TDInterestDashPage';
import TDPrincipalDashPage from './pages/TDPrincipalDashPage';
import TDNewCodeDashPage from './pages/TDNewCodeDashPage';
import SecurityDashPage from './pages/SecurityDashPage';  
import EnergyDashPage from './pages/EnergyDashPage';
import ForecastDashPage from './pages/ForecastDashPage';
import ForecastEnergyDashPage from './pages/ForecastEnergyDashPage';
import ForecastSecurityDashPage from './pages/ForecastSecurityDashPage';
import OptimalCheckpoint from './pages/OptimalCheckpointPage';
import HelloMessage from './pages/ATDPage';

import MapsPage from './pages/MapsPage';
import NotFoundPage from './pages/NotFoundPage';
import DashboardPage from './pages/DashboardPage';
import ProfilePage from './pages/ProfilePage';
import TablesPage from './pages/TablesPage';

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
        <Route path='/atdpage' component={HelloMessage}/>


        {/* Examples and templates  */}
        <Route path='/tables' component={TablesPage} />
        <Route path='/maps' component={MapsPage} />
        <Route path='/404' component={NotFoundPage} />
      </Switch>
    );
  }
}

export default Routes;
