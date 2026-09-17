import React from 'react';
import { motion } from 'framer-motion';

export default function SplashScreen() {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
      className="fixed inset-0 z-[999] bg-off-white flex flex-col items-center justify-center pointer-events-none"
    >
      <div className="flex flex-col items-center gap-6">
        <motion.img
          layoutId="app-logo-img"
          src="/logo.png?v=3"
          alt="Fairy Meet Logo"
          className="w-56 h-56 md:w-64 md:h-64 object-contain drop-shadow-xl"
          transition={{ layout: { duration: 0.8, ease: [0.43, 0.13, 0.23, 0.96] } }}
        />
        
        {/* Animated Text that only appears on Splash Screen */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.4, ease: "easeOut", delay: 0.1 }}
          className="font-serif text-4xl md:text-5xl font-bold tracking-tight text-rich-black mt-2"
        >
          FAIRY MEET
        </motion.h1>
      </div>
    </motion.div>
  );
}
