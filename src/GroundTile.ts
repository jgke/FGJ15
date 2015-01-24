export class GroundTile extends Phaser.Sprite {
    kek: number;
    constructor(game: Phaser.Game, x: number, y: number) {
        super(game, x, y, 'place2');
        game.add.existing(this);
        this.game.physics.arcade.enable(this);
        this.body.immovable = true;
        this.body.allowGravity = false;
        this.kek = Math.random() - 0.5;
    }
    update() {
        if(this.position.y > this.game.height - 64
        || this.position.y < this.game.height - 128) {
            this.kek *= -1;
        }
        //this.position.y += this.kek*3;
        this.position.x -= 6;
        if(this.position.x < -64) {
            this.kill();
        }
    }
}