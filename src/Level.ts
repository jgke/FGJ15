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

    create() {
        this.game.physics.startSystem(Phaser.Physics.P2JS);
        this.game.physics.arcade.gravity.y = 2000;
        this.game.world.setBounds(0, 0, 1000, 500);
        this.genpos = 0;
        this.chunks = [];
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