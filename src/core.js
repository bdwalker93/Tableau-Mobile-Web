const Promise = require('bluebird');
const tableau = require('./tableau');

const SITE_NAME = "UCI";

const uuid = require('uuid').v4;
const fs = require('fs');

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
    },
    loadWorkbooks: function(tok) {
      return storage.getItem('tokens:'+tok).then(({token, siteId})=>{
        return tableau.queryWorkbooksForUser(token, siteId).then((workbooks) => {
          socket.emit('action', {
            type: "SET_WORKBOOKS",
            workbooks
          })
          return Promise.map(workbooks, function(wb) {
            return tableau.getPreviewImageForWorkbook(token, siteId, wb.id).then(({png}) => {
              const publicPath = '/'+wb.id+'.png';
              const path = __dirname+'/../public'+publicPath;
              return Promise.promisify(fs.writeFile)(path, png).then(function() {
                socket.emit('action', {
                  type: "UPDATE_WORKBOOK_IMAGE",
                  id: wb.id,
                  publicPath: publicPath
                })
              });
            });
          });
        });
      }).catch((err)=> {
        console.log(err);
        //socket.emit('action', {
        //  type: "LOGIN_FAILURE",
        //  error: err.message
        //})
        //socket.emit('navigate', "/")
      })
    }
  }
}
