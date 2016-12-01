import React from 'react';
import { connect } from 'react-redux';
import * as actionCreators from '../action-creators';

const Workbooks = ({
  workbooks
}) =>
<div>
  <ul>
    { workbooks.map(wb => <li key={wb.id}>
      <pre>{JSON.stringify(wb, null, 2)}</pre>
      <img src={wb.thumbnail} />
      {wb.thumbnail}
      {wb.projectName}
      {wb.ownerName}
      {wb.updateAt}
      {wb.site}
    </li>) }
  </ul>
</div>;

function mapStateToProps(state) {
  return {
    workbooks: state.workbooks
  }
}

export const WorkbooksPage = connect(mapStateToProps, actionCreators)(Workbooks);
