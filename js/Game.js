var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports", "./Boot", "./Preloader", "./MainMenu", "./Level", "./GameOver", "./GameComplete", "./InfoScreen"], function (require, exports, Boot, Preloader, MainMenu, Level, GameOver, GameComplete, InfoScreen) {
    var Game = (function (_super) {
        __extends(Game, _super);
        function Game() {
            _super.call(this, "100%", "100%", Phaser.AUTO, 'content');
            this.state.add('Boot', Boot.Boot);
            this.state.add('Preloader', Preloader.Preloader);
            this.state.add('MainMenu', MainMenu.MainMenu);
            this.state.add('Help', new InfoScreen.InfoScreen("Space - Jump\nQ - Switch to the designer\nW - Switch to the graphics artist\nO - Switch to the sound guy\nP - Switch to the programmer"));
            this.state.add('Credits', new InfoScreen.InfoScreen("Programming: Jaakko Hannikainen & Juhani Imberg\nGraphics: Miki Korhonen, Miika Kukkonen & Tom Nakari\n" + "Audio: Miki Korhonen, Ami Lagergren,\n           Niko Liljeblad & Kasper Sirenius"));
            this.state.add('Level', Level.Level);
            this.state.add('GameOver', GameOver.GameOver);
            this.state.add('GameComplete', GameComplete.GameComplete);
            this.state.start('Boot');
        }
        return Game;
    })(Phaser.Game);
    exports.Game = Game;
});
