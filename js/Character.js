var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports"], function (require, exports) {
    var Character = (function (_super) {
        __extends(Character, _super);
        function Character(game, x, y, type, ground) {
            _super.call(this, game, x, y, "place1");
            this.jumping = 0;
            this.setType(type);
            this.anchor = new Phaser.Point(0.5, 0.5);
            game.add.existing(this);
            if (type == 3) {
                game.physics.arcade.enable(this);
                this.body.drag.setTo(600, 0);
                this.body.maxVelocity.setTo(400, 5000);
                this.body.collideWorldBounds = false;
            }
            this.lastTouch = 0;
            this.ground = ground;
            this.jumps = [];
            this.emitter = this.game.add.emitter(30, 16, 20);
            this.emitter.autoAlpha = true;
            this.emitter.setScale(1.5, 3, 1.5, 3, 2000, Phaser.Easing.Quintic.Out);
            this.emitter.setAlpha(0.15, 0.3);
            this.emitter.makeParticles("blaze");
            this.emitter.angle = 100;
            this.emitter.frequency = 1000;
            this.emitter.enableBody = true;
            this.emitter.start(true, 400, 20);
            this.addChild(this.emitter);
        }
        Character.prototype.setType = function (x) {
            this.playerType = x;
            var texture = "plr" + (x + 1);
            if (x == 3 || x == 2) {
                texture += "_run";
            }
            this.loadTexture(texture, 0);
            if (x == 3 || x == 2) {
                this.animations.add('walk').play(20, true);
            }
        };
        Character.prototype.jumpable = function () {
            if (this.body.onFloor() || this.body.touching.down) {
                this.lastTouch = this.game.time.time;
            }
            if (Date.now() - this.lastTouch < 100) {
                return true;
            }
            return false;
        };
        Character.prototype.jump = function () {
            if (this.body.onFloor() || this.body.touching.down) {
                this.lastTouch = this.game.time.time;
            }
            if (Date.now() - this.lastTouch < 100) {
                this.body.velocity.y -= 150;
            }
        };
        Character.prototype.update = function () {
            _super.prototype.update.call(this);
            if (this.game.state.getCurrentState().player.current.playerType == this.playerType) {
                this.body.acceleration.x += this.speed * 8;
                this.game.physics.arcade.collide(this, this.ground, null, null, this);
            }
        };
        return Character;
    })(Phaser.Sprite);
    exports.Character = Character;
});
