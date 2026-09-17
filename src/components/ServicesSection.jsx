import React from 'react';
import { motion } from 'framer-motion';
import { Film, Users, Coffee, Music, Map, CalendarHeart, Utensils } from 'lucide-react';

export default function ServicesSection({ onOpenAuth }) {
  const services = [
    {
      id: 1,
      title: "Movie Partner",
      price: "₹3500",
      duration: "3.5 hours",
      icon: Film,
      color: "bg-purple-50 text-purple-600 border-purple-200",
      image: "/services/movie.jpg"
    },
    {
      id: 2,
      title: "In-Person Meeting",
      price: "₹2000",
      duration: "2 hours",
      icon: Users,
      color: "bg-blue-50 text-blue-600 border-blue-200",
      image: "/services/meeting.jpg"
    },
    {
      id: 3,
      title: "Hanging Out",
      price: "₹2000",
      duration: "2 hours",
      icon: Coffee,
      color: "bg-green-50 text-green-600 border-green-200",
      image: "/services/hangout.jpg"
    },
    {
      id: 4,
      title: "Clubbing",
      price: "₹4500",
      duration: "3 hours",
      icon: Music,
      color: "bg-rose-50 text-rose-600 border-rose-200",
      image: "/services/clubbing.jpg"
    },
    {
      id: 5,
      title: "City Tour Partner",
      price: "₹2500",
      duration: "3 hours",
      icon: Map,
      color: "bg-orange-50 text-orange-600 border-orange-200",
      image: "/services/city.jpg"
    },
    {
      id: 6,
      title: "Event Partner",
      price: "₹2000",
      duration: "3 hours",
      icon: CalendarHeart,
      color: "bg-teal-50 text-teal-600 border-teal-200",
      image: "/services/event.jpg"
    },
    {
      id: 7,
      title: "Cafe & Food Partner",
      price: "₹2000",
      duration: "2 hours",
      icon: Utensils,
      color: "bg-yellow-50 text-yellow-600 border-yellow-200",
      image: "/services/cafe.jpg"
    }
  ];

  return (
    <section className="py-24 bg-pure-white relative overflow-hidden" id="services">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-vibrant-pink/5 rounded-full blur-3xl -z-10 translate-x-1/3 -translate-y-1/2" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-rich-black/5 rounded-full blur-3xl -z-10 -translate-x-1/2 translate-y-1/2" />

      <div className="max-w-7xl mx-auto px-6 sm:px-12 lg:px-24">
        
        {/* Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block bg-vibrant-pink/10 text-vibrant-pink px-4 py-2 rounded-full font-sans text-sm font-bold tracking-wide uppercase mb-4"
          >
            Popular Experiences
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-serif text-4xl md:text-5xl text-rich-black mb-4 tracking-tight"
          >
            Choose your perfect date
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="font-sans text-rich-black/60 text-lg max-w-2xl mx-auto"
          >
            Transparent pricing for beautifully curated experiences. Pick a service below to find a verified Companion ready to join you.
          </motion.p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                onClick={() => onOpenAuth('signup', 'seeker')}
                className="group cursor-pointer bg-rich-black rounded-3xl p-6 border border-transparent hover:border-vibrant-pink/50 shadow-sm hover:shadow-hover transition-all duration-300 relative overflow-hidden flex flex-col items-start min-h-[280px]"
              >
                {/* Background Image */}
                <div 
                  className="absolute inset-0 bg-cover bg-center opacity-80 group-hover:opacity-40 transition-all duration-700 ease-out group-hover:scale-110 group-hover:blur-sm" 
                  style={{ backgroundImage: `url(${service.image})` }} 
                />
                
                {/* Gradient overlay for readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-rich-black/95 via-rich-black/50 to-rich-black/10 transition-opacity duration-500 group-hover:opacity-80" />
                
                {/* Content Container (Zooms on hover) */}
                <div className="relative z-10 w-full h-full flex flex-col flex-grow transition-transform duration-500 ease-out group-hover:scale-105">
                  <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6 bg-pure-white/20 backdrop-blur-md border border-pure-white/30 text-pure-white shadow-lg">
                    <Icon className="w-7 h-7" />
                  </div>
                  
                  <h3 className="font-serif text-2xl text-pure-white mb-2 transition-colors duration-300">
                    {service.title}
                  </h3>
                  
                  <div className="mt-auto pt-4 border-t border-pure-white/20 w-full flex items-center justify-between">
                    <div className="flex flex-col">
                      <span className="font-sans text-xs text-pure-white/70 uppercase tracking-wider font-semibold mb-0.5">Price</span>
                      <span className="font-sans font-bold text-lg text-pure-white">{service.price}</span>
                    </div>
                    <div className="flex flex-col items-end">
                      <span className="font-sans text-xs text-pure-white/70 uppercase tracking-wider font-semibold mb-0.5">Duration</span>
                      <span className="font-sans font-medium text-pure-white/90">{service.duration}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
