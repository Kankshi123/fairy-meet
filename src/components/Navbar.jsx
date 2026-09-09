import React, { useState, useEffect } from 'react';
import { Sparkles } from 'lucide-react';
import { cn } from '../lib/utils';
import Magnetic from './Magnetic';

export default function Navbar({ onOpenAuth }) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header 
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out border-b border-transparent",
        scrolled ? "bg-off-white/90 backdrop-blur-md border-rich-black/10 py-4 shadow-sm" : "bg-off-white py-6"
      )}
    >
      <nav className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
        {/* Logo */}
        <a href="#" className="flex items-center gap-1 group">
          <span className="font-serif text-2xl font-bold tracking-tight text-rich-black">FAIRY MEET</span>
          <Sparkles className="w-4 h-4 text-vibrant-pink group-hover:text-rich-black transition-colors" />
        </a>

        {/* Center Links */}
        <div className="hidden lg:flex items-center gap-8">
          {['Discover', 'How It Works', 'Stories', 'Safety'].map((item) => (
            <a 
              key={item} 
              href={`#${item.toLowerCase().replace(/ /g, '-')}`}
              className="font-sans text-sm font-medium text-rich-black/80 hover:text-rich-black transition-colors"
            >
              {item}
            </a>
          ))}
        </div>

        {/* Right Actions */}
        <div className="hidden md:flex items-center gap-6">
          <button onClick={() => onOpenAuth('login')} className="font-sans text-sm font-medium text-rich-black hover:text-vibrant-pink transition-colors">
            Log In
          </button>
          <Magnetic>
            <button 
              onClick={() => onOpenAuth('signup')}
              className="bg-rich-black text-pure-white font-sans text-sm font-medium px-6 py-2.5 rounded-pill hover:bg-vibrant-pink transition-all hover:shadow-hover hover:-translate-y-0.5 active:translate-y-0 group"
            >
              <span className="inline-block transition-transform group-hover:scale-105">Find Your Match</span>
            </button>
          </Magnetic>
        </div>
      </nav>
    </header>
  );
}
