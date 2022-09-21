const canvas = document.getElementById("my_canvas");
canvas.height = window.innerHeight;
canvas.width = 200;

const context = canvas.getContext("2d");
const car = new Car(100, 100, 30, 50);

car.draw(context);
