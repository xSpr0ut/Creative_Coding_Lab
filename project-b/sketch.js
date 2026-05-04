
let o = [];
let numO = 10;
// let player1;
// let player2;
let players = [];


// FACE CAM TRACKING
let faceMesh;
let video;
let faces = [];

// HAND TRACKING
let handPose;
let hands = [];
let osc;
let envelope;

// textbox and levels
let level = 0;
let textbox1;

// faces.length to track number of faces
let options = { maxFaces: 2, refineLandmarks: false, flipped: false };

// hands.length to track number of hands
let options2 = { maxHands: 2, flipped: false };


// hand tracking movement code
let dif = [];
let difY = [];
let p1 = [];
let p_p1 = [];

// player collision
let playersCollided;

function preload() {

  faceMesh = ml5.faceMesh(options);
  handPose = ml5.handPose(options2);

}

function setup() {
  //  / createCanvas(600, 800);
  let w = 600 * windowHeight / 800;
  let canvas = createCanvas(w, windowHeight);
  canvas.id("p5-canvas");
  canvas.parent("p5-canvas-container");

  userStartAudio();

  for (let i = 0; i < numO; i++) {
    o.push(new Obstacles());
  }

  //player 1
  players.push(new Players(random(width), random(height), color(255, 224, 74)));
  //player 2
  players.push(new Players(random(width), random(height), color(0, 196, 35)));
  //set up initial values
  for (let i = 0; i < 2; i++) {
    dif[i] = 0;
    difY[i] = 0;
  }
  // Create the video and hide it
  video = createCapture(VIDEO);
  video.size(640, 480);
  video.hide();

  // Start detecting hands from the webcam video
  handPose.detectStart(video, gotHands);

  osc = new p5.TriOsc();
  envelope = new p5.Env();
  envelope.setADSR(0.001, 0.5, 0.1, 0.5);
  envelope.setRange(1, 0);


  // collision
  playersCollided = false;

  // saving the difference in distance for each hand
  for (let i = 0; i < hands.length; i++) {
    dif[i] = 0;
    // doSomething[i] = false;
  }


  // textbox creation
  textbox1 = new textbox(level);

  // number of balls depends on level
  numO = numO + (level * 20);

}


function draw() {
  background(100);

  //console.log("level: " + level);

  // let a = new Obstacles();
  // a.display();

  // number of balls depends on level
  //numO = numO + (level * 20);

  for (let i = 0; i < numO; i++) {
    o[i].display();
    o[i].update(o);
  }


  //background(0);
  push();
  translate(width, 0);
  scale(-1, 1);
  // image(video, 0, 0, width, height);
  // pop();
  for (let i = 0; i < hands.length; i++) {
    let hand = hands[i];
    // Draw all the tracked hand points
    p1[i] = hand.keypoints[20];
    if (p_p1[i] != undefined) {
      //this difference will only work for swiping on one direction with right hand
      dif[i] = p_p1[i].x - p1[i].x;
      difY[i] = p1[i].y - p_p1[i].y;
      //just for reference
      //textSize(20);
      push();
      translate(p1[i].x, p1[i].y);
      scale(-1, 1);
      fill(players[i].c);
      text("player" + (i + 1), 0, 0);
      pop();
    }

    p_p1[i] = p1[i];
  } //end hands for loop


  //players

  players[0].display();
  // players[0].update();
  players[0].collide(o);
  players[0].shout(o);

  players[1].display();
  // players[1].update();
  players[1].collide(o);
  players[1].shout(o);

  for (let i = 0; i < players.length; i++) {
    // if the hand is moved fast
    if (dif[i] > 100) {
      players[i].moveLeft = true;
      console.log("left");
    } else if (dif[i] < -100) {
      players[i].moveRight = true;
      console.log("right");
    }
    if (difY[i] > 100) {
      players[i].moveUp = true;
      console.log("up");
    } else if (difY[i] < -100) {
      players[i].moveDown = true;
      console.log("down");
    }
    if (players[i].moveLeft == true) {
      players[i].updateLeft();
    }
    if (players[i].moveRight == true) {
      players[i].updateRight();
    }
    if (players[i].moveUp == true) {
      players[i].updateUp();
    }
    if (players[i].moveDown == true) {
      players[i].updateDown();
    }
    players[i].display();
  }
  pop();

  //keyboard movements

  // arrow key movement
  if (keyIsDown(LEFT_ARROW)) {
    players[0].left();
  }

  if (keyIsDown(RIGHT_ARROW)) {
    players[0].right();
  }

  if (keyIsDown(UP_ARROW)) {
    players[0].up();
  }

  if (keyIsDown(DOWN_ARROW)) {
    players[0].down();
  }

  // arrow key movement
  if (keyIsDown(65)) {
    players[1].left();
  }

  if (keyIsDown(68)) {
    players[1].right();
  }

  if (keyIsDown(87)) {
    players[1].up();
  }

  if (keyIsDown(83)) {
    players[1].down();
  }


    console.log(dif[0]);

  }
  // pop();


  checkPlayerCollision();
    if (level >= 1) {
      textbox1.update();
      textbox1.display();
    }


function gotFaces(results) {
  // Save the output to the faces variable
  faces = results;
}

// Callback function for when handPose outputs data
function gotHands(results) {
  // Save the output to the hands variable
  hands = results;
}

function checkPlayerCollision() {

  // to avoid function running when less than 2 players
  if (players.length < 2){
    return;
  }

  let dx = players[0].x - players[1].x;
  let dy = players[0].y - players[1].y;
  // might hve t so this casuse it's in here and not the player
  // CAN NOT USE this.other because there's no other here
  // DO NOT TOUCHHHHHHHHHHHHHHHHHHH WILL CAUSE BALLS TO FREEZE
  let dist = sqrt(dx * dx + dy * dy);
  let minDist = (players[0].s / 2) + (players[1].s / 2);

  // display textbox if close

  if (dist < minDist && playersCollided == false) {
    playersCollided = true;
    
// updating levels here!! ------------
    if (level < 7) {
      level++;
      numO = (level * 20);
      for (let i = 0; i < numO; i++) {
        o.push(new Obstacles());
      }
    } else {
      level = 0;
    }

    textbox1 = new textbox(level);
    players[0].respawn();
    players[1].respawn();
  }

  if (dist >= minDist) {
    playersCollided = false;
  }
}

