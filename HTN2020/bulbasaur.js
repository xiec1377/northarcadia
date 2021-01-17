/* I do not claim full credit for this code!
    Some parts of this code is based on a YouTube video from The Coding Train,
    linked at https://www.youtube.com/watch?v=l0HoJHc-63Q
 */

// This game was made on Glitch so these are just some built in functions that need
//  needed to be defined to remove the Glitch warnings!
/* global createCanvas, loadImage, random, background, key, height, width, constrain,
    image, collideRectRect, noFill, rect, noLoop, textSize, text, stroke, fill,
    strokeWeight, keyCode, ENTER, UP_ARROW */

let obstacles = [];
let score, highscore, cooldown, ospeed, ofrequency;
let gameplay;
let dino, dinoImage, bg, gastlyImage;

function preload() {
  // image setup
  dinoImage = loadImage(
    "https://cdn.glitch.com/b3f7b3d0-8c41-4f1e-9682-5bb3cee65662%2Fbulba2.png?v=1610835869211"
  );
  bg = loadImage(
    "https://cdn.glitch.com/b3f7b3d0-8c41-4f1e-9682-5bb3cee65662%2FPreview4.jpg?v=1610838613338"
  );
  gastlyImage = loadImage(
    "https://cdn.glitch.com/b3f7b3d0-8c41-4f1e-9682-5bb3cee65662%2Fgastly2.png?v=1610835872700"
  );
}

function setup() {
  // canvas & color settings
  createCanvas(800, 400);
  dino = new Dino();
  score = 0;
  highscore = 0;
  cooldown = 0;
  ospeed = 6;
  ofrequency = 60;
  gameplay = false;
  
  stroke(100);
  fill(220);
  strokeWeight(2);
  textSize(20);
}

// main draw function
function draw() {
  background(bg);
  displayScore();
  dino.show();
  
  if (gameplay) {
    cooldown++;
    
    if (random(1) < 0.05 && cooldown > ofrequency) {
      obstacles.push(new Obstacle());
      cooldown = 0;
    }

    dino.move();

    if (cooldown % 3 == 0) {
      score++;
    }

    if (score > 300 && score % 200 == 0) {
      ospeed++;
      ofrequency--;
    }

    for (let n of obstacles) {
      n.move();
      n.show();
      if (dino.hits(n)) {
        gameOver();
      }
    }
  } else {
    textSize(30);
    text("PRESS ENTER TO PLAY!", 230, 220);
  } 
}

function startGame() {
  obstacles = [];
  score = 0;
  gameplay = true;
}

function gameOver() {
  ospeed = 6;
  ofrequency = 60;
  gameplay = false;
}

// score in its own function for readability
function displayScore() {
  if (score > highscore) {
    highscore = score;
  }
  
  textSize(20);
  text(`SCORE: ${score}`, width - 165, 80);
  text(`HIGH SCORE: ${highscore}`, width - 220, 50);
}

function keyPressed() {
  if (!gameplay && keyCode === ENTER) {
    startGame();
  }
  if (key == " " || keyCode === UP_ARROW) {
    dino.jump();
  }
}

class Dino {
  constructor() {
    this.r = 100;
    this.x = 70;
    this.y = height - this.r;
    this.yspeed = 0;
    this.gravity = 0.5;
  }

  hits(obs) {
    return collideRectRect(
      this.x,
      this.y,
      this.r,
      this.r,
      obs.x,
      obs.y,
      obs.r,
      obs.r
    );
  }

  jump() {
    if (this.y == height - this.r) {
      this.yspeed = -12;
    }
  }

  move() {
    this.y += this.yspeed;
    this.yspeed += this.gravity;
    this.y = constrain(this.y, 0, height - this.r);
  }

  show() {
    image(dinoImage, this.x, this.y, this.r, this.r);
  }
}

class Obstacle {
  constructor() {
    this.r = 50;
    this.x = width;
    if (score > 500) {
      if (random() > 0.6) {
        this.y = height - this.r - 120;
      } else {
        this.y = height - this.r;
      }
    } else {
      this.y = height - this.r;
    }
  }

  move() {
    this.x -= ospeed;
  }

  show() {
    image(gastlyImage, this.x, this.y, this.r, this.r);
  }
}
