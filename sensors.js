class Sensor {
    constructor(car){
        this.car = car;
        this.rayCount = 20;
        this.rayLength = 150;
        this.raySpread = Math.PI / 2;

        this.rays = [];
        this.readings = [];
    }

    update(road_boarders){
        this.#cast_rays();
        this.readings = [];
        for(let i=0;i<this.rays.length;i++) {
            this.readings.push(this.#get_reading(this.rays[i], road_boarders));
        }
    }

    #get_reading(ray, road_boarders){
        let touches = [];
        for(let i=0;i<road_boarders.length;i++){
            const contact = get_intersect(ray[0], ray[1],
                road_boarders[i][0], road_boarders[i][1]    
            )
            if (contact) {touches.push(contact);}
        }
        if(touches.length==0) {
            return null;
        } else {
            const offsets = touches.map(e=>e.offset);
            const min_offset = Math.min(...offsets);
            return touches.find(e=>e.offset==min_offset);
        }
    }



    #cast_rays() {
        this.rays = [];
        for (let i=0; i<this.rayCount; i++){
            const rayAngle = lerp(
                this.raySpread / 2,
                -this.raySpread / 2,
                i / (this.rayCount -1)
            ) + car.angle;
            const start={x:car.x, y:car.y};
            const end={x:car.x-Math.sin(rayAngle)*this.rayLength,
                        y:car.y-Math.cos(rayAngle)*this.rayLength};
            this.rays.push([start,end]);
        }
    }

    draw(context) {
        for (let i=0; i<this.rayCount; i++) {
            let end = this.rays[i][1];
            if(this.readings[i]){
                end=this.readings[i];
            }
            context.beginPath();
            context.lineWidth = 2;
            context.strokeStyle = "yellow";
            context.moveTo(this.rays[i][0].x, this.rays[i][0].y);
            context.lineTo(end.x, end.y);
            context.stroke();

            context.beginPath();
            context.lineWidth = 2;
            context.strokeStyle = "black";
            context.moveTo(this.rays[i][1].x, this.rays[i][1].y);
            context.lineTo(end.x, end.y);
            context.stroke();
        }        
    }
}
