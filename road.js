class Road {
    constructor(x, width, lane_count=3) {
        this.x = x;
        this.width = width;
        this.lane_count = lane_count;
        this.left = x - width / 2;
        this.right = x + width / 2;

        const infinity = 1000000;
        this.top = -infinity;
        this.bottom = infinity;
    }

    get_lane_center(lane_index) {
        const lane_width = this.width / this.lane_count;
        return this.left + lane_width / 2 + 
            Math.min(lane_index, this.lane_count -1) * lane_width;
    }

    draw(context) {
        context.lineWidth = 5;
        context.strokeStyle = 'white';

        for (let i=0; i<=this.lane_count; i++) {
            const x = lerp(
                this.left,
                this.right,
                i / this.lane_count
            );
            if (i>0 && i<this.lane_count) {
                context.setLineDash([20, 20]);
            } else {
                context.setLineDash([]);
            }
            context.beginPath();
            context.moveTo(x, this.top);
            context.lineTo(x, this.bottom);
            context.stroke();
        }
    }
}

