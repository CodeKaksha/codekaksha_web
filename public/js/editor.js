function editor(roomId) {
  var editor = ace.edit("jsEditor");
  editor.getSession().setMode("ace/mode/c_cpp");
  let user = firebase.auth().currentUser;
  document.querySelector(".save").addEventListener("click", (e) => {
    db.collection("whiteboard")
      .where("room", "==", roomId)
      .get()
      .then((snapshot) => {
        snapshot.docs.forEach((doc) => {
          let data_doc = doc.data();
          let cdata = data_doc.str;
          var data = JSON.parse(cdata);
          var image = new Image();
          image.onload = function () {
            context.clearRect(0, 0, canvas.width, canvas.height);
            context.drawImage(image, 0, 0); // draw the new image to the screen
          };
		      image.src = data.image;
		 
        });
      });
    e.preventDefault();
    let canvas = document.querySelector(".whiteBoard");
    var canvasContents = canvas.toDataURL();
    var data = { image: canvasContents, date: Date.now() };
    var string = JSON.stringify(data);
    db.collection("whiteboard").add({
      roomID: roomId,
      data_whiteboard: string,
      data_compiler: editor.getValue(),
      email:user.email
    });
  });
  editor.setTheme("ace/theme/terminal");
  editor.setShowPrintMargin(false);
  let fl = 1;
  editor.getSession().on("change", function () {
    if (fl) {
      socket.emit("editorChange", editor.getValue(), roomId);
    }
  });
  socket.on("changeEdit", (data) => {
    fl = 0;
    editor.setValue(data);
  });
  
  const languageChoosenByUser = document.getElementById("language").value;
  if (languageChoosenByUser === "cpp17") {
    const initialCode =
      "#include <iostream>\r\n" +
      "using namespace std;\r\n" +
      "\r\n" +
      "int main() {\r\n" +
      "\t// your code goes here\r\n" +
      "\treturn 0;\r\n" +
      "}\r\n";

    editor.setValue(initialCode);
  } else if (languageChoosenByUser === "python2") {
    const initialCode = "# write your python code here\r\n";
    editor.setValue(initialCode);
  } else if (languageChoosenByUser === "java") {
    const initialCode =
      "public class Solution {\r\n" +
      "    public static void main(String[] args) {\r\n" +
      "        // Write your code here\r\n" +
      "    }\r\n" +
      "}";
    editor.setValue(initialCode);
  } else if (languageChoosenByUser === "c") {
    const initialCode =
      "#include <stdio.h>\r\n" +
      "\r\n" +
      "int main(void) {\r\n" +
      "\t// your code goes here\r\n" +
      "\treturn 0;\r\n" +
      "}\r\n" +
      "\r\n";
    editor.setValue(initialCode);
  }

  document.querySelector(".run-but").addEventListener("click", (e) => {
    const myCode = editor.getValue();
    const input = document.getElementById("inp-val").value;

    const data = {
      myCode,
      input,
    };

    socket.emit("compileCode", data, roomId);

    socket.on("getCredential", (credentials) => {
      const proxy = "https://cors-anywhere.herokuapp.com/";
      const url = "https://api.jdoodle.com/v1/execute";
      fetch(proxy + url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          script: myCode,
          language: languageChoosenByUser,
          versionIndex: "0",
          stdin: input,
          clientId: credentials.id,
          clientSecret: credentials.secret,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          var output = (document.getElementById("out-val").innerHTML =
            data.output);
        });
    });
  });
}
