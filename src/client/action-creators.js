export function doLogin(username, password) {
  return {
    meta: { remote: true },
    type: "DO_LOGIN",
    username, password
  }
}

export function loadWorkbooks(token) {
  return {
    meta: { remote: true },
    type: "LOAD_WORKBOOKS",
    token
  }
}
