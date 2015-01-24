import Player = require("./Player");

export class Level extends Phaser.State {
    player: Player.Player;

    constructor() {
        this.player = new Player.Player(this.game, this.game.width/2, this.game.height/2);
    }
}