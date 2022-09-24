class Car {
	constructor(x, y, width, height, control_type, max_speed=3) {
		this.x = x;
		this.y = y;
		this.width = width;
		this.height = height;
		this.speed = 0;
		this.acceleration = 0.2;
		this.max_speed = max_speed;
		this.friction = 0.05;
		this.angle = 0;
		this.damaged = false;
		this.use_brain = control_type=="AI";
		if (control_type != "DUMMY") {
			this.sensor = new Sensor();
			this.brain = new NeuralNetwork([this.sensor.rayCount,6,4]);
		}
		this.controls = new Controls(control_type);
	}	

	update(road_boarders, traffic) {
		if (!this.damaged) {
			this.#move();
			this.polygon = this.#create_polygon();
			this.damaged = this.#asess_damage(road_boarders, traffic);
		}
		if (this.sensor) {
			this.sensor.update(road_boarders, traffic);
			const offsets = this.sensor.readings.map(s=>s==null?0:1-s.offset);
			const outputs = NeuralNetwork.feed_forward(offsets, this.brain);
			// console.log(outputs);

			if (this.use_brain) {
				this.controls.forward = outputs[0];
				this.controls.left = outputs[1];
				this.controls.right = outputs[2];
				this.controls.reverse = outputs[3];
			}
		}
	}

	#asess_damage(road_boarders, traffic) {
		for (let i=0; i<road_boarders.length; i++) {
			if (poly_intersect(this.polygon, road_boarders[i])) {
				return true;
			} 
		}
		for (let i=0; i<traffic.length; i++) {
			if (poly_intersect(this.polygon, traffic[i].polygon)) {
				return true;
			} 
		}
		return false;
	}

	#create_polygon() {
		const points = [];
		const rad = Math.hypot(this.width, this.height)/2;
		const alpha = Math.atan2(this.width, this.height);
		points.push({x:this.x-Math.sin(this.angle-alpha) * rad,
					y:this.y-Math.cos(this.angle-alpha) * rad});
		points.push({x:this.x-Math.sin(this.angle+alpha) * rad,
					y:this.y-Math.cos(this.angle+alpha) * rad});
		points.push({x:this.x-Math.sin(Math.PI + this.angle-alpha) * rad,
					y:this.y-Math.cos(Math.PI + this.angle-alpha) * rad});
		points.push({x:this.x-Math.sin(Math.PI + this.angle+alpha) * rad,
					y:this.y-Math.cos(Math.PI + this.angle+alpha) * rad});
		return points;
	}

	#move() {
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
		if (Math.abs(this.speed) < this.friction) {
			this.speed = 0;
		}
		if (this.speed != 0) {
			const flip=this.speed>0?1:-1;
			if (this.controls.left) {this.angle += 0.03 * flip;}
			if (this.controls.right) {this.angle -= 0.03 * flip;}
		}
		this.x -= Math.sin(this.angle) * this.speed;
		this.y -= Math.cos(this.angle) * this.speed;
	}

    draw(context, color){
		if(this.damaged){
			context.fillStyle = "orange";
        }else{
			context.fillStyle = color;
        }
        context.beginPath();
        context.moveTo(this.polygon[0].x,this.polygon[0].y);
        for(let i=1;i<this.polygon.length;i++){
			context.lineTo(this.polygon[i].x,this.polygon[i].y);
        }
		context.fill();
		if (this.sensor) {this.sensor.draw(context);}
	}
}
