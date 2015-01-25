var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports", "./Bullet", "./Character", "./PlayerInfo"], function (require, exports, Bullet, Character, PlayerInfo) {
    var Player = (function (_super) {
        __extends(Player, _super);
        function Player(game, x, y, ground) {
            _super.call(this, game);
            this.speed = 7;
            this.shotCD = 15;
            this.histsize = 31;
            this.lastx = 0;
            this.rndboolean = false;
            game.camera.focusOn(this);
            this.characters = [];
            this.currentShotCD = this.shotCD;
            this.bullets = new Phaser.Group(this.game);
            this.ground = ground;
            this.score = 0;
            this.hp = 100;
            this.xhist = [];
            this.yhist = [];
            this.grounded = [];
            for (var i = 0; i < this.histsize; i++) {
                this.xhist.push(0);
                this.yhist.push(0);
                this.grounded.push(false);
            }
            for (var i = 0; i < 4; i++) {
                var character = new Character.Character(game, 500 + 64 * i, y, i, ground);
                character.speed = this.speed;
                if (i == 3) {
                    this.current = character;
                }
                this.add(character);
                this.characters.push(character);
            }
            var bgui = new Phaser.Sprite(this.game, 0, 0, '1');
            bgui.scale.x = this.game.width;
            bgui.scale.y = 32;
            bgui.tint = 0xf8f8f8;
            this.add(bgui);
            bgui.fixedToCamera = true;
            this.game.add.existing(bgui);
            var style = { align: "center", font: "bold 24px Arial", fill: "#333" };
            this.scoreui = new Phaser.Text(this.game, 100, 20, "Score: " + this.score, style);
            this.scoreui.anchor.set(0.5, 0.5);
            this.scoreui.fixedToCamera = true;
            this.game.add.existing(this.scoreui);
            this.hpui = new Phaser.Text(this.game, 300, 20, "HP: " + this.hp, style);
            this.hpui.anchor.set(0.5, 0.5);
            this.hpui.fixedToCamera = true;
            this.game.add.existing(this.hpui);
            /*this.speedui = new Phaser.Sprite(this.game, 400, 4, '1');
            this.speedui.fixedToCamera = true;
            this.speedui.tint = 0x333;
            this.speedui.scale.y = 24;
            this.game.add.existing(this.speedui);*/
            this.completion = [];
            this.completionui = [];
            this.completionbg = new Phaser.Sprite(this.game, 0, this.game.height - 32, '1');
            this.completionbg.fixedToCamera = true;
            this.completionbg.scale.y = 32;
            this.completionbg.scale.x = this.game.width;
            this.completionbg.tint = 0x333333;
            this.game.add.existing(this.completionbg);
            for (var i = 0; i < 5; i++) {
                this.completion[i] = 0;
                var bar = new Phaser.Sprite(this.game, 4, this.game.height - 28, '1');
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
                    case 4:
                        bar.tint = 0x777777;
                        break;
                }
                bar.scale.y = 32 - 8;
                bar.fixedToCamera = true;
                bar.visible = false;
                this.add(bar);
                this.completionui.push(bar);
                this.game.add.existing(bar);
            }
            this.infos = [];
            for (var i = 0; i < 4; i++) {
                var info = new PlayerInfo.PlayerInfo(this.game, i);
                this.add(info);
                this.bringToTop(info);
                this.infos.push(info);
                if (i == 3) {
                    info.select();
                }
            }
        }
        Player.prototype.changeSpeed = function (n) {
            this.speed = n;
            for (var c in this.children) {
                this.children[c].speed = n;
            }
            this.speedui.scale.x = n * 10;
        };
        Player.prototype.addScore = function (n, m) {
            if (this.rndboolean) {
                return;
            }
            this.score += 100;
            this.scoreui.setText("Score: " + this.score);
            this.game.add.tween(this.scoreui.scale).to({ x: 1.25, y: 1.25 }, 100).chain(this.game.add.tween(this.scoreui.scale).to({ x: 1, y: 1 }, 100)).start();
            if (n != 666) {
                this.completion[n]++;
                var pos = 0;
                var mul = (this.game.width - 8) / 100;
                for (var i = 0; i < 5; i++) {
                    var c = this.completion[i];
                    var b = this.completionui[i];
                    if (c > 0) {
                        b.visible = true;
                        b.cameraOffset.x = 4 + (pos * mul);
                        b.scale.x = c * mul;
                        pos += c;
                    }
                }
                if (pos == 100) {
                    this.game.state.getCurrentState().b0ss();
                }
                this.infos[this.current.playerType].addTo(n);
            }
            else {
                if (this.completion[4] > 0) {
                    this.completion[4]--;
                }
                else if (this.completion[m] > 0) {
                    this.completion[m]--;
                }
                var sum = 0;
                for (var i = 0; i < 5; i++) {
                    sum += this.completion[i];
                }
                if (sum <= 0) {
                    this.game.state.getCurrentState().boss.kill();
                }
                var pos = 0;
                var mul = (this.game.width - 8) / 100;
                for (var i = 0; i < 5; i++) {
                    var c = this.completion[i];
                    var b = this.completionui[i];
                    b.cameraOffset.x = 4 + (pos * mul);
                    b.scale.x = c * mul;
                    pos += c;
                }
            }
        };
        Player.prototype.removeHP = function (n) {
            this.hp -= n;
            this.hpui.setText("HP: " + this.hp);
            this.game.add.tween(this.hpui.scale).to({ x: 1.25, y: 1.25 }, 100).chain(this.game.add.tween(this.hpui.scale).to({ x: 1, y: 1 }, 100)).start();
            if (this.hp <= 0) {
                this.rndboolean = true;
                this.destroy();
            }
        };
        Player.prototype.switchCharacter = function (n) {
            var op, np, nt;
            for (var i = 0; i < this.characters.length; i++) {
                var c = this.characters[i];
                if (c.playerType == n) {
                    np = i;
                    nt = c.playerType;
                }
                if (c.playerType == this.current.playerType) {
                    op = i;
                }
            }
            this.characters[np].setType(this.current.playerType);
            for (var i = 0; i < 4; i++) {
                this.infos[i].unselect();
            }
            this.infos[nt].select();
            this.current.setType(nt);
            this.game.state.getCurrentState().bgmselect(n);
        };
        Player.prototype.shoot = function () {
            this.currentShotCD = this.shotCD;
            var bullet = new Bullet.Bullet(this.game, this.current.position.x, this.current.position.y, this.current.playerType, this.infos[this.current.playerType].specializations);
            this.bullets.add(bullet);
        };
        Player.prototype.jump = function () {
            if (this.current.jumpable()) {
                this.current.jump();
            }
        };
        Player.prototype.setVel = function (x) {
            this.current.body.maxVelocity.setTo(x, 5000);
        };
        Player.prototype.update = function () {
            _super.prototype.update.call(this);
            this.game.physics.arcade.collide(this, this.ground, null, null, this);
            this.game.camera.x += this.speed;
            if (this.game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)) {
                this.jump();
            }
            if (this.game.input.keyboard.isDown(Phaser.Keyboard.Q)) {
                this.switchCharacter(0);
            }
            if (this.game.input.keyboard.isDown(Phaser.Keyboard.W)) {
                this.switchCharacter(1);
            }
            if (this.game.input.keyboard.isDown(Phaser.Keyboard.O)) {
                this.switchCharacter(2);
            }
            if (this.game.input.keyboard.isDown(Phaser.Keyboard.P)) {
                this.switchCharacter(3);
            }
            //this.speedui.scale.x = (this.lastx - this.current.position.x) * -50;
            this.lastx = this.current.position.x;
            var relX = this.current.position.x - this.game.camera.x;
            this.xhist.shift();
            this.yhist.shift();
            this.grounded.shift();
            this.xhist.push(this.current.position.x);
            this.yhist.push(this.current.position.y);
            this.grounded.push(this.current.jumpable());
            var modifier = 0;
            for (var i = 0; i < 3; i++) {
                this.characters[i].position.x = this.xhist[i * 10];
                this.characters[i].position.y = this.yhist[i * 10];
            }
            for (var i = 0; i < 4; i++) {
                var child = this.characters[i];
                if (this.grounded[i * 10]) {
                    child.emitter.start(true, 400, null, 1);
                }
            }
            if (relX < -64) {
                this.destroy();
                return;
            }
            else if (relX < 350) {
                this.setVel(this.speed * 70);
            }
            else if (relX > 450) {
                this.setVel(this.speed * 50);
            }
            else {
                this.setVel(this.speed * 60);
            }
            this.currentShotCD--;
            if (this.currentShotCD <= 0) {
                this.shoot();
                this.game.add.sound("gun3", 0.1).play();
            }
        };
        return Player;
    })(Phaser.Group);
    exports.Player = Player;
});
