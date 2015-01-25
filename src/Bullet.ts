export class Bullet extends Phaser.Sprite {
    speed: number = 1600;
    bulletType: number;
    friendly: boolean;
    constructor(game: Phaser.Game, x: number, y: number, type: number, friendly: boolean = true) {
        super(game, x, y, 'plr' + (type+1) + '_projectile');
        this.friendly = friendly;
        this.bulletType = type;
        game.add.existing(this);
        game.physics.arcade.enable(this);
        this.anchor.set(0.5, 0.5);
        this.body.maxVelocity.setTo(this.speed, 400);
        this.body.velocity.setTo(friendly?this.speed:-this.speed, 0);
        this.checkWorldBounds = true;
        this.outOfBoundsKill = true;
        this.body.allowGravity = false;
    }
    update() {
        this.body.acceleration.y += Math.sin(this.game.time.time) * 30;
    }
}