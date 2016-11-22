// Create the canvas
var canvas = document.createElement("canvas");
var ctx = canvas.getContext("2d");
canvas.width = 512;
canvas.height = 480;
document.body.appendChild(canvas);

// Background image
var bgReady = false;
var bgImage = new Image();
bgImage.onload = function () {
	bgReady = true;
};
bgImage.src = "images/background.png";

// Hero image
var heroReady = false;
var heroImage = new Image();
heroImage.onload = function () {
	heroReady = true;
};
heroImage.src = "images/hero.png";

// princess image
var princessReady = false;
var princessImage = new Image();
princessImage.onload = function () {
	princessReady = true;
};
princessImage.src = "images/princess.png";

// stone image
var stoneReady = false;
var stoneImage = new Image();
stoneImage.onload = function () {
	stoneReady = true;
};
stoneImage.src = "images/stone.png";

// Game objects
var hero = {
	speed: 256 // movement in pixels per second
};
var princess = {};
var princessesCaught = 0;

var stone = {};

// Handle keyboard controls
var keysDown = {};

addEventListener("keydown", function (e) {
	keysDown[e.keyCode] = true;
}, false);

addEventListener("keyup", function (e) {
	delete keysDown[e.keyCode];
}, false);

// Reset the game when the player catches a princess
var reset = function () {
	hero.x = canvas.width / 2;
	hero.y = canvas.height / 2;

	// Throw the princess somewhere on the screen randomly
	princess.x = Math.random() * (canvas.width - 64);
	princess.y = Math.random() * (canvas.height - 64);
	stone.x = (Math.random() * (canvas.width - 64));
	stone.y = (Math.random() * (canvas.width - 64));
};

// Update game objects
var update = function (modifier) {
	if (38 in keysDown) { // Player holding up
		hero.y -= hero.speed * modifier;
		if(hero.y <= 32) {
			hero.y = 32;
		};
	}
	if (40 in keysDown) { // Player holding down
		hero.y += hero.speed * modifier;
		if(hero.y >= 416) {
			hero.y = 416;
		};
	}
	if (37 in keysDown) { // Player holding left
		hero.x -= hero.speed * modifier;
		if(hero.x <= 32) {
			hero.x = 32;
		};
	}
	if (39 in keysDown) { // Player holding right
		hero.x += hero.speed * modifier;
		if(hero.x >= 448) {
			hero.x = 448;
		};
	}

	// Are they touching?
	if (hero.x <= (princess.x + 32)	&& princess.x <= (hero.x + 32)&& hero.y <= (princess.y + 32)&& princess.y <= (hero.y + 32)	) {
		++princessesCaught;
		reset();
	}
	if ((hero.x <= stone.x +32) && (hero.y <= stone.y + 32)){
		hero.x = stone.x - 32;
		hero.y = stone.y - 32;
	} else if ((hero.x >= stone.x +32) && (hero.y <= stone.y + 32)) {
		hero.x = stone.x + 32;
		hero.y = stone.y - 32;
	} else if ((hero.x <= stone.x + 32) && (hero.y >= stone.y + 32)) {
		hero.x = stone.x - 32;
		hero.y = stone.y + 32;
	} else if ((hero.x >= stone.x + 32) && (hero.y >= stone.y + 32)) {
		hero.x = stone.x - 32;
		hero.y = stone.y - 32;
	}
};

// Draw everything
var render = function () {
	if (bgReady) {
		ctx.drawImage(bgImage, 0, 0);
	}

	if (heroReady) {
		ctx.drawImage(heroImage, hero.x, hero.y);
	}

	if (princessReady) {
		ctx.drawImage(princessImage, princess.x, princess.y);
	}
	if (stoneReady) {
		ctx.drawImage(stoneImage, stone.x, stone.y);
	}

	// Score
	ctx.fillStyle = "rgb(250, 250, 250)";
	ctx.font = "24px Helvetica";
	ctx.textAlign = "left";
	ctx.textBaseline = "top";
	ctx.fillText("Princesses caught: " + princessesCaught, 32, 32);
};

// The main game loop
var main = function () {
	var now = Date.now();
	var delta = now - then;

	update(delta / 1000);
	render();

	then = now;
};



// Let's play this game!
reset();
var then = Date.now();
//The setInterval() method will wait a specified number of milliseconds, 
//and then execute a specified function, and it will continue to execute the function, 
//once at every given time-interval.
//Syntax: setInterval("javascript function",milliseconds);
setInterval(main, 1); // Execute as fast as possible