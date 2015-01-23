export class Boot extends Phaser.State {
    preload() {
        this.load.image('preloadBar', 'assets/preload.png');
    }
    create() {
        this.input.maxPointers = 1;
        this.game.state.start('Preloader', true, false);
    }
}
