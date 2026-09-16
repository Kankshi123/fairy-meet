import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Star, Sparkles, Coffee, Utensils, Activity, Leaf } from 'lucide-react';
import { vendors } from '../data/mockVendors';
import VenueDetailsModal from './VenueDetailsModal';

export default function VenuesList() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedVenue, setSelectedVenue] = useState(null);
  
  const categories = ['All', 'Cafe & Bakery', 'Fine Dining', 'Activity', 'Experience'];

  const filteredVendors = selectedCategory === 'All' 
    ? vendors 
    : vendors.filter(v => v.type === selectedCategory);

  return (
    <div className="h-full flex flex-col p-6 max-w-5xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
        <div>
          <h2 className="font-serif text-3xl text-rich-black flex items-center gap-2">
            Fairy Venues <Sparkles className="w-6 h-6 text-vibrant-pink" />
          </h2>
          <p className="font-sans text-rich-black/60 mt-2 max-w-lg">
            Choose a verified partner location for your meetup. Enjoy exclusive perks and a guaranteed safe, premium experience.
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-2 mb-8">
        {categories.map(category => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-4 py-2 rounded-full font-sans text-sm font-medium transition-all ${
              selectedCategory === category
                ? 'bg-vibrant-pink text-pure-white shadow-sm'
                : 'bg-white border border-rich-black/10 text-rich-black/60 hover:border-vibrant-pink/50'
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 overflow-y-auto pb-20 scrollbar-hide">
        {filteredVendors.map((venue, index) => (
          <motion.div
            key={venue.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            onClick={() => setSelectedVenue(venue)}
            className="group cursor-pointer bg-white rounded-[24px] border border-rich-black/5 hover:border-vibrant-pink/30 hover:shadow-hover transition-all overflow-hidden flex flex-col h-full"
          >
            {/* Image */}
            <div className="relative h-48 w-full overflow-hidden">
              <img 
                src={venue.images[0]} 
                alt={venue.name} 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full flex items-center gap-1.5 shadow-sm">
                <Star className="w-3.5 h-3.5 text-yellow-500 fill-current" />
                <span className="font-sans text-xs font-semibold">{venue.rating}</span>
                <span className="font-sans text-xs text-rich-black/60">({venue.reviews})</span>
              </div>
              <div className="absolute top-4 right-4 bg-vibrant-pink text-white px-3 py-1 rounded-full font-sans text-xs font-semibold shadow-sm flex items-center gap-1">
                <Sparkles className="w-3 h-3" /> Verified
              </div>
            </div>

            {/* Content */}
            <div className="p-5 flex flex-col flex-grow">
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-serif text-xl text-rich-black">{venue.name}</h3>
                <span className="font-sans font-medium text-rich-black/60 bg-rich-black/5 px-2 py-1 rounded-md text-sm">{venue.priceRange}</span>
              </div>
              
              <div className="flex items-center gap-3 text-sm text-rich-black/60 mb-4">
                <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5" /> {venue.location}</span>
                <span>•</span>
                <span>{venue.vibe}</span>
              </div>

              {/* Perk Badge */}
              <div className="mt-auto bg-vibrant-pink/5 border border-vibrant-pink/20 rounded-xl p-3 flex items-start gap-2">
                <Sparkles className="w-4 h-4 text-vibrant-pink mt-0.5 shrink-0" />
                <p className="font-sans text-sm text-vibrant-pink font-medium leading-snug">
                  {venue.perk}
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <VenueDetailsModal 
        isOpen={!!selectedVenue} 
        onClose={() => setSelectedVenue(null)} 
        venue={selectedVenue} 
      />
    </div>
  );
}
