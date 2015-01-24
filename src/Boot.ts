export class Boot extends Phaser.State {
    preload() {
        this.load.image('1', 'assets/1.png');
    }
    create() {
        this.input.maxPointers = 1;
        this.game.state.start('Preloader', true, false);
        this.stage.backgroundColor = "#f8f8f8";
    }
}
