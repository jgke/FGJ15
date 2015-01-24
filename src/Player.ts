import Chunk = require("./Chunk");

export class Player extends Phaser.Sprite {
    ground: Array<Chunk.Chunk>;
    constructor(game: Phaser.Game, x: number, y: number) {
        super(game, x, y, 'place1');
        this.anchor = new Phaser.Point(0.5, 0.5);
        game.add.existing(this);
        game.physics.arcade.enable(this);
        game.camera.follow(this, Phaser.Camera.FOLLOW_PLATFORMER);
        this.ground = [];
    }

    update() {
        this.body.collideWorldBounds = true;
        this.game.physics.arcade.collide(this, this.ground, null, null, this);
        var dif = 0;
        if(this.game.input.keyboard.isDown(Phaser.Keyboard.LEFT)) {
            dif = - 50;
        } else if(this.game.input.keyboard.isDown(Phaser.Keyboard.RIGHT)) {
            dif = 50;
        }

        if(this.body.onFloor() || this.body.touching.down) {
            //dif *= 0.9;
            if(this.game.input.keyboard.isDown(Phaser.Keyboard.UP)) {
                this.body.velocity.y -= 500;
            }
        } else {
            dif *= 0.5;
        }

        //dif += 100;

        this.body.velocity.x += dif;
        if(this.body.onFloor() || this.body.touching.down) {
            this.body.velocity.x *= 0.8;
        } else {
            this.body.velocity.x *= 0.9;
        }
    }
}