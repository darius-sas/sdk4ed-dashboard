import React, { Component } from 'react';
import values from 'lodash/values';
import PropTypes from 'prop-types';

import TreeNode from './TreeNode';

export default class Tree extends Component {

  constructor(props){
    super(props)
    this.state = {nodes : {}};
  }

  getRootNodes = () => {
    const {nodes} = this.state
    return values(nodes).filter(node => node.isRoot === true);
  }

  getChildNodes = (node) => {
    const {nodes} = this.state
    if (!node.children) return [];
    return node.children.map(path => nodes[path]);
  }  

  onToggle = (node) => {
    const {nodes} = this.state
    nodes[node.path].isOpen = !node.isOpen
    let n = node
    while(nodes[n.path].children.length == 1 && nodes[n.children[0]].type === "folder"){
      console.log("In onToggle")
      console.log(n)
      nodes[n.children[0]].isOpen = true
      n = nodes[n.children[0]]
    }
    this.setState({ nodes });
  }

  onNodeSelect = node => {
    const { onSelect } = this.props;
    onSelect(node);
  }

  render() {
    console.log("In Tree render")
    console.log(this.props.onFetchData())
    this.state = {nodes : this.props.onFetchData()};
    const rootNodes = this.getRootNodes();
    console.log(rootNodes)
    return (
      <div>
        { rootNodes.map(node => (
          <TreeNode 
            node={node}
            getChildNodes={this.getChildNodes}
            onToggle={this.onToggle}
            onNodeSelect={this.onNodeSelect}
          />
        ))}
      </div>
    )
  }
}

Tree.propTypes = {
  onSelect: PropTypes.func.isRequired,
};


export const parseSonarqubeFiles = (data) => {
  let compos = data.components.map(c => c.path)
  const tree = new DirectoryTree()
  compos.forEach(c => tree.addNode(c))
  const treeView = tree.toTreeView()
  return treeView
}

// Custom implementation to parse SQ files
class DirectoryTree{

  constructor(){
      this.root = null
      this.pathSep = '/'
  }

  addRoot(rootName){
      this.root = new DirectoryNode(rootName, "") 
      this.root.isRoot = true
      this.root.isOpen = true
  }

  addNode(path){
      const nodesList = path.split(this.pathSep)
      if(!this.root){
          this.addRoot(nodesList[0])
      }
      nodesList.shift()
      let currentNode = this.root;
      for (let i = 0; i < nodesList.length; i++) {
          const element = nodesList[i];
          let newNode = currentNode.children.find(e => e.name === element)
          if(!newNode){
              newNode = new DirectoryNode(element, currentNode)
              currentNode.children.push(newNode)
          }
          currentNode = newNode
      }
  }

  dfsVisit(callback, startNode, results){
      startNode.children.forEach( node => {
          results.push(callback(node))
          this.dfsVisit(callback, node, results)
      })
      return results
  }

  toString(){
      return this.dfsVisit(n => n.toString(), this.root, []).join("\n")
  }

  toTreeView(){
      const nodes = this.dfsVisit(n => {
        n.children.sort(DirectoryNode.compare)
        return n.toTreeView()
        },this.root, [])
      nodes.push(this.root.toTreeView())
      const treeView = {}
      nodes.forEach(n => {treeView[n.path] = n})
      return treeView
  }
}

class DirectoryNode{
  constructor(name, parent){
      this.name = name
      this.parent = parent
      this.children = []
      this.isRoot = false
      this.isOpen = false
  }

  toString(){
      return this.parent.toString() + this.name + (this.isFile() ? "" : "/")
  }

  isFile(){
      return this.name.includes(".") && this.children.length == 0
  }

  toTreeView(){
      return {           
          path: this.toString(),
          name: this.name,
          type: !this.isFile() ? "folder" : "file",
          children: this.children.map(n => n.toString()),
          isRoot: this.isRoot,
          isOpen: this.isOpen
      }
  }

  static compare(a, b){
    if(a.isFile() && !b.isFile()){
      return 1
    }
    if(!a.isFile() && b.isFile()){
      return -1
    }
    return a.name < b.name ? -1 : 1
  }
}