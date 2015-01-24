import Chunk = require("./Chunk");

export class Character extends Phaser.Sprite {
    ground: Array<Chunk.Chunk>;
    lastTouch: number;
    speed: number;
    type: number;
    jumps: Array<number>;
    jumping: number = 0;

    public constructor(game: Phaser.Game, x: number, y: number, type: number, ground: Array<Chunk.Chunk>) {
        super(game, x, y, "place1");
        this.setType(type);
        this.type = type;
        this.anchor = new Phaser.Point(0.5, 0.5);
        game.add.existing(this);
        game.physics.arcade.enable(this);

        this.body.drag.setTo(600, 0);
        this.body.maxVelocity.setTo(400, 5000);
        this.body.collideWorldBounds = false;
        this.lastTouch = 0;
        this.ground = ground;
        this.jumps = [];
    }

    setType(x: number) {
        this.type = x;
        var texture = "";
        switch(x) {
            case 0:
                texture = "eugene";
                break;
            case 1:
                texture = "douglas";
                break;
            case 2:
                texture = "place1";
                break;
            case 3:
                texture = "place2";
                break;
        }
        this.loadTexture(texture, 0);
    }

    newjump(x: number) {
        this.jumps.push(x);
    }

    jumpable():boolean {
        if(this.body.onFloor() || this.body.touching.down) {
            this.lastTouch = this.game.time.time;
        }
        if(Date.now() - this.lastTouch < 100) {
            return true;
        }
        return false;
    }

    jump() {
        if(this.body.onFloor() || this.body.touching.down) {
            this.lastTouch = this.game.time.time;
        }
        if(Date.now() - this.lastTouch < 100) {
            this.body.velocity.y -= 150;
        }
    }

    update() {
        super.update();
        while(this.jumps.length != 0) {
            var x = this.jumps[0];
            if(x > this.position.x) {
                break;
            }
            this.jumps.shift();
            this.position.y--;
            this.body.velocity.y -= 200;
            //this.jumping = 10;
        }
        //console.log(this.jumping);
        /*if(this.jumping > 0) {
            this.jumping--;
            //this.jump();
            this.body.velocity.y -= 150;
        }*/
        this.body.acceleration.x += this.speed * 8;
        this.game.physics.arcade.collide(this, this.ground, null, null, this);
    }
}