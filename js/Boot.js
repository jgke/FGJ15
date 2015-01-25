var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports"], function (require, exports) {
    var Boot = (function (_super) {
        __extends(Boot, _super);
        function Boot() {
            _super.apply(this, arguments);
        }
        Boot.prototype.preload = function () {
            this.load.image('1', 'assets/1.png');
        };
        Boot.prototype.create = function () {
            this.input.maxPointers = 1;
            this.game.state.start('Preloader', true, false);
            this.stage.backgroundColor = "#f8f8f8";
        };
        return Boot;
    })(Phaser.State);
    exports.Boot = Boot;
});
