import React from 'react';
import { motion } from 'framer-motion';
import { MessageCircle, Phone, X as XIcon } from 'lucide-react';

export default function ProfilePopup({ comp, onClose, onAction, user }) {
  if (!comp) return null;
  return (
    <div className="fixed inset-0 z-[300] flex items-center justify-center p-4">
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
              <button onClick={() => { onClose(); onAction('call', comp.name); }} className="flex-1 flex flex-col items-center justify-center gap-0.5 bg-rich-black text-pure-white py-2 rounded-xl hover:bg-rich-black transition-colors">
                <div className="flex items-center gap-2">
                  <Phone className="w-5 h-5" />
                  <span className="font-medium">Call</span>
                </div>
                <span className="text-[10px] text-white/60">Coming Soon</span>
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
