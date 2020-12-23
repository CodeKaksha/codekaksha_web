function editor(roomId) {
  var editor = ace.edit("jsEditor");
  editor.getSession().setMode("ace/mode/c_cpp");
  let user = firebase.auth().currentUser;
  document.querySelector(".save").addEventListener("click", (e) => {
    console.log("ss");
    e.preventDefault();
    db.collection("whiteboard")
      .get()
      .then((snapshot) => {
        let fl = 0;
        snapshot.docs.forEach((doc) => {
          let data_doc = doc.data();
          if (data_doc.email == user.email && data_doc.roomID == roomId) {
            console.log(data_doc.email, data_doc.roomID);
            let canvas = document.querySelector(".whiteBoard");
            var canvasContents = canvas.toDataURL();
            fl = 1;
            var data = { image: canvasContents, date: Date.now() };
            let date = new Date();
            var string = JSON.stringify(data);
            db.collection("whiteboard")
              .doc(doc.id)
              .update({
                name: data_doc.name,
                roomID: roomId,
                data_whiteboard: string,
                data_compiler: editor.getValue(),
                email: user.email,
                date: JSON.stringify(date),
              })
              .then(() => {
                displaySuccess();
              })
              .catch((err) => {
                displayError(err);
              });
          }
        });
        if (!fl) {
          console.log("naam to de be");
          $("#modal_save").modal("");
          $("#modal_save").modal("open");
          document
            .querySelector(".submitNameOfCoderence")
            .addEventListener("click", (e) => {
              e.preventDefault();
              let canvas = document.querySelector(".whiteBoard");
              var canvasContents = canvas.toDataURL();
              fl = 1;
              var data = { image: canvasContents, date: Date.now() };
              var string = JSON.stringify(data);
              let date = new Date();

              let name = document.querySelector("#coderenceName").value;
              db.collection("whiteboard")
                .add({
                  name: name,
                  roomID: roomId,
                  data_whiteboard: string,
                  data_compiler: editor.getValue(),
                  email: user.email,
                  date: JSON.stringify(date),
                })
                .then(() => {
                  $("#modal_save").modal("close");
                  displaySuccess();
                })
                .catch((err) => {
                  displayError(err);
                });
            });
        }
      });
    e.preventDefault();
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

  editor.getSession().setMode("ace/mode/c_cpp");
  editor.setValue(initialCode);
  } else if (languageChoosenByUser === "python2") {
    const initialCode = "# write your python code here\r\n";
  editor.getSession().setMode("ace/mode/python");
  editor.setValue(initialCode);
  } else if (languageChoosenByUser === "java") {
    const initialCode =
      "public class Solution {\r\n" +
      "    public static void main(String[] args) {\r\n" +
      "        // Write your code here\r\n" +
      "    }\r\n" +
      "}";
  editor.getSession().setMode("ace/mode/java");
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
  editor.getSession().setMode("ace/mode/c_cpp");
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
