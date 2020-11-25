const video_grid = document.querySelector(".video-grid");
const myvideo = document.createElement("video");
myvideo.classList.add("video");
myvideo.muted = true;
navigator.mediaDevices
  .getUserMedia({
    video: true,
    audio: true,
  })
  .then((stream) => {
    addVideoStream(myvideo, stream);
    // socket.emit('catch_user', stream);

    socket.on("user-connected", (userId) => {
      console.log(userId);
      connectToNewUser(userId, stream);
    });
    peer.on("call", (call) => {
      call.answer(stream);
      const video = document.createElement("video");
      call.on("stream", (userVideoStream) => {
        addVideoStream(video, userVideoStream);
      });
    });
  });
function addVideoStream(video, stream) {
  video.srcObject = stream;
  video.addEventListener("loadedmetadata", () => {
    video.play();
  });
  console.log("he");
  video_grid.appendChild(video);
}
function connectToNewUser(userId, stream) {
  const call = peer.call(userId, stream);
  const video2 = document.createElement("video");
  call.on("stream", (userVideoStream) => {
    addVideoStream(video2, userVideoStream);
  });
  call.on("close", () => {
    video2.remove();
  });
}
function cc() {
  let i = ["A", "B", "C"];
  return {
    getI: function () {
      return i;
    },
    addI: function (iix) {
      i.push(iix);
      return i;
    },
  };
}
