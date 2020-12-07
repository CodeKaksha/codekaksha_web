function editor(roomId) {
  var editor = ace.edit("jsEditor");
  editor.getSession().setMode("ace/mode/c_cpp");
  editor.setTheme("ace/theme/terminal");
  editor.setShowPrintMargin(false);
  let fl = 1;
  editor.getSession().on("change", function () {
    if (fl) {
      socket.emit("editorChange", editor.getValue(), roomId);
	}
  });
  socket.on("changeEdit", (data) => {
    console.log(data);
    fl = 0;
    editor.setValue(data);
  });
  document.querySelector('.runCode').addEventListener('click',(e)=>{
	document.querySelector('#out-val').value=document.querySelector('#inp-val').value;
  })
}
