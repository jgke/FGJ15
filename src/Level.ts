import Player = require("./Player");
import Chunk = require("./Chunk");

export class Level extends Phaser.State {
    player: Player.Player;
    chunks: Array<Chunk.Chunk>;
    genpos: number;
    lastdelpos: number;

    create() {
        this.game.physics.startSystem(Phaser.Physics.P2JS);
        this.game.physics.arcade.gravity.y = 2000;
        this.game.world.setBounds(0, 0, 1000, 500);
        this.genpos = 0;
        this.chunks = [];
        this.player = new Player.Player(this.game, 500, 100);
        this.player.ground = this.chunks;
        this.lastdelpos = 400;

        for(var i = 0; i < 12; i++) {
            this.addChunk();
        }
    }

    addChunk() {
        this.chunks.push(new Chunk.Chunk(this.game, this.genpos));
        this.genpos += this.chunks[this.chunks.length - 1].length;
        this.game.world.setBounds(0, 0, this.genpos * 64, 64 * 6);
    }

    removeChunk() {
        console.log("--");
        var chunk = this.chunks.shift();
        chunk.destroy();
    }

    update() {
        var ppos = this.camera.x;
        if(ppos - this.lastdelpos > 64 * 4) {
            this.removeChunk();
            this.addChunk();
            this.lastdelpos += 64*4;
        }
    }
}