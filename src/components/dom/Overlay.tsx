"use client";

import { useEffect, useRef } from "react";
import lottie from "lottie-web";

export default function Overlay() {
  const lottieContainer = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (lottieContainer.current) {
      const anim = lottie.loadAnimation({
        container: lottieContainer.current,
        renderer: "svg",
        loop: true,
        autoplay: true,
        path: "https://lottie.host/56e1c003-0000-4000-8000-000000000000/placeholder.json", // Placeholder, user can replace
      });
      return () => anim.destroy();
    }
  }, []);

  return (
    <div className="relative z-10 w-full h-full pointer-events-none text-white">
      {/* Section 1: Hidden Message (appears when cap pops) */}
      <div className="fixed top-[25%] left-1/2 -translate-x-1/2 -translate-y-1/2 text-center w-full">
        <h1 className="hidden-message opacity-0 text-6xl md:text-8xl font-playfair text-transparent bg-clip-text bg-gradient-to-b from-white to-neutral-500 scale-150">
          Ethereal
        </h1>
      </div>

      {/* Section 2: Feature Text 1 (Right side) */}
      <div className="fixed top-1/2 right-[10%] -translate-y-1/2 w-[400px] text-left flex flex-col gap-6">
        <div className="feature-text-1 opacity-0 translate-x-20">
          <h2 className="text-6xl mb-4 text-white font-playfair">
            100% Organic.
          </h2>
          <p className="text-2xl leading-relaxed text-neutral-400 font-playfair">
            Sourced from nature's finest essential oils.
          </p>
        </div>
      </div>

      {/* Section 3: Feature Text 2 (Left side) */}
      <div className="fixed top-1/2 left-[10%] -translate-y-1/2 w-[400px] text-right flex flex-col gap-6">
        <div className="feature-text-2 opacity-0 -translate-x-20">
          <h2 className="text-6xl mb-4 text-white font-playfair">
            Clean & Pure.
          </h2>
          <p className="text-2xl leading-relaxed text-neutral-400 font-playfair">
            Free from harmful chemicals and phthalates.
          </p>
        </div>
      </div>

      {/* Section 4: Feature Text 3 (Right side again) */}
      <div className="fixed top-1/2 right-[10%] -translate-y-1/2 w-[400px] text-left flex flex-col gap-6">
        <div className="feature-text-3 opacity-0 translate-x-20">
          <h2 className="text-6xl mb-4 text-white font-playfair">
            Lasting Impression.
          </h2>
          <p className="text-2xl leading-relaxed text-neutral-400 font-playfair">
            High oil concentration for an enduring scent.
          </p>
        </div>
      </div>

      {/* Section 4: Final CTA (Center Bottom) */}
      <div className="fixed bottom-[15%] left-1/2 -translate-x-1/2 w-full flex flex-col items-center gap-8 pointer-events-auto">
        {/* Lottie Container */}
        <div
          ref={lottieContainer}
          id="lottie-badge"
          className="w-32 h-32 opacity-0 scale-0 invert"
        >
          {/* Lottie animation will render here */}
        </div>

        <div className="cta-container opacity-0 translate-y-10 text-center">
          <h3 className="text-4xl mb-2 text-white font-playfair">
            Explore our collection
          </h3>
          <p className="text-neutral-400 mb-6 font-playfair text-xl">
            Discover your signature scent today.
          </p>
          <a href="/shop">
            <button className="px-10 py-4 bg-white text-black rounded-full text-2xl hover:bg-neutral-200 transition-all transform hover:scale-105 shadow-xl font-playfair">
              Shop Now
            </button>
          </a>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="fixed bottom-10 left-1/2 -translate-x-1/2 text-gray-400 animate-bounce">
        <p className="text-sm uppercase tracking-widest">Scroll to Explore</p>
      </div>
    </div>
  );
}
