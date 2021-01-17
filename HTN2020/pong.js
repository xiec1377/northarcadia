var xBallChange = 5;
var yBallChange = 5;
var xBall = Math.floor(Math.random() * 300) + 50;
var yBall = 50;
var diameter = 50;

var xPaddle1 = 0;
var yPaddle1 = 0;
var paddleWidth1 = 25;
var paddleHeight1 = 100;
var started1 = false;

var xPaddle2 = 0;
var yPaddle2 = 0;
var paddleWidth2 = 25;
var paddleHeight2 = 100;
var started2 = false;

var left = true;
var right = true;

var score = 0;

function setup() {
  createCanvas(700, 700);
}

function draw() {
  background(0);
  
  fill(250, 250, 250);
  noStroke();
  ellipse(xBall, yBall, diameter, diameter);
  
  fill(250, 250, 250);
  noStroke();
  rect(xPaddle1, yPaddle1, paddleWidth1, paddleHeight1);
  
  fill(250, 250, 250);
  noStroke();
  rect(xPaddle2, yPaddle2, paddleWidth2, paddleHeight2);
  
  xBall += xBallChange;
  yBall += yBallChange;
  
if (!started1) {
  xPaddle1 = 700 - 50;
  yPaddle1 = 700/2;
  started1 = true;
}

if (!started2) {
  xPaddle2 = 700 - (700 - 50);
  yPaddle2 = 700/2;
  started2 = true;
}
  
// When the ball hits the sides
  if (xBall < diameter/2 || xBall > 700 - 0.5*diameter) {
  xBallChange *= -1;
    
}
if (yBall < diameter/2 || yBall > 700 - diameter) {
  yBallChange *= -1;
}

// When the ball hits the paddles

  // Right Paddle
  if ((xBall > xPaddle1) && (xBall < xPaddle1 + paddleWidth1) &&
      (yBall + (diameter/2) > yPaddle1)) {
  xBallChange *= -1;
  yBallChange *= -1;

     right = false;
    left = true;
    score++;
  }

  // Left Paddle
  if ((xBall > xPaddle2) && (xBall < xPaddle2 + paddleWidth2) &&
      (yBall + (diameter/2) > yPaddle2)) {
  xBallChange *= -1;
  yBallChange *= -1;
    
    right = true;
    left = false;
    score++;
  }

//Stops the ball as it hits the edge and misses a paddle
if (xBall - (diameter/2) > 750){
    xBallChange *=0;
  yBallChange *= 0;
  gameOver();
  
  } else if (xBall + (diameter/2) < 50 ){
    xBallChange *= 0;
    yBallChange *= 0;
    gameOver();
  }
  displayScores();
}

function keyPressed() {
  if (keyCode === RIGHT_ARROW && right) {
    yPaddle1 -= 50;
  } else if (keyCode === LEFT_ARROW && right) {
    yPaddle1 += 50;
  } else if (keyCode === LEFT_ARROW && left) {
    yPaddle2 -= 50;
  } else if (keyCode === RIGHT_ARROW && left) {
    yPaddle2 += 50;
  }
}

function displayScores() {
  textSize(20);
  fill(250);
  // Display Score
text(`Score: ${score}`, 10, 40);
}

function gameOver(){
  fill("white");
  rect(0,0,width,height);
  fill("black");
  textSize(30);
  text("GAME OVER!",250,350); 
  text(`Your Score: ${score}`,250,380);
  text(`Click anywhere to play again.`,160,410);
}

function mouseClicked()
{
  score = 0;
  xBall = Math.floor(Math.random() * 300) + 50;
  yBall = 50;
  xBallChange = 5;
  yBallChange = 5;
}
