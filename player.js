class Player {
    constructor(_x, _y) {
        this.x = _x;
        this.y = _y;
        this.w = 16;
        this.h = 16;

        this.gravity = 0.3;
        this.xspeed = 3;
        this.yspeed = 0;

        this.grounded = false;

        this.jumpheight = 6.5;
    }
}

class Block {
    constructor(_x, _y, _w, _h) {
        this.x = _x;
        this.y = _y;
        this.w = _w;
        this.h = _h;
    }
}