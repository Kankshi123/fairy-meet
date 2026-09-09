import React from 'react';
import { motion } from 'framer-motion';

const features = [
  {
    number: "01",
    title: "MEANINGFUL MATCHES",
    description: "Discover people who align with what matters to you."
  },
  {
    number: "02",
    title: "REAL CONVERSATIONS",
    description: "Move beyond endless swiping and start conversations worth having."
  },
  {
    number: "03",
    title: "SHARED INTERESTS",
    description: "Find common ground before you even say hello."
  },
  {
    number: "04",
    title: "DESIGNED FOR SOMETHING REAL",
    description: "Whether you're looking for a relationship or simply someone who gets you, Fairy Meet is built around genuine connection."
  }
];

export default function WhyFairyMeet() {
  return (
    <section id="why" className="py-24 px-6 md:px-12 max-w-7xl mx-auto bg-off-white">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
        
        {/* Left Column */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="font-serif text-5xl md:text-6xl text-rich-black leading-tight mb-8">
            Dating should feel<br />
            <span className="relative inline-block mt-2 px-3 py-1">
              <motion.span
                className="absolute inset-0 bg-vibrant-pink rounded-lg -z-0"
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, delay: 0.5, ease: "easeInOut" }}
                style={{ originX: 0 }}
              />
              <span className="relative z-10 italic text-pure-white">a little more magical.</span>
            </span>
          </h2>
          <p className="font-sans text-lg text-rich-black/80 leading-relaxed max-w-md text-balance">
            Fairy Meet helps you discover people based on more than a photograph. Find connections shaped by personality, interests, values, and the things that actually matter.
          </p>
        </motion.div>

        {/* Right Column (Features List) */}
        <div className="flex flex-col gap-10 mt-8 lg:mt-0">
          {features.map((feature, idx) => (
            <motion.div 
              key={feature.number}
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: idx * 0.15 }}
              className="group flex gap-6"
            >
              <div className="font-serif text-vibrant-pink text-2xl md:text-3xl font-bold">
                {feature.number}
              </div>
              <div className="pt-1">
                <h3 className="font-sans text-sm md:text-base tracking-[0.1em] text-rich-black uppercase font-bold mb-2">
                  {feature.title}
                </h3>
                <p className="font-sans text-base text-rich-black/70 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
