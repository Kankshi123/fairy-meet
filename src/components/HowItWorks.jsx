import React from 'react';
import { motion } from 'framer-motion';

const steps = [
  {
    number: "01",
    title: "CREATE YOUR STORY",
    description: "Tell us who you are, what you love, and what you're looking for.",
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=800&auto=format&fit=crop&q=80"
  },
  {
    number: "02",
    title: "DISCOVER YOUR MATCH",
    description: "Explore people who align with your personality and values.",
    image: "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?w=800&auto=format&fit=crop&q=80"
  },
  {
    number: "03",
    title: "START SOMETHING REAL",
    description: "Like, connect, talk, and see where the conversation takes you.",
    image: "https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?w=800&auto=format&fit=crop&q=80"
  }
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-24 px-6 md:px-12 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row gap-12 lg:gap-24">
          
          {/* Steps Content */}
          <div className="w-full md:w-1/2 flex flex-col justify-center">
            {steps.map((step, idx) => (
              <motion.div 
                key={step.number}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: idx * 0.2 }}
                className="mb-16 last:mb-0"
              >
                <div className="font-serif text-5xl md:text-6xl text-pure-white mb-4">
                  {step.number}
                </div>
                <h3 className="font-sans text-lg tracking-[0.1em] text-rich-black uppercase font-semibold mb-3">
                  {step.title}
                </h3>
                <p className="font-sans text-lg text-rich-black/70 leading-relaxed max-w-sm">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </div>

          {/* Sticky Image Collage (Desktop) */}
          <div className="hidden md:block w-1/2 relative h-[800px]">
            <div className="sticky top-32 w-full h-[600px]">
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1 }}
                className="absolute top-0 right-0 w-3/4 h-[400px] rounded-[32px] overflow-hidden shadow-soft border border-white"
              >
                <img src={steps[0].image} alt="Step 1" className="w-full h-full object-cover" />
              </motion.div>
              <motion.div 
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.3 }}
                className="absolute bottom-0 left-0 w-2/3 h-[350px] rounded-[32px] overflow-hidden shadow-hover border-4 border-white z-10"
              >
                <img src={steps[2].image} alt="Step 3" className="w-full h-full object-cover" />
              </motion.div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
