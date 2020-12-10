function whiteBoard(room) {
  var canvas = document.querySelector(".whiteBoard");
  var colors = document.getElementsByClassName("color");
  var context = canvas.getContext("2d");

  var current = {
    color: "black",
  };
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
  onResize();

  function drawLine(x0, y0, x1, y1, color, emit) {
    context.beginPath();
    context.moveTo(x0, y0);
    context.lineTo(x1, y1);
    console.log();
    context.strokeStyle = color;
    context.lineWidth = 2;
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
      room
    );
  }

  function onMouseDown(e) {
    drawing = true;
    current.x = e.clientX || e.touches[0].clientX;
    current.y = e.clientY || e.touches[0].clientY;
  }

  function onMouseUp(e) {
    if (!drawing) {
      return;
    }
    drawing = false;
    drawLine(
      current.x,
      current.y,
      e.clientX || e.touches[0].clientX,
      e.clientY || e.touches[0].clientY,
      current.color,
      true
    );
  }

  function onMouseMove(e) {
    if (!drawing) {
      return;
    }
    drawLine(
      current.x,
      current.y,
      e.clientX || e.touches[0].clientX,
      e.clientY || e.touches[0].clientY,
      current.color,
      true
    );
    current.x = e.clientX || e.touches[0].clientX;
    current.y = e.clientY || e.touches[0].clientY;
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

  function onDrawingEvent(data) {
    var w = canvas.width;
    var h = canvas.height;
    drawLine(data.x0 * w, data.y0 * h, data.x1 * w, data.y1 * h, data.color);
  }

  // make the canvas fill its parent
  function onResize() {
    // canvas.style=`padding-top:100px;`
    canvas.width = window.innerWidth / 2;
    canvas.height = window.innerHeight;
  }
  document.querySelector(".save").addEventListener("click", (e) => {
    e.preventDefault();
    var canvasContents = canvas.toDataURL();
    var data = { image: canvasContents, date: Date.now() };
    var string = JSON.stringify(data);
    console.log(string);
    db.collection("whiteboard").add({
      str: string,
    });
  });

  document.querySelector(".retrieve").addEventListener("click", (e) => {
    e.preventDefault();
    db.collection("whiteboard")
      .where("str", "!=", "")
      .get()
      .then((snapshot) => {
        snapshot.docs.forEach((doc) => {
          let data_doc = doc.data();
          let cdata = data_doc.str;
          var data = JSON.parse(cdata);
          var image = new Image();
          image.onload = function () {
            context.clearRect(0, 0, canvas.width, canvas.height);
            context.drawImage(image, 0, 0); // draw the new image to the screen
          };
		      image.src = data.image;
		 
        });
      });
  });
}
