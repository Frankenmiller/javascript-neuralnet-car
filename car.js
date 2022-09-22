class Car {
	constructor(x, y, width, height) {
		this.x = x;
		this.y = y;
		this.width = width;
		this.height = height;
		this.speed = 0;
		this.acceleration = 0.2;
		this.max_speed = 3;
		this.friction = 0.05;
		this.controls = new Controls();
	}

	update() {
		if (this.controls.forward) {
			this.speed += this.acceleration;
		}
		if (this.controls.reverse) {
			this.speed -= this.acceleration;
		}
		if (this.speed > this.max_speed) {
			this.speed = this.max_speed;
		}
		if (this.speed < -this.max_speed / 2) {
			this.speed = -this.max_speed / 2;
		}
		if (this.speed > 0) {
			this.speed -= this.friction;
		}
		if (this.speed < 0) {
			this.speed += this.friction;
		}
		this.y -= this.speed;
	}

	draw(context) {
		context.beginPath();
		context.rect(
			this.x - this.width / 2,
			this.y - this.height / 2,
			this.width,
			this.height
		);
		context.fill();
	}
}
