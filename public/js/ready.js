let ready_btn = document.querySelector(".ready");
let user_email;
function ready(id, edit,isAdmin) {
  ready_btn = document.querySelector(".ready");
  let user = firebase.auth().currentUser;
  console.log(edit)
  ready_btn.addEventListener("click", (e) => {
    if(live==1)
    {
      socket.emit("addToLiveSessions",id,user.email,user.displayName,JSON.stringify(globalLive));
    }
    console.log(id);
    document.querySelector('.containerForCanvas').classList.remove('hidden');
    user_email=user.email;
    socket.emit("join-room", id, user.email, user.displayName,isAdmin,user.photoURL);
    document.querySelector("#share-code-room").innerHTML = id;
    socket.on("data_dijiye", (socketId) => {
      var canvas = document.querySelector(".whiteBoard");
      var canvasContents = canvas.toDataURL();
      var data = { image: canvasContents, date: Date.now() };
      var string1 = JSON.stringify(data);
      socket.emit("whiteBoard_data", string1, socketId);
    });
    socket.on("whiteData", (data) => {
      if (edit == 0) {
        var canvas = document.querySelector(".whiteBoard");
        var context = canvas.getContext("2d");
        let cdata = data;
        var data2 = JSON.parse(cdata);
        var image = new Image();
        image.onload = function () {
          context.clearRect(0, 0, canvas.width, canvas.height);
          context.drawImage(image, 0, 0); // draw the new image to the screen
        };
        image.src = data2.image;
        console.log("hello");
      }
    });
    var canvas = document.querySelector(".whiteBoard");
    var context = canvas.getContext("2d");
    var image = new Image();
    image.onload = function () {
      context.clearRect(0, 0, canvas.width, canvas.height);
      console.log("d");
      context.drawImage(image, 0, 0); // draw the new image to the screen
    };
    image.src = edit.image;
    e.preventDefault();
    show_screen(meet_screen);
    paint(id);
    removeVideo("videoBeforeJoin");
    whiteBoard(id);
    video("sidenav-videogrid", user.displayName, id);
    editor(id);
  });

  // document.querySelector(".strictMode").addEventListener("click", (e) => {
  //   e.preventDefault();
  //   $(window).blur(function () {
  //     socket.emit("give_alert", id, user.displayName);

  //     socket.on("bhag_gya_lauda", (username) => {
  //       alert(`${username} has switched tabs!`);
  //     });
  //   });
  // });
}
