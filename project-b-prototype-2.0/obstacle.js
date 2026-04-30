class Obstacles{

  constructor(x, y){

    this.x = random(width);
    this.y = random(height);
    this.s = 35;
    this.idleMode = true;
    this.vx = 0;
    this.vy = 0;
    // IMPORTANT SO ALL INDIVIDUAL BALLS DRIFT DIFFERENTLY
    this.noiseOffset = random(1000);

  }

  display(){

    noStroke();
    fill(143, 221, 255);
    circle(this.x, this.y, this.s);

  }

  // lerping?
  // movement of the blue orbs
  update(others){

    // if(this.idleMode && frameCount%20 == 0){

    //     this.x += random(-4, 4);
    //     this.y += random(-4, 4);

    // }

    // noise movement
    // let noiseX = noise(this.noise * 0.005, this.y * 0.005, frameCount * 0.005);
    // let noiseY = noise(this.x * 0.005, this.y * 0.005, frameCount * 0.005 + 100);
    
    // using noise Offset version
    let noiseX = noise(this.noiseOffset, frameCount * 0.005);
    let noiseY = noise(this.noiseOffset + 1000, frameCount * 0.005);


    let driftX = map(noiseX, 0, 1, -1, 1);
    let driftY = map(noiseY, 0, 1, -1, 1);

    // Push back inward when approaching the border so
    // the balls never leave an invisible boarder
    // betweeen their position and the line
    // this way they don't look cut off...
    let margin = this.s + 1;
    let boundX = 0;
    let boundY = 0;

    // border control
    if (this.x < margin){
      boundX = (margin - this.x) * 0.1;
    } 

    if (this.x > width - margin){
      boundX = (width - margin - this.x) * 0.1;
    } 

    if (this.y < margin){
      boundY = (margin - this.y) * 0.1;
    } 

    if (this.y > height - margin){
      boundY = (height - margin - this.y) * 0.1;
    } 

    // Separation from other balls
    // so noone overlaps
    let sepX = 0;
    let sepY = 0;

    for (let i = 0; i < others.length; i++) {

  
      if (others[i] == this){
        
        continue;

      }

      // distance between us and other ball
      let dx = this.x - others[i].x;
      let dy = this.y - others[i].y;


      let d = dist(other.x , other.y, this.x, this.y);

      // only do something if they are overlapping (and not on top of each other)
      if (d < this.s && d > 0) {

        // calculating push direction
        // and strength for how hard to push

        let pushX = dx / d;
        let pushY = dy / d;

        let strength = this.s - d;

        sepX += pushX * strength * 2;
        sepY += pushY * strength * 2;

      }

  }

    let targetVX = driftX + boundX + sepX;
    let targetVY = driftY + boundY + sepY;

    this.vx = lerp(this.vx, targetVX, 0.075);
    this.vy = lerp(this.vy, targetVY, 0.075);

    this.x += this.vx;
    this.y += this.vy;

  }

}
