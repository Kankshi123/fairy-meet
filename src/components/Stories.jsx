import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export default function Stories() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [-50, 50]);
  const y2 = useTransform(scrollYProgress, [0, 1], [50, -50]);

  return (
    <section ref={containerRef} id="stories" className="py-24 px-6 md:px-12 bg-off-white border-t border-vibrant-pink/10">
      <div className="max-w-7xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16 lg:mb-24"
        >
          <h2 className="font-serif text-5xl md:text-6xl text-rich-black leading-tight">
            Some connections<br />
            <span className="italic text-vibrant-pink">just make sense.</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-8 items-center">
          
          {/* Story 1: Image Left, Text Right */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="w-full h-[400px] sm:h-[500px] rounded-[32px] overflow-hidden shadow-soft relative"
          >
            <motion.div style={{ y: y1 }} className="absolute -inset-10">
              <img 
                src="https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?w=1000&auto=format&fit=crop&q=80" 
                alt="Aisha and Ryan" 
                className="w-full h-full object-cover"
              />
            </motion.div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.2 }}
            className="flex flex-col justify-center px-4 sm:px-10"
          >
            <p className="font-serif text-2xl md:text-3xl text-rich-black leading-relaxed mb-8 text-balance">
              "We talked for three hours on our first date. It felt like we'd known each other forever. I wasn't expecting to find someone who just got me so completely."
            </p>
            <div className="flex items-center gap-4">
              <div className="w-12 h-[1px] bg-vibrant-pink"></div>
              <span className="font-sans text-sm tracking-widest text-rich-black/80 uppercase font-semibold">Aisha & Ryan</span>
            </div>
          </motion.div>

          {/* Story 2: Text Left, Image Right */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="flex flex-col justify-center px-4 sm:px-10 lg:order-3"
          >
            <p className="font-serif text-2xl md:text-3xl text-rich-black leading-relaxed mb-8 text-balance">
              "I loved that Fairy Meet focused on shared values. When we met, it was like skipping the small talk and going straight to the good stuff."
            </p>
            <div className="flex items-center gap-4">
              <div className="w-12 h-[1px] bg-vibrant-pink"></div>
              <span className="font-sans text-sm tracking-widest text-rich-black/80 uppercase font-semibold">David & Emma</span>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.2 }}
            className="w-full h-[400px] sm:h-[500px] rounded-[32px] overflow-hidden shadow-soft lg:order-4 relative"
          >
            <motion.div style={{ y: y2 }} className="absolute -inset-10">
              <img 
                src="https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=1000&auto=format&fit=crop&q=80" 
                alt="David and Emma" 
                className="w-full h-full object-cover"
              />
            </motion.div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
