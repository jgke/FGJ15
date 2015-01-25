import Chunk = require("./Chunk");
import Level = require("./Level");
import Player = require("./Player");

export class Monster extends Phaser.Sprite {
    ground: Array<Chunk.Chunk>;
    hp: number;
    maxhp: number = 1;
    monsterType: number;
    constructor(game: Phaser.Game, x: number, y: number, type: number) {
        super(game, x, y, "1");
        this.scale.x = 64;
        this.scale.y= 64;
        this.monsterType = type;
        this.anchor.set(0.5, 0.5);
        switch(this.monsterType) {
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
                this.tint = 0xffff00;
                break;
            case 666:
                this.tint = 0x000000;
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
        switch(this.monsterType) {
            case 666:
                this.body.allowGravity = false;
                this.body.y = this.game.height - 64*7 - Math.sin(this.game.time.time/1000) * 128;
                this.body.x = this.game.camera.x + (this.game.width - 256);
                break;
            default:
                if(this.body.onFloor() || this.body.touching.down) {
                    this.body.velocity.y -= 800;
                }
                break;
        }
        if(this.game.camera.x > this.position.x + 32) {
            (<Player.Player>(<Level.Level>this.game.state.getCurrentState()).player).removeHP(10);
            this.destroy();
        }
    }

    hit(dmgs: Array<number>):boolean {
        if(this.monsterType == 4) {
            this.hp -= 0.5;
        } else {
            this.hp -= dmgs[this.monsterType];
        }
        this.game.add.tween(this.scale).to({ x: Math.random() * 48 + 32, y: Math.random() * 48 + 32 }, 100).chain(this.game.add.tween(this.scale).to({x:64, y:64})).start();
        if(this.hp <= 0) {
            this.destroy();
            return true;
        }
        return false;
    }
}