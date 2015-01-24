import Ground = require("./Ground");

export class Player extends Phaser.Sprite {
    ground: Ground.Ground;
    constructor(game: Phaser.Game, x: number, y: number) {
        super(game, x, y, 'place1');
        this.anchor = new Phaser.Point(0.5, 0.5);
        game.add.existing(this);
        game.physics.arcade.enable(this);
        this.ground = null;
    }

    update() {
        this.body.collideWorldBounds = true;
        var collides = this.game.physics.arcade.collide(this, this.ground, null, null, this);
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

        this.body.velocity.x += dif;
        if(this.body.onFloor() || this.body.touching.down) {
            this.body.velocity.x *= 0.8;
        } else {
            this.body.velocity.x *= 0.9;
        }
    }
}