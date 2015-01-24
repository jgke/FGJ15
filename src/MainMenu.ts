import Player = require("./Player");
import Ground = require("./Ground");

export class MainMenu extends Phaser.State {
    player: Player.Player;
    ground: Ground.Ground;

    create() {

        this.player = new Player.Player(this.game, this.game.width/2, this.game.height/2);

        //this.game.physics.arcade.enable(this.player);

        this.ground = new Ground.Ground(this.game);


    }
}