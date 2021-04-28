
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
