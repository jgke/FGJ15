import Boot = require("./Boot");
import Preloader = require("./Preloader");

export class Game extends Phaser.Game {
    constructor() {
        super(800, 600, Phaser.AUTO, 'content');
        this.state.add('Boot', Boot.Boot, false);
        this.state.add('Preloader', Preloader.Preloader, false);
        this.state.start('Boot');
    }
}
