const canvas = document.getElementById("my_canvas");
canvas.width = 200;

const context = canvas.getContext("2d");
const car = new Car(100, 100, 30, 50);

animate();

function animate(){
    car.update();
    canvas.height = window.innerHeight;
    car.draw(context);
    requestAnimationFrame(animate);
}