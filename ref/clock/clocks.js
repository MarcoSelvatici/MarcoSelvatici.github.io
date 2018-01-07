class coordinates{
	constructor( _x, _y){
		this.x = _x;
		this.y = _y;
	}
}

class hand{
	constructor(_length, _color, _period, _lineWidth){
		this.length = _length;
		this.color = _color;
		this.period = _period;
		this.lineWidth = _lineWidth;
	}
	
	draw(time, ctx, center){
		var angle = (2*Math.PI) * time / this.period;
		var finalPos = new coordinates();
		finalPos.x = center.x + this.length * Math.cos((Math.PI / 2) - angle);
		finalPos.y = center.y - this.length * Math.sin((Math.PI / 2) - angle);
		
		ctx.lineWidth = this.lineWidth;
		ctx.strokeStyle = this.color;
		ctx.beginPath();
		ctx.moveTo(center.x, center.y);
		ctx.lineTo(finalPos.x, finalPos.y);
		ctx.stroke();
	}
	
}

class Clock{
	constructor(idCanvas, idTime, _timeZone){
		this.canvas = document.getElementById(idCanvas);
		this.ctx = this.canvas.getContext("2d");
		this.ctx.fillStyle = "black";
		this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
		
		this.timeInDigits = document.getElementById(idTime);
		
		this.timeZone = _timeZone;
		this.center = new coordinates(this.canvas.width / 2, this.canvas.height / 2);
		
		this.seconds = new hand(100, "red", 60, 5);
		this.minutes = new hand(85, "white", 60, 10);
		this.hours = new hand(62, "green", 720, 10);
		
		this.updateClock();
		setInterval(this.updateClock.bind(this), 1000);
	}
	
	clearClock(){
		// Clear Background
		this.ctx.fillStyle = "black";
		this.ctx.fillRect(0,0,this.canvas.width, this.canvas.height);
		
		// Draw yellow external circle
		this.ctx.lineWidth=10;
		this.ctx.strokeStyle = "yellow";
		this.ctx.beginPath();
		this.ctx.arc(this.center.x, this.center.y, 120, 0, 2*Math.PI);
		this.ctx.stroke();
		
		// Draw the 12 points
		this.ctx.fillStyle = "gray";
		for(var i = 0; i < 12; i++){
			var angle = (2*Math.PI) * i / 12;
			this.ctx.beginPath();
			var posX = this.center.x + 110 * Math.cos((Math.PI / 2) - angle);
			var posY = this.center.y - 110 * Math.sin((Math.PI / 2) - angle);
			this.ctx.arc(posX, posY, 5, 0, 2*Math.PI);
			this.ctx.fill()
		}
	}
	
	updateClock(){
		this.clearClock();
		
		// Draw the hands
		var date = new Date();
		var tmp = date.getSeconds();
		this.seconds.draw(tmp, this.ctx, this.center);
		var seconds = tmp;
		
		tmp = date.getMinutes();
		this.minutes.draw(tmp, this.ctx, this.center);
		var minutes = tmp;
		
		tmp = (date.getHours() % 12 + this.timeZone) * 60 + tmp;
		this.hours.draw(tmp, this.ctx, this.center);
		
		var hours = (date.getHours() + this.timeZone) % 24;
		if(hours < 0)
			hours = 24 + hours;
		if(hours < 10)
			hours = "0" + String(hours)
		if(minutes < 10)
			minutes = "0" + String(minutes)
		if(seconds < 10)
			seconds = "0" + String(seconds)
		
		this.timeInDigits.textContent = hours + ":" + minutes + ":" + seconds;
		
		// Draw the yellow center
		this.ctx.lineWidth=10;
		this.ctx.fillStyle = "yellow";
		this.ctx.beginPath();
		this.ctx.arc(this.center.x, this.center.y, 7, 0, 2*Math.PI);
		this.ctx.fill();
	}
}

var offsetToUTC = -(new Date().getTimezoneOffset() / 60) + 1;
console.log(offsetToUTC);

// Italy
var clock1 = new Clock("canvas1", "time1", 2 - offsetToUTC);

// UK
var clock2 = new Clock("canvas2", "time2", 1 - offsetToUTC);

// USA - California
var clock3 = new Clock("canvas3", "time3", -7 - offsetToUTC);