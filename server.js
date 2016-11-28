const express = require("express");
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const morgan = require('morgan')
const Core = require('./src/core');

app.use(morgan('dev'));
app.use(express.static('public'));

io.on('connection', function(socket) {
  const core = Core(socket);

  socket.on('action', function(action) {
    switch (action.type) {
      case 'DO_LOGIN': {
        core.login(action.username, action.password)
      }
    }
  });
});

http.listen(3000);

console.log("Running at Port 3000");
