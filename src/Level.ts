import Player = require("./Player");
import Chunk = require("./Chunk");

export class Level extends Phaser.State {
    player: Player.Player;
    chunks: Array<Chunk.Chunk>;
    genpos: number;

    create() {
        this.game.physics.startSystem(Phaser.Physics.P2JS);
        this.game.physics.arcade.gravity.y = 1000;
        this.game.world.setBounds(0, 0, 1000, 500);
        this.genpos = 0;
        this.chunks = [];
        this.player = new Player.Player(this.game, 100, 100);
        this.player.ground = this.chunks;

        for(var i = 0; i < 50; i++) {
            this.addChunk();
        }
    }

    addChunk() {
        this.chunks.push(new Chunk.Chunk(this.game, this.genpos));
        this.genpos += this.chunks[this.chunks.length - 1].length;
        this.game.world.setBounds(0, 0, this.genpos * 64, 500);
    }
}