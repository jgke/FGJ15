import Player = require("./Player");
import Chunk = require("./Chunk");
import Monster = require("./Monster");

export class Level extends Phaser.State {
    player: Player.Player;
    chunks: Array<Chunk.Chunk>;
    chunkFactory: Chunk.ChunkFactory;
    monsters: Phaser.Group;
    genpos: number;
    lastdelpos: number;
    bgm: Phaser.Sound = null;
    cityimg: Phaser.TileSprite;
    roadimg: Phaser.TileSprite;
    blind: Phaser.Sprite;
    monsterType: number;
    nextMonster: boolean = false;
    boss: Monster.Monster = null;
    generateMonsters: boolean = true;
    won: boolean = false;
    bgms: any = [];

    create() {
        this.won = false;
        this.generateMonsters = true;
        this.boss = null;
        this.nextMonster = false;
        this.game.physics.startSystem(Phaser.Physics.P2JS);
        this.game.physics.arcade.gravity.y = 2000;
        this.game.world.setBounds(0, 0, 1000, 500);
        this.genpos = 0;
        this.chunks = [];
        var bg = this.game.add.sprite(0, 0, 'sky720');
        bg.fixedToCamera = true;
        bg.scale.x = this.game.width / bg.width;
        bg.scale.y = this.game.height / bg.height;
        this.cityimg = this.game.add.tileSprite(0, this.game.height - 240 - 390, this.game.width, this.game.height, 'city720');
        this.cityimg.fixedToCamera = true;
        this.roadimg = this.game.add.tileSprite(0, this.game.height - 210, this.game.width, this.game.height, 'road720');
        this.roadimg.fixedToCamera = true;
        this.monsters = new Phaser.Group(this.game);
        this.player = new Player.Player(this.game, 900, 100, this.chunks);
        this.player.onDestroy.add(() => {
            this.lose();
        }, this);
        this.lastdelpos = 400;
        this.chunkFactory = new Chunk.ChunkFactory(this.game);
        this.game.sound.stopAll();
        for(var i = 0; i < 4; i++) {
            this.bgms.push(this.game.sound.add('plr' + (i+1) + '_music', 0));
            this.bgms[i].loop = true;
            this.bgms[i].play();
        }
        this.bgm = this.bgms[0];
        this.bgmselect(0);
        var muteKey = this.game.input.keyboard.addKey(Phaser.Keyboard.M);
        muteKey.onDown.add(() => {this.bgm.isPlaying ? this.bgm.pause() : this.bgm.play()}, this);

        for(var i = 0; i < 4; i++) {
            this.addChunk(0);
        }
        for(var i = 0; i < 4; i++) {
            this.addChunk();
        }
        this.monsterType = 4;

        this.blind = this.game.add.sprite(0, 0, '1');
        this.blind.tint = 0xf8f8f8;
        this.blind.scale.x = this.game.width;
        this.blind.scale.y = this.game.height;
        this.blind.fixedToCamera = true;
        this.game.add.tween(this.blind).to({alpha: 0}, 1000).start().onComplete.addOnce(() => {
            this.blind.visible = false;
        }, this);
        this.player.z = 9000;
    }

    addChunk(val=-1) {
        this.chunks.push(this.chunkFactory.newChunk(val));
        this.genpos += this.chunks[this.chunks.length - 1].diffX;
        this.game.world.setBounds(0, 0, this.genpos * 64, this.game.height);
    }

    removeChunk() {
        var chunk = this.chunks.shift();
        chunk.destroy();
    }

    addMonster(type: number) {
        var monster = new Monster.Monster(this.game, this.lastdelpos + this.game.width + 200, 100, type);
        monster.ground = this.chunks;
        this.monsters.add(monster);
        if(type == 666) {
            this.bgm.fadeOut();
            this.bgm = this.game.add.audio('bossfight');
            this.bgm.fadeIn();
            this.boss = monster;
            this.boss.events.onKilled.addOnce(() => {
                this.won = true;
                this.game.sound.stopAll();
                this.game.state.start('GameComplete');
            }, this);
        }
    }

    bgmselect(name: number) {
        if(this.boss != null) {
            return;
        }
        this.bgm.volume = 0;
        this.bgm = this.bgms[name];
        this.bgm.volume = 1;
    }

    b0ss() {
        this.generateMonsters = false;
        this.addMonster(666);
    }

    lose() {
        if(this.won) {
            return;
        }
        this.blind.visible = true;
        this.blind.bringToTop();
        this.game.add.tween(this.blind).to({alpha: 1}, 1000).start().onComplete.addOnce(() => {
            this.game.state.start('GameOver');
        }, this);
    }

    update() {
        this.cityimg.tilePosition.x -= 0.75;
        this.roadimg.tilePosition.x -= 1.25;
        this.game.physics.arcade.overlap(this.player.bullets, this.monsters, (bullet, monster) => {
            var monsterType = monster.monsterType;
            var bulletType = bullet.bulletType;
            if(monster.hit(bullet.dmg) || monsterType == 666) {
                this.player.addScore(monsterType, bulletType);
                this.player.removeHP(-1);
            }
            bullet.kill();
        });
        this.game.physics.arcade.overlap(this.player.bullets, this.chunks, (bullet) => {
            bullet.kill();
        });
        if(this.boss != null) {
            this.game.physics.arcade.overlap(this.player.current, this.boss.bossbullets, (player, bullet) => {
                var bulletType = bullet.bulletType;
                this.player.removeHP(1);
                bullet.kill();
            });
            this.game.physics.arcade.overlap(this.boss.bossbullets, this.chunks, (bullet) => {
                bullet.kill();
            });
        }

        var ppos = this.camera.x;
        if(ppos - this.lastdelpos > 64 * this.chunks[0].diffX) {
            this.removeChunk();
            this.addChunk();
            this.lastdelpos += 64 * this.chunks[0].diffX;
            if (Math.random() > 0.5) {
                this.monsterType = Math.floor(Math.random() * 5);
            }
            if(this.generateMonsters) {
                this.addMonster(this.monsterType);
            }
            //this.nextMonster = !this.nextMonster;
        }
    }
}