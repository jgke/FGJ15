export class Bullet extends Phaser.Sprite {
    speed: number = 1600;
    friendly: boolean;
    constructor(game: Phaser.Game, x: number, y:number, friendly: boolean) {
        super(game, x, y, 'place3');
        this.friendly = friendly;
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