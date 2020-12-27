const users = [];

function userJoin(id, username, room,socketId) {
	const user = { id, username, room,socketId };
	users.push(user);
	return user;
}

function userLeave(id) {
	const index = users.find((user) => user.id === id);
	if (index !== -1) {
		return users.splice(index, 1)[0];
	}
}

function getRoomUsers(room) {
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
	getCurrentUser
  // giveProblems
};
