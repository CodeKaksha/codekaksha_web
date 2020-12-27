function paint(room) {
  let rect = document.querySelector(".rectangle");
  let array = document.querySelector("#array_val");
  let grid = document.querySelector("#grid_val");
  let circle = document.querySelector(".circle");
  let graph = document.querySelector(".graph");
  let inp_graph = document.querySelector("#graph");
  let array_num = document.querySelector("#array_num");
  let j = 0;
  let k = 0;
  // rect.addEventListener('click', (e) => {
  // 	var canvas = document.createElement('canvas');
  // 	canvas.id = `${j}header`;
  // 	canvas.className = 'canvas_abs';
  // 	canvas.style = 'border:1px solid #000000;';
  // 	canvas.style.width = `40px`;
  // 	canvas.style.height = `40px`;

  // 	document.body.appendChild(canvas);
  // 	dragElement(canvas);
  // 	j++;
  // });
  let p = 0;
  array.addEventListener("submit", (e) => {
    e.preventDefault();
    let arr = document.querySelector("#array_nums").value.split(" ");
    let num_array = document.querySelector("#array_size").value;
    if (num_array > 0) {
      let canvas_array = document.createElement("div");
      for (let i = 0; i < num_array; i++) {
        let div = document.createElement("div");
        div.className = "canvas";
        var canvas = document.createElement("canvas");
        canvas.id = `${k}array`;
        k++;
        canvas.style = "border:1px solid #000000;";
        canvas.style.height = `40px`;
        canvas.style.width = `40px`;

        let inp = document.createElement("div");
        inp.innerHTML = `<input type="number" value="${arr[p] ? arr[p] : p}">`;
        p++;
        div.appendChild(canvas);
        div.appendChild(inp);
        canvas_array.appendChild(div);
      }

      canvas_array.className = "canvas_array";
      document.querySelector(".containerForCanvas").appendChild(canvas_array);
      socket.emit(
        "changeInCanvas",
        document.querySelector(".containerForCanvas").innerHTML,
        room
      );
      dragElement(canvas_array);
    } else {
      alert("BHai kuch value to daal");
    }
  });

  grid.addEventListener("submit", (e) => {
    e.preventDefault();
    let num_col = document.querySelector("#grid_col").value;
    let num_rows = document.querySelector("#grid_row").value;
    if (num_col && num_rows) {
      let div2 = document.createElement("div");
      div2.className = "grid_div";
      for (let i = 0; i < num_col; i++) {
        let canvas_array = document.createElement("div");
        for (let i = 0; i < num_rows; i++) {
          let div = document.createElement("div");
          div.className = "canvas";
          var canvas = document.createElement("canvas");
          canvas.id = `${k}array`;
          k++;
          let inp = document.createElement("input");
          inp.type = "number";
          inp.value = Math.floor(Math.random() * 100);
          canvas.style = "border:1px solid #000000;";
          canvas.style.height = `40px`;
          canvas.style.width = `40px`;
          div.appendChild(canvas);
          div.appendChild(inp);

          canvas_array.appendChild(div);
        }

        canvas_array.className = "canvas_grid_array";
        div2.appendChild(canvas_array);
      }
      document.querySelector(".containerForCanvas").appendChild(div2);
      socket.emit(
        "changeInCanvas",
        document.querySelector(".containerForCanvas").innerHTML,
        room
      );
      dragElement(div2);
    } else {
      alert("mazaak chal rha h kya yahan");
    }
    e.preventDefault();
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
      // e.preventDefault();
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
      socket.emit(
        "changeInCanvas",
        document.querySelector(".containerForCanvas").innerHTML,
        room
      );
    }

    function closeDragElement() {
      // stop moving when mouse button is released:
      document.onmouseup = null;
      document.onmousemove = null;
    }
  }
  socket.on("changeAayoRe", (data) => {
    let div = document.createElement("div");
    containerForCanvas.innerHTML = data;
    for (let i = 0; i < containerForCanvas.children.length; i++) {
      dragElement(containerForCanvas.children[i]);
    }
  });
}
