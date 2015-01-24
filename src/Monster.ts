import Chunk = require("./Chunk");

export class Monster extends Phaser.Sprite {
    ground: Array<Chunk.Chunk>;
    hp: number;
    maxhp: number = 2;
    constructor(game: Phaser.Game, x: number, y: number, type: number) {
        super(game, x, y, "place4");
        switch(type) {
            case 1:
                this.tint = 0xff0000;
                break;
            case 2:
                this.tint = 0x00ff00;
                break;
            case 3:
                this.tint = 0x0000ff;
                break;
            case 4:
                this.tint = 0xff00ff;
                break;
            default:
                this.tint = 0x777777;
                break;
        }
        this.hp = this.maxhp;
        game.add.existing(this);
        game.physics.arcade.enable(this);

        this.body.drag.setTo(600, 0);
        this.body.maxVelocity.setTo(400, 5000);
    }

    update() {
        this.game.physics.arcade.collide(this, this.ground, null, null, this);
        if(this.body.onFloor() || this.body.touching.down) {
            this.body.velocity.y -= 800;
        }
        if(this.game.camera.x > this.position.x + 64) {
            this.kill();
        }
    }

    hit() {
        this.hp--;
        var tween = this.game.add.tween(this).to({ alpha: (this.hp/this.maxhp) }, 100, Phaser.Easing.Linear.None, true);
        if(this.hp <= 0) {
            this.kill();
        }
    }
}