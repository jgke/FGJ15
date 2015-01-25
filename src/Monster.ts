import Chunk = require("./Chunk");
import Level = require("./Level");
import Player = require("./Player");
import Bullet = require("./Bullet");

export class Monster extends Phaser.Sprite {
    ground: Array<Chunk.Chunk>;
    hp: number;
    maxhp: number = 0.5;
    monsterType: number;
    bossbullets: Phaser.Group;
    currentShotCD: number = 0;
    shotCD: number = 15;
    asd: boolean;
    constructor(game: Phaser.Game, x: number, y: number, type: number) {
        super(game, x, y, "enm" + (type + 1));
        this.monsterType = type;
        this.anchor.set(0.5, 0.5);
        if(type == 666) {
            this.bossbullets = new Phaser.Group(this.game);

        }
        this.hp = this.maxhp;
        game.add.existing(this);
        game.physics.arcade.enable(this);

        this.body.drag.setTo(600, 0);
        this.body.maxVelocity.setTo(400, 5000);
        this.asd = false;
    }

    update() {
        this.game.physics.arcade.collide(this, this.ground, null, null, this);
        switch(this.monsterType) {
            case 666:
                this.body.allowGravity = false;
                this.body.y = this.game.height - 64*7 - Math.sin(this.game.time.time/1000) * 128;
                this.body.x = this.game.camera.x + (this.game.width - 256);
                this.currentShotCD--;
                if(this.currentShotCD <= 5 && this.asd == false) {
                    this.loadTexture('enm667s', 0);
                    this.asd = true;
                } else if(this.currentShotCD > 5 && this.asd == true) {
                    this.loadTexture('enm667', 0);
                    this.asd = false;
                }
                if(this.currentShotCD <= 0) {
                    var bullet = new Bullet.Bullet(this.game, this.position.x, this.position.y, null, null, false);
                    this.bossbullets.add(bullet);
                    this.currentShotCD = this.shotCD;
                }
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
        } else if(this.monsterType == 666) {
        } else {
            this.hp -= dmgs[this.monsterType];
        }
        this.game.add.tween(this.scale).to({ x: Math.random() * 0.75 + 0.5, y: Math.random() * 0.75 + 0.5 }, 100).chain(this.game.add.tween(this.scale).to({x:1, y:1})).start();
        if(this.hp <= 0) {
            this.destroy();
            return true;
        }
        return false;
    }
}