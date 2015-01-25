var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports"], function (require, exports) {
    var MainMenu = (function (_super) {
        __extends(MainMenu, _super);
        function MainMenu() {
            _super.apply(this, arguments);
        }
        MainMenu.prototype.create = function () {
            this.stage.backgroundColor = "#f8f8f8";
            this.stuff = new Phaser.Group(this.game);
            this.stuff.pivot.set(0.5, 0.5);
            this.text = new Phaser.Text(this.game, this.game.width / 2, this.game.height / 4, "GOTTA\nGO\nFAST", { font: "bold 70px Arial", fill: "#333", align: "center" });
            this.text.anchor.set(0.5, 0.5);
            this.text.alpha = 0;
            this.game.add.existing(this.text);
            this.stuff.add(this.text);
            this.border = new Phaser.Sprite(this.game, this.game.width / 2, this.game.height / 2, '1');
            this.border.anchor.set(0.5, 0.5);
            this.border.tint = 0x333333;
            this.border.scale.x = 240;
            this.border.alpha = 0;
            this.game.add.existing(this.border);
            this.stuff.add(this.border);
            this.prompt = new Phaser.Text(this.game, this.game.width / 2, this.game.height / 4 * 3, "Space - Starts the game\nQ - Help\nW - Credits", { font: "bold 35px Arial", fill: "#333", align: "center" });
            this.prompt.anchor.set(0.5, 0.5);
            this.prompt.alpha = 0;
            this.game.add.existing(this.prompt);
            this.stuff.add(this.prompt);
            this.game.add.tween(this.text).to({ alpha: 1 }, 500).start();
            this.game.add.tween(this.border).to({ alpha: 1 }, 500).start();
            this.game.add.tween(this.prompt).to({ alpha: 1 }, 500).start();
            this.addTransition(Phaser.Keyboard.SPACEBAR, 'Level');
            this.addTransition(Phaser.Keyboard.Q, 'Help');
            this.addTransition(Phaser.Keyboard.W, 'Credits');
            this.game.sound.stopAll();
            var bgm = this.game.add.audio('menu');
            bgm.loop = true;
            bgm.play();
        };
        MainMenu.prototype.addTransition = function (key, level) {
            var _this = this;
            this.input.keyboard.addKey(key).onDown.addOnce(function () {
                _this.game.add.tween(_this.text).to({ alpha: 0 }, 500).start().onComplete.addOnce(function () {
                    _this.game.state.start(level);
                }, _this);
                _this.game.add.tween(_this.border).to({ alpha: 0 }, 500).start();
                _this.game.add.tween(_this.prompt).to({ alpha: 0 }, 500).start();
            }, this);
        };
        return MainMenu;
    })(Phaser.State);
    exports.MainMenu = MainMenu;
});
