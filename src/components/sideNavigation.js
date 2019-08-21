import React, {Fragment, PureComponent} from 'react';
import logo from "../assets/logo.png"
import {Treebeard} from 'react-treebeard';

const data = {
    name: 'root',
    toggled: true,
    children: [
        {
            name: 'parent',
            children: [
                { name: 'child1' },
                { name: 'child2' }
            ]
        },
        {
            name: 'loading parent',
            loading: true,
            children: []
        },
        {
            name: 'parent',
            children: [
                {
                    name: 'nested parent',
                    children: [
                        { name: 'nested child 1' },
                        { name: 'nested child 2' }
                    ]
                }
            ]
        }
    ]
};


class TopNavigation extends PureComponent {
    constructor(props){
        super(props);
        this.state = {data};
    }
    
    onToggle(node, toggled){
        const {cursor, data} = this.state;
        if (cursor) {
            this.setState(() => ({cursor, active: false}));
        }
        node.active = true;
        if (node.children) { 
            node.toggled = toggled; 
        }
        this.setState(() => ({cursor: node, data: Object.assign({}, data)}));
    }
    
    render(){
        const {data} = this.state;
        return (
            <div className="sidebar-fixed position-fixed">
            <a href="#!" className="logo-wrapper waves-effect">
                <img alt="SDK4ED logo" className="img-fluid" src={logo}/>
            </a>
            <div><span>Project explore tree here</span></div>
            <Treebeard
                data={data}
                onToggle={this.onToggle}
            />
            </div>
        );
    }
}

export default TopNavigation;