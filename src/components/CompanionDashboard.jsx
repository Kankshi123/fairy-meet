import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  LayoutDashboard, User, Calendar as CalendarIcon, Inbox, Users, 
  MessageSquare, Coffee, Star, Bell, ShieldCheck, Settings, 
  LogOut, RefreshCw, Menu, X, CheckCircle2, Clock, 
  MapPin, Edit3, Image as ImageIcon, ChevronRight, ChevronLeft, Plus, Wallet, Gift
} from 'lucide-react';

import { useAppContext } from '../context/AppContext';
import VenuesList from './VenuesList';
import ReferAndEarn from './ReferAndEarn';
import MyProfilePhotoModal from './MyProfilePhotoModal';

const TABS = [
  { id: 'overview', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'availability', label: 'Availability', icon: CalendarIcon },
  { id: 'requests', label: 'Requests', icon: Inbox },
  { id: 'venues', label: 'Fairy Venues', icon: MapPin },
  { id: 'connections', label: 'Connections', icon: Users },
  { id: 'messages', label: 'Messages', icon: MessageSquare },
  { id: 'meetups', label: 'Meetups', icon: Coffee },
  { id: 'reviews', label: 'Reviews', icon: Star },
  { id: 'notifications', label: 'Notifications', icon: Bell },
  { id: 'referral', label: 'Refer & Earn', icon: Gift },
  { id: 'settings', label: 'Settings', icon: Settings },
];

export default function CompanionDashboard({ user, onUpdateUser, onLogout, onSwitchMode, onSettings, onOpenWallet, onGoToLanding }) {
  const { companionProfile, updateProfile } = useAppContext();
  const [activeTab, setActiveTab] = useState('overview');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const isOnline = companionProfile.isOnline;
  const setIsOnline = (status) => updateProfile({ isOnline: status });

  // For requests tab
  const [requestFilter, setRequestFilter] = useState('Pending');
  const [showMyProfilePhoto, setShowMyProfilePhoto] = useState(false);

  const renderContent = () => {
    switch (activeTab) {
      case 'overview':
        return <OverviewTab isOnline={isOnline} setIsOnline={setIsOnline} setActiveTab={setActiveTab} />;
      case 'profile':
        return <ProfileTab user={user} />;
      case 'availability':
        return <AvailabilityTab isOnline={isOnline} setIsOnline={setIsOnline} companionProfile={companionProfile} updateProfile={updateProfile} />;
      case 'requests':
        return <RequestsTab filter={requestFilter} setFilter={setRequestFilter} />;
      case 'venues':
        return <VenuesList />;
      case 'connections':
        return <ConnectionsTab />;
      case 'messages':
        return <MessagesTab />;
      case 'meetups':
        return <MeetupsTab setActiveTab={setActiveTab} />;
      case 'reviews':
        return <ReviewsTab />;
      case 'notifications':
        return <NotificationsTab />;
      case 'referral':
        return <ReferAndEarn user={user} />;
      case 'verification':
        return <VerificationTab />;
      case 'settings':
        return <SettingsTab user={user} onUpdateUser={onUpdateUser} onLogout={onLogout} onSwitchMode={onSwitchMode} />;
      default:
        return <OverviewTab isOnline={isOnline} setIsOnline={setIsOnline} setActiveTab={setActiveTab} />;
    }
  };

  return (
    <div className="min-h-screen bg-[#FDF8F5] flex font-sans text-rich-black">
      
      {/* DESKTOP SIDEBAR */}
      <aside className="hidden md:flex flex-col w-64 bg-white border-r border-rich-black/10 sticky top-0 h-screen">
        <div onClick={onGoToLanding} className="p-6 border-b border-rich-black/10 cursor-pointer group">
          <h2 className="font-serif text-2xl text-rich-black tracking-tight group-hover:text-vibrant-pink transition-colors">FAIRY MEET</h2>
          <p className="text-[10px] font-semibold text-vibrant-pink uppercase tracking-widest mt-1">Companion Mode</p>
        </div>
        
        <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-1 custom-scrollbar">
          {TABS.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
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
          <button onClick={onOpenWallet} className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-medium text-rich-black bg-off-white hover:bg-rich-black/5 transition-colors">
            <div className="flex items-center gap-3">
              <Wallet className="w-5 h-5 text-rich-black/50" /> Wallet
            </div>
            <span className="text-vibrant-pink font-bold">₹{user?.walletBalance || 0}</span>
          </button>
          <button onClick={onSwitchMode} className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-rich-black bg-off-white hover:bg-rich-black/5 transition-colors">
            <RefreshCw className="w-5 h-5 text-rich-black/50" /> Switch to Seeker
          </button>
        </div>
      </aside>

      {/* MOBILE MENU OVERLAY */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="md:hidden fixed inset-0 bg-rich-black/50 z-40 backdrop-blur-sm"
            />
            <motion.aside 
              initial={{ x: '-100%' }} animate={{ x: 0 }} exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="md:hidden fixed inset-y-0 left-0 w-64 bg-white border-r border-rich-black/10 z-50 flex flex-col"
            >
              <div className="p-6 border-b border-rich-black/10 flex justify-between items-center">
                <div onClick={onGoToLanding} className="cursor-pointer group">
                  <h2 className="font-serif text-2xl text-rich-black group-hover:text-vibrant-pink transition-colors">FAIRY MEET</h2>
                  <p className="text-[10px] font-semibold text-vibrant-pink uppercase tracking-widest mt-1">Companion Mode</p>
                </div>
                <button onClick={() => setIsMobileMenuOpen(false)} className="p-2 bg-off-white rounded-full">
                  <X className="w-5 h-5" />
                </button>
              </div>
              <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
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
              </nav>
              <div className="mt-auto p-4 border-t border-rich-black/10 space-y-4">
                <button onClick={() => { onOpenWallet(); setIsMobileMenuOpen(false); }} className="w-full flex items-center justify-between px-3 py-3 rounded-xl bg-off-white font-medium">
                  <div className="flex items-center gap-3">
                    <Wallet className="w-5 h-5 text-rich-black/50" /> Wallet
                  </div>
                  <span className="text-vibrant-pink font-bold">₹{user?.walletBalance || 0}</span>
                </button>
                <button onClick={onSwitchMode} className="w-full flex items-center gap-3 px-3 py-3 rounded-xl bg-off-white font-medium">
                  <RefreshCw className="w-5 h-5 text-rich-black/50" /> Switch to Seeker
                </button>
                <button onClick={onLogout} className="w-full flex items-center gap-3 px-3 py-3 rounded-xl bg-red-50 text-red-600 font-medium">
                  <LogOut className="w-5 h-5" /> Log Out
                </button>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* MAIN CONTENT AREA */}
      <main className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden">
        
        {/* HEADER */}
        <header className="bg-white border-b border-rich-black/10 px-4 md:px-8 py-4 flex items-center justify-between sticky top-0 z-10 shrink-0">
          <div className="flex items-center gap-4">
            <button className="md:hidden p-2 -ml-2 text-rich-black/60" onClick={() => setIsMobileMenuOpen(true)}>
              <Menu className="w-6 h-6" />
            </button>
            <h1 className="font-serif text-2xl md:text-3xl text-rich-black hidden sm:block">
              {TABS.find(t => t.id === activeTab)?.label}
            </h1>
          </div>

          <div className="flex items-center gap-3 md:gap-6">
            <div className="flex items-center gap-2 bg-off-white px-3 py-1.5 md:px-4 md:py-2 rounded-full border border-rich-black/5">
              <div className={`w-2.5 h-2.5 rounded-full ${isOnline ? 'bg-green-500' : 'bg-gray-400'}`} />
              <span className="text-xs md:text-sm font-medium hidden md:inline">{isOnline ? 'Available' : 'Offline'}</span>
              <button 
                onClick={() => setIsOnline(!isOnline)}
                className={`ml-2 px-3 py-1 rounded-full text-[10px] md:text-xs font-semibold uppercase tracking-wider transition-colors ${isOnline ? 'bg-rich-black text-white' : 'bg-vibrant-pink text-white'}`}
              >
                {isOnline ? 'Go Offline' : 'Go Online'}
              </button>
            </div>
            

            
            <div onClick={() => setShowMyProfilePhoto(true)} className="w-9 h-9 md:w-10 md:h-10 rounded-full bg-rich-black/5 border border-rich-black/10 overflow-hidden flex items-center justify-center cursor-pointer hover:opacity-90 transition-opacity">
               {user?.photo ? <img src={user.photo} alt="Profile" className="w-full h-full object-cover" /> : <User className="w-5 h-5 text-rich-black/40" />}
            </div>
          </div>
        </header>

        {/* SCROLLABLE CONTENT */}
        <div className="flex-1 overflow-y-auto p-4 md:p-8 bg-[#FDF8F5]">
          <div className="max-w-5xl mx-auto">
            {renderContent()}
          </div>
        </div>

      </main>

      {/* MOBILE BOTTOM NAV (Quick Links) */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-rich-black/10 flex justify-around p-2 pb-safe z-30">
        {[
          { id: 'overview', icon: LayoutDashboard, label: 'Home' },
          { id: 'requests', icon: Inbox, label: 'Requests' },
          { id: 'messages', icon: MessageSquare, label: 'Messages' },
          { id: 'profile', icon: User, label: 'Profile' },
        ].map(tab => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button 
              key={tab.id}
              onClick={() => setActiveTab(tab.id)} 
              className={`flex flex-col items-center gap-1 p-2 w-16 ${isActive ? 'text-vibrant-pink' : 'text-rich-black/50'}`}
            >
              <Icon className="w-6 h-6" />
              <span className="text-[10px] font-medium">{tab.label}</span>
            </button>
          )
        })}
      </div>

      <AnimatePresence>
        {showMyProfilePhoto && <MyProfilePhotoModal user={user} onClose={() => setShowMyProfilePhoto(false)} />}
      </AnimatePresence>
    </div>
  );
}

// ==========================================
// TAB COMPONENTS
// ==========================================

function OverviewTab({ isOnline, setIsOnline, setActiveTab }) {
  const { requests, meetups, connections } = useAppContext();
  const newRequests = requests.filter(r => r.status === 'pending');

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-center gap-2 mb-2">
        <h2 className="font-serif text-2xl">Good morning, <span className="text-vibrant-pink">Companion</span> 👋</h2>
      </div>
      <p className="text-rich-black/60 mb-8">Manage your connections, schedule, and profile from here.</p>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'New Requests', value: newRequests.length < 10 ? `0${newRequests.length}` : newRequests.length, highlight: true },
          { label: 'Connections', value: connections.length },
          { label: 'Profile Views', value: '46' },
          { label: 'Rating', value: '4.8⭐' }
        ].map(stat => (
          <div key={stat.label} className={`p-6 rounded-[24px] border ${stat.highlight ? 'bg-vibrant-pink text-white border-transparent' : 'bg-white border-rich-black/10 shadow-sm'}`}>
            <p className={`text-sm font-medium mb-2 ${stat.highlight ? 'text-white/80' : 'text-rich-black/60'}`}>{stat.label}</p>
            <p className="font-serif text-3xl">{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          {/* Recent Requests */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-serif text-xl">New Requests</h3>
              <button onClick={() => setActiveTab('requests')} className="text-sm font-semibold text-vibrant-pink">View All</button>
            </div>
            <div className="bg-white rounded-[24px] border border-rich-black/10 overflow-hidden shadow-sm">
              <div className="divide-y divide-rich-black/5">
                {newRequests.length === 0 && <div className="p-6 text-center text-rich-black/50">No new requests</div>}
                {newRequests.slice(0, 3).map(req => (
                  <div key={req.id} className="p-4 sm:p-5 flex items-center justify-between gap-4 hover:bg-off-white/50 transition-colors">
                    <div className="flex items-center gap-4">
                      <img src={req.image} alt={req.name} className="w-12 h-12 rounded-full object-cover shrink-0" />
                      <div>
                        <p className="font-semibold">{req.name}, {req.age}</p>
                        <p className="text-sm text-rich-black/60 flex items-center gap-1"><Coffee className="w-3 h-3"/> {req.intent}</p>
                      </div>
                    </div>
                    <button onClick={() => setActiveTab('requests')} className="px-4 py-2 bg-rich-black text-white text-sm font-medium rounded-full hover:bg-rich-black/80 transition-colors">
                      Accept
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-8">
          {/* Availability Snippet */}
          <div className="bg-white rounded-[24px] border border-rich-black/10 p-6 shadow-sm">
            <h3 className="font-serif text-xl mb-4 flex items-center gap-2"><CalendarIcon className="w-5 h-5 text-vibrant-pink"/> Availability</h3>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className={`w-2 h-2 rounded-full ${isOnline ? 'bg-green-500' : 'bg-gray-400'}`} />
                <span className="font-medium text-sm">{isOnline ? 'Currently Available' : 'Currently Offline'}</span>
              </div>
              <div className="p-4 bg-off-white rounded-xl">
                <p className="text-xs text-rich-black/50 font-semibold uppercase tracking-wider mb-1">Today's Slot</p>
                <p className="font-medium flex items-center gap-2"><Clock className="w-4 h-4 text-vibrant-pink"/> 6:00 PM - 10:00 PM</p>
              </div>
              <button onClick={() => setActiveTab('availability')} className="w-full py-2.5 border border-rich-black/20 rounded-xl text-sm font-semibold hover:bg-off-white transition-colors cursor-pointer">
                Manage Availability
              </button>
            </div>
          </div>

          {/* Upcoming Meetups Snippet */}
          <div className="bg-white rounded-[24px] border border-rich-black/10 p-6 shadow-sm">
            <h3 className="font-serif text-xl mb-4">Upcoming</h3>
            {meetups.length === 0 && <p className="text-sm text-rich-black/50">No upcoming meetups.</p>}
            {meetups.map(meet => (
              <div key={meet.id} className="space-y-3">
                <div className="flex items-center gap-3">
                  <img src={meet.image} alt={meet.name} className="w-10 h-10 rounded-full object-cover" />
                  <div>
                    <p className="font-medium text-sm">{meet.intent} with {meet.name}</p>
                    <p className="text-xs text-rich-black/60">{meet.date} &bull; {meet.time}</p>
                  </div>
                </div>
                <button className="w-full text-left text-sm text-vibrant-pink font-semibold mt-2 flex items-center gap-1 hover:underline">
                  View Details <ChevronRight className="w-4 h-4"/>
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
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
                    <h4 className="font-semibold">Seeker User {i}</h4>
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
           {user?.photo ? <img src={user.photo} alt="Profile" className="w-full h-full object-cover rounded-full" /> : <ImageIcon className="w-8 h-8 text-white/50" />}
         </div>
         <h3 className="font-serif text-2xl">{user?.name || 'Companion'}</h3>
         <p className="text-rich-black/60">{user?.email}</p>
         
         <div className="mt-8 text-left bg-off-white p-6 rounded-2xl">
            <h4 className="font-semibold mb-2">Profile Rating</h4>
            <div className="w-full h-2 bg-rich-black/10 rounded-full overflow-hidden mb-2">
               <div className="h-full bg-vibrant-pink w-[95%]"></div>
            </div>
            <p className="text-xs text-rich-black/60 font-medium">4.8⭐ Average rating.</p>
         </div>
      </div>
    </div>
  )
}

function AvailabilityTab({ isOnline, setIsOnline, companionProfile, updateProfile }) {
  const [newLocation, setNewLocation] = useState("");

  const handleAddDay = () => {
    const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    const currentDays = companionProfile.recurringHours.map(h => h.day);
    const nextDay = daysOfWeek.find(d => !currentDays.includes(d)) || 'Monday';
    
    const newEntry = { id: Date.now(), day: nextDay, start: '09:00', end: '17:00' };
    updateProfile({ recurringHours: [...companionProfile.recurringHours, newEntry] });
  };

  const handleRemoveDay = (id) => {
    updateProfile({ recurringHours: companionProfile.recurringHours.filter(h => h.id !== id) });
  };

  const handleTimeChange = (id, field, value) => {
    updateProfile({
      recurringHours: companionProfile.recurringHours.map(h => h.id === id ? { ...h, [field]: value } : h)
    });
  };

  const handleAddLocation = (e) => {
    if (e.key === 'Enter' && newLocation.trim()) {
      if (!companionProfile.locations.includes(newLocation.trim())) {
        updateProfile({ locations: [...companionProfile.locations, newLocation.trim()] });
      }
      setNewLocation("");
    }
  };

  const handleRemoveLocation = (loc) => {
    updateProfile({ locations: companionProfile.locations.filter(l => l !== loc) });
  };

  return (
    <div className="animate-in fade-in space-y-6">
      <h2 className="font-serif text-3xl">Availability Settings</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-[24px] p-6 border border-rich-black/10 shadow-sm space-y-6">
          <div className="flex items-center justify-between border-b border-rich-black/5 pb-4">
            <div>
              <h3 className="font-semibold text-lg">Instant Availability</h3>
              <p className="text-sm text-rich-black/60">Toggle to appear online right now.</p>
            </div>
            <button onClick={() => setIsOnline(!isOnline)} type="button" className={`w-12 h-6 rounded-full relative cursor-pointer transition-colors ${isOnline ? 'bg-green-500' : 'bg-gray-300'}`}>
              <div className={`w-5 h-5 bg-white rounded-full absolute top-0.5 shadow-sm transition-transform ${isOnline ? 'right-0.5' : 'left-0.5'}`}></div>
            </button>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Set Recurring Hours</h3>
            <div className="space-y-3">
              {companionProfile.recurringHours.map(item => (
                <div key={item.id} className="flex items-center justify-between p-3 bg-off-white rounded-xl">
                  <select 
                    value={item.day} 
                    onChange={(e) => handleTimeChange(item.id, 'day', e.target.value)}
                    className="font-medium text-sm w-28 bg-transparent outline-none cursor-pointer"
                  >
                    {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map(d => (
                      <option key={d} value={d}>{d}</option>
                    ))}
                  </select>
                  <div className="flex gap-2 items-center">
                    <input type="time" value={item.start} onChange={(e) => handleTimeChange(item.id, 'start', e.target.value)} className="px-1 py-1 bg-white border border-rich-black/10 rounded-md text-sm outline-none focus:border-vibrant-pink" />
                    <span className="text-sm text-rich-black/60">to</span>
                    <input type="time" value={item.end} onChange={(e) => handleTimeChange(item.id, 'end', e.target.value)} className="px-1 py-1 bg-white border border-rich-black/10 rounded-md text-sm outline-none focus:border-vibrant-pink" />
                    <button onClick={() => handleRemoveDay(item.id)} className="ml-1 text-rich-black/30 hover:text-red-500"><X className="w-4 h-4"/></button>
                  </div>
                </div>
              ))}
              {companionProfile.recurringHours.length < 7 && (
                <button onClick={handleAddDay} type="button" className="text-sm font-semibold text-vibrant-pink mt-2 hover:underline flex items-center gap-1"><Plus className="w-4 h-4"/> Add Day</button>
              )}
            </div>
          </div>
        </div>

        <div className="bg-white rounded-[24px] p-6 border border-rich-black/10 shadow-sm">
          <h3 className="font-semibold mb-4 flex items-center gap-2"><MapPin className="w-5 h-5 text-vibrant-pink"/> Preferred Locations</h3>
          <p className="text-sm text-rich-black/60 mb-4">Where are you willing to meet?</p>
          <div className="space-y-3">
            {companionProfile.locations.map(loc => (
              <div key={loc} className="flex items-center justify-between p-3 border border-rich-black/10 rounded-xl">
                <span className="text-sm font-medium">{loc}</span>
                <button onClick={() => handleRemoveLocation(loc)} type="button"><X className="w-4 h-4 text-rich-black/40 hover:text-red-500" /></button>
              </div>
            ))}
            <input 
              type="text" 
              value={newLocation}
              onChange={(e) => setNewLocation(e.target.value)}
              onKeyDown={handleAddLocation}
              placeholder="Type a location and hit enter..." 
              className="w-full px-4 py-2 bg-off-white border border-rich-black/10 rounded-xl text-sm outline-none focus:border-vibrant-pink" 
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function RequestsTab({ filter, setFilter }) {
  const { requests, acceptRequest, declineRequest } = useAppContext();
  
  const filteredRequests = requests.filter(r => r.status.toLowerCase() === filter.toLowerCase());
  const pendingCount = requests.filter(r => r.status === 'pending').length;

  return (
    <div className="animate-in fade-in space-y-6">
      <h2 className="font-serif text-3xl">Connection Requests</h2>
      
      <div className="flex gap-2 overflow-x-auto pb-2 custom-scrollbar">
        {['Pending', 'Accepted', 'Declined', 'Completed'].map(f => (
          <button 
            key={f} 
            onClick={() => setFilter(f)}
            className={`px-5 py-2 rounded-full text-sm font-semibold whitespace-nowrap transition-colors ${filter === f ? 'bg-rich-black text-white' : 'bg-white border border-rich-black/10 text-rich-black/60 hover:bg-off-white'}`}
          >
            {f} {f === 'Pending' && pendingCount > 0 && <span className="ml-1 bg-vibrant-pink text-white px-1.5 py-0.5 rounded-full text-[10px]">{pendingCount}</span>}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredRequests.map(req => (
          <div key={req.id} className="bg-white rounded-[24px] p-5 border border-rich-black/10 shadow-sm flex flex-col sm:flex-row gap-4">
             <img src={req.image} alt={req.name} className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl object-cover shrink-0" />
             <div className="flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-serif text-xl">{req.name}, <span className="opacity-70 text-lg">{req.age}</span></h3>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="px-2 py-1 bg-off-white text-[10px] font-bold uppercase tracking-wider rounded-md text-rich-black/60">{req.intent}</span>
                  </div>
                  <p className="text-sm font-medium text-rich-black/70 mt-2 flex items-center gap-1.5"><Clock className="w-4 h-4 text-vibrant-pink"/> {req.time}</p>
                </div>
                {filter === 'Pending' && (
                  <div className="flex gap-2 mt-4 sm:mt-0 pt-2">
                    <button onClick={() => acceptRequest(req.id)} className="flex-1 py-2 bg-rich-black text-white text-sm font-semibold rounded-xl hover:bg-rich-black/80 transition-colors">Accept</button>
                    <button onClick={() => declineRequest(req.id)} className="flex-1 py-2 bg-off-white text-rich-black text-sm font-semibold rounded-xl hover:bg-rich-black/5 transition-colors">Decline</button>
                  </div>
                )}
             </div>
          </div>
        ))}
        {filteredRequests.length === 0 && (
          <div className="col-span-full p-12 text-center text-rich-black/50">
            No {filter.toLowerCase()} requests found.
          </div>
        )}
      </div>
    </div>
  );
}

function ConnectionsTab() {
  const { connections } = useAppContext();

  return (
    <div className="animate-in fade-in space-y-6">
      <h2 className="font-serif text-3xl">My Connections</h2>
      {connections.length === 0 ? (
        <div className="bg-white rounded-[24px] border border-rich-black/10 p-8 text-center text-rich-black/50">
          <Users className="w-12 h-12 mx-auto mb-3 opacity-20" />
          <p>You have no active connections yet.</p>
          <p className="text-sm mt-1">Accept requests to build connections.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {connections.map(conn => (
            <div key={conn.id} className="bg-white rounded-[24px] p-5 border border-rich-black/10 shadow-sm flex items-center gap-4">
              <img src={conn.image} alt={conn.name} className="w-16 h-16 rounded-full object-cover shrink-0" />
              <div>
                <p className="font-semibold text-lg">{conn.name}</p>
                <p className="text-sm text-rich-black/60 flex items-center gap-1"><MessageSquare className="w-3 h-3"/> {conn.intent}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

function MessagesTab() {
  return (
    <div className="animate-in fade-in h-[calc(100vh-160px)] flex flex-col">
      <h2 className="font-serif text-3xl mb-6 shrink-0">Messages</h2>
      <div className="flex-1 bg-white rounded-[24px] border border-rich-black/10 overflow-hidden flex flex-col md:flex-row shadow-sm">
        {/* Chat List */}
        <div className="w-full md:w-80 border-r border-rich-black/10 flex flex-col bg-off-white/50 shrink-0 h-1/3 md:h-full overflow-y-auto">
          <div className="p-4 border-b border-rich-black/5">
            <input type="text" placeholder="Search chats..." className="w-full px-4 py-2 rounded-full bg-white border border-rich-black/10 text-sm focus:outline-none focus:border-vibrant-pink" />
          </div>
          <div className="p-4 flex items-center justify-center text-rich-black/40 text-sm h-full">
            No recent messages
          </div>
        </div>
        {/* Chat Window */}
        <div className="flex-1 flex flex-col items-center justify-center text-rich-black/40 bg-white p-8 text-center h-2/3 md:h-full">
          <MessageSquare className="w-16 h-16 mb-4 opacity-20" />
          <p className="text-lg font-serif">Select a conversation</p>
          <p className="text-sm">Or accept a request to start chatting</p>
        </div>
      </div>
    </div>
  )
}

function MeetupsTab({ setActiveTab }) {
  const { meetups, updateMeetups } = useAppContext();
  const [selectedMeetup, setSelectedMeetup] = useState(null);
  const [isRescheduling, setIsRescheduling] = useState(false);
  const [newDate, setNewDate] = useState("");
  const [newTime, setNewTime] = useState("");

  const handleReschedule = () => {
    // In a real app we'd update context, for mock just alert
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
      <h2 className="font-serif text-3xl">Meetups Schedule</h2>
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
               <button onClick={() => setSelectedMeetup(meet)} className="flex-1 sm:flex-none px-6 py-2 bg-rich-black text-white text-sm font-semibold rounded-full hover:bg-rich-black/80 transition-colors cursor-pointer">Details</button>
             </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function ReviewsTab() {
  const { reviews } = useAppContext();
  
  return (
    <div className="animate-in fade-in space-y-6">
      <h2 className="font-serif text-3xl">Reviews & Ratings</h2>
      <div className="flex items-center gap-6 bg-white rounded-[24px] p-8 border border-rich-black/10 shadow-sm">
        <div className="text-center">
          <p className="font-serif text-6xl text-vibrant-pink">4.8</p>
          <div className="flex text-yellow-400 mt-2 justify-center">
            <Star className="w-4 h-4 fill-current"/>
            <Star className="w-4 h-4 fill-current"/>
            <Star className="w-4 h-4 fill-current"/>
            <Star className="w-4 h-4 fill-current"/>
            <Star className="w-4 h-4 fill-current opacity-50"/>
          </div>
        </div>
        <div className="flex-1">
          <p className="font-medium text-lg">Excellent Standing</p>
          <p className="text-sm text-rich-black/60">Based on {reviews.length} reviews from seekers.</p>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
        {reviews.map(rev => (
          <div key={rev.id} className="bg-white rounded-2xl p-6 border border-rich-black/10">
            <div className="flex justify-between items-start mb-3">
              <span className="font-medium">{rev.name}</span>
              <span className="text-xs text-rich-black/40">{rev.date}</span>
            </div>
            <div className="flex text-yellow-400 mb-2">
              {[...Array(rev.rating)].map((_, i) => <Star key={i} className="w-3 h-3 fill-current"/>)}
            </div>
            <p className="text-sm text-rich-black/80 italic">"{rev.text}"</p>
          </div>
        ))}
      </div>
    </div>
  )
}

function NotificationsTab() {
  return (
    <div className="animate-in fade-in space-y-6">
      <h2 className="font-serif text-3xl mb-6">Notifications</h2>
      <div className="space-y-3">
        <div className="bg-white p-4 rounded-2xl border border-rich-black/10 flex items-start gap-4">
          <div className="w-10 h-10 rounded-full bg-vibrant-pink/10 text-vibrant-pink flex items-center justify-center shrink-0">
            <Inbox className="w-5 h-5"/>
          </div>
          <div>
            <p className="font-medium">New Connection Request</p>
            <p className="text-sm text-rich-black/60">Rahul sent you a request for Coffee & Conversation.</p>
            <p className="text-xs text-rich-black/40 mt-1">2 hours ago</p>
          </div>
        </div>
        <div className="bg-white p-4 rounded-2xl border border-rich-black/10 flex items-start gap-4">
          <div className="w-10 h-10 rounded-full bg-green-50 text-green-600 flex items-center justify-center shrink-0">
            <ShieldCheck className="w-5 h-5"/>
          </div>
          <div>
            <p className="font-medium">Identity Verified</p>
            <p className="text-sm text-rich-black/60">Your identity documents have been approved successfully.</p>
            <p className="text-xs text-rich-black/40 mt-1">Yesterday</p>
          </div>
        </div>
      </div>
    </div>
  )
}

function VerificationTab() {
  return (
    <div className="animate-in fade-in space-y-6 max-w-2xl">
      <h2 className="font-serif text-3xl">Verification & Safety</h2>
      <div className="bg-white rounded-[24px] border border-rich-black/10 p-6 shadow-sm">
        <div className="flex items-center gap-4 border-b border-rich-black/10 pb-6 mb-6">
          <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center">
            <CheckCircle2 className="w-8 h-8 text-green-600" />
          </div>
          <div>
            <h3 className="font-serif text-xl">Identity Verified</h3>
            <p className="text-sm text-rich-black/60">Your profile has a verified trust badge.</p>
          </div>
        </div>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-off-white rounded-xl">
            <span className="font-medium">Phone Number</span>
            <span className="text-green-600 text-sm font-bold flex items-center gap-1"><CheckCircle2 className="w-4 h-4"/> Verified</span>
          </div>
          <div className="flex items-center justify-between p-4 bg-off-white rounded-xl">
            <span className="font-medium">Selfie Verification</span>
            <span className="text-green-600 text-sm font-bold flex items-center gap-1"><CheckCircle2 className="w-4 h-4"/> Verified</span>
          </div>
        </div>
      </div>

      <div className="bg-red-50 text-red-800 rounded-2xl p-6 border border-red-100 mt-6">
        <h4 className="font-semibold flex items-center gap-2 mb-2"><ShieldCheck className="w-5 h-5"/> Safety Guidelines</h4>
        <ul className="text-sm space-y-2 list-disc pl-5">
          <li>Always meet in well-lit, public places for initial meetups.</li>
          <li>Never share personal financial information.</li>
          <li>Use the in-app reporting tool if a user makes you uncomfortable.</li>
        </ul>
      </div>
    </div>
  )
}

function SettingsTab({ user, onUpdateUser, onLogout, onSwitchMode }) {
  const [activeView, setActiveView] = useState(null);
  const [tempToggle, setTempToggle] = useState(true);

  if (activeView) {
    return (
      <div className="animate-in fade-in slide-in-from-right-4 space-y-6 max-w-2xl">
        <button onClick={() => setActiveView(null)} className="flex items-center gap-2 text-rich-black/60 hover:text-rich-black transition-colors font-medium text-sm">
          <ChevronLeft className="w-4 h-4" /> Back to Settings
        </button>
        
        {activeView !== 'My Profile' && activeView !== 'Verification & Safety' && (
           <h2 className="font-serif text-3xl">{activeView}</h2>
        )}

        {activeView === 'My Profile' ? (
           <ProfileTab user={user} onUpdateUser={onUpdateUser} />
        ) : activeView === 'Verification & Safety' ? (
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
          <button onClick={() => setActiveView("Privacy & Visibility")} type="button" className="w-full p-5 border-b border-rich-black/5 font-semibold flex justify-between items-center cursor-pointer hover:bg-off-white transition-colors text-left">
            Privacy & Visibility <ChevronRight className="w-5 h-5 text-rich-black/40"/>
          </button>
          <button onClick={() => setActiveView("My Profile")} type="button" className="w-full p-5 border-b border-rich-black/5 font-semibold flex justify-between items-center cursor-pointer hover:bg-off-white transition-colors text-left">
            My Profile <ChevronRight className="w-5 h-5 text-rich-black/40"/>
          </button>
          <button onClick={() => setActiveView("Verification & Safety")} type="button" className="w-full p-5 border-b border-rich-black/5 font-semibold flex justify-between items-center cursor-pointer hover:bg-off-white transition-colors text-left">
            Safety & Verification <ChevronRight className="w-5 h-5 text-rich-black/40"/>
          </button>
          <button onClick={() => setActiveView("Notification Settings")} type="button" className="w-full p-5 font-semibold flex justify-between items-center cursor-pointer hover:bg-off-white transition-colors text-left">
            Notification Settings <ChevronRight className="w-5 h-5 text-rich-black/40"/>
          </button>
        </div>

        <button onClick={onSwitchMode} className="w-full bg-rich-black text-white py-4 rounded-[20px] font-semibold flex items-center justify-center gap-2 hover:bg-rich-black/90 transition-colors">
          <RefreshCw className="w-5 h-5"/> Switch to Seeker Mode
        </button>

        <button onClick={onLogout} className="w-full bg-red-50 text-red-600 py-4 rounded-[20px] font-semibold flex items-center justify-center gap-2 hover:bg-red-100 transition-colors">
          <LogOut className="w-5 h-5"/> Log Out
        </button>
      </div>
    </div>
  )
}
