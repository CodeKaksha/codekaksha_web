function getEl(id) {
  return document.getElementById(id);
}
let editor;
let bruh;
window.onload=() => {
  const targetNode = document.getElementById(".ace_text-layer");
  let j=1;
  // Options for the observer (which mutations to observe)
  const config = { attributes: true, childList: false, subtree: false };

  if(j)
  {
    bruh=editor
    j=0;
  }
  const observer = new MutationObserver(()=>{
  
    if(bruh!=editor.innerHTML)
    {
      socket.send(editor.innerHTML);
    }
  });
  observer.observe(targetNode, config);
};
socket.on("message", (data) => {
  editor.innerHTML = data;
  bruh=data;
});

var e = ace.edit("jsEditor");
e.getSession().setMode("ace/mode/c_cpp");
e.setTheme("ace/theme/terminal");
