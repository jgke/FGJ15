var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports"], function (require, exports) {
    var Bullet = (function (_super) {
        __extends(Bullet, _super);
        function Bullet(game, x, y, type, dmg, friendly) {
            if (friendly === void 0) { friendly = true; }
            _super.call(this, game, x, y, 'plr' + (type + 1) + '_projectile');
            this.speed = 1600;
            this.friendly = friendly;
            this.bulletType = type;
            this.dmg = dmg;
            game.add.existing(this);
            game.physics.arcade.enable(this);
            this.anchor.set(0.5, 0.5);
            this.body.maxVelocity.setTo(this.speed, 400);
            this.body.velocity.setTo(friendly ? this.speed : -this.speed, 0);
            this.checkWorldBounds = true;
            this.outOfBoundsKill = true;
            this.body.allowGravity = false;
        }
        Bullet.prototype.update = function () {
            this.body.acceleration.y += Math.sin(this.game.time.time) * 30;
        };
        return Bullet;
    })(Phaser.Sprite);
    exports.Bullet = Bullet;
});
