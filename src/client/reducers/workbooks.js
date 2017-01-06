const init = {
  workbookIds: [],
  workbooksById: {},
}

export default function(state = init, action) {
  switch (action.type) {
    case 'SET_WORKBOOKS': {
      return action.workbooks.reduce((memo, wb) => {
        let obj = {...memo.workbooksById};
        obj[wb.id] = wb;
        return {
          workbookIds: [...memo.workbookIds, wb.id],
          workbooksById: obj
        }
      }, init);
    }
    case 'UPDATE_WORKBOOK_IMAGE': {
      let obj = {...state.workbooksById};
      let wb = obj[action.id];
      wb.thumbnail = action.publicPath;
      return {
        workbookIds: state.workbookIds,
        workbooksById: obj
      }
    }
    case 'UPDATE_FAVORITE_SYMBOL': {
      return {fav: false};
    }
  }
  return state
}
