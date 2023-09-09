class Renderer {
    constructor() {
	this.ctx = document.getElementById("frame").getContext("2d");
	this.setSize();
	this.size = 15;
	this.offsetX = 0;
	this.offsetY = 0;

	window.onresize = this.setSize.bind(this);
    }

    setSize() {
	    this.width = window.innerWidth;
	    this.height = window.innerHeight;
	    const canvas = document.getElementById("frame");
	    canvas.width = this.width;
	    canvas.height = this.height;
    }

    moveCamera(x, y) {
	    this.offsetX = x;
	    this.offsetY = y;
    }

    resetCamera() {
	    this.offsetX = 0;
	    this.offsetY = 0;
    }

    renderBackground() {
	this.ctx.fillStyle = "white";
	this.ctx.fillRect(0, 0, this.width, this.height);
    }

    renderGrid() {
	    this.ctx.strokeStyle = "grey";
	    const offX = this.offsetX % this.size;
	    const offY = this.offsetY % this.size;
	    for (let y = offY; y < this.height; y += this.size) {
		this.drawLine(0, y, this.width, y);
	    }
	    for (let x = offX; x < this.width; x += this.size) {
		this.drawLine(x, 0, x, this.height);
	    }
    }

    drawLine(x1, y1, x2, y2) {
	this.ctx.beginPath();
	this.ctx.moveTo(x1, y1);
	this.ctx.lineTo(x2, y2);
	this.ctx.stroke();
    }

    drawCells(cells) {
	this.ctx.fillStyle = "black";
	for (let c in cells) {
	    const {x, y} = cells[c];
	    this.ctx.fillRect(x * this.size + this.offsetX, y * this.size + this.offsetY, this.size, this.size);
	}
    }

    render(cells) {
	this.renderBackground();
	this.renderGrid();
	this.drawCells(cells);
    }
}
