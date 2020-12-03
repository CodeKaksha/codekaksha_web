let ready_btn = document.querySelector(".ready");
ready_btn.addEventListener("click", (e) => {
  e.preventDefault();
  show_screen(meet_screen);
  removeVideo("videoBeforeJoin");
  whiteBoard();
  video("video-grid");
  editor();
  $(window).blur(function () {
    alert('hey');
  });
});
