import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, MessageCircle, Phone, Search, Bell, Settings, LogOut, LayoutGrid, Layers, X as XIcon, Calendar, ChevronLeft, RefreshCw, User, Inbox, Users, Star, ShieldCheck, CheckCircle2, ChevronRight, Clock, MapPin, Coffee, Wallet, Compass, LayoutDashboard, Bookmark, Gift } from 'lucide-react';

import ProfilePopup from './ProfilePopup';
import MatchModal from './MatchModal';
import MyProfilePhotoModal from './MyProfilePhotoModal';
import { useAppContext } from '../context/AppContext';
import ReferAndEarn from './ReferAndEarn';
import ChatSubscriptionModal from './ChatSubscriptionModal';
import PlanMeetupModal from './PlanMeetupModal';
import ChatPopupModal from './ChatPopupModal';

export const companions = [
  { id: 1, name: "Maya", gender: "Female", age: 27, status: "Online", image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=600&auto=format&fit=crop&q=80", tags: ["Creative", "Travel"], rate: "₹5/min", city: "New Delhi", pincode: "110001" },
  { id: 2, name: "Arjun", gender: "Male", age: 29, status: "Busy", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&auto=format&fit=crop&q=80", tags: ["Music", "Outdoors"], rate: "₹5/min", city: "Mumbai", pincode: "400001" },
  { id: 3, name: "Sarah", gender: "Female", age: 26, status: "Online", image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=600&auto=format&fit=crop&q=80", tags: ["Art", "Reading"], rate: "₹5/min", city: "Bangalore", pincode: "560001" },
  { id: 4, name: "Rohan", gender: "Male", age: 31, status: "Offline", image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=600&auto=format&fit=crop&q=80", tags: ["Fitness", "Tech"], rate: "₹5/min", city: "New Delhi", pincode: "110001" },
  { id: 5, name: "Priya", gender: "Female", age: 25, status: "Online", image: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=600&auto=format&fit=crop&q=80", tags: ["Photography", "Cafe"], rate: "₹5/min", city: "Mumbai", pincode: "400001" },
  { id: 6, name: "Vikram", gender: "Male", age: 28, status: "Online", image: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=600&auto=format&fit=crop&q=80", tags: ["Cooking", "Sports"], rate: "₹5/min", city: "Bangalore", pincode: "560001" },
  { id: 7, name: "Aisha", gender: "Female", age: 24, status: "Busy", image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=600&auto=format&fit=crop&q=80", tags: ["Fashion", "Movies"], rate: "₹5/min", city: "New Delhi", pincode: "110001" },
  { id: 8, name: "Kabir", gender: "Male", age: 30, status: "Offline", image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=600&auto=format&fit=crop&q=80", tags: ["Business", "Travel"], rate: "₹5/min", city: "Mumbai", pincode: "400001" },
  { id: 9, name: "Neha", gender: "Female", age: 28, status: "Online", image: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=600&auto=format&fit=crop&q=80", tags: ["Yoga", "Nature"], rate: "₹5/min", city: "Bangalore", pincode: "560001" },
  { id: 10, name: "Aditya", gender: "Male", age: 27, status: "Online", image: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=600&auto=format&fit=crop&q=80", tags: ["Gaming", "Coding"], rate: "₹5/min", city: "New Delhi", pincode: "110001" },
  { id: 11, name: "Kriti", gender: "Female", age: 23, status: "Busy", image: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=600&auto=format&fit=crop&q=80", tags: ["Dance", "Music"], rate: "₹5/min", city: "Mumbai", pincode: "400001" },
  { id: 12, name: "Karan", gender: "Male", age: 29, status: "Offline", image: "https://images.unsplash.com/photo-1488161628813-04466f872be2?w=600&auto=format&fit=crop&q=80", tags: ["Fitness", "Foodie"], rate: "₹5/min", city: "Bangalore", pincode: "560001" },
  { id: 13, name: "Ananya", gender: "Female", age: 26, status: "Online", image: "https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=600&auto=format&fit=crop&q=80", tags: ["Baking", "Pets"], rate: "₹5/min", city: "New Delhi", pincode: "110001" },
  { id: 14, name: "Siddharth", gender: "Male", age: 32, status: "Online", image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=600&auto=format&fit=crop&q=80", tags: ["Books", "Writing"], rate: "₹5/min", city: "Mumbai", pincode: "400001" },
  { id: 15, name: "Meera", gender: "Female", age: 29, status: "Online", image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=600&auto=format&fit=crop&q=80", tags: ["Art", "History"], rate: "₹5/min", city: "Bangalore", pincode: "560001" },
  { id: 16, name: "Rahul", gender: "Male", age: 26, status: "Busy", image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=600&auto=format&fit=crop&q=80", tags: ["Photography", "Travel"], rate: "₹5/min", city: "New Delhi", pincode: "110001" },
  { id: 17, name: "Simran", gender: "Female", age: 25, status: "Online", image: "https://images.unsplash.com/photo-1517365830460-955ce3ccd263?w=600&auto=format&fit=crop&q=80", tags: ["Music", "Concerts"], rate: "₹5/min", city: "Mumbai", pincode: "400001" },
  { id: 18, name: "Dev", gender: "Male", age: 28, status: "Online", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&auto=format&fit=crop&q=80", tags: ["Movies", "Tech"], rate: "₹5/min", city: "Bangalore", pincode: "560001" },
  { id: 19, name: "Tanya", gender: "Female", age: 26, status: "Online", image: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=600&auto=format&fit=crop&q=80", tags: ["Design", "Art"], rate: "₹5/min", city: "New Delhi", pincode: "110001" },
  { id: 20, name: "Aryan", gender: "Male", age: 29, status: "Busy", image: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=600&auto=format&fit=crop&q=80", tags: ["Sports", "Gaming"], rate: "₹5/min", city: "Mumbai", pincode: "400001" },
  { id: 21, name: "Ishita", gender: "Female", age: 24, status: "Online", image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=600&auto=format&fit=crop&q=80", tags: ["Reading", "Coffee"], rate: "₹5/min", city: "Bangalore", pincode: "560001" },
  { id: 22, name: "Kunal", gender: "Male", age: 31, status: "Offline", image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=600&auto=format&fit=crop&q=80", tags: ["Travel", "Finance"], rate: "₹5/min", city: "New Delhi", pincode: "110001" },
  { id: 23, name: "Pooja", gender: "Female", age: 27, status: "Online", image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=600&auto=format&fit=crop&q=80", tags: ["Yoga", "Cooking"], rate: "₹5/min", city: "Mumbai", pincode: "400001" },
  { id: 24, name: "Varun", gender: "Male", age: 28, status: "Online", image: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=600&auto=format&fit=crop&q=80", tags: ["Music", "Movies"], rate: "₹5/min", city: "Bangalore", pincode: "560001" },
  { id: 25, name: "Riya", gender: "Female", age: 25, status: "Busy", image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=600&auto=format&fit=crop&q=80", tags: ["Fashion", "Dance"], rate: "₹5/min", city: "New Delhi", pincode: "110001" },
  { id: 26, name: "Akash", gender: "Male", age: 27, status: "Online", image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=600&auto=format&fit=crop&q=80", tags: ["Fitness", "Tech"], rate: "₹5/min", city: "Mumbai", pincode: "400001" },
  { id: 27, name: "Shruti", gender: "Female", age: 28, status: "Online", image: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=600&auto=format&fit=crop&q=80", tags: ["Nature", "Pets"], rate: "₹5/min", city: "Bangalore", pincode: "560001" },
  { id: 28, name: "Nikhil", gender: "Male", age: 30, status: "Busy", image: "https://images.unsplash.com/photo-1488161628813-04466f872be2?w=600&auto=format&fit=crop&q=80", tags: ["Foodie", "Travel"], rate: "₹5/min", city: "New Delhi", pincode: "110001" },
  { id: 29, name: "Sneha", gender: "Female", age: 26, status: "Online", image: "https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=600&auto=format&fit=crop&q=80", tags: ["Art", "Reading"], rate: "₹5/min", city: "Mumbai", pincode: "400001" },
  { id: 30, name: "Yash", gender: "Male", age: 29, status: "Online", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&auto=format&fit=crop&q=80", tags: ["Photography", "Music"], rate: "₹5/min", city: "Bangalore", pincode: "560001" }
];

function CompanionFeedCard({ comp, onInitiateContact, onViewProfile }) {
  return (
    <div className="bg-white rounded-[24px] overflow-hidden shadow-sm border border-rich-black/10 flex flex-col h-full">
      <div className="relative aspect-[4/5] w-full cursor-pointer group" onClick={() => onViewProfile(comp)}>
        <img src={comp.image} alt={comp.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
        <div className="absolute inset-0 bg-gradient-to-t from-rich-black/80 via-transparent to-transparent pointer-events-none" />
        <div className="absolute bottom-6 left-6 right-6 text-white pointer-events-none">
          <h2 className="font-serif text-3xl font-medium drop-shadow-sm">{comp.name}, {comp.age}</h2>
          <p className="text-white/80 font-medium drop-shadow-sm flex items-center gap-1"><MapPin className="w-4 h-4" /> {comp.city}</p>
        </div>
      </div>
      <div className="p-6">
        <div className="flex flex-wrap gap-2 mb-6">
          {comp.tags.map(tag => (
            <span key={tag} className="px-3 py-1 bg-off-white text-rich-black rounded-full text-xs font-semibold">{tag}</span>
          ))}
        </div>
        <div className="flex gap-4">
          <button 
            onClick={() => onViewProfile(comp)}
            className="flex-1 py-3 px-4 bg-off-white text-rich-black font-semibold rounded-xl hover:bg-rich-black/5 transition-colors"
          >
            View Profile
          </button>
          <button 
            onClick={() => onInitiateContact(comp)}
            className="flex-1 py-3 px-4 bg-vibrant-pink text-white font-semibold rounded-xl shadow-md shadow-vibrant-pink/20 hover:shadow-lg hover:shadow-vibrant-pink/30 hover:-translate-y-0.5 transition-all"
          >
            Send Request
          </button>
        </div>
      </div>
    </div>
  );
}
const TABS = [
  { id: 'overview', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'discover', label: 'Discover', icon: Compass },
  { id: 'favorites', label: 'Favorites', icon: Bookmark },
  { id: 'requests', label: 'My Requests', icon: Inbox },
  { id: 'connections', label: 'Connections', icon: Users },
  { id: 'messages', label: 'Messages', icon: MessageCircle },
  { id: 'meetups', label: 'My Meetups', icon: Calendar },
  { id: 'notifications', label: 'Notifications', icon: Bell },
  { id: 'referral', label: 'Refer & Earn', icon: Gift },
  { id: 'reviews', label: 'Reviews', icon: Star },
  { id: 'settings', label: 'Settings', icon: Settings },
];

export default function SeekerDashboard({ user, onUpdateUser, onLogout, onSwitchMode, onInitiateContact, onOpenWallet, onOpenPolicies, onFindMatch, onGoToLanding }) {
  const [activeTab, setActiveTab] = useState('overview');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [chatComp, setChatComp] = useState(null);
  const [showChatPaywall, setShowChatPaywall] = useState(false);
  const [showChatPopup, setShowChatPopup] = useState(false);
  const [showMyProfilePhoto, setShowMyProfilePhoto] = useState(false);

  const { chatSubscription } = useAppContext();
  const isFemale = user?.gender === 'Female';
  const isChatSubscribed = isFemale || (chatSubscription && new Date(chatSubscription.expiresAt) > new Date());

  const handleNavigateToMessages = (comp = null) => {
    if (comp) {
      if (!isChatSubscribed) {
        setChatComp(comp);
        setShowChatPaywall(true);
      } else {
        setChatComp(comp);
        setShowChatPopup(true);
      }
    } else {
      setActiveTab('messages');
    }
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'overview': return <OverviewTab user={user} setActiveTab={setActiveTab} />;
      case 'discover': return <DiscoverTab user={user} setActiveTab={setActiveTab} setChatComp={setChatComp} onNavigateToMessages={handleNavigateToMessages} onInitiateContact={onInitiateContact} onFindMatch={onFindMatch} />;
      case 'favorites': return <FavoritesTab setActiveTab={setActiveTab} />;
      case 'requests': return <RequestsTab />;
      case 'connections': return <ConnectionsTab setActiveTab={setActiveTab} />;
      case 'messages': return <MessagesTab onNavigateToMessages={handleNavigateToMessages} />;
      case 'meetups': return <MeetupsTab onNavigateToMessages={handleNavigateToMessages} />;
      case 'notifications': return <NotificationsTab />;
      case 'profile': return <ProfileTab user={user} />;
      case 'referral': return <ReferAndEarn user={user} />;
      case 'verification': return <VerificationTab />;
      case 'reviews': return <ReviewsTab />;
      case 'settings': return <SettingsTab user={user} onUpdateUser={onUpdateUser} onLogout={onLogout} onSwitchMode={onSwitchMode} onOpenPolicies={onOpenPolicies} />;
      default: return <OverviewTab user={user} setActiveTab={setActiveTab} />;
    }
  };

  return (
    <div className="min-h-screen bg-[#FDF8F5] flex font-sans text-rich-black">
      {/* DESKTOP SIDEBAR */}
      <aside className="hidden md:flex flex-col w-64 bg-white border-r border-rich-black/10 sticky top-0 h-screen">
        <div className="p-6 border-b border-rich-black/10 flex justify-between items-center">
          <div onClick={onGoToLanding} className="cursor-pointer group">
            <h2 className="font-serif text-2xl text-rich-black tracking-tight group-hover:text-vibrant-pink transition-colors">FAIRY MEET</h2>
            <p className="text-[10px] font-semibold text-vibrant-pink uppercase tracking-widest mt-1">Seeker Mode</p>
          </div>
        </div>
        
        <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-1 custom-scrollbar">
          {TABS.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => tab.id === 'messages' ? handleNavigateToMessages() : setActiveTab(tab.id)}
                className={`w-full flex items-center text-left select-none gap-3 px-3 py-2.5 rounded-xl transition-all text-sm font-medium cursor-pointer ${
                  isActive 
                    ? 'bg-vibrant-pink/10 text-vibrant-pink' 
                    : 'text-rich-black/60 hover:bg-off-white hover:text-rich-black'
                }`}
              >
                <Icon className={`w-5 h-5 ${isActive ? 'text-vibrant-pink' : 'text-rich-black/40'}`} />
                {tab.label}
              </button>
            );
          })}
        </nav>
        
        <div className="p-4 border-t border-rich-black/10 space-y-2">
          <button onClick={onSwitchMode} className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-rich-black bg-off-white hover:bg-rich-black/5 transition-colors">
            <RefreshCw className="w-5 h-5 text-rich-black/50" /> Switch to Companion
          </button>
        </div>
      </aside>

      {/* MOBILE NAV */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-rich-black/10 z-50 flex justify-around items-center h-16 px-4">
        {TABS.slice(0, 4).map(tab => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`flex flex-col items-center justify-center w-16 h-full ${isActive ? 'text-vibrant-pink' : 'text-rich-black/40'}`}>
              <Icon className="w-5 h-5 mb-1" />
              <span className="text-[10px] font-medium">{tab.label.split(' ')[0]}</span>
            </button>
          );
        })}
        <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="flex flex-col items-center justify-center w-16 h-full text-rich-black/40">
          <Layers className="w-5 h-5 mb-1" />
          <span className="text-[10px] font-medium">More</span>
        </button>
      </div>

      {/* MOBILE MENU OVERLAY */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: '100%' }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: '100%' }}
            className="md:hidden fixed inset-0 bg-white z-40 overflow-y-auto pb-20 pt-6 px-4"
          >
            <div className="flex justify-between items-center mb-8">
              <div onClick={onGoToLanding} className="cursor-pointer group">
                <h2 className="font-serif text-2xl group-hover:text-vibrant-pink transition-colors">FAIRY MEET</h2>
                <p className="text-[10px] font-semibold text-vibrant-pink uppercase tracking-widest mt-1">Seeker Mode</p>
              </div>
              <button onClick={() => setIsMobileMenuOpen(false)} className="p-2 bg-off-white rounded-full"><XIcon className="w-5 h-5"/></button>
            </div>
            <div className="space-y-2">
              {TABS.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => { setActiveTab(tab.id); setIsMobileMenuOpen(false); }}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all text-sm font-medium ${
                      activeTab === tab.id ? 'bg-vibrant-pink/10 text-vibrant-pink' : 'text-rich-black/60'
                    }`}
                  >
                    <Icon className="w-5 h-5" /> {tab.label}
                  </button>
                );
              })}
            </div>
            <div className="mt-8 pt-8 border-t border-rich-black/10 space-y-4">
              <button onClick={onSwitchMode} className="w-full flex items-center gap-3 px-3 py-3 rounded-xl bg-off-white font-medium">
                <RefreshCw className="w-5 h-5 text-rich-black/50" /> Switch to Companion
              </button>
              <button onClick={onLogout} className="w-full flex items-center gap-3 px-3 py-3 rounded-xl bg-red-50 text-red-600 font-medium">
                <LogOut className="w-5 h-5" /> Log Out
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* MAIN CONTENT AREA */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden">
        <header className="h-16 md:h-20 bg-white/80 backdrop-blur-md border-b border-rich-black/10 flex items-center justify-between px-6 shrink-0">
          <h1 className="font-serif text-xl md:text-2xl">
            {TABS.find(t => t.id === activeTab)?.label}
          </h1>
          <div className="flex items-center gap-4">
            <div onClick={() => setShowMyProfilePhoto(true)} className="w-10 h-10 rounded-full bg-vibrant-pink overflow-hidden border-2 border-white shadow-sm flex items-center justify-center text-white font-serif text-lg cursor-pointer hover:opacity-90 transition-opacity">
               {user?.photo ? <img src={user.photo} alt="Profile" className="w-full h-full object-cover" /> : user?.name?.charAt(0) || 'S'}
            </div>
          </div>
        </header>
        <div className="flex-1 overflow-y-auto p-4 md:p-8 pb-24 md:pb-8 custom-scrollbar">
          <div className="max-w-5xl mx-auto">
            {renderContent()}
          </div>
        </div>
      </main>

      {/* Chat Subscription Paywall */}
      <AnimatePresence>
        {showChatPaywall && (
          <ChatSubscriptionModal
            isOpen={showChatPaywall}
            onClose={() => setShowChatPaywall(false)}
            onSubscribed={() => {
              setShowChatPaywall(false);
              setShowChatPopup(true);
            }}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showMyProfilePhoto && <MyProfilePhotoModal user={user} onClose={() => setShowMyProfilePhoto(false)} />}
      </AnimatePresence>

      {/* Chat Popup */}
      <AnimatePresence>
        {showChatPopup && chatComp && (
          <ChatPopupModal
            companion={chatComp}
            user={user}
            onClose={() => {
              setShowChatPopup(false);
              setChatComp(null);
            }}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

// ==========================================
// TAB COMPONENTS
// ==========================================

function OverviewTab({ user, setActiveTab }) {
  return (
    <div className="animate-in fade-in space-y-8">
      <div className="flex items-center gap-2 mb-2">
        <h2 className="font-serif text-3xl">Good morning, <span className="text-vibrant-pink">{user?.name?.split(' ')[0] || 'Seeker'}</span> 👋</h2>
      </div>
      <p className="text-rich-black/60 text-lg mb-8">Find someone who matches your vibe.</p>

      {/* Stats Grid */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: 'New Matches', value: '12', highlight: true, tab: 'discover' },
          { label: 'Requests', value: '04', tab: 'requests' },
          { label: 'Connections', value: '08', tab: 'connections' }
        ].map(stat => (
          <button key={stat.label} onClick={() => setActiveTab(stat.tab)} className={`p-6 rounded-[24px] border flex flex-col text-left transition-transform hover:scale-[1.02] ${stat.highlight ? 'bg-vibrant-pink text-white border-transparent' : 'bg-white border-rich-black/10 shadow-sm hover:shadow-md'}`}>
            <p className={`text-sm font-medium mb-2 ${stat.highlight ? 'text-white/80' : 'text-rich-black/60'}`}>{stat.label}</p>
            <p className="font-serif text-3xl">{stat.value}</p>
          </button>
        ))}
      </div>

      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-serif text-2xl">Recommended for You</h3>
          <button onClick={() => setActiveTab('discover')} className="text-sm font-semibold text-vibrant-pink hover:underline">View More</button>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {companions.slice(0, 4).map(comp => (
             <div key={comp.id} className="bg-white rounded-[24px] overflow-hidden shadow-sm border border-rich-black/10 flex flex-col">
               <img src={comp.image} alt={comp.name} className="w-full aspect-square object-cover" />
               <div className="p-4 text-center">
                 <h4 className="font-bold">{comp.name}</h4>
                 <p className="text-sm text-rich-black/60">{comp.age} &bull; 4.8★</p>
                 <button onClick={() => setActiveTab('discover')} className="w-full mt-3 py-2 text-xs font-semibold uppercase tracking-wider bg-off-white text-rich-black rounded-full hover:bg-vibrant-pink hover:text-white transition-colors">View Profile</button>
               </div>
             </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function DiscoverTab({ user, setActiveTab, setChatComp, onNavigateToMessages, onInitiateContact, onFindMatch }) {
  const [selectedComp, setSelectedComp] = useState(null);
  
  const [searchPin, setSearchPin] = useState('');
  const [searchCity, setSearchCity] = useState('');
  const [isSearchingLocation, setIsSearchingLocation] = useState(false);
  const [activeFilter, setActiveFilter] = useState('All');

  const QUICK_FILTERS = ['All', 'Coffee Date', 'Gaming', 'Movie', 'Travel', 'Top Rated'];

  const handleLocationSearch = async (e) => {
    const value = e.target.value.replace(/\D/g, '');
    if (value.length <= 6) setSearchPin(value);
    if (value.length === 6) {
      setIsSearchingLocation(true);
      try {
        const response = await fetch(`https://api.postalpincode.in/pincode/${value}`);
        const data = await response.json();
        if (data && data[0] && data[0].Status === 'Success') {
          setSearchCity(data[0].PostOffice[0].District);
        } else {
          setSearchCity('');
        }
      } catch (err) {
        console.error(err);
      } finally {
        setIsSearchingLocation(false);
      }
    } else {
      setSearchCity('');
    }
  };

  const initialCompanions = companions.filter(comp => {
    if (user?.gender === 'Female') return comp.gender === 'Male';
    if (user?.gender === 'Male') return comp.gender === 'Female';
    return true; 
  });

  const [deck, setDeck] = useState(initialCompanions);

  const filteredDeck = deck.filter(comp => {
    // City filter
    if (searchCity && (!comp.city || comp.city.toLowerCase() !== searchCity.toLowerCase())) {
      return false;
    }
    // Quick tags filter
    if (activeFilter !== 'All' && activeFilter !== 'Top Rated') {
      const match = comp.tags.some(tag => tag.toLowerCase().includes(activeFilter.toLowerCase()) || activeFilter.toLowerCase().includes(tag.toLowerCase()));
      if (!match) return false;
    }
    return true;
  });

  return (
    <div className="animate-in fade-in flex flex-col h-full">
      <div className="mb-6 flex flex-col gap-6">
        <div className="flex flex-col sm:flex-row gap-4 flex-1 items-center justify-between">
           <button onClick={() => { if(onFindMatch) onFindMatch(); }} className="bg-vibrant-pink text-white text-sm font-bold px-6 py-3 rounded-full shadow-sm hover:shadow-md transition-shadow shrink-0 w-full sm:w-auto">Find Your Match</button>
           <div className="relative w-full sm:max-w-sm">
              <input
                type="text"
                placeholder="Search by PIN Code (e.g. 110001)"
                value={searchPin}
                onChange={handleLocationSearch}
                className="w-full pl-10 pr-4 py-3 bg-white border border-rich-black/10 rounded-full text-sm outline-none focus:border-vibrant-pink shadow-sm"
              />
              <Search className="w-4 h-4 text-rich-black/40 absolute left-4 top-1/2 -translate-y-1/2" />
              {searchCity && <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] font-bold bg-green-100 text-green-700 px-2 py-1 rounded-full">{searchCity}</span>}
           </div>
        </div>
        
        {/* Quick Filters */}
        <div className="flex overflow-x-auto gap-2 pb-2 custom-scrollbar hide-scrollbar-on-mobile">
          {QUICK_FILTERS.map(filter => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`whitespace-nowrap px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                activeFilter === filter 
                  ? 'bg-rich-black text-white' 
                  : 'bg-white border border-rich-black/10 text-rich-black/60 hover:border-rich-black/30 hover:text-rich-black'
              }`}
            >
              {filter}
            </button>
          ))}
        </div>
      </div>

      <div className="flex-grow w-full pb-10">
        {filteredDeck.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 pb-8">
            {filteredDeck.map((comp) => (
              <CompanionFeedCard 
                key={comp.id} 
                comp={comp} 
                onInitiateContact={() => {
                  const favs = JSON.parse(localStorage.getItem('fairymeet_favorites') || '[]');
                  if (!favs.find(f => f.id === comp.id)) {
                    favs.push(comp);
                    localStorage.setItem('fairymeet_favorites', JSON.stringify(favs));
                  }
                  onInitiateContact(comp);
                }} 
                onViewProfile={setSelectedComp} 
              />
            ))}
          </div>
        ) : (
          <div className="text-center p-12 bg-white rounded-[32px] shadow-sm border border-rich-black/5 w-full max-w-lg mx-auto">
            <Heart className="w-16 h-16 text-vibrant-pink/30 mx-auto mb-4" />
            <h3 className="font-serif text-2xl font-medium text-rich-black mb-2">No companions found</h3>
            <p className="text-rich-black/60">Try changing your location or removing filters.</p>
          </div>
        )}
      </div>

      <AnimatePresence>
        {selectedComp && <ProfilePopup comp={selectedComp} onClose={() => setSelectedComp(null)} onAction={(type, comp) => { if (type === 'chat') { onNavigateToMessages(comp); } setSelectedComp(null); }} user={user} />}
      </AnimatePresence>
    </div>
  );
}

function FavoritesTab() {
  const [favorites, setFavorites] = useState(() => JSON.parse(localStorage.getItem('fairymeet_favorites') || '[]'));

  const removeFav = (id) => {
    const updated = favorites.filter(f => f.id !== id);
    setFavorites(updated);
    localStorage.setItem('fairymeet_favorites', JSON.stringify(updated));
  };

  return (
    <div className="animate-in fade-in space-y-6">
      <h2 className="font-serif text-3xl">My Favorites</h2>
      {favorites.length === 0 ? (
        <div className="bg-white rounded-[24px] border border-rich-black/10 p-12 text-center text-rich-black/50">
          <Heart className="w-12 h-12 mx-auto mb-4 opacity-20" />
          <p>No favorites yet. Swipe right on profiles to add them here.</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {favorites.map(comp => (
            <div key={comp.id} className="bg-white rounded-2xl overflow-hidden shadow-sm border border-rich-black/10 relative">
              <button onClick={() => removeFav(comp.id)} className="absolute top-2 right-2 p-1.5 bg-white/80 rounded-full text-vibrant-pink hover:bg-vibrant-pink hover:text-white transition-colors z-10"><XIcon className="w-4 h-4"/></button>
              <img src={comp.image} alt={comp.name} className="w-full aspect-square object-cover" />
              <div className="p-3 text-center">
                <p className="font-bold">❤️ {comp.name}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

function RequestsTab() {
  const [filter, setFilter] = useState('Pending');
  const [requests, setRequests] = useState([companions[0]]);
  const [selectedComp, setSelectedComp] = useState(null);
  
  const handleCancel = (id) => {
    setRequests(requests.filter(r => r.id !== id));
  };

  return (
    <div className="animate-in fade-in space-y-6">
      <h2 className="font-serif text-3xl">My Requests</h2>
      <div className="flex gap-2 overflow-x-auto pb-2 custom-scrollbar">
        {['Pending', 'Accepted', 'Declined', 'Cancelled'].map(f => (
          <button key={f} onClick={() => setFilter(f)} className={`px-5 py-2 rounded-full text-sm font-semibold whitespace-nowrap transition-colors ${filter === f ? 'bg-rich-black text-white' : 'bg-white border border-rich-black/10 text-rich-black/60 hover:bg-off-white'}`}>{f}</button>
        ))}
      </div>
      
      {requests.length === 0 ? (
        <div className="bg-white rounded-[24px] border border-rich-black/10 p-12 text-center text-rich-black/50">
          <p>No {filter.toLowerCase()} requests.</p>
        </div>
      ) : (
        requests.map(req => (
          <div key={req.id} className="bg-white rounded-[24px] border border-rich-black/10 p-5 shadow-sm flex flex-col sm:flex-row gap-4 items-center">
             <img src={req.image} alt="" className="w-20 h-20 rounded-2xl object-cover shrink-0" />
             <div className="flex-1 w-full text-center sm:text-left">
               <h3 className="font-serif text-xl">{req.name}</h3>
               <p className="text-sm text-rich-black/60">Coffee & Conversation</p>
               <p className="text-xs mt-2 font-medium">Status: <span className="text-yellow-600">● Pending</span></p>
             </div>
             <div className="flex gap-2 w-full sm:w-auto">
               <button onClick={() => setSelectedComp(req)} className="flex-1 px-4 py-2 bg-off-white rounded-xl text-sm font-semibold hover:bg-rich-black/5">View Profile</button>
               <button onClick={() => handleCancel(req.id)} className="flex-1 px-4 py-2 bg-red-50 text-red-600 rounded-xl text-sm font-semibold hover:bg-red-100">Cancel</button>
             </div>
          </div>
        ))
      )}
      
      <AnimatePresence>
        {selectedComp && <ProfilePopup comp={selectedComp} onClose={() => setSelectedComp(null)} onAction={() => setSelectedComp(null)} user={{}} />}
      </AnimatePresence>
    </div>
  )
}

function ConnectionsTab({ setActiveTab }) {
  return (
    <div className="animate-in fade-in space-y-6">
      <h2 className="font-serif text-3xl">My Connections</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white rounded-[24px] p-5 border border-rich-black/10 shadow-sm flex items-center gap-4">
          <img src={companions[1].image} alt="" className="w-16 h-16 rounded-full object-cover shrink-0" />
          <div className="flex-1">
            <p className="font-semibold text-lg">{companions[1].name}</p>
            <p className="text-xs text-green-600 font-bold uppercase tracking-wider">Active Connection</p>
          </div>
          <button onClick={() => setActiveTab('messages')} className="p-3 bg-vibrant-pink/10 text-vibrant-pink rounded-full hover:bg-vibrant-pink hover:text-white transition-colors">
            <MessageCircle className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  )
}

function MessagesTab({ onNavigateToMessages }) {
  const chatList = companions.slice(0, 5);

  return (
    <div className="animate-in fade-in h-[calc(100vh-160px)] flex flex-col">
      <h2 className="font-serif text-3xl mb-6 shrink-0">Messages</h2>
      <div className="flex-1 bg-white rounded-[24px] border border-rich-black/10 overflow-hidden flex flex-col shadow-sm">
        <div className="p-4 border-b border-rich-black/5 bg-off-white/30 shrink-0">
          <input type="text" placeholder="Search past conversations..." className="w-full max-w-md px-5 py-3 rounded-full bg-white border border-rich-black/10 text-[15px] font-sans focus:outline-none focus:border-vibrant-pink focus:ring-1 focus:ring-vibrant-pink shadow-sm transition-all" />
        </div>
        <div className="overflow-y-auto flex-1 p-2 custom-scrollbar">
          {chatList.map(comp => (
            <button
              key={comp.id}
              onClick={() => onNavigateToMessages(comp)}
              className="w-full text-left p-4 flex items-center gap-4 hover:bg-off-white/50 transition-colors border-b border-rich-black/5 last:border-b-0 rounded-2xl mb-1"
            >
              <img src={comp.image} className="w-14 h-14 rounded-full object-cover shrink-0 shadow-sm" alt={comp.name} />
              <div className="overflow-hidden flex-1">
                <div className="flex items-center justify-between mb-1">
                  <p className="font-serif text-lg text-rich-black">{comp.name}</p>
                  <p className="font-sans text-xs text-rich-black/40">2h ago</p>
                </div>
                <p className="text-[14px] font-sans text-rich-black/60 truncate">Same here! When works for you?</p>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

function MeetupsTab({ onNavigateToMessages }) {
  const { meetups } = useAppContext();
  const [selectedMeetup, setSelectedMeetup] = useState(null);
  const [isRescheduling, setIsRescheduling] = useState(false);
  const [newDate, setNewDate] = useState("");
  const [newTime, setNewTime] = useState("");

  const handleReschedule = () => {
    alert(`Meetup rescheduled to ${newDate} at ${newTime}`);
    setIsRescheduling(false);
    setSelectedMeetup(null);
  };

  if (selectedMeetup) {
    return (
      <div className="animate-in fade-in space-y-6 max-w-2xl">
        <button onClick={() => {setSelectedMeetup(null); setIsRescheduling(false);}} className="flex items-center gap-2 text-rich-black/60 hover:text-rich-black transition-colors font-medium text-sm">
          <ChevronLeft className="w-4 h-4" /> Back to Schedule
        </button>
        <div className="bg-white rounded-[24px] p-8 border border-rich-black/10 shadow-sm">
          <div className="flex items-center gap-6 mb-8 pb-8 border-b border-rich-black/10">
             <img src={selectedMeetup.image} alt={selectedMeetup.name} className="w-24 h-24 rounded-full object-cover shadow-sm" />
             <div>
                <h3 className="font-serif text-3xl">{selectedMeetup.intent}</h3>
                <p className="text-xl font-medium text-rich-black/80 mt-1">with {selectedMeetup.name}</p>
             </div>
          </div>
          <div className="grid grid-cols-2 gap-8 mb-8">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-rich-black/50 mb-2">When</p>
              <p className="font-medium flex items-center gap-2"><Clock className="w-5 h-5 text-vibrant-pink" /> {selectedMeetup.date} at {selectedMeetup.time}</p>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-rich-black/50 mb-2">Where</p>
              <p className="font-medium flex items-center gap-2"><MapPin className="w-5 h-5 text-vibrant-pink" /> {selectedMeetup.location}</p>
            </div>
          </div>
          
          {isRescheduling ? (
             <div className="mb-6 p-4 bg-off-white rounded-xl border border-rich-black/10">
               <h4 className="font-semibold mb-3">Reschedule Meetup</h4>
               <div className="flex gap-4 mb-4">
                 <input type="date" value={newDate} onChange={e => setNewDate(e.target.value)} className="px-4 py-2 rounded-lg border border-rich-black/10 w-full" />
                 <input type="time" value={newTime} onChange={e => setNewTime(e.target.value)} className="px-4 py-2 rounded-lg border border-rich-black/10 w-full" />
               </div>
               <div className="flex gap-2">
                 <button onClick={handleReschedule} className="px-4 py-2 bg-vibrant-pink text-white rounded-lg text-sm font-semibold hover:bg-vibrant-pink/90">Confirm</button>
                 <button onClick={() => setIsRescheduling(false)} className="px-4 py-2 bg-gray-200 text-rich-black rounded-lg text-sm font-semibold hover:bg-gray-300">Cancel</button>
               </div>
             </div>
          ) : (
            <div className="flex gap-4">
               <button onClick={() => setIsRescheduling(true)} className="w-full py-3 bg-off-white text-rich-black rounded-xl font-semibold hover:bg-rich-black/5 transition-colors border border-rich-black/10 cursor-pointer">Reschedule</button>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="animate-in fade-in space-y-6">
      <h2 className="font-serif text-3xl">My Meetups</h2>
      <div className="space-y-4">
        <h3 className="font-semibold text-rich-black/60 uppercase tracking-widest text-xs">Upcoming</h3>
        {meetups.length === 0 && <p className="text-sm text-rich-black/50">No upcoming meetups.</p>}
        {meetups.map(meet => (
          <div key={meet.id} className="bg-white rounded-[24px] p-6 border border-rich-black/10 shadow-sm flex flex-col sm:flex-row items-center gap-6">
             <div className="w-16 h-16 bg-vibrant-pink/10 text-vibrant-pink rounded-2xl flex flex-col items-center justify-center shrink-0">
                <span className="text-xs font-bold uppercase">{meet.date.split(' ')[1]}</span>
                <span className="text-xl font-serif leading-none">{meet.date.split(' ')[0]}</span>
             </div>
             <div className="flex-1 text-center sm:text-left">
               <h4 className="font-serif text-xl">{meet.intent} with {meet.name}</h4>
               <p className="text-sm text-rich-black/60 flex items-center justify-center sm:justify-start gap-1.5 mt-1">
                 <Clock className="w-3.5 h-3.5"/> {meet.time} &nbsp;&bull;&nbsp; <MapPin className="w-3.5 h-3.5"/> {meet.location}
               </p>
             </div>
             <div className="flex gap-2 w-full sm:w-auto">
               <button onClick={() => setSelectedMeetup(meet)} className="flex-1 sm:flex-none px-6 py-2 bg-rich-black text-white text-sm font-semibold rounded-full hover:bg-rich-black/80 transition-colors cursor-pointer">View Details</button>
             </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function NotificationsTab() {
  return (
    <div className="animate-in fade-in space-y-6">
      <h2 className="font-serif text-3xl">Notifications</h2>
      <div className="space-y-2">
         <div className="p-4 bg-white rounded-2xl border border-rich-black/10 flex items-start gap-4 shadow-sm">
            <div className="w-10 h-10 bg-green-100 text-green-600 rounded-full flex items-center justify-center shrink-0"><CheckCircle2 className="w-5 h-5"/></div>
            <div>
               <p className="font-semibold">Request Accepted!</p>
               <p className="text-sm text-rich-black/60">Maya accepted your request. You can now chat.</p>
               <p className="text-xs text-rich-black/40 mt-1">2 hours ago</p>
            </div>
         </div>
      </div>
    </div>
  )
}

function ProfileTab({ user, onUpdateUser }) {
  const [activeProfileView, setActiveProfileView] = useState(null);

  // Form states for 'About Account'
  const [formData, setFormData] = useState({
    name: user?.name || '',
    username: user?.username || '',
    email: user?.email || '',
    password: '',
    phone: user?.phone || '',
    aadhaar: user?.aadhaar || '',
    bio: user?.bio || '',
    dateJoined: user?.dateJoined || 'Jan 15, 2026'
  });

  const handleSaveAccount = (e) => {
    e.preventDefault();
    if (onUpdateUser) {
      onUpdateUser(prev => ({ ...prev, ...formData }));
      alert("Account information updated successfully!");
    }
  };

  if (activeProfileView) {
    return (
      <div className="animate-in fade-in slide-in-from-right-4 space-y-6 max-w-2xl">
        <button onClick={() => setActiveProfileView(null)} className="flex items-center gap-2 text-rich-black/60 hover:text-rich-black transition-colors font-medium text-sm">
          <ChevronLeft className="w-4 h-4" /> Back to My Profile
        </button>
        
        <h2 className="font-serif text-3xl">{activeProfileView}</h2>
        
        <div className="bg-white rounded-[24px] border border-rich-black/10 p-6 shadow-sm">
          {activeProfileView === 'About Account' && (
            <form onSubmit={handleSaveAccount} className="space-y-4">
              <p className="text-rich-black/60 mb-6">Manage your personal information.</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-rich-black/60 mb-1">Full Name</label>
                  <input type="text" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full px-4 py-2 rounded-xl border border-rich-black/10 focus:border-vibrant-pink outline-none" required />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-rich-black/60 mb-1">Username</label>
                  <input type="text" value={formData.username} onChange={e => setFormData({...formData, username: e.target.value})} className="w-full px-4 py-2 rounded-xl border border-rich-black/10 focus:border-vibrant-pink outline-none" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-rich-black/60 mb-1">Email Address</label>
                  <input type="email" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} className="w-full px-4 py-2 rounded-xl border border-rich-black/10 focus:border-vibrant-pink outline-none" required />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-rich-black/60 mb-1">Phone Number</label>
                  <input type="tel" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} className="w-full px-4 py-2 rounded-xl border border-rich-black/10 focus:border-vibrant-pink outline-none" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-rich-black/60 mb-1">Password</label>
                  <input type="password" value={formData.password} onChange={e => setFormData({...formData, password: e.target.value})} className="w-full px-4 py-2 rounded-xl border border-rich-black/10 focus:border-vibrant-pink outline-none" placeholder="••••••••" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-rich-black/60 mb-1">Aadhaar Number</label>
                  <input type="text" value={formData.aadhaar} onChange={e => setFormData({...formData, aadhaar: e.target.value})} className="w-full px-4 py-2 rounded-xl border border-rich-black/10 focus:border-vibrant-pink outline-none" placeholder="12-digit Aadhaar Number" maxLength={12} />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-rich-black/60 mb-1">Bio</label>
                <textarea value={formData.bio} onChange={e => setFormData({...formData, bio: e.target.value})} className="w-full px-4 py-2 rounded-xl border border-rich-black/10 focus:border-vibrant-pink outline-none min-h-[100px]" placeholder="Tell us about yourself..." />
              </div>
              
              <div>
                <label className="block text-xs font-semibold text-rich-black/60 mb-1">Date Joined</label>
                <input type="text" value={formData.dateJoined} disabled className="w-full px-4 py-2 rounded-xl border border-rich-black/5 bg-off-white text-rich-black/50 outline-none cursor-not-allowed" />
              </div>

              <button type="submit" className="w-full mt-4 bg-rich-black text-white py-3 rounded-xl font-semibold hover:bg-rich-black/80 transition-colors cursor-pointer">
                Save Changes
              </button>
            </form>
          )}

          {activeProfileView === 'My Bookings' && (
            <div className="space-y-4">
              <p className="text-rich-black/60 mb-4">Your past bookings and meetups.</p>
              {[1, 2, 3].map(i => (
                <div key={i} className="p-4 border border-rich-black/10 rounded-xl flex items-center justify-between">
                  <div>
                    <h4 className="font-semibold">Coffee Meetup</h4>
                    <p className="text-xs text-rich-black/60">Aug 1{i}, 2026 • 2:00 PM</p>
                  </div>
                  <span className="text-xs font-bold text-green-600 bg-green-50 px-2 py-1 rounded-md">Completed</span>
                </div>
              ))}
            </div>
          )}

          {activeProfileView === 'My Chats' && (
            <div className="space-y-4">
              <p className="text-rich-black/60 mb-4">Your past conversations.</p>
              {[1, 2].map(i => (
                <div key={i} className="p-4 border border-rich-black/10 rounded-xl flex items-center gap-4">
                  <div className="w-12 h-12 bg-gray-200 rounded-full flex-shrink-0"></div>
                  <div className="flex-1">
                    <h4 className="font-semibold">Companion User {i}</h4>
                    <p className="text-xs text-rich-black/60 truncate">Thanks for the great time yesterday!</p>
                  </div>
                  <span className="text-xs text-rich-black/40">2d ago</span>
                </div>
              ))}
            </div>
          )}

          {activeProfileView === 'My Transactions' && (
            <div className="space-y-4">
              <p className="text-rich-black/60 mb-4">Your past transactions.</p>
              {[1, 2, 3].map(i => (
                <div key={i} className="p-4 border border-rich-black/10 rounded-xl flex items-center justify-between">
                  <div>
                    <h4 className="font-semibold">Wallet Top-up</h4>
                    <p className="text-xs text-rich-black/60">Aug 1{i}, 2026</p>
                  </div>
                  <span className="text-sm font-bold text-green-600">+₹500</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="animate-in fade-in space-y-6 max-w-2xl">
      <h2 className="font-serif text-3xl">My Profile</h2>
      
      <div className="bg-white rounded-[24px] border border-rich-black/10 overflow-hidden flex flex-col">
        <button onClick={() => setActiveProfileView("My Bookings")} type="button" className="w-full p-5 border-b border-rich-black/5 font-semibold flex justify-between items-center cursor-pointer hover:bg-off-white transition-colors text-left">
          My Bookings <ChevronRight className="w-5 h-5 text-rich-black/40"/>
        </button>
        <button onClick={() => setActiveProfileView("My Chats")} type="button" className="w-full p-5 border-b border-rich-black/5 font-semibold flex justify-between items-center cursor-pointer hover:bg-off-white transition-colors text-left">
          My Chats <ChevronRight className="w-5 h-5 text-rich-black/40"/>
        </button>
        <button onClick={() => setActiveProfileView("My Transactions")} type="button" className="w-full p-5 border-b border-rich-black/5 font-semibold flex justify-between items-center cursor-pointer hover:bg-off-white transition-colors text-left">
          My Transactions <ChevronRight className="w-5 h-5 text-rich-black/40"/>
        </button>
        <button onClick={() => setActiveProfileView("About Account")} type="button" className="w-full p-5 font-semibold flex justify-between items-center cursor-pointer hover:bg-off-white transition-colors text-left">
          About Account <ChevronRight className="w-5 h-5 text-rich-black/40"/>
        </button>
      </div>

      <div className="bg-white rounded-[24px] border border-rich-black/10 p-8 shadow-sm text-center">
         <div className="w-24 h-24 bg-vibrant-pink text-white text-4xl font-serif flex items-center justify-center rounded-full mx-auto mb-4 shadow-md">
           {user?.photo ? <img src={user.photo} alt="Profile" className="w-full h-full object-cover rounded-full" /> : user?.name?.charAt(0) || 'S'}
         </div>
         <h3 className="font-serif text-2xl">{user?.name || 'Seeker User'}</h3>
         <p className="text-rich-black/60">{user?.email}</p>
         
         <div className="mt-8 text-left bg-off-white p-6 rounded-2xl">
            <h4 className="font-semibold mb-2">Profile Strength</h4>
            <div className="w-full h-2 bg-rich-black/10 rounded-full overflow-hidden mb-2">
               <div className="h-full bg-vibrant-pink w-[80%]"></div>
            </div>
            <p className="text-xs text-rich-black/60 font-medium">80% Complete. Add interests to reach 100%.</p>
         </div>
      </div>
    </div>
  )
}

function VerificationTab() {
  return (
    <div className="animate-in fade-in space-y-6 max-w-2xl">
      <h2 className="font-serif text-3xl">Safety & Verification</h2>
      <div className="bg-white rounded-[24px] border border-rich-black/10 p-6 shadow-sm">
        <div className="flex items-center justify-between p-4 bg-off-white rounded-xl mb-4">
          <span className="font-medium">Identity Verification</span>
          <span className="text-green-600 text-sm font-bold flex items-center gap-1"><CheckCircle2 className="w-4 h-4"/> Verified</span>
        </div>
      </div>
    </div>
  )
}

function ReviewsTab() {
  return (
    <div className="animate-in fade-in space-y-6 max-w-2xl">
      <h2 className="font-serif text-3xl">My Reviews</h2>
      <div className="bg-white rounded-[24px] border border-rich-black/10 p-8 shadow-sm text-center text-rich-black/50">
         <Star className="w-12 h-12 mx-auto mb-3 opacity-20" />
         <p>No reviews yet. Meet companions to start building your reputation.</p>
      </div>
    </div>
  )
}

function SettingsTab({ user, onUpdateUser, onLogout, onSwitchMode, onOpenPolicies }) {
  const [activeView, setActiveView] = useState(null);
  const [tempToggle, setTempToggle] = useState(true);

  if (activeView) {
    return (
      <div className="animate-in fade-in slide-in-from-right-4 space-y-6 max-w-2xl">
        <button onClick={() => setActiveView(null)} className="flex items-center gap-2 text-rich-black/60 hover:text-rich-black transition-colors font-medium text-sm">
          <ChevronLeft className="w-4 h-4" /> Back to Settings
        </button>
        
        {activeView !== 'My Profile' && activeView !== 'Safety & Verification' && (
           <h2 className="font-serif text-3xl">{activeView}</h2>
        )}

        {activeView === 'My Profile' ? (
           <ProfileTab user={user} onUpdateUser={onUpdateUser} />
        ) : activeView === 'Safety & Verification' ? (
           <VerificationTab />
        ) : (
          <div className="bg-white rounded-[24px] border border-rich-black/10 p-6 shadow-sm">
            <div className="space-y-4">
              <p className="text-rich-black/60 mb-6">Manage your {activeView.toLowerCase()} here.</p>
              <div className="flex justify-between items-center p-4 bg-off-white rounded-xl">
                <span className="font-medium text-sm">Enable {activeView} Features</span>
                <button 
                  onClick={() => setTempToggle(!tempToggle)} 
                  type="button" 
                  className={`w-10 h-5 rounded-full relative cursor-pointer transition-colors ${tempToggle ? 'bg-green-500' : 'bg-gray-300'}`}
                >
                  <div className={`w-4 h-4 bg-white rounded-full absolute top-0.5 shadow-sm transition-all ${tempToggle ? 'right-0.5' : 'left-0.5'}`}></div>
                </button>
              </div>
              <button 
                onClick={() => {
                  alert(`${activeView} settings saved successfully!`);
                  setActiveView(null);
                }} 
                className="w-full bg-rich-black text-white py-3 rounded-xl font-semibold hover:bg-rich-black/80 transition-colors cursor-pointer"
              >
                Save Changes
              </button>
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="animate-in fade-in space-y-6 max-w-2xl">
      <h2 className="font-serif text-3xl">Settings</h2>
      <div className="space-y-4">
        <div className="bg-white rounded-[24px] border border-rich-black/10 overflow-hidden flex flex-col shadow-sm">
          <button onClick={() => setActiveView("Discovery Preferences")} className="w-full p-5 border-b border-rich-black/5 font-semibold flex justify-between items-center hover:bg-off-white transition-colors text-left cursor-pointer">
            Discovery Preferences <ChevronRight className="w-5 h-5 text-rich-black/40"/>
          </button>
          <button onClick={() => setActiveView("My Profile")} className="w-full p-5 border-b border-rich-black/5 font-semibold flex justify-between items-center hover:bg-off-white transition-colors text-left cursor-pointer">
            My Profile <ChevronRight className="w-5 h-5 text-rich-black/40"/>
          </button>
          <button onClick={() => setActiveView("Safety & Verification")} className="w-full p-5 border-b border-rich-black/5 font-semibold flex justify-between items-center hover:bg-off-white transition-colors text-left cursor-pointer">
            Safety & Verification <ChevronRight className="w-5 h-5 text-rich-black/40"/>
          </button>
          <button onClick={() => setActiveView("Notification Settings")} className="w-full p-5 border-b border-rich-black/5 font-semibold flex justify-between items-center hover:bg-off-white transition-colors text-left cursor-pointer">
            Notification Settings <ChevronRight className="w-5 h-5 text-rich-black/40"/>
          </button>
          <button onClick={onOpenPolicies} className="w-full p-5 font-semibold flex justify-between items-center hover:bg-off-white transition-colors text-left text-rich-black/80 cursor-pointer">
            Policies & Terms <ChevronRight className="w-5 h-5 text-rich-black/40"/>
          </button>
        </div>
        <button onClick={onSwitchMode} className="w-full bg-rich-black text-white py-4 rounded-[20px] font-semibold flex items-center justify-center gap-2 hover:bg-rich-black/90 cursor-pointer">
          <RefreshCw className="w-5 h-5"/> Switch to Companion Mode
        </button>
        <button onClick={onLogout} className="w-full bg-red-50 text-red-600 py-4 rounded-[20px] font-semibold flex items-center justify-center gap-2 hover:bg-red-100 cursor-pointer">
          <LogOut className="w-5 h-5"/> Log Out
        </button>
      </div>
    </div>
  )
}
