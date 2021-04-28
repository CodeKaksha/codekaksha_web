var canvas = document.querySelector("#exp-canvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
var c = canvas.getContext("2d");
// class Node{
//   constructor(val,children,parent,x,y,mod){
//     this.val=val;
//     this.children=children;
//     this.x=x;
//     this.y=y;
//     this.mod=mod;
//   }
// }

let adjArray = [
  {
    val: 1,
    children: [1, 2, 3],
    x: null,
    y: null,
  },
  {
    val: 2,
    children: [4, 5],
    x: null,
    y: null,
  },
  {
    val: 3,
    children: [6, 7],
    x: null,
    y: null,
  },
  {
    val: 4,
    children: [8],
    x: null,
    y: null,
  },
  {
    val: 5,
    children: [9, 10, 11],
    x: null,
    y: null,
  },
  {
    val: 6,
    children: [],
    x: null,
    y: null,
  },
  {
    val: 7,
    children: [],
    x: null,
    y: null,
  },
  {
    val: 8,
    children: [],
    x: null,
    y: null,
  },
  {
    val: 9,
    children: [],
    x: null,
    y: null,
  },
  {
    val: 10,
    children: [],
    x: null,
    y: null,
  },
  {
    val: 11,
    children: [],
    x: null,
    y: null,
  },
  {
    val: 12,
    children: [],
    x: null,
    y: null,
  },
];
// // let curX = 100;
let radius = 30;
let arr2 = [] ;
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
let maxDepth = 10;
let curX = new Array(maxDepth);
function drawTreeusingPreOrder(node, parent, depth) {
  if (curX[depth] == undefined) curX[depth] = 100;
  node.x = curX[depth];
  node.y = depth;
  // drawNode(node.val, node.x, node.y);
  curX[depth] += 100;
  for (let i = 0; i < node.children.length; i++) {
    drawTreeusingPreOrder(adjArray[node.children[i]], node, depth + 100);
    // drawLine(node.x, node.y, adjArray[node.children[i]].x, adjArray[node.children[i]].y);
  }
}
// drawTreeusingPostOrder(adjArray[0], null, 100);
// for (let i = adjArray.length - 1; i >= 0; i--) {
//   if (adjArray[i].children.length) {
//     // console.log(adjArray[i].children);
//     adjArray[i].x =
//       (adjArray[adjArray[i].children[0]].x +
//         adjArray[adjArray[i].children[adjArray[i].children.length - 1]].x) /
//       2;
//       let parent,st;
//       for(let j=0; j<adjArray.length; j++){
//         for(let k=0; k<adjArray[j].children.length;k++){
//           // console.log(adjArray[j].children[k])
//           // console.log(i)
//           if(adjArray[j].children[k]==i)
//           {
//             parent=j;
//             j=adjArray[j].length;
//             st=k;
//             break;
//           }
//         }
//       }
//       // console.log(parent)
//       if(parent!=undefined){
//         // console.log(st)
//         for(let j=st+1;j<adjArray[parent].children.length;j++){
//           console.log(j,st);
//           adjArray[adjArray[parent].children[j]].x=adjArray[adjArray[parent].children[j-1]].x+100;
//           console.log(adjArray[parent].children[j])
//         }
//       }

//   }
// }

function drawTree(node, parent, depth) {
  adjArray[node].children.forEach((child) => {
    drawTree(child, node, depth + 100);
  });
  adjArray[node].y = depth;
  if (parent != null) {
    // console.log(adjArray[adjArray[parent].children[0]])
    if (adjArray[adjArray[parent].children[0]] != adjArray[node]) {
      let sibbling = adjArray[parent].children;
      let prevSibbling;
      let last = false;
      for (let i = 0; i < sibbling.length; i++) {
        if (sibbling[i] == node) {
          if (i == sibbling.length - 1) {
            last = true;
          }
          prevSibbling = sibbling[i - 1];
        }
      }
      // console.log(prevSibbling)
      adjArray[node].x = adjArray[prevSibbling].x + 100;
      if (last) {
        // console.log(parent)
        // console.log((adjArray[node].x+adjArray[sibbling[0]].x)/2)a
        arr2.push([parent, (adjArray[node].x + adjArray[sibbling[0]].x) / 2]);
        // adjArray[parent].x=(adjArray[node].x+adjArray[sibbling[0]].x)/2
      }
    } else {
      adjArray[node].x = 100;
    }
  } else {
    adjArray[node].x = 100;
  }
}

// for(let i=0;i<arr2.length;i++){
//   // console.log(arr2[i])
//   adjArray[arr2[i][0]].x=arr2[i][1];
// }
function drawFullTree() {
  for (let i = 0; i < adjArray.length; i++) {
    drawNode(i, adjArray[i].x, adjArray[i].y);
  }
}
function drawLinesAfterMakingNodes() {
  for (let i = 0; i < adjArray.length; i++) {
    for (let j = 0; j < adjArray[i].children.length; j++) {
      drawLine(
        adjArray[i].x,
        adjArray[i].y,
        adjArray[adjArray[i].children[j]].x,
        adjArray[adjArray[i].children[j]].y
      );
    }
  }
}
// drawTree(0,null, 100);
// drawTreeusingPreOrder(adjArray[0],null,100)
for(let i=adjArray.length-1;i>=0;i--)
{
  adjustTree(i);

}
// drawFullTree()
// drawLinesAfterMakingNodes()
function isLeftMost(node){
  return true;
}
function adjustTree(node){
  if(adjArray[node].children.length)
  {
    if(isLeftMost(node)){
      adjArray[node].x=(adjArray[adjArray[node].children[0]].x+adjArray[adjArray[node].children[adjArray[node].children.length-1]].x)/2;
    }
    else{

    }
  }
}
// console.log(adjArray);
// drawFullTree();
// drawLinesAfterMakingNodes();

// let adjArray = [
//   {
//     val: 0,
//     x: null,
//     y: null,
//     children: [1, 2],
//   },
//   {
//     val: 1,
//     x: null,
//     y: null,
//     children: [3, 4, 5],
//   },
//   {
//     val: 2,
//     x: null,
//     y: null,
//     children: [6],
//   },
//   {
//     val: 3,
//     x: null,
//     y: null,
//     children: [],
//   },
//   {
//     val: 4,
//     x: null,
//     y: null,
//     children: [],
//   },
//   {
//     val: 5,
//     x: null,
//     y: null,
//     children: [],
//   },
//   {
//     val: 6,
//     x: null,
//     y: null,
//     children: [7],
//   },
//   {
//     val: 7,
//     x: null,
//     y: null,
//     children: [8],
//   },
//   {
//     val: 8,
//     x: null,
//     y: null,
//     children: [],
//   },
// ];
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

// class TreeNode {
//   constructor(val, x, y, children,mod) {
//     this.val = val;
//     this.x = x;
//     this.y = y;
//     this.children = children;
//     this.mod=mod;
//   }
//   isLeftMost() {}
//   getPreviousSibbling() {}
// }

// class DrawTree{
//     constructor(tree, parent, depth, number){
      
//       this.x = -1
//       this.y = depth
//       this.tree = tree
//       // Ye abhi karna h
//       this.parent = parent
//       this.thread = null
//       this.offset = 0
//       this.ancestor = self
//       this.change = 0
//       this.shift = 0
//       this._lmost_sibling = null
//       //this is the number of the node in its group of siblings 1..n
//       this.number = number
//     }

//     left_brother(self){

//       n = null
//       if (self.parent!=null){

//         for(var node in self.parent.children){
          
//           if (node == self){
//             return n
//           }
//           else{
//             n = node
//           }            
//         }
//       }
//       return n
//     }

//     get_lmost_sibling(self){

//       if (self._lmost_sibling==null && self.parent!=null && self !=self.parent.children[0]){
//         self._lmost_sibling = self.parent.children[0]
//       }
//       return self._lmost_sibling
//     }
//     leftmost_sibling = get_lmost_sibling
// }
// function buchheim(tree){
  
//   let dt = firstwalk(tree)
//   second_walk(dt)
//   return dt
// }

// function firstwalk(v, distance=1){
  
//   if (v.children.length == 0){
    
//     if (v.leftmost_sibling!=null){
//       v.x = v.left_brother().x + distance
//     }
//     else{
//       v.x = 0.
//     }
//   }
//   else{

//     let default_ancestor = v.children[0]
//     v.children.forEach(w=>{
//       firstwalk(w)
//       default_ancestor = apportion(w, default_ancestor,distance)
//     })
//     execute_shifts(v)

//     let midpoint = (v.children[0].x + v.children[v.children.length-1].x) / 2

//     let ell = v.children[0]
//     let arr = v.children[v.children.length-1]
//     let w = v.left_brother()
//     if (w!=null){
//       v.x = w.x + distance
//       v.mod = v.x - midpoint
//     }
//     else{
//       v.x = midpoint
//     }
//   }
//   return v
// }

// function apportion(v, default_ancestor, distance){

//   let w = v.left_brother()
//   if (w !=null){

//     //in buchheim notation:
//     //i == inner; o == outer; r == right; l == left;
//     let vir = v
//     let vor=v
//     let vil = w
//     let vol = v.leftmost_sibling
//     let sir = v.mod
//     let sor = v.mod
//     let sil = vil.mod
//     let sol = vol.mod
//     while (vil.right() &&vir.left()){
//       vil = vil.right()
//       vir = vir.left()
//       vol = vol.left()
//       vor = vor.right()
//       vor.ancestor = v
//       shift = (vil.x + sil) - (vir.x + sir) + distance
//       if (shift > 0){
//         a = ancestor(vil, v, default_ancestor)
//         move_subtree(a, v, shift)
//         sir = sir + shift
//         sor = sor + shift
//       }
//       sil += vil.mod
//       sir += vir.mod
//       sol += vol.mod
//       sor += vor.mod
//     }
//     if (vil.right() && !vor.right()){
//       vor.thread = vil.right()
//       vor.mod += sil - sor
//     }
//     else{
      
//       if (vir.left() && !vol.left()){
//         vol.thread = vir.left()
//         vol.mod += sir - sol
//       }
//       default_ancestor = v
//     }
//   }
//   return default_ancestor
// }

// function move_subtree(wl, wr, shift){
//   let subtrees = wr.number - wl.number
//   wr.change -= shift / subtrees
//   wr.shift += shift
//   wl.change += shift / subtrees
//   wr.x += shift
//   wr.mod += shift
// }

// function execute_shifts(v){

//   shift = change = 0
//   v.children.foreach(w=>{
//     w.x += shift
//     w.mod += shift
//     change += w.change
//     shift += w.shift + change
//   }) 
// }

// function ancestor(vil, v, default_ancestor){
//   if (vil.ancestor in v.parent.children){
//     return vil.ancestor
//   }
//   else{
//     return default_ancestor
//   }
// }

// function second_walk(v, m=0, depth=0){

//   v.x += m
//   v.y = depth

//   v.children.forEach(w=>{
//     second_walk(w, m + v.mod, depth+1, min)
//   })
// }

const { rawCoords, rawBottomRight } = getCoords(adjArray)
    console.log(rawCoords)
    for(let i=0;i<rawCoords.length;i++){
        console.log(arr.args[i])
        drawNode(adjArray[i].val,rawCoords[i][0],rawCoords[i][1])
    }

function getCoords(adjList, rootId) {
  if (rootId === void 0) { rootId = 0; }
  var rawCoords = {}; // rawCoords[u]: coordenada do vértice u
  var rawTopLeft = [0, 0];
  var rawBottomRight = [0, 0];
  if (Object.keys(adjList).length > 0) {
      var root = {
          id: rootId,
          parent: null,
          children: [],
          x: 0,
          y: 0,
          mod: 0,
          thread: undefined,
      };
      initNodes(root); // constroi o objeto root a partir da adjList
      firstTraversal(root); // post-order traversal
      lastTraversal(root); // pre-order traversal
  }
  console.log(rawCoords, rawTopLeft, rawBottomRight);
  return { rawCoords: rawCoords, rawTopLeft: rawTopLeft, rawBottomRight: rawBottomRight };
  function initNodes(node, nodeId, nodeDepth) {
      if (nodeId === void 0) { nodeId = rootId; }
      if (nodeDepth === void 0) { nodeDepth = 0; }
      if (adjList[nodeId] === undefined)
          return;
      // for each child of node
      for (var _i = 0, _a = adjList[nodeId]; _i < _a.length; _i++) {
          var childId = _a[_i].v;
          var child = {
              id: childId,
              parent: node,
              x: 0,
              y: nodeDepth + 1,
              mod: 0,
              children: [],
          };
          node.children.push(child);
          initNodes(child, childId, nodeDepth + 1);
      }
  }
  function firstTraversal(node) {
      if (node.children.length === 0)
          return node;
      if (node.children.length === 1) {
          node.x = firstTraversal(node.children[0]).x;
          return node;
      }
      // para cada par de sub-árvores filhas leftChild e rightChild
      var _a = node.children, firstChild = _a[0], children = _a.slice(1);
      var leftChild = firstTraversal(firstChild);
      for (var _i = 0, children_1 = children; _i < children_1.length; _i++) {
          var child = children_1[_i];
          var rightChild = firstTraversal(child);
          // post-order traversal below
          shiftRightSubtree(leftChild, rightChild);
          leftChild = rightChild;
      }
      node.x = centralX(node.children);
      return node;
  }
  // desloca toda a sub-árvore enraizada por right para o mais próximo possível da sub-árvore enraizada por left de forma que não haja nenhum conflito
  function shiftRightSubtree(left, right) {
      var _a;
      var _b = contour(left, right), li = _b.li, ri = _b.ri, lo = _b.lo, ro = _b.ro, diff = _b.diff, leftOffset = _b.leftOffset, rightOffset = _b.rightOffset;
      // desloca right
      right.x += diff;
      right.mod += diff;
      if (right.children.length > 0)
          rightOffset += diff;
      // se as subárvores left e right tem alturas diferentes
      if (ri && !li) {
          lo.thread = ri; // define a thread lo -> ri
          lo.mod = rightOffset - leftOffset;
      }
      else if (li && !ri) {
          ro.thread = li; // define a thread ro -> li
          ro.mod = leftOffset - rightOffset;
          ro.mod += ((_a = li.parent) === null || _a === void 0 ? void 0 : _a.mod) || 0; // preserva o mod que li tinha de seu pai para o agora mod de ro
      }
  }
  // retorna os contornos das sub-árvores left e tree
  function contour(left, right, leftOuter, rightOuter, maxDiff, leftOffset, rightOffset) {
      if (leftOffset === void 0) { leftOffset = 0; }
      if (rightOffset === void 0) { rightOffset = 0; }
      var currDiff = left.x + leftOffset - (right.x + rightOffset) + 1;
      maxDiff = Math.max(maxDiff || currDiff, currDiff);
      var li = nextRight(left); // left inner
      var ri = nextLeft(right); // right inner
      var lo = nextLeft(leftOuter || left); // left outer
      var ro = nextRight(rightOuter || right); // right outer
      if (li && ri) {
          leftOffset += left.mod;
          rightOffset += right.mod;
          return contour(li, ri, lo, ro, maxDiff, leftOffset, rightOffset);
      }
      lo = leftOuter || left;
      ro = rightOuter || right;
      return { li: li, ri: ri, lo: lo, ro: ro, diff: maxDiff, leftOffset: leftOffset, rightOffset: rightOffset };
  }
  // atualiza o x real dos nós
  function lastTraversal(node, accMod) {
      if (accMod === void 0) { accMod = 0; }
      // console.log(node.id, node.x, node.mod)
      node.x += accMod;
      // console.log(`${node.id}: [${node.x}, ${node.y}]`)
      rawCoords[node.id] = [node.x, node.y];
      rawBottomRight[0] = Math.max(rawBottomRight[0], node.x);
      rawBottomRight[1] = Math.max(rawBottomRight[1], node.y);
      for (var _i = 0, _a = node.children; _i < _a.length; _i++) {
          var child = _a[_i];
          lastTraversal(child, accMod + node.mod);
      }
  }
}

// retorna o próximo nó depois de node no contorno
function nextRight(node) {
  return node.thread || node.children[node.children.length - 1] || null;
}
function nextLeft(node) {
  return node.thread || node.children[0] || null;
}
// retorna o x central de nodes
function centralX(nodes) {
  var length = nodes.length;
  return length % 2 === 0
      ? (nodes[0].x + nodes[length - 1].x) / 2
      : nodes[(length - 1) / 2].x;
}
