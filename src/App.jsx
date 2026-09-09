import React, { useState } from 'react';
import LandingPage from './LandingPage';
import SeekerDashboard from './components/SeekerDashboard';
import AuthModal from './components/AuthModal';
import { SubscriptionModal, RechargeModal, ChatModal, CallModal, UserProfileModal, DateModal } from './components/Modals';

import SmoothScroll from './components/SmoothScroll';
import CustomCursor from './components/CustomCursor';

function App() {
  const [currentView, setCurrentView] = useState('landing');
  const [user, setUser] = useState(null); // { gender, subscriptionActive, walletBalance }
  
  // Modal states
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [authMode, setAuthMode] = useState('signup');
  const [isSubOpen, setIsSubOpen] = useState(false);
  const [isRechargeOpen, setIsRechargeOpen] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isCallOpen, setIsCallOpen] = useState(false);
  const [isDateOpen, setIsDateOpen] = useState(false);
  const [isUserProfileOpen, setIsUserProfileOpen] = useState(false);
  
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
    setUser({ ...user, subscriptionActive: true });
    setIsSubOpen(false);
    // Continue with the pending action
    if (pendingAction === 'chat') setIsChatOpen(true);
    if (pendingAction === 'call') setIsCallOpen(true);
    if (pendingAction === 'date') setIsDateOpen(true);
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
      />
      
      <CallModal 
        isOpen={isCallOpen} 
        onClose={() => setIsCallOpen(false)} 
        companionName={activeCompanion} 
        isFree={user?.gender === 'Female'}
      />
      
      <RechargeModal 
        isOpen={isRechargeOpen} 
        onClose={() => setIsRechargeOpen(false)} 
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
      />
    </SmoothScroll>
  );
}

export default App;
