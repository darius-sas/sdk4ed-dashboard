import React from 'react';
import {PagePanel} from './sections/PagePanel';
import { MDBCol, MDBRow} from "mdbreact";
import Loader from './sections/Loading'
import { MDBCard, MDBCardBody, MDBCardHeader, MDBContainer, MDBDropdown, MDBDropdownToggle, MDBDropdownMenu, MDBDropdownItem, MDBFormInline, } from 'mdbreact';
import { parseSonarqubeFiles } from './sections/Tree';

const HelloMessage = () => {
    if(false){
        return (<Loader/>)
    }else{
        return <React.Fragment>
            Hello!
        </React.Fragment>
    }
}

export default HelloMessage;