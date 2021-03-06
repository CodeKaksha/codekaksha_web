let loader = document.querySelector(".loader");
let index_screen = document.querySelector(".index_screen");
let after_login_screen = document.querySelector(".after_login_screen");
let user_detail_screen = document.querySelector(".user_detail_screen");
let ready_screen = document.querySelector(".ready_screen");
let meet_screen = document.querySelector(".meet_screen");
let golive_form_screen = document.querySelector(".golive_form_screen");
let Ongoing_coderences_screen = document.querySelector(
  ".Ongoing_coderences_screen"
);
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
  var elems2 = document.querySelectorAll(".fixed-action-btn-horizontal");
  var instances = M.FloatingActionButton.init(elems, {
    // toolbarEnabled : true,
    hoverEnabled: false,
  });
  var instances2 = M.FloatingActionButton.init(elems2, {
    direction: "right",
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
  let feebackForm = document.querySelectorAll(".feedback-form-link");
  for (let i = 0; i < feebackForm.length; i++) {
    feebackForm[i].addEventListener("click", (e) => {
      console.log("hey");
      show_screen(user_detail_screen);
    });
  }
  let logos = document.querySelectorAll(".logog");
  for (let i = 0; i < logos.length; i++) {
    logos[i].addEventListener("click", (e) => {
      show_screen(after_login_screen);
    });
  }
  $("#recursion-visualiser").modal();
  $("#modal1").modal();
  $("#modal2").modal();
  $("#modal3").modal();
  $("#modal12").modal();
  // $("#modal5").modal();
  $("#array_data").modal();
  $("#grid_data").modal();
  $("#graph_data").modal();
  $("#modal_save").modal();

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

$(".call_end").click(function () {
  let x = confirm("You are about to leave the meeting!\nPress Ok to leave");
  if (x == true) {
    window.location.reload();
  }
});
// 
// side-nav-right
function openNavRight() {
  document.getElementById("mySidenav-right").style.width = "350px";
  setTimeout(() => {
    $(".sidenav-right-menu").removeClass("hidden");
  }, 700);
}

/* Set the width of the side navigation to 0 */
function closeNavRight() {
  document.getElementById("mySidenav-right").style.width = "0";
  $(".sidenav-right-menu").addClass("hidden");
}

function decNavRight() {
  document.getElementById("mySidenav-right").style.width = "350px";
  $(".closebtn").removeClass("hidden");
  setTimeout(() => {
    $(".sidenav-right-menu").removeClass("hidden");
  }, 700);
  $(".backvidbtn").addClass("hidden");
  $(".sidenav-videogrid").addClass("hidden");
}

function expNavRight() {
  document.getElementById("mySidenav-right").style.width = "100%";
}

function openNav() {
  document.getElementById("mySidenav").style.width = "100%";
}

function closeNav() {
  document.getElementById("mySidenav").style.width = "0";
}

function backNavRight() {
  $(".closebtn").removeClass("hidden");
  $(".sidenav-right-menu").removeClass("hidden");
  $(".chat-box").addClass("hidden");
  $(".sidenav-share-code").addClass("hidden");
  $(".user-list").addClass("hidden");
  $(".sidenav-error").addClass("hidden");
  $(".backbtn").addClass("hidden");
}

$(".right-people-list").click(function () {
  $(".sidenav-right-menu").addClass("hidden");
  $(".closebtn").addClass("hidden");
  $(".user-list").removeClass("hidden");
  $(".backbtn").removeClass("hidden");
});

$(".right-video-list").click(function () {
  $(".sidenav-right-menu").addClass("hidden");
  $(".closebtn").addClass("hidden");
  expNavRight();
  setTimeout(() => {
    $(".sidenav-videogrid").removeClass("hidden");
    $(".backvidbtn").removeClass("hidden");
  }, 700);
});

$(".copy-code").click(function () {
  var copyText = document.getElementById("share-code-room");
  var textArea = document.createElement("textarea");
  textArea.value = copyText.textContent;
  document.body.appendChild(textArea);
  let copyCode = textArea.value;
  textArea.select();
  document.execCommand("Copy");
  textArea.remove();
  alert("Copied the code: " + copyCode);
});

$(".right-present").click(function () {
  closeNavRight();
  openNav();
});

$(".right-chat").click(function () {
  $(".sidenav-right-menu").addClass("hidden");
  $(".closebtn").addClass("hidden");
  $(".chat-box").removeClass("hidden");
  $(".backbtn").removeClass("hidden");
});

$(".right-share").click(function () {
  $(".sidenav-right-menu").addClass("hidden");
  $(".closebtn").addClass("hidden");
  $(".sidenav-share-code").removeClass("hidden");
  $(".backbtn").removeClass("hidden");
});

$(".right-options").click(function () {
  $(".mute-end-cam").removeClass("visible");
  $(".mute-end-cam").fadeToggle();
  $(".menu-open").fadeToggle();
  closeNavRight();
});

$(".right-error").click(function () {
  $(".sidenav-right-menu").addClass("hidden");
  $(".closebtn").addClass("hidden");
  $(".sidenav-error").removeClass("hidden");
  $(".backbtn").removeClass("hidden");
});

$(".error-submit").click(function () {
  alert(
    "Your report form has been submitted!\nWe will try to fix the errors soon!"
  );
});

var socket = io({transports: ['websocket'], upgrade: false});


socket.on("ongoingLives", (currLiveStreams) => {
  console.log(currLiveStreams);
  for (let i = 0; i < currLiveStreams.length; i++) {
    let div = document.createElement("div");
    div.className = "ongoing-card";
    div.classList.add("z-depth-5");
    div.innerHTML = `
    <span class="ongoing-image">
      <img src="https://lh3.googleusercontent.com/a-/AOh14GgRrjdvx4gxdGrywp26XGatxSDDsytCSxS3s3Djsg=s96-c" class="displayPic ongoing-img">
    </span>
    <span class="ongoing-card-content">
    <span class="ongoing-title hidden">${currLiveStreams[i].id}</span> 
    <span class="ongoing-title">${currLiveStreams[i].title}</span>
      <br>
      <span class="ongoing-tags"> ${currLiveStreams[i].tags}</span>
      <br>
      <span class="ongoing-ad">Admin: <span class="ongoing-admin">${currLiveStreams[i].username}</span></span>
    </span>
    <span class="material-icons visible-icon">
      visibility
    </span>
  `;
    document.querySelector(".ongoing-container").appendChild(div);
    console.log(div);
  }
  let ongoingLives = document.querySelectorAll(".ongoing-card");
  for (let i = 0; i < ongoingLives.length; i++) {
    ongoingLives[i].addEventListener("click", () => {
      console.log("ahhah");
      ready(ongoingLives[i].children[1].children[0].textContent, 0, 0);
      show_screen(ready_screen);
      // videoOnlyUser(`videoBeforeJoin`,1);
    });
  }
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
          .querySelector(`.del${docData.roomID}`)
          .addEventListener("click", (e) => {
            e.preventDefault();
            console.log(`.del${docData.roomID}`);
            db.collection("whiteboard")
              .where("roomID", "==", docData.roomID)
              .get()
              .then((data_to_show) => {
                data_to_show.forEach((docTo) => {
                  db.collection("whiteboard")
                    .doc(docTo.id)
                    .delete()
                    .then(() => {
                      document
                        .querySelector(`.del${docData.roomID}`)
                        .parentElement.parentElement.remove();
                      alert("Deleted Succesfully");
                    })
                    .catch((err) => {
                      alert("Some error Occured");
                    });
                });
              });
          });
        document
          .querySelector(`.edit${docData.roomID}`)
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
                  // videoOnlyUser(`videoBeforeJoin`,1);
                  console.log(data.data_compiler);
                  var editor = ace.edit("jsEditor");

                  editor.setValue(data.data_compiler);

                  console.log(data2);
                  document.querySelector(".containerForCanvas").innerHTML =
                    data.data_elems;
                  show_screen(ready_screen);
                  for(let i=0;i< document.querySelector(".containerForCanvas").children.length;i++){
                    dragElement(document.querySelector(".containerForCanvas").children[i])
                  }
                  ready(docData.roomID, data2, 1);
                });
                // document.querySelector(".no-card").remove();
              });
          });
      });
      console.log(snapshot.size)
      if(snapshot.size>0){
        document.querySelector(".nahi-h-koi").remove();
      }
      document.querySelector(".saved_coderence_loader").remove();
    });

  $(".user-submit").click(function () {
    show_screen(after_login_screen);
  });

  $(".ongoing-but").click(function () {
    show_screen(Ongoing_coderences_screen);
    socket.emit("bringLives");
  });

  $(".ongoing-back").click(function () {
    show_screen(after_login_screen);
  });

  $(".golive-but").click(function () {
    show_screen(golive_form_screen);
  });

  $(".golive-back").click(function () {
    show_screen(after_login_screen);
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
  user_detail_screen.classList.add("hidden");
  Ongoing_coderences_screen.classList.add("hidden");
  golive_form_screen.classList.add("hidden");
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
          <i class="small material-icons edit${room}">
            create
          </i>
          <i class=" small material-icons delete del${room}">
            delete
          </i>
        </div>
	  </a>`;
  return div;
}
