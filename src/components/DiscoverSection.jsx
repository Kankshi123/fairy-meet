import React from 'react';
import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';
import confetti from 'canvas-confetti';

const profiles = [
  {
    id: 1,
    name: "Maya",
    age: 27,
    location: "Delhi",
    match: "92%",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=600&auto=format&fit=crop&q=80",
    tags: ["Creative", "Travel", "Coffee", "Design"],
    quote: "Always planning my next trip and looking for someone who enjoys getting a little lost along the way."
  },
  {
    id: 2,
    name: "Arjun",
    age: 29,
    location: "Mumbai",
    match: "89%",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&auto=format&fit=crop&q=80",
    tags: ["Music", "Outdoors", "Cooking"],
    quote: "Weekends are for hiking trails or trying out new recipes. Seeking a partner in crime for both."
  },
  {
    id: 3,
    name: "Sarah",
    age: 26,
    location: "Bangalore",
    match: "95%",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=600&auto=format&fit=crop&q=80",
    tags: ["Art", "Reading", "Yoga", "Pets"],
    quote: "Bookworm with a slight caffeine addiction. I'd love to find someone to share quiet Sunday mornings with."
  }
];

export default function DiscoverSection({ onOpenAuth }) {
  const handleHeartClick = (e) => {
    // Get button coordinates to pop confetti directly from the heart
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (rect.left + rect.width / 2) / window.innerWidth;
    const y = (rect.top + rect.height / 2) / window.innerHeight;
    
    confetti({
      particleCount: 60,
      spread: 70,
      origin: { x, y },
      colors: ['#FF2D55', '#ffffff', '#FFB3C6'],
      disableForReducedMotion: true,
      zIndex: 100
    });
  };

  return (
    <section id="discover" className="py-24 px-6 md:px-12 bg-off-white/30 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="font-serif text-5xl md:text-6xl text-rich-black leading-tight">
            Meet your <span className="italic text-vibrant-pink">kind of people.</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {profiles.map((profile, idx) => (
            <motion.div 
              key={profile.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: idx * 0.15 }}
              whileHover={{ y: -6 }}
              className="group bg-white rounded-2xl md:rounded-[32px] p-4 sm:p-6 shadow-soft hover:shadow-hover transition-all duration-300 border border-rich-black/5 flex flex-col h-full"
            >
              {/* Profile Image */}
              <div className="relative w-full aspect-[4/5] rounded-[24px] overflow-hidden mb-6">
                <img 
                  src={profile.image} 
                  alt={profile.name} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-sm">
                  <Heart className="w-3.5 h-3.5 fill-vibrant-pink text-vibrant-pink" />
                  <span className="font-sans text-xs font-semibold text-rich-black">{profile.match} Match</span>
                </div>
              </div>

              {/* Profile Info */}
              <div className="flex-grow flex flex-col">
                <div className="flex items-end gap-2 mb-1">
                  <h3 className="font-serif text-3xl font-medium text-rich-black leading-none">{profile.name},</h3>
                  <span className="font-sans text-xl text-rich-black/80 leading-tight pb-[2px]">{profile.age}</span>
                </div>
                <p className="font-sans text-sm text-rich-black/60 mb-5">{profile.location}</p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-5">
                  {profile.tags.map(tag => (
                    <span key={tag} className="bg-off-white/50 text-rich-black font-sans text-xs px-3 py-1 rounded-full border border-lavender-mist">
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Quote */}
                <p className="font-sans text-sm text-rich-black/80 italic leading-relaxed mb-8 flex-grow">
                  "{profile.quote}"
                </p>

                {/* Actions */}
                <div className="flex items-center gap-3 mt-auto">
                  <button 
                    onClick={handleHeartClick}
                    className="flex items-center justify-center w-12 h-12 rounded-full border border-vibrant-pink/30 bg-off-white hover:bg-vibrant-pink hover:border-vibrant-pink group/btn transition-colors relative z-10"
                  >
                    <Heart className="w-5 h-5 text-vibrant-pink group-hover/btn:text-white transition-colors" />
                  </button>
                  <button 
                    onClick={() => onOpenAuth && onOpenAuth('signup')}
                    className="flex-grow bg-transparent border border-rich-black/20 text-rich-black font-sans text-sm font-medium h-12 rounded-full hover:border-rich-black hover:-translate-y-0.5 transition-all relative z-10"
                  >
                    View Profile
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
