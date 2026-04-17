// class Cloud {
//   // constructor, this is like the setup
//   //the setup of our variables
//   constructor(x, y, sc) {
//     this.x = x;
//     this.y = y;
//     this.sc = sc;
//     this.xc = this.x;
//     this.yc = this.y;
//     this.x0 = this.x;
//     this.y0 = this.y;
//     this.speedX = map(this.sc, 0.5, 0.5, 1.5, 1);

//     // colour
//     // colorMode(HSB, 100);
//     this.cloudColour = random(100);

//   }
//   //everything that will draw the cloud
//   display() {
//     push();
//     // colour mode
//     colorMode(HSB, 100);
//     translate(this.x, this.y);
//     scale(this.sc);
//     this.drawRightArm();
//     this.drawLeftArm();
//     noStroke();
//     //body
//     fill(this.cloudColour, 30, 100);
//     circle(0, 0, 100);
//     //circles around
//     for (let a = 0; a < 2 * PI; a += PI / 6) {
//       push();
//       rotate(a);
//       circle(50, 30, 50);
//       pop();
//     }
//     //eyes
//     fill(0);
//     circle(-30, 0, 5);
//     circle(30, 0, 5);
//     arc(0, 0, 30, 30, 0, PI);
//     pop();
//   }
//   //updates the variables
//   update() {
//     //this.y = height * noise(frameCount * 0.01);
//     // this.x = this.xc + 50 * cos(frameCount * 0.1);
//     if(this.sc >= 50){
//       this.speedX = 5;
//     } else if (this.sc <50){
//       this.speedX = 10;
//     }

//     this.y = lerp(this.y, this.y0 + 200 * noise(frameCount * 0.01), 0.1);
//     // this.s = map(sin(frameCount * 0.05), -1, 1, 1, 2);

//     this.x = this.x + this.speedX;
//     if(this.x > width + 100){
//       this.isOut = true;
//     }

//   }

//   drawRightArm() {
//     //arms
//     push();
//     beginShape();
//     let lineLength2 = 100;
//     noFill();
//     for (let i = 0; i <= lineLength2; i += lineLength2 / 20) {
//       strokeWeight(10);
//       let v = 20 * sin(frameCount * 0.1 - i / 0.1);
//       vertex(i, v);
//     }
//     endShape();
//     pop();
//   }
//   drawLeftArm() {
//     //arms
//     push();
//     scale(-1, 1);
//     beginShape();
//     let lineLength2 = 100;
//     noFill();
//     for (let i = 0; i <= lineLength2; i += lineLength2 / 20) {
//       strokeWeight(10);
//       let v = 20 * sin(frameCount * 0.1 - i / 0.1);
//       vertex(i, v);
//     }
//     endShape();
//     pop();
//   }
// }


class Cloud {
    // constructor, this is like the setup
    //the setup of our variables
    constructor(x, y, sc) {
        this.x = x;
        this.y = y;
        this.sc = sc;
        this.speedX = map(this.sc, 0.5, 1, 5, 1);
        this.x0 = this.x;
        this.y0 = this.y;
        this.isDone = false;

        this.h = random(100);
        this.sound = thunder;
        this.isRaining = false;

    }

    // method to detect collisions

    checkCollision(other){
      let d = dist(this.x, this.y, other.x, other.y);

      if(d < (this.sc + other.sc) * 100*0.8){
        console.log("boom!");
        //this.h = random(100);
        this.isRaining = true;
        if (this.sound.isPlaying() == false) {
                this.sound.play();
            }

      } else {
        this.isRaining = false;
      }

    }


    //everything that will draw the cloud
    display() {
        push();
        colorMode(HSB, 100);
        translate(this.x, this.y);
        scale(this.sc);
        this.drawRightArm();
        this.drawLeftArm();
        noStroke();
        //body
        fill(this.h, 30, 100);
        circle(0, 0, 100);
        //circles around
        for (let a = 0; a < 2 * PI; a += PI / 6) {
            push();
            rotate(a);
            circle(50, 30, 50);
            pop();
        }
        //eyes
        fill(0);
        circle(-30, 0, 5);
        circle(30, 0, 5);
        arc(0, 0, 30, 30, 0, PI);
        pop();
    }
    //updates the variables
    update() {
        this.y = lerp(this.y, this.y0 - 200 * noise(frameCount * 0.01), 0.1);
        this.x = this.x + this.speedX;
        if(this.x > width + this.sc*100){
            this.isDone = true;
        }
    }

    drawRightArm() {
        //arms
        push();
        beginShape();
        let lineLength2 = 100;
        noFill();
        for (let i = 0; i <= lineLength2; i += lineLength2 / 20) {
            strokeWeight(10);
            let v = 20 * sin(frameCount * 0.1 - i / 0.1);
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
        let lineLength2 = 100;
        noFill();
        for (let i = 0; i <= lineLength2; i += lineLength2 / 20) {
            strokeWeight(10);
            let v = 20 * sin(frameCount * 0.1 - i / 0.1);
            vertex(i, v);
        }
        endShape();
        pop();
    }
}
