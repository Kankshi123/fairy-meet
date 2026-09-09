import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Phone, MessageCircle, Lock, Wallet, Sparkles } from 'lucide-react';

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
            Get your 1-day free pass to chat and call instantly. Discover meaningful connections today.
          </p>
          
          <div className="bg-white border border-rich-black/10 rounded-2xl p-6 mb-8 shadow-sm">
            <span className="font-sans text-sm text-rich-black/60 uppercase tracking-widest font-semibold block mb-1">One-time pass</span>
            <div className="flex justify-center items-start gap-1">
              <span className="font-sans text-xl text-rich-black font-medium mt-1">₹</span>
              <span className="font-serif text-5xl text-rich-black">99</span>
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

export function CallModal({ isOpen, onClose, companionName }) {
  const [time, setTime] = useState(0);

  useEffect(() => {
    let interval;
    if (isOpen) {
      interval = setInterval(() => setTime(t => t + 1), 1000);
    } else {
      setTime(0);
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
            className="w-16 h-16 flex items-center justify-center rounded-full bg-red-500 hover:bg-red-600 text-white transition-colors shadow-hover"
          >
            <Phone className="w-6 h-6 rotate-[135deg]" />
          </button>
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
