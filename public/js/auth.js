let username;
let userDisplayPic;
const auth = firebase.auth();
const db = firebase.firestore();
let windowUrl = window.location.href;
if (windowUrl[4] != "s" && windowUrl[windowUrl.length - 2] == "m") {
  window.location.href = "https://meetncode.herokuapp.com";
}
let googleSignIn = document.querySelectorAll(".googleSignIn");
auth.onAuthStateChanged((user) => {
  if (user) {
    var request = new XMLHttpRequest();
    request.open("GET", "/screen/1", true);

    request.onload = function () {
      if (this.status >= 200 && this.status < 400) {
        // Success!
        var data = this.response;
        let div = document.createElement("div");
        div.innerHTML = data;
        document.body.appendChild(div);
        after_login_screen = document.querySelector(".after_login_screen");
        loader = document.querySelector(".loader");
        index_screen = document.querySelector(".index_screen");
        user_detail_screen = document.querySelector(".user_detail_screen");
        after_login_screen = document.querySelector(".after_login_screen");
        console.log(after_login_screen);
        ready_screen = document.querySelector(".ready_screen");
        meet_screen = document.querySelector(".meet_screen");
        golive_form_screen = document.querySelector(".golive_form_screen");
        username = user.displayName;
        userDisplayPic = user.photoURL;
        let usernames = document.querySelectorAll(".username");
        for (let i = 0; i < usernames.length; i++) {
          usernames[i].innerHTML = username;
        }
        let DisplayPics = document.querySelectorAll(".displayPic");
        for (let i = 0; i < DisplayPics.length; i++) {
          DisplayPics[i].src = userDisplayPic;
        }
        once_entered = 1;
        frontjs();
        displaySavedOnes();

        ai();
        // canvas();
        app();
        chats();
        logouts();
        show_screen(after_login_screen);
      } else {
        // We reached our target server, but it returned an error
      }
    };

    request.onerror = function () {
      // There was a connection error of some sort
    };

    request.send();
    //show_screen(after_login_screen);
  } else {
    loaderOn();
    window.setTimeout(() => {
      loaderOut();
    }, 600);
    index_screen.classList.remove("hidden");
  }
});
function logouts() {
  const logout2 = document.querySelectorAll(".logout");

  for (let i = 0; i < logout2.length; i++) {
    logout2[i].addEventListener("click", (e) => {
      e.preventDefault();

      auth.signOut();
    });
  }
}

for (let i = 0; i < googleSignIn.length; i++) {
  googleSignIn[i].addEventListener("click", (e) => {
    var provider = new firebase.auth.GoogleAuthProvider();
    firebase
      .auth()
      .signInWithPopup(provider)
      .then(function (result) {
        // This gives you a Google Access Token. You can use it to access the Google API.
        var token = result.credential.accessToken;
        // The signed-in user info.
        var user = result.user;
        // ...
      })
      .catch(function (error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        alert(errorMessage);
        // The email of the user's account used.
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;
        // ...
      });
    e.preventDefault();
  });
}
