
let numBlueCircles = 10;
let blueCs = [];

function setup() {
  createCanvas(600, 400);

  // creating blue circle obstacles
  for(let i=0; i<numBlueCircles; i++){
    blueCs.push(new blueCircles());
  }

}

function draw() {
  background(0);
  // fill(255);
  // circle(100,100,50);

  for(let i=0; i<numBlueCircles; i++){
    blueCs[i].display();
  }

}


class blueCircles{

  constructor(){

    this.x = random(width);
    this.y = random(height);
    this.s = 15;

  }

  display(){

    noStroke();
    fill(161, 231, 255);
    circle(this.x, this.y, this.s);

  }


}

