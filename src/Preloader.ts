export class Preloader extends Phaser.State {
    preloadBar: Phaser.Sprite;
    preload() {
        this.preloadBar = this.add.sprite(200, 20, 'preloadBar');
        this.load.setPreloadSprite(this.preloadBar);
    }

    create() {
        var tween = this.add.tween(this.preloadBar).to({ alpha: 0 }, 1000, Phaser.Easing.Linear.None, true);
    }
}