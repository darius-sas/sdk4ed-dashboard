import React from 'react';

const Loader = props => {
    const height = props.height == null ? 100 : props.height;
    const width = props.width == null ? 100 : props.width;
    const text = props.text == null ? "Loading..." : props.text;

    return (<div>
                <div className="d-flex justify-content-center">
                  <div className="spinner-border text-primary" role="status" style={{height: height, width: width}}/>
                </div>
                <div className="mt-3 text-center">{text}</div>
              </div>)
}

export default Loader;