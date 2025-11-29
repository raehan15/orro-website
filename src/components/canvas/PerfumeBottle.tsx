"use client";

import { useRef, useLayoutEffect } from "react";
import { useThree } from "@react-three/fiber";
import { Cylinder, Text, Torus } from "@react-three/drei";
import * as THREE from "three";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function PerfumeBottle(props: any) {
  const groupRef = useRef<THREE.Group>(null);
  const capRef = useRef<THREE.Group>(null);
  const { viewport, camera } = useThree();

  useLayoutEffect(() => {
    if (!groupRef.current || !capRef.current) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: "body",
        start: "top top",
        end: "bottom bottom",
        scrub: 1,
      },
      defaults: { ease: "power2.inOut" },
    });

    // Initial State
    groupRef.current.scale.set(0.5, 0.5, 0.5);
    groupRef.current.position.set(0, -1, 0);
    groupRef.current.rotation.set(0, 0, 0);
    capRef.current.position.set(0, 2.1, 0);

    // 1. Zoom In (0-10%)
    tl.to(groupRef.current.scale, {
      x: 0.75,
      y: 0.75,
      z: 0.75,
      duration: 1,
    }).to(
      groupRef.current.position,
      {
        y: -0.5,
        duration: 1,
      },
      "<"
    );

    // 2. Cap Pop & Hidden Message (10-25%)
    tl.to(capRef.current.position, {
      y: 3.5,
      duration: 1.5,
    })
      .to(
        capRef.current.rotation,
        {
          y: Math.PI / 4,
          x: -0.2,
          duration: 1.5,
        },
        "<"
      )
      .to(
        ".hidden-message",
        {
          opacity: 1,
          scale: 1,
          duration: 1.5,
        },
        "<+=0.2"
      );

    // 3. Close Cap & Hide Message (25-30%)
    tl.to(".hidden-message", {
      opacity: 0,
      scale: 1.5,
      duration: 0.5,
    })
      .to(
        capRef.current.position,
        {
          y: 2.1,
          duration: 0.5,
        },
        "<"
      )
      .to(
        capRef.current.rotation,
        {
          y: 0,
          x: 0,
          duration: 0.5,
        },
        "<"
      );

    // 4. Slide LEFT & Feature 1 (30-50%) - "100% Organic"
    const xLeft = -viewport.width * 0.22;
    const rotationLeft = Math.atan2(-xLeft, camera.position.z);

    tl.to(groupRef.current.position, {
      x: xLeft,
      duration: 2,
    })
      .to(
        groupRef.current.rotation,
        {
          y: rotationLeft,
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

    // 5. Slide RIGHT & Feature 2 (50-70%) - "No Harmful Chemicals"
    const xRight = viewport.width * 0.22;
    const rotationRight = Math.atan2(-xRight, camera.position.z);

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
          y: rotationRight,
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

    // 6. Slide LEFT & Feature 3 (70-90%) - "Long Lasting"
    tl.to(".feature-text-2", {
      opacity: 0,
      x: -20,
      duration: 0.5,
    })
      .to(groupRef.current.position, {
        x: xLeft, // Back to left
        duration: 2,
      })
      .to(
        groupRef.current.rotation,
        {
          y: rotationLeft,
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

    // 7. Center & Final CTA (90-100%)
    tl.to(".feature-text-3", {
      opacity: 0,
      x: 20,
      duration: 0.5,
    })
      .to(groupRef.current.position, {
        x: 0,
        y: 0,
        duration: 1,
      })
      .to(
        groupRef.current.rotation,
        {
          y: 0,
          duration: 1,
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
        "<+=0.5"
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
  }, [viewport.width]);

  return (
    <group ref={groupRef} {...props}>
      {/* Bottle Body - Premium Glossy Black */}
      {/* Main Cylinder */}
      <Cylinder args={[0.8, 0.8, 2.5, 64]} position={[0, 0, 0]}>
        <meshPhysicalMaterial
          color="#050505"
          roughness={0.1}
          metalness={0.1}
          clearcoat={1}
          clearcoatRoughness={0.1}
          reflectivity={1}
        />
      </Cylinder>

      {/* Rounded Bottom Detail */}
      <Torus
        args={[0.75, 0.05, 16, 64]}
        position={[0, -1.25, 0]}
        rotation={[Math.PI / 2, 0, 0]}
      >
        <meshPhysicalMaterial
          color="#050505"
          roughness={0.1}
          metalness={0.1}
          clearcoat={1}
        />
      </Torus>
      <Cylinder args={[0.75, 0.75, 0.1, 64]} position={[0, -1.25, 0]}>
        <meshPhysicalMaterial
          color="#050505"
          roughness={0.1}
          metalness={0.1}
          clearcoat={1}
        />
      </Cylinder>

      {/* Shoulder - Tapered to Neck */}
      <Cylinder args={[0.35, 0.8, 0.5, 64]} position={[0, 1.5, 0]}>
        <meshPhysicalMaterial
          color="#050505"
          roughness={0.1}
          metalness={0.1}
          clearcoat={1}
        />
      </Cylinder>

      {/* Label/Text on Bottle - Gold Foil Look */}
      <Text
        position={[0, 0.2, 0.82]}
        fontSize={7}
        scale={0.05}
        color="#D4AF37" // Gold
        anchorX="center"
        anchorY="middle"
        material-toneMapped={false}
        renderOrder={1}
      >
        ORRO
      </Text>

      <Text
        position={[0, -0.2, 0.82]}
        fontSize={2}
        scale={0.05}
        color="#C5A028" // Darker Gold
        anchorX="center"
        anchorY="middle"
        letterSpacing={0.1}
        material-toneMapped={false}
        renderOrder={1}
      >
        PURE ESSENCE
      </Text>

      {/* Neck Ring - Gold Accent */}
      <Cylinder args={[0.35, 0.35, 0.3, 64]} position={[0, 1.8, 0]}>
        <meshStandardMaterial color="#D4AF37" metalness={1} roughness={0.2} />
      </Cylinder>

      {/* Cap - Matte Textured Black */}
      <group ref={capRef} position={[0, 2.35, 0]}>
        <Cylinder args={[0.38, 0.38, 0.8, 64]}>
          <meshStandardMaterial
            color="#111111"
            metalness={0.2}
            roughness={0.8}
          />
        </Cylinder>
        {/* Cap Top Detail */}
        <Cylinder args={[0.38, 0.38, 0.05, 64]} position={[0, 0.4, 0]}>
          <meshStandardMaterial color="#D4AF37" metalness={1} roughness={0.2} />
        </Cylinder>
      </group>
    </group>
  );
}
