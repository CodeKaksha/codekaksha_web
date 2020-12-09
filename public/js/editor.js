// function editor(roomId) {
//   var editor = ace.edit("jsEditor");
//   editor.getSession().setMode("ace/mode/c_cpp");
//   editor.setTheme("ace/theme/terminal");
//   editor.setShowPrintMargin(false);
//   let fl = 1;
//   editor.getSession().on("change", function () {
//     if (fl) {
//       socket.emit("editorChange", editor.getValue(), roomId);
// 	}
//   });
//   socket.on("changeEdit", (data) => {
//     console.log(data);
//     fl = 0;
//     editor.setValue(data);
//   });
//   document.querySelector('.runCode').addEventListener('click',(e)=>{
// 	document.querySelector('#out-val').value=document.querySelector('#inp-val').value;
//   })
// }

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
	// document.querySelector('#out-val').value=document.querySelector('#inp-val').value;
  // console.log(editor.getValue())

  const myCode=editor.getValue();
  const input=document.getElementById('inp-val').value;

  const proxy="https://cors-anywhere.herokuapp.com/";
      const url="https://api.jdoodle.com/v1/execute";
      fetch(proxy+url,{
        method:"POST",
        headers:{
          "Content-Type" : "application/json"
        },
        body:JSON.stringify({
          script : myCode,
          language: "cpp17",
          versionIndex: "0",
          stdin:input,
          clientId: "932946c5d15ae06e8db71370e8cf70a7",
          clientSecret:"ff96ca58ff83876a898f91c734cea395d5ecdd4c3afe1c1bbac54df972d3ced9"
        })
      })
      .then(res=>res.json())
      .then((data)=>{
        var output=document.getElementById('out-val').innerHTML=data.output
        console.log("output=",data.output)
      })

  })
}