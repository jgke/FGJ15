import Chunk = require("./Chunk");
import Bullet = require("./Bullet");

export class Player extends Phaser.Sprite {
    ground: Array<Chunk.Chunk>;
    lastTouch: number;
    speed: number = 7;
    currentShotCD: number;
    shotCD: number = 15;
    bullets: Phaser.Group;
    constructor(game: Phaser.Game, x: number, y: number) {
        super(game, x, y, 'place1');
        this.anchor = new Phaser.Point(0.5, 0.5);
        game.add.existing(this);
        game.physics.arcade.enable(this);
        /*game.camera.follow(this, Phaser.Camera.FOLLOW_PLATFORMER);
        game.camera.deadzone = new Phaser.Rectangle(200,380,1,1);*/
        game.camera.focusOn(this);
        this.body.drag.setTo(600, 0);
        this.body.maxVelocity.setTo(400, 5000);
        this.ground = [];
        this.body.collideWorldBounds = false;
        this.currentShotCD = this.shotCD;
        this.bullets = new Phaser.Group(this.game);
    }

    shoot() {
        this.currentShotCD = this.shotCD;
        var bullet = new Bullet.Bullet(this.game, this.position.x, this.position.y);
        this.bullets.add(bullet);
    }

    update() {
        this.game.camera.x += this.speed;
        this.game.physics.arcade.collide(this, this.ground, null, null, this);

        if(this.body.onFloor() || this.body.touching.down) {
            this.lastTouch = this.game.time.time;

        }
        if(Date.now() - this.lastTouch < 100) {
            if(this.game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)) {
                this.body.velocity.y -= 150;
            }
        }

        var relX = this.body.position.x - this.game.camera.x;
        this.body.acceleration.x += this.speed * 8;

        if(relX < -64) {
            this.kill();
            this.game.state.start('GameOver');
        } else if(relX < 200) {
            this.body.maxVelocity.setTo(this.speed * 70, 5000);
        } else if(relX > 300) {
            this.body.maxVelocity.setTo(this.speed * 50, 5000);
        } else {
            this.body.maxVelocity.setTo(this.speed * 60, 5000);
        }

        this.currentShotCD--;
        if(this.currentShotCD <= 0) {
            this.shoot();
        }
    }
}