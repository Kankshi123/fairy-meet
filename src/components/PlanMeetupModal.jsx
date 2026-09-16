import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Calendar, Coffee, UtensilsCrossed, Zap, CheckCircle2, ShieldCheck } from 'lucide-react';

const vibes = [
  { id: 'coffee', label: 'Coffee', icon: Coffee },
  { id: 'dinner', label: 'Dinner', icon: UtensilsCrossed },
  { id: 'activity', label: 'Activity', icon: Zap },
];

export default function PlanMeetupModal({ isOpen, onClose, companion, user }) {
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [vibe, setVibe] = useState('coffee');
  const [isProcessing, setIsProcessing] = useState(false);
  const [success, setSuccess] = useState(false);

  if (!isOpen) return null;

  const isFemale = user?.gender === 'Female';
  const fee = isFemale ? 'Free' : '₹2,000';

  const handleConfirm = () => {
    if (!date || !time) return;
    setIsProcessing(true);
    setTimeout(() => {
      setSuccess(true);
      setIsProcessing(false);
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-[500] flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-rich-black/60 backdrop-blur-md"
      />

      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="relative w-full max-w-sm bg-white rounded-[32px] shadow-2xl z-10 overflow-hidden"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-off-white text-rich-black/60 hover:bg-vibrant-pink hover:text-white transition-colors z-10"
        >
          <X className="w-4 h-4" />
        </button>

        <AnimatePresence mode="wait">
          {success ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex flex-col items-center justify-center text-center p-10 gap-4 min-h-[340px]"
            >
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                <CheckCircle2 className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="font-serif text-2xl text-rich-black">Meetup Planned!</h3>
              <p className="font-sans text-sm text-rich-black/60">
                Your meetup with <strong>{companion?.name}</strong> has been scheduled. They'll be notified shortly.
              </p>
              <button
                onClick={onClose}
                className="mt-2 bg-rich-black text-white px-8 py-3 rounded-xl font-sans font-semibold text-sm hover:bg-vibrant-pink transition-colors"
              >
                Done
              </button>
            </motion.div>
          ) : (
            <motion.div key="form" className="p-6 pb-8 space-y-5">
              {/* Header */}
              <div className="flex flex-col items-center text-center pt-2">
                <div className="w-14 h-14 bg-vibrant-pink/10 rounded-full flex items-center justify-center mb-4">
                  <Calendar className="w-7 h-7 text-vibrant-pink" />
                </div>
                <h2 className="font-serif text-2xl text-rich-black">Schedule a Date</h2>
                <p className="font-sans text-sm text-rich-black/50 mt-1">
                  Plan a beautiful meeting with {companion?.name}
                </p>
              </div>

              {/* Date & Time Row */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-sans text-[10px] font-bold uppercase tracking-widest text-rich-black/50 mb-2">Date</label>
                  <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    min={new Date().toISOString().split('T')[0]}
                    className="w-full bg-off-white border border-rich-black/10 rounded-xl px-3 py-3 text-sm font-sans text-rich-black outline-none focus:border-vibrant-pink transition-colors"
                  />
                </div>
                <div>
                  <label className="block font-sans text-[10px] font-bold uppercase tracking-widest text-rich-black/50 mb-2">Time</label>
                  <input
                    type="time"
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    className="w-full bg-off-white border border-rich-black/10 rounded-xl px-3 py-3 text-sm font-sans text-rich-black outline-none focus:border-vibrant-pink transition-colors"
                  />
                </div>
              </div>

              {/* Location Vibe */}
              <div>
                <label className="block font-sans text-[10px] font-bold uppercase tracking-widest text-rich-black/50 mb-2">Location Vibe</label>
                <div className="flex gap-2">
                  {vibes.map(v => {
                    const Icon = v.icon;
                    const isSelected = vibe === v.id;
                    return (
                      <button
                        key={v.id}
                        onClick={() => setVibe(v.id)}
                        className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-full text-sm font-semibold transition-all border ${
                          isSelected
                            ? 'bg-vibrant-pink text-white border-vibrant-pink'
                            : 'bg-white text-rich-black/70 border-rich-black/15 hover:border-vibrant-pink/50'
                        }`}
                      >
                        <Icon className="w-4 h-4" />
                        {v.label}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Fee Section */}
              <div className={`rounded-2xl p-4 flex items-start justify-between gap-4 ${isFemale ? 'bg-pink-50 border border-pink-100' : 'bg-amber-50 border border-amber-100'}`}>
                <div>
                  <p className="font-sans font-bold text-sm text-rich-black">Minimum Engagement Fee</p>
                  <p className={`font-sans text-xs mt-1 ${isFemale ? 'text-rich-black/60' : 'text-amber-700'}`}>
                    {isFemale
                      ? 'As a verified female user, your date scheduling is completely free.'
                      : 'A minimum engagement fee of ₹2,000 applies. This ensures companion commitment.'}
                  </p>
                </div>
                <span className={`font-serif text-2xl shrink-0 mt-0.5 ${isFemale ? 'text-vibrant-pink' : 'text-amber-700 font-bold'}`}>
                  {fee}
                </span>
              </div>

              {/* Confirm Button */}
              <button
                onClick={handleConfirm}
                disabled={!date || !time || isProcessing}
                className="w-full flex items-center justify-center gap-2 bg-rich-black text-white font-sans font-bold py-4 rounded-2xl hover:bg-vibrant-pink disabled:opacity-40 disabled:cursor-not-allowed transition-all text-sm"
              >
                {isProcessing ? (
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  `Confirm Booking${!isFemale ? ' · ₹2,000' : ''}`
                )}
              </button>
              <div className="flex items-center justify-center gap-1 text-[10px] text-rich-black/30 font-semibold uppercase tracking-wider -mt-2">
                <ShieldCheck className="w-3 h-3" /> Verified & Safe Meetups
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
