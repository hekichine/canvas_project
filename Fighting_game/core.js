class Sprite {
  constructor({ canvas, c, position, velocity }) {
    this.position = position;
    this.c = c;
    this.canvas = canvas;
    this.velocity = velocity;
    this.height = 150;
    this.gravity = 0.2;
  }
  draw() {
    this.c.fillStyle = "red";
    this.c.fillRect(this.position.x, this.position.y, 50, this.height);
  }

  update() {
    this.draw();
    this.velocity.y += this.gravity;
    this.position.y += this.velocity.y;


    if (this.position.y + this.height + this.velocity.y >= this.canvas.height) {
      this.velocity.y = 0;
    }else{
      this.velocity.y += this.gravity
    }
  }
}

class FightingGame extends HTMLElement {
  constructor() {
    super();
    this.canvas = this.querySelector("canvas");
    this.c = this.canvas.getContext("2d");

    this.canvas.width = 1024;
    this.canvas.height = 576;

    this.c.fillRect(0, 0, this.canvas.width, this.canvas.height);

    this.player = new Sprite({
      canvas: this.canvas,
      c: this.c,
      position: {
        x: 0,
        y: 0,
      },
      velocity: {
        x: 0,
        y: 0,
      },
    });

    this.enemy = new Sprite({
      canvas: this.canvas,
      c: this.c,
      position: {
        x: 400,
        y: 100,
      },
      velocity: {
        x: 0,
        y: 0,
      },
    });

    this.animate();
  }
  animate() {
    window.requestAnimationFrame(() => {
      this.animate();
    });
    this.c.fillStyle = "black";
    this.c.fillRect(0, 0, this.canvas.width, this.canvas.height);
    this.player.update();
    this.enemy.update();
  }
}
customElements.define("fight-game", FightingGame);
