import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Phone, MessageCircle, Lock, Wallet, Sparkles, Calendar, MapPin, Coffee, Bell, Settings, Shield, EyeOff, UserCircle, Sliders, ChevronRight } from 'lucide-react';

const Overlay = ({ children, onClose }) => (
  <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
    <motion.div 
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      onClick={onClose}
      className="absolute inset-0 bg-rich-black/40 backdrop-blur-sm"
    />
    {children}
  </div>
);

export function SubscriptionModal({ isOpen, onClose, onSubscribe }) {
  if (!isOpen) return null;
  return (
    <AnimatePresence>
      <Overlay onClose={onClose}>
        <motion.div 
          initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-md bg-off-white rounded-2xl md:rounded-[32px] shadow-hover overflow-hidden flex flex-col text-center p-8"
        >
          <button onClick={onClose} className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-off-white text-rich-black hover:bg-vibrant-pink hover:text-white transition-colors">
            <X className="w-4 h-4" />
          </button>
          
          <div className="w-16 h-16 rounded-full bg-off-white flex items-center justify-center mx-auto mb-6">
            <Lock className="w-8 h-8 text-vibrant-pink" />
          </div>
          
          <h2 className="font-serif text-3xl text-rich-black mb-3">Unlock Connections</h2>
          <p className="font-sans text-base text-rich-black/70 mb-8">
            Get your 1-month active pass! Enjoy free unlimited chats for a month and your first 3 minutes of calling free.
          </p>
          
          <div className="bg-white border border-rich-black/10 rounded-2xl p-6 mb-8 shadow-sm">
            <span className="font-sans text-sm text-rich-black/60 uppercase tracking-widest font-semibold block mb-1">1-Month Pass</span>
            <div className="flex justify-center items-start gap-1">
              <span className="font-sans text-xl text-rich-black font-medium mt-1">₹</span>
              <span className="font-serif text-5xl text-rich-black">199</span>
            </div>
          </div>
          
          <button 
            onClick={onSubscribe}
            className="w-full flex items-center justify-center gap-2 bg-rich-black text-pure-white font-sans text-base font-medium px-8 py-4 rounded-pill hover:bg-rich-black transition-all"
          >
            Activate Free Pass
          </button>
        </motion.div>
      </Overlay>
    </AnimatePresence>
  );
}

export function ChatModal({ isOpen, onClose, companionName }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  if (!isOpen) return null;

  const handleSend = (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    setMessages([...messages, { text: input, sender: 'user' }]);
    setInput('');
    setIsTyping(true);
    setTimeout(() => {
      setMessages(prev => [...prev, { text: "That sounds magical! Tell me more.", sender: 'companion' }]);
      setIsTyping(false);
    }, 2500);
  };

  return (
    <AnimatePresence>
      <Overlay onClose={onClose}>
        <motion.div 
          initial={{ opacity: 0, y: "100%" }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: "100%" }}
          className="relative w-full max-w-md bg-off-white h-[600px] max-h-[90vh] rounded-2xl md:rounded-[32px] shadow-hover overflow-hidden flex flex-col"
        >
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-rich-black/10 bg-white">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-off-white flex items-center justify-center overflow-hidden border border-vibrant-pink/30">
                 <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop" alt="avatar" className="w-full h-full object-cover" />
              </div>
              <div>
                <h3 className="font-sans text-base font-semibold text-rich-black">{companionName || 'Companion'}</h3>
                <span className="font-sans text-xs text-green-600 font-medium">Online</span>
              </div>
            </div>
            <button onClick={onClose} className="w-8 h-8 flex items-center justify-center rounded-full bg-off-white text-rich-black hover:bg-vibrant-pink hover:text-white transition-colors">
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-grow overflow-y-auto p-4 space-y-4">
            <div className="text-center font-sans text-xs text-rich-black/40 my-4">Connection established</div>
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[75%] rounded-2xl px-4 py-2.5 font-sans text-sm ${msg.sender === 'user' ? 'bg-rich-black text-pure-white rounded-br-sm' : 'bg-white border border-rich-black/10 text-rich-black rounded-bl-sm'}`}>
                  {msg.text}
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-white border border-rich-black/10 rounded-2xl rounded-bl-sm px-4 py-3.5 flex items-center gap-1.5">
                  <motion.div animate={{ y: [0, -4, 0] }} transition={{ repeat: Infinity, duration: 0.6 }} className="w-1.5 h-1.5 bg-rich-black/40 rounded-full" />
                  <motion.div animate={{ y: [0, -4, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0.2 }} className="w-1.5 h-1.5 bg-rich-black/40 rounded-full" />
                  <motion.div animate={{ y: [0, -4, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0.4 }} className="w-1.5 h-1.5 bg-rich-black/40 rounded-full" />
                </div>
              </div>
            )}
          </div>

          {/* Input */}
          <div className="p-4 bg-white border-t border-rich-black/10">
            <form onSubmit={handleSend} className="flex gap-2">
              <input 
                type="text" 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type a message..." 
                className="flex-grow bg-off-white/50 border border-rich-black/10 rounded-full px-4 py-3 font-sans text-sm text-rich-black outline-none focus:border-vibrant-pink transition-all"
              />
              <button type="submit" className="w-12 h-12 flex items-center justify-center rounded-full bg-rich-black text-pure-white hover:bg-rich-black transition-colors">
                <MessageCircle className="w-5 h-5" />
              </button>
            </form>
          </div>
        </motion.div>
      </Overlay>
    </AnimatePresence>
  );
}

export function CallModal({ isOpen, onClose, companionName, isFree }) {
  const [time, setTime] = useState(0);
  const [showRechargePopup, setShowRechargePopup] = useState(false);

  useEffect(() => {
    let interval;
    if (isOpen) {
      interval = setInterval(() => {
        setTime(t => {
          if (!isFree && t + 1 === 180) { // 3 minutes
            setShowRechargePopup(true);
            try {
              const ctx = new (window.AudioContext || window.webkitAudioContext)();
              const osc = ctx.createOscillator();
              osc.connect(ctx.destination);
              osc.frequency.value = 800;
              osc.start();
              osc.stop(ctx.currentTime + 0.3);
            } catch(e) {}
          }
          if (!isFree && t + 1 >= 185) {
            onClose();
          }
          return t + 1;
        });
      }, 1000);
    } else {
      setTime(0);
      setShowRechargePopup(false);
    }
    return () => clearInterval(interval);
  }, [isOpen]);

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60).toString().padStart(2, '0');
    const s = (seconds % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <Overlay onClose={onClose}>
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }}
          className="relative w-full max-w-sm bg-rich-black rounded-[32px] shadow-hover overflow-hidden flex flex-col items-center py-12 px-6"
        >
          <div className="w-24 h-24 rounded-full bg-white flex items-center justify-center overflow-hidden mb-6 border-4 border-vibrant-pink/30">
            <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop" alt="avatar" className="w-full h-full object-cover" />
          </div>
          
          <h2 className="font-sans text-2xl font-medium text-pure-white mb-2">{companionName || 'Companion'}</h2>
          <p className="font-sans text-vibrant-pink tracking-widest">{formatTime(time)}</p>
          
          {/* Audio wave animation simulation */}
          <div className="flex gap-1.5 h-8 items-center mt-8 mb-12">
            {[...Array(5)].map((_, i) => (
              <motion.div 
                key={i}
                animate={{ height: ['20%', '100%', '20%'] }}
                transition={{ duration: 1, repeat: Infinity, delay: i * 0.1 }}
                className="w-1 bg-vibrant-pink rounded-full"
              />
            ))}
          </div>

          <button 
            onClick={onClose}
            className="w-16 h-16 flex items-center justify-center rounded-full bg-red-500 hover:bg-red-600 text-white transition-colors shadow-hover z-10"
          >
            <Phone className="w-6 h-6 rotate-[135deg]" />
          </button>

          {/* Recharge Popup */}
          <AnimatePresence>
            {showRechargePopup && (
              <motion.div 
                initial={{ opacity: 0, y: 50 }} 
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 50 }}
                className="absolute inset-x-4 bottom-28 bg-white rounded-2xl p-5 shadow-hover flex flex-col items-center text-center border border-vibrant-pink z-20"
              >
                <Wallet className="w-8 h-8 text-vibrant-pink mb-2" />
                <h3 className="font-sans font-bold text-rich-black text-lg mb-1">Free Call Ended</h3>
                <p className="font-sans text-sm text-rich-black/70 mb-4">
                  Please recharge to continue. Calls are ₹5/min for all genders.
                </p>
                <button 
                  onClick={() => setShowRechargePopup(false)}
                  className="bg-vibrant-pink text-white px-6 py-2.5 rounded-pill font-medium text-sm w-full hover:bg-vibrant-pink/90 transition-colors"
                >
                  Recharge Now
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </Overlay>
    </AnimatePresence>
  );
}

export function RechargeModal({ isOpen, onClose }) {
  if (!isOpen) return null;
  return (
    <AnimatePresence>
      <Overlay onClose={onClose}>
        <motion.div 
          initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-sm bg-off-white rounded-[32px] shadow-hover overflow-hidden flex flex-col p-8"
        >
          <button onClick={onClose} className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-off-white text-rich-black hover:bg-vibrant-pink hover:text-white transition-colors">
            <X className="w-4 h-4" />
          </button>
          
          <div className="w-12 h-12 rounded-full bg-off-white flex items-center justify-center mb-6">
            <Wallet className="w-6 h-6 text-rich-black" />
          </div>
          
          <h2 className="font-serif text-2xl text-rich-black mb-2">Recharge Wallet</h2>
          <p className="font-sans text-sm text-rich-black/70 mb-6">
            Add balance to continue enjoying seamless conversations.
          </p>

          <div className="grid grid-cols-2 gap-3 mb-6">
            {[100, 250, 500, 1000].map(amt => (
              <button key={amt} className="py-3 border border-rich-black/20 rounded-xl font-sans text-rich-black hover:border-vibrant-pink hover:bg-off-white transition-colors">
                ₹{amt}
              </button>
            ))}
          </div>

          <button className="w-full bg-rich-black text-pure-white font-sans py-3.5 rounded-pill hover:bg-rich-black transition-colors">
            Proceed to Pay
          </button>
        </motion.div>
      </Overlay>
    </AnimatePresence>
  );
}

export function UserProfileModal({ isOpen, onClose, user, onUpdateUser }) {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    nickname: user?.nickname || '',
    dob: user?.dob || '',
    email: user?.email || '',
    aadhaar: user?.aadhaar || '',
  });

  useEffect(() => {
    if (isOpen) {
      setFormData({
        name: user?.name || '',
        nickname: user?.nickname || '',
        dob: user?.dob || '',
        email: user?.email || '',
        aadhaar: user?.aadhaar || '',
      });
      setIsEditing(false);
    }
  }, [isOpen, user]);

  if (!isOpen || !user) return null;

  const handleSave = (e) => {
    e.preventDefault();
    onUpdateUser(formData);
    setIsEditing(false);
  };

  return (
    <AnimatePresence>
      <Overlay onClose={onClose}>
        <motion.div 
          initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-sm bg-white rounded-[32px] shadow-hover overflow-hidden flex flex-col p-8"
        >
          <button onClick={onClose} className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-off-white text-rich-black hover:bg-vibrant-pink hover:text-white transition-colors z-10">
            <X className="w-4 h-4" />
          </button>
          
          <div className="w-20 h-20 rounded-full bg-vibrant-pink flex items-center justify-center mx-auto mb-4 text-white font-serif text-3xl shadow-sm">
            {user.gender.charAt(0)}
          </div>

          {!isEditing ? (
            <div className="text-center">
              <h2 className="font-serif text-2xl text-rich-black mb-1">{user.name || 'Your Name'}</h2>
              {user.nickname && <p className="font-sans text-sm text-rich-black/60 mb-2">"{user.nickname}"</p>}
              <div className="flex justify-center items-center gap-2 mb-4">
                <span className="text-xs font-medium text-vibrant-pink bg-vibrant-pink/10 px-3 py-1 rounded-full">{user.gender}</span>
                {user.dob && <span className="text-xs font-medium text-rich-black/70 bg-off-white px-3 py-1 rounded-full">{user.dob}</span>}
              </div>
              
              <div className="bg-off-white/50 rounded-2xl p-4 mb-6 text-left border border-rich-black/5">
                <div className="mb-3">
                  <span className="block text-[10px] font-bold uppercase tracking-widest text-rich-black/40 mb-0.5">Email Address</span>
                  <span className="font-sans text-sm text-rich-black">{user.email || 'Not provided'}</span>
                </div>
                <div>
                  <span className="block text-[10px] font-bold uppercase tracking-widest text-rich-black/40 mb-0.5">Aadhaar Number</span>
                  <span className="font-sans text-sm text-rich-black">{user.aadhaar || 'XXXX XXXX XXXX'}</span>
                </div>
              </div>
              
              <button 
                onClick={() => setIsEditing(true)}
                className="w-full bg-off-white text-rich-black font-sans py-3 rounded-xl hover:bg-vibrant-pink hover:text-white transition-colors"
              >
                Edit Profile
              </button>
            </div>
          ) : (
            <form onSubmit={handleSave} className="flex flex-col gap-3">
              <h2 className="font-serif text-xl text-rich-black mb-2 text-center">Edit Profile</h2>
              
              <div>
                <label className="block text-[10px] font-bold text-rich-black/60 uppercase tracking-widest mb-1">Full Name</label>
                <input 
                  type="text" 
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full border border-rich-black/10 rounded-xl px-4 py-2 font-sans text-sm outline-none focus:border-vibrant-pink"
                  placeholder="Enter your name"
                  required
                />
              </div>
              
              <div>
                <label className="block text-[10px] font-bold text-rich-black/60 uppercase tracking-widest mb-1">Nickname</label>
                <input 
                  type="text" 
                  value={formData.nickname}
                  onChange={(e) => setFormData({...formData, nickname: e.target.value})}
                  className="w-full border border-rich-black/10 rounded-xl px-4 py-2 font-sans text-sm outline-none focus:border-vibrant-pink"
                  placeholder="Enter a nickname"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold text-rich-black/60 uppercase tracking-widest mb-1">Date of Birth</label>
                <input 
                  type="date" 
                  value={formData.dob}
                  onChange={(e) => setFormData({...formData, dob: e.target.value})}
                  className="w-full border border-rich-black/10 rounded-xl px-4 py-2 font-sans text-sm outline-none focus:border-vibrant-pink"
                  required
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold text-rich-black/60 uppercase tracking-widest mb-1">Email</label>
                <input 
                  type="email" 
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="w-full border border-rich-black/10 rounded-xl px-4 py-2 font-sans text-sm outline-none focus:border-vibrant-pink"
                  required
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold text-rich-black/60 uppercase tracking-widest mb-1">Aadhaar Number</label>
                <input 
                  type="text" 
                  value={formData.aadhaar}
                  onChange={(e) => setFormData({...formData, aadhaar: e.target.value})}
                  pattern="\d{12}"
                  title="12-digit Aadhaar number"
                  className="w-full border border-rich-black/10 rounded-xl px-4 py-2 font-sans text-sm outline-none focus:border-vibrant-pink"
                  required
                />
              </div>

              <div className="flex gap-2 mt-2">
                <button 
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="flex-1 border border-rich-black/10 text-rich-black font-sans py-2.5 rounded-xl hover:bg-off-white transition-colors"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  className="flex-1 bg-vibrant-pink text-white font-sans py-2.5 rounded-xl hover:bg-vibrant-pink/90 transition-colors"
                >
                  Save
                </button>
              </div>
            </form>
          )}
        </motion.div>
      </Overlay>
    </AnimatePresence>
  );
}

export function DateModal({ isOpen, onClose, companionName, isFree }) {
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [locationType, setLocationType] = useState('Coffee'); // Coffee, Dinner, Activity
  const [isConfirmed, setIsConfirmed] = useState(false);

  useEffect(() => {
    if (!isOpen) {
      setIsConfirmed(false);
      setDate('');
      setTime('');
      setLocationType('Coffee');
    }
  }, [isOpen]);

  const handleConfirm = () => {
    // Play a delightful success chime
    try {
      const ctx = new (window.AudioContext || window.webkitAudioContext)();
      const osc = ctx.createOscillator();
      const gainNode = ctx.createGain();
      
      osc.connect(gainNode);
      gainNode.connect(ctx.destination);
      
      osc.type = 'sine';
      // Arpeggio C5 -> E5 -> G5
      osc.frequency.setValueAtTime(523.25, ctx.currentTime);
      osc.frequency.setValueAtTime(659.25, ctx.currentTime + 0.1);
      osc.frequency.setValueAtTime(783.99, ctx.currentTime + 0.2);
      
      gainNode.gain.setValueAtTime(0.1, ctx.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.5);
      
      osc.start();
      osc.stop(ctx.currentTime + 0.5);
    } catch(e) {
      console.error(e);
    }
    
    // Switch to confirmed view
    setIsConfirmed(true);
  };
  
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <Overlay onClose={onClose}>
        <motion.div 
          initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-md bg-white rounded-[32px] shadow-hover overflow-hidden flex flex-col p-8"
        >
          <button onClick={onClose} className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-off-white text-rich-black hover:bg-vibrant-pink hover:text-white transition-colors z-10">
            <X className="w-4 h-4" />
          </button>
          
          <div className="w-16 h-16 rounded-full bg-vibrant-pink/10 flex items-center justify-center mx-auto mb-4 border border-vibrant-pink/20">
            <Calendar className="w-8 h-8 text-vibrant-pink" />
          </div>

          {!isConfirmed ? (
            <>
              <div className="text-center mb-6">
                <h2 className="font-serif text-2xl text-rich-black mb-1">Schedule a Date</h2>
                <p className="font-sans text-sm text-rich-black/60">Plan a beautiful meeting with {companionName}</p>
              </div>

              <form className="flex flex-col gap-4">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-[10px] font-bold text-rich-black/60 uppercase tracking-widest mb-1">Date</label>
                <input 
                  type="date" 
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full border border-rich-black/10 rounded-xl px-4 py-2 font-sans text-sm outline-none focus:border-vibrant-pink"
                  required
                />
              </div>
              <div>
                <label className="block text-[10px] font-bold text-rich-black/60 uppercase tracking-widest mb-1">Time</label>
                <input 
                  type="time" 
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  className="w-full border border-rich-black/10 rounded-xl px-4 py-2 font-sans text-sm outline-none focus:border-vibrant-pink"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-[10px] font-bold text-rich-black/60 uppercase tracking-widest mb-1">Location Vibe</label>
              <div className="grid grid-cols-3 gap-2">
                {['Coffee', 'Dinner', 'Activity'].map(type => (
                  <button
                    key={type}
                    type="button"
                    onClick={() => setLocationType(type)}
                    className={`py-2 rounded-xl text-sm font-sans border transition-colors flex items-center justify-center gap-1.5 ${
                      locationType === type 
                        ? 'bg-vibrant-pink border-vibrant-pink text-white' 
                        : 'bg-white border-rich-black/10 text-rich-black hover:border-vibrant-pink/50'
                    }`}
                  >
                    {type === 'Coffee' && <Coffee className="w-3.5 h-3.5" />}
                    {type === 'Dinner' && <Sparkles className="w-3.5 h-3.5" />}
                    {type === 'Activity' && <MapPin className="w-3.5 h-3.5" />}
                    {type}
                  </button>
                ))}
              </div>
            </div>

            <div className="bg-vibrant-pink/5 border border-vibrant-pink/20 rounded-2xl p-4 mt-2">
              <div className="flex justify-between items-center mb-1">
                <span className="font-sans text-sm font-medium text-rich-black">Minimum Engagement Fee</span>
                <span className="font-serif text-xl text-rich-black">{isFree ? 'Free' : '₹2000'}</span>
              </div>
              <p className="font-sans text-xs text-rich-black/60">
                {isFree 
                  ? "As a verified female user, your date scheduling is completely free." 
                  : "This fee guarantees the booking and ensures a premium experience."}
              </p>
            </div>

            <button 
              type="button"
              onClick={handleConfirm}
              disabled={!date || !time}
              className="w-full bg-rich-black text-pure-white font-sans font-medium py-3.5 rounded-xl hover:bg-vibrant-pink disabled:opacity-50 disabled:hover:bg-rich-black transition-colors mt-2"
            >
              {isFree ? 'Confirm Booking' : 'Proceed to Payment'}
            </button>
          </form>
          </>
          ) : (
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
              className="flex flex-col items-center text-center py-4"
            >
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-6 shadow-soft">
                <Sparkles className="w-10 h-10 text-green-500" />
              </div>
              <h2 className="font-serif text-3xl text-rich-black mb-3">Date Fixed!</h2>
              <p className="font-sans text-rich-black/70 mb-8 italic text-sm px-4">
                "The best things in life are the people we love, the places we've been, and the memories we'll make."
              </p>
              
              <div className="w-full bg-off-white rounded-2xl p-4 mb-8 border border-rich-black/5 text-left flex items-center gap-4">
                <div className="w-12 h-12 bg-vibrant-pink/10 rounded-full flex items-center justify-center flex-shrink-0">
                  <Calendar className="w-5 h-5 text-vibrant-pink" />
                </div>
                <div>
                  <p className="font-sans text-sm text-rich-black font-semibold mb-0.5">Meeting with {companionName}</p>
                  <p className="font-sans text-xs text-rich-black/60 capitalize">
                    {new Date(date).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })} at {time} • {locationType}
                  </p>
                </div>
              </div>

              <button 
                onClick={onClose}
                className="w-full bg-rich-black text-pure-white font-sans font-medium py-3.5 rounded-xl hover:bg-vibrant-pink transition-colors shadow-hover"
              >
                Awesome
              </button>
            </motion.div>
          )}

        </motion.div>
      </Overlay>
    </AnimatePresence>
  );
}

export function NotificationsModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  const notifications = [
    { id: 1, type: 'match', text: "Someone liked your profile!", time: "2m ago", unread: true },
    { id: 2, type: 'system', text: "Don't forget to use your free chat.", time: "1h ago", unread: true },
    { id: 3, type: 'activity', text: "Maya is online right now.", time: "3h ago", unread: false },
    { id: 4, type: 'system', text: "Welcome to Fairy Meet! Your dating era starts here.", time: "1d ago", unread: false },
  ];

  return (
    <AnimatePresence>
      <Overlay onClose={onClose}>
        <motion.div 
          initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-sm bg-white rounded-[32px] shadow-hover overflow-hidden flex flex-col p-8 max-h-[80vh]"
        >
          <button onClick={onClose} className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-off-white text-rich-black hover:bg-vibrant-pink hover:text-white transition-colors z-10">
            <X className="w-4 h-4" />
          </button>
          
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-full bg-vibrant-pink/10 flex items-center justify-center">
              <Bell className="w-6 h-6 text-vibrant-pink" />
            </div>
            <h2 className="font-serif text-2xl text-rich-black">Notifications</h2>
          </div>

          <div className="flex-grow overflow-y-auto pr-2 -mr-2 space-y-3">
            {notifications.map(notif => (
              <div key={notif.id} className={`p-4 rounded-2xl border ${notif.unread ? 'bg-off-white border-vibrant-pink/20' : 'bg-white border-rich-black/5'} transition-colors`}>
                <div className="flex justify-between items-start mb-1">
                  <span className={`font-sans text-sm font-medium ${notif.unread ? 'text-rich-black' : 'text-rich-black/70'}`}>
                    {notif.text}
                  </span>
                  {notif.unread && <div className="w-2 h-2 rounded-full bg-vibrant-pink mt-1.5 flex-shrink-0" />}
                </div>
                <span className="font-sans text-[10px] text-rich-black/40 uppercase tracking-widest font-bold">
                  {notif.time}
                </span>
              </div>
            ))}
          </div>
        </motion.div>
      </Overlay>
    </AnimatePresence>
  );
}

export function SettingsModal({ isOpen, onClose, user }) {
  const [activeTab, setActiveTab] = useState('discovery'); // discovery, account, privacy

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <Overlay onClose={onClose}>
        <motion.div 
          initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-md bg-white rounded-[32px] shadow-hover overflow-hidden flex flex-col p-8 h-[600px] max-h-[90vh]"
        >
          <button onClick={onClose} className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-off-white text-rich-black hover:bg-vibrant-pink hover:text-white transition-colors z-10">
            <X className="w-4 h-4" />
          </button>
          
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-full bg-rich-black/5 flex items-center justify-center">
              <Settings className="w-6 h-6 text-rich-black" />
            </div>
            <h2 className="font-serif text-2xl text-rich-black">Settings</h2>
          </div>

          <div className="flex gap-2 mb-6 border-b border-rich-black/10 pb-2">
            <button 
              onClick={() => setActiveTab('discovery')}
              className={`font-sans text-xs uppercase tracking-widest font-bold px-3 py-2 rounded-xl transition-colors ${activeTab === 'discovery' ? 'bg-rich-black text-white' : 'text-rich-black/50 hover:bg-off-white'}`}
            >
              Discovery
            </button>
            <button 
              onClick={() => setActiveTab('account')}
              className={`font-sans text-xs uppercase tracking-widest font-bold px-3 py-2 rounded-xl transition-colors ${activeTab === 'account' ? 'bg-rich-black text-white' : 'text-rich-black/50 hover:bg-off-white'}`}
            >
              Account
            </button>
            <button 
              onClick={() => setActiveTab('privacy')}
              className={`font-sans text-xs uppercase tracking-widest font-bold px-3 py-2 rounded-xl transition-colors ${activeTab === 'privacy' ? 'bg-rich-black text-white' : 'text-rich-black/50 hover:bg-off-white'}`}
            >
              Privacy
            </button>
          </div>

          <div className="flex-grow overflow-y-auto pr-2 -mr-2">
            {activeTab === 'discovery' && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-sans text-sm font-semibold text-rich-black">Maximum Distance</span>
                    <span className="font-sans text-sm text-rich-black/60">50 km</span>
                  </div>
                  <input type="range" min="1" max="100" defaultValue="50" className="w-full accent-vibrant-pink" />
                </div>
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-sans text-sm font-semibold text-rich-black">Age Range</span>
                    <span className="font-sans text-sm text-rich-black/60">18 - 35</span>
                  </div>
                  <input type="range" min="18" max="60" defaultValue="35" className="w-full accent-vibrant-pink" />
                </div>
                <div className="flex items-center justify-between p-4 bg-off-white rounded-2xl">
                  <div>
                    <span className="block font-sans text-sm font-semibold text-rich-black">Global Mode</span>
                    <span className="block font-sans text-xs text-rich-black/60">See people from around the world</span>
                  </div>
                  <div className="w-12 h-6 bg-vibrant-pink rounded-full relative cursor-pointer">
                    <div className="w-5 h-5 bg-white rounded-full absolute right-0.5 top-0.5 shadow-sm"></div>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'account' && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
                <div className="p-4 bg-off-white rounded-2xl flex items-center justify-between cursor-pointer hover:bg-rich-black/5 transition-colors">
                  <div className="flex items-center gap-3">
                    <UserCircle className="w-5 h-5 text-rich-black/60" />
                    <div>
                      <span className="block font-sans text-sm font-semibold text-rich-black">Phone Number</span>
                      <span className="block font-sans text-xs text-rich-black/60">+91 98765 43210</span>
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-rich-black/40" />
                </div>
                <div className="p-4 bg-off-white rounded-2xl flex items-center justify-between cursor-pointer hover:bg-rich-black/5 transition-colors">
                  <div className="flex items-center gap-3">
                    <MessageCircle className="w-5 h-5 text-rich-black/60" />
                    <div>
                      <span className="block font-sans text-sm font-semibold text-rich-black">Email Address</span>
                      <span className="block font-sans text-xs text-rich-black/60">{user?.email || 'Not verified'}</span>
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-rich-black/40" />
                </div>
                <button className="w-full py-4 text-center font-sans text-sm font-bold text-red-500 hover:bg-red-50 rounded-2xl transition-colors mt-4">
                  Delete Account
                </button>
              </motion.div>
            )}

            {activeTab === 'privacy' && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
                <div className="flex items-center justify-between p-4 border border-rich-black/10 rounded-2xl">
                  <div className="flex items-center gap-3">
                    <EyeOff className="w-5 h-5 text-rich-black/60" />
                    <div>
                      <span className="block font-sans text-sm font-semibold text-rich-black">Incognito Mode</span>
                      <span className="block font-sans text-xs text-rich-black/60">Hide my profile from discovery</span>
                    </div>
                  </div>
                  <div className="w-12 h-6 bg-rich-black/20 rounded-full relative cursor-pointer">
                    <div className="w-5 h-5 bg-white rounded-full absolute left-0.5 top-0.5 shadow-sm"></div>
                  </div>
                </div>
                <div className="flex items-center justify-between p-4 border border-rich-black/10 rounded-2xl">
                  <div className="flex items-center gap-3">
                    <Shield className="w-5 h-5 text-rich-black/60" />
                    <div>
                      <span className="block font-sans text-sm font-semibold text-rich-black">Blocked Contacts</span>
                      <span className="block font-sans text-xs text-rich-black/60">0 users blocked</span>
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-rich-black/40" />
                </div>
              </motion.div>
            )}
          </div>
        </motion.div>
      </Overlay>
    </AnimatePresence>
  );
}
