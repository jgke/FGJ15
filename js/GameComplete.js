var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports"], function (require, exports) {
    var GameComplete = (function (_super) {
        __extends(GameComplete, _super);
        function GameComplete() {
            _super.apply(this, arguments);
        }
        GameComplete.prototype.create = function () {
            var _this = this;
            var text = new Phaser.Text(this.game, this.game.width / 2, this.game.height / 2, "Game Complete!\nSpace to restart.", {
                fill: "#333",
                font: "bold 70px Arial",
                align: "center"
            });
            text.anchor.set(0.5, 0.5);
            text.alpha = 0;
            this.game.add.existing(text);
            this.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR).onDown.add(function () {
                _this.game.add.tween(text).to({ alpha: 0 }, 500).start().onComplete.addOnce(function () {
                    _this.game.state.start('Level');
                });
            }, this);
            this.game.add.tween(text).to({ alpha: 1 }, 500).start();
            var bgm = this.game.add.audio('heavythemeending');
            bgm.loop = false;
            bgm.play();
        };
        return GameComplete;
    })(Phaser.State);
    exports.GameComplete = GameComplete;
});
