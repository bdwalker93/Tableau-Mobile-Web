const express = require("express");
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const morgan = require('morgan')
const Core = require('./src/core');
const storage = require('node-persist');

storage.init({
  dir:__dirname+'/storage',
  stringify: JSON.stringify,
  parse: JSON.parse,
  encoding: 'utf8',
  logging: true,  // can also be custom logging function 
  continuous: true,
  interval: false, // milliseconds 
  ttl: false, // ttl* [NEW], can be true for 24h default or a number in MILLISECONDS 
}).then(function() {


  app.use(morgan('dev'));
  app.use(express.static('public'));

  app.get('*', (req,res)=>res.sendFile(__dirname+'/public/index.html'));

  io.on('connection', function(socket) {
    const core = Core(storage, socket);

    socket.on('action', function(action) {
      switch (action.type) {
        case 'DO_LOGIN': 
          return core.login(action.username, action.password);
        case 'CHECK_AUTH':
          return core.checkAuth(action.token);
        case 'LOAD_WORKBOOKS':
          return core.loadWorkbooks(action.token);
      }
    });
  });

  http.listen(3000);
  console.log("Running at Port 3000");
});
