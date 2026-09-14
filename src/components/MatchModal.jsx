import React, { useMemo, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Sparkles, Loader2 } from 'lucide-react';
import ProfilePopup from './ProfilePopup';

const ZODIAC_SIGNS = [
  { name: 'Aries', symbol: '♈' },
  { name: 'Taurus', symbol: '♉' },
  { name: 'Gemini', symbol: '♊' },
  { name: 'Cancer', symbol: '♋' },
  { name: 'Leo', symbol: '♌' },
  { name: 'Virgo', symbol: '♍' },
  { name: 'Libra', symbol: '♎' },
  { name: 'Scorpio', symbol: '♏' },
  { name: 'Sagittarius', symbol: '♐' },
  { name: 'Capricorn', symbol: '♑' },
  { name: 'Aquarius', symbol: '♒' },
  { name: 'Pisces', symbol: '♓' },
];

export default function MatchModal({ isOpen, onClose, user, companions, onInitiateContact }) {
  const [selectedComp, setSelectedComp] = useState(null);
  const [step, setStep] = useState(0); // 0: Zodiac, 1: Calc, 2: Matches
  const [selectedSign, setSelectedSign] = useState(null);
  const [matchScores, setMatchScores] = useState({});

  // Reset state when modal opens/closes
  useEffect(() => {
    if (isOpen) {
      setStep(0);
      setSelectedSign(null);
      setMatchScores({});
    }
  }, [isOpen]);

  const matches = useMemo(() => {
    if (!user) return [];
    
    // Filter by gender
    let filtered = companions.filter(comp => {
      if (user.gender === 'Female') return comp.gender === 'Male';
      if (user.gender === 'Male') return comp.gender === 'Female';
      return true; // LGBTQ+ sees both
    });
    
    // Pick first 3
    return filtered.slice(0, 3);
  }, [user, companions]);

  const handleSelectSign = (sign) => {
    setSelectedSign(sign);
    setStep(1);
    
    // Generate random scores between 85 and 99 for matches
    const scores = {};
    matches.forEach(m => {
      scores[m.id] = Math.floor(Math.random() * 15) + 85;
    });
    setMatchScores(scores);

    // Simulate calculation delay
    setTimeout(() => {
      setStep(2);
    }, 2500);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0 }} 
        animate={{ opacity: 1 }} 
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-rich-black/60 backdrop-blur-sm"
      />
      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 20 }} 
        animate={{ opacity: 1, scale: 1, y: 0 }} 
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="relative w-full max-w-4xl bg-off-white rounded-[32px] shadow-hover overflow-hidden flex flex-col z-10 max-h-[90vh]"
      >
        <button 
          onClick={onClose} 
          className="absolute top-4 right-4 z-20 w-10 h-10 flex items-center justify-center rounded-full bg-white/80 backdrop-blur-md text-rich-black hover:bg-vibrant-pink hover:text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
        
        {step === 0 && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="flex flex-col flex-1 min-h-0"
          >
            <div className="p-8 text-center bg-white border-b border-rich-black/10 shrink-0">
              <div className="w-16 h-16 bg-vibrant-pink/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Sparkles className="w-8 h-8 text-vibrant-pink" />
              </div>
              <h2 className="font-serif text-4xl text-rich-black font-medium mb-2">Cosmic Compatibility</h2>
              <p className="text-rich-black/60">Select your zodiac sign to reveal your cosmic matches.</p>
            </div>
            <div className="p-8 overflow-y-auto flex-1">
              <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-4">
                {ZODIAC_SIGNS.map(sign => (
                  <button 
                    key={sign.name}
                    onClick={() => handleSelectSign(sign)}
                    className="flex flex-col items-center justify-center p-4 bg-white rounded-2xl shadow-sm border border-rich-black/5 hover:border-vibrant-pink hover:shadow-md transition-all group"
                  >
                    <span className="text-4xl mb-2 group-hover:scale-110 transition-transform">{sign.symbol}</span>
                    <span className="text-sm font-medium text-rich-black/80 group-hover:text-vibrant-pink">{sign.name}</span>
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {step === 1 && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="flex flex-col items-center justify-center p-16 h-[500px]"
          >
            <div className="relative w-32 h-32 flex items-center justify-center mb-8">
              <motion.div 
                animate={{ rotate: 360 }}
                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 border-4 border-dashed border-vibrant-pink/30 rounded-full"
              />
              <motion.div 
                animate={{ rotate: -360 }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                className="absolute inset-4 border-4 border-dotted border-vibrant-pink/50 rounded-full"
              />
              <span className="text-5xl">{selectedSign?.symbol}</span>
            </div>
            <h2 className="font-serif text-3xl text-rich-black font-medium mb-2">Consulting the Stars...</h2>
            <p className="text-rich-black/60 flex items-center gap-2">
              <Loader2 className="w-4 h-4 animate-spin text-vibrant-pink" />
              Calculating compatibility for {selectedSign?.name}
            </p>
          </motion.div>
        )}

        {step === 2 && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="flex flex-col flex-1 min-h-0"
          >
            <div className="p-8 text-center bg-white border-b border-rich-black/10 shrink-0">
              <h2 className="font-serif text-4xl text-rich-black font-medium mb-2">Your Cosmic Matches</h2>
              <p className="text-rich-black/60">The stars have aligned! Here are your most compatible profiles.</p>
            </div>

            <div className="p-6 overflow-y-auto flex-1">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {matches.map((comp, idx) => (
                  <motion.div 
                    key={comp.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    className="bg-white rounded-[24px] overflow-hidden shadow-sm border border-rich-black/5 flex flex-col relative"
                  >
                    {/* Cosmic Score Badge */}
                    <div className="absolute top-4 left-4 z-10 bg-vibrant-pink text-white px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-md">
                      <Sparkles className="w-3 h-3" />
                      <span className="font-bold text-xs">{matchScores[comp.id]}% Match</span>
                    </div>

                    <div className="relative aspect-square">
                      <img src={comp.image} alt={comp.name} className="w-full h-full object-cover" />
                      <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-2.5 py-1 rounded-full flex items-center gap-1.5 shadow-sm">
                        <div className={`w-2 h-2 rounded-full ${comp.status === 'Online' ? 'bg-green-500' : comp.status === 'Busy' ? 'bg-yellow-500' : 'bg-gray-400'}`}></div>
                        <span className="text-[10px] font-bold uppercase tracking-wider text-rich-black">{comp.status}</span>
                      </div>
                    </div>
                    <div className="p-5 flex flex-col flex-grow">
                      <div className="flex justify-between items-start mb-1">
                        <h3 className="font-serif text-2xl text-rich-black font-medium">{comp.name}, <span className="text-lg opacity-80">{comp.age}</span></h3>
                      </div>
                      
                      <div className="flex flex-wrap gap-2 mb-6 mt-3">
                        {comp.tags.map(tag => (
                          <span key={tag} className="text-xs text-rich-black/60 bg-off-white px-2 py-1 rounded-md">{tag}</span>
                        ))}
                      </div>

                      <div className="mt-auto flex gap-2">
                        <button 
                          onClick={() => setSelectedComp(comp)} 
                          className="w-full flex items-center justify-center bg-off-white text-rich-black py-2.5 rounded-xl hover:bg-vibrant-pink hover:text-white transition-colors font-medium"
                        >
                          View Profile
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </motion.div>

      <AnimatePresence>
        {selectedComp && (
          <ProfilePopup 
            comp={selectedComp} 
            onClose={() => setSelectedComp(null)} 
            onAction={(action, name) => {
              setSelectedComp(null);
              onClose();
              onInitiateContact(action, name);
            }}
            user={user}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
