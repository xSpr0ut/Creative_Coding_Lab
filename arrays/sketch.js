
// let x;
// let y;
// let speedX, s;
// let x2, y2, s2, speedX2;

let x = [];
let y = [];
let s = [];
let speedX = [];

let n = 4; // number of clouds

function setup() {
  createCanvas(400, 400);

  // set up variables
  // x[0] = 0;
  // y[0] = random(height);
  // s[0] = random(0.5, 2);

  // // changes speed depending on cloud size
  // speedX[0] = map(s, 0.5, 2, 5, 0.5);

  // // cloud 2
  // x[1] = 0;
  // y[1] = random(height);
  // s[1] = random(0.5, 2);

  // // changes speed depending on cloud size
  // speedX[1] = map(s, 0.5, 2, 5, 0.5);

  for(let i=0; i<n; i++){
    x[i] = 0;
    y[i] = random(height);
    s[i] = random(0.5, 2);

    // changes speed depending on cloud size
    speedX[i] = map(s, 0.5, 2, 5, 0.5);

    

  }

}

function mousePressed(){
  x.push(mouseX);
  y.push(mouseY);
  s.push(random(0.5, 2));
  let index = x.length - 1;
  speedX.push(map(s[index], 0.5, 2, 5, 0.5));
}

function draw() {
  background(220);

  for(let i=0; i<x.length; i++){

    drawCloud(x[i], y[i], s[i]);

    x[i] += speedX[i];
    y[i] = y[i] + map (sin(frameCount * 0.1), -1, 1, -5*s[i], 5*s[i]);

    if(x[i] > width * 1.2){
    // x[i] = -50;
      x.splice(i, 1);
      y.splice(i, 1);
      s.splice(i, 1);
      speedX.splice(i, 1);
    }


  }

  // draw the cloud
  // drawCloud(x[0], y[0], s[0]);
  // drawCloud(x[1], y[1], s[1]);

  // updating movement variables
  // x[0] += speedX[0];
  // y[0] = y[0] + map (sin(frameCount * 0.1), -1, 1, -5*s[0], 5*s[0]);
  // x[1] += speedX[1];
  // y[1] = y[1] + map (sin(frameCount * 0.1), -1, 1, -5*s[1], 5*s[1]);

  // if(x[0] > width * 1.2){
  //   x[0] = -50;
  // }

  // if(x[1] > width * 1.2){
  //   x[1] = -50;
  // }


}

function drawCloud(x, y, s) {
  push();
  translate(x, y);
//swing
  let angle = map(sin(frameCount * 0.05), -1, 1, PI / 4, -PI / 4)
  rotate(angle);
//size
  scale(s);
  drawArms();
  noStroke();
//body
  fill(255);
  circle(0, 0, 100);
//around body
  for (let angle = 0; angle < 2 * PI; angle += PI / 5) {
    push();
    rotate(angle);
    fill(255);
    circle(100 / 2 - 8, 0, 30);
    pop();
  }
  drawFace();
  pop();

}
function drawArms() {
  //arms
  beginShape();
  let lineLength2 = 70;
  noFill();
  for (let i = -lineLength2; i <= lineLength2; i += lineLength2 / 10) {
    strokeWeight(10);
    let v = 10 * sin(frameCount * 0.1 - i);
    vertex(i, v);
  }
  endShape();
}

function drawFace() {
  //face
  fill(0);
  circle(0 - 30, 0, 5);
  circle(0 + 30, 0, 5);
  arc(0, 0, 30, 30, 0, PI);
}
