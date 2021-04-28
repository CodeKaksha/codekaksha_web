var canvas = document.querySelector(".whiteBoard");
var c = canvas.getContext("2d");
document.querySelector('#recursion_val').addEventListener('submit', (e)=>{
    // drawNode(0,0,0);
    e.preventDefault();
    var editor2 = ace.edit("jsEditor2");
    let variables=[];
    let code=editor2.getValue();
    for(let i=0;i<editor2.getValue().length;i++){
        if(code[i]=='f'&&code[i+1]=='n')
        {
            for(let j=i+3;code[j]!=')'&&j<code.length;j++){
                if(code[j]!=','){
                    variables.push(
                        {
                            name:code[j],
                            value:"0"
                        }
                    );
                }
            }   
            break;
        }
    }
    let codeCall= document.querySelector(".codeCall").value;
    let kk=0;
    for(let i=0;i<codeCall.length;i++){
        if(codeCall[i]=='f'&&codeCall[i+1]=='n')
        {
            for(let j=i+3;codeCall[j]!=')'&&j<codeCall.length;j++){
                if(codeCall[j]!=','){
                    variables[kk].value=codeCall[j];
                }
            }   
            break;
        }
    }
    let lll;
    for(let i=0;i<code.length;i++){
        if(code[i]=='}')
        {
            lll=i;
            break;
        }
    }
    for(let i=0;i<code.length;i++){
        if(code[i]=='{'){
            code=code.substring(i+1,lll-1);
            break;
        }
    }
    // console.log(code)
    let fnData={
        body:code,
        params:variables,
        variables:[]

    };
    // console.log(fnData);

    let arr=getTree(fnData,0);
    const { rawCoords, rawBottomRight } = getCoords(arr.adjList)
    console.log(rawCoords)
    let i=0;
    for (const [key, value] of Object.entries(rawCoords)) {
        console.log(`${key}: ${value}`);
        drawNode(arr.args[i],100+value[0]*70,100+value[1]*70)
        i++;
    }
    let rawCoords2=[];
    for (const [key, value] of Object.entries(rawCoords)) {
        rawCoords2.push(value);
    }
    console.log(arr);
    // Object.entries(rawCoords).forEach(([key,value])=>{
    //     console.log(key)
    // })
    // let link="https://chart.googleapis.com/chart?cht=gv&chl=graph{"
    i=0;
    Object.entries(arr.adjList).forEach(([key, value]) => {
        for(let j=0;j<value.length;j++){
            let p=value[j].v;
            drawLine(100+rawCoords[i][0]*70,100+rawCoords[i][1]*70,100+rawCoords[p][0]*70,100+rawCoords[p][1]*70)
            // link+=`${i}--${value[j].v}[label="${value[j].w}"];`

        }
        i++;
        console.log(key, value);
    });
    // for(let i=0;i<arr.adjList.length;i++){
    //     for(let j=0;j<arr.adjList[i].length;j++){
    //         link+=`${arr.args[i]}--${arr.args[arr.adjList[i][j].v]}[label="${arr.adjList[i][j].w}"];`

    //     }
    // }
    // link+="}";
    // console.log(link)
    // console.log(arr);
})
var MAX_V = 222;

function getTree(fnData, memorize) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    var fn, _;  
    // console.log(parseFunction(fnData));
    var userFn = eval(parseFunction(fnData))
    // console.log(userFn);    
    var self = this;
    var v = 0; // current vertex id
    var args = {};
    var adjList = {}; // u -w-> v, where w is the result of fn(...args[v])
    var recursionStack = []; // the current top is parent of current vertex
    var memo = {}; // { allArgs as string, result }
    var memoVertices = []; // vértices que foram obtidos da memória
    // wrapper para a fn, a qual é chamada pela função do usuário
    function fnWrapper() {
        var allArgs = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            allArgs[_i] = arguments[_i];
        }
        if (v > MAX_V)
            throw new Error('Too many recursive calls');
        // console.trace();
        args[v] = allArgs;
        adjList[v] = [];
        var adj = { v: v };
        if (recursionStack.length > 0) {
            var u = recursionStack[recursionStack.length - 1];
            adjList[u].push(adj);
        }
        recursionStack.push(v);
        v++;
        if (memorize && memo[JSON.stringify(allArgs)] !== undefined) {
            adj.w = memo[JSON.stringify(allArgs)];
            recursionStack.pop();
            memoVertices.push(adj.v);
            return adj.w;
        }
        var res = userFn.apply(self, allArgs); // userFn call fn, and fn = fnWrapper
        memo[JSON.stringify(allArgs)] = res;
        // console.log(res);
        adj.w = res;
        recursionStack.pop();
        return res;
    }
    fn = fnWrapper; // here's the biggest trick
    var result = NaN;
    // eslint-disable-next-line
    var paramsValues = fnData.params.map(function (param) { return eval(param.value); });
    if (paramsValues.length > 0)
        result = fn.apply(void 0, paramsValues);
    return { adjList: adjList, args: args, result: result, memoVertices: memoVertices };
}


var parseFunction = function (fnData) {
    var _a;
    var vars = (_a = fnData.variables) === null || _a === void 0 ? void 0 : _a.map(function (param) { return param.name + " = " + param.value; }).join(', ');
    var varsDeclaration = (vars && "var " + vars + ";") || '';
    var paramsNames = fnData.params.map(function (param) { return param.name; }).join(', ');
    console.log(paramsNames)
    var fnDeclaration = "_ = function (" + paramsNames + ") {\n    " + varsDeclaration + "\n    " + fnData.body + "\n  }";
    return fnDeclaration;
};

let radius=20;
function drawNode(val, x, y) {
    c.beginPath();
    c.arc(x, y, 20, 0, Math.PI * 2, false);
    c.stroke();
    c.font = "30px Arial";
    c.fillText(val, x - 20 / 2 + 5, y + 20 / 2 - 5);
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
