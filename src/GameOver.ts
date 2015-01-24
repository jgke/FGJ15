export class GameOver extends Phaser.State {
    create() {
        var text = new Phaser.Text(this.game,
                                   this.game.width/2,
                                   this.game.height/2,
                                   "Game Over!",
                                   {
                                       fill: "#f5f5f5",
                                       font: "64px Monospace",
                                       align: "center"
                                   });
        text.anchor.set(0.5, 0.5);
        this.game.add.existing(text);
        this.input.onDown.addOnce(() => {
            this.game.state.start('Level');
        }, this);
    }
}