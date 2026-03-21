

let sound1;
let sounds = [];
let x = [];
let y = [];

// images
let img;

function preload(){

  sound1 = loadSound("my-sounds/00.mp3");

  for(let i=1; i<9; i++){
    sounds.push(loadSound("my-sounds/0" + i + ".mp3"));
  }

  img = loadImage("images/asterisk.png");

}

function setup() {
  createCanvas(400, 400);
  // background(220);

  //sound1.loop();

}

function mousePressed(){

  x.push(mouseX);
  y.push(mouseY);

  // let index = (x.length-1)%sounds.length;
  let  index = floor(map(mouseY, 0, height, 0, sounds.length-1));

  sounds[index].play();

}

function draw() {
  background(220);

  for(let i = 0; i<x.length; i++){

    drawCircle(x[i], y[i]);

  }

}


function drawCircle(u, v){

  fill(0);
  //circle(u, v, 50);
  // to tint the image
  tint(0, 0, 255, 100);
  // fliter (applies to whole canvas, not just images)
  //filter(INVERT);
  imageMode(CENTER);
  image(img, u, v, img.width, img.height);


}
