import GroundTile = require("./GroundTile");

var chunks = [
    [
        [1, 1, 1, 1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1, 1, 1, 1],
    ],
    [
        [0, 0, 1, 1, 1, 1, 0, 0],
        [1, 1, 1, 1, 1, 1, 1, 0],
        [1, 1, 1, 1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1, 1, 1, 1],
    ],
    [
        [0, 0, 0, 0, 1, 1, 0, 0],
        [0, 0, 1, 1, 1, 1, 1, 0],
        [1, 1, 1, 1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1, 1, 1, 1],
    ],
    [
        [1, 1, 1, 1, 0, 0, 0, 0],
        [1, 1, 1, 1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1, 1, 1, 1],
    ],
    [
        [0, 1, 1, 1, 0, 0, 0, 0],
        [1, 1, 1, 1, 1, 0, 0, 0],
        [0, 0, 1, 1, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 1, 1],
        [1, 1, 1, 1, 1, 1, 1, 1],
    ],
];

/*
0: empty
1: solid
 */

export class Chunk extends Phaser.Group {
    diffX: number;
    diffY: number;
    constructor(game: Phaser.Game, id: number, offset: number) {
        super(game);
        var data = chunks[id];
        this.diffX = data[0].length;
        this.diffY = data.length;
        for(var y = 0; y < data.length; y++) {
            for(var x = 0; x < data[y].length; x++) {
                switch(data[y][x]) {
                    case 1:
                        this.add(new GroundTile.GroundTile(this.game,
                                                           offset * 64 + x * 64,
                                                           y * 64 + (game.height - 64 * (this.diffY + 1))));
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
    newChunk(type=-1) {
        var chunk;
        if(type >= 0) {
            chunk = new Chunk(this.game, type, this.offset);
        } else {
            chunk = new Chunk(this.game, Math.floor(Math.random() * chunks.length), this.offset);
        }
        this.offset += chunk.diffX;
        return chunk;
    }
}