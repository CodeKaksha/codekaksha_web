let ready_btn = document.querySelector(".ready");
function ready(id)
{
  let user=firebase.auth().currentUser;
  console.log(user)
  ready_btn.addEventListener("click", (e) => {
    socket.emit('join-room',id,user.email,user.name)
    e.preventDefault();
    show_screen(meet_screen);
    removeVideo("videoBeforeJoin");
    whiteBoard(id);
    video("video-grid");
    editor();
    // $(window).blur(function () {
    //   alert('hey');
    // });
  })

}
