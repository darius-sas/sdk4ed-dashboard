import React from 'react';
import { MDBRow } from 'mdbreact';
import AdminCardSection1 from '../pages/template-sections/AdminCardSection1';
import AdminCardSection2 from '../pages/template-sections/AdminCardSection2';
import TableSection from '../pages/template-sections/TableSection';
import BreadcrumSection from '../pages/template-sections/BreadcrumSection';
import ChartSection1 from '../pages/template-sections/ChartSection1';
import ChartSection2 from '../pages/template-sections/ChartSection2';
import MapSection from '../pages/template-sections/MapSection';
import ModalSection from '../pages/template-sections/ModalSection';
import ProjectOverviewSection from '../pages/ProjectOverviewSection';

const DashboardPage =  () => {
    return (
        <React.Fragment>
            <ProjectOverviewSection />
        </React.Fragment>
    )
};

export default DashboardPage;