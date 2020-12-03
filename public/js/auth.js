let username;
let userDisplayPic;
const auth = firebase.auth();
const db = firebase.firestore();
let googleSignIn = document.querySelectorAll(".googleSignIn");
auth.onAuthStateChanged((user) => {
  if (user) {
    console.log("user logged in");
    console.log(user);
    console.log(user.photoURL);
    console.log(user.displayName);
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

    show_screen(after_login_screen);
  } else {
    console.log("user logged out");
    show_screen(index_screen);
  }
});

const logout2 = document.querySelectorAll(".logout");

for (let i = 0; i < logout2.length; i++) {
  logout2[i].addEventListener("click", (e) => {
    e.preventDefault();

    auth.signOut();
  });
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
        console.log(user);
        // ...
      })
      .catch(function (error) {
        console.log("hell");
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
