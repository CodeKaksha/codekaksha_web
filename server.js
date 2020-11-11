const path = require('path');

const express=require('express');

const app=express();

const http = require('http');

const socketio = require('socket.io');

const {
	userJoin,
	getCurrentUser,
	userLeave,
	getRoomUsers
} = require('./utils/users');

const server = http.createServer(app);

const io = socketio(server);

app.use(express.static(path.join(__dirname, 'public')));
io.on('connection', (socket) => {
	console.log('new ws connection');

	socket.on('disconnect', () => {
		const user = userLeave(socket.id);
		if (user) {
			io.to(user.room).emit(
				'message',
				formatMessage('BOSS', `${user.username} has left the chat`)
			);
			io.to(user.room).emit('roomUsers', {
				room: user.room,
				users: getRoomUsers(user.room),
			});
		}
	});

	
	socket.on('joinRoom', ({ username, room }) => {
		const user = userJoin(socket.id, username, room);
		socket.join(user.room);

		socket.emit(
			'message',
			formatMessage('BOSS', 'Welcome to CodeBlast, ready to blast your code?')
		);

		socket.broadcast
			.to(user.room)
			.emit(
				'message',
				formatMessage('BOSS', `${user.username} has joined the room`)
			);

		io.to(user.room).emit('roomUsers', {
			room: user.room,
			users: getRoomUsers(user.room),
		});
	});

	
	socket.on('chatMessage', (msg) => {
		const user = getCurrentUser(socket.id);
		io.to(user.room).emit('message', formatMessage(user.username, msg));
	});


});
const PORT = process.env.PORT || 3000;
const host = '0.0.0.0';

server.listen(PORT, host, function () {
	console.log('Server started.......');
}); 