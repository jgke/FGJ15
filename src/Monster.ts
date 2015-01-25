import Chunk = require("./Chunk");
import Level = require("./Level");
import Player = require("./Player");

export class Monster extends Phaser.Sprite {
    ground: Array<Chunk.Chunk>;
    hp: number;
    maxhp: number = 4;
    monsterType: number;
    constructor(game: Phaser.Game, x: number, y: number, type: number) {
        super(game, x, y, "place4");
        this.monsterType = type;
        this.anchor.set(0.5, 0.5);
        switch(type) {
            case 0:
                this.tint = 0xff0000;
                break;
            case 1:
                this.tint = 0x00ff00;
                break;
            case 2:
                this.tint = 0x0000ff;
                break;
            case 3:
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
        if(this.game.camera.x > this.position.x + 32) {
            (<Player.Player>(<Level.Level>this.game.state.getCurrentState()).player).removeHP(10);
            this.destroy();
        }
    }

    hit(bulletType: number):boolean {
        this.hp -= (this.monsterType == 4 || this.monsterType == bulletType ? 2 : 1);
        this.game.add.tween(this.scale).to({ x: Math.random() * 0.75 + 0.5, y: Math.random() * 0.75 + 0.5 }, 100).chain(this.game.add.tween(this.scale).to({x:1, y:1})).start();
        if(this.hp <= 0) {
            this.destroy();
            return true;
        }
        return false;
    }
}