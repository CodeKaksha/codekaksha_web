let loader = document.querySelector(".loader");
let index_screen = document.querySelector(".index_screen");
let after_login_screen = document.querySelector(".after_login_screen");
let ready_screen = document.querySelector(".ready_screen");
let meet_screen = document.querySelector(".meet_screen");
let bigDiv = document.querySelector(".big_div");
let diff_height = -71;
window.setInterval(() => {
  bigDiv.style.transform = `translateY(${diff_height}px)`;
  diff_height -= 71;
  if (diff_height < -214) {
    diff_height = 0;
  }
}, 3000);

$(document).ready(function () {
  // $('.fixed-action-btn').floatingActionButton();
  var elems = document.querySelectorAll(".fixed-action-btn");
  var instances = M.FloatingActionButton.init(elems, {
    // direction:'right',
    // toolbarEnabled : true
    hoverEnabled: false,
  });

  $("#reportForm").on("submit", function (e) {
    console.log($("#reportForm").serialize());
    fetch("/reportError", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: $("#reportForm").serialize(),
    });
    e.preventDefault();
  });

  $("#modal1").modal();
  $("#modal2").modal();
  $("#modal3").modal();
  $("#modal12").modal();
  $("#modal5").modal();
  $("#array_data").modal();
  $("#grid_data").modal();

  $(".menu-open").fadeToggle();
  $(".option-menu").click(function () {
    $(".menu-open").removeClass("visible");
    $(".menu-open").fadeToggle();
  });

  $(".mute-end-cam").fadeToggle();
  $(".end-meet").click(function () {
    $(".mute-end-cam").removeClass("visible");
    $(".mute-end-cam").fadeToggle();
    $(".menu-open").fadeToggle();
  });

  var vidHide = 0;
  $(".video-hide").click(function () {
    $(".video-table").fadeToggle();
    $(".menu-open").fadeToggle();
    if (vidHide == 0) {
      $(".vid-hid-text").text("Show People");
      vidHide = 1;
    } else {
      $(".vid-hid-text").text("Hide People");
      vidHide = 0;
    }
  });

  $(".chat").click(function () {
    $(".option-menu").fadeToggle();
    $(".menu-open").fadeToggle();
    $(".chat-box").removeClass("visible");
  });

  $(".close-msg").click(function () {
    $(".chat-box").addClass("visible");
    $(".option-menu").fadeToggle();
  });
});

$(".mic_on").click(() => {
  $(".mic_on").addClass("hidden");
});

$(".mic_off").click(() => {
  $(".mic_on").removeClass("hidden");
});

$(".video_on").click(() => {
  $(".video_on").addClass("hidden");
});

$(".video_off").click(() => {
  $(".video_on").removeClass("hidden");
});

function displaySavedOnes() {
  let user = firebase.auth().currentUser;
  const db = firebase.firestore();
  console.log(user.email);
  db.collection("whiteboard")
    .where("email", "==", user.email)
    .get()
    .then((snapshot) => {
      snapshot.forEach((doc) => {
        let docData = doc.data();
        let div = make_card_save(docData.name, docData.date, docData.roomID);

        document.querySelector(".saved-cards").appendChild(div);
        document
          .querySelector(`.${docData.roomID}_edit`)
          .addEventListener("click", (e) => {
            e.preventDefault();
            db.collection("whiteboard")
              .where("roomID", "==", docData.roomID)
              .get()
              .then((data_to_show) => {
                data_to_show.forEach((docTo) => {
                  let data = docTo.data();
                  var canvas = document.querySelector(".whiteBoard");
                  var context = canvas.getContext("2d");
                  var data2 = JSON.parse(data.data_whiteboard);
                  
                  console.log(data2)
                  show_screen(ready_screen);
                  ready(docData.roomID,data2);
                });
              });
              
          });
        });
      document.querySelector('.saved_coderence_loader').remove();
      document.querySelector(".no-card").remove();
    });

}

function loaderOn() {
  loader.classList.remove("fade_out");
  loader.classList.add("fade_in");
}

function loaderOut() {
  loader.classList.remove("fade_in");
  loader.classList.add("fade_out");
}

function show_screen(screen_name) {
  index_screen.classList.add("hidden");
  after_login_screen.classList.add("hidden");
  ready_screen.classList.add("hidden");
  meet_screen.classList.add("hidden");
  loaderOn();
  window.setTimeout(() => {
    loaderOut();
  }, 600);
  screen_name.classList.remove("hidden");
}

function displayMessageIncoming(user) {
  // alert(user);
  let div = document.createElement("div");
  div.className = "notification";
  div.innerHTML = `${user} has joined the coderence!`;
  document.body.appendChild(div);
}

function displayMessageOutgoing(user) {
  alert(user);
  let div = document.createElement("div");
  div.className = "notification";
  div.innerHTML = `${user} has left the coderence!`;
  document.body.appendChild(div);
}

function displayRoomUsers(users) {}
function displayError(err) {
  alert(err);
}
function displaySuccess() {
  alert("success");
}
function make_card_save(name, date, room) {
  let div = document.createElement("div");
  div.innerHTML = `
	<a class="card1 z-depth-3" href="#">
        <div class="card-container1" style="margin-bottom: 10px;">
          <span class="default-card-head">${name} </span>
          <span class="card-head"></span>
        </div>
        <div class="card-container2" style="margin-bottom: 30px;">
          <span class="default-card-date">Date last visited: ${date} </span>
          <span class="card-date"></span>
        </div>
        <div class="go-corner" href="#">
          <div class="go-arrow">
            →
          </div>
        </div>
        <div class="card-container3">
          <i class="small material-icons ${room}_edit">
            create
          </i>
          <i class=" small material-icons">
            delete
          </i>
        </div>
	  </a>`;
  return div;
}
