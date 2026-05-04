class Players {
  constructor(x, y, c) {
    this.x = x;
    this.y = y;
    this.moveLeft = false;
    this.moveRight = false;
    this.moveUp = false;
    this.moveDown = false;
    this.speed = 3;
    this.speedX = 5;
    this.speedY = 5;
    this.c = c;

// mic settings
    this.mic = new p5.AudioIn();
    this.mic.start();

  }

  display() {
    push();
    colorMode(HSB, 100);
    fill(this.c);
    noStroke();
    circle(this.x, this.y, 30);
    pop();
  }
  updateLeft() {
    this.speedX = this.speedX * 0.9; // 10% less per frame
    this.x -= this.speedX;
    if (this.speedX < 0.01) {
      this.moveLeft = false;
      this.speedX = 5;
    }
  }
  updateRight() {
    this.speedX = this.speedX * 0.9; // 10% less per frame
    this.x += this.speedX;
    if (this.speedX < 0.01) {
      this.moveRight = false;
      this.speedX = 5;
    }
  }
  updateUp() {
    this.speedY = this.speedY * 0.9; // 10% less per frame
    this.y += this.speedY;
    if (this.speedY < 0.01) {
      this.moveUp = false;
      this.speedY = 5;
    }
  }
  updateDown() {
    this.speedY = this.speedY * 0.9; // 10% less per frame
    this.y -= this.speedY;
    if (this.speedY < 0.01) {
      this.moveDown = false;
      this.speedY = 5;
    }
  }
  //for keyboard
  right(){
    this.x -= this.speed;
  }
  left(){
    this.x += this.speed;
  }
  up(){
    this.y -= this.speed;
  }
  down(){
    this.y += this.speed;
  }

  // check collision against all blue balls
    collide(others) {

        for (let i = 0; i < others.length; i++) {

        let other = others[i];

        let dx = this.x - other.x;
        let dy = this.y - other.y;
        let d = dist(other.x , other.y, this.x, this.y);
        let minDist = (this.s / 2) + (other.s / 2);

        // comapring distance to other balls
        if (d < minDist && d > 0) {
            // push player out so they don't overlap
            let angle = atan2(dy, dx);
            // account for overlap
            let overlap = minDist - d;
            this.x += cos(angle) * overlap;
            this.y += sin(angle) * overlap;

            // push the blue ball away in the opposite direction
            // weak though cause we wanna encourage using mic?
            let pushStrength = 0.05;
            other.vx -= cos(angle) * pushStrength;
            other.vy -= sin(angle) * pushStrength;

            // randomize the blue ball's drift direction
            // cause then the ball will also drift another
            // way (so it's not there forever blocking player)
            other.noiseOffset = 1000 - other.noiseOffset;
            other.timeOffset = 1000 - other.timeOffset;

        }

        }

    }


    // shout to disperse nearby balls
    // using the mic, if you go over a certain volume
    shout(others) {
        let vol = this.mic.getLevel();
        // mic sensitivity level accepted
        // I don't know why the higher numbers don't seem to work
        // here... like nto sensitive enough?
        let threshold = 0.08;

        // if player voice loud enough
        if (vol > threshold) {
        for (let i = 0; i < others.length; i++) {
            let other = others[i];

            // calculate distance
            let dx = other.x - this.x;
            let dy = other.y - this.y;
            let d = sqrt(other.x , other.y, this.x, this.y);

            if (d < 100 && d > 0) {
            // push ball AWAY from player
            let angle = atan2(dy, dx);
            // louder means a stronger push
            let strength = map(vol, threshold, 1, 0.05, 50);
            other.vx += cos(angle) * strength;
            other.vy += sin(angle) * strength;

            // randomize drift too
            other.noiseOffset = 1000 - other.noiseOffset;
            other.timeOffset = 1000 - other.timeOffset;
            }


        }



        }

    }


    respawn() {
        this.x = this.startX;
        this.y = this.startY;
    }


}