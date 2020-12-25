
function video(videoId,username,room) {

  const video_grid = document.querySelector(`#${videoId}`);
  const myvideo = document.createElement("video");
  myvideo.muted = true;
  console.log('in video main')
  var videoCurrentState=true;
  var audioCurrentState=true;
  navigator.mediaDevices
    .getUserMedia({
      video: true,
      audio: false,
    })
    .then((stream) => {
      addVideoStream(myvideo, stream);
      // socket.emit('catch_user', stream);
      document.querySelector('.video_on').addEventListener('click',(e)=>{
        // if(stream.getVideoTracks()[0].enabled)
          console.log("a");
          stream.getTracks().forEach(function(track){
            if(track.readyState=='live' && track.kind===' video')
            {
              track.enabled=!track.enabled;
              track.stop();
            }
          })
          stream.getVideoTracks()[0].enabled=false;   
          videoCurrentState=false;
          myvideo.srcObject=null;
        
      })

      document.querySelector('.video_off').addEventListener('click',()=>{
        videoCurrentState=true;
        console.log("b")
        navigator.mediaDevices.getUserMedia({
          video:true,
          audio:false
        })
        .then((newVideoStream)=>{
          stream.removeTrack(stream.getVideoTracks()[0])
          stream.addTrack(newVideoStream.getVideoTracks()[0])
          addVideoStream(myvideo,newVideoStream);
        })
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
  var videoCurrentState=true;
  var audioCurrentState=true;
  console.log("in video only user");
  navigator.mediaDevices
    .getUserMedia({
      video: true,
      audio: false,
    })
    .then((stream) => {
      addVideoStream(myvideo, stream);
      
      document.querySelector('.video_on').addEventListener('click',(e)=>{
        // if(stream.getVideoTracks()[0].enabled)
          console.log("c");
          stream.getTracks().forEach(function(track){
            if(track.readyState=='live' && track.kind===' video')
            {
              track.enabled=!track.enabled;
              track.stop();
            }
          })
          stream.getVideoTracks()[0].enabled=false;   
          videoCurrentState=false;
          myvideo.srcObject=null;
      })

      document.querySelector('.video_off').addEventListener('click',()=>{
        videoCurrentState=true;
        console.log("d")
        navigator.mediaDevices.getUserMedia({
          video:true,
          audio:false
        })
        .then((newVideoStream)=>{
          stream.removeTrack(stream.getVideoTracks()[0])
          stream.addTrack(newVideoStream.getVideoTracks()[0])
          addVideoStream(myvideo,newVideoStream);
        })
      })

      
    });
  function addVideoStream(video, stream) {
    video.srcObject = stream;
    video.addEventListener("loadedmetadata", () => {
      video.play();
    });
    video_grid.appendChild(video);
  }
}