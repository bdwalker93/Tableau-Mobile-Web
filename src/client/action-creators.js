export function doLogin(username, password) {
  return {
    meta: { remote: true },
    type: "DO_LOGIN",
    username, password
  }
}
