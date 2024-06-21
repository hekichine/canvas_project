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
    for (let i = 0; i < 150; i++) {
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

//
// =================================
//
//      FIRE WORKS
//
// =================================
class fireWork_Particle {
  constructor(c, x, y, firework, color) {
    this.c = c;
    this.x = x;
    this.y = y;
    this.lifeSpan = this.random(1000, 50);
    this.firework = firework;
    this.color = color;
    this.particleRadiusRange = { max: 3, min: 1 };
    this.explosionRadiusRange = { max: 5, min: -5 };
    this.fireworkRandomXPathRange = { max: 2, min: -2 };
    this.radius = this.random(
      this.particleRadiusRange.max,
      this.particleRadiusRange.min
    );
    this.history = [];
    this.gravity = 0.005;
    this.tail = 5;
    this.fireworkOnXaxis = 2;
    this.fireworkGravity = 0.2;
    this.particlesGravity = 0.08;
    this.fireworkRadius = 4;
    this.particlesLifespan = 10;
    this.colors = [
      "#ffffff",
      "#00ffff",
      "#d3ffce",
      "#f0f8ff",
      "#faebd7",
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
    ];

    if (this.firework) {
      this.vx = this.random(this.fireworkOnXaxis, -this.fireworkOnXaxis);
      this.vy = this.random(-9, -15);
      this.gravity = this.fireworkGravity;
    } else {
      this.vy = this.random(
        this.explosionRadiusRange.max,
        this.explosionRadiusRange.min
      ); // firework radius on Y axis
      this.vx = this.random(
        this.explosionRadiusRange.max,
        this.explosionRadiusRange.min
      ); //firework radius on X axis
      this.vy = this.vy * this.random(3, 2);
      this.vx = this.vx * this.random(3, 2);
      this.gravity = this.particlesGravity;
      if (this.random(600, 1) < 200) {
        this.vx *= this.random(2, 1);
        this.vy *= this.random(2, 1);
      }
    }
  }
  done() {
    if (this.lifeSpan < 0) {
      return true;
    } else {
      return false;
    }
  }
  draw() {
    this.c.fillStyle = this.color;

    this.c.beginPath();

    this.c.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    this.c.fill();

    for (let i = 0; i < this.history.length - 1; i++) {
      this.c.beginPath();
      this.c.moveTo(this.history[i].x, this.history[i].y);
      this.c.lineTo(this.history[i + 1].x, this.history[i + 1].y);
      this.c.strokeStyle =
        this.colors[Math.floor(Math.random() * this.colors.length)];
      this.c.lineWidth = this.radius;
      this.c.stroke();
      this.c.closePath();
    }
  }
  update() {
    this.y += this.vy;
    this.x += this.vx;
    this.vy += this.gravity;
    if (this.firework) {
      this.x += this.random(
        this.fireworkRandomXPathRange.max,
        this.fireworkRandomXPathRange.min
      ); //Randomize the direction on X axis
      this.radius = this.random(
        this.fireworkRadius,
        this.fireworkRadius - this.fireworkRadius / 2
      );
    }
    if (!this.firework) {
      this.vy *= 0.9;
      this.vx *= 0.9;
      this.lifeSpan -= this.particlesLifespan;

      // this.vx += random(.5,-.5);
      // this.vy += random(.5,-.5);
      if (this.lifeSpan < 0) {
        this.done();
      }
    }

    this.history.push({
      x: this.x,
      y: this.y,
    });

    if (this.history.length > this.tail) {
      this.history.shift();
    }
  }
  random(max, min) {
    let x = Math.random() * (max - min) + min;
    return x;
  }
}
class FireWork {
  constructor(canvas, c, color) {
    this.numberOfParticles = 90;
    this.canvas = canvas;
    this.c = c;
    this.color = color;

    this.firework = new fireWork_Particle(
      this.c,
      this.random(this.canvas.width / 2 - 150, this.canvas.width / 2),
      this.canvas.height,
      true,
      this.color
    );
    this.exploded = false;
    this.particles = [];
  }
  done() {
    if (this.exploded && this.particles.length === 0) {
      return true;
    } else {
      return false;
    }
  }
  explode() {
    for (let i = 0; i < this.numberOfParticles; i++) {
      this.particles.push(
        new fireWork_Particle(
          this.c,
          this.firework.x,
          this.firework.y,
          false,
          this.color
        )
      );
    }
  }
  update() {
    if (!this.exploded) {
      this.firework.draw();
      this.firework.update();

      if (this.firework.vy > 0) {
        this.firework.vy = 0;
        this.exploded = true;
        this.explode();
      }
    }

    for (let i = this.particles.length - 1; i >= 0; i--) {
      this.particles[i].draw();
      this.particles[i].update();
      if (this.particles[i].done()) {
        this.particles.splice(i, 1);
        //this.done();
      }
    }
  }
  random(max, min) {
    let x = Math.random() * (max - min) + min;
    return x;
  }
}
class FireWorks extends HTMLElement {
  constructor() {
    super();
    this.play_btn = this.querySelector("button.playsound");
    this.audio = this.querySelector(".fireworks_sound");
    this.canvas = this.querySelector("canvas");
    this.c = this.canvas.getContext("2d");
    this.canvas.width = innerWidth;
    this.canvas.height = innerHeight;
    this.mouse = {
      x: innerWidth / 2,
      y: innerHeight / 2,
    };
    this.colors = [
      "#ffffff",
      "#00ffff",
      "#d3ffce",
      "#f0f8ff",
      "#faebd7",
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
    ];
    this.density = 2;
    this.fireworksArrayLength = 50;
    this.fireworks = [];
  

    window.addEventListener("resize", () => {
      this.canvas.width = innerWidth;
      this.canvas.height = innerHeight;
    });
    this.animate();
    this.playHandle();
  }

  animate() {
    requestAnimationFrame(() => {
      this.animate();
    });
    this.c.fillStyle = "rgba(0,0,0,.3)";
    this.c.fillRect(0, 0, this.canvas.width, this.canvas.height);

    // configure quantity fire
    if (Math.round(this.random(0, 20)) < this.density) {
      this.fireworks.push(
        new FireWork(
          this.canvas,
          this.c,
          this.colors[Math.floor(Math.random() * this.colors.length)]
        )
      );
      // fireworks.push(new Firework());
    }

    for (let i = this.fireworks.length - 1; i >= 0; i--) {
      this.fireworks[i].update();
      if (this.fireworks[i].done()) {
      }
    }

    if (this.fireworks.length >= this.fireworksArrayLength) {
      this.fireworks.splice(0, 1);
    }

  }
  playHandle() {
    let is_play_sound = false;
    let self = this;
    self.play_btn.addEventListener("click", function () {
      this.classList.toggle("is-playing");
      is_play_sound = !is_play_sound;
      if (is_play_sound) {
        self.audio.play();
      } else {
        self.audio.pause();
      }
    });
  }
  random(max, min) {
    let x = Math.random() * (max - min) + min;
    return x;
  }
}
customElements.define("fire-works", FireWorks);
