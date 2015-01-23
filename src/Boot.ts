export class Boot extends Phaser.State {
    preload() {
        // load preloadbar
    }
    create() {
        this.input.maxPointers = 1;
        //this.game.state.start('Preloader', true, false);
    }
}
