const tableau = require('./tableau');

const SITE_NAME = "UCI";

const uuid = require('uuid').v4;

module.exports = function(storage, socket) {
  return {
    login: function(username, password) {
      return tableau.signIn(username, password, SITE_NAME).then((auth) => {
        // auth : { token, userId, siteId }
        // we don't store username and password
        const tok = uuid();
        return storage.setItem('tokens:'+tok, auth).then(()=>tok);
      }).then(function(token) {
        socket.emit('action', {
          type: "LOGIN_SUCCESS", token
        })
        socket.emit('navigate', "/workbooks")
      }).catch(function(err) {
        socket.emit('action', {
          type: "LOGIN_FAILURE",
          error: err.message
        })
      });
    },
    checkAuth: function(tok) {
      // TODO
      // ask tableau if this is legit
      return storage.getItem('tokens:'+tok).then((auth)=>{
        if ( !auth ) throw new Error('invalid token');
      }).catch((err)=> {
        socket.emit('action', {
          type: "LOGIN_FAILURE",
          error: err.message
        })
        socket.emit('navigate', "/")
      })
    }
  }
}
