/*
Template for IMA's Creative Coding Lab 

Project A: Generative Creatures
CCLaboratories Biodiversity Atlas 

    let canvas = createCanvas(800, 500);
    canvas.id("p5-canvas");
    canvas.parent("p5-canvas-container");
*/


let x = 0;
let y = 0;
let R;
let speedX = 1;

let trailCircles;
let circleSize;
let circleColour;
let wingSpeedRandom;


// to track bee's flower pollinating
let pollinating = false;
let hasPollinated = false;
// setting a timer
let pollinatedTimer;

// bee battery power shown through colour
let beeHSBHue = 110;

// charging port set up
let chargingPortX;
let chargingPortY;
let chargingColour = 0;
// charging timer
let chargingTimer = 450;


function setup() {
let canvas = createCanvas(800, 500);
canvas.id("p5-canvas");
canvas.parent("p5-canvas-container");
  
  trailCircles = random(5, 11);
  circleSize = random(1, 10);
  circleColour = random(50, 100);
  wingSpeedRandom = random(10, 80);
  
  pollinatedTimer = random(450, 750);
  
  chargingPortX = width/2;
  chargingPortY = height/2;
  
  
}

function draw() {
  background(173, 238, 255);
  push();
  rectMode(CENTER);
  colorMode(HSB)
  fill(chargingColour, 100, 100);
  rect(chargingPortX, chargingPortY, 75, 75);
  pop();
  
   // Calculate distance from bee to flower (mouse)
  let d = dist(x, y, mouseX, mouseY);
  let dCharge = dist(x, y, chargingPortX, chargingPortY);
  
  // this section is looking at charging
  
  if(dCharge < 30 && beeHSBHue <30){
    
    x += random(-4, 4);
    y += random(-4, 4);
    chargingTimer-=1;
    // charging colour rate
    chargingColour += 0.2;
    if(beeHSBHue < 100 && chargingTimer == 0){
      beeHSBHue = 110;
      chargingTimer = 450;
      chargingColour = 0;
    }
    
  } else if(beeHSBHue <30){
    
    // atan2 calculates the angle from one point to another
    let angle = atan2(chargingPortY - y, chargingPortX - x);  // Angle toward chargingPort
    x += cos(angle) * speedX;
    y += sin(angle) * speedX;
    
  }
  
  // If bee is near flower, head towards it AND bee has battery
  else if(d < 300 && d > 60 && hasPollinated == false && beeHSBHue > 30) {  
    let angle = atan2(mouseY - y, mouseX - x);  // Angle toward flower
    x += cos(angle) * speedX;
    y += sin(angle) * speedX;
  } else if(d < 60 && hasPollinated == false && beeHSBHue > 30) {  
    // let angle = atan2(mouseY - y, mouseX - x);  // Angle toward flower
    // x += cos(angle) * speedX;
    // y += sin(angle) * speedX;
    pollinating = true;
    
    if(pollinating == true){
      // jittering to show collecting pollen
      x += random(-4, 4);
      y += random(-4, 4);
    }
    
    if(frameCount%150 == 0){
      pollinating = false;
      hasPollinated = true;
      beeHSBHue -= 60;
    }
    
    
  } else {

    
    if(hasPollinated == true) {
      // Gradually transition back to normal movements by lerping
      R = map(sin(frameCount), -1, 1, 50, 100);
      let targetY = height/6 + R*sin(frameCount);
      y = lerp(y, targetY, 0.05);  
    } else {
      // Normal bobbing
      R = map(sin(frameCount), -1, 1, 50, 100);
      y = height/6 + R*sin(frameCount);
    }
  
    // horizontal movement is always this
  x = x + speedX;
  
  
  if(hasPollinated == true){
    
    pollinatedTimer-=1;
    
    if(pollinatedTimer <= 0){
      hasPollinated = false;
      pollinatedTimer = random(450, 750);
    }
    
  }
  
  // checking hassPollinated print
  console.log(hasPollinated);
  
  // to ensure x doesn't go out of bounds
    
  if(x > width) {
    x = 0;
  }


  }

  drawFlower();
  drawCreature(x, y);
  
  
}

function drawCreature(x, y) {

  drawWings(x, y);
  drawBody(x, y);
  drawAntenna(x, y);
  drawTrail(x, y);
  
  //arc(x+10, y-10, 100, 105, 0, PI/2);
  
}



function drawBody(x, y){
  
  push();
  translate(x, y);
  
  colorMode(HSB);
  
  fill('black');
  let beeRings = 30;
  for(let a=0; a<beeRings; a+=5){
    
    if(a%2==0){
      fill(beeHSBHue, 100, 100);
      circle(a+5, 0, 30);
    } else if (a%2 == 1){
      fill('black');
      circle(a+5, 0, 30);
    }
    
    
  }


  pop();
}


function drawAntenna(x, y){
  
  push();
  translate(x, y);
  
  noFill();
  stroke('black');
  strokeWeight(2);
  angleMode(DEGREES);
  arc(80, -10, 80, 40, 180, 210);
  arc(60, -10, 80, 50, 180, 210);
  
  pop();
  
}

function drawWings(x, y){
  
  push();
  translate(x, y);
  
  fill(255);
  
  let wingAngle = sin(frameCount*5) * wingSpeedRandom; 
  
  if(frameCount%120==0){
    wingSpeedRandom = random(10, 80);
  }
  
  // front wing
  push();
  // "flaps" wings
  rotate(wingAngle);
  beginShape();
  curveVertex(10, -5);   // start
  curveVertex(10, -5);   
  curveVertex(-5, -20);
  curveVertex(-10, -35);
  curveVertex(-8, -50);  // Tip of wing
  curveVertex(5, -40);
  curveVertex(10, -25);
  curveVertex(10, -5);   
  curveVertex(10, -5);   // end
  endShape();
  pop();
  
  //back wing
  push();
  rotate(-wingAngle);
  beginShape();
  curveVertex(15, -5);   // start
  curveVertex(15, -5);   
  curveVertex(30, -20);   
  curveVertex(35, -35);   
  curveVertex(33, -50);   // tip of wing
  curveVertex(20, -40);   
  curveVertex(15, -25);
  curveVertex(15, -5);   
  curveVertex(15, -5);   // end
  endShape();
  pop();

  
  pop();
  
}

function drawTrail(x, y) {

  noStroke();
  
  let spacing = 15;
  
  push();
  
  colorMode(HSB);
  // change colours every 10 frames
  if(frameCount%120 == 0){
    circleColour = random(50, 100);
    circleSize = random(1, 10);
  }
  
  translate(x, y);
  
  
  fill(circleColour);
  
  for(let i = 0; i < trailCircles; i++) {
    let trailX = - (i + 1) * spacing;
    // makes the trail move up down randomly with noise
    let trailY = (noise(frameCount * 0.1 + i) - 0.5) * 30; 
    circle(trailX, trailY, circleSize);
  }
  
  pop();
  
}

function drawFlower(){
  
  noStroke();
  fill(255, 181, 196);
  circle(mouseX, mouseY, 100);
  fill(255, 231, 135);
  circle(mouseX, mouseY, 25);
  
  if(mouseX > width){
    mouseX = width-1;
  } else if(mouseX < 0){
    mouseX = 1;
  }
  
  if(mouseY > height){
    mouseY = height-1;
  } if(mouseY < 0){
    mouseY = 1;
  }
  
  
}
