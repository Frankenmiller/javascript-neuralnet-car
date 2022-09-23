const canvas = document.getElementById("my_canvas");
const inst_panel = document.getElementById("my_speedometer");
canvas.width = 200;
inst_panel.height = 100;

const context = canvas.getContext("2d");
const dashboard = inst_panel.getContext("2d");
const road = new Road(canvas.width/2, canvas.width * 0.9);
const car = new Car(road.get_lane_center(1), 100, 30, 50);
const speedometer = new Speedometer(10, 10, 50, 50);

animate();

function animate(){
    car.update();
    speedometer.update();
    canvas.height = window.innerHeight;
    context.save();
    context.translate(0, -car.y + canvas.height * 0.7);
    inst_panel.width = (window.innerWidth / 2) - ((window.innerWidth / 100) * 2) - 100;
    road.draw(context);
    car.draw(context);
    speedometer.draw(dashboard);
    context.restore();
    requestAnimationFrame(animate);
}
