let current_speed = this.speed;

class Controls {
    constructor() {
        this.forward = false;
        this.left = false;
        this.right = false;
        this.reverse = false;
        
        this.#addKeyboardListeners();
    }
        
    #addKeyboardListeners(){
        window.onkeydown=(event)=>{
            switch(event.key){
                case "ArrowLeft":
                    this.left=true;
                    break;
                case "ArrowUp":
                    this.forward=true;
                    break;
                case "ArrowDown":
                    this.reverse=true;
                    break;
                case "ArrowRight":
                    this.right=true;
                    break;
                }
                //console.table(this);
                // console.log("Car speed: ", Math.trunc(car.speed * 15), "feet/second");
                // console.log("Angle: ", Math.round(car.angle * 31.4), "degrees");        
        }
        window.onkeyup=(event)=>{
            switch(event.key){
                case "ArrowUp":
                    this.forward=false;
                    break;
                case "ArrowDown":
                    this.reverse=false;
                    break;
                case "ArrowLeft":
                    this.left=false;
                    break;
                case "ArrowRight":
                    this.right=false;
                    break;
            }
            //console.table(this);            
        }
    }
}
