var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports"], function (require, exports) {
    var GroundTile = (function (_super) {
        __extends(GroundTile, _super);
        function GroundTile(game, x, y) {
            _super.call(this, game, x, y, 'place2');
            game.add.existing(this);
            this.game.physics.arcade.enable(this);
            this.body.immovable = true;
            this.body.allowGravity = false;
        }
        return GroundTile;
    })(Phaser.Sprite);
    exports.GroundTile = GroundTile;
});
