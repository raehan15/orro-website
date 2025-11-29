"use client";

import { useRef, useLayoutEffect, useState } from "react";
import { useThree } from "@react-three/fiber";
import { useGLTF, OrbitControls } from "@react-three/drei";
import * as THREE from "three";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function TestGLBBottle(props: any) {
  const groupRef = useRef<THREE.Group>(null);
  const { viewport, camera } = useThree();
  const [allowOrbit, setAllowOrbit] = useState(false);

  // Load the GLB model
  const { scene } = useGLTF("/models/bottle.glb");

  useLayoutEffect(() => {
    if (!groupRef.current) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: "body",
        start: "top top",
        end: "bottom bottom",
        scrub: 1,
        onLeave: () => {
          setAllowOrbit(true);
        },
        onEnterBack: () => {
          setAllowOrbit(false);
          // Reset camera smoothly
          gsap.to(camera.position, {
            x: 0,
            y: 0,
            z: 10,
            duration: 1.5,
            ease: "power2.inOut",
          });
          gsap.to(camera.rotation, {
            x: 0,
            y: 0,
            z: 0,
            duration: 1.5,
            ease: "power2.inOut",
          });
        },
      },
      defaults: { ease: "power2.inOut" },
    });

    // Initial State
    groupRef.current.scale.set(0.5, 0.5, 0.5);
    groupRef.current.position.set(0, 0, 0);
    groupRef.current.rotation.set(0, 0, 0);

    // 1. Intro & Top View (0-20%)
    // Show "Ethereal" text
    tl.to(groupRef.current.scale, {
      x: 1.0,
      y: 1.0,
      z: 1.0,
      duration: 2,
    })
      .to(
        groupRef.current.position,
        {
          y: -1.5, // Move down to center the top view
          duration: 2,
        },
        "<"
      )
      .to(
        groupRef.current.rotation,
        {
          x: Math.PI / 2.2, // Tilt forward to show top (bird's eye)
          y: Math.PI / 4, // Slight angle for depth
          duration: 2,
        },
        "<"
      )
      .to(
        ".hidden-message",
        {
          opacity: 1,
          scale: 1,
          duration: 1,
        },
        "-=1"
      );

    // 2. Detail 1 (Right Text) - Side View (20-40%)
    // Hide "Ethereal", Show "100% Organic"
    const xLeft = -viewport.width * 0.2;

    tl.to(".hidden-message", {
      opacity: 0,
      scale: 1.5,
      duration: 0.5,
    })
      .to(groupRef.current.position, {
        x: xLeft,
        y: 0,
        duration: 2,
      })
      .to(
        groupRef.current.rotation,
        {
          x: 0, // Reset tilt
          y: -Math.PI / 2,
          duration: 2,
        },
        "<"
      )
      .to(
        groupRef.current.scale,
        {
          x: 1.2,
          y: 1.2,
          z: 1.2,
          duration: 2,
        },
        "<"
      )
      .to(
        ".feature-text-1",
        {
          opacity: 1,
          x: 0,
          duration: 1,
        },
        "-=1"
      );

    // 3. Detail 2 (Left Text) - Other Side & Tilt (40-60%)
    // Hide "100% Organic", Show "Clean & Pure"
    const xRight = viewport.width * 0.2;

    tl.to(".feature-text-1", {
      opacity: 0,
      x: 20,
      duration: 0.5,
    })
      .to(groupRef.current.position, {
        x: xRight,
        duration: 2,
      })
      .to(
        groupRef.current.rotation,
        {
          y: Math.PI / 2,
          x: 0.2, // Slight tilt up
          duration: 2,
        },
        "<"
      )
      .to(
        ".feature-text-2",
        {
          opacity: 1,
          x: 0,
          duration: 1,
        },
        "-=1"
      );

    // 4. Detail 3 (Right Text) - Back View & Zoom (60-80%)
    // Hide "Clean & Pure", Show "Lasting Impression"
    tl.to(".feature-text-2", {
      opacity: 0,
      x: -20,
      duration: 0.5,
    })
      .to(groupRef.current.position, {
        x: xLeft,
        duration: 2,
      })
      .to(
        groupRef.current.rotation,
        {
          y: Math.PI, // Back view
          x: -0.2, // Slight tilt down
          duration: 2,
        },
        "<"
      )
      .to(
        groupRef.current.scale,
        {
          x: 1.4, // Zoom in more for texture
          y: 1.4,
          z: 1.4,
          duration: 2,
        },
        "<"
      )
      .to(
        ".feature-text-3",
        {
          opacity: 1,
          x: 0,
          duration: 1,
        },
        "-=1"
      );

    // 5. Outro & CTA (80-100%)
    // Hide "Lasting Impression", Show CTA
    tl.to(".feature-text-3", {
      opacity: 0,
      x: 20,
      duration: 0.5,
    })
      .to(groupRef.current.position, {
        x: 0,
        y: 0,
        duration: 2,
      })
      .to(
        groupRef.current.rotation,
        {
          y: 0,
          x: 0,
          duration: 2,
        },
        "<"
      )
      .to(
        groupRef.current.scale,
        {
          x: 0.8,
          y: 0.8,
          z: 0.8,
          duration: 2,
        },
        "<"
      )
      .to(
        "#lottie-badge",
        {
          opacity: 1,
          scale: 1,
          duration: 1,
        },
        "-=0.5"
      )
      .to(
        ".cta-container",
        {
          opacity: 1,
          y: 0,
          duration: 1,
        },
        "<+=0.2"
      );

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, [viewport.width, scene]); // Re-run if scene loads

  return (
    <group ref={groupRef} {...props}>
      {/* Render the loaded GLB scene */}
      <primitive object={scene} />
      <OrbitControls
        enabled={allowOrbit}
        enableZoom={false}
        enablePan={false}
      />
    </group>
  );
}

// Preload the model
useGLTF.preload("/models/bottle.glb");
