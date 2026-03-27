
let x;
let y;

function setup() {
  createCanvas(400, 400);

  x = width / 2;
  y = height / 2;

  c = new Cloud(width/2, height/2, 1);
  c2 = new Cloud(width/4, height/4, 0.5);

}

function draw() {
  background(220);
  c.update();
  c.display();
  c2.update();
  c2.display();
  // drawCloud(x, y, 1);

  // y = height * noise(frameCount * 0.01);


}


class Cloud{

  // constructor, this is like the setup
  constructor(x, y, sc){

    this.x = x;
    this.y = y;
    this.xc = this.x;
    this.yc = this.y;
    this.sc = sc;


  }

  display(){

    push();
    translate(this.x, this.y);
    scale(this.sc);
    this.drawRightArm();
    this.drawLeftArm();
    noStroke();
    //body
    circle(0, 0, 100);
    //circles around
    for(let a = 0; a < 2*PI; a+=PI/6 ){
      push();
      rotate(a);
      circle(50,30, 50);
      pop();
    }
    //eyes
    fill(0);
    circle(-30, 0, 5);
    circle(30, 0, 5);
    arc(0, 0, 30, 30, 0, PI);
    pop();


  }

  // updates variables
  update(){

    // this.y = height * noise(frameCount * 0.01);
    this.x = this.xc + 100 * cos(frameCount * 0.1);
    this.y = this.yc + 100 * sin(frameCount * 0.1);
    this.s = map(sin(frameCount * 0.05), -1, 1, 1, 2);


  }

  drawRightArm() {
    //arms
    push();
    beginShape();
    let lineLength = 100;
    noFill();
    for (let i = 0; i <= lineLength; i += lineLength / 20) {
    strokeWeight(10);
    let v =  20*sin(frameCount * 0.1 - i/(0.1));
      vertex(i, v);
    }
    endShape();
    pop();
  }

  drawLeftArm() {
    //arms
    push();
    scale(-1, 1);
    beginShape();
    let lineLength = 100;
    noFill();
    for (let i = 0; i <= lineLength; i += lineLength / 20) {
    strokeWeight(10);
    let v =  20*sin(frameCount * 0.1 - i/(0.1));
      vertex(i, v);
    }
    endShape();
    pop();
  }


}

function drawCloud(u, v, s) {
  push();
  translate(u, v);
  scale(s);
  noStroke();
  //body
  circle(0, 0, 100);
  //circles around
  for(let a = 0; a < 2*PI; a+=PI/6 ){
    push();
    rotate(a);
    circle(50,30, 50);
    pop();
  }
  //eyes
  fill(0);
  circle(-30, 0, 5);
  circle(30, 0, 5);
  arc(0, 0, 30, 30, 0, PI);
  pop();
}





