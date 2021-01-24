const users = [];
const liveSessions=[];
const roomAdmins= new Map();
function userJoin(id, username, room,socketId) {
	const user = { id, username, room,socketId };
	users.push(user);
	return user;
}

function setAdmin(roomId,userid) {
	roomAdmins.set(roomId,userid);
	console.log(roomAdmins)
}

function userLeave(id) {
	const index = users.find((user) => user.socketId === id);
	if (index !== -1) {
		return users.splice(index, 1)[0];
	}
}

function addToLiveStream(id,username,)
{
	const user = { id, username };
	liveSessions.push(user);
	return liveSessions;
}
function deleteLiveStream(){

}

function getRoomUsers(room) {
	console.log(users);
	
	return users.filter((user) => user.room === room);
}

function getCurrentUser(socketId)
{
	return users.find(user=> user.socketId === socketId)
}


module.exports = {
    userJoin,
    getRoomUsers,
	userLeave,
	getCurrentUser,
	setAdmin,
	addToLiveStream
  // giveProblems
};
