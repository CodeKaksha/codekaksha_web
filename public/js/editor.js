function getEl(id) {
  return document.getElementById(id);
}
window.addEventListener("onload", () => {
  const editor = document.querySelector(".ace_content");
  editor.addEventListener("keyup", (evt) => {
    const text = editor.value;
    socket.send(text);
  });
});
socket.on("message", (data) => {
  editor.value = data;
});

var e = ace.edit("jsEditor");
e.getSession().setMode("ace/mode/javascript");
e.setTheme("ace/theme/terminal");
