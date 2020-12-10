let rect = document.querySelector(".rectangle");
let array = document.querySelector(".array");
let array_num = document.querySelector("#array_num");
let j = 0;
let k = 0;
rect.addEventListener("click", (e) => {
  var canvas = document.createElement("canvas");
  canvas.id = `${j}header`;
  canvas.className = "canvas_abs";
  canvas.style = "border:1px solid #000000;";
  canvas.style.width = `40px`;
  canvas.style.height = `40px`;
  
  document.body.appendChild(canvas);
  dragElement(canvas);
  j++;
});

array.addEventListener("click", (e) => {
  let num_array = array_num.value;
  if (num_array) {
    let canvas_array = document.createElement("div");
    for (let i = 0; i < num_array; i++) {
      let div=document.createElement('div');
      div.className='canvas';
      var canvas = document.createElement("canvas");
      canvas.id = `${k}array`;
      k++;
      canvas.style = "border:1px solid #000000;";
      canvas.style.height = `40px`;
      canvas.style.width = `40px`;
      let inp=document.createElement('input');
      inp.type="text";
      
      inp.value=Math.floor(Math.random() * 100);
      div.appendChild(canvas);
      div.appendChild(inp);
      canvas_array.appendChild(div);
    }
    canvas_array.className = "canvas_array";
    document.body.appendChild(canvas_array);
    dragElement(canvas_array);
  } else {
    alert("BHai kuch value to daal");
  }
});

function dragElement(elmnt) {
  var pos1 = 0,
    pos2 = 0,
    pos3 = 0,
    pos4 = 0;
  if (document.getElementById(elmnt.id)) {
    // if present, the header is where you move the DIV from:
    document.getElementById(elmnt.id).onmousedown = dragMouseDown;
  } else {
    // otherwise, move the DIV from anywhere inside the DIV:
    elmnt.onmousedown = dragMouseDown;
  }

  function dragMouseDown(e) {
    e = e || window.event;
    e.preventDefault();
    // get the mouse cursor position at startup:
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;
    // call a function whenever the cursor moves:
    document.onmousemove = elementDrag;
  }

  function elementDrag(e) {
    e = e || window.event;
    e.preventDefault();
    // calculate the new cursor position:
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    // set the element's new position:
    elmnt.style.top = elmnt.offsetTop - pos2 + "px";
    elmnt.style.left = elmnt.offsetLeft - pos1 + "px";
  }

  function closeDragElement() {
    // stop moving when mouse button is released:
    document.onmouseup = null;
    document.onmousemove = null;
  }
}
