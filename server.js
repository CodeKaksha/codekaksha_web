const path = require('path');

const express = require('express');

const app = express();

const http = require('http');

const socketio = require('socket.io');

const {
	userJoin,
	getCurrentUser,
	userLeave,
	getRoomUsers,
} = require('./utils/users');

const server = http.createServer(app);

const io = socketio(server);

app.use(express.static(path.join(__dirname, 'public')));

function onConnection(socket) {
	socket.on('drawing', (data) => socket.broadcast.emit('drawing', data));
	socket.on('message', (evt) => {
		console.log(evt);
		socket.broadcast.emit('message', evt);
	});
}

io.on('connection', onConnection);
const PORT = process.env.PORT || 3000;
const host = '0.0.0.0';

server.listen(PORT, host, function () {
	console.log('Server started.......');
});
