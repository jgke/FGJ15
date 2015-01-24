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
    bgm: Phaser.Sound;
    cityimg: Phaser.TileSprite;
    roadimg: Phaser.TileSprite;s

    create() {
        this.game.physics.startSystem(Phaser.Physics.P2JS);
        this.game.physics.arcade.gravity.y = 2000;
        this.game.world.setBounds(0, 0, 1000, 500);
        this.genpos = 0;
        this.chunks = [];
        var bg = this.game.add.sprite(0, 0, 'sky720');
        bg.fixedToCamera = true;
        bg.scale.x = this.game.width / bg.width;
        bg.scale.y = this.game.height / bg.height;
        this.cityimg = this.game.add.tileSprite(0, 0, this.game.width, this.game.height, 'city720');
        this.cityimg.fixedToCamera = true;
        this.roadimg = this.game.add.tileSprite(0, 0, this.game.width, this.game.height, 'road720');
        this.roadimg.fixedToCamera = true;
        this.monsters = new Phaser.Group(this.game);
        this.player = new Player.Player(this.game, 500, 100);
        this.player.ground = this.chunks;
        this.lastdelpos = 400;
        this.chunkFactory = new Chunk.ChunkFactory(this.game);
        this.game.sound.stopAll();
        this.bgm = this.game.add.audio('bgm');
        this.bgm.loop = true;
        this.bgm.play();
        var muteKey = this.game.input.keyboard.addKey(Phaser.Keyboard.M);
        muteKey.onDown.add(() => {this.bgm.isPlaying ? this.bgm.pause() : this.bgm.play()}, this);

        for(var i = 0; i < 12; i++) {
            this.addChunk();
        }
        this.addMonster(0);
    }

    addChunk() {
        this.chunks.push(this.chunkFactory.newChunk());
        this.genpos += this.chunks[this.chunks.length - 1].diffX;
        this.game.world.setBounds(0, 0, this.genpos * 64, this.game.height);
    }

    removeChunk() {
        console.log("--");
        var chunk = this.chunks.shift();
        chunk.destroy();
    }

    addMonster(type: number) {
        var monster = new Monster.Monster(this.game, this.lastdelpos + this.game.width + 200, 100, type);
        monster.ground = this.chunks;
        this.monsters.add(monster);
    }

    update() {
        this.cityimg.tilePosition.x -= 0.75;
        this.roadimg.tilePosition.x -= 1.25;
        this.game.physics.arcade.overlap(this.player.bullets, this.monsters, (bullet, monster) => {
            monster.hit();
            bullet.kill();
        });
        this.game.physics.arcade.overlap(this.player.bullets, this.chunks, (bullet) => {
            bullet.kill();
        });

        var ppos = this.camera.x;
        if(ppos - this.lastdelpos > 64 * this.chunks[0].diffX) {
            this.removeChunk();
            this.addChunk();
            this.lastdelpos += 64*this.chunks[0].diffX;
            this.addMonster(0);
        }
    }
}