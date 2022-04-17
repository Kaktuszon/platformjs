let player;
let floor;
let platforms = [];
let window_w = 640;
let window_h = 480;

function setup() {
    createCanvas(window_w, window_h);
    frameRate(60);
    
    player = new Player(350, 70);
    floor = new Block(0, window_h-16, window_w, 16);
    platforms[0] = new Block(320, 350, 6*16, 64);
    platforms[1] = new Block(30, 420, 4*16, 32);
    //platform = new Block(320, 350, 6*16, 64);
}

function draw() {
    background(220);

    fill(142);
    rect(floor.x, floor.y, floor.w, floor.h);
    for(let i=0; i<platforms.length; i++) {
        rect(platforms[i].x, platforms[i].y, platforms[i].w, platforms[i].h);        
    }

	fill(255); //white
	rect(player.x, player.y, player.w, player.h);

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


    platforms.forEach(coll);

}

function coll(platform) {
    //Player comming from above
    if(player.x+player.w-2 >= platform.x && player.x+2 <= platform.x+platform.w) {
        if(player.y+player.h >= platform.y && player.y <= platform.y+5) {
			player.grounded = true;
			player.yspeed = 0;
			player.y = platform.y - player.h;
        }
	}

    //Player comming from below
    if(player.x+player.w-2 >= platform.x && player.x+2 <= platform.x+platform.w) {
        if(player.y <= platform.y+platform.h && player.y >= platform.y+platform.h-5) {
			player.yspeed = -player.yspeed;
        }
	}

    //Player coming from left
    if(player.y <= platform.y+platform.h && player.y+player.h >= platform.y) {
        if(player.x+player.w >= platform.x && player.x+player.w <= platform.x+1) {
			player.x -= player.xspeed;
        }
    }

    //Player coming from right
    if(player.y <= platform.y+platform.h && player.y+player.h >= platform.y) {
        if(player.x <= platform.x+platform.w && player.x >= platform.x+platform.w-5) {
			player.x += player.xspeed;
        }
    }
}