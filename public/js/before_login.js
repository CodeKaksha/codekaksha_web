$(document).ready(function () {
  $("#modal1").modal();
  $("#modal2").modal();
  $("#modal12").modal();
});

function loaderOn() {
  loader.classList.remove("fade_out");
  loader.classList.add("fade_in");
}

function loaderOut() {
  loader.classList.remove("fade_in");
  loader.classList.add("fade_out");
}

let bigDiv = document.querySelector(".big_div");
let diff_height = -71;
window.setInterval(() => {
  bigDiv.style.transform = `translateY(${diff_height}px)`;
  diff_height -= 71;
  if (diff_height < -214) {
    diff_height = 0;
  }
}, 3000);
