import React, {PureComponent} from 'react';
import logo from "../assets/logo.png"
import FileExplorer from "./pages/sections/FileExplorer"


class TopNavigation extends PureComponent {
   
    render(){
        return (
            <React.Fragment>
            <div className="sidebar-fixed position-fixed">
            <a href="#!" className="logo-wrapper waves-effect">
                <img alt="SDK4ED logo" className="img-fluid" src={logo}/>
            </a>
            <FileExplorer/>
            </div>
            </React.Fragment>
        );
    }
}

export default TopNavigation;