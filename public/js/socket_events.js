socket.on("user-connected", (username) => {
  displayMessageIncoming(username);
});
socket.on("user-disconnected", (username) => {
  displayMessageOutgoing(username);
});
socket.on("roomUsers", (userForRoom) => {
  displayRoomUsers(userForRoom);
});
