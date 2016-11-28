const init = {
  isLoggedIn: false,
  token: null
}

export default function(state = init, action) {
  console.log('reducer got thing...', action);
  switch (action.type) {
    case 'LOGIN_SUCCESS': {
      return { isLoggedIn: true, token: action.token }
    }
  }
  return state
}
