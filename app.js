'use strict';

var Hapi = require('hapi');
var path = require('path');

var server = new Hapi.Server();
server.connection({ port: 3000 });

var io = require('socket.io')(server.listener);

// set view engine to handlebars
server.views({
  engines: {
    html: require('handlebars')
  },
  path: path.join(__dirname, 'templates')
});

server.route({
  method: 'GET',
  path: '/',
  handler: function (request, reply) {
    reply.view('index.html');
  }
});

io.on('connection', function(socket){
  console.log('a user connected');

  socket.on('chat message', function(msg){
    io.emit('chat message', msg);
  });

  socket.on('disconnect', function(){
    console.log('user disconnected');
  });
});

server.start(function() {
  console.log('Server running at:', server.info.uri);
});
