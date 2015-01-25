var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports"], function (require, exports) {
    var GameOver = (function (_super) {
        __extends(GameOver, _super);
        function GameOver() {
            _super.apply(this, arguments);
        }
        GameOver.prototype.create = function () {
            var _this = this;
            var text = new Phaser.Text(this.game, this.game.width / 2, this.game.height / 2, "Game Over!\nSpace to restart.", {
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
            this.game.sound.stopAll();
            var bgm = this.game.add.audio('pausemenu');
            bgm.loop = true;
            bgm.play();
        };
        return GameOver;
    })(Phaser.State);
    exports.GameOver = GameOver;
});
