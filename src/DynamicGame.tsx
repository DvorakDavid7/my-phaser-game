"use client"
import dynamic from "next/dynamic";

const PhaserGame = dynamic(() => import("./TestGame"), { ssr: false });

export default function DynamicGame() {
    return <PhaserGame />
}