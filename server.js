const path = require('path');

const express = require('express');
var ExpressPeerServer = require('peer').ExpressPeerServer;
const app = express();

const http = require('http');

const socketio = require('socket.io');
const { v4: uuidV4 } = require('uuid');


const server = http.createServer(app);

const io = socketio(server);



function onConnection(socket) {
	socket.on('join-room',(roomId,userId)=>{
		socket.join(roomId)
		console.log("heel")
		socket.to(roomId).broadcast.emit('user-connected',userId)
	})
	socket.on('drawing', (data) => socket.broadcast.emit('drawing', data));
	socket.on('message', (evt) => {
		console.log(evt);
		socket.broadcast.emit('message', evt);
	});
	// socket.on('catch_user', (stream) => {
	// 	socket.emit('user-connected', stream);
	// });
}

io.on('connection', onConnection);
const PORT = process.env.PORT || 3000;
const host = '0.0.0.0';

console.log(uuidV4())
// app.set('view engine', 'ejs');
app.get('/', (req, res) => {
	console.log("helklo")
	res.redirect(`${uuidV4()}`);
}); 

app.get('/:index', (req, res) => {
	
	res.render('index', { roomId: req.params.room });
});
app.set('views', path.join(__dirname, 'public'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
app.use(express.static(path.join(__dirname, 'public')));
server.listen(PORT, host, function () {
	console.log('Server started.......');
});

var options = {
    debug: true,
    allow_discovery: true
}
let peerServer = ExpressPeerServer(server, options)
app.use('/peerjs', peerServer);

peerServer.on('connection', function(id) {
    console.log(id)
  console.log(server._clients)
});

// var options = {
//     debug: true
// }
// app.use('/api', ExpressPeerServer(server, options));