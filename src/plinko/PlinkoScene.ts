import { Scene } from "phaser"


export default class PlinkoScene extends Scene {
    ball: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody
    platforms: any
    bounce = 0.6
    ballGravity = 700

    constructor() {
        super("PlinkoScene")
    }

    preload() {
        this.load.image('sky', 'assets/sky.png');
        this.load.image('star', 'assets/star.png');
        this.load.image('bomb', 'assets/bomb.png');
        this.load.spritesheet('dude',
            'assets/dude.png',
            { frameWidth: 32, frameHeight: 48 }
        );

        const circleGraphics = this.add.graphics();
        circleGraphics.fillStyle(0x0, 1);
        circleGraphics.fillCircle(10, 10, 10); // Draw circle at (20,20) with radius 20
        circleGraphics.generateTexture('circleTexture', 20, 20);
        circleGraphics.destroy(); // Cleanup after generating texture

        const graphics = this.add.graphics();
        graphics.fillStyle(0xaaaaaa, 1);
        graphics.fillRect(0, 0, 50, 10);
        graphics.generateTexture("rectangleTexture", 40, 10);
        graphics.destroy(); // Cleanup
    }

    create() {
        this.add.image(400, 300, 'sky');

        this.ball = this.physics.add.sprite(320 + this.getRandom(), 0, 'circleTexture');
        this.ball.body.setCircle(10)
        this.ball.setBounce(this.bounce)
        this.ball.setGravityY(this.ballGravity)
        this.ball.body.setFriction(0)
        this.ball.setDamping(true).setDrag(0)

        this.createPlinkoPins(10, 300, 30, 50)
    }

    createBucket(x: number, y: number) {
        const rec = this.physics.add.sprite(x, y, "rectangleTexture")
        rec.setImmovable(true); // Acts like a static body, but can move
        rec.body.setAllowGravity(false)
        rec.setVelocityY(0); // Starts without movement

        let hasBounced = false;
        this.physics.add.collider(this.ball, rec, () => {
            if (!hasBounced) {
                hasBounced = true
                this.tweens.add({
                    repeat: 1,
                    targets: rec,
                    y: rec.y - 2, // Move up slightly
                    duration: 100, // Quick bounce
                    ease: "Bounce",
                    yoyo: true
                });
            }
        })
    }

    createPlinkoPins(rows: number, startX: number, startY: number, spacing: number) {
        for (let row = 0; row < rows; row++) {
            if (row < 2) continue
            for (let col = 0; col <= row; col++) {
                const x = startX + col * spacing - (row * spacing) / 2;
                const y = startY + row * spacing;

                const pin = this.physics.add.sprite(x, y, 'circleTexture');
                pin.setBounce(this.bounce)
                pin.body.setCircle(10)
                pin.body.setImmovable(true);
                pin.body.setAllowGravity(false);
                pin.body.setFriction(0)
                pin.setDamping(true).setDrag(0)

                this.physics.add.collider(this.ball, pin);

                if (row === rows - 2) {
                    this.createBucket(x, y + 2*spacing)
                }
            }
        }
    }

    getRandom() {
        return Math.random() * 20 - 10;
    }
}