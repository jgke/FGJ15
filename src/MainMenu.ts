export class MainMenu extends Phaser.State {
    text: Phaser.Text;
    border: Phaser.Sprite;
    prompt: Phaser.Text;
    stuff: Phaser.Group;
    create() {
        this.stage.backgroundColor = "#f8f8f8";
        this.stuff = new Phaser.Group(this.game);
        this.stuff.pivot.set(0.5, 0.5);

        this.text = new Phaser.Text(
            this.game,
            this.game.width/2,
            this.game.height/4,
            "GOTTA\nGO\nFAST",
            {font: "bold 70px Arial", fill: "#333", align: "center"}
        );
        this.text.anchor.set(0.5, 0.5);
        this.text.alpha = 0;
        this.game.add.existing(this.text);
        this.stuff.add(this.text);

        this.border = new Phaser.Sprite(this.game, this.game.width/2, this.game.height/2, '1');
        this.border.anchor.set(0.5, 0.5);
        this.border.tint = 0x333333;
        this.border.scale.x = 240;
        this.border.alpha = 0;
        this.game.add.existing(this.border);
        this.stuff.add(this.border);

        this.prompt = new Phaser.Text(
            this.game,
            this.game.width/2,
            this.game.height/4*3,
            "Space - Starts the game\nQ - Help\nW - Story\nO - Credits\nP - ???",
            {font: "bold 35px Arial", fill: "#333", align: "center"}
        );
        this.prompt.anchor.set(0.5, 0.5);
        this.prompt.alpha = 0;
        this.game.add.existing(this.prompt);
        this.stuff.add(this.prompt);

        this.game.add.tween(this.text).to({alpha: 1}, 500).start();
        this.game.add.tween(this.border).to({alpha: 1}, 500).start();
        this.game.add.tween(this.prompt).to({alpha: 1}, 500).start();

        this.addTransition(Phaser.Keyboard.SPACEBAR, 'Level');
        this.addTransition(Phaser.Keyboard.Q, 'Help');
    }

    addTransition(key: number, level: string) {
        this.input.keyboard.addKey(key).onDown.addOnce(() => {
            this.game.add.tween(this.text).to({alpha: 0}, 500).start().onComplete.addOnce(() => {
                this.game.state.start(level);
            }, this);
            this.game.add.tween(this.border).to({alpha: 0}, 500).start();
            this.game.add.tween(this.prompt).to({alpha: 0}, 500).start();
        }, this);
    }
}