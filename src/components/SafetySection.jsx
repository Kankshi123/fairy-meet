import React from 'react';
import { ShieldCheck, Lock, Flag, MessageCircleHeart, Users } from 'lucide-react';
import { motion } from 'framer-motion';

const safetyFeatures = [
  {
    icon: <ShieldCheck className="w-6 h-6" />,
    title: "Profile Authenticity",
    description: "Every profile is verified to ensure you're talking to a real person."
  },
  {
    icon: <Lock className="w-6 h-6" />,
    title: "Privacy Controls",
    description: "You decide who sees your profile and what information you share."
  },
  {
    icon: <Flag className="w-6 h-6" />,
    title: "Report & Block",
    description: "Easily remove anyone who makes you uncomfortable with one tap."
  },
  {
    icon: <MessageCircleHeart className="w-6 h-6" />,
    title: "Safe Conversations",
    description: "Our systems detect and filter inappropriate messages automatically."
  },
  {
    icon: <Users className="w-6 h-6" />,
    title: "Community Guidelines",
    description: "A strict code of conduct ensures a respectful environment for everyone."
  }
];

export default function SafetySection() {
  return (
    <section id="safety" className="py-24 px-6 md:px-12 bg-white">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-16 lg:gap-24">
        
        {/* Left: Heading */}
        <div className="w-full lg:w-1/3">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="sticky top-32"
          >
            <h2 className="font-serif text-5xl text-rich-black leading-tight mb-6">
              Connection feels better<br />
              <span className="italic text-vibrant-pink">when you feel safe.</span>
            </h2>
            <p className="font-sans text-lg text-rich-black/70 leading-relaxed text-balance">
              Trust is the foundation of any real relationship. We've built Fairy Meet with your safety, privacy, and peace of mind at the core of the experience.
            </p>
          </motion.div>
        </div>

        {/* Right: Features */}
        <div className="w-full lg:w-2/3 grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-12">
          {safetyFeatures.map((feature, idx) => (
            <motion.div 
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              className="flex flex-col"
            >
              <div className="w-12 h-12 rounded-full bg-off-white flex items-center justify-center text-vibrant-pink mb-5">
                {feature.icon}
              </div>
              <h3 className="font-sans text-lg font-semibold text-rich-black mb-2">
                {feature.title}
              </h3>
              <p className="font-sans text-base text-rich-black/70 leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
