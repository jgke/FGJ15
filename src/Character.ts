import Chunk = require("./Chunk");
import Level = require("./Level");

export class Character extends Phaser.Sprite {
    ground: Array<Chunk.Chunk>;
    lastTouch: number;
    speed: number;
    playerType: number;
    jumps: Array<number>;
    jumping: number = 0;
    emitter: Phaser.Particles.Arcade.Emitter;

    public constructor(game: Phaser.Game, x: number, y: number, type: number, ground: Array<Chunk.Chunk>) {
        super(game, x, y, "place1");
        this.setType(type);
        this.anchor = new Phaser.Point(0.5, 0.5);
        game.add.existing(this);
        if(type == 3) {
            game.physics.arcade.enable(this);
            this.body.drag.setTo(600, 0);
            this.body.maxVelocity.setTo(400, 5000);
            this.body.collideWorldBounds = false;
        }
        this.lastTouch = 0;
        this.ground = ground;
        this.jumps = [];
        this.emitter = this.game.add.emitter(32, 24, 20);
        this.emitter.autoAlpha = true;
        this.emitter.setScale(1.5, 3, 1.5, 3, 2000, Phaser.Easing.Quintic.Out);
        this.emitter.setAlpha(0.15, 0.3);
        this.emitter.makeParticles("blaze");
        this.emitter.angle = 100;
        this.emitter.frequency = 1000;
        this.emitter.enableBody = true;
        this.emitter.start(false, 400, 20);
        this.addChild(this.emitter);
    }

    setType(x: number) {
        this.playerType = x;
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
        if((<Level.Level>this.game.state.getCurrentState()).player.current.playerType == this.playerType) {
            this.body.acceleration.x += this.speed * 8;
            this.game.physics.arcade.collide(this, this.ground, null, null, this);
        }
    }
}