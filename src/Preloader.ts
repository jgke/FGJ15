export class Preloader extends Phaser.State {
    preloadBar: Phaser.Sprite;
    preload() {
        this.preloadBar = this.add.sprite(this.game.width/2, this.game.height/2, 'preloadBar');
        this.preloadBar.scale.x = this.game.width/this.preloadBar.width;
        this.preloadBar.anchor = new Phaser.Point(0.5, 0.5);
        this.load.setPreloadSprite(this.preloadBar);

        this.load.image('place1', 'assets/place1.png');
        this.load.image('place2', 'assets/place2.png');
        this.load.image('place3', 'assets/place3.png');
        this.load.image('place4', 'assets/place4.png');
        this.load.image('sky720', 'assets/sky720.png');
        this.load.image('city720', 'assets/city720.png');
        this.load.image('road720', 'assets/road720.png');
        this.load.image('eugene', 'assets/Eugene.png');
        this.load.image('douglas', 'assets/Douglas.png');
        this.load.audio('bgm', 'assets/mix3FGJ2015.ogg');
    }

    create() {
        var tween = this.add.tween(this.preloadBar).to({ alpha: 0 }, 1000, Phaser.Easing.Linear.None, true);
        tween.onComplete.add(() => {this.game.state.start('Level', true, false)}, this);
    }

}