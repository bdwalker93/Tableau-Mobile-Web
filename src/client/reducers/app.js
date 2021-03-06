const tok = localStorage.getItem('token');
const init = {
  isLoggedIn: !!tok,
  token: tok,
  loginError: null
}

export default function(state = init, action) {
  switch (action.type) {
    case 'LOGIN_SUCCESS': {
      localStorage.setItem('token', action.token);
      return { isLoggedIn: true, token: action.token }
    }
    case 'LOGIN_FAILURE': {
      localStorage.removeItem('token');
      return { isLoggedIn: false, token: null, loginError: action.error };
    }
  }
  return state
}
