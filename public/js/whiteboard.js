let whiteBoardPages = [];
function whiteBoard(room) {
  var stack = new Stack();
  var redoStack = new Stack();
  var canvas = document.querySelector(".whiteBoard");
  var colors = document.getElementsByClassName("color");
  var context = canvas.getContext("2d");
  canvas.style.resize = "both";

  var current = {
    color: "black",
  };

  var pencilWidth = 2;

  var colourInput = document.getElementById("color-picker");

  colourInput.addEventListener("input", () => {
    current.color = colourInput.value;
  });
  document.addEventListener('mousemove', (e) => {
    socket.emit("mousePosChanged",e.pageX,e.pageY,room);
  })
  socket.on('changeMouseHoGya',(pos1,pos2)=>{
    document.querySelector('.mousemove').classList.remove("hidden")
    document.querySelector('.mousemove').style=`top:${pos2}px;left:${pos1}px`
  })


  document.getElementById("eraser").addEventListener("click", () => {
    document.querySelector(
      ".whiteBoard"
    ).style = `cursor:url('../res/erase.png'),auto;`;
    current.color = "#F5F5FA";
    pencilWidth = 15;
    zIndexManage();
  });
  function erase(e) {
    console.log(e.keyCode);
    if (e.keyCode == 69 && document.activeElement == document.body) {
      document.querySelector(
        ".whiteBoard"
      ).style = `cursor:url('../res/erase.png'),auto;`;
      current.color = "#F5F5FA";
      pencilWidth = 15;
    }
    zIndexManage();
  }
  function penLarge(e) {
    if (e.keyCode == 76 && document.activeElement == document.body) {
      current.color = colourInput.value;
      document.querySelector(
        ".whiteBoard"
      ).style = `cursor:url('../res/dot_large.png'),auto!important;`;
      pencilWidth = 15;
    }
    zIndexManage();
  }
  function penMed(e) {
    if (e.keyCode == 77 && document.activeElement == document.body) {
      current.color = colourInput.value;
      pencilWidth = 10;
      document.querySelector(
        ".whiteBoard"
      ).style = `cursor:url('../res/dot_med.png'),auto;`;
    }
    zIndexManage();
  }
  function penSm(e) {
    if (e.keyCode == 83 && document.activeElement == document.body) {
      current.color = colourInput.value;
      pencilWidth = 5;
      document.querySelector(
        ".whiteBoard"
      ).style = `cursor:url('../res/dot_sm.png'),auto;`;
    }
    zIndexManage();
  }
  document.getElementById("hand").addEventListener("click", () => {
    document.querySelector(".whiteBoard").style = `cursor:auto`;
    dragWhiteboard(canvas);
    zIndexManageOpposite();
    current.color = "transparent";
  });

  document.getElementById("pencilSmall").addEventListener("click", () => {
    current.color = colourInput.value;
    pencilWidth = 5;
    document.querySelector(
      ".whiteBoard"
    ).style = `cursor:url('../res/dot_sm.png'),auto;`;
  });

  document.getElementById("pencilMedium").addEventListener("click", () => {
    current.color = colourInput.value;
    pencilWidth = 10;
    document.querySelector(
      ".whiteBoard"
    ).style = `cursor:url('../res/dot_med.png'),auto;`;
  });

  document.getElementById("pencilTiny").addEventListener("click", () => {
    current.color = colourInput.value;
    document.querySelector(
      ".whiteBoard"
    ).style = `cursor:url('../res/dot_sm.png'),auto;`;
    pencilWidth = 2;
  });

  document.getElementById("pencilLarge").addEventListener("click", () => {
    current.color = colourInput.value;
    document.querySelector(
      ".whiteBoard"
    ).style = `cursor:url('../res/dot_large.png'),auto!important;`;
    pencilWidth = 15;
  });

  var drawing = false;

  canvas.addEventListener("mousedown", onMouseDown);
  canvas.addEventListener("mouseup", onMouseUp);
  canvas.addEventListener("mouseout", onMouseUp);
  canvas.addEventListener("mousemove", throttle(onMouseMove, 10));

  //Touch support for mobile devices
  canvas.addEventListener("touchstart", onMouseDown, false);
  canvas.addEventListener("touchend", onMouseUp, false);
  canvas.addEventListener("touchcancel", onMouseUp, false);
  canvas.addEventListener("touchmove", throttle(onMouseMove, 10), false);

  for (var i = 0; i < colors.length; i++) {
    colors[i].addEventListener("click", onColorUpdate, false);
  }

  socket.on("drawing", onDrawingEvent);

  window.addEventListener("resize", onResize, false);
  onResize2();

  function drawLine(x0, y0, x1, y1, color, emit, width) {
    context.beginPath();
    context.moveTo(x0, y0);
    context.lineTo(x1, y1);
    context.strokeStyle = color;
    context.lineWidth = width;
    context.stroke();
    context.closePath();

    if (!emit) {
      return;
    }
    var w = canvas.width;
    var h = canvas.height;

    socket.emit(
      "drawing",
      {
        x0: x0 / w,
        y0: y0 / h,
        x1: x1 / w,
        y1: y1 / h,
        color: color,
      },
      pencilWidth,
      room
    );
  }

  function onMouseDown(e) {
    drawing = true;
    current.x = e.pageX || e.touches[0].pageX;
    current.y = e.pageY + $(".section1").scrollTop() || e.touches[0].pageY;
    console.log(current);
  }

  function onMouseUp(e) {
    if (!drawing) {
      return;
    }
    drawing = false;
    drawLine(
      current.x,
      current.y,
      e.pageX || e.touches[0].pageX,
      e.pageY + $(".section1").scrollTop() || e.touches[0].pageY,
      current.color,
      true,
      pencilWidth
    );
    var canvasContents = canvas.toDataURL();
    var data = { image: canvasContents, date: Date.now() };
    var string = JSON.stringify(data);
    stack.push(string);
    console.log(stack);
  }

  function onMouseMove(e) {
    if (!drawing) {
      return;
    }
    drawLine(
      current.x,
      current.y,
      e.pageX || e.touches[0].pageX,
      e.pageY + $(".section1").scrollTop() || e.touches[0].pageY,
      current.color,
      true,
      pencilWidth
    );
    current.x = e.pageX || e.touches[0].pageX;
    current.y = e.pageY + $(".section1").scrollTop() || e.touches[0].pageY;
  }

  function onColorUpdate(e) {
    current.color = e.target.className.split(" ")[1];
  }

  // limit the number of events per second
  function throttle(callback, delay) {
    var previousCall = new Date().getTime();
    return function () {
      var time = new Date().getTime();

      if (time - previousCall >= delay) {
        previousCall = time;
        callback.apply(null, arguments);
      }
    };
  }

  function onDrawingEvent(data, width) {
    var w = canvas.width;
    var h = canvas.height;
    drawLine(
      data.x0 * w,
      data.y0 * h,
      data.x1 * w,
      data.y1 * h,
      data.color,
      false,
      width
    );
  }

  // make the canvas fill its parent
  function onResize() {
    // canvas.style=`padding-top:100px;`
    let canvas = document.querySelector(".whiteBoard");
    var canvasContents = canvas.toDataURL();
    fl = 1;
    var data = { image: canvasContents, date: Date.now() };

    var image = new Image();
    image.onload = function () {
      context.clearRect(0, 0, canvas.width, canvas.height);
      context.drawImage(image, 0, 0); // draw the new image to the screen
    };
    image.src = data.image;

    canvas.width = window.innerWidth / 2;
    canvas.height = 4 * window.innerHeight;
    console.log(canvas.width, canvas.height);
  }
  function onResize2() {
    canvas.width = window.innerWidth / 2;
    canvas.height = 4 * window.innerHeight;
  }

  //Clear canvas
  document.querySelector(".clear").addEventListener("click", () => {
    var socket = io({transports: ['websocket'], upgrade: false});

    context.clearRect(0, 0, canvas.width, canvas.height);
    socket.emit("clearBoard", room);
  });

  socket.on("boardClear", () => {
    context.clearRect(0, 0, canvas.width, canvas.height);
  });
  // let redoBtn = document.querySelector(".redo");
  // redoBtn.addEventListener("click", redo);
  function redo(e) {
    if (
      e.ctrlKey &&
      e.keyCode == 89 &&
      document.activeElement == document.body
    ) {
      var image = new Image();
      image.onload = function () {
        context.clearRect(0, 0, canvas.width, canvas.height);
        console.log("d");
        context.drawImage(image, 0, 0); // draw the new image to the screen
      };
      context.clearRect(0, 0, canvas.width, canvas.height);
      image.src = JSON.parse(redoStack.peek()).image;
      stack.push(redoStack.peek());
      socket.emit("redo", room);
      redoStack.pop();
    }
  }

  // let undoBtn = document.querySelector(".undo");
  // undoBtn.addEventListener("click", undo);
  function undo(e) {
    if (
      e.ctrlKey &&
      e.keyCode == 90 &&
      document.activeElement == document.body
    ) {
      redoStack.push(stack.peek());
      stack.pop();
      var image = new Image();
      image.onload = function () {
        context.clearRect(0, 0, canvas.width, canvas.height);
        console.log("d");
        context.drawImage(image, 0, 0); // draw the new image to the screen
      };
      context.clearRect(0, 0, canvas.width, canvas.height);
      socket.emit("undo", room);
      image.src = JSON.parse(stack.peek()).image;
    }
  }
  socket.on("undo", () => {
    undo();
  });
  socket.on("redo", () => {
    redo();
  });
  let nextBtn = $(".nextPage");
  let prevBtn = $(".prevPage");
  let no1 = 0;
  let j = 0;
  nextBtn.on("click", nextBtnFn);
  function nextBtnFn(e) {
    e.preventDefault();
    socket.emit("nextBtn", room);
    if (j == Math.max(whiteBoardPages.length, 0)) {
      let canvas = document.querySelector(".whiteBoard");
      var context = canvas.getContext("2d");
      var canvasContents = canvas.toDataURL();
      fl = 1;
      var data = { image: canvasContents, date: Date.now() };
      let date = new Date();
      var string = JSON.stringify(data);
      whiteBoardPages.push({
        whiteboard: string,
        containerForCanvas: document.querySelector(".containerForCanvas")
          .innerHTML,
      });
      console.log(whiteBoardPages);
      context.clearRect(0, 0, canvas.width, canvas.height);
      document.querySelector(".containerForCanvas").innerHTML = "";
      socket.emit("clearBoard", room);
      j++;
    } else {
      let canvas = document.querySelector(".whiteBoard");
      var context = canvas.getContext("2d");
      var canvasContents = canvas.toDataURL();
      fl = 1;
      var data = { image: canvasContents, date: Date.now() };
      let date = new Date();
      var string = JSON.stringify(data);

      whiteBoardPages[j].whiteboard = string;
      whiteBoardPages[j].containerForCanvas = document.querySelector(
        ".containerForCanvas"
      ).innerHTML;
      console.log(whiteBoardPages);
      var image = new Image();
      image.onload = function () {
        context.clearRect(0, 0, canvas.width, canvas.height);
        console.log("d");
        context.drawImage(image, 0, 0); // draw the new image to the screen
      };
      j++;
      console.log(j);
      if (whiteBoardPages[j] == undefined) {
        document.querySelector(".containerForCanvas").innerHTML = ``;
        context.clearRect(0, 0, canvas.width, canvas.height);
      } else {
        image.src = JSON.parse(whiteBoardPages[j].whiteboard).image;
        document.querySelector(".containerForCanvas").innerHTML =
          whiteBoardPages[j].containerForCanvas;
      }
    }
  }

  prevBtn.on("click", prevBtnFn);
  function prevBtnFn(e) {
    e.preventDefault();
    socket.emit("prevBtn", room);
    console.log(whiteBoardPages);
    var canvas = document.querySelector(".whiteBoard");
    var context = canvas.getContext("2d");
    var canvasContents = canvas.toDataURL();
    var data = { image: canvasContents, date: Date.now() };
    let date = new Date();
    var string = JSON.stringify(data);
    console.log(j);
    if (whiteBoardPages[j] == undefined) {
      whiteBoardPages.push({
        whiteboard: string,
        containerForCanvas: document.querySelector(".containerForCanvas")
          .innerHTML,
      });
    } else {
      whiteBoardPages[j].whiteboard = string;
      whiteBoardPages[j].containerForCanvas = document.querySelector(
        ".containerForCanvas"
      ).innerHTML;
    }

    var image = new Image();
    image.onload = function () {
      context.clearRect(0, 0, canvas.width, canvas.height);
      console.log("d");
      context.drawImage(image, 0, 0); // draw the new image to the screen
    };
    j--;
    console.log(j);
    image.src = JSON.parse(whiteBoardPages[j].whiteboard).image;
    document.querySelector(".containerForCanvas").innerHTML =
      whiteBoardPages[j].containerForCanvas;
  }
  socket.on("nextBtn", () => {
    nextBtnFn();
  });
  socket.on("prevBtn", () => {
    prevBtnFn();
  });

  //DON'T REMOVE!
  //   document.querySelector(".retrieve").addEventListener("click", (e) => {
  //     e.preventDefault();
  // db.collection("whiteboard")
  //   .where("roomID", "==", room)
  //   .get()
  //   .then((snapshot) => {
  //     snapshot.docs.forEach((doc) => {
  //       let data_doc = doc.data();
  //       let cdata = data_doc.str;
  //       var data = JSON.parse(cdata);
  //       var image = new Image();
  //       image.onload = function () {
  //         context.clearRect(0, 0, canvas.width, canvas.height);
  //         context.drawImage(image, 0, 0); // draw the new image to the screen
  //       };
  //       image.src = data.image;

  //     });
  //   });
  //   });
  document.addEventListener("keyup", erase, false);
  document.addEventListener("keyup", penLarge, false);
  document.addEventListener("keyup", penMed, false);
  document.addEventListener("keyup", penSm, false);
  document.addEventListener("keyup", undo, false);
  document.addEventListener("keyup", redo, false);
}

function dragWhiteboard(whiteboard) {
  whiteboard.addEventListener("mousedown", (e) => {
    e.preventDefault();
  });
}
function zIndexManage() {
  let containerForCanvas = document.querySelectorAll(".containerForCanvas");
  for (let i = 0; i < containerForCanvas.length; i++) {
    containerForCanvas[i].style = "z-index:-1";
  }
}

function zIndexManageOpposite() {
  let containerForCanvas = document.querySelectorAll(".containerForCanvas");
  for (let i = 0; i < containerForCanvas.length; i++) {
    containerForCanvas[i].style = "z-index:1";
  }
}
