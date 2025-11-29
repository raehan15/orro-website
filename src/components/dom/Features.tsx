"use client";
import { motion } from "framer-motion";
import { ShieldCheck, Leaf, Droplets } from "lucide-react";

const features = [
  {
    icon: ShieldCheck,
    title: "Phthalate Free",
    description:
      "We refuse to use harmful plasticizers. Your health is our priority.",
  },
  {
    icon: Leaf,
    title: "Clean Ingredients",
    description: "Sourced from nature, refined for elegance. No hidden toxins.",
  },
  {
    icon: Droplets,
    title: "Pure Essence",
    description:
      "High concentration oils that last longer without synthetic fixatives.",
  },
];

export default function Features() {
  return (
    <section className="relative z-10 bg-white py-24 px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-stone-800 mb-6">
            Uncompromising Purity
          </h2>
          <p className="text-xl text-stone-600 max-w-2xl mx-auto">
            Most perfumes contain phthalates to make the scent stick. We found a
            better way.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              className="flex flex-col items-center text-center p-6 rounded-2xl bg-stone-50 hover:bg-stone-100 transition-colors"
            >
              <div className="w-16 h-16 bg-stone-200 rounded-full flex items-center justify-center mb-6 text-stone-800">
                <feature.icon size={32} />
              </div>
              <h3 className="text-2xl font-bold text-stone-800 mb-4">
                {feature.title}
              </h3>
              <p className="text-stone-600 leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
