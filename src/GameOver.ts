export class GameOver extends Phaser.State {
    create() {
        var text = new Phaser.Text(this.game,
                                   this.game.width/2,
                                   this.game.height/2,
                                   "Game Over!\nSpace to restart.",
                                   {
                                       fill: "#333",
                                       font: "bold 70px Arial",
                                       align: "center"
                                   });
        text.anchor.set(0.5, 0.5);
        text.alpha = 0;
        this.game.add.existing(text);
        this.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR).onDown.add(() => {
            this.game.add.tween(text).to({alpha: 0}, 500).start().onComplete.addOnce(() => {
                this.game.state.start('Level');
            });
        }, this);
        this.game.add.tween(text).to({alpha: 1}, 500).start();

        this.game.sound.stopAll();
        var bgm = this.game.add.audio('pausemenu');
        bgm.loop = true;
        bgm.play();
    }
}