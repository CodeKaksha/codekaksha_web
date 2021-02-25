var canvas = document.querySelector("#exp-canvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
var c = canvas.getContext("2d");
let adjArray = [
  {
    val: 5,
    left_child: 1,
    right_child: 2,
    x: null,
    y: null,
  },
  {
    val: 9,
    left_child: 4,
    right_child: 5,
    x: null,
    y: null,
  },
  {
    val: 10,
    left_child: 3,
    right_child: null,
    x: null,
    y: null,
  },
  {
    val: 3,
    left_child: 6,
    right_child: null,
    x: null,
    y: null,
  },
  {
    val: 7,
    left_child: null,
    right_child: null,
    x: null,
    y: null,
  },
  {
    val: 4,
    left_child: null,
    right_child: null,
    x: null,
    y: null,
  },
  {
    val: 11,
    left_child: 7,
    right_child: null,
    x: null,
    y: null,
  },
  {
    val: 13,
    left_child: null,
    right_child: null,
    x: null,
    y: null,
  },
];
let curX = 100;
let radius = 30;
function drawNode(val, x, y) {
  c.beginPath();
  c.arc(x, y, radius, 0, Math.PI * 2, false);
  c.stroke();
  c.font = "30px Arial";
  c.fillText(val, x - radius / 2 + 5, y + radius / 2 - 5);
}
function drawLine(x1, y1, x2, y2) {
  c.beginPath();
  let hypotenuse = Math.sqrt((x2 - x1) * (x2 - x1) + (y2 - y1) * (y2 - y1));
  let cos = (x2 - x1) / hypotenuse;
  let sin = (y2 - y1) / hypotenuse;
  x1 = x1 + radius * cos;
  y1 = y1 + radius * sin;
  x2 = x2 - radius * cos;
  y2 = y2 - radius * sin;
  c.moveTo(x1, y1);
  c.lineTo(x2, y2);
  c.stroke();
}
function drawTree(tree, depth) {
  tree.x = curX;
  tree.y = depth;
  if (tree.left_child != null) {
    drawTree(adjArray[tree.left_child], depth + 100);
    drawLine(tree.x,tree.y,adjArray[tree.left_child].x,adjArray[tree.left_child].y)
  }
  drawNode(tree.val, curX, depth);
  curX += 100;
  if (tree.right_child != null) {
    drawTree(adjArray[tree.right_child], depth + 100);
    drawLine(tree.x,tree.y,adjArray[tree.right_child].x,adjArray[tree._child].y)
  }
}
drawTree(adjArray[0], 100);
// drawLinesAfterMakingNodes(adjArray[0]);

let adjArray = [
  {
    val: 0,
    x: null,
    y: null,
    children: [1, 2],
  },
  {
    val: 1,
    x: null,
    y: null,
    children: [3, 4, 5],
  },
  {
    val: 2,
    x: null,
    y: null,
    children: [6],
  },
  {
    val: 3,
    x: null,
    y: null,
    children: [],
  },
  {
    val: 4,
    x: null,
    y: null,
    children: [],
  },
  {
    val: 5,
    x: null,
    y: null,
    children: [],
  },
  {
    val: 6,
    x: null,
    y: null,
    children: [7],
  },
  {
    val: 7,
    x: null,
    y: null,
    children: [8],
  },
  {
    val: 8,
    x: null,
    y: null,
    children: [],
  },
];
// let maxDepth = 10;
// let curX = new Array(maxDepth);

// function drawTreeusingPostOrder(tree, depth) {
//   if (curX[depth] == undefined) curX[depth] = 100;
//   tree.x = curX[depth];
//   tree.y = depth;
//   console.log(curX[depth]);
//   drawNode(tree.val, tree.x, tree.y);
//   curX[depth] += 100;
//   for (let i = 0; i < tree.children.length; i++) {
//     drawTreeusingPostOrder(adjArray[tree.children[i]], depth + 100);
//     drawLine(tree.x, tree.y, adjArray[tree.children[i]].x, adjArray[tree.children[i]].y);
//   }
// }
// drawTreeusingPostOrder(adjArray[0], 100);
