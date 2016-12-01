import React, { Component} from 'react';
import { connect } from 'react-redux';
import * as actionCreators from '../action-creators';

const Viz = React.createClass({
  render: function () {
    return <div style={divStyle} ref={_div => {
    }}/>
  }
});

function mapStateToProps(state) {
  return {}
}

export const VizPage = connect(mapStateToProps, actionCreators)(Viz);
