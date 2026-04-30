
let text1 , text2, text3;

class textbox
{

    constructor(level){

        // rework the prompts
        // this.text1 = "Reflect & Discuss:\nYou have a busy day ahead of you.\nYou have to study for your final that's tomorrow,\nattend class, go to the bank,\nand call to catch up with a friend.\n\nYou only have time to accomplish three things.\nWhat is your first priority? What is your last? Why?"
        // this.text2 = "Reflect & Discuss:\nYou have free day today.\nYou want to watch that movie you've been putting off,\nworkshop your resume for an application due soon,\ncall your parents, and meet up with a friend.\n\nYou only have time to accomplish three things.\nWhat is your first priority? What is your last? Why?";
        this.text1 = "Reflect and Discuss:\n\nThe screen in front of you flashes white.\nIt's been a long day.\nHow do you disconnect from the screen?";
        this.text2 = "Debate:\n\nWhat do you think is a Catch-Up friendship?";
        this.text3 = "Consider:\n\nFree from the shackles of responsibility,\nhow do you plan to spend your time?";
        this.text4 = "Reflect & Discuss:\n\nDo you usually spend your free time how you imagine you would?";
        this.text5 = "Act:\n\nHold hands with each other and look each other in the eye\nuntil the timer ends.";
        this.text6 = "Discuss: How have you humanized your relationships with your artifical companions?";

        this.level = level;
        this.frameCount = 0;
       // total frames is 5400 = 90 seconds. 3600 = 60s
        this.totalFrames = 30;
        this.visible = true;

    }


    // returns which text is being run
    textForLevel() {
        if (this.level == 1){
            return this.text1;
        }
        if (this.level == 2){
            return this.text2;
        }

        if (this.level == 3){
            return this.text3;
        }

        if (this.level == 4){
            return this.text4;
        }

        if (this.level == 5){
            return this.text5;
        }

    }

    update() {
        // returns nothing so the box disappears
        if (this.visible == false){
            return
        }

        this.frameCount++;

        if (this.frameCount >= this.totalFrames) {
            this.visible = false;
        }
    }

    display() {

        if (this.visible == false){

            // returns empty so no draw
            return;

        }

        // math function rounds value up to ceiling
        // can't // 60
        let secondsLeft = ceil((this.totalFrames - this.frameCount) / 60);

        push();
        translate(width/2, height/2);
        fill(30, 30, 30, 230);
        noStroke();
        rectMode(CENTER);
        rect(0, 0, width, height);

        fill(255);
        textAlign(CENTER, CENTER);
        textSize(18);
        textLeading(28);
        text(this.textForLevel(), 0, 0);

        textSize(14);
        fill(180);
        text("Time Left: " + secondsLeft + "s", 0, 200);

        pop();
    }


}