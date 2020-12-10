let rect = document.querySelector('.rectangle');
let array = document.querySelector('.array');
let grid = document.querySelector('.grid');
let circle = document.querySelector('.circle');
let graph = document.querySelector('.graph');
let inp_graph = document.querySelector('#graph');
let array_num = document.querySelector('#array_num');
let j = 0;
let k = 0;
rect.addEventListener('click', (e) => {
	var canvas = document.createElement('canvas');
	canvas.id = `${j}header`;
	canvas.className = 'canvas_abs';
	canvas.style = 'border:1px solid #000000;';
	canvas.style.width = `40px`;
	canvas.style.height = `40px`;

	document.body.appendChild(canvas);
	dragElement(canvas);
	j++;
});

array.addEventListener('click', (e) => {
	let num_array = array_num.value;
	if (num_array) {
		let canvas_array = document.createElement('div');
		for (let i = 0; i < num_array; i++) {
			let div = document.createElement('div');
			div.className = 'canvas';
			var canvas = document.createElement('canvas');
			canvas.id = `${k}array`;
			k++;
			canvas.style = 'border:1px solid #000000;';
			canvas.style.height = `40px`;
			canvas.style.width = `40px`;
			let inp = document.createElement('input');
			inp.type = 'number';
			inp.value = Math.floor(Math.random() * 100);
			div.appendChild(canvas);
			div.appendChild(inp);
			canvas_array.appendChild(div);
		}
		canvas_array.className = 'canvas_array';
		document.body.appendChild(canvas_array);
		dragElement(canvas_array);
	} else {
		alert('BHai kuch value to daal');
	}
});

grid.addEventListener('click', (e) => {
	let num_col = document.querySelector('#grid_col').value;
	let num_rows = document.querySelector('#grid_rows').value;
	if (num_col && num_rows) {
		let div2 = document.createElement('div');
		div2.className = 'grid_div';
		for (let i = 0; i < num_col; i++) {
			let canvas_array = document.createElement('div');
			for (let i = 0; i < num_rows; i++) {
				let div = document.createElement('div');
				div.className = 'canvas';
				var canvas = document.createElement('canvas');
				canvas.id = `${k}array`;
				k++;
				let inp = document.createElement('input');
				inp.type = 'number';
				inp.value = Math.floor(Math.random() * 100);
				canvas.style = 'border:1px solid #000000;';
				canvas.style.height = `40px`;
				canvas.style.width = `40px`;
				div.appendChild(canvas);
				div.appendChild(inp);
				canvas_array.appendChild(div);
			}
			canvas_array.className = 'canvas_grid_array';
			div2.appendChild(canvas_array);
		}
		document.body.appendChild(div2);
		dragElement(div2);
	} else {
		alert('mazaak chal rha h kya yahan');
	}
	e.preventDefault();
});

circle.addEventListener('click', (e) => {
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
		e.preventDefault();
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
		elmnt.style.top = elmnt.offsetTop - pos2 + 'px';
		elmnt.style.left = elmnt.offsetLeft - pos1 + 'px';
	}

	function closeDragElement() {
		// stop moving when mouse button is released:
		document.onmouseup = null;
		document.onmousemove = null;
	}
}
graph.addEventListener('click', (e) => {
	let inp = inp_graph.value;
	console.log(inp.split('\n'));
	let big_arr = inp.split('\n');
	for (let i = 0; i < big_arr.length; i++) {
		let sm_arr = big_arr[i].split(' ');
		let n1 = sm_arr[0];
		let n2 = sm_arr[1];
		let w = sm_arr[2];
		let c1 = document.createElement('canvas');
		let c2 = document.createElement('canvas');

		c1.style = 'border:1px solid #000000;';
		c1.style.height = `40px`;
		c1.style.width = `40px`;
		c1.className = 'node';

		let inp1 = document.createElement('input');
		inp1.type = 'number';
		inp1.value = n1;
		
		let inp2 = document.createElement('input');
		inp2.type = 'number';
		inp2.value = n2;

		vis.add(n1);
		vis.add(n2);

		c2.style = 'border:1px solid #000000;';
		c2.style.height = `40px`;
		c2.style.width = `40px`;
		c2.className = 'node';
		dragElement(c1);
		dragElement(c2);
		let div = document.createElement('div');
		div.appendChild(c1);
		document.body.appendChild(div);
	}
});


