function editor() {
  var editor = ace.edit("jsEditor");
  editor.getSession().setMode("ace/mode/c_cpp");
  editor.setTheme("ace/theme/terminal");
  editor.setShowPrintMargin(false);
  editor.getSession().on("change", function () {
    socket.emit("editorChange", editor.getValue());
    console.log(editor.getValue());
  });
}
