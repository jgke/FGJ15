import Chunk = require("./Chunk");
import Bullet = require("./Bullet");
import Character = require("./Character");

export class Player extends Phaser.Group {
    speed: number = 7;
    currentShotCD: number;
    shotCD: number = 15;
    bullets: Phaser.Group;
    current: Character.Character;
    ground: Array<Chunk.Chunk>;
    xhist: Array<number>;
    yhist: Array<number>;
    histsize: number = 30;

    score: number;
    hp: number;
    scoreui: Phaser.Text;
    hpui: Phaser.Text;

    constructor(game: Phaser.Game, x: number, y: number, ground: Array<Chunk.Chunk>) {
        super(game);

        game.camera.focusOn(this);

        this.currentShotCD = this.shotCD;
        this.bullets = new Phaser.Group(this.game);
        this.ground = ground;
        this.score = 0;
        this.hp = 100;
        this.xhist = [];
        this.yhist = [];
        for(var i = 0; i < this.histsize; i++) {
            this.xhist.push(0);
            this.yhist.push(0);
        }

        for(var i = 0; i < 4; i++) {

            var character = new Character.Character(game, 500 + 64 * i, y, i, ground);
            character.speed = this.speed;
            if(i == 3) {
                this.current = character;
            }
            this.add(character);
        }

        var bgui = new Phaser.Sprite(this.game, 0, 0, '1');
        bgui.scale.x = this.game.width;
        bgui.scale.y = 32;
        bgui.tint = 0x000000;
        this.add(bgui);
        bgui.fixedToCamera = true;
        this.game.add.existing(bgui);

        var style = {align: "center", font: "24px Monospace", fill: "#f5f5f5"};

        this.scoreui = new Phaser.Text(this.game, 4, 4, "Score " + this.score, style);
        this.scoreui.fixedToCamera = true;
        this.game.add.existing(this.scoreui);

        this.hpui = new Phaser.Text(this.game, 204, 4, "Health " + this.hp, style);
        this.hpui.fixedToCamera = true;
        this.game.add.existing(this.hpui);
    }

    switchCharacter(n: number) {
        var op, np, nt;
        for(var i = 0; i < this.children.length; i++) {
            var c = <Character.Character>this.children[i];
            if(c.playerType == n) {
                np = i;
                nt = c.playerType;
            }
            if(c.playerType == this.current.playerType) {
                op = i;
            }
        }
        (<Character.Character>this.children[np]).setType(this.current.playerType);
        this.current.setType(nt);
    }

    shoot() {
        this.currentShotCD = this.shotCD;
        var bullet = new Bullet.Bullet(this.game, this.current.position.x, this.current.position.y, 0);
        this.bullets.add(bullet);
    }

    jump() {
        if(this.current.jumpable()) {
            this.current.jump();
        }
    }

    setVel(x: number) {
        this.current.body.maxVelocity.setTo(x, 5000);
    }

    update() {
        super.update();
        this.game.physics.arcade.collide(this, this.ground, null, null, this);
        this.game.camera.x += this.speed;

        if(this.game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)) {
            this.jump();
        }

        if(this.game.input.keyboard.isDown(Phaser.Keyboard.Q)) {
            this.switchCharacter(0);
        }
        if(this.game.input.keyboard.isDown(Phaser.Keyboard.W)) {
            this.switchCharacter(1);
        }
        if(this.game.input.keyboard.isDown(Phaser.Keyboard.O)) {
            this.switchCharacter(2);
        }
        if(this.game.input.keyboard.isDown(Phaser.Keyboard.P)) {
            this.switchCharacter(3);
        }

        var relX = this.current.position.x - this.game.camera.x;
        this.xhist.shift();
        this.yhist.shift();
        this.xhist.push(this.current.position.x);
        this.yhist.push(this.current.position.y);
        var modifier = 0;
        for(var i = 0; i < 3; i++) {
            this.children[i].position.x = this.xhist[i*10];
            this.children[i].position.y = this.yhist[i*10];
        }

        if(relX < -64) {
            this.game.state.start('GameOver');
            this.destroy();
            return;
        } else if(relX < 200) {
            this.setVel(this.speed * 70);
        } else if(relX > 300) {
            this.setVel(this.speed * 50);
        } else {
            this.setVel(this.speed * 60);
        }

        this.currentShotCD--;
        if(this.currentShotCD <= 0) {
            this.shoot();
        }
    }
}