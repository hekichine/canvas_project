// =================================
//
//            BASE CANVAS
//
// =================================
class Object {
  constructor(x, y, radius, color) {
    this.c = c;
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
  }
  draw() {
    this.c.beginPath();
    this.c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    this.c.fillStyle = this.color;
    this.c.fill();
    this.c.closePath();
  }
  update() {
    this.draw();
  }
}
class BaseCanvas extends HTMLElement {
  constructor() {
    super();
    this.canvas = this.querySelector("canvas");
    this.c = this.canvas.getContext("2d");
    this.canvas.width = innerWidth;
    this.canvas.height = innerHeight;
    this.mouse = {
      x: innerWidth / 2,
      y: innerHeight / 2,
    };
    this.colors = [
      "#2185c",
      "#7ecefd",
      "#fff6e5",
      "#ff7f66",
      "#fff",
      "#add8e6",
      "#00008b",
      "#84e4e0",
      "#ece5b6",
      "#e1eb78",
      "#caffd6",
      "#FFFDD0",
      "#ffdf00",
      "#001f3f",
      "#fcc6de",
      "#ffa500",
      "#d966d9",
      "#b1907f",
      "#c8ad7f",
      "#b87333",
      "#dadbdd",
      "",
    ];
    this.objects = [];

    window.addEventListener("resize", () => {
      this.canvas.width = innerWidth;
      this.canvas.height = innerHeight;
      this.init();
    });
    this.init();
    this.animate();
  }
  init() {
    for (let i = 0; i < 400; i++) {
      // objects.push();
    }
  }
  animate() {
    requestAnimationFrame(this.animate.bind(this));
    this.c.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.c.fillText("HTML CANVAS", this.mouse.x, this.mouse.y);

    // this.objects.forEach(object => {
    //   object.update();
    // })
  }
}
// =================================
//
//          END BASE CANVAS
//
// =================================

// =================================
//
//      CIRCULAR MOTION
//
// =================================
class Particle {
  constructor(c, x, y, radius, color) {
    this.c = c;
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
    this.radians = Math.random() * Math.PI * 2;
    this.velocity = 0.05;
    this.distanceFromCenter = this.randomIntFromRange(50, 120);
    this.lastMouse = {
      x: x,
      y: y,
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
  update = () => {
    const lastPoint = { x: this.x, y: this.y };
    // move points over time
    this.radians += this.velocity;

    // Drag effect
    this.lastMouse.x += (this.mouse.x - this.lastMouse.x) * 0.05;
    this.lastMouse.y += (this.mouse.y - this.lastMouse.y) * 0.05;

    // circular motion
    this.x =
      this.lastMouse.x + Math.cos(this.radians) * this.distanceFromCenter;
    this.y =
      this.lastMouse.y + Math.sin(this.radians) * this.distanceFromCenter;
    this.draw(lastPoint);
  };
  draw = (lastPoint) => {
    this.c.beginPath();

    // ===== style 1
    // this.c.arc(this.x,this.y,this.radius,0,Math.PI*2,false);
    // this.c.fillStyle = this.color;
    // this.c.fill();

    // ===== style 2
    this.c.strokeStyle = this.color;
    this.c.lineWidth = this.radius;
    this.c.moveTo(lastPoint.x, lastPoint.y);
    this.c.lineTo(this.x, this.y);
    this.c.stroke();

    this.c.closePath();
  };
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
    this.particles = [];

    this.init();
    this.animate();
  }
  init() {
    for (let i = 0; i < 100; i++) {
      const radius = Math.random() * 2 + 1;
      this.particles.push(
        new Particle(
          this.c,
          this.canvas.width / 2,
          this.canvas.height / 2,
          radius,
          this.randomColor(this.colors)
        )
      );
    }
  }

  randomColor(colors) {
    return colors[Math.floor(Math.random() * colors.length)];
  }

  animate() {
    requestAnimationFrame(() => {
      this.animate();
    });
    this.c.fillStyle = "rgba(0,0,0,0.05)";
    this.c.fillRect(0, 0, this.canvas.width, this.canvas.height);

    this.particles.forEach((particle) => {
      particle.update();
    });
  }
}
customElements.define("circular-motion", CircularMotion);

// =================================
//
//      GALACTIC LIGHT
//
// =================================
class Galactic {
  constructor(c, x, y, radius, color) {
    this.c = c;
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
  }
  draw() {
    this.c.beginPath();
    this.c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    this.c.shadowColor = this.color;
    this.c.shadowBlur = 15;
    this.c.fillStyle = this.color;
    this.c.fill();
    this.c.closePath();
  }
  update() {
    this.draw();
  }
}
class GalacticLight extends HTMLElement {
  constructor() {
    super();
    this.canvas = this.querySelector("canvas");
    this.c = this.canvas.getContext("2d");
    this.canvas.width = innerWidth;
    this.canvas.height = innerHeight;
    this.mouse = {
      x: innerWidth / 2,
      y: innerHeight / 2,
    };
    this.radians = 0;
    this.colors = [
      "#2185c",
      "#7ecefd",
      "#fff6e5",
      "#ff7f66",
      "#fff",
      "#add8e6",
      "#00008b",
      "#84e4e0",
      "#ece5b6",
      "#e1eb78",
      "#caffd6",
      "#FFFDD0",
      "#ffdf00",
      "#001f3f",
      "#fcc6de",
      "#ffa500",
      "#d966d9",
      "#b1907f",
      "#c8ad7f",
      "#b87333",
      "#dadbdd",
      "",
    ];
    this.galactics = [];
    this.alpha = 1;
    this.mousedown = false;

    window.addEventListener("resize", () => {
      this.canvas.width = innerWidth;
      this.canvas.height = innerHeight;
      this.init();
    });
    this.init();
    this.animate();

    window.addEventListener("mousedown", () => {
      this.mousedown = true;
    });
    window.addEventListener("mouseup", () => {
      this.mousedown = false;
    });
  }
  init() {
    for (let i = 0; i < 100; i++) {
      const canvasWidth = this.canvas.width + 300;
      const canvasHeight = this.canvas.height + 300;
      const x = Math.random() * canvasWidth - canvasWidth / 2;
      const y = Math.random() * canvasHeight - canvasHeight / 2;
      const radius = 2 * Math.random();
      const color = this.colors[Math.floor(Math.random() * this.colors.length)];
      this.galactics.push(new Galactic(this.c, x, y, radius, color));
    }
    console.log(this.galactics[0]);
  }
  animate() {
    requestAnimationFrame(this.animate.bind(this));
    this.c.fillStyle = `rgba(10,10,10,${this.alpha})`;
    this.c.fillRect(0, 0, this.canvas.width, this.canvas.height);

    this.c.save();
    this.c.translate(this.canvas.width / 2, this.canvas.height / 2);
    this.c.rotate(this.radians);
    this.galactics.forEach((galactic) => {
      galactic.update();
    });
    this.c.restore();
    this.radians += 0.002;
    if (this.mousedown && this.alpha >= 0.03) {
      this.alpha -= 0.01;
    } else if (!this.mousedown && this.alpha < 1) {
      this.alpha += 0.01;
    }
  }
}
customElements.define("galactic-light", GalacticLight);
