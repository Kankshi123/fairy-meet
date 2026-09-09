import React, { useState } from 'react';
import LandingPage from './LandingPage';
import SeekerDashboard from './components/SeekerDashboard';
import AuthModal from './components/AuthModal';
import { SubscriptionModal, RechargeModal, ChatModal, CallModal, UserProfileModal, DateModal, NotificationsModal, SettingsModal, WalletModal } from './components/Modals';

import SmoothScroll from './components/SmoothScroll';
import CustomCursor from './components/CustomCursor';
import ChatbotWidget from './components/ChatbotWidget';

function App() {
  const [currentView, setCurrentView] = useState('landing');
  const [user, setUser] = useState(null);

  // Activity data
  const [bookings, setBookings] = useState([]);
  const [conversations, setConversations] = useState([]);
  const [transactions, setTransactions] = useState([]);
  
  // Modal states
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [authMode, setAuthMode] = useState('signup');
  const [isSubOpen, setIsSubOpen] = useState(false);
  const [isRechargeOpen, setIsRechargeOpen] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isCallOpen, setIsCallOpen] = useState(false);
  const [isDateOpen, setIsDateOpen] = useState(false);
  const [isUserProfileOpen, setIsUserProfileOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isWalletOpen, setIsWalletOpen] = useState(false);
  
  // Pending connection state
  const [activeCompanion, setActiveCompanion] = useState(null);
  const [pendingAction, setPendingAction] = useState(null); // 'chat' or 'call'

  const handleOpenAuth = (mode = 'signup') => {
    setAuthMode(mode);
    setIsAuthOpen(true);
  };

  const handleLogin = (gender, authData = {}) => {
    setUser({
      gender,
      name: authData.name || "Seeker",
      email: authData.email || "",
      aadhaar: authData.aadhaar || "",
      nickname: "",
      dob: "",
      photo: authData.photo || "",
      subscriptionActive: gender === 'Female', // Females get auto-subscription (free)
      walletBalance: 0
    });
    setIsAuthOpen(false);
    setCurrentView('dashboard');
  };

  const handleLogout = () => {
    setUser(null);
    setCurrentView('landing');
  };

  const handleUpdateUser = (updates) => {
    setUser({ ...user, ...updates });
  };

  const handleInitiateContact = (type, companionName) => {
    setActiveCompanion(companionName);
    setPendingAction(type);

    if (!user.subscriptionActive && user.gender !== 'Female') {
      // All users (except Female) must subscribe first
      setIsSubOpen(true);
    } else {
      // Already subscribed
      if (type === 'chat') setIsChatOpen(true);
      if (type === 'call') setIsCallOpen(true);
      if (type === 'date') setIsDateOpen(true);
    }
  };

  const handleSubscribe = () => {
    const newTransaction = { id: Date.now(), type: 'subscription', amount: 199, description: '1-Month Active Pass', date: new Date().toISOString() };
    setUser({ ...user, subscriptionActive: true });
    setTransactions(prev => [newTransaction, ...prev]);
    setIsSubOpen(false);
    if (pendingAction === 'chat') {
      setConversations(prev => [{ id: Date.now(), companionName: activeCompanion, type: 'chat', startedAt: new Date().toISOString() }, ...prev]);
      setIsChatOpen(true);
    }
    if (pendingAction === 'call') {
      setConversations(prev => [{ id: Date.now(), companionName: activeCompanion, type: 'call', startedAt: new Date().toISOString() }, ...prev]);
      setIsCallOpen(true);
    }
    if (pendingAction === 'date') setIsDateOpen(true);
  };

  const handleAddBooking = (bookingData) => {
    const newBooking = { id: Date.now(), ...bookingData, status: 'Confirmed', bookedAt: new Date().toISOString() };
    setBookings(prev => [newBooking, ...prev]);
    const newTransaction = { id: Date.now() + 1, type: 'date_booking', amount: bookingData.isFree ? 0 : 2000, description: `Date with ${bookingData.companionName}`, date: new Date().toISOString() };
    if (!bookingData.isFree) setTransactions(prev => [newTransaction, ...prev]);
  };

  const handleAddWalletBalance = (amount) => {
    setUser(prev => ({ ...prev, walletBalance: (prev.walletBalance || 0) + amount }));
    const newTransaction = { id: Date.now(), type: 'wallet_recharge', amount, description: 'Wallet Recharge', date: new Date().toISOString() };
    setTransactions(prev => [newTransaction, ...prev]);
    setIsWalletOpen(false);
  };

  const handleOpenContact = (type, companionName) => {
    setConversations(prev => [{ id: Date.now(), companionName, type, startedAt: new Date().toISOString() }, ...prev]);
  };

  return (
    <SmoothScroll>
      <CustomCursor />
      {currentView === 'landing' ? (
        <LandingPage onOpenAuth={handleOpenAuth} />
      ) : (
        <SeekerDashboard 
          user={user} 
          onInitiateContact={handleInitiateContact} 
          onLogout={handleLogout}
          onUpdateUser={handleUpdateUser}
          onOpenProfile={() => setIsUserProfileOpen(true)}
          onOpenNotifications={() => setIsNotificationsOpen(true)}
          onOpenSettings={() => setIsSettingsOpen(true)}
          onOpenWallet={() => setIsWalletOpen(true)}
        />
      )}

      {/* Modals */}
      <AuthModal 
        isOpen={isAuthOpen} 
        onClose={() => setIsAuthOpen(false)} 
        onLogin={handleLogin} 
        initialMode={authMode}
      />
      
      <SubscriptionModal 
        isOpen={isSubOpen} 
        onClose={() => setIsSubOpen(false)} 
        onSubscribe={handleSubscribe} 
      />
      
      <ChatModal 
        isOpen={isChatOpen} 
        onClose={() => setIsChatOpen(false)} 
        companionName={activeCompanion} 
        onScheduleDate={() => { setIsChatOpen(false); setIsDateOpen(true); }}
      />
      
      <CallModal 
        isOpen={isCallOpen} 
        onClose={() => { setIsCallOpen(false); }}
        companionName={activeCompanion} 
        isFree={user?.gender === 'Female'}
        onOpenChat={() => { setIsCallOpen(false); setIsChatOpen(true); }}
      />
      
      <RechargeModal 
        isOpen={isRechargeOpen} 
        onClose={() => setIsRechargeOpen(false)} 
      />

      {/* Wallet Top-Up Modal */}
      <WalletModal
        isOpen={isWalletOpen}
        onClose={() => setIsWalletOpen(false)}
        currentBalance={user?.walletBalance || 0}
        onAddBalance={handleAddWalletBalance}
      />

      <UserProfileModal
        isOpen={isUserProfileOpen}
        onClose={() => setIsUserProfileOpen(false)}
        user={user}
        onUpdateUser={handleUpdateUser}
      />

      <DateModal 
        isOpen={isDateOpen}
        onClose={() => setIsDateOpen(false)}
        companionName={activeCompanion}
        isFree={user?.gender === 'Female'}
        onAddBooking={handleAddBooking}
      />

      <NotificationsModal 
        isOpen={isNotificationsOpen}
        onClose={() => setIsNotificationsOpen(false)}
      />

      <SettingsModal 
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        user={user}
        bookings={bookings}
        conversations={conversations}
        transactions={transactions}
      />
      <ChatbotWidget />
    </SmoothScroll>
  );
}

export default App;
