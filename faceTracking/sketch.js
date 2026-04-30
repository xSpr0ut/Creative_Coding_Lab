
// variables for circle
let x, y;

// face tracking

let faceMesh;
let options = {maxFaces: 1, remindLandmarks: false,
  flipped: true
}

let video;

// array to detect points of the faces
let faces = [];

function preload() {

  faceMesh = ml5.faceMesh(options);

}

// Callback function for when faceMesh outputs data
function gotFaces(results) {

  // Save the output to the faces variable
  faces = results;

}


function setup() {
  createCanvas(640, 480);

  x = random(width);
  y = random(height);

    // Create the video and hide it
  video = createCapture(VIDEO);
  video.size(640, 480);
  video.hide();

  // start detecting faces from webcam
  faceMesh.detectStart(video, gotFaces);

}


function draw() {
  background(0);

  push();
  
  translate(width, 0);
  scale(-1, 1);
  image(video, 0, 0, width, height);

  pop();

  fill(0);
  circle(x, y, 50);

  // Draw all the tracked face points
  for (let i = 0; i < faces.length; i++) {
    let face = faces[i];
    let p1 = face.keypoints[0]; // top of lip
    let p2 = face.keypoints[17]; // bottom of lip

    fill(0, 255, 0);
    circle(p1.x, p1.y, 5);
    circle(p2.x, p2.y, 5);
    let d = dist(p1.x, p1.y, p2.x, p2.y);
    console.log(d);
    if(d > 40){

      x = lerp(x, p1.x, 0.1);
      y = lerp(y, p1.y, 0.1);

    }


    // let op = map(d, 10, 60, 0, 255);
    // background(0, op);

    

    // rectMode(CENTER);
    // fill(0);
    // rect(myPoint.x, myPoint.y, 100, 50);

    // code below for identifying points on the face

    // for (let j = 0; j < face.keypoints.length; j++) {
    //   let keypoint = face.keypoints[j];

    //   fill(0, 255, 0);
    //   noStroke();
    //   //circle(keypoint.x, keypoint.y, 5);
    //   let d = dist(mouseX, mouseY, keypoint.x, keypoint.y);
    //   if(d < 5){
    //     text(j, keypoint.x, keypoint.y);
      
    // }

    // }
  } 

} // end draw loop
