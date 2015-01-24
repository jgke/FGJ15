export class Preloader extends Phaser.State {
    preloadBar: Phaser.Sprite;
    preload() {
        this.preloadBar = this.add.sprite(this.game.width/2, this.game.height/2, 'preloadBar');
        this.preloadBar.anchor = new Phaser.Point(0.5, 0.5);
        this.load.setPreloadSprite(this.preloadBar);

        this.load.image('place1', 'assets/place1.png');
        this.load.image('place2', 'assets/place2.png');
        this.load.image('place3', 'assets/place3.png');
        this.load.image('place4', 'assets/place4.png');
    }

    create() {
        var tween = this.add.tween(this.preloadBar).to({ alpha: 0 }, 1000, Phaser.Easing.Linear.None, true);
        tween.onComplete.add(() => {this.game.state.start('Level', true, false)}, this);
    }

}