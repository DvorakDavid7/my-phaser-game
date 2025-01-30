"use client"

import { useEffect } from "react"
import * as Phaser from "phaser";
import { MainScene } from "./plinko/MainScene";

export default function TestGame() {
    useEffect(() => {
        const game = new Phaser.Game({
            type: Phaser.AUTO,
            width: 800,
            height: 600,
            parent: "game-container",
            physics: {
                default: 'arcade',
                arcade: {
                    gravity: {x: 0, y: 300 },
                    debug: true
                }
            },
            scene: MainScene,
        })

        return () => {
            game.destroy(true);
        };
    }, [])

    return (
        <div id="game-container"></div>
    )
}