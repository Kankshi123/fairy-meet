import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, MapPin, Star, Sparkles, Navigation, Clock, CalendarDays } from 'lucide-react';

export default function VenueDetailsModal({ isOpen, onClose, venue }) {
  if (!isOpen || !venue) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-rich-black/40 backdrop-blur-sm"
        />
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-2xl max-h-[90vh] bg-off-white rounded-3xl shadow-hover overflow-hidden flex flex-col"
        >
          {/* Close Button */}
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 z-10 w-10 h-10 bg-white/80 backdrop-blur-md rounded-full flex items-center justify-center text-rich-black hover:bg-white hover:scale-105 transition-all shadow-sm"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Image Header */}
          <div className="relative h-64 w-full shrink-0">
            <img 
              src={venue.images[0]} 
              alt={venue.name} 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-rich-black/80 via-rich-black/20 to-transparent" />
            <div className="absolute bottom-0 left-0 w-full p-6 text-white">
              <div className="flex items-center gap-2 mb-2">
                <span className="bg-vibrant-pink/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1">
                  <Sparkles className="w-3 h-3" /> Fairy Verified
                </span>
                <span className="bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-xs font-medium">
                  {venue.type}
                </span>
              </div>
              <h2 className="font-serif text-3xl mb-1">{venue.name}</h2>
              <div className="flex items-center gap-4 text-sm text-white/90 font-sans">
                <span className="flex items-center gap-1"><MapPin className="w-4 h-4" /> {venue.location}</span>
                <span className="flex items-center gap-1 text-yellow-400"><Star className="w-4 h-4 fill-current" /> {venue.rating} ({venue.reviews} reviews)</span>
              </div>
            </div>
          </div>

          {/* Scrollable Content */}
          <div className="p-6 overflow-y-auto flex-grow scrollbar-hide">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              
              <div className="md:col-span-2 space-y-6">
                <section>
                  <h3 className="font-serif text-xl text-rich-black mb-3">About this place</h3>
                  <p className="font-sans text-rich-black/70 leading-relaxed">
                    {venue.description}
                  </p>
                </section>

                {/* Perk Box */}
                <div className="bg-vibrant-pink/5 border border-vibrant-pink/20 rounded-2xl p-5 relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-4 opacity-10">
                    <Sparkles className="w-16 h-16 text-vibrant-pink" />
                  </div>
                  <h4 className="font-sans font-semibold text-vibrant-pink flex items-center gap-2 mb-2">
                    <Sparkles className="w-4 h-4" /> Exclusive Fairy Perk
                  </h4>
                  <p className="font-sans text-rich-black/80">
                    {venue.perk}
                  </p>
                  <p className="font-sans text-xs text-rich-black/50 mt-2">
                    * Automatically applied when you book through Fairy Meet.
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="bg-white rounded-2xl p-5 border border-rich-black/5 shadow-sm">
                  <h3 className="font-serif text-lg text-rich-black mb-4">Details</h3>
                  
                  <div className="space-y-4 font-sans text-sm">
                    <div>
                      <span className="block text-rich-black/50 mb-1">Average Cost</span>
                      <span className="font-medium text-rich-black">{venue.priceRange}</span>
                    </div>
                    <div>
                      <span className="block text-rich-black/50 mb-1">Vibe</span>
                      <span className="font-medium text-rich-black">{venue.vibe}</span>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>

          {/* Footer CTA */}
          <div className="p-6 border-t border-rich-black/5 bg-white shrink-0 flex items-center justify-between">
            <div>
              <p className="font-sans font-medium text-rich-black">Perfect for your next meetup?</p>
              <p className="font-sans text-xs text-rich-black/60">Propose this venue to your Seeker</p>
            </div>
            <button className="bg-rich-black text-pure-white px-8 py-3.5 rounded-pill font-sans font-semibold hover:bg-vibrant-pink hover:-translate-y-0.5 hover:shadow-hover transition-all flex items-center gap-2">
              <CalendarDays className="w-4 h-4" />
              Propose Venue
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
