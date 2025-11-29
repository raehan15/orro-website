"use client";

import { motion } from "framer-motion";

const products = [
  {
    id: 1,
    name: "Midnight Jasmine",
    price: "$120",
    notes: "Jasmine, Bergamot, Sandalwood",
    color: "bg-indigo-100",
  },
  {
    id: 2,
    name: "Golden Amber",
    price: "$145",
    notes: "Amber, Vanilla, Musk",
    color: "bg-amber-100",
  },
  {
    id: 3,
    name: "Rose Absolute",
    price: "$135",
    notes: "Rose, Peony, White Musk",
    color: "bg-rose-100",
  },
  {
    id: 4,
    name: "Citrus Verbena",
    price: "$110",
    notes: "Lemon, Verbena, Cedar",
    color: "bg-lime-100",
  },
];

export default function ProductList() {
  return (
    <section className="py-32 px-8 bg-neutral-950">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h2 className="text-4xl font-bold text-white mb-4">
            Signature Collection
          </h2>
          <p className="text-neutral-400">
            Discover our most loved phthalate-free fragrances.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((product, i) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group cursor-pointer"
            >
              <div
                className={`aspect-[3/4] ${product.color} rounded-2xl mb-6 relative overflow-hidden`}
              >
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
                {/* Placeholder for product image */}
                <div className="absolute inset-0 flex items-center justify-center text-stone-600/50 font-serif text-4xl italic">
                  ORRO
                </div>
              </div>
              <h3 className="text-xl font-bold text-white">{product.name}</h3>
              <p className="text-sm text-neutral-400 mb-2">{product.notes}</p>
              <p className="text-lg font-medium text-neutral-200">
                {product.price}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
