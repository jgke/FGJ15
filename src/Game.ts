import Boot = require("./Boot");
import Preloader = require("./Preloader");
import MainMenu = require("./MainMenu");
import Level = require("./Level");
import GameOver = require("./GameOver");
import InfoScreen = require("./InfoScreen");

export class Game extends Phaser.Game {
    constructor() {
        super("100%", "100%", Phaser.AUTO, 'content');
        this.state.add('Boot', Boot.Boot);
        this.state.add('Preloader', Preloader.Preloader);
        this.state.add('MainMenu', MainMenu.MainMenu);
        this.state.add('Help', new InfoScreen.InfoScreen("HEHEHEHEHEHHEHE"));
        this.state.add('Level', Level.Level);
        this.state.add('GameOver', GameOver.GameOver);
        this.state.start('Boot');
    }
}
