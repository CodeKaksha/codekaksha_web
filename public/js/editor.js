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
  
	const languageChoosenByUser=document.getElementById('language').value;
	if( languageChoosenByUser === "cpp17" )
	{
	  const initialCode=
		"#include <iostream>\r\n" +
		"using namespace std;\r\n" +
		"\r\n" +
		"int main() {\r\n" +
		"\t// your code goes here\r\n" +
		"\treturn 0;\r\n" +
		"}\r\n";
  
	  editor.setValue(initialCode);
	}
	else if( languageChoosenByUser === "python2" )
	{
	  const initialCode="# write your python code here\r\n";
	  editor.setValue(initialCode);
	}
	else if( languageChoosenByUser === "java" )
	{
	  const initialCode=
		"public class Solution {\r\n" +
		"    public static void main(String[] args) {\r\n" +
		"        // Write your code here\r\n" +
		"    }\r\n" +
		"}";
	  editor.setValue(initialCode);
	}
	else if( languageChoosenByUser === "c" )
	{
	  const initialCode=
		"#include <stdio.h>\r\n" +
		"\r\n" +
		"int main(void) {\r\n" +
		"\t// your code goes here\r\n" +
		"\treturn 0;\r\n" +
		"}\r\n" +
		"\r\n";
	  editor.setValue(initialCode);
	}
  
	document.querySelector('.run-but').addEventListener('click',(e)=>{
  
	const myCode=editor.getValue();
	const input=document.getElementById('inp-val').value;
  
	const data={
	  myCode,
	  input
	}
  
	socket.emit('compileCode',data,roomId);
  
	socket.on('getCredential',(credentials)=>{
		const proxy="https://cors-anywhere.herokuapp.com/";
		const url="https://api.jdoodle.com/v1/execute";
		fetch(proxy+url,{
		  method:"POST",
		  headers:{
			"Content-Type" : "application/json"
		  },
		  body:JSON.stringify({
			script : myCode,
			language: languageChoosenByUser,
			versionIndex: "0",
			stdin:input,
			clientId: credentials.id,
			clientSecret:credentials.secret
		  })
		})
		.then(res=>res.json())
		.then((data)=>{
		  var output=document.getElementById('out-val').innerHTML=data.output
		  console.log("output=",data.output)
		})
	})
  
	
  
	})
  }