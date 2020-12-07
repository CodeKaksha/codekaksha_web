socket.on("user-disconnected", (username) => {
  displayMessageOutgoing(username);
});
socket.on("roomUsers", (userForRoom) => {
  displayRoomUsers(userForRoom);
});

socket.on('bhag_gya_lauda',(username)=>{
  alert(`${username} has switched tabs!`);
})