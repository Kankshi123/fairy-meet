import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function FairyDust() {
  const [windowHeight, setWindowHeight] = useState(1000);
  
  useEffect(() => {
    setWindowHeight(window.innerHeight);
  }, []);

  const particles = Array.from({ length: 40 });

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {particles.map((_, i) => {
        const size = Math.random() * 6 + 2;
        const startX = Math.random() * 100;
        const startY = Math.random() * 200;
        const duration = Math.random() * 15 + 10;
        const delay = Math.random() * 5;

        return (
          <motion.div
            key={i}
            className="absolute rounded-full bg-vibrant-pink/40 blur-[2px]"
            style={{
              width: size,
              height: size,
              left: `${startX}%`,
              bottom: `-${startY}px`,
            }}
            animate={{
              y: [0, -windowHeight * 1.5],
              x: [0, Math.random() * 100 - 50, Math.random() * 100 - 50],
              opacity: [0, 0.6, 0],
            }}
            transition={{
              duration: duration,
              repeat: Infinity,
              delay: delay,
              ease: "linear",
            }}
          />
        );
      })}
    </div>
  );
}
