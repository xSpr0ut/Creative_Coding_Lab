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
  
  speedX = 2.5;
  x = 0;
  
  trailCircles = random(5, 11);
  circleSize = random(1, 10);
  circleColour = random(50, 100);
  wingSpeedRandom = random(10, 80);
  
  pollinatedTimer = random(450, 750);
  
  chargingPortX = width/2;
  chargingPortY = height-40;
  
}

function draw() {
  
  background(173, 238, 255);
  
  // background sky
  
  let colourTop = color(232, 251, 255);
  let colourBottom = color(146, 220, 247);
  let colourStrokeW = height/25;
  
  for(let a=0; a<height+colourStrokeW; a+=colourStrokeW){
    
    let amt = map(a, 0, height, 0, 1);
    let newColour = lerpColor(colourTop, colourBottom, amt);
    
    stroke(newColour);
    strokeWeight(colourStrokeW);
    line(0, a, width, a);
    
  }
  
    // background grass
  
  let lineDist = 1;
  
  for(let i=0; i<width; i += lineDist){
    
    
    // distance of mouse to grass
    let grassHeight = height*noise(i);
    let d2 = dist(mouseX, mouseY, i, grassHeight);
    let maxDistance = 400;
    let dBee1 = dist(x, y, i, grassHeight);
    let shrinkFactor = constrain(d2 / maxDistance, 0, 1);
    // let grassHeight = height*noise(i)*shrinkFactor;
    
    // wave effect
    let waveFactor = map(dBee1, 0, 75, 1, 0); 
    waveFactor = constrain(waveFactor, 0, 1);
    let waveOffset = sin(i * 0.4 + frameCount * 0.5) * 20 * waveFactor;
      
    stroke(57, 107, 66);
    strokeWeight(5*noise(i));
    line(i, height, i + waveOffset, grassHeight*shrinkFactor); 
    // line(i, height, i, grassHeight);
    
  }
  
      // background lighter grass
  
  let lineDist2 = 4;
  
  for(let i=0; i<width; i += lineDist2){
    
    let grassHeight = height*noise(i);
    // distance of mouse to grass
    let d = dist(mouseX, mouseY, i, grassHeight);
    let dBee2 = dist(x, y, i, grassHeight);
    let maxDistance = 400;
    let shrinkFactor = constrain(d / maxDistance, 0, 1);
    
    
    // wave movement code
    let waveFactor = map(dBee2, 0, 150, 1, 0); 
    waveFactor = constrain(waveFactor, 0, 1);
    let waveOffset = sin(i * 0.4 + frameCount * 0.5) * 20 * waveFactor;
      
    stroke(113, 189, 127);
    strokeWeight(4*noise(i));
    line(i, height, i + waveOffset, grassHeight*shrinkFactor);
    
  }
  
  // small white flowers
  let flowerAmt = 12;
  
  randomSeed(flowerAmt);
  
  for (let j=0; j<flowerAmt; j++){
    
    // let flowerY = height*noise(j*10);
    let flowerY = noise(j * 50) * (height - height/2) + height/2;
    //flowerY =  map(flowerY, 0, height, height/2, height);
    // let flowerX = width*noise(j*10+1000);
    let flowerX = random(width);
    let flowerSize = 20;
    // mouse distance calculating
    let d = dist(mouseX, mouseY, flowerX, flowerY);
    // let maxDistance = 100;
    // let shrinkFactor = constrain(d / maxDistance, 0, 1);
     let shrinkFactor = map(d, 0, 400, 1.5,0);
    let flowerGrowth = map(d, 0, 400, 3, 1);
    if(d>300){
       shrinkFactor = 0;
       }
    
    // flower y spawn ranges
    let maxRaise = 50 + noise(j * 100) * 100;  // Between 50-150
    let flowerHeight = flowerY - maxRaise * shrinkFactor;
    
    // let flowerHeight = flowerY-flowerY*shrinkFactor;
    // let flowerYRange = map(flowerHeight, 0, height, height/2, height);
    
    fill('white');
    noStroke();
    circle(flowerX, flowerHeight, flowerSize*(flowerGrowth));
      
    
  }
  


  
  
  
  // # charger core
  
  push();
  rectMode(CENTER);
  colorMode(HSB);
  noStroke();

  // bigger behind pentagon
  let r1 = 45; 
  beginShape();
  fill('black');
  for (let i = 0; i < 5; i++) {
    let angle = (Math.PI * 2 / 5) * i - Math.PI / 2; 
    let x = chargingPortX + Math.cos(angle) * r1;
    let y = chargingPortY + Math.sin(angle) * r1;
    vertex(x, y);
  }
  endShape(CLOSE);
  
  // Draw pentagon centered at chargingPortX, chargingPortY
  // CHANGING COLOUR PENTAGON
    fill(chargingColour, 100, 100);
  let r2 = 40; 
  beginShape();
  for (let i = 0; i < 5; i++) {
    let angle = (Math.PI * 2 / 5) * i - Math.PI / 2; 
    let x = chargingPortX + Math.cos(angle) * r2;
    let y = chargingPortY + Math.sin(angle) * r2;
    vertex(x, y);
  }
  endShape(CLOSE);

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
    
    if(frameCount%100 == 0){
      pollinating = false;
      hasPollinated = true;
      beeHSBHue -= 60;
    }
    
    
  } else {

    
    if(hasPollinated == true) {
      // Gradually transition back to normal movements by lerping
      // R = map(sin(frameCount), -1, 1, 50, 100);
      R = map(sin(frameCount), -1, 1, 50, 200);   
      let targetY = height/6 + R*sin(frameCount);
      y = lerp(y, targetY, 0.05);  
    } else {
      // Normal bobbing
      // R = map(sin(frameCount), -1, 1, 50, 100);
      
      R = map(sin(frameCount), -1, 1, 50, 200);
      y = height/6 + R*sin(frameCount);
      // y = height/3 + R * sin(frameCount + noise(frameCount * 0.5) * 10);
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


// outside of draw function now

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

  
function drawFlower() {
  let numPetals = 6;
  let petalDist = 28;
  let petalSize = 45;
  
  // used to make sure flower x and y never go
  // outside of the sreen / disappear
  let fx = constrain(mouseX, petalDist, width - petalDist);
  let fy = constrain(mouseY, petalDist, height - petalDist);

  noStroke();

  // Draw petals in a loop
  for (let i = 0; i < numPetals; i++) {
    let angle = (Math.PI * 2 / numPetals) * i;
    let px = fx + Math.cos(angle) * petalDist;
    let py = fy + Math.sin(angle) * petalDist;
    fill(255, 150, 180);
    circle(px, py, petalSize);
  }

  // Draw center on top
  fill(255, 220, 80);
  circle(fx, fy, 22);

}



