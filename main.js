const FPS = 60;

const frame = document.getElementById("frame");
const slider = document.getElementById("slider");

frame.addEventListener('mousedown', handleMousedown, true);
frame.addEventListener('mousemove', handleMove, true);
frame.addEventListener('mouseup', handleMouseup, true);
frame.addEventListener('wheel', handleZoom, true);

let cells = {};

const renderer = new Renderer();
const renderInterval = setInterval(() => renderer.render(cells), 1000/FPS);

loadPattern(patterns[0][1]);

const setSpeed = () => {
    stop();
    start();
}

let interval = undefined;
const start = () => {
    interval = setInterval(() => {
	cells = recalculateCells(cells);
    }, 1000 / slider.value);
}

const stop = () => {
    clearInterval(interval);
}

const clearCells = () => {
    cells = {};
}

const recalculateCells = (cells) => {
    const newCells = {};
    for (const c in cells) {
	const {x, y} = cells[c];
	const keys = [
	    x + ":" + (y + 1),
	    x + ":" + (y - 1),
	    (x + 1) + ":" + (y + 1),
	    (x + 1) + ":" + (y - 1),
	    (x + 1) + ":" + y,
	    (x - 1) + ":" + (y + 1),
	    (x - 1) + ":" + (y - 1),
	    (x - 1) + ":" + y,
	]

	for (let key of keys) {
	    newCells[key] = (newCells[key] || 0) + 1;
	}
    }
    let newnewCells = {};
    for (const c in newCells) {
	if (newCells[c] === 3 || (newCells[c] === 2 && cells[c] != undefined)) {
	    [x1, y1] = c.split(":");
	    newnewCells[c] = {x: parseInt(x1), y: parseInt(y1)};
	}
    }
    return newnewCells;
}
