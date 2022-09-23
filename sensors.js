class Sensor {
    constructor(car) {
        this.car = car;
        this.rayCount = 3;
        this.rayLength = 100;
        this.raySpread = Math.PI / 4;

        this.rays = [];
    }

    update() {
        this.rays = [];
        for (let i=0; i<this.rayCount; i++) {
            const rayAngle = lerp(
                this.raySpread / 2,
                -this.raySpread / 2,
                i / (this.rayCount -1)
            );
            const start={x:car.x, y:car.y};
            const end={
                x:car.x-
                    Math.sin(rayAngle)*this.rayLength,
                y:car.y-
                    Math.cos(rayAngle)*this.rayLength
            };
            this.rays.push([start,end]);
        }
    }

    draw(context) {
        for (let i=0; i<this.rayCount; i++) {
            context.beginPath();
            context.lineWidth = 2;
            context.strokeStyle = "yellow";
            context.moveTo(this.rays[i][0].x, this.rays[i][0].y);
            context.lineTo(this.rays[i][1].x, this.rays[i][1].y);
            context.stroke();
        }        
    }
}
