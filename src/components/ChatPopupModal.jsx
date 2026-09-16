import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, MessageCircle } from 'lucide-react';
import PlanMeetupModal from './PlanMeetupModal';

export default function ChatPopupModal({ companion, user, onClose }) {
  const [messages, setMessages] = useState([
    { id: 1, text: 'Hey! Looking forward to meeting you 😊', sender: 'them' },
    { id: 2, text: 'Same here! When works for you?', sender: 'me' },
  ]);
  const [newMessage, setNewMessage] = useState('');
  const [showMeetupModal, setShowMeetupModal] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = () => {
    if (!newMessage.trim()) return;
    setMessages(prev => [...prev, { id: Date.now(), text: newMessage, sender: 'me' }]);
    setNewMessage('');
  };

  if (!companion) return null;

  return (
    <>
      <div className="fixed inset-0 z-[300] flex items-center justify-center p-4">
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
          className="relative w-full max-w-2xl h-[600px] max-h-[85vh] bg-white rounded-[32px] shadow-2xl z-10 overflow-hidden flex flex-col"
        >
          {/* Chat Header */}
          <div className="px-6 py-4 border-b border-rich-black/10 flex items-center gap-4 shrink-0 bg-off-white/50">
            <img src={companion.image} className="w-12 h-12 rounded-full object-cover shadow-sm" alt={companion.name} />
            <div className="flex-1">
              <p className="font-serif text-lg text-rich-black">{companion.name}</p>
              <p className="text-xs text-green-500 font-bold uppercase tracking-wider">{companion.status || 'Online'}</p>
            </div>
            
            <button
              onClick={() => setShowMeetupModal(true)}
              className="flex items-center gap-1.5 bg-vibrant-pink/10 text-vibrant-pink border border-vibrant-pink/20 hover:bg-vibrant-pink hover:text-white px-4 py-2 rounded-full font-sans font-bold text-xs uppercase tracking-wider transition-all shadow-sm"
            >
              <span className="text-base">✦</span> Plan Meetup
            </button>
            
            <button
              onClick={onClose}
              className="w-10 h-10 flex items-center justify-center rounded-full bg-white border border-rich-black/10 text-rich-black/60 hover:bg-rich-black hover:text-white transition-colors ml-2 shadow-sm"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages Area */}
          <div className="flex-1 p-6 flex flex-col space-y-4 overflow-y-auto bg-white custom-scrollbar">
            {messages.map(msg => (
              <div key={msg.id} className={`p-4 rounded-2xl w-fit max-w-[75%] text-[15px] font-sans leading-relaxed shadow-sm ${
                msg.sender === 'me'
                  ? 'bg-vibrant-pink text-white rounded-tr-none self-end'
                  : 'bg-off-white text-rich-black rounded-tl-none self-start border border-rich-black/5'
              }`}>
                {msg.text}
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="p-5 border-t border-rich-black/10 bg-off-white/30 shrink-0">
            <div className="flex gap-3 max-w-full">
              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder={`Message ${companion.name}...`}
                className="flex-1 bg-white border border-rich-black/15 rounded-full px-6 py-3.5 text-[15px] font-sans text-rich-black outline-none focus:border-vibrant-pink focus:ring-1 focus:ring-vibrant-pink shadow-sm transition-all"
              />
              <button
                onClick={handleSend}
                className="w-12 h-12 shrink-0 bg-vibrant-pink text-white rounded-full flex items-center justify-center hover:bg-vibrant-pink/90 transition-colors shadow-md"
              >
                <MessageCircle className="w-5 h-5" />
              </button>
            </div>
          </div>
        </motion.div>
      </div>

      <AnimatePresence>
        {showMeetupModal && (
          <PlanMeetupModal
            isOpen={showMeetupModal}
            onClose={() => setShowMeetupModal(false)}
            companion={companion}
            user={user}
          />
        )}
      </AnimatePresence>
    </>
  );
}
