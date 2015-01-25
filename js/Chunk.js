var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports", "./GroundTile"], function (require, exports, GroundTile) {
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
    var Chunk = (function (_super) {
        __extends(Chunk, _super);
        function Chunk(game, id, offset) {
            _super.call(this, game);
            var data = chunks[id];
            this.diffX = data[0].length;
            this.diffY = data.length;
            for (var y = 0; y < data.length; y++) {
                for (var x = 0; x < data[y].length; x++) {
                    switch (data[y][x]) {
                        case 1:
                            this.add(new GroundTile.GroundTile(this.game, offset * 64 + x * 64, y * 64 + (game.height - 64 * (this.diffY + 1))));
                    }
                }
            }
        }
        return Chunk;
    })(Phaser.Group);
    exports.Chunk = Chunk;
    var ChunkFactory = (function () {
        function ChunkFactory(game) {
            this.game = game;
            this.offset = 0;
        }
        ChunkFactory.prototype.newChunk = function (type) {
            if (type === void 0) { type = -1; }
            var chunk;
            if (type >= 0) {
                chunk = new Chunk(this.game, type, this.offset);
            }
            else {
                chunk = new Chunk(this.game, Math.floor(Math.random() * chunks.length), this.offset);
            }
            this.offset += chunk.diffX;
            return chunk;
        };
        return ChunkFactory;
    })();
    exports.ChunkFactory = ChunkFactory;
});
