const car_canvas = document.getElementById("my_canvas");
car_canvas.width = 200;
const net_canvas = document.getElementById("net_canvas");
const inst_panel = document.getElementById("my_speedometer");
inst_panel.height = 100;

const car_context = car_canvas.getContext("2d");
const net_context = net_canvas.getContext("2d");
const dashboard = inst_panel.getContext("2d");
const road = new Road(car_canvas.width/2, car_canvas.width * 0.9);
const car = new Car(road.get_lane_center(1), 150, 30, 50, "AI");
const speedometer = new Speedometer(10, 10, 50, 50);
const traffic = [new Car(road.get_lane_center(1), 75, 30, 50, "DUMMY", 2)];

animate();

function animate(time){
    for (let i=0; i<traffic.length; i++) {traffic[i].update(road.borders, []);}
    car.update(road.borders, traffic);
    speedometer.update();
    car_canvas.height = window.innerHeight;
    net_canvas.height = 275;
    car_context.save();
    car_context.translate(0, -car.y + car_canvas.height * 0.7);
    inst_panel.width = (window.innerWidth / 2) - ((window.innerWidth / 100) * 2) - 100;
    net_canvas.width = (window.innerWidth / 2) - ((window.innerWidth / 100) * 2) - 100;
    road.draw(car_context);
    for (let i=0; i<traffic.length; i++) {traffic[i].draw(car_context, "white");}
    car.draw(car_context, "black");
    speedometer.draw(dashboard);
    car_context.restore();
    net_context.lineDashOffset = -time / 50;
    Visualizer.drawNetwork(net_context,car.brain);
    requestAnimationFrame(animate);
}
