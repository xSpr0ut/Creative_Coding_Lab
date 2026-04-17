// //variables
// // let x, y; 
// // let accX = 0; 
// // let accY = 0;
// // let speedX = 0;
// // let speedY = 0;
// // let away = 0.2; //change this to make it go further

// function setup() {
//   createCanvas(400, 400);
//   //setup variables
//   // x = width / 2;
//   // y = height / 2;

//   p = new Particle();


// }

// function draw() {
//   background(220);
//   p.drawParticle();
//   p.moveAway();

// }

// class Particle{

//   constructor(){

//     this.x = width/2;
//     this.y = height/2;
//     this.accX = 0; 
//     this.accY = 0;
//     this.speedX = 0;
//     this.speedY = 0;
//     this.away = 0.2; //change this to make it go further

//   }

//   drawParticle(){

//     circle(this.x, this.y, 50);

//   }

//   moveAway(){
//   let d = dist(mouseX, mouseY, this.x, this.y);
//   //establish condition
//   if (d < 25) { //radius of the circle
//     this.accX = (mouseX - this.x) * -this.away;
//     this.accY = (mouseY - this.y) * -this.away;
//     this.speedX += this.accX;
//     this.speedY += this.accY;
//   } 
//   //update speed
//   this.speedX = this.speedX * 0.9; // 10% less per frame
//   this.speedY = this.speedY * 0.9; // 10% less per frame
//   //update position
//   this.x += this.speedX;
//   this.y += this.speedY;
// }

// }


// let c = [];
// let n = 10;
// function setup() {
//   createCanvas(400, 400);

//   // for(let r=0; r<n; r++){
//   //   c.push(new Cloud(random(width), random(height), random(0.5, 1)));
//   // }


// }

// function mousePressed(){

//   c.push(new Cloud(random(width), random(height), random(0.5, 1)));

// }

// function draw() {
//   background(220);

//   for(let i=0; i<c.length; i++){

//     c[i].update();
//     c[i].display();
    
//     if(c[i].isOut){
//       c.splice(i, 1);
//     }

//   }


  
// }


let c = [];
let r = [];
let thunder;

function preload(){
  thunder = loadSound("thunder.mp3");
}

function setup() {
  createCanvas(400, 400);
  // thunder.play();
}
function mousePressed() {
  c.push(new Cloud(mouseX, mouseY, random(0.5, 1)));
}
function draw() {
  background(220);

  // if(mouseIsPressed){
  //     r.push(new Rain(mouseX, mouseY));
  //   }
    for (let i = 0; i < r.length; i++) {
      r[i].updateRain();
      r[i].displayRain();
      if(r[i].isOut){
        r.splice(i, 1);
      }
    }
    // console.log(r.length);


  for (let i = 0; i < c.length; i++) {
    for (let j = 0; j < c.length; j++) {
      if (i != j) {
        c[i].checkCollision(c[j]);
      }
    }

    if(c[i].isRaining){
      r.push(new Rain(c[i].x, c[i].y, c[i].h));
    }

    c[i].update();
    c[i].display();
    if (c[i].isOut) {
      c.splice(i, 1);
    }

  }
  console.log(c.length);
}

