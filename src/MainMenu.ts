import Player = require("./Player");

export class MainMenu extends Phaser.State {
    player: Player.Player;
    create() {
        this.game.physics.startSystem(Phaser.Physics.ARCADE);
        this.player = new Player.Player(this.game, 200, 200);
        this.game.physics.arcade.gravity.y = 1000;
        this.game.physics.arcade.enable(this.player);

    }
    fadeOut() {

    }
}