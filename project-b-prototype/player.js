class Player {

    constructor(x, y) {

        this.x = x;
        this.y = y;
        this.s = 30;
        this.speed = 3;

        this.mic = new p5.AudioIn();
        this.mic.start();

    }

    display() {

        noStroke();
        fill(255, 224, 74);
        circle(this.x, this.y, this.s);

    }

    update() {
        // arrow key movement
        if (keyIsDown(LEFT_ARROW)){
            this.x -= this.speed;
        }

        if (keyIsDown(RIGHT_ARROW)){
            this.x += this.speed;
        }

        if (keyIsDown(UP_ARROW)){
            this.y -= this.speed;
        }

        if (keyIsDown(DOWN_ARROW)){
            this.y += this.speed;
        }

        // code to keep player within borders
        let radius = this.s / 2;
        this.x = constrain(this.x, radius, width - radius);
        this.y = constrain(this.y, radius, height - radius);

    }

  // check collision against all blue balls
    collide(others) {

        for (let i = 0; i < others.length; i++) {

        let other = others[i];

        let dx = this.x - other.x;
        let dy = this.y - other.y;
        let dist = sqrt(dx * dx + dy * dy);
        let minDist = (this.s / 2) + (other.s / 2);

        // comapring distance to other balls
        if (dist < minDist && dist > 0) {
            // push player out so they don't overlap
            let angle = atan2(dy, dx);
            // account for overlap
            let overlap = minDist - dist;
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
        let threshold = 0.01;

        // if player voice loud enough
        if (vol > threshold) {
        for (let i = 0; i < others.length; i++) {
            let other = others[i];

            // calculate distance
            let dx = other.x - this.x;
            let dy = other.y - this.y;
            let dist = sqrt(dx * dx + dy * dy);

            if (dist < 100 && dist > 0) {
            // push ball AWAY from player
            let angle = atan2(dy, dx);
            // louder means a stronger push
            let strength = map(vol, threshold, 1, 0.05, 0.4);
            other.vx += cos(angle) * strength;
            other.vy += sin(angle) * strength;

            // randomize drift too
            other.noiseOffset = 1000 - other.noiseOffset;
            other.timeOffset = 1000 - other.timeOffset;
            }


        }



        }

    }


}