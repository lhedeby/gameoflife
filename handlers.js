let x, y;
let oldX, oldY;
let drag = false;

const handleMousedown = (e) => {
    x = e.clientX;
    y = e.clientY;
}

let handleClick = (e) => {
    const rect = e.target.getBoundingClientRect();
    const x = Math.floor((e.clientX - rect.left) / 20);
    const y = Math.floor((e.clientY - rect.top) / 20);
    const key = x + ":" + y;

    if (cells[key]) {
	delete cells[key];
    } else {
	cells[key] = {x: x, y: y};
    }
    renderer.render(cells);
}

const handleMouseup = (e) => {
    if (drag == true) {
	drag = false;
	x = undefined;
	y = undefined;
    } else {
	const rect = e.target.getBoundingClientRect();
	const tx = Math.floor((e.clientX - rect.left - renderer.offsetX) / renderer.size);
	const ty = Math.floor((e.clientY - rect.top  - renderer.offsetY) / renderer.size);
	const key = tx + ":" + ty;

	if (cells[key]) {
	    delete cells[key];
	} else {
	    cells[key] = {x: tx, y: ty};
	}
	x = undefined;
	y = undefined;
    }
}

const handleMove = (e) => {
    const dx = x - e.clientX;
    const dy = y - e.clientY;

    if (drag == true) {
	renderer.moveCamera(oldX - dx, oldY - dy);
    } else if (Math.abs(dx) > 5 || Math.abs(dy) > 5) {
	drag = true;
	oldX = renderer.offsetX;
	oldY = renderer.offsetY;
    }
}

const handleZoom = (e) => {
    renderer.size -= e.deltaY * 0.001;
    if (renderer.size < 2) renderer.size = 2;
    if (renderer.size > 40) renderer.size = 40;
}
