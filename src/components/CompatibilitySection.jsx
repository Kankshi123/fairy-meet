import React from 'react';
import { motion } from 'framer-motion';

export default function CompatibilitySection() {
  return (
    <section className="py-24 px-6 md:px-12 bg-off-white border-y border-lavender-mist/50">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
        
        {/* Left Column: Visualization */}
        <div className="w-full lg:w-1/2 flex justify-center items-center">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="relative w-72 h-72 sm:w-96 sm:h-96 rounded-full border border-vibrant-pink/20 flex justify-center items-center"
          >
            {/* Outer rings */}
            <div className="absolute inset-4 rounded-full border border-vibrant-pink/40"></div>
            <div className="absolute inset-12 rounded-full border border-lavender-mist/60"></div>
            
            {/* Center Circle */}
            <div className="relative z-10 w-40 h-40 sm:w-48 sm:h-48 rounded-full bg-off-white shadow-soft flex flex-col justify-center items-center border border-white">
              <span className="font-serif text-5xl sm:text-6xl text-rich-black leading-none mb-1">94%</span>
              <span className="font-sans text-xs uppercase tracking-[0.2em] text-vibrant-pink font-semibold">Match</span>
            </div>

            {/* Orbiting Elements */}
            <motion.div 
              animate={{ rotate: 360 }}
              transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
              className="absolute inset-0 z-20"
            >
              <div className="absolute top-[10%] left-[20%] w-3 h-3 rounded-full bg-vibrant-pink/60 shadow-[0_0_10px_rgba(217,143,163,0.5)]"></div>
              <div className="absolute bottom-[15%] right-[15%] w-2 h-2 rounded-full bg-vibrant-pink shadow-[0_0_10px_rgba(232,207,165,0.8)]"></div>
              <div className="absolute top-[40%] -right-1 w-4 h-4 rounded-full bg-off-white"></div>
            </motion.div>
          </motion.div>
        </div>

        {/* Right Column: Content */}
        <div className="w-full lg:w-1/2">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="font-serif text-5xl sm:text-6xl text-rich-black leading-tight mb-12"
          >
            Because chemistry<br />
            <span className="italic text-vibrant-pink">is more than a swipe.</span>
          </motion.h2>

          <div className="space-y-8 max-w-md">
            {[
              { label: "Shared interests", value: "94%" },
              { label: "Lifestyle", value: "88%" },
              { label: "Values", value: "96%" },
              { label: "Conversation", value: "91%" }
            ].map((item, idx) => (
              <motion.div 
                key={item.label}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
              >
                <div className="flex justify-between items-end mb-2">
                  <span className="font-sans text-lg text-rich-black/80">{item.label}</span>
                  <span className="font-serif text-2xl text-rich-black">{item.value}</span>
                </div>
                {/* Custom Progress Bar */}
                <div className="w-full h-1 bg-off-white/40 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    whileInView={{ width: item.value }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: 0.5 + (idx * 0.1), ease: "easeOut" }}
                    className="h-full bg-vibrant-pink rounded-full"
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
