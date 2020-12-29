function paint(room) {
  let rect = document.querySelector(".rectangle");
  let array = document.querySelector("#array_val");
  let grid = document.querySelector("#grid_val");
  let circle = document.querySelector(".circle");
  let graph = document.querySelector("#graph_val");
  let inp_graph = document.querySelector("#graph");
  let array_num = document.querySelector("#array_num");
  let j = 0;
  let k = 0;
  let gridRow = 1;
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
      let btns = document.createElement("div");
      btns.className = "btns";
      btns.className = "btns_array";
      btns.classList.add("hidden");
      btns.innerHTML = `<a class="btn-floating btn-small waves-effect waves-light red"><i class="material-icons">reorder</i></a>
		<a class="btn-floating btn-small waves-effect waves-light red delete"><i class="material-icons">delete</i></a>
    <a class="btn-floating btn-small waves-effect waves-light red" id="drag_handle"><i class="material-icons">drag_handle</i></a> `;
      canvas_array.appendChild(btns);
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

    $(".canvas_array").hover(
      function () {
        $(".btns_array").removeClass("hidden");
      },
      function () {
        $(".btns_array").addClass("hidden");
      }
    );
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
        let btns = document.createElement("div");
        btns.className = "btns";
        btns.className = "btns_grid";
        btns.classList.add("hidden");
        btns.innerHTML = `<a class="btn-floating btn-small waves-effect waves-light red"><i class="material-icons">reorder</i></a>
		<a class="btn-floating btn-small waves-effect waves-light red"><i class="material-icons">delete</i></a>
		<a class="btn-floating btn-small waves-effect waves-light red" class="drag_handle"><i class="material-icons">drag_handle</i></a> 
		`;
        canvas_array.appendChild(btns);
        canvas_array.className = "canvas_grid_array";
        let tempClass = "array-grid" + gridRow;
        canvas_array.classList.add(tempClass);
        div2.appendChild(canvas_array);
        gridRow++;
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

    for (let i = 1; i <= gridRow; i++) {
      let s = ".array-grid" + i;
      $(s).hover(
        function () {
          $(".btns_grid").removeClass("hidden");
        },
        function () {
          $(".btns_grid").addClass("hidden");
        }
      );
    }
  });
  graph.addEventListener("submit", (e) => {
    e.preventDefault();
    let data = document.querySelector('#graph_nums').value.split('\n');
    console.log(data);
    let base_url = `https://chart.googleapis.com/chart?cht=gv&chl=graph{`;
    for (let i = 0; i < data.length; i++) {
      let nums = data[i].split(' ');
      console.log(nums);
      base_url += `${nums[0]}--${nums[1]}[label="${nums[2]}"];`
    }
    base_url += "}";
    console.log(base_url)
    let url = `https://chart.googleapis.com/chart?cht=gv&chl=graph{1--3[label="10"];2--4[label="11"];5--4[label="10"];3--5[label="12"];1--6[label="10"];6--5[label="12"]}`;
    let img = document.createElement("img");
    img.src = base_url;
    img.className = "graph_img";
    dragElement(img);

    document.querySelector(".containerForCanvas").appendChild(img);
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