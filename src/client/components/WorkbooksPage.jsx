import React from 'react';
import { connect } from 'react-redux';
import * as actionCreators from '../action-creators';

import { WorkbookListItem } from './WorkbookListItem';

const Workbooks = ({
  workbooksById,
  workbookIds
}) =>
<div>
  <ul>
    { workbookIds.map(id => <WorkbookListItem key={id} workbook={workbooksById[id]} />)}
  </ul>
</div>;

function mapStateToProps(state) {
  return state.workbooks
}

export const WorkbooksPage = connect(mapStateToProps, actionCreators)(Workbooks);
