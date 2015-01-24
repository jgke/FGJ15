export class Preloader extends Phaser.State {
    preloadBar: Phaser.Sprite;
    preload() {
        this.preloadBar = this.add.sprite(this.game.width/2, this.game.height/2, 'preloadBar');
        this.preloadBar.scale.x = this.game.width/this.preloadBar.width;
        this.preloadBar.anchor = new Phaser.Point(0.5, 0.5);
        this.load.setPreloadSprite(this.preloadBar);

        var images = {
            "place1": "assets/place1.png",
            'place2': 'assets/place2.png',
            'place3': 'assets/place3.png',
            'place4': 'assets/place4.png',
            'sky720': 'assets/sky720.png',
            'city720': 'assets/city720.png',
            'road720': 'assets/road720.png',
            'eugene': 'assets/eugene.png',
            'douglas': 'assets/douglas.png',
            'rebecca': 'assets/rebecca.png',
            'steve': 'assets/steve.png',
            'eugene_projectile': 'assets/eugene_projectile.png',
            'douglas_projectile': 'assets/douglas_projectile.png',
            'rebecca_projectile': 'assets/rebecca_projectile.png',
            'steve_projectile': 'assets/steve_projectile.png',
            '1': 'assets/1.png',
            "blaze": "assets/blaze.png"
        };

        var audios = {
            "bgm": "assets/mix3FGJ2015.ogg",
            "chord": "assets/chord.ogg",
            "bossfight": "assets/bossfight.ogg",
            "cashregister": "assets/cashregister.ogg",
            "doorbell": "assets/doorbell.ogg",
            "explosion": "assets/explosion.ogg",
            "garbagecan": "assets/garbagecan.ogg",
            "gun1": "assets/gun1.ogg",
            "gun2": "assets/gun2.ogg",
            "gun3": "assets/gun3.ogg",
            "heavytheme": "assets/heavytheme.ogg",
            "heavythemeending": "assets/heavythemeending.ogg",
            "jump": "assets/jump.ogg",
            "menu": "assets/menu.ogg",
            "8bit": "assets/mixFGJ2015_8bit.ogg",
            "pausemenu": "assets/pausemenu.ogg",
            "punch": "assets/punch.ogg",
            "sunpop": "assets/sunpop.ogg"

        }

        for(var k in images) {
            this.load.image(k, images[k]);
        }
        for(var k in audios) {
            this.load.audio(k, audios[k]);
        }

    }

    create() {
        var tween = this.add.tween(this.preloadBar).to({ alpha: 0 }, 1000, Phaser.Easing.Linear.None, true);
        tween.onComplete.add(() => {this.game.state.start('Level', true, false)}, this);
    }

}