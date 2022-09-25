const car_canvas = document.getElementById("my_canvas");
car_canvas.width = 200;
const net_canvas = document.getElementById("net_canvas");
const inst_panel = document.getElementById("my_speedometer");
inst_panel.height = 100;

const car_context = car_canvas.getContext("2d");
const net_context = net_canvas.getContext("2d");
const dashboard = inst_panel.getContext("2d");
const road = new Road(car_canvas.width/2, car_canvas.width * 0.9);
const N = 100;
const cars = generate_cars(N);
//const car = new Car(road.get_lane_center(1),100,30,50,"AI")
const speedometer = new Speedometer(10, 10, 50, 50);
const traffic = [new Car(road.get_lane_center(1), 25, 30, 50, "DUMMY", 2)];

animate();

function generate_cars(N) {
    const cars = [];
    for (let i=1; i<=N; i++) {
        cars.push(new Car(road.get_lane_center(1),100,30,50,"AI"));
    }
    return cars;
}

function animate(time){
    for (let i=0; i<traffic.length; i++) {traffic[i].update(road.borders, []);}
    for (let i=0; i<cars.length; i++){cars[i].update(road.borders, traffic);}
    speedometer.update();
    car_canvas.height = window.innerHeight;
    net_canvas.height = 275;
    car_context.save();
    car_context.translate(0, -cars[0].y + car_canvas.height * 0.7);
    inst_panel.width = (window.innerWidth / 2) - ((window.innerWidth / 100) * 2) - 100;
    net_canvas.width = (window.innerWidth / 2) - ((window.innerWidth / 100) * 2) - 100;
    road.draw(car_context);
    for (let i=0; i<traffic.length; i++) {traffic[i].draw(car_context, "white");}
    car_context.globalAlpha = 0.2;
    for(let i=0;i<cars.length;i++){
        cars[i].draw(car_context,"black");
    }    car_context.globalAlpha = 1.0;
    speedometer.draw(dashboard);
    car_context.restore();
    net_context.lineDashOffset = -time / 50;
    Visualizer.drawNetwork(net_context,cars[0].brain);
    requestAnimationFrame(animate);
}
