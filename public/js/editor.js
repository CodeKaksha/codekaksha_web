function editor(roomId) {
  var editor = ace.edit("jsEditor");
  var editor2 = ace.edit("jsEditor2");
  editor.getSession().setMode("ace/mode/c_cpp");
  editor2.getSession().setMode("ace/mode/javascript");
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
                data_elems: document.querySelector(".containerForCanvas")
                  .innerHTML,
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
          console.log($("#modal_save"));
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
                  data_elems: document.querySelector(".containerForCanvas")
                    .innerHTML,
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
  editor2.setTheme("ace/theme/terminal");
  editor.setShowPrintMargin(false);
  editor2.setShowPrintMargin(false);
  let initialCode2 = `
  function fn(n)
  {
      if(n<=0) 
          return;
      return fn(n-1);
  }  
  `;
  editor2.setValue(initialCode2);

  const languageChoosenByUser = document.getElementById("language").value;
  if (!editor.getValue()) {
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
  }
  document.querySelector(".ace_text-input").addEventListener("keyup", () => {
    console.log("hello");
    const text = editor.getValue();
    socket.emit("editorChange", text, roomId);
  });
  socket.on("changeEdit", (data) => {
    console.log("hey");
    editor.setValue(data);
    editor.clearSelection();
  });

  document.querySelector(".run-but").addEventListener("click", (e) => {
    const myCode = editor.getValue();
    const input = document.getElementById("inp-val").value;

    document.getElementById("out-val").innerHTML = "Running...";
    document.querySelector(".run-but").disabled = true;
    document.querySelector(".run-but").style.opacity = "0.5";

    const data = {
      codeWritten: myCode,
      language: languageChoosenByUser,
      inputGiven: input,
    };
    // console.log(data);

    // socket.emit("compileCode", data, roomId);

    fetch("/compileKro", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((res2) => {
        document.getElementById("out-val").innerHTML = res2.output;
        // console.log(data);
        document.querySelector(".run-but").disabled = false;
        document.querySelector(".run-but").style.opacity = "1";
      });
  });
}
