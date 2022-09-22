const canvas = document.getElementById("my_canvas");
const inst_panel = document.getElementById("my_speedometer");
canvas.width = 200;
inst_panel.height = 100;

const context = canvas.getContext("2d");
const dashboard = inst_panel.getContext("2d");
const car = new Car(100, 350, 30, 50);
const speedometer = new Speedometer(10, 10, 50, 50);

animate();

function animate(){
    car.update();
    speedometer.update();
    canvas.height = window.innerHeight;
    inst_panel.width = (window.innerWidth / 2) - ((window.innerWidth / 100) * 2) - 100;
    car.draw(context);
    speedometer.draw(dashboard);
    requestAnimationFrame(animate);
}
