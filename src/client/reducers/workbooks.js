const init = []

export default function(state = init, action) {
  switch (action.type) {
    case 'SET_WORKBOOKS': {
      return action.workbooks
    }
  case 'UPDATE_WORKBOOK_IMAGE': {
    const index = state.findIndex(wb=> wb.id === action.id);
    const wb = state[index];
    //wb.thumbnail = 
    //console.log('updated workbook i mage!', wb.thumbnail);
    return [
      ...state.slice(0, index-1),
      { ...wb, thumbnail: action.publicPath },
      ...state.slice(index+1, state.length)
    ]
  }
  }
  return state
}
