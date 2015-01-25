var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports", "./GroundTile"], function (require, exports, GroundTile) {
    var Ground = (function (_super) {
        __extends(Ground, _super);
        function Ground(game) {
            _super.call(this, game);
            for (var i = 0; i <= game.width; i += 64) {
                this.addNew(i);
            }
            this.pos = 0;
        }
        Ground.prototype.addNew = function (x) {
            this.add(new GroundTile.GroundTile(this.game, x, this.game.height - (128 * Math.random()) - 64));
        };
        Ground.prototype.update = function () {
            _super.prototype.update.call(this);
            this.pos += 6;
            if (this.pos > 32) {
                this.addNew(this.game.width);
                this.pos = 0.5;
            }
        };
        return Ground;
    })(Phaser.Group);
    exports.Ground = Ground;
});
