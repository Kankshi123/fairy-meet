import React from 'react';

const marqueeItems = [
  "REAL CONNECTIONS",
  "MEANINGFUL MATCHES",
  "AUTHENTIC PEOPLE",
  "BETTER CONVERSATIONS",
  "SOMETHING REAL"
];

export default function Marquee() {
  return (
    <section className="py-6 bg-off-white border-y border-vibrant-pink/20 overflow-hidden flex items-center">
      <div className="flex whitespace-nowrap animate-marquee items-center w-max">
        <div className="flex items-center gap-12 shrink-0 pr-12">
          {marqueeItems.map((item, idx) => (
            <React.Fragment key={`first-${idx}`}>
              <span className="font-sans text-sm md:text-base font-semibold tracking-[0.2em] text-rich-black uppercase">
                {item}
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-rich-black/30"></span>
            </React.Fragment>
          ))}
        </div>
        
        {/* Duplicate for infinite loop */}
        <div className="flex items-center gap-12 shrink-0 pr-12" aria-hidden="true">
          {marqueeItems.map((item, idx) => (
            <React.Fragment key={`second-${idx}`}>
              <span className="font-sans text-sm md:text-base font-semibold tracking-[0.2em] text-rich-black uppercase">
                {item}
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-rich-black/30"></span>
            </React.Fragment>
          ))}
        </div>
      </div>
    </section>
  );
}
