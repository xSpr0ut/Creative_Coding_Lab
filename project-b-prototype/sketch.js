
let o = [];
let numO = 250;
let player1;

function setup() {
  createCanvas(600, 800);

  for(let i=0; i<numO; i++){
    o.push(new Obstacles());
  }

  player1 = new Player(width-100, height-100);

}

function draw() {
  background(100);

  // let a = new Obstacles();
  // a.display();

  for(let i=0; i<numO; i++){
    o[i].display();
    o[i].update(o);
  }

  player1.display();
  player1.update();
  player1.collide(o);
  player1.shout(o);

  push();

  // player 2 for now, not sure what to do with them...

  noStroke();
  fill(0, 196, 35);
  circle(100, 100, 35);

  pop();


}



