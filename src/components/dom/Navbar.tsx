"use client";

import { motion } from "framer-motion";
import { ShoppingBag, Menu, Search } from "lucide-react";
import Link from "next/link";

export default function Navbar() {
  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-6 md:px-12 text-white mix-blend-difference"
    >
      <div className="flex items-center gap-8">
        <Link href="/" className="text-4xl font-playfair">
          ORRO
        </Link>
        <div className="hidden md:flex items-center gap-6 text-sm font-medium">
          <Link href="#" className="hover:text-neutral-400 transition-colors">
            Shop
          </Link>
          <Link href="#" className="hover:text-neutral-400 transition-colors">
            About
          </Link>
          <Link href="#" className="hover:text-neutral-400 transition-colors">
            Journal
          </Link>
        </div>
      </div>

      <div className="flex items-center gap-6">
        <button className="hover:text-neutral-400 transition-colors">
          <Search size={20} />
        </button>
        <button className="hover:text-neutral-400 transition-colors">
          <ShoppingBag size={20} />
        </button>
        <button className="md:hidden hover:text-neutral-400 transition-colors">
          <Menu size={24} />
        </button>
      </div>
    </motion.nav>
  );
}
