const tok = localStorage.getItem('token');
const init = {
  isLoggedIn: !!tok,
  token: tok
}

export default function(state = init, action) {
  console.log('reducer got thing...', action);
  switch (action.type) {
    case 'LOGIN_SUCCESS': {
      localStorage.setItem('token', action.token);
      return { isLoggedIn: true, token: action.token }
    }
    case 'LOGIN_FAILURE': {
      localStorage.removeItem('token');
      return init;
    }
  }
  return state
}
