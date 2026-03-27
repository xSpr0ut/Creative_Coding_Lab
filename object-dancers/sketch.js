/*
  Check our the GOAL and the RULES of this exercise at the bottom of this file.
  
  After that, follow these steps before you start coding:

  1. rename the dancer class to reflect your name (line 35).
  2. adjust line 20 to reflect your dancer's name, too.
  3. run the code and see if a square (your dancer) appears on the canvas.
  4. start coding your dancer inside the class that has been prepared for you.
  5. have fun.
*/

let dancer;

function setup() {
  // no adjustments in the setup function needed...
  let canvas = createCanvas(windowWidth, windowHeight);
  canvas.parent("p5-canvas-container");

  // ...except to adjust the dancer's name on the next line:
  dancer = new JoellaDancer(width / 2, height / 2);
}

function draw() {
  // you don't need to make any adjustments inside the draw loop
  background(0);
  drawFloor(); // for reference only

  dancer.update();
  dancer.display();
}

// You only code inside this class.
// Start by giving the dancer your name, e.g. LeonDancer.
class JoellaDancer {
  constructor(startX, startY) {
    this.x = startX;
    this.y = startY;
    // wing attributes
    this.leftWingX = 0;
    this.leftWingY = 0;
    this.rightWingX = 0;
    this.rightWingY = 0;
    // attenna
    this.antennaLeftAngle = -PI / 4;
    this.antennaRightAngle = -(3 * PI / 4); 
    this.antennaLength = 25;

    // wing flap angle
    this.leftWingAngle = 0;
    this.rightWingAngle = 0;
    this.wingSpeed = 0.04;

    //movement code
    this.bounceY = 0;
    this.legKick = 0;
      
    // add properties for your dancer here:
    //..
    //..
    //..
  }
  update() {
    // update properties here to achieve
    // your dancer's desired moves and behaviour

    // wing movement
    // abs so wings don't go positive
    this.leftWingAngle = -abs(sin(frameCount * this.wingSpeed)) * 0.6;
    this.rightWingAngle = -abs(sin(frameCount * this.wingSpeed)) * 0.6;

    // moving on the y-axis
    this.bounceY = sin(frameCount * 0.15) * 17.5;
    // legs movement
    this.legKick = sin(frameCount * 0.1) * 8;

    if(frameCount % 200 == 0){
      this.wingSpeed = random(0.02, 0.08);
    }

  }
  display() {
    // the push and pop, along with the translate 
    // places your whole dancer object at this.x and this.y.
    // you may change its position on line 19 to see the effect.
    push();
    translate(this.x, this.y);
    translate(0, this.bounceY);

    // push();
    // rectMode(CENTER);
    // rect(0, 0, 200, 200);
    // pop();

    // ******** //
    // ⬇️ draw your dancer from here ⬇️

    // LEGS
    stroke(0);
    stroke(255);
    strokeWeight(2);
    // left legs
    line(-40, -10, -65, -5 + this.legKick);
    line(-40,   0, -65,  8 + this.legKick);
    line(-40,  12, -65, 22 + this.legKick);
    // right legs
    line(40, -10, 65, -5 + this.legKick);
    line(40,   0, 65,  8 + this.legKick);
    line(40,  12, 65, 22 + this.legKick);

    // body
    push();

    // red body for ladybug
    stroke(255);
    strokeWeight(2);
    fill(0);
    circle(0, -35, 40);
    circle(0, 0, 80);
    // circle(0, 0, 80);

    // LEFT WING

    push();
    translate(0, -40);
    rotate(-this.leftWingAngle);
    translate(0, 40); 
    fill(207, 27, 0);
    stroke(5);

    arc(this.leftWingX, this.leftWingY, 80, 80, PI/2, (3*PI/2));

    // black spots
    fill(0);
    // left side wings
    circle(this.leftWingX - 12, this.leftWingY + 22, 10);
    circle(this.leftWingX - 25, this.leftWingY, 10);
    circle(this.leftWingX - 12, this.leftWingY - 22, 10);

    pop();

    // RIGHT WING STUFF

    push();

    translate(0, -40);
    rotate(this.rightWingAngle);
    translate(0, 40);
    fill(207, 27, 0);
    stroke(5);
    arc(this.rightWingX, this.rightWingY, 80, 80, (3*PI/2), PI/2);

    // right wing spots
    fill(0);
    circle(this.rightWingX + 12, this.rightWingY + 22, 10);
    circle(this.rightWingX + 25, this.rightWingY, 10);
    circle(this.rightWingX + 12, this.rightWingY - 22, 10);

    pop(); 

    // antennas
    strokeWeight(2);
    stroke(0);
    stroke(255);
    // left antenna
    let lAntX = cos(this.antennaLeftAngle) * this.antennaLength;
    let lAntY = sin(this.antennaLeftAngle) * this.antennaLength;
    line(5, -55, lAntX, -55 + lAntY);
    // fill(0);
    fill(255);
    noStroke();
    circle(lAntX, -55 + lAntY, 6);

    // right antenna
    stroke(0);
    stroke(255);
    let rAntX = cos(this.antennaRightAngle) * this.antennaLength;
    let rAntY = sin(this.antennaRightAngle) * this.antennaLength;
    line(-5, -55, rAntX, -55 + rAntY);
    // fill(0);
    fill(255);
    noStroke();
    circle(rAntX, -55 + rAntY, 6);


    pop();

    // ⬆️ draw your dancer above ⬆️
    // ******** //

    // the next function draws a SQUARE and CROSS
    // to indicate the approximate size and the center point
    // of your dancer.
    // it is using "this" because this function, too, 
    // is a part if your Dancer object.
    // comment it out or delete it eventually.
    //this.drawReferenceShapes()

    pop();
  }
  drawReferenceShapes() {
    noFill();
    stroke(255, 0, 0);
    line(-5, 0, 5, 0);
    line(0, -5, 0, 5);
    stroke(255);
    rect(-100, -100, 200, 200);
    fill(255);
    stroke(0);
  }
}



/*
GOAL:
The goal is for you to write a class that produces a dancing being/creature/object/thing. In the next class, your dancer along with your peers' dancers will all dance in the same sketch that your instructor will put together. 

RULES:
For this to work you need to follow one rule: 
  - Only put relevant code into your dancer class; your dancer cannot depend on code outside of itself (like global variables or functions defined outside)
  - Your dancer must perform by means of the two essential methods: update and display. Don't add more methods that require to be called from outside (e.g. in the draw loop).
  - Your dancer will always be initialized receiving two arguments: 
    - startX (currently the horizontal center of the canvas)
    - startY (currently the vertical center of the canvas)
  beside these, please don't add more parameters into the constructor function 
  - lastly, to make sure our dancers will harmonize once on the same canvas, please don't make your dancer bigger than 200x200 pixels. 
*/