let scanned = [];
let waterScanned = [];
let fish;
let waterDrops = [];
// let rockets;
// let doodles1;
// let doodles2;

// tracking the scene
let curFish = 0;
let curWater = 0;
// let curRocket = 0;
// let rocketY = 500;
// let rocketSpeedY = 0;
// let curDoodle1 = 0;
// let curDoodle2 = 0;

// other variables
let fishSpeed = 1;
let fishX = 0;

// sound
let rainSound;

function preload() {
  for (let i = 1; i <= 4; i++) {
    scanned.push(loadImage("fish" + i + ".png"));
  }

  for (let i = 1; i <= 5; i++) {
    waterScanned.push(loadImage("water" + i + ".png"));
  }

rainSound = loadSound("rain.mp3");

}

function setup() {
  createCanvas(800, 500);

  eraseBg(scanned, 10);
  fish = crop(scanned, 0, 0, 800, 500);
  water = crop(waterScanned, 0, 0, 800, 500);

  rainSound.loop();

  // for random waterdrop generation
  for (let i = 0; i < 5; i++) {
    waterDrops.push({
      // sets the dros to five sections
      // with (width/5) * i
      x: (width / 5) * i - random(-40, 30),
      offset: floor(random(width/2)),  
      // how spread out the drops are
      delay: floor(random(210))             
    });
}


  // rockets = crop(scanned, 1600, 90, 650, 420);
  // doodles1 = crop(scanned, 1514, 1300, 830, 300);
  // doodles2 = crop(scanned, 100, 1300, 366, 311);
}

function draw() {
  background(255);
  // water background
  noStroke();
  fill(149, 206, 232);
  rect(0, height/3, 800, 250);

  // examples: eye

  image(
    fish[curFish],
    fishX,
    0,
    fish[0].width * 0.8,
    fish[0].height * 0.8);
  
  curFish = floor((frameCount / 17) % fish.length);


  // for(let i=0; i<3; i++){

  //   image(
  //     water[curWater],
  //     0 + (i*100),
  //     0,
  //     water[0].width * 0.7,
  //     water[0].height * 0.7);

  //   }

  for (let i = 0; i < waterDrops.length; i++) {
  let drop = waterDrops[i];

  // this for loop essentially makes sure
  // water drops at random intervals
  if (frameCount > drop.delay) {
    let currWater = floor(((frameCount - drop.delay) / 20 + drop.offset) % water.length);
    image(
      water[currWater],
      drop.x,
      0,
      water[0].width * 0.7,
      water[0].height * 0.7
    );
  }
}

  // curWater = floor((frameCount / 20) % water.length);


  fishX += fishSpeed;
  if(fishX > width/2 + 100){
    fishX = 0;
  }
  console.log(fishX);
  


//   // rocket

//   push();
//   translate(width / 2, rocketY);
//   rotate(radians(-90));
//   imageMode(CENTER);
//   image(
//     rockets[curRocket],
//     0,
//     0,
//     rockets[0].width * 0.25,
//     rockets[0].height * 0.25
//   );
//   pop();

//   // rocket animation only has 4 frames
//   curRocket = floor((frameCount / 10) % 4);

//   rocketY += rocketSpeedY;
//   rocketSpeedY += -0.1;
//   if (rocketY < -100) {
//     rocketY = 500;
//     rocketSpeedY = 0;
//   }

//   // doodles, using sin()

//   image(
//     doodles1[curDoodle1],
//     0,
//     0,
//     doodles1[0].width * 0.5,
//     doodles1[0].height * 0.5
//   );

//   curDoodle1 = floor(map(sin(frameCount / 10), -1, 1, 0, doodles1.length));

//   image(
//     doodles2[curDoodle2],
//     400,
//     300,
//     doodles2[0].width * 0.5,
//     doodles2[0].height * 0.5
//   );

//   let d = dist(mouseX, mouseY, 485, 355);
//   if (d < 100) {
//     curDoodle2 = floor(map(sin(frameCount / 10), -1, 1, 0, doodles2.length));
//   }
}

// You shouldn't need to modify these helper functions:

function crop(imgs, x, y, w, h) {
  let cropped = [];
  for (let i = 0; i < imgs.length; i++) {
    cropped.push(imgs[i].get(x, y, w, h));
  }
  return cropped;
}

function eraseBg(imgs, threshold = 10) {
  for (let i = 0; i < imgs.length; i++) {
    let img = imgs[i];
    img.loadPixels();
    for (let j = 0; j < img.pixels.length; j += 4) {
      let d = 255 - img.pixels[j];
      d += 255 - img.pixels[j + 1];
      d += 255 - img.pixels[j + 2];
      if (d < threshold) {
        img.pixels[j + 3] = 0;
      }
    }
    img.updatePixels();
  }
  // this function uses the pixels array
  // we will cover this later in the semester - stay tuned
}
