socket.on("user-disconnected", (username) => {
  displayMessageOutgoing(username);
});
socket.on("roomUsers", (userForRoom) => {
  displayRoomUsers(userForRoom);
});
