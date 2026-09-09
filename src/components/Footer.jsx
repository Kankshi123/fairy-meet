import React from 'react';

export default function Footer() {
  return (
    <footer className="bg-off-white text-rich-black pt-24 pb-12 border-t border-vibrant-pink/20">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          
          <div className="space-y-6">
            <h3 className="font-serif text-3xl tracking-tight text-rich-black font-bold">FAIRY MEET</h3>
            <p className="font-sans text-sm text-rich-black/70 max-w-xs leading-relaxed text-balance">
              A premium modern dating platform designed around meaningful connections and genuine relationships.
            </p>
          </div>
          
          <div>
            <h4 className="font-sans text-sm tracking-[0.15em] uppercase font-semibold mb-6">Navigation</h4>
            <ul className="space-y-4 font-sans text-sm text-rich-black/70">
              <li><a href="#discover" className="hover:text-vibrant-pink transition-colors">Discover</a></li>
              <li><a href="#how-it-works" className="hover:text-vibrant-pink transition-colors">How It Works</a></li>
              <li><a href="#stories" className="hover:text-vibrant-pink transition-colors">Stories</a></li>
              <li><a href="#safety" className="hover:text-vibrant-pink transition-colors">Safety</a></li>
              <li><a href="#" className="hover:text-vibrant-pink transition-colors">About</a></li>
              <li><a href="#" className="hover:text-vibrant-pink transition-colors">Contact</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-sans text-sm tracking-[0.15em] uppercase font-semibold mb-6">Legal</h4>
            <ul className="space-y-4 font-sans text-sm text-rich-black/70">
              <li><a href="#" className="hover:text-vibrant-pink transition-colors">Privacy</a></li>
              <li><a href="#" className="hover:text-vibrant-pink transition-colors">Terms</a></li>
              <li><a href="#" className="hover:text-vibrant-pink transition-colors">Community Guidelines</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-sans text-sm tracking-[0.15em] uppercase font-semibold mb-6">Social</h4>
            <ul className="space-y-4 font-sans text-sm text-rich-black/70">
              <li><a href="#" className="hover:text-vibrant-pink transition-colors">Instagram</a></li>
              <li><a href="#" className="hover:text-vibrant-pink transition-colors">TikTok</a></li>
              <li><a href="#" className="hover:text-vibrant-pink transition-colors">X</a></li>
            </ul>
          </div>

        </div>
        
        <div className="border-t border-vibrant-pink/20 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="font-sans text-xs text-rich-black/50">© 2026 Fairy Meet. Made for meaningful connections.</p>
        </div>
      </div>
    </footer>
  );
}
