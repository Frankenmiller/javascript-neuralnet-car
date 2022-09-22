class Speedometer {
	constructor(x, y, width, height, speed) {
		this.x = x;
		this.y = y;
		this.width = width;
		this.height = height;
		this.speed = speed;
	}

	update() {}

	draw(dashboard) {
        dashboard.font = "20px Arial";
        dashboard.fillStyle = "black";
        dashboard.fillText("Speed: ", (window.innerWidth / 6) -100, 50)
        dashboard.fillText(Math.trunc(car.speed * 20), (window.innerWidth / 6) -30, 50)
        dashboard.fillText("feet/sec", (window.innerWidth / 6), 50)
	}
};