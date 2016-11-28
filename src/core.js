const tableau = require('./tableau')

module.exports = function(socket) {
  return {
    login: function(username, password) {
      tableau.signIn("Brett", "ucitableau", "UCI").then(({ token, siteId, userId }) => {
        socket.emit('action', {
          type: "LOGIN_SUCCESS",
          token: "??"
        })
        socket.emit('navigate', "/workbooks")
      }).catch(function(err) {
        socket.emit('action', {
          type: "LOGIN_FAILURE",
          error: err.message
        })
      });
    }
  }
}
