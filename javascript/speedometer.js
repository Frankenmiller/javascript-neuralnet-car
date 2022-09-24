//const car_angle=this.angle>180?car_angle:-car_angle;

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
        dashboard.fillText("Speed: ", (window.innerWidth / 6) -100, 40)
        dashboard.fillText(Math.trunc(car.speed * 20), (window.innerWidth / 6) -30, 40)
        dashboard.fillText("feet/sec", (window.innerWidth / 6), 40)
        dashboard.fillText("Angle: ", (window.innerWidth / 6) -100, 70)
		dashboard.fillText(Math.round((car.angle * 56.52) % 180), (window.innerWidth / 6) -40, 70)
        dashboard.fillText("degrees", (window.innerWidth / 6), 70)
	}
};