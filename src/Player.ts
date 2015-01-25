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
    grounded: Array<boolean>;
    histsize: number = 31;

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
        this.grounded = [];
        for(var i = 0; i < this.histsize; i++) {
            this.xhist.push(0);
            this.yhist.push(0);
            this.grounded.push(false);
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
        bgui.tint = 0xf8f8f8;
        this.add(bgui);
        bgui.fixedToCamera = true;
        this.game.add.existing(bgui);

        var style = {align: "center", font: "bold 24px Arial", fill: "#333"};

        this.scoreui = new Phaser.Text(this.game, 100, 20, "Score: " + this.score, style);
        this.scoreui.anchor.set(0.5, 0.5);
        this.scoreui.fixedToCamera = true;
        this.game.add.existing(this.scoreui);

        this.hpui = new Phaser.Text(this.game, 300, 20, "HP: " + this.hp, style);
        this.hpui.anchor.set(0.5, 0.5);
        this.hpui.fixedToCamera = true;
        this.game.add.existing(this.hpui);
    }

    addScore(n: number) {
        this.score += n;
        this.scoreui.setText("Score: " + this.score);
        this.game.add.tween(this.scoreui.scale).to({x: 1.25, y: 1.25}, 100).chain(this.game.add.tween(this.scoreui.scale).to({x: 1, y: 1}, 100)).start();
    }

    removeHP(n: number) {
        this.hp -= n;
        this.hpui.setText("HP: " + this.hp);
        this.game.add.tween(this.hpui.scale).to({x: 1.25, y: 1.25}, 100).chain(this.game.add.tween(this.hpui.scale).to({x: 1, y: 1}, 100)).start();
        if(this.hp <= 0) {
            this.destroy();
        }
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
        var bullet = new Bullet.Bullet(this.game, this.current.position.x, this.current.position.y, this.current.playerType);
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
        this.grounded.shift();
        this.xhist.push(this.current.position.x);
        this.yhist.push(this.current.position.y);
        this.grounded.push(this.current.jumpable());
        var modifier = 0;
        for(var i = 0; i < 3; i++) {
            this.children[i].position.x = this.xhist[i*10];
            this.children[i].position.y = this.yhist[i*10];
        }
        for(var i = 0; i < 4; i++) {
            var child = <Character.Character>this.children[i];
            if(this.grounded[i * 10]) {
                (<Character.Character>child).emitter.start(true, 400, null, 1);
            }
            /*
            else if(this.grounded[i*10 - 1]) {
                this.game.add.sound("jump").play();
            }
            */
        }
        if(relX < -64) {
            this.destroy();
            return;
        } else if(relX < 350) {
            this.setVel(this.speed * 70);
        } else if(relX > 450) {
            this.setVel(this.speed * 50);
        } else {
            this.setVel(this.speed * 60);
        }

        this.currentShotCD--;
        if(this.currentShotCD <= 0) {
            this.shoot();
            this.game.add.sound("gun3", 0.1).play();
        }
    }
}