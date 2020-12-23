
function video(videoId,username,room) {
  
  const video_grid = document.querySelector(`#${videoId}`);
  const myvideo = document.createElement("video");
  myvideo.muted = true;
  navigator.mediaDevices
    .getUserMedia({
      video: true,
      audio: false,
    })
    .then((stream) => {
      addVideoStream(myvideo, stream);
      // socket.emit('catch_user', stream);
      document.querySelector('.mic_on_off').addEventListener('click',(e)=>{
        console.log(stream.getAudioTracks())
        console.log("kk")
        //VIKAS IDHAR AAJA TU
        stream.getVideoTracks()[0].enabled=false;
        console.log(stream.getVideoTracks())
      })
      socket.on("user-vid-connected", (peerId,username) => {
        displayMessageIncoming(username);
       
        connectToNewUser(peerId, stream);
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
  var peer = new Peer({
    // secure:true,
    host: "codekaksha.herokuapp.com",
    port: "",
    path: "/peerjs",
  });
  peer.on("open", (id) => {
    socket.emit('join-vid',id,username,room)
  });
}
function removeVideo(videoId) {
  document.querySelector(`#${videoId}`).remove();
}
function videoOnlyUser(videoId)
{
  const video_grid = document.querySelector(`#${videoId}`);
  const myvideo = document.createElement("video");
  myvideo.muted = true;
  navigator.mediaDevices
    .getUserMedia({
      video: true,
      audio: true,
    })
    .then((stream) => {
      addVideoStream(myvideo, stream);
      
      
    });
  function addVideoStream(video, stream) {
    video.srcObject = stream;
    video.addEventListener("loadedmetadata", () => {
      video.play();
    });
    video_grid.appendChild(video);
  }
}