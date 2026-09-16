import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, Phone, X as XIcon, Film, Users, Coffee, Music, Map, CalendarHeart, Utensils, CheckCircle2, Lock, ShieldCheck, Wallet } from 'lucide-react';
import { useAppContext } from '../context/AppContext';

export const services = [
  { id: 1, title: "Movie Partner", price: 3500, duration: "3.5 hrs", icon: Film },
  { id: 2, title: "In-Person Meeting", price: 2000, duration: "2 hrs", icon: Users },
  { id: 3, title: "Hanging Out", price: 2000, duration: "2 hrs", icon: Coffee },
  { id: 4, title: "Clubbing", price: 4500, duration: "3 hrs", icon: Music },
  { id: 5, title: "City Tour", price: 2500, duration: "3 hrs", icon: Map },
  { id: 6, title: "Event Partner", price: 2000, duration: "3 hrs", icon: CalendarHeart },
  { id: 7, title: "Cafe & Food", price: 2000, duration: "2 hrs", icon: Utensils }
];

export default function ProfilePopup({ comp, onClose, onAction, user }) {
  const { unlockedConnections, bookService } = useAppContext();
  const [selectedService, setSelectedService] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [showPayment, setShowPayment] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  if (!comp) return null;

  const isUnlocked = unlockedConnections.includes(comp.id) || paymentSuccess;

  const handleBookClick = () => {
    if (!selectedService) return;
    setShowPayment(true);
  };

  const handleConfirmPayment = () => {
    setIsProcessing(true);
    setTimeout(() => {
      bookService(comp.id);
      setPaymentSuccess(true);
      setShowPayment(false);
      setIsProcessing(false);
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-[300] flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-rich-black/60 backdrop-blur-md"
      />
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="relative w-full max-w-md bg-off-white rounded-[32px] shadow-hover overflow-hidden flex flex-col z-10 max-h-[90vh]"
      >
        <button onClick={onClose} className="absolute top-4 right-4 z-10 w-8 h-8 flex items-center justify-center rounded-full bg-white/50 backdrop-blur-md text-rich-black hover:bg-vibrant-pink hover:text-white transition-colors">
          <XIcon className="w-4 h-4" />
        </button>

        {/* Profile Header */}
        <div className="relative w-full h-52 shrink-0">
          <img src={comp.image} alt={comp.name} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-rich-black/90 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-5">
            <h2 className="font-serif text-3xl text-white font-medium">{comp.name}, <span className="opacity-80 text-xl">{comp.age}</span></h2>
            <div className="flex items-center gap-1.5 mt-1">
              <div className={`w-2 h-2 rounded-full ${comp.status === 'Online' ? 'bg-green-500' : comp.status === 'Busy' ? 'bg-yellow-500' : 'bg-gray-400'}`}></div>
              <span className="text-xs font-bold uppercase tracking-wider text-white">{comp.status}</span>
            </div>
          </div>
        </div>

        <div className="p-5 overflow-y-auto scrollbar-hide flex-1">
          <div className="flex flex-wrap gap-2 mb-5">
            {comp.tags.map(tag => (
              <span key={tag} className="text-xs font-medium text-rich-black/70 bg-white border border-rich-black/10 px-3 py-1.5 rounded-md">{tag}</span>
            ))}
          </div>

          <AnimatePresence mode="wait">
            {isUnlocked ? (
              /* ── UNLOCKED STATE ── */
              <motion.div key="unlocked" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
                <div className="bg-green-50 border border-green-200 rounded-2xl p-4 flex flex-col items-center text-center">
                  <div className="w-12 h-12 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-2">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <h3 className="font-sans font-bold text-green-800">Connection Unlocked!</h3>
                  <p className="font-sans text-sm text-green-600/80 mt-1">You can now chat and call {comp.name}.</p>
                </div>
                <button
                  onClick={() => { onClose(); onAction('chat', comp); }}
                  className="w-full flex items-center justify-center gap-2 bg-rich-black text-white py-4 rounded-xl hover:bg-vibrant-pink transition-colors font-sans font-semibold text-base"
                >
                  <MessageCircle className="w-5 h-5" /> Chat Now
                </button>
              </motion.div>
            ) : (
              /* ── LOCKED STATE ── */
              <motion.div key="locked" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-5">
                <div>
                  <h3 className="font-serif text-xl text-rich-black mb-1 flex items-center gap-2">
                    <Lock className="w-5 h-5 text-vibrant-pink" /> Unlock Connection
                  </h3>
                  <p className="font-sans text-sm text-rich-black/60">
                    Select a service to book with {comp.name} to unlock chat &amp; calls.
                  </p>
                </div>

                {/* Service Cards Grid */}
                <div className="grid grid-cols-2 gap-2.5">
                  {services.map(svc => {
                    const Icon = svc.icon;
                    const isSelected = selectedService?.id === svc.id;
                    return (
                      <button
                        key={svc.id}
                        onClick={() => setSelectedService(svc)}
                        className={`text-left p-3 rounded-xl border transition-all flex flex-col gap-2 ${
                          isSelected
                            ? 'bg-vibrant-pink/5 border-vibrant-pink shadow-sm'
                            : 'bg-white border-rich-black/10 hover:border-vibrant-pink/40'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <Icon className={`w-4 h-4 ${isSelected ? 'text-vibrant-pink' : 'text-rich-black/50'}`} />
                          <span className={`text-[10px] font-semibold ${isSelected ? 'text-vibrant-pink' : 'text-rich-black/40'}`}>{svc.duration}</span>
                        </div>
                        <div>
                          <p className={`font-sans text-xs font-semibold leading-tight ${isSelected ? 'text-vibrant-pink' : 'text-rich-black'}`}>{svc.title}</p>
                          <p className="font-sans text-[11px] text-rich-black/50 mt-0.5">
                            ₹{svc.price}
                          </p>
                        </div>
                      </button>
                    );
                  })}
                </div>

                <button
                  onClick={handleBookClick}
                  disabled={!selectedService || isProcessing}
                  className="w-full flex items-center justify-center gap-2 bg-rich-black text-pure-white font-sans text-sm font-semibold px-6 py-4 rounded-xl hover:bg-vibrant-pink disabled:opacity-40 disabled:cursor-not-allowed transition-all"
                >
                  {isProcessing ? (
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <>
                      Book &amp; Unlock
                      {selectedService && (
                        <span className="ml-1 opacity-80">
                          (₹{selectedService.price})
                        </span>
                      )}
                    </>
                  )}
                </button>
                <div className="flex items-center justify-center gap-1 text-[10px] text-rich-black/40 font-semibold uppercase tracking-wider">
                  <ShieldCheck className="w-3 h-3" /> Verified Profile · Secure Booking
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Payment overlay (Males / LGBTQ+) */}
        <AnimatePresence>
          {showPayment && (
            <motion.div
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }}
              className="absolute inset-0 bg-white z-50 flex flex-col rounded-[32px] overflow-hidden"
            >
              <div className="p-4 border-b border-rich-black/10 flex items-center gap-2">
                <button onClick={() => setShowPayment(false)} className="p-1.5 -ml-1.5 text-rich-black/60 hover:text-rich-black rounded-lg hover:bg-off-white transition-colors">
                  <XIcon className="w-5 h-5" />
                </button>
                <h3 className="font-serif text-lg">Checkout</h3>
              </div>

              <div className="flex-1 p-6 flex flex-col items-center justify-center text-center space-y-6">
                <div className="w-16 h-16 bg-vibrant-pink/10 text-vibrant-pink rounded-full flex items-center justify-center">
                  <Wallet className="w-8 h-8" />
                </div>
                <div>
                  <p className="font-sans text-sm font-medium text-rich-black/60 mb-1">Total Amount</p>
                  <p className="font-serif text-5xl text-rich-black">₹{selectedService?.price}</p>
                </div>
                <div className="w-full bg-off-white rounded-2xl p-4 text-left border border-rich-black/10 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-rich-black/60">Service</span>
                    <span className="font-medium">{selectedService?.title}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-rich-black/60">Duration</span>
                    <span className="font-medium">{selectedService?.duration}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-rich-black/60">Companion</span>
                    <span className="font-medium">{comp.name}</span>
                  </div>
                </div>
              </div>

              <div className="p-5 border-t border-rich-black/10">
                <button
                  onClick={handleConfirmPayment}
                  disabled={isProcessing}
                  className="w-full flex items-center justify-center gap-2 bg-rich-black text-pure-white font-sans font-semibold py-4 rounded-xl hover:bg-vibrant-pink disabled:opacity-50 transition-colors"
                >
                  {isProcessing ? (
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ) : (
                    'Pay & Unlock Chat'
                  )}
                </button>
                <p className="text-center text-[10px] text-rich-black/40 font-semibold uppercase tracking-wider mt-3 flex items-center justify-center gap-1">
                  <ShieldCheck className="w-3 h-3" /> Secured via Fairy Wallet
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
