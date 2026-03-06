
let x;
let y;

let speedX;

function setup() {
  let canvas = createCanvas(800, 500);
  canvas.parent("p5-canvas-container");
  speedX = 2.5;
  x = 0;
  
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
    let d = dist(mouseX, mouseY, i, grassHeight);
    let maxDistance = 400;
    let shrinkFactor = constrain(d / maxDistance, 0, 1);
    // let grassHeight = height*noise(i)*shrinkFactor;
    
    // wave effect
    let waveFactor = map(d, 0, 75, 1, 0); 
    waveFactor = constrain(waveFactor, 0, 1);
    let waveOffset = sin(i * 0.1 + frameCount * 0.1) * 20 * waveFactor;
      
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
    let maxDistance = 400;
    let shrinkFactor = constrain(d / maxDistance, 0, 1);
    
    
    // wave movement code
    let waveFactor = map(d, 0, 150, 1, 0); 
    waveFactor = constrain(waveFactor, 0, 1);
    let waveOffset = sin(i * 0.1 + frameCount * 0.1) * 20 * waveFactor;
      
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
  
  
  fill('black');
  stroke(5);
  
  x = x + speedX;
  
  let R = map(sin(frameCount*0.2), -1, 1, 70, 100);
  
  y = height/2 + R*sin(frameCount * 0.05);
  
 // console.log(x);
  
  circle(x, y, 25);
  
  fill(65, 176, 65);
  circle(x-5, y, 30);
  fill('black');
  circle(x-10, y, 30);
  fill(65, 176, 65);
  circle(x-15, y, 30);
  fill('black');
  circle(x-20, y, 30);
  fill(65, 176, 65);
  circle(x-25, y, 30);
  fill('black');
  circle(x-27, y, 25);

  
  if(x > width){
    x = 0;
  }


  noStroke();
  fill(255, 181, 196);
  circle(mouseX, mouseY, 100);
  fill(255, 231, 135);
  circle(mouseX, mouseY, 25);
  
  
  
  
}