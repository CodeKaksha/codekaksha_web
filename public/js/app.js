var socket = io();
const room = window.location.href.split('/')[3];
var peer = new Peer({
	secure: true,	
	host: 'codekaksha.herokuapp.com',
	port: '443',
});
peer.on('open', (id) => {
	console.log("jhaod")
	socket.emit('join-room', room, id);
});
// socket.emit('join-room', room, 1);

console.log(room);

var canvas = document.querySelector('.whiteBoard');
var colors = document.getElementsByClassName('color');
var context = canvas.getContext('2d');

var current = {
	color: 'black',
};
var drawing = false;

canvas.addEventListener('mousedown', onMouseDown, false);
canvas.addEventListener('mouseup', onMouseUp, false);
canvas.addEventListener('mouseout', onMouseUp, false);
canvas.addEventListener('mousemove', throttle(onMouseMove, 10), false);

//Touch support for mobile devices
canvas.addEventListener('touchstart', onMouseDown, false);
canvas.addEventListener('touchend', onMouseUp, false);
canvas.addEventListener('touchcancel', onMouseUp, false);
canvas.addEventListener('touchmove', throttle(onMouseMove, 10), false);

for (var i = 0; i < colors.length; i++) {
	colors[i].addEventListener('click', onColorUpdate, false);
}

socket.on('drawing', onDrawingEvent);

window.addEventListener('resize', onResize, false);
onResize();

function drawLine(x0, y0, x1, y1, color, emit) {
	context.beginPath();
	context.moveTo(x0, y0);
	context.lineTo(x1, y1);
	context.strokeStyle = color;
	context.lineWidth = 2;
	context.stroke();
	context.closePath();

	if (!emit) {
		return;
	}
	var w = canvas.width;
	var h = canvas.height;

	socket.emit('drawing', {
		x0: x0 / w,
		y0: y0 / h,
		x1: x1 / w,
		y1: y1 / h,
		color: color,
	});
}

function onMouseDown(e) {
	drawing = true;
	current.x = e.clientX || e.touches[0].clientX;
	current.y = e.clientY || e.touches[0].clientY;
}

function onMouseUp(e) {
	if (!drawing) {
		return;
	}
	drawing = false;
	drawLine(
		current.x,
		current.y,
		e.clientX || e.touches[0].clientX,
		e.clientY || e.touches[0].clientY,
		current.color,
		true
	);
}

function onMouseMove(e) {
	if (!drawing) {
		return;
	}
	drawLine(
		current.x,
		current.y,
		e.clientX || e.touches[0].clientX,
		e.clientY || e.touches[0].clientY,
		current.color,
		true
	);
	current.x = e.clientX || e.touches[0].clientX;
	current.y = e.clientY || e.touches[0].clientY;
}

function onColorUpdate(e) {
	current.color = e.target.className.split(' ')[1];
}

// limit the number of events per second
function throttle(callback, delay) {
	var previousCall = new Date().getTime();
	return function () {
		var time = new Date().getTime();

		if (time - previousCall >= delay) {
			previousCall = time;
			callback.apply(null, arguments);
		}
	};
}

function onDrawingEvent(data) {
	var w = canvas.width;
	var h = canvas.height;
	drawLine(data.x0 * w, data.y0 * h, data.x1 * w, data.y1 * h, data.color);
}

// make the canvas fill its parent
function onResize() {
	// canvas.style=`padding-top:100px;`
	canvas.width = window.innerWidth / 2;
	canvas.height = window.innerHeight;
}
const l = console.log;
function getEl(id) {
	return document.getElementById(id);
}
const editor = getEl('editor');
editor.addEventListener('keyup', (evt) => {
	const text = editor.value;
	socket.send(text);
});
socket.on('message', (data) => {
	editor.value = data;
});
const video_grid = document.querySelector('.video-grid');
const myvideo = document.createElement('video');
myvideo.classList.add('video');
myvideo.muted = true;
navigator.mediaDevices
	.getUserMedia({
		video: true,
		audio: true,
	})
	.then((stream) => {
		addVideoStream(myvideo, stream);
		// socket.emit('catch_user', stream);

		socket.on('user-connected', (userId) => {
			console.log(userId);
			connectToNewUser(userId, stream);
		});
		peer.on('call', (call) => {
			call.answer(stream);
			const video = document.createElement('video');
			call.on('stream', (userVideoStream) => {
				addVideoStream(video, userVideoStream);
			});
		});
	});
function addVideoStream(video, stream) {
	video.srcObject = stream;
	video.addEventListener('loadedmetadata', () => {
		video.play();
	});
	console.log('he');
	video_grid.appendChild(video);
}
function connectToNewUser(userId, stream) {
	const call = peer.call(userId, stream);
	const video2 = document.createElement('video');
	call.on('stream', (userVideoStream) => {
		addVideoStream(video2, userVideoStream);
	});
	call.on('close', () => {
		video2.remove();
	});
}
function cc()
{
	let i=['A','B','C'];
	return {
		getI:function (){return i;},
		addI:function (iix){i.push(iix);return i;},
	}
}