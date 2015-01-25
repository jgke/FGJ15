export class Preloader extends Phaser.State {
    preloadBar: Phaser.Sprite;
    preload() {
        this.preloadBar = this.add.sprite(0, 8, '1');
        this.preloadBar.scale.x = this.game.width * 2;
        this.preloadBar.scale.y = 16;
        this.preloadBar.tint = 0x333333;
        this.preloadBar.anchor = new Phaser.Point(0.5, 0.5);
        this.load.setPreloadSprite(this.preloadBar);
        this.stage.backgroundColor = "#f8f8f8";

        var images = {
            "place1": "assets/place1.png",
            'place2': 'assets/place2.png',
            'place3': 'assets/place3.png',
            'place4': 'assets/place4.png',
            'sky720': 'assets/sky720.png',
            'city720': 'assets/city720.png',
            'road720': 'assets/road720.png',
            'plr2': 'assets/eugene.png',
            'plr1': 'assets/douglas.png',
            'plr4': 'assets/rebecca.png',
            'plr3': 'assets/steve.png',
            'plr2_projectile': 'assets/eugene_projectile.png',
            'plr1_projectile': 'assets/douglas_projectile.png',
            'plr4_projectile': 'assets/rebecca_projectile.png',
            'plr3_projectile': 'assets/steve_projectile.png',
            '1': 'assets/1.png',
            "blaze": "assets/blaze.png",
            "enm1": "assets/brain_fart_enemy.png",
            "enm2": "assets/hourglass_enemy.png",
            "enm3": "assets/empty_cigarette_pack_enemy.png",
            "enm4": "assets/sun_enemy.png",
            "enm5": "assets/place1.png",
            "enm667": "assets/boss.png",
            "enm667s": "assets/boss_shoot_face.png"
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
        var tween = this.add.tween(this.preloadBar).to({ alpha: 0 }, 500, Phaser.Easing.Linear.None, true);
        tween.onComplete.add(() => {this.game.state.start('MainMenu', true, false)}, this);
    }

}