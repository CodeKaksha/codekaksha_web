var canvas = document.querySelector("#exp-canvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
var c = canvas.getContext("2d");
c.beginPath();
c.arc(30, 30, 20, 0, Math.PI * 2, false);
c.stroke();

class Circle {
  constructor(x, y, i) {
    this.x = x;
    this.y = y;
    this.number = i;
  }
  getCoordinates() {
    return { x: this.x, y: this.y, number: this.number };
  }
  draw() {
    c.beginPath();
    c.arc(x, y, 30, 0, Math.PI * 2, false);
    c.stroke();
    c.font = "30px Arial";
    c.fillText(this.number, x - 10, y + 10);
  }
}

let adjArray = [[1, 2, 3], [4, 5,0], [6,0], [7, 8, 9,0], [1], [1], [2],[3],[3],[3]];






let drawn = [];
let x = 500,
  y = 100;
let circle_array = [];
for (let i = 0; i < adjArray.length; i++) drawn[i] = 0;
for (let i = 0; i < adjArray.length; i++) circle_array[i] = 0;
let quickfix = 400;
for (let i = 0; i < adjArray.length; i++) {
  if (!drawn[i]) {
    let circle = new Circle(x, y, i);

    circle.draw();
    circle_array[i] = circle;
    drawn[i] = 1;
  }
  let sizee = adjArray[i].length;
  
  sizee--;
  let p = x;
  for (let j = 0; j < adjArray[i].length; j++) {
    if (!drawn[adjArray[i][j]]) {
      //   if (first) {
      //     first = 0;
      //     quickfix = x - 50;
      //   }
      console.log(circle_array[i].y + 100);
      y = circle_array[i].y + 100;
      console.log(x);
      let circle = new Circle(x, y, adjArray[i][j]);

      circle.draw();
      circle_array[adjArray[i][j]] = circle;

      drawn[adjArray[i][j]] = 1;
    }
    x += 75 * adjArray[adjArray[i][j]].length;
  }
  x = p;
}
