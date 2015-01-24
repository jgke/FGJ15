export class GroundTile extends Phaser.Sprite {
    constructor(game: Phaser.Game, x: number, y: number) {
        super(game, x, y, 'place2');
        game.add.existing(this);
        this.game.physics.arcade.enable(this);
        this.body.immovable = true;
        this.body.allowGravity = false;
    }
}