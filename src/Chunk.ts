import GroundTile = require("./GroundTile");

var chunks = [
    [
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [1, 1, 1, 1],
    ],
    [
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 1, 1, 0],
        [1, 0, 0, 1],
    ],
    [
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 1],
        [0, 0, 1, 0],
        [1, 1, 0, 0],
    ],
    [
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [1, 0, 0, 1],
        [0, 1, 1, 0],
    ],
];

/*
0: empty
1: solid
 */

export class Chunk extends Phaser.Group {
    diffX: number;
    diffY: number = 6;
    constructor(game: Phaser.Game, id: number, offset: number) {
        super(game);
        var data = chunks[id];
        this.diffX = data[0].length;
        for(var y = 0; y < data.length; y++) {
            for(var x = 0; x < data[y].length; x++) {
                switch(data[y][x]) {
                    case 1:
                        this.add(new GroundTile.GroundTile(this.game,
                                                           offset * 64 + x * 64,
                                                           y * 64 + (game.height - 64 * this.diffY)));
                }
            }
        }
    }
}

export class ChunkFactory {
    game: Phaser.Game;
    offset: number;
    constructor(game: Phaser.Game) {
        this.game = game;
        this.offset = 0;
    }
    newChunk() {
        var chunk = new Chunk(this.game, Math.floor(Math.random() * chunks.length), this.offset);
        this.offset += chunk.diffX;
        return chunk;
    }
}