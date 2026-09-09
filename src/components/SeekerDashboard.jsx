import React, { useState } from 'react';
import { motion, useMotionValue, useTransform, AnimatePresence } from 'framer-motion';
import { Heart, MessageCircle, Phone, Search, Bell, Settings, LogOut, LayoutGrid, Layers, X as XIcon, Calendar } from 'lucide-react';

const ProfilePopup = ({ comp, onClose, onAction, user }) => {
  if (!comp) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-rich-black/40 backdrop-blur-sm"
      />
      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="relative w-full max-w-md bg-white rounded-[32px] shadow-hover overflow-hidden flex flex-col z-10"
      >
        <button onClick={onClose} className="absolute top-4 right-4 z-10 w-8 h-8 flex items-center justify-center rounded-full bg-white/50 backdrop-blur-md text-rich-black hover:bg-vibrant-pink hover:text-white transition-colors">
          <XIcon className="w-4 h-4" />
        </button>
        <div className="relative w-full h-[350px]">
          <img src={comp.image} alt={comp.name} className="w-full h-full object-cover" />
          <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-rich-black/80 to-transparent">
            <h2 className="font-serif text-4xl text-white font-medium">{comp.name}, <span className="opacity-80 text-2xl">{comp.age}</span></h2>
            <div className="flex items-center gap-1.5 mt-2">
              <div className={`w-2 h-2 rounded-full ${comp.status === 'Online' ? 'bg-green-500' : comp.status === 'Busy' ? 'bg-yellow-500' : 'bg-gray-400'}`}></div>
              <span className="text-xs font-bold uppercase tracking-wider text-white">{comp.status}</span>
            </div>
          </div>
        </div>
        <div className="p-6">
          <div className="flex flex-wrap gap-2 mb-8">
            {comp.tags.map(tag => (
              <span key={tag} className="text-sm font-medium text-rich-black/70 bg-off-white px-3 py-1.5 rounded-md">{tag}</span>
            ))}
          </div>
          <div className="space-y-3">
            <div className="flex gap-3">
              <button onClick={() => { onClose(); onAction('chat', comp.name); }} className="flex-1 flex items-center justify-center gap-2 bg-off-white text-rich-black py-3 rounded-xl hover:bg-vibrant-pink hover:text-white transition-colors">
                <MessageCircle className="w-5 h-5" />
                <span className="font-medium">Chat</span>
              </button>
              <button onClick={() => { onClose(); onAction('call', comp.name); }} className="flex-1 flex items-center justify-center gap-2 bg-rich-black text-pure-white py-3 rounded-xl hover:bg-rich-black transition-colors">
                <Phone className="w-5 h-5" />
                <span className="font-medium">Call</span>
              </button>
            </div>
            <button onClick={() => { onClose(); onAction('date', comp.name); }} className="w-full flex flex-col items-center justify-center gap-1 bg-vibrant-pink/10 text-vibrant-pink py-3 rounded-xl border border-vibrant-pink hover:bg-vibrant-pink hover:text-white transition-colors">
              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                <span className="font-medium">Schedule a Date</span>
              </div>
              {user?.gender !== 'Female' && (
                <span className="text-xs opacity-80 uppercase tracking-widest font-bold">Min. ₹2000</span>
              )}
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

const companions = [
  {
    id: 1,
    name: "Maya",
    gender: "Female",
    age: 27,
    status: "Online",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=600&auto=format&fit=crop&q=80",
    tags: ["Creative", "Travel"],
    rate: "₹5/min"
  },
  {
    id: 2,
    name: "Arjun",
    gender: "Male",
    age: 29,
    status: "Busy",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&auto=format&fit=crop&q=80",
    tags: ["Music", "Outdoors"],
    rate: "₹5/min"
  },
  {
    id: 3,
    name: "Sarah",
    gender: "Female",
    age: 26,
    status: "Online",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=600&auto=format&fit=crop&q=80",
    tags: ["Art", "Reading"],
    rate: "₹5/min"
  },
  {
    id: 4,
    name: "Rohan",
    gender: "Male",
    age: 31,
    status: "Offline",
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=600&auto=format&fit=crop&q=80",
    tags: ["Fitness", "Tech"],
    rate: "₹5/min"
  }
];

const SwipeCard = ({ comp, onSwipe, isTop, onViewProfile }) => {
  const x = useMotionValue(0);
  const rotate = useTransform(x, [-200, 200], [-15, 15]);
  const opacity = useTransform(x, [-200, -100, 0, 100, 200], [0, 1, 1, 1, 0]);
  const likeOpacity = useTransform(x, [0, 100], [0, 1]);
  const nopeOpacity = useTransform(x, [-100, 0], [1, 0]);

  const handleDragEnd = (event, info) => {
    if (info.offset.x > 100) {
      onSwipe('right', comp);
    } else if (info.offset.x < -100) {
      onSwipe('left', comp);
    }
  };

  return (
    <motion.div
      style={{ x, rotate, opacity }}
      drag={isTop ? "x" : false}
      dragConstraints={{ left: 0, right: 0 }}
      onDragEnd={handleDragEnd}
      className={`absolute w-full h-full bg-white rounded-[32px] overflow-hidden shadow-hover border border-rich-black/5 ${isTop ? 'cursor-grab active:cursor-grabbing' : ''}`}
      initial={{ scale: 0.95, y: 20 }}
      animate={{ scale: isTop ? 1 : 0.95, y: isTop ? 0 : 20 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      <div className="relative w-full h-[65%]">
        <img src={comp.image} alt={comp.name} className="w-full h-full object-cover pointer-events-none" />
        
        {/* Like/Nope Stamps */}
        <motion.div style={{ opacity: likeOpacity }} className="absolute top-8 left-8 border-4 border-green-500 text-green-500 rounded-lg px-4 py-2 font-black text-4xl rotate-[-15deg] uppercase tracking-widest pointer-events-none">
          LIKE
        </motion.div>
        <motion.div style={{ opacity: nopeOpacity }} className="absolute top-8 right-8 border-4 border-vibrant-pink text-vibrant-pink rounded-lg px-4 py-2 font-black text-4xl rotate-[15deg] uppercase tracking-widest pointer-events-none">
          NOPE
        </motion.div>

        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-sm">
          <div className={`w-2 h-2 rounded-full ${comp.status === 'Online' ? 'bg-green-500' : comp.status === 'Busy' ? 'bg-yellow-500' : 'bg-gray-400'}`}></div>
          <span className="text-[10px] font-bold uppercase tracking-wider text-rich-black">{comp.status}</span>
        </div>
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20">
          <button 
            onClick={(e) => { e.stopPropagation(); onViewProfile(comp); }}
            className="bg-white/90 backdrop-blur-sm text-rich-black px-6 py-2.5 rounded-pill font-medium shadow-sm hover:bg-vibrant-pink hover:text-white transition-colors"
          >
            View Profile
          </button>
        </div>
      </div>
      
      <div className="p-6 flex flex-col h-[35%] justify-between pointer-events-none">
        <div>
          <div className="flex justify-between items-start mb-2">
            <h3 className="font-serif text-4xl text-rich-black font-medium">{comp.name}, <span className="opacity-80 text-2xl">{comp.age}</span></h3>
          </div>
          
          <div className="flex flex-wrap gap-2 mt-4">
            {comp.tags.map(tag => (
              <span key={tag} className="text-sm font-medium text-rich-black/70 bg-off-white px-3 py-1.5 rounded-md">{tag}</span>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default function SeekerDashboard({ onInitiateContact, user, onLogout, onUpdateUser, onOpenProfile, onOpenNotifications, onOpenSettings }) {
  const [viewMode, setViewMode] = useState('swipe'); // 'grid' or 'swipe'
  const [selectedComp, setSelectedComp] = useState(null);
  
  // Initial filtering based on gender
  const initialCompanions = companions.filter(comp => {
    if (user.gender === 'Female') return comp.gender === 'Male';
    if (user.gender === 'Male') return comp.gender === 'Female';
    return true; // LGBTQ+ sees everyone
  });

  const [deck, setDeck] = useState(initialCompanions);

  const handleSwipe = (direction, comp) => {
    setDeck(prev => prev.filter(c => c.id !== comp.id));
    if (direction === 'right') {
      // Simulate an automatic match or trigger chat
      setTimeout(() => {
        onInitiateContact('chat', comp.name);
      }, 300);
    }
  };

  return (
    <div className="min-h-screen bg-off-white font-sans text-rich-black pb-24 flex flex-col">
      {/* Top Navigation */}
      <header className="bg-white/80 backdrop-blur-md sticky top-0 z-40 border-b border-rich-black/10">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="font-serif text-2xl font-bold tracking-tight text-rich-black">FAIRY MEET</span>
          </div>
          <div className="flex items-center gap-3 sm:gap-6">
            <div className="flex items-center gap-1 sm:gap-2 bg-off-white px-3 sm:px-4 py-1.5 sm:py-2 rounded-full">
              <span className="hidden sm:inline text-xs uppercase tracking-widest font-semibold text-rich-black/60">Wallet</span>
              <span className="font-medium text-rich-black text-sm sm:text-base">₹{user.walletBalance}</span>
            </div>
            <button onClick={onOpenNotifications} className="text-rich-black/60 hover:text-vibrant-pink transition-colors">
              <Bell className="w-5 h-5" />
            </button>
            <button onClick={onOpenSettings} className="text-rich-black/60 hover:text-vibrant-pink transition-colors">
              <Settings className="w-5 h-5" />
            </button>
            <button onClick={onLogout} className="text-rich-black/60 hover:text-vibrant-pink transition-colors">
              <LogOut className="w-5 h-5" />
            </button>
            <button 
              onClick={onOpenProfile}
              className="w-10 h-10 rounded-full bg-vibrant-pink flex items-center justify-center text-white font-serif text-lg hover:ring-2 hover:ring-vibrant-pink hover:ring-offset-2 transition-all cursor-pointer"
            >
              {user.gender.charAt(0)}
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl w-full mx-auto px-6 pt-8 flex-grow flex flex-col">
        <div className="mb-6 sm:mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4 sm:gap-6">
          <div>
            <h1 className="font-serif text-3xl sm:text-4xl text-rich-black mb-1 sm:mb-2">Discover Connections</h1>
            <p className="text-rich-black/60 text-base sm:text-lg">Find someone who matches your vibe.</p>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="flex bg-white rounded-full p-1 border border-rich-black/10 shadow-sm">
              <button 
                onClick={() => setViewMode('swipe')}
                className={`p-2 rounded-full transition-colors ${viewMode === 'swipe' ? 'bg-vibrant-pink text-white shadow-sm' : 'text-rich-black/40 hover:text-rich-black'}`}
              >
                <Layers className="w-5 h-5" />
              </button>
              <button 
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-full transition-colors ${viewMode === 'grid' ? 'bg-vibrant-pink text-white shadow-sm' : 'text-rich-black/40 hover:text-rich-black'}`}
              >
                <LayoutGrid className="w-5 h-5" />
              </button>
            </div>
            
            {viewMode === 'grid' && (
              <div className="relative hidden md:block">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-rich-black/40" />
                <input 
                  type="text" 
                  placeholder="Search..." 
                  className="w-48 bg-white border border-rich-black/10 rounded-full pl-12 pr-4 py-2 outline-none focus:border-vibrant-pink transition-colors shadow-sm"
                />
              </div>
            )}
          </div>
        </div>

        {/* Dynamic View Area */}
        <div className="flex-grow flex items-center justify-center w-full pb-8">
          {viewMode === 'swipe' ? (
            <div className="relative w-full max-w-md h-[65vh] min-h-[400px] max-h-[600px] flex items-center justify-center">
              {deck.length === 0 ? (
                <div className="text-center">
                  <div className="w-20 h-20 bg-vibrant-pink/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Heart className="w-10 h-10 text-vibrant-pink" />
                  </div>
                  <h3 className="font-serif text-3xl text-rich-black mb-2">You've seen everyone!</h3>
                  <p className="text-rich-black/60">Check back later for new connections.</p>
                </div>
              ) : (
                <AnimatePresence>
                  {deck.map((comp, idx) => (
                      <SwipeCard 
                        key={comp.id} 
                        comp={comp} 
                        onSwipe={handleSwipe} 
                        isTop={idx === deck.length - 1}
                        onViewProfile={setSelectedComp}
                      />
                  ))}
                </AnimatePresence>
              )}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full self-start">
              {initialCompanions.map((comp, idx) => (
                <motion.div 
                  key={comp.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  className="bg-white rounded-[24px] overflow-hidden shadow-soft border border-rich-black/5 flex flex-col"
                >
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
                    
                    <div className="flex gap-2 mb-6 mt-3">
                      {comp.tags.map(tag => (
                        <span key={tag} className="text-xs text-rich-black/60 bg-off-white px-2 py-1 rounded-md">{tag}</span>
                      ))}
                    </div>

                    <div className="mt-auto">
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
          )}
        </div>
      </main>

      <AnimatePresence>
        {selectedComp && (
          <ProfilePopup 
            comp={selectedComp} 
            onClose={() => setSelectedComp(null)} 
            onAction={onInitiateContact}
            user={user}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
