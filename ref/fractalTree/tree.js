var canvas = document.querySelector("canvas");
var ctx = canvas.getContext("2d");
ctx.fillStyle = "black";
ctx.fillRect(0,0,canvas.width, canvas.height);
ctx.strokeStyle="white";
ctx.lineWidth=3;

var branches, spreadingAngle, firstLineLenght, iterations, scalingFactor, startPoint;

/*  Time complexity: O(branches^iterations)
	Space complexity: O(iterations)
*/

function degToRad(deg){
	return Math.PI * (deg / 180);
}

function createTree(lineLenght, n_iteration, startPosX, startPosY, inclination){
	var finalPosX = startPosX - lineLenght*Math.cos(degToRad(inclination));
	var finalPosY = startPosY - lineLenght*Math.sin(degToRad(inclination));
	
	ctx.beginPath();
	ctx.moveTo(startPosX, startPosY);
	ctx.lineTo(finalPosX, finalPosY);
	ctx.stroke();
	
	if(n_iteration == iterations)
		return;
	
	var subAngle = spreadingAngle / (branches-1);
	var leftSide = inclination + spreadingAngle / 2.0;
	for(var i = 0; i < branches; i++){
		createTree(lineLenght*scalingFactor, n_iteration+1, finalPosX, finalPosY, leftSide - i*subAngle);
	}
}

function readNewValues(){
	branches = document.getElementById("treeValues")[0].value;
	spreadingAngle = document.getElementById("treeValues")[1].value;
	firstLineLenght = document.getElementById("treeValues")[2].value;
	iterations = document.getElementById("treeValues")[3].value;
	scalingFactor = document.getElementById("treeValues")[4].value;
	startPosition = document.getElementById("positionSelector").value;
	
	if(branches < 2 || branches > 5){
		branches = 2;
		document.getElementById("treeValues")[0].value = 2;
	}
	if(spreadingAngle < 0 || spreadingAngle > 360){
		spreadingAngle = 60;
		document.getElementById("treeValues")[1].value = 60;
	}
	if(firstLineLenght < 1 || firstLineLenght > 300){
		firstLineLenght = 100;
		document.getElementById("treeValues")[2].value = 100;
	}
	if(iterations < 1 || iterations > 10){
		iterations = 7;
		document.getElementById("treeValues")[3].value = 7;
	}
	if(scalingFactor < 0.1 || scalingFactor > 2){
		scalingFactor = 0.8;
		document.getElementById("treeValues")[4].value = 0.8;
	}
}

function clearCanvas(){
	ctx.fillStyle = "black";
	ctx.fillRect(0,0,canvas.width, canvas.height);
}

function newTree(){
	clearCanvas();
	readNewValues();
	
	if(startPosition == "bottom")
		createTree(firstLineLenght, 1, canvas.width / 2, canvas.height, 90);
	else
		createTree(firstLineLenght, 1, canvas.width / 2, Number(canvas.height / 2) + Number(firstLineLenght), 90);
}

window.onload = newTree();

// CHANGE LAYOUT

function loadLayout(_branches, _spreadingAngle, _firstLineLenght, _iterations, _scalingFactor, _startPoint){
	document.getElementById("treeValues")[0].value = _branches;
	document.getElementById("treeValues")[1].value = _spreadingAngle;
	document.getElementById("treeValues")[2].value = _firstLineLenght;
	document.getElementById("treeValues")[3].value = _iterations;
	document.getElementById("treeValues")[4].value = _scalingFactor;
	document.getElementById("positionSelector").value = _startPoint;
}

function changeLayout(){
	layout = document.getElementById("layoutSelector").value;
	console.log(layout);
	if(layout == "layout1")
		loadLayout(2, 60, 100, 7, 0.8, "bottom");
	else if(layout == "layout2")
		loadLayout(2, 0, 2, 10, 1.8, "center");
	else if(layout == "layout3")
		loadLayout(2, 180, 280, 10, 0.7, "center");
	else if(layout == "layout4")
		loadLayout(4, 360, 160, 6, 0.8, "center");
	newTree();
}

// MOVE ANIMATION

var intervalId = 5;
var over = false;

function goUp(startX, startY){
	if(spreadingAngle < 360){
		spreadingAngle++;
		document.getElementById("treeValues")[1].value = spreadingAngle;
		clearCanvas();
		createTree(firstLineLenght, 1, startX, startY, 90);
	}
	else{
		over = true;
		move();
		document.getElementById("moveButton").textContent = "Move!";
	}
}

function move(){
	if(document.getElementById("moveButton").textContent == "Move!" && !over){
		document.getElementById("moveButton").textContent = "Stop!";
		readNewValues();
		var startX = canvas.width / 2;
		var startY;
		if(startPosition == "bottom")
			startY = canvas.height;
		else
			 startY = Number(canvas.height / 2) + Number(firstLineLenght);
	
		var tmp = spreadingAngle;
		intervalId = setInterval(goUp, 50, startX, startY);
	}
	else{
		clearInterval(intervalId);
		document.getElementById("moveButton").textContent = "Move!";
		over=false;
	}
}














