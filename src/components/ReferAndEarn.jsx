import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Gift, Copy, CheckCircle2, Users, Wallet, ChevronRight, Share2, Sparkles } from 'lucide-react';

export default function ReferAndEarn({ user }) {
  const [copied, setCopied] = useState(false);
  const referralCode = `FAIRY-${user?.name?.toUpperCase().substring(0, 4) || 'USER'}99`;

  // Mock data based on the plan
  const stats = {
    friendsJoined: 3,
    pendingBonus: 1000,
    earnedBonus: 500
  };

  const referrals = [
    { id: 1, name: 'Rahul M.', status: 'pending', date: 'Oct 12' },
    { id: 2, name: 'Priya S.', status: 'completed', date: 'Oct 10' },
    { id: 3, name: 'Amit K.', status: 'pending', date: 'Oct 09' },
  ];

  const handleCopy = () => {
    navigator.clipboard.writeText(referralCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="h-full flex flex-col p-4 md:p-6 max-w-5xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-rich-black text-pure-white rounded-[32px] p-8 md:p-12 shadow-hover">
        <div className="absolute top-0 right-0 p-8 opacity-10">
          <Gift className="w-48 h-48 text-vibrant-pink" />
        </div>
        <div className="relative z-10 max-w-xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-vibrant-pink/20 text-vibrant-pink rounded-full text-sm font-semibold mb-6">
            <Sparkles className="w-4 h-4" /> Fairy Circle
          </div>
          <h2 className="font-serif text-3xl md:text-5xl mb-4 leading-tight">
            Invite friends, <span className="text-vibrant-pink">Earn ₹500</span>
          </h2>
          <p className="font-sans text-white/70 text-lg mb-8 max-w-md">
            Share your unique code. When your friend completes their first meetup, you get ₹500 in your wallet instantly!
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 items-center">
            <div className="flex items-center justify-between bg-white/10 border border-white/20 rounded-2xl p-2 w-full sm:w-auto">
              <span className="font-sans font-bold text-xl px-4 tracking-widest text-vibrant-pink">
                {referralCode}
              </span>
              <button 
                onClick={handleCopy}
                className="bg-white text-rich-black p-3 rounded-xl hover:bg-vibrant-pink hover:text-white transition-colors"
              >
                {copied ? <CheckCircle2 className="w-5 h-5 text-green-500" /> : <Copy className="w-5 h-5" />}
              </button>
            </div>
            <button className="w-full sm:w-auto flex items-center justify-center gap-2 bg-vibrant-pink text-white px-8 py-4 rounded-2xl font-sans font-semibold hover:-translate-y-1 transition-transform">
              <Share2 className="w-5 h-5" /> Share Link
            </button>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-2xl p-6 border border-rich-black/10 flex flex-col justify-center shadow-sm">
          <div className="flex items-center gap-3 mb-2 text-rich-black/60">
            <Users className="w-5 h-5" />
            <span className="font-sans text-sm font-medium">Friends Joined</span>
          </div>
          <span className="font-serif text-3xl text-rich-black">{stats.friendsJoined}</span>
        </div>
        
        <div className="bg-white rounded-2xl p-6 border border-rich-black/10 flex flex-col justify-center shadow-sm relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-yellow-50 to-transparent pointer-events-none" />
          <div className="flex items-center gap-3 mb-2 text-rich-black/60 relative z-10">
            <Clock className="w-5 h-5 text-yellow-500" />
            <span className="font-sans text-sm font-medium">Pending Bonus</span>
          </div>
          <span className="font-serif text-3xl text-rich-black relative z-10">₹{stats.pendingBonus}</span>
        </div>

        <div className="bg-vibrant-pink/5 rounded-2xl p-6 border border-vibrant-pink/20 flex flex-col justify-center shadow-sm relative overflow-hidden">
           <div className="absolute inset-0 bg-gradient-to-r from-vibrant-pink/10 to-transparent pointer-events-none" />
          <div className="flex items-center gap-3 mb-2 text-vibrant-pink">
            <Wallet className="w-5 h-5" />
            <span className="font-sans text-sm font-medium">Total Earned</span>
          </div>
          <span className="font-serif text-3xl text-vibrant-pink font-bold relative z-10">₹{stats.earnedBonus}</span>
        </div>
      </div>

      {/* Referrals List */}
      <div className="bg-white border border-rich-black/10 rounded-3xl overflow-hidden shadow-sm">
        <div className="p-6 border-b border-rich-black/10">
          <h3 className="font-serif text-xl text-rich-black">Your Referrals</h3>
        </div>
        
        <div className="divide-y divide-rich-black/5">
          {referrals.map(ref => (
            <div key={ref.id} className="p-4 sm:p-6 flex items-center justify-between hover:bg-off-white transition-colors">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-rich-black/5 flex items-center justify-center text-rich-black font-serif font-bold">
                  {ref.name.charAt(0)}
                </div>
                <div>
                  <p className="font-sans font-semibold text-rich-black">{ref.name}</p>
                  <p className="font-sans text-xs text-rich-black/50">Joined {ref.date}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                {ref.status === 'completed' ? (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-green-50 text-green-600 rounded-full text-xs font-semibold">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Earned ₹500
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-yellow-50 text-yellow-600 rounded-full text-xs font-semibold">
                    <Clock className="w-3.5 h-3.5" /> Pending Meetup
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
        
        {referrals.length === 0 && (
          <div className="p-12 text-center flex flex-col items-center">
            <Gift className="w-12 h-12 text-rich-black/20 mb-3" />
            <p className="font-sans font-medium text-rich-black/50">No friends referred yet</p>
          </div>
        )}
      </div>

    </div>
  );
}

// Simple clock icon for pending status
function Clock(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  )
}
