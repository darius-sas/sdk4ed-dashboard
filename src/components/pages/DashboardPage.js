import React from 'react';
import { MDBRow } from 'mdbreact';
import AdminCardSection1 from './template-sections/AdminCardSection1';
import AdminCardSection2 from './template-sections/AdminCardSection2';
import TableSection from './template-sections/TableSection';
import BreadcrumSection from './template-sections/BreadcrumSection';
import ChartSection1 from './template-sections/ChartSection1';
import ChartSection2 from './template-sections/ChartSection2';
import MapSection from './template-sections/MapSection';
import ModalSection from './template-sections/ModalSection';
import ProjectOverviewSection from './ProjectOverviewSection';

const DashboardPage =  () => {
    return (
        <React.Fragment>
            <ProjectOverviewSection />
        </React.Fragment>
    )
};

export default DashboardPage;