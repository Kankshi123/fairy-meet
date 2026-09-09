import React, { useState } from 'react';
import LandingPage from './LandingPage';
import SeekerDashboard from './components/SeekerDashboard';
import AuthModal from './components/AuthModal';
import { SubscriptionModal, RechargeModal, ChatModal, CallModal } from './components/Modals';

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
  
  // Pending connection state
  const [activeCompanion, setActiveCompanion] = useState(null);
  const [pendingAction, setPendingAction] = useState(null); // 'chat' or 'call'

  const handleOpenAuth = (mode = 'signup') => {
    setAuthMode(mode);
    setIsAuthOpen(true);
  };

  const handleLogin = (gender) => {
    setUser({
      gender,
      subscriptionActive: false, // Start without subscription
      walletBalance: 0
    });
    setIsAuthOpen(false);
    setCurrentView('dashboard');
  };

  const handleLogout = () => {
    setUser(null);
    setCurrentView('landing');
  };

  const handleInitiateContact = (type, companionName) => {
    setActiveCompanion(companionName);
    setPendingAction(type);

    if (user.gender === 'Male' && !user.subscriptionActive) {
      // Male users must subscribe first
      setIsSubOpen(true);
    } else {
      // Female, LGBTQ+ or already subscribed Male
      if (type === 'chat') setIsChatOpen(true);
      if (type === 'call') setIsCallOpen(true);
    }
  };

  const handleSubscribe = () => {
    setUser({ ...user, subscriptionActive: true });
    setIsSubOpen(false);
    // Continue with the pending action
    if (pendingAction === 'chat') setIsChatOpen(true);
    if (pendingAction === 'call') setIsCallOpen(true);
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
      />
      
      <RechargeModal 
        isOpen={isRechargeOpen} 
        onClose={() => setIsRechargeOpen(false)} 
      />
    </SmoothScroll>
  );
}

export default App;
