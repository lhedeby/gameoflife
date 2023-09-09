const patterns = [
    ["Glider gun", "24bo11b$22bobo11b$12b2o6b2o12b2o$11bo3bo4b2o12b2o$2o8bo5bo3b2o14b$2o8bo3bob2o4bobo11b$10bo5bo7bo11b$11bo3bo20b$12b2o!"],
    ["Glider", "bo$2bo$3o!"],
    ["Switch engine", "bobo2b$o5b$bo2bob$3b3o!"],
    ["Shick engine", "bo2bo$o$o3bo$4o9b2o$6b3o5b2o$6b2ob2o6b3o$6b3o5b2o$4o9b2o$o3bo$o$bo2bo!"]
]

const createPattern = () => {
    const pattern = document.getElementById("patterns").value;
    loadPattern(pattern);
}

const addPaterns = () => {
    patterns.forEach(x => {
	option = document.createElement("option");
	text = document.createTextNode(x[0]);
	att = document.createAttribute("value");
	att.value = x[1];
	option.setAttributeNode(att);
	option.appendChild(text);
	document.getElementById("patterns").appendChild(option);
    })
}

addPaterns();

const loadPattern = (pattern) => {
    renderer.moveCamera(100, 100);
    cells = {};
    let y = 0;
    let x = 0;
    let number = "";
    for (c of pattern) {
	if (c == "b") {
	    const count = parseInt(number || 1);
	    x += count;
	    number = "";
	} else if (c == "o") {
	    const count = parseInt(number || 1);
	    for (let i = 0; i < count; i++) {
		cells[x + ":" + y] = {x: x, y: y};
		x++;
	    }
	    number = "";
	} else if (c == "$") {
	    y++;
	    x = 0;
	    number = "";
	} else {
	    number += c;
	}
    }
}
