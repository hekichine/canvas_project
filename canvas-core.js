class Particle{
  constructor(c,x,y,radius,color){
    this.c =c;
    this.x=x;
    this.y=y;
    this.radius = radius;
    this.color = color;
    this.radians =Math.random() *Math.PI*2;
    this.velocity = 0.05;
    this.distanceFromCenter = this.randomIntFromRange(50,120);
    this.lastMouse = {
      x:x,
      y:y
    };


    // init mouse variables
    this.mouse = {
      x: innerWidth / 2,
      y: innerHeight / 2,
    };
    // event listeners
    window.addEventListener("mousemove", (event) => {
      this.mouse.x = event.clientX;
      this.mouse.y = event.clientY;
    });
  }
  update =()=>{
    const lastPoint = {x: this.x,y:this.y}
    // move points over time
    this.radians += this.velocity;

    // Drag effect
    this.lastMouse.x += (this.mouse.x - this.lastMouse.x) * 0.05;
    this.lastMouse.y += (this.mouse.y - this.lastMouse.y) * 0.05;

    // circular motion
    this.x = this.lastMouse.x + Math.cos(this.radians) * this.distanceFromCenter;
    this.y = this.lastMouse.y + Math.sin(this.radians) * this.distanceFromCenter;
    this.draw(lastPoint)
  }
  draw =(lastPoint)=>{
    this.c.beginPath();

    // ===== style 1
    // this.c.arc(this.x,this.y,this.radius,0,Math.PI*2,false);
    // this.c.fillStyle = this.color;
    // this.c.fill();

    // ===== style 2
    this.c.strokeStyle = this.color;
    this.c.lineWidth = this.radius;
    this.c.moveTo(lastPoint.x,lastPoint.y);
    this.c.lineTo(this.x,this.y);
    this.c.stroke();

    this.c.closePath();
  }
  randomIntFromRange(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }
}
class CircularMotion extends HTMLElement {
  constructor() {
    super();
    // init canvas
    this.canvas = this.querySelector("canvas");
    this.c = this.canvas.getContext("2d");

    this.canvas.width = innerWidth;
    this.canvas.height = innerHeight;
    
    this.colors = ["#2185c", "#7ecefd", "#fff6e5", "#ff7f66"];


    window.addEventListener("resize", () => {
      this.canvas.width = innerWidth;
      this.canvas.height = innerHeight;

      this.init();
    });
    this.particles=[];

    this.init();
    this.animate();
  }
  init() {
    for (let i = 0; i < 100; i++) {
      const radius = (Math.random()* 2) + 1;
      this.particles.push(new Particle(this.c,this.canvas.width/2,this.canvas.height/2,radius,this.randomColor(this.colors)))
    }
  }
  
  randomColor(colors){
    return colors[Math.floor(Math.random()*colors.length)];
  }
  
  animate(){
    requestAnimationFrame(()=>{
      this.animate()
    });
    this.c.fillStyle = 'rgba(0,0,0,0.05)'
    this.c.fillRect(0,0,this.canvas.width,this.canvas.height);
    
    this.particles.forEach(particle => {
      particle.update();
    })
  }
}
customElements.define("circular-motion", CircularMotion);
