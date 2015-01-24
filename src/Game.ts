import Boot = require("./Boot");
import Preloader = require("./Preloader");
import MainMenu = require("./MainMenu");
import Level = require("./Level");

export class Game extends Phaser.Game {
    constructor() {
        super("100%", "100%", Phaser.AUTO, 'content');
        this.state.add('Boot', Boot.Boot, false);
        this.state.add('Preloader', Preloader.Preloader, false);
        this.state.add('MainMenu', MainMenu.MainMenu, false);
        this.state.add('Level', Level.Level, false);
        this.state.start('Boot');
    }
}
