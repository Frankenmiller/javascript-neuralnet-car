const canvas = document.getElementById("my_canvas");
const inst_panel = document.getElementById("my_speedometer");
canvas.width = 200;
inst_panel.height = 100;

const context = canvas.getContext("2d");
const dashboard = inst_panel.getContext("2d");
const road = new Road(canvas.width/2, canvas.width * 0.9);
const car = new Car(road.get_lane_center(1), 150, 30, 50, "KEYS");
const speedometer = new Speedometer(10, 10, 50, 50);
const traffic = [new Car(road.get_lane_center(1), -225, 30, 50, "DUMMY", 2)];

animate();

function animate(){
    for (let i=0; i<traffic.length; i++) {traffic[i].update(road.borders, []);}
    car.update(road.borders, traffic);
    speedometer.update();
    canvas.height = window.innerHeight;
    context.save();
    context.translate(0, -car.y + canvas.height * 0.7);
    inst_panel.width = (window.innerWidth / 2) - ((window.innerWidth / 100) * 2) - 100;
    road.draw(context);
    for (let i=0; i<traffic.length; i++) {traffic[i].draw(context, "white");}
    car.draw(context, "black");
    speedometer.draw(dashboard);
    context.restore();
    requestAnimationFrame(animate);
}
