"use client";

import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section className="relative z-10 h-screen flex flex-col justify-center items-start px-8 md:px-20 max-w-7xl mx-auto pointer-events-none">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="pointer-events-auto"
      >
        <h1 className="text-8xl md:text-9xl font-bold text-stone-800 tracking-tighter">
          ORRO
        </h1>
        <p className="text-xl md:text-2xl text-stone-600 mt-4 max-w-md font-light">
          Essence of Purity. <br />
          <span className="font-medium text-stone-800">
            0% Phthalates. 100% Soul.
          </span>
        </p>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="mt-8 px-8 py-4 bg-stone-900 text-white rounded-full text-lg font-medium hover:bg-stone-800 transition-colors"
        >
          Discover the Collection
        </motion.button>
      </motion.div>
    </section>
  );
}
