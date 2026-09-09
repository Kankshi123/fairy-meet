import React, { useState, useEffect } from 'react';
import { Sparkles, Menu, X, Moon, Sun } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../lib/utils';
import Magnetic from './Magnetic';

export default function Navbar({ onOpenAuth }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Prevent scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [mobileMenuOpen]);

  const navLinks = ['Discover', 'How It Works', 'Stories', 'Safety'];

  return (
    <>
      <header 
        className={cn(
          "fixed top-0 left-0 right-0 z-[100] transition-all duration-300 ease-in-out border-b border-transparent",
          scrolled || mobileMenuOpen ? "bg-off-white/90 backdrop-blur-md border-rich-black/10 py-4 shadow-sm" : "bg-off-white py-6"
        )}
      >
        <nav className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
          {/* Logo */}
          <a href="#" className="flex items-center gap-1 group relative z-[101]">
            <span className="font-serif text-2xl font-bold tracking-tight text-rich-black">FAIRY MEET</span>
            <Sparkles className="w-4 h-4 text-vibrant-pink group-hover:text-rich-black transition-colors" />
          </a>

          {/* Center Links (Desktop) */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((item) => (
              <a 
                key={item} 
                href={`#${item.toLowerCase().replace(/ /g, '-')}`}
                className="font-sans text-sm font-medium text-rich-black/80 hover:text-rich-black transition-colors"
              >
                {item}
              </a>
            ))}
          </div>

          {/* Right Actions (Desktop) */}
          <div className="hidden md:flex items-center gap-6">
            <button 
              onClick={() => setIsDark(!isDark)}
              className="text-rich-black/80 hover:text-vibrant-pink transition-colors p-2"
              aria-label="Toggle Dark Mode"
            >
              {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
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

          {/* Mobile Actions */}
          <div className="md:hidden flex items-center gap-2 relative z-[101]">
            <button 
              onClick={() => setIsDark(!isDark)}
              className="text-rich-black p-2"
              aria-label="Toggle Dark Mode"
            >
              {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
            <button 
              className="text-rich-black p-2"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-[90] bg-off-white pt-24 px-6 flex flex-col"
          >
            <div className="flex flex-col gap-6 mt-8">
              {navLinks.map((item) => (
                <a 
                  key={item} 
                  href={`#${item.toLowerCase().replace(/ /g, '-')}`}
                  onClick={() => setMobileMenuOpen(false)}
                  className="font-serif text-4xl text-rich-black hover:text-vibrant-pink transition-colors"
                >
                  {item}
                </a>
              ))}
            </div>
            
            <div className="mt-auto mb-12 flex flex-col gap-4">
              <button 
                onClick={() => { setMobileMenuOpen(false); onOpenAuth('login'); }} 
                className="w-full py-4 font-sans text-lg font-medium border border-rich-black/20 rounded-pill text-rich-black"
              >
                Log In
              </button>
              <button 
                onClick={() => { setMobileMenuOpen(false); onOpenAuth('signup'); }}
                className="w-full py-4 font-sans text-lg font-medium bg-rich-black text-pure-white rounded-pill"
              >
                Find Your Match
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
