import React from 'react';
import { connect } from 'react-redux';
import * as actionCreators from '../action-creators';

import { WorkbookListItem } from './WorkbookListItem';

import './WorkbooksPage.less';

const Workbooks = ({
  workbooksById,
  workbookIds,
}) =>
<div className="workbook-page">
  { workbookIds.map(id => <WorkbookListItem key={id}
    workbook={workbooksById[id]} isFav={false}
    onFavorite={() => {
      console.log('favorite this workbook', id);
    }}
  />)}
</div>

function mapStateToProps(state) {
  console.log(state.workbooks);
  return state.workbooks
}

export const WorkbooksPage = connect(mapStateToProps, actionCreators)(Workbooks);
