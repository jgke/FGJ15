var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports"], function (require, exports) {
    var InfoScreen = (function (_super) {
        __extends(InfoScreen, _super);
        function InfoScreen(text) {
            _super.call(this);
            this.raw = text;
        }
        InfoScreen.prototype.create = function () {
            var _this = this;
            this.text = new Phaser.Text(this.game, 32, 32, this.raw, { font: "35px Arial", fill: "#333" });
            this.text.alpha = 0;
            this.game.add.existing(this.text);
            this.game.add.tween(this.text).to({ alpha: 1 }, 500).start();
            this.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR).onDown.addOnce(function () {
                _this.game.state.start('MainMenu');
            }, this);
        };
        return InfoScreen;
    })(Phaser.State);
    exports.InfoScreen = InfoScreen;
});
