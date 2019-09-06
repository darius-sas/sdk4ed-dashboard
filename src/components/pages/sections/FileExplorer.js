import React, { Component } from 'react';
import styled from 'styled-components';
import Tree from './Tree';

/* Code from https://medium.com/@davidtranwd/implement-tree-view-component-with-reactjs-and-styled-components-5eea3b1603cf */

const StyledFileExplorer = styled.div`
  overflow-y: scroll;
  max-width: 100%;
  margin: 0 auto;
  display: flex;  
`;

const TreeWrapper = styled.div`
  width: 250px;
`;

export default class FileExplorer extends Component { 

  constructor(props){
    super(props)
  }
  
  state = {
    selectedFile: null,
  };

  onSelect = (file) => {
    this.setState({ selectedFile: file })
    this.props.onSelect(file);
  };

  render() {
    const { selectedFile } = this.state;
    return (
      <StyledFileExplorer>
        <TreeWrapper>
          <Tree onSelect={this.onSelect} onFetchData={this.props.onFetchData}/>
        </TreeWrapper>
        <div>
          { selectedFile && selectedFile.type === 'file' && selectedFile.content }
        </div>
      </StyledFileExplorer>
    )
  }
}
