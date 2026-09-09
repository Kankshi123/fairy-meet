import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Heart, Sparkles } from 'lucide-react';
import FairyDust from './FairyDust';
import Magnetic from './Magnetic';

export default function Hero({ onOpenAuth }) {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, 250]);

  const words = "Somewhere, your person is waiting.".split(" ");

  const container = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { staggerChildren: 0.12, delayChildren: 0.04 * i },
    }),
  };

  const child = {
    visible: { opacity: 1, y: 0, transition: { type: "spring", damping: 12, stiffness: 100 } },
    hidden: { opacity: 0, y: 40 },
  };

  return (
    <section ref={containerRef} className="relative w-full pt-32 pb-24 lg:pt-48 lg:pb-32 px-6 md:px-12 bg-off-white overflow-hidden">
      
      {/* Ambient Glow */}
      <motion.div 
        animate={{ scale: [1, 1.1, 1], opacity: [0.4, 0.6, 0.4] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-pink-glow/20 rounded-full blur-[120px] pointer-events-none"
      />
      
      {/* Fairy Dust Particles */}
      <FairyDust />

      <div className="relative max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-16 lg:gap-8 z-10">
        
        {/* Left Column: Text Content */}
        <div className="w-full lg:w-1/2 flex flex-col items-start z-10">
          <div className="relative mb-6 mt-12 lg:mt-0">
            <Sparkles className="absolute -top-6 -left-6 w-6 h-6 text-vibrant-pink opacity-80" />
            
            <motion.h1 
              variants={container}
              initial="hidden"
              animate="visible"
              className="font-serif text-5xl sm:text-6xl md:text-7xl lg:text-[80px] leading-[1.05] text-rich-black flex flex-wrap"
            >
              <motion.span variants={child} className="mr-3 md:mr-4">Your</motion.span>
              <motion.span variants={child} className="italic text-vibrant-pink mr-3 md:mr-4">dating era</motion.span> 
              <br className="hidden md:block" />
              <motion.span variants={child} className="mr-3 md:mr-4">starts</motion.span>
              <motion.span variants={child}>here.</motion.span>
            </motion.h1>
          </div>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
            className="font-sans text-lg md:text-xl text-rich-black/80 max-w-xl mb-10 leading-relaxed text-balance"
          >
            Real people better meets - <span className="text-sm italic opacity-90">Meet people who share your energy, values, and vision for something real.</span>
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8, ease: "easeOut" }}
            className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto"
          >
            <Magnetic>
              <button onClick={() => onOpenAuth('signup')} className="w-full sm:w-auto bg-rich-black text-pure-white font-sans text-xl sm:text-lg font-semibold px-10 py-6 sm:py-5 rounded-pill hover:bg-vibrant-pink transition-all hover:shadow-hover hover:-translate-y-1 text-center group">
                <span className="inline-block transition-transform group-hover:scale-105">Find Your Match</span>
              </button>
            </Magnetic>
            <Magnetic>
              <a href="#how-it-works" className="w-full sm:w-auto bg-transparent border-2 border-rich-black/20 text-rich-black font-sans text-xl sm:text-lg font-semibold px-10 py-6 sm:py-5 rounded-pill hover:border-rich-black transition-all hover:-translate-y-1 text-center flex items-center justify-center">
                How It Works
              </a>
            </Magnetic>
          </motion.div>
        </div>

        {/* Right Column: Imagery Collage (Parallax) */}
        <div className="w-full lg:w-1/2 relative h-[400px] sm:h-[500px] lg:h-[700px] flex justify-center items-center mt-12 lg:mt-0">
          
          {/* Main Portrait */}
          <motion.div 
            style={{ y: y1 }}
            className="absolute z-10 w-[75%] sm:w-[60%] lg:w-[65%] h-[80%] rounded-[32px] md:rounded-[40px] overflow-hidden shadow-soft border border-pure-white/50"
          >
            <motion.div 
              className="w-full h-full"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.4 }}
            >
              <img 
                src="https://images.unsplash.com/photo-1517841905240-472988babdf9?w=800&auto=format&fit=crop&q=80" 
                alt="Candid portrait" 
                className="w-full h-full object-cover object-center"
              />
            </motion.div>
          </motion.div>

          {/* Secondary Portrait (Overlap) */}
          <motion.div 
            style={{ y: y2 }}
            className="absolute z-20 -right-2 sm:right-4 lg:-right-8 top-[5%] sm:top-[10%] w-[50%] h-[45%] rounded-2xl sm:rounded-[32px] overflow-hidden shadow-hover border-4 border-off-white"
          >
            <motion.div
              className="w-full h-full"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.4 }}
            >
              <img 
                src="https://images.unsplash.com/photo-1522529599102-193c0d76b5b6?w=600&auto=format&fit=crop&q=80" 
                alt="Stylish portrait" 
                className="w-full h-full object-cover object-center"
              />
            </motion.div>
          </motion.div>

          {/* Floating Compatibility Card */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="absolute z-30 -left-2 sm:left-4 lg:-left-6 bottom-[10%] sm:bottom-[15%] bg-pure-white/95 backdrop-blur-md p-4 sm:p-5 rounded-2xl shadow-hover border border-off-white w-[160px] sm:max-w-[200px]"
          >
            <div className="flex items-center gap-2 sm:gap-3 mb-2">
              <div className="w-10 h-10 rounded-full bg-off-white flex items-center justify-center">
                <Heart className="w-5 h-5 text-vibrant-pink fill-vibrant-pink" />
              </div>
              <div>
                <p className="font-serif text-2xl font-bold text-rich-black leading-none">92%</p>
                <p className="font-sans text-[10px] uppercase tracking-wider text-rich-black/60 font-semibold">Match</p>
              </div>
            </div>
            <div className="space-y-1.5 mt-4">
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-vibrant-pink" />
                <span className="font-sans text-xs text-rich-black/80">Shared values</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-vibrant-pink" />
                <span className="font-sans text-xs text-rich-black/80">Travel</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-vibrant-pink" />
                <span className="font-sans text-xs text-rich-black/80">Creativity</span>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
