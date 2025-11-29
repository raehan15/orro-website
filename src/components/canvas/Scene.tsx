"use client";

import { Canvas } from "@react-three/fiber";
import { Environment, ContactShadows } from "@react-three/drei";
import { PerfumeBottle } from "./PerfumeBottle";
import { Suspense } from "react";

export default function Scene() {
  return (
    <div className="fixed inset-0 z-0 h-screen w-full pointer-events-none">
      <Canvas camera={{ position: [0, 0, 10], fov: 30 }} dpr={[1, 2]}>
        {/* Dramatic Dark Studio Lighting */}

        {/* Low Ambient Light */}
        <ambientLight intensity={0.2} color="#ffffff" />

        {/* Rim Light (Back Left) - Cool Blueish */}
        <spotLight
          position={[-5, 5, -5]}
          intensity={2}
          color="#cceeff"
          angle={0.5}
          penumbra={1}
        />

        {/* Rim Light (Back Right) - Warm Goldish */}
        <spotLight
          position={[5, 5, -5]}
          intensity={2}
          color="#ffeedd"
          angle={0.5}
          penumbra={1}
        />

        {/* Key Light (Front Top) - Sharp highlights */}
        <spotLight
          position={[2, 8, 5]}
          intensity={1.5}
          color="#ffffff"
          angle={0.4}
          penumbra={0.5}
          castShadow
          shadow-mapSize={1024}
        />

        {/* Fill Light (Front Left) - Soft */}
        <pointLight position={[-5, 0, 5]} intensity={0.5} color="#ffffff" />

        <Suspense fallback={null}>
          <PerfumeBottle />

          {/* Dark Studio Environment */}
          <Environment preset="city" />

          {/* Subtle reflection on the floor */}
          <ContactShadows
            position={[0, -2.5, 0]}
            opacity={0.4}
            scale={10}
            blur={2}
            far={4}
            color="#000000"
          />
        </Suspense>
      </Canvas>
    </div>
  );
}
