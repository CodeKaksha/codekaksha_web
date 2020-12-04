let ready_btn = document.querySelector(".ready");
function ready(id)
{
  let user=firebase.auth().currentUser;
  console.log(user)
  ready_btn.addEventListener("click", (e) => {
    console.log(user.email)
    document.querySelector('#share-code-room').innerHTML=id;
    socket.emit('join-room',id,user.email,user.displayName)
    e.preventDefault();
    show_screen(meet_screen);
    removeVideo("videoBeforeJoin");
    whiteBoard(id);
    video("video-grid",user.displayName,id);
    editor();
    // $(window).blur(function () {
    //   alert('hey');
    // });
  })

}
