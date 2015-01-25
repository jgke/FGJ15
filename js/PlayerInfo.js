var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports"], function (require, exports) {
    var PlayerInfo = (function (_super) {
        __extends(PlayerInfo, _super);
        function PlayerInfo(game, type) {
            _super.call(this, game);
            this.specializations = [];
            this.specializationbars = [];
            this.selected = false;
            this.game.add.existing(this);
            this.x = (this.game.width / 4) * type;
            this.y = this.game.height - 64;
            this.fixedToCamera = true;
            this.bg = new Phaser.Sprite(this.game, this.x, this.y, '1');
            this.bg.fixedToCamera = true;
            this.bg.scale.y = 32;
            this.bg.scale.x = (this.game.width / 4);
            this.bg.tint = 0x333333;
            this.add(this.bg);
            this.game.add.existing(this.bg);
            for (var i = 0; i < 4; i++) {
                this.specializations[i] = (i == type ? 0.7 : 0.1);
            }
            for (var i = 0; i < 4; i++) {
                var bar = new Phaser.Sprite(this.game, this.x + 100, this.y + i * 8, '1');
                switch (i) {
                    case 0:
                        bar.tint = 0xff0000;
                        break;
                    case 1:
                        bar.tint = 0x00ff00;
                        break;
                    case 2:
                        bar.tint = 0x0000ff;
                        break;
                    case 3:
                        bar.tint = 0xffff00;
                        break;
                }
                bar.scale.y = 8;
                bar.scale.x = this.specializations[i] * 100;
                bar.fixedToCamera = true;
                this.specializationbars[i] = bar;
                this.add(bar);
                this.game.add.existing(bar);
            }
            switch (type) {
                case 0:
                    this.name = "Designer";
                    break;
                case 1:
                    this.name = "Artist";
                    break;
                case 2:
                    this.name = "Musician";
                    break;
                case 3:
                    this.name = "Coder";
                    break;
            }
            this.namerender = new Phaser.Text(this.game, this.x, this.y, this.name, {
                fill: "#f8f8f8",
                font: "bold 18px Arial",
                align: "right"
            });
            this.namerender.fixedToCamera = true;
            this.add(this.namerender);
            this.game.add.existing(this.namerender);
        }
        PlayerInfo.prototype.addTo = function (n) {
            var amo = 0;
            if (this.specializations[n] >= 0.99) {
                return;
            }
            for (var i = 0; i < 4; i++) {
                amo += this.specializations[i] / 10;
                this.specializations[i] *= 0.9;
            }
            this.specializations[n] += amo;
            this.updatebars();
        };
        PlayerInfo.prototype.updatebars = function () {
            for (var i = 0; i < 4; i++) {
                this.specializationbars[i].scale.x = this.specializations[i] * 100;
            }
        };
        PlayerInfo.prototype.select = function () {
            this.selected = true;
            this.bg.tint = 0x555555;
        };
        PlayerInfo.prototype.unselect = function () {
            this.selected = false;
            this.bg.tint = 0x333333;
        };
        return PlayerInfo;
    })(Phaser.Group);
    exports.PlayerInfo = PlayerInfo;
});
