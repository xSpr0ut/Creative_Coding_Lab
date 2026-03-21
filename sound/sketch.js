
let sound, sound2;
let x = 0;
let speedX = 1;
let s = 50;

// using microphone
let mic;

// loads the files we want in our p5 sketch
function preload(){
  sound = loadSound("sounds/kick.mp3");
  sound2 = loadSound("sounds/NYUSH.mp3");
}

function setup() {
  createCanvas(400, 400);
  // sound.play();
  x = s/2;

  mic = new p5.AudioIn;
  mic.start();

}

function draw() {
  background(220);

  // if(mouseIsPress){
  //   fill(0);
  //   circle(x, height/2, 50);
  // }

  fill(0);
  circle(x, height/2, 50);

  // for checking microphone volume

  let level = mic.getLevel();
  // mapping volume numbers to be larger
  let f = map(level, 0, 1, 0, 50);
  text(level, width/2, height/2);

  // x = x + speedX;
  x += speedX * f;

  if(x < s/2){
    speedX = -speedX
    //sound.play();
  } else if (x > width - s/2){
    speedX = -speedX
    //sound2.play();
  }


}


function mousePressed(){
  if(sound.isPlaying() == false){
    sound.play();
  } else {
    // sound.stop();
    sound.pause();
  }
  
}
