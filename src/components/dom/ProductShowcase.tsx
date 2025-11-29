"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import lottie from "lottie-web";

gsap.registerPlugin(ScrollTrigger);

export default function ProductShowcase() {
  const containerRef = useRef<HTMLDivElement>(null);
  const bottleRef = useRef<HTMLDivElement>(null);
  const rightTextRef = useRef<HTMLDivElement>(null);
  const leftContentRef = useRef<HTMLDivElement>(null);
  const lottieContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Initialize Lottie
    let anim: any;
    if (lottieContainerRef.current) {
      anim = lottie.loadAnimation({
        container: lottieContainerRef.current,
        renderer: "svg",
        loop: true,
        autoplay: true,
        path: "https://lottie.host/56e1c003-0000-4000-8000-000000000000/placeholder.json", // Placeholder
      });
    }

    return () => {
      if (anim) anim.destroy();
    };
  }, []);

  useEffect(() => {
    if (!containerRef.current || !bottleRef.current) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: "body", // Use body as trigger since the component is fixed
        start: "top top",
        end: "bottom bottom",
        scrub: 1,
      },
      defaults: { ease: "power2.inOut" },
    });

    // Initial State
    gsap.set(bottleRef.current, { scale: 0.5, y: 100 });
    gsap.set(rightTextRef.current, { opacity: 0, x: 50 });
    gsap.set(leftContentRef.current, { opacity: 0, x: -50 });

    // 1. Zoom In (0-20%)
    tl.to(bottleRef.current, {
      scale: 1,
      y: 0,
      duration: 2,
    });

    // 2. Slide LEFT (20-40%)
    // Move bottle to left side (approx 25% of screen width)
    tl.to(bottleRef.current, {
      x: "-25vw",
      duration: 2,
    });

    // 3. Text Reveal on RIGHT (40-50%)
    tl.to(rightTextRef.current, {
      opacity: 1,
      x: 0,
      duration: 1,
    });

    // 4. Hold / Slight Pulse (50-70%) - Replacing Rotation
    // Just a small scale bump to keep it alive
    tl.to(bottleRef.current, {
      scale: 1.05,
      duration: 2,
      yoyo: true,
      repeat: 1,
    });

    // 5. Slide RIGHT (70-85%)
    // Hide text first
    tl.to(rightTextRef.current, {
      opacity: 0,
      x: 50,
      duration: 0.5,
    }).to(bottleRef.current, {
      x: "25vw",
      duration: 1.5,
    });

    // 6. Left Content Reveal (85-100%)
    tl.to(leftContentRef.current, {
      opacity: 1,
      x: 0,
      duration: 1.5,
    });

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 w-full h-screen overflow-hidden pointer-events-none"
    >
      {/* Centered Bottle Image */}
      <div
        ref={bottleRef}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[500px] md:w-[400px] md:h-[600px] z-20"
      >
        {/* Using a high-quality placeholder image of a perfume bottle */}
        <img
          src="https://images.unsplash.com/photo-1594035910387-fea47794261f?q=80&w=1000&auto=format&fit=crop"
          alt="ORRO Perfume Bottle"
          className="w-full h-full object-contain drop-shadow-2xl"
        />
      </div>

      {/* Right Text Section */}
      <div
        ref={rightTextRef}
        className="absolute top-1/2 right-[10%] -translate-y-1/2 w-[400px] text-left flex flex-col gap-6 z-10"
      >
        <h2 className="text-5xl font-bold mb-4 tracking-tight text-black">
          Pure Essence.
        </h2>
        <p className="text-xl font-light leading-relaxed text-gray-600">
          Our perfumes use imported natural essential oils of the highest
          quality. Experience the difference of nature.
        </p>
      </div>

      {/* Left Content Section (Lottie + CTA) */}
      <div
        ref={leftContentRef}
        className="absolute top-1/2 left-[10%] -translate-y-1/2 w-[400px] flex flex-col items-center gap-8 pointer-events-auto z-30"
      >
        {/* Lottie Container */}
        <div ref={lottieContainerRef} className="w-48 h-48"></div>

        <div className="text-center">
          <h3 className="text-3xl font-semibold mb-2 text-black">
            Phthalate Free
          </h3>
          <p className="text-gray-500 mb-6 text-lg">
            Safe for you, safe for the planet.
          </p>
          <button className="px-10 py-4 bg-black text-white rounded-full text-xl font-medium hover:bg-gray-800 transition-all transform hover:scale-105 shadow-lg">
            Shop Collection
          </button>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 text-gray-400 animate-bounce">
        <p className="text-sm uppercase tracking-widest">Scroll to Explore</p>
      </div>
    </div>
  );
}
