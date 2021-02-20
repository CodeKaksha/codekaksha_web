function paint(room) {
  let rect = document.querySelector(".rectangle");
  let array = document.querySelector("#array_val");
  let grid = document.querySelector("#grid_val");
  let circle = document.querySelector("#circleBanao");
  let graph = document.querySelector("#graph_val");
  let inp_graph = document.querySelector("#graph");
  let array_num = document.querySelector("#array_num");
  let addText = document.querySelector(".text_add");
  let j = 0;
  let k = 0;
  let gridRow = 1;

  //Add Rectangle
  rect.addEventListener("click", (e) => {
    var canvas = document.createElement("canvas");
    canvas.id = `${j}rect`;
    canvas.className = "canvas_abs";
    canvas.style = "border:1px solid #000000;";
    canvas.style.width = `40px`;
    canvas.style.height = `40px`;
    canvas.style.top = `0`;
    document.querySelector(".containerForCanvas").appendChild(canvas);
    changeMouse();
    dragElement(canvas);
    socket.emit(
      "changeInCanvas",
      document.querySelector(".containerForCanvas").innerHTML,
      room
    );
    j++;
  });
  //Add Circles
  let s = 0;
  circle.addEventListener("click", (e) => {
    var canvas = document.createElement("canvas");
    canvas.id = `${s}circle`;
    canvas.className = "canvas_abs";
    canvas.style = "border:1px solid #000000;";
    canvas.style.width = `40px`;
    canvas.style.height = `40px`;
    canvas.style.borderRadius = `50%`;
    canvas.style.top = `0`;
    document.querySelector(".containerForCanvas").appendChild(canvas);
    changeMouse();

    dragElement(canvas);
    socket.emit(
      "changeInCanvas",
      document.querySelector(".containerForCanvas").innerHTML,
      room
    );
    s++;
  });

  //Add Text Box
  let n = 0;
  addText.addEventListener("click", (e) => {
    let div = document.createElement("div");
    div.className = "textDrop";
    var canvas = document.createElement("canvas");
    canvas.id = `${k}array`;
    k++;
    // canvas.style = 'border:1px solid #000000;';
    canvas.style.height = `40px`;
    canvas.style.width = `40px`;

    let inp = document.createElement("div");
    inp.style = "position:absolute;top:0;";
    inp.innerHTML = `<input type="text" value="hey"  onkeypress="this.style.width = ((this.value.length + 1) * 8) + 'px';">`;
    p++;
    div.appendChild(inp);
    div.appendChild(canvas);
    document.querySelector(".containerForCanvas").appendChild(div);
    console.trace();
    dragElement(div);
    changeMouse();
    socket.emit(
      "changeInCanvas",
      document.querySelector(".containerForCanvas").innerHTML,
      room
    );
    n++;
  });

  let p = 0;
  let id_arr = 0;
  let last_id_active = 0;
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
      canvas_array.id = `array${id_arr}`;
      id_arr++;

      document.querySelector(".containerForCanvas").appendChild(canvas_array);
      changeMouse();
      document
        .querySelector(`#array${id_arr - 1}`)
        .addEventListener("click", (e) => {
          console.log(e.target);
          if (
            e.target.parentElement.parentElement.classList.contains(
              "canvas_array"
            )
          ) {
            e.target.parentElement.parentElement.classList.add("active_array");
          } else {
            last_id_active = e.target.parentElement.parentElement.parentElement.id.split(
              "array"
            )[1];
            console.log(
              e.target.parentElement.parentElement.parentElement.id.split(
                "array"
              )
            );
            e.target.parentElement.parentElement.parentElement.classList.add(
              "active_array"
            );
            document
              .querySelector(`#array${last_id_active}`)
              .addEventListener("focusout", (e) => {
                document
                  .querySelector(`#array${last_id_active}`)
                  .classList.remove("active_array");
              });
          }
        });
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
          let inp = document.createElement("div");
          inp.innerHTML = `<input type="number" value="${Math.floor(
            Math.random() * 100
          )}">`;
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
      changeMouse();
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
    let data = document.querySelector("#graph_nums").value.split("\n");
    console.log(data);
    let base_url = `https://chart.googleapis.com/chart?cht=gv&chl=graph{`;
    for (let i = 0; i < data.length; i++) {
      let nums = data[i].split(" ");
      console.log(nums);
      base_url += `${nums[0]}--${nums[1]}[label="${nums[2]}"];`;
    }
    base_url += "}";
    console.log(base_url);
    let url = `https://chart.googleapis.com/chart?cht=gv&chl=graph{1--3[label="10"];2--4[label="11"];5--4[label="10"];3--5[label="12"];1--6[label="10"];6--5[label="12"]}`;
    let img = document.createElement("img");
    img.src = base_url;
    img.className = "graph_img";
    dragElement(img);

    document.querySelector(".containerForCanvas").appendChild(img);
    changeMouse();
  });

  
  socket.on("changeAayoRe", (data) => {
    let div = document.createElement("div");
    let containerForCanvas = document.querySelector(".containerForCanvas");
    containerForCanvas.innerHTML = data;
    for (let i = 0; i < containerForCanvas.children.length; i++) {
      dragElement(containerForCanvas.children[i]);
    }
  });
  function array_open(e) {
    if (e.keyCode == 65 && document.activeElement == document.body) {
      $("#array_data").modal("open");
    }
  }

  function grid_open(e) {
    if (e.keyCode == 71 && document.activeElement == document.body) {
      $("#grid_data").modal("open");
    }
  }

  function graph_open(e) {
    if (e.keyCode == 84 && document.activeElement == document.body) {
      $("#graph_data").modal("open");
    }
  }
  document.addEventListener("keyup", array_open, false);
  document.addEventListener("keyup", grid_open, false);
  document.addEventListener("keyup", graph_open, false);
}
// window.setInterval(()=>{
//   console.log(document.activeElement)
// },1000)
function changeMouse() {
  document.querySelector(".whiteBoard").style = `cursor:auto`;
  let containerForCanvas = document.querySelectorAll(".containerForCanvas");
  for (let i = 0; i < containerForCanvas.length; i++) {
    containerForCanvas[i].style = "z-index:1";
  }
}
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
    console.log(elmnt.offsetTop);

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