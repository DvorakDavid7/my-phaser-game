import React from "react";
import DynamicGame from "@/DynamicGame";

export const metadata = {
    title: "Phaser Nextjs Template",
    description: "A Phaser 3 Next.js project template that demonstrates Next.js with React communication and uses Vite for bundling.",
}


export default function Home() {
    return (
        <>
            <DynamicGame />
        </>
    );
}