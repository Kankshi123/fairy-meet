import React from 'react';
import { Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

export default function FinalCTA({ onOpenAuth }) {
  return (
    <section className="relative py-32 px-6 md:px-12 bg-off-white overflow-hidden border-t border-vibrant-pink/10">
      
      {/* Background Floating Elements */}
      <motion.div 
        animate={{ y: [0, -20, 0], opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-[15%] left-[10%]"
      >
        <Sparkles className="w-6 h-6 text-vibrant-pink" />
      </motion.div>
      <motion.div 
        animate={{ y: [0, 20, 0], opacity: [0.2, 0.5, 0.2] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="absolute bottom-[20%] right-[15%]"
      >
        <Sparkles className="w-8 h-8 text-rich-black/30" />
      </motion.div>
      <motion.div 
        animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.3, 0.1] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        className="absolute top-[40%] right-[30%] w-2 h-2 rounded-full bg-rich-black/20"
      ></motion.div>

      <div className="relative z-10 max-w-4xl mx-auto text-center">
        <motion.h2 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="font-serif text-5xl md:text-7xl text-rich-black leading-tight mb-8"
        >
          Maybe your next<br />
          <span className="relative inline-block mt-2 px-3 py-1">
            <motion.span
              className="absolute inset-0 bg-vibrant-pink rounded-lg"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: 0.5, ease: "easeInOut" }}
              style={{ originX: 0 }}
            />
            <span className="relative z-10 italic text-pure-white">favorite person</span>
          </span><br />
          is closer than you think.
        </motion.h2>

        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="font-sans text-xl text-rich-black/80 mb-12 max-w-lg mx-auto"
        >
          Create your profile. Discover your people. See where it goes.
        </motion.p>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-6"
        >
          <button onClick={() => onOpenAuth('signup')} className="w-full sm:w-auto bg-rich-black text-pure-white font-sans text-base font-medium px-8 py-4 rounded-pill hover:bg-vibrant-pink transition-all hover:-translate-y-1 text-center shadow-soft group">
            <span className="inline-block transition-transform group-hover:scale-105">Create Your Profile</span>
          </button>
          <a href="#explore" className="w-full sm:w-auto bg-transparent border border-rich-black/30 text-rich-black font-sans text-base font-medium px-8 py-4 rounded-pill hover:border-rich-black transition-all hover:-translate-y-1 text-center">
            Explore Fairy Meet
          </a>
        </motion.div>
      </div>
    </section>
  );
}
