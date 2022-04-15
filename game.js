let player;
let floor;
let platform;
let window_w = 640;
let window_h = 480;

function setup() {
    createCanvas(window_w, window_h);
    frameRate(60);
    
    player = new Player(350, 70);
    floor = new Block(0, window_h-16, window_w, 16);
    platform = new Block(320, 100, 6*16, 16);
}

function draw() {
    background(220);
    fill(255) //white
    rect(player.x, player.y, player.w, player.h);

    fill(142);
    rect(floor.x, floor.y, floor.w, floor.h);
    rect(platform.x, platform.y, platform.w, platform.h);

    collisionDetection();

    if(keyIsDown(LEFT_ARROW) || keyIsDown(65)) {
        player.x -= player.xspeed;
    }

    if(keyIsDown(RIGHT_ARROW) || keyIsDown(68)) {
        player.x += player.xspeed;
    }

    if(player.grounded === false) {
        player.y += player.yspeed;
    }

    console.log(player.yspeed);
}

function keyPressed() {
    if((keyCode === 32 || keyCode === UP_ARROW) && player.grounded) {
        player.grounded = false;
        player.y--;
        player.yspeed -= player.jumpheight;
    }
}

function collisionDetection() {
    if(player.y+player.h >= floor.y) {
        player.grounded = true;
        player.yspeed = 0;
    } else {
        player.grounded = false;
        player.yspeed += player.gravity;
    }

    if(player.y+player.h > floor.y) {
        player.y = floor.y - player.h;
    }

    if(player.x+player.w >= platform.x && player.x <= platform.x+platform.w) {
        if(player.y+player.h >= platform.y && player.y <= platform.y+platform.h) {
            player.grounded = true;
            player.yspeed = 0;
            player.y = platform.y - player.h;
        }
    }
}