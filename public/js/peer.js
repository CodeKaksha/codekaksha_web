const room = window.location.href.split("/")[3];
var peer = new Peer({
  secure: true,
  host: "codekaksha.herokuapp.com",
  port: "",
  path: "/peerjs",
});
console.log(peer);
peer.on("open", (id) => {
  console.log("jhaod");
  socket.emit("join-room", room, id);
});
