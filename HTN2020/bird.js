/* global createCanvas, colorMode, HSB, width, height, random, background, fill, color, random,
          rect, ellipse, stroke, image, loadImage, collideCircleCircle, collideRectCircle, text, 
          mouseX, mouseY, strokeWeight, line, mouseIsPressed, windowWidth, windowHeight, noStroke, 
          keyCode, UP_ARROW, LEFT_ARROW, RIGHT_ARROW, DOWN_ARROW, textSize frameCount noLoop,loop*/

let backgroundColor, lives, score, happy;

var pipes = [];
var bird;

lives = 1;
score = 0;

// #1 First Finish the Pipe Class
// #2 Initialize the Pipe, Bird
// #3 Complete the Code in draw()

function setup() {
  // Canvas & color settings
  createCanvas(700, 700);
  colorMode(HSB, 360, 100, 100);
  backgroundColor = 95;
  
  happy = loadImage("https://cdn.glitch.com/17dd2b9a-9e93-4ae2-bc30-b08a0c9f9a92%2Fimageedit_5_7376134746.png?v=1610874297743");

  //TODO Initialize pipes and bird

  bird = new Bird();
  pipes.push(new Pipe());
}

function draw() {
  background(backgroundColor);

  bird.show();
  bird.update();
  for (var i = pipes.length - 1; i >= 0; i--) {
    pipes[i].show();
    pipes[i].update();
    if (pipes[i].offscreen()) {
      pipes.splice(i, 1);
    }
  }
  fill("black");
  textSize(20);
  text(`Score: ${score}`, 350, 50);
  if (frameCount % 75 == 0) {
    pipes.push(new Pipe());
  }
}

class Pipe {
  constructor() {
    this.spacing = 175;
    this.top = random(height / 6, (3 / 4) * height);
    this.bottom = height - (this.top + this.spacing);
    this.x = width;
    this.w = 80;
    this.speed = 6;
    this.highlight = false;
    this.color = "white";
  }
  show() {
    if (
      collideRectCircle(this.x, 0, this.w, this.top, bird.x, bird.y, 32) ||
      collideRectCircle(
        this.x,
        height - this.bottom,
        this.w,
        this.bottom,
        bird.x,
        bird.y,
        32
      )
    ) {
      gameOver();
      fill("black");
    } else {
      fill("green");
    }
    rect(this.x, 0, this.w, this.top); // TOP PIPE
    rect(this.x, height - this.bottom, this.w, this.bottom); // BOTTOM PIPE
  }
  update() {
    this.x -= this.speed;
    if (this.x + this.w < 0) {
      score++;
    }
  }
  offscreen() {
    if (this.x < -this.w) {
      return true;
    } else {
      return false;
    }
  }
}

class Bird {
  constructor() {
    this.y = height / 2;
    this.x = 64;
    this.gravity = 0.8;
    this.velocity = 0;
    this.lift = -20;
  }
  show() {
    image(happy, this.x - 45, this.y - 65, 90, 80);
  }
  up() {
    this.velocity += this.lift;
  }
  update() {
    this.velocity += this.gravity;
    this.velocity *= 0.9;
    this.y += this.velocity;

    if (this.y > height) {
      this.y = height;
      this.velocity = 0;
    }
  }
}

function keyPressed() {
  if (keyCode === 32) {
    bird.up();
  }
}

function gameOver() {
  fill("white");
  rect(0, 0, width, height);
  fill("black");
  textSize(30);
  text("GAME OVER!", 300, 400);
  text(`Your Score: ${score}`, 300, 430);
  noLoop();
}

function mouseClicked() {
  score = 0;
}
