// Photo credits: https://wallpapercave.com/my-hero-academia-chibi-wallpapers

// This game was made on Glitch so these are just some built in functions that need
//  needed to be defined to remove the Glitch warnings!
/* global createCanvas, colorMode, HSB, background, ellipse, random, width, height,
   rect, line, text, rectMode, CENTER, mouseX, mouseY, frameRate, stroke, noFill, fill
   noStroke, keyCode, UP_ARROW, DOWN_ARROW, LEFT_ARROW, RIGHT_ARROW, collideRectCircle
   strokeWeight, textSize, collideRectRect, noLoop, createButton, loadImage, imageMode,
   image, textFont, SPACE */

let backgroundColor,
  playerSnake,
  currentApple,
  score,
  tailColor,
  button,
  gameplay;
let star, mha1, mha2, mha3;
let highscore;

function preload() {
  // images
  star = loadImage(
    "https://cdn.glitch.com/9b7cea3f-edab-44c4-b836-972d5f7a2a06%2Fstar.png?v=1610848540456"
  );
  mha1 = loadImage(
    "https://cdn.glitch.com/9b7cea3f-edab-44c4-b836-972d5f7a2a06%2Fimageedit_8_5272987749.png?v=1610856494712"
  );
  mha2 = loadImage(
    "https://cdn.glitch.com/9b7cea3f-edab-44c4-b836-972d5f7a2a06%2Fimageedit_6_6022164114.png?v=1610856494798"
  );
  mha3 = loadImage(
    "https://cdn.glitch.com/9b7cea3f-edab-44c4-b836-972d5f7a2a06%2Fimageedit_4_3060581828.png?v=1610856494891"
  );
}

function setup() {
  // canvas & color settings
  createCanvas(400, 400);
  colorMode(HSB, 360, 100, 100);
  backgroundColor = 95;
  frameRate(12);
  textFont("Verdana");
  imageMode(CENTER);

  // gameplay setup
  playerSnake = new Snake();
  currentApple = new Apple();
  score = 0;
  highscore = 0;
  tailColor = 3;
  gameplay = false;
}

// main draw function
function draw() {
  background(backgroundColor);
  image(mha1, 380, 240, 40, 100);
  image(mha2, 260, 40, 200, 90);
  image(mha3, 100, 355, 200, 90);
  displayScore();

  if (gameplay) {
    // the snake performs the following four methods:
    playerSnake.moveSelf();
    playerSnake.showSelf();
    playerSnake.checkCollisions();
    playerSnake.checkApples();

    // the apple needs fewer methods to show up on screen.
    currentApple.showSelf();
  } else {
    textSize(25);
    text("PRESS ENTER TO PLAY!", 50, height / 2);
  }
}

function startGame() {
  score = 0;
  playerSnake = new Snake();
  currentApple = new Apple();
  gameplay = true;
}

function gameOver() {
  gameplay = false;
}

// score in its own function for readability
function displayScore() {
  if (score > highscore) {
    highscore = score;
  }
  stroke(0);
  fill(0);
  strokeWeight(1);
  textSize(15);
  text(`SCORE: ${score}`, 20, 50);
  text(`HIGH SCORE: ${highscore}`, 20, 30);
}

// keyboard input
function keyPressed() {
  console.log("key pressed: ", keyCode);
  if (keyCode === ENTER) {
    startGame();
  }

  if (keyCode === UP_ARROW && playerSnake.direction != "S") {
    playerSnake.direction = "N";
  } else if (keyCode === DOWN_ARROW && playerSnake.direction != "N") {
    playerSnake.direction = "S";
  } else if (keyCode === RIGHT_ARROW && playerSnake.direction != "W") {
    playerSnake.direction = "E";
  } else if (keyCode === LEFT_ARROW && playerSnake.direction != "E") {
    playerSnake.direction = "W";
  } else {
    console.log("wrong key");
  }
}

class Snake {
  constructor() {
    this.size = 10;
    this.x = width / 2;
    this.y = height - 10;
    this.direction = "N";
    this.speed = 12;
    this.tail = [];
  }

  moveSelf() {
    if (this.tail.length > 0) {
      for (let i = this.tail.length - 1; i > 0; i--) {
        this.tail[i].x = this.tail[i - 1].x;
        this.tail[i].y = this.tail[i - 1].y;
      }
      this.tail[0].x = this.x;
      this.tail[0].y = this.y;
    }

    if (this.direction === "N") {
      this.y -= this.speed;
    } else if (this.direction === "S") {
      this.y += this.speed;
    } else if (this.direction === "E") {
      this.x += this.speed;
    } else if (this.direction === "W") {
      this.x -= this.speed;
    } else {
      console.log("Error: invalid direction");
    }
  }

  showSelf() {
    stroke(240, 100, 100);
    fill(108, 90, 100);
    rect(this.x, this.y, this.size, this.size);
    noStroke();
    for (let i = 0; i < this.tail.length; i++) {
      this.tail[i].showSelf();
    }
  }

  checkApples() {
    let hit = collideRectCircle(
      this.x,
      this.y,
      this.size,
      this.size,
      currentApple.x,
      currentApple.y,
      10
    );
    if (hit) {
      score++;
      currentApple = new Apple();
      this.extendTail();
    }
  }

  checkCollisions() {
    if (this.y > height || this.y < 0 || this.x > width || this.x < 0) {
      gameplay = false;
      gameOver();
    }
    for (let i = 0; i < this.tail.length; i++) {
      let tailSegment = this.tail[i];
      const hitOnTail = collideRectRect(
        this.x,
        this.y,
        this.size,
        this.size,
        tailSegment.x,
        tailSegment.y,
        tailSegment.size,
        tailSegment.size
      );
      if (hitOnTail) {
        gameplay = false;
        gameOver();
      }
    }
  }

  extendTail() {
    let x, y;
    if (this.tail.length === 0) {
      let x = this.x;
      let y = this.y;
    } else {
      x = this.tail[this.tail.length - 1].x;
      y = this.tail[this.tail.length - 1].y;
    }
    this.moveSelf();
    if (tailColor > 10) {
      tailColor = 0;
    } else {
      tailColor++;
    }
    this.tail.push(new TailSegment(x, y, tailColor));
  }
}

class TailSegment {
  constructor(x, y, color) {
    this.x = x;
    this.y = y;
    this.color = color;
    this.size = 10;
  }

  showSelf() {
    stroke(240, 100, 100);
    fill(this.color * 36, 90, 100);
    rect(this.x, this.y, this.size, this.size);
    noStroke();
  }
}

class Apple {
  constructor() {
    this.r = 20;
    this.x = random(30, width - 30);
    this.y = random(50, height - 30);
  }

  showSelf() {
    ellipse(this.x, this.y, 15);
    image(star, this.x, this.y, this.r, this.r);
  }
}
