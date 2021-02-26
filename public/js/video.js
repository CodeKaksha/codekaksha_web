function video(videoId, username, room) {
  const video_grid = document.querySelector(`.${videoId}`);
  const myvideo = document.createElement("video");
  myvideo.muted = true;
  console.log("in video main");
  var videoCurrentState = false;
  var audioCurrentState = true;
  navigator.mediaDevices
    .getUserMedia({
      video: videoCurrentState,
      audio: audioCurrentState,
    })
    .then((stream) => {
      addVideoStream(myvideo, stream,username);

      myvideo.parentElement.children[0].children[1].addEventListener("click", () => {
        if (stream.getVideoTracks()[0].enabled) {
          stream.getTracks().forEach(function (track) {
            if (track.readyState == "live" && track.kind === "video") {
              track.enabled = !track.enabled;
              console.log('he')
              track.stop();
            }
          });
          stream.getVideoTracks()[0].enabled = false;
          videoCurrentState = false;
          myvideo.srcObject = null;
          console.log("c video");
          // myvideo.remove();
          // console.log(stream.getVideoTracks()[0]);
        } else {
          videoCurrentState = true;
          navigator.mediaDevices
            .getUserMedia({
              video: videoCurrentState,
              audio: audioCurrentState,
            })
            .then((newVideoStream) => {
              stream.removeTrack(stream.getVideoTracks()[0]);
              stream.addTrack(newVideoStream.getVideoTracks()[0]);
              // addVideoStream(myvideo, newVideoStream);
              myvideo.srcObject = newVideoStream;
              myvideo.addEventListener("loadedmetadata", () => {
                myvideo.play();
              });
              var peer = new Peer({
                host: "meetncode.herokuapp.com",
                port: "",
                path: "/peerjs",
              });
              peer.on("call", (call) => {
                call.answer(stream);
                const video = document.createElement("video");
                call.on("stream", (userVideoStream) => {
                  addVideoStream(video, userVideoStream);
                });
              });
              peer.on("open", (id) => {
                socket.emit("join-vid", id, username, room);
              });
            });
          console.log("d video");
        }
        myvideo.parentElement.children[0].children[1].classList.toggle("pressed")
      });

      myvideo.parentElement.children[0].children[0].addEventListener("click", () => {
        if (stream.getAudioTracks()[0].enabled) {
          stream.getAudioTracks()[0].enabled = false;
        } else {
          stream.getAudioTracks()[0].enabled = true;
        }
        myvideo.parentElement.children[0].children[0].classList.toggle("pressed")
      });

      

      socket.on("user-vid-connected", (peerId, username) => {
        displayMessageIncoming(username);
        connectToNewUser(peerId, stream,username);
      });
      peer.on("call", (call) => {
        call.answer(stream);
        const video = document.createElement("video");
        call.on("stream", (userVideoStream) => {
          addVideoStream(video, userVideoStream,username);
        });
      });
    });
  function addVideoStream(video, stream,username) {
    video.srcObject = stream;
    video.addEventListener("loadedmetadata", () => {
      video.play();
    });
    let div= document.createElement("div");
    div.innerHTML=`<div class="buttons_ready_screenAdmin">
    <div class="mute_iconAdmin">
      <i class="fa fa-microphone fa-2x" aria-hidden="true"></i>
    </div>

    <!-- <i class="fa fa-microphone-slash" aria-hidden="true"></i> -->
    <div class="video_iconAdmin">
      <i class="fa fa-video-camera fa-2x" aria-hidden="true"></i>
    </div>
  </div>`;
  video.className =username;
    div.appendChild(video);

    video_grid.appendChild(div);
  }
  function connectToNewUser(userId, stream,username) {
    const call = peer.call(userId, stream);
    const video2 = document.createElement("video");
    call.on("stream", (userVideoStream) => {
      console.log("he7")
      addVideoStream(video2, userVideoStream,username);
    });
    call.on("close", () => {
      video2.remove();
    });
  }
  var peer = new Peer({
    // secure:true,
    host: "meetncode.herokuapp.com",
    port: "",
    path: "/peerjs",
  });
  peer.on("open", (id) => {
    socket.emit("join-vid", id, username, room);
  });
}
function removeVideo(videoId) {
  document.querySelector(`#${videoId}`).remove();
}

function videoOnlyUser(videoId, ind) {
  const myvideo = document.querySelector(`#${videoId}`);
  myvideo.muted = true;
  var videoCurrentState = false;
  var audioCurrentState = true;
  console.log("in video only user");
  navigator.mediaDevices
    .getUserMedia({
      video: videoCurrentState,
      audio: audioCurrentState,
    })
    .then((stream) => {
      addVideoStream(myvideo, stream);

      document.querySelector(".videoToggler").addEventListener("click", () => {
        if (stream.getVideoTracks()[0].enabled) {
          stream.getVideoTracks()[0].enabled = false;
        } else {
          stream.getVideoTracks()[0].enabled = true;
        }
      });

      document.querySelector(".micToggler").addEventListener("click", () => {
        if (stream.getAudioTracks()[0].enabled) {
          stream.getAudioTracks()[0].enabled = false;
        } else {
          stream.getAudioTracks()[0].enabled = true;
        }
      });

      document.querySelector(".video_icon").addEventListener("click", (e) => {
        if (stream.getVideoTracks()[0].enabled) {
          stream.getTracks().forEach(function (track) {
            if (track.readyState == "live" && track.kind === "video") {
              track.enabled = !track.enabled;
              track.stop();
            }
          });
          stream.getVideoTracks()[0].enabled = false;
          videoCurrentState = false;
          myvideo.srcObject = null;
          console.log("c video");
          // console.log(stream.getVideoTracks()[0]);
        } else {
          videoCurrentState = true;
          navigator.mediaDevices
            .getUserMedia({
              video: videoCurrentState,
              audio: audioCurrentState,
            })
            .then((newVideoStream) => {
              stream.removeTrack(stream.getVideoTracks()[0]);
              stream.addTrack(newVideoStream.getVideoTracks()[0]);
              addVideoStream(myvideo, newVideoStream);
            });
          console.log("d video");
        }
        document.querySelector(".video_icon").classList.toggle("pressed");
      });

      document.querySelector(".mute_icon").addEventListener("click", (e) => {
      
        if(stream.getAudioTracks()[0].enabled)
        {
          stream.getAudioTracks()[0].enabled=false;
        }
        else
        {
          stream.getAudioTracks()[0].enabled=true;
        }
        document.querySelector(".mute_icon").classList.toggle("pressed");
      });

      
    });
  function addVideoStream(video, stream) {
    video.srcObject = stream;
    video.addEventListener("loadedmetadata", () => {
      video.play();
    });
    // video_grid.appendChild(video);
  }
}
