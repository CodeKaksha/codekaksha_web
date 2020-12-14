let ready_btn = document.querySelector(".ready");
function ready(id) {
  let user = firebase.auth().currentUser;
  ready_btn.addEventListener("click", (e) => {
    document.querySelector("#share-code-room").innerHTML = id;
    socket.emit("join-room", id, user.email, user.displayName);
    socket.on("data_dijiye", (socketId) => {

      var canvas = document.querySelector(".whiteBoard");
      var canvasContents = canvas.toDataURL();
      var data = { image: canvasContents, date: Date.now() };
      var string1 = JSON.stringify(data);
      socket.emit("whiteBoard_data", string1, socketId);
    });
    socket.on("whiteData", (data) => {
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
    });
    e.preventDefault();
    show_screen(meet_screen);
    paint(id);
    removeVideo("videoBeforeJoin");
    whiteBoard(id);
    video("video-add", user.displayName, id);
    editor(id);
  });

  document.querySelector(".strictMode").addEventListener("click", (e) => {
    e.preventDefault();
    $(window).blur(function () {
      socket.emit("give_alert", id, user.displayName);
      
      socket.on("bhag_gya_lauda", (username) => {
        alert(`${username} has switched tabs!`);
      });
    });
  });
}
