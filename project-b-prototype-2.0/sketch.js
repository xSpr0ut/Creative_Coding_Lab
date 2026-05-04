
let o = [];
let numO = 150;
let player1;
let player2;

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

  player1 = new Player(width - 100, height - 100);
  player2 = new Player2(100, 100);

  video = createCapture(VIDEO);
  video.size(600, 800);
  video.hide();
  faceMesh.detectStart(video, gotFaces);

  // hand tracking code
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
  background(0);

  //console.log("level: " + level);

  // let a = new Obstacles();
  // a.display();

  // number of balls depends on level
  //numO = numO + (level * 20);

  for (let i = 0; i < numO; i++) {
    o[i].display();
    o[i].update(o);
  }

  player1.display();
  player1.update();
  player1.collide(o);
  player1.shout(o);

  player2.display();
  player2.update();
  player2.collide(o);
  player2.shout(o);

  // -----------------------------------------------------------------------

  // HAND TRACKING MOVEMENT CODE
  push();
  translate(width, 0);
  scale(-1, 1);
  // image(video, 0, 0, width, height);

  for (let i = 0; i < hands.length; i++) {
    let hand = hands[i];
    // Draw all the tracked hand points
    // p1[i] = hand.keypoints[20];
    p1[i] = hand.keypoints[12];
    // text(i, p1[i].x, p1[i].y);

    if (p_p1[i] != undefined) {
      //this difference will only work for swiping on one direction with right hand
      // negative number but flipped to positive with push
      dif[i] = p1[i].x - p_p1[i].x;
      difY[i] = p1[i].y - p_p1[i].y;
      //just for reference
      strokeWeight(10);
      line(p1[i].x, p1[i].y, p_p1[i].x, p_p1[i].y);
    }

    if (dif[0] > 100) {
      player1.p1MoveRight = true;
    } else if (dif[0] < -100) {
      player1.p1MoveLeft = true;
    }
    // textSize(30);
    // text(int(difY[0]), p1[0].x, p1[0].y);
    if (difY[0] > 100) {
      player1.p1MoveDown = true;
    } else if (difY[0] < -100) {
      player1.p1MoveUp = true;
    }

    if (player1.p1MoveRight == true) {
      player1.moveRight();
    } else if (player1.p1MoveLeft == true) {
      player1.moveLeft();
    } else if (player1.p1MoveUp == true) {
      player1.moveUp();
    } else if (player1.p1MoveDown == true) {
      player1.moveDown();

    }

    // Player2 only moves when two faces are detected
    // Controlled by hand 1 (SECOND HAND IN THE ARRAY!!!!)
    if (faces.length == 2) {

      if (dif[1] > 100) {
        player2.p2MoveRight = true;
      } else if (dif[1] < -100) {
        player2.p2MoveLeft = true;
      }

      if (difY[1] > 30) {
        player2.p2MoveDown = true;
      } else if (difY[1] < -30) {
        player2.p2MoveUp = true;
      }

      if (player2.p2MoveRight == true) {
        player2.moveRight();
      } else if (player2.p2MoveLeft == true) {
        player2.moveLeft();
      } else if (player2.p2MoveUp == true) {
        player2.moveUp();
      } else if (player2.p2MoveDown == true) {
        player2.moveDown();
      }



      // if (dif[1] > 100) {
      //     player2.moveRight();
      //     dif[1] = 0;
      // } else if (dif[1] < -100) {
      //     player2.moveLeft();
      //     dif[1] = 0;
      // }
      // if (difY[1] > 100) {
      //     player2.moveDown();
      // } else if (difY[1] < -100) {
      //     player2.moveUp();
      // }
    }

    // //if the hand is moved fast
    // if(dif > 100){
    //   doSomething =!doSomething;
    // }
    // if(doSomething){
    //   background(0, 255);
    // }else{
    //   background(0, 0);
    // }
    console.log(dif[0]);
    // for (let j = 0; j < hand.keypoints.length; j++) {
    //   let keypoint = hand.keypoints[j];
    //   fill(0, 255, 0);
    //   noStroke();
    //   text(j, keypoint.x, keypoint.y)
    //   //circle(keypoint.x, keypoint.y, 10);
    // }
    p_p1[i] = p1[i];
  }
  pop();

  // code to show camera
  // image(video, 0, 0, width, height);

  // code to SHOW face mesh
  // // FACE STUFF
  //  for (let i = 0; i < faces.length; i++) {
  //   let face = faces[i];
  //   for (let j = 0; j < face.keypoints.length; j++) {
  //     let keypoint = face.keypoints[j];
  //     fill(0, 255, 0);
  //     noStroke();
  //     circle(keypoint.x, keypoint.y, 5);
  //   }
  // }



  // code to show hand mesh
  // Draw all the tracked hand points

  // push();
  // translate(width, 0);
  // scale(-1, 1);
  // image(video, 0, 0, width, height);
  // for (let i = 0; i < hands.length; i++) {
  //   let hand = hands[i];
  //   for (let j = 0; j < hand.keypoints.length; j++) {
  //     let keypoint = hand.keypoints[j];
  //     fill(0, 255, 0);
  //     noStroke();
  //     circle(keypoint.x, keypoint.y, 10);
  //   }
  // }

  // pop();

  // console.log(faces.length);

  checkPlayerCollision();
    if (level >= 1) {
      textbox1.update();
      textbox1.display();
    }

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
  let dx = player1.x - player2.x;
  let dy = player1.y - player2.y;
  // might hve t so this casuse it's in here and not the player
  // CAN NOT USE this.other because there's no other here
  // DO NOT TOUCHHHHHHHHHHHHHHHHHHH WILL CAUSE BALLS TO FREEZE
  let dist = sqrt(dx * dx + dy * dy);
  let minDist = (player1.s / 2) + (player2.s / 2);

  // display textbox if close

  if (dist < minDist && playersCollided == false) {
    playersCollided = true;
    
// updating levels here!! ------------
    if (level < 7) {
      level++;
      // numO = (level * 20);
      // for (let i = 0; i < numO; i++) {
      //   o.push(new Obstacles());
      // }
    } else {
      level = 1;
    }

    textbox1 = new textbox(level);
    player1.respawn();
    player2.respawn();
  }

  if (dist >= minDist) {
    playersCollided = false;
  }
}




// let handPose;
// let video;
// let hands = [];
// let options = { maxHands: 2, flipped: false };

// let x = 300;
// let y = 300;
// let speedX = 20;
// let speedY = 3;

// let dif = [];
// let p1 = [];
// let p_p1 = [];
// let doSomething = [];

// function preload() {
//   handPose = ml5.handPose(options);
// }
// // Callback function for when handPose outputs data
// function gotHands(results) {
//   // Save the output to the hands variable
//   hands = results;
// }
// function setup() {
//   createCanvas(640, 480);
//   // Create the video and hide it
//   video = createCapture(VIDEO);
//   video.size(640, 480);
//   video.hide();

//   // Start detecting hands from the webcam video
//   handPose.detectStart(video, gotHands);

//   osc = new p5.TriOsc();
//   envelope = new p5.Env();
//   envelope.setADSR(0.001, 0.5, 0.1, 0.5);
//   envelope.setRange(1, 0);

//   for (let i = 0; i < hands.length; i++) {
//     dif[i] = 0;
//     doSomething[i] = false;
//   }
// }

// function draw() {
//   background(255, 50);
//   push();
//   translate(width, 0);
//   scale(-1, 1);
//   image(video, 0, 0, width, height);

//   for (let i = 0; i < hands.length; i++) {
//     let hand = hands[i];
//     // Draw all the tracked hand points
//     p1[i] = hand.keypoints[20];

//     if (p_p1[i] != undefined) {
//       //this difference will only work for swiping on one direction with right hand
//       // negative number but flipped to positive with push
//       dif[i] = p1[i].x - p_p1[i].x;
//       //just for reference
//       strokeWeight(10);
//       line(p1[i].x, p1[i].y, p_p1[i].x, p_p1[i].y);
//     }

//     if (dif[0] > 100) {
//      moveRight();
//     }else if(dif[0] < -100){
//       moveLeft();
//     }

//     // //if the hand is moved fast
//     // if(dif > 100){
//     //   doSomething =!doSomething;
//     // }
//     // if(doSomething){
//     //   background(0, 255);
//     // }else{
//     //   background(0, 0);
//     // }
//     console.log(dif[0]);
//     // for (let j = 0; j < hand.keypoints.length; j++) {
//     //   let keypoint = hand.keypoints[j];
//     //   fill(0, 255, 0);
//     //   noStroke();
//     //   text(j, keypoint.x, keypoint.y)
//     //   //circle(keypoint.x, keypoint.y, 10);
//     // }
//     p_p1[i] = p1[i];
//   }
//   pop();

//   circle(x, y, 50);
// }

// function moveRight(){
//   x -= speedX;
// }
// function moveLeft(){
//   x += speedX;
// }