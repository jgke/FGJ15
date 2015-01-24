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
    ]
];

/*
0: empty
1: solid
 */

export class Chunk extends Phaser.Group {
    length: number;
    constructor(game: Phaser.Game, offset: number) {
        super(game);
        var data = chunks[0]; //[Math.floor(Math.random() * chunks.length)];
        this.length = data[0].length;
        for(var y = 0; y < data.length; y++) {
            for(var x = 0; x < data[y].length; x++) {
                switch(data[y][x]) {
                    case 1:
                        this.add(new GroundTile.GroundTile(this.game, offset * 64 + x * 64, y * 64));
                }
            }
        }
    }
}