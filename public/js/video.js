
function video(videoId,username,room) {

  const video_grid = document.querySelector(`.${videoId}`);
  const myvideo = document.createElement("video");
  myvideo.muted = true;
  console.log('in video main')
  var videoCurrentState=true;
  var audioCurrentState=false;
  navigator.mediaDevices
    .getUserMedia({
      video: videoCurrentState,
      audio: audioCurrentState,
    })
    .then((stream) => {
      addVideoStream(myvideo, stream);

      document.querySelector('.videoToggler').addEventListener('click',()=>{
        if(stream.getVideoTracks()[0].enabled)
        {
          stream.getVideoTracks()[0].enabled=false;
        }
        else
        {
          stream.getVideoTracks()[0].enabled=true;
        }
      })

      document.querySelector('.micToggler').addEventListener('click',()=>{
        if(stream.getAudioTracks()[0].enabled)
        {
          stream.getAudioTracks()[0].enabled=false;
        }
        else
        {
          stream.getAudioTracks()[0].enabled=true;
        }
      })

      //LIGHTS ON/OFF KRNE WALA PART ISKE NICHE HAI, ABHI COMMENTS ME HI REHNE DO
      /*document.querySelector('.videoToggler').addEventListener('click',()=>{
        if(stream.getVideoTracks()[0].enabled)
        {
            stream.getTracks().forEach(function(track){
            if(track.readyState=='live' && track.kind==='video')
            {
              track.enabled=!track.enabled;
              track.stop();
            }
            })
            stream.getVideoTracks()[0].enabled=false;   
            videoCurrentState=false;
            myvideo.srcObject=null;
            console.log("a video");
            // console.log(stream.getVideoTracks()[0]);
        }
        else
        {
            videoCurrentState=true;
            navigator.mediaDevices.getUserMedia({
              video:videoCurrentState,
              audio:audioCurrentState
            })
            .then((newVideoStream)=>{
              stream.removeTrack(stream.getVideoTracks()[0])
              stream.addTrack(newVideoStream.getVideoTracks()[0])
              addVideoStream(myvideo,newVideoStream);
            })
            console.log("b video")
        }
      })
      
      document.querySelector('.micToggler').addEventListener('click',()=>{
        if(stream.getAudioTracks()[0].enabled)
        {
            stream.getTracks().forEach(function(track){
            if(track.readyState=='live' && track.kind==='audio')
            {
              track.enabled=!track.enabled;
              track.stop();
            }
            })
            stream.getAudioTracks()[0].enabled=false;   
            audioCurrentState=false;
            // myvideo.srcObject=null;
            console.log("a audio");
            // console.log(stream.getAudioTracks()[0]);
        }
        else
        {
            audioCurrentState=true;
            navigator.mediaDevices.getUserMedia({
              video:videoCurrentState,
              audio:audioCurrentState
            })
            .then((newAudioStream)=>{
              stream.removeTrack(stream.getAudioTracks()[0])
              stream.addTrack(newAudioStream.getAudioTracks()[0])
              addVideoStream(myvideo,newAudioStream);
            })
            console.log("b audio")
        }
      })*/


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
  var audioCurrentState=false;
  console.log("in video only user");
  navigator.mediaDevices
    .getUserMedia({
      video: videoCurrentState,
      audio: audioCurrentState,
    })
    .then((stream) => {
      addVideoStream(myvideo, stream)

      document.querySelector('.videoToggler').addEventListener('click',()=>{
        if(stream.getVideoTracks()[0].enabled)
        {
          stream.getVideoTracks()[0].enabled=false;
        }
        else
        {
          stream.getVideoTracks()[0].enabled=true;
        }
      })

      document.querySelector('.micToggler').addEventListener('click',()=>{
        if(stream.getAudioTracks()[0].enabled)
        {
          stream.getAudioTracks()[0].enabled=false;
        }
        else
        {
          stream.getAudioTracks()[0].enabled=true;
        }
      })

      //LIGHTS ON/OFF KRNE WALA PART ISKE NICHE HAI, ABHI COMMENTS ME HI REHNE DO
      /*document.querySelector('.videoToggler').addEventListener('click',()=>{
        if(stream.getVideoTracks()[0].enabled)
        {
            stream.getTracks().forEach(function(track){
            if(track.readyState=='live' && track.kind==='video')
            {
              track.enabled=!track.enabled;
              track.stop();
            }
            })
            stream.getVideoTracks()[0].enabled=false;   
            videoCurrentState=false;
            myvideo.srcObject=null;
            console.log("c video");
            // console.log(stream.getVideoTracks()[0]);
        }
        else
        {
            videoCurrentState=true;
            navigator.mediaDevices.getUserMedia({
              video:videoCurrentState,
              audio:audioCurrentState
            })
            .then((newVideoStream)=>{
              stream.removeTrack(stream.getVideoTracks()[0])
              stream.addTrack(newVideoStream.getVideoTracks()[0])
              addVideoStream(myvideo,newVideoStream);
            })
            console.log("d video")
        }
      })

      document.querySelector('.micToggler').addEventListener('click',()=>{
        // console.log("yha dekh be ",stream);
        if(stream.getAudioTracks()[0].enabled)
        {
            stream.getTracks().forEach(function(track){
            if(track.readyState=='live' && track.kind==='audio')
            {
              track.enabled=!track.enabled;
              track.stop();
            }
            })
            stream.getAudioTracks()[0].enabled=false;   
            audioCurrentState=false;
            // myvideo.srcObject=null;
            console.log("c audio");
            // console.log(stream.getAudioTracks()[0]);
        }
        else
        {
            audioCurrentState=true;
            navigator.mediaDevices.getUserMedia({
              video:videoCurrentState,
              audio:audioCurrentState
            })
            .then((newAudioStream)=>{
              stream.removeTrack(stream.getAudioTracks()[0])
              stream.addTrack(newAudioStream.getAudioTracks()[0])
              addVideoStream(myvideo,newAudioStream);
            })
            console.log("d audio")
        }
      })*/

    });
  function addVideoStream(video, stream) {
    video.srcObject = stream;
    video.addEventListener("loadedmetadata", () => {
      video.play();
    });
    video_grid.appendChild(video);
  }
}