var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports"], function (require, exports) {
    var EnemyBullet = (function (_super) {
        __extends(EnemyBullet, _super);
        function EnemyBullet(game, x, y) {
            _super.call(this, game, x, y, 'blaze');
            this.speed = 1600;
            game.add.existing(this);
            game.physics.arcade.enable(this);
            this.anchor.set(0.5, 0.5);
            this.body.maxVelocity.setTo(this.speed, 400);
            this.body.velocity.setTo(-this.speed, 0);
            this.checkWorldBounds = true;
            this.outOfBoundsKill = true;
            this.body.allowGravity = false;
        }
        EnemyBullet.prototype.update = function () {
            this.body.acceleration.y += Math.sin(this.game.time.time) * 30;
        };
        return EnemyBullet;
    })(Phaser.Sprite);
    exports.EnemyBullet = EnemyBullet;
});
