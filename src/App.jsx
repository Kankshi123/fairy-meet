import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import LandingPage from './LandingPage';
import SeekerDashboard, { companions } from './components/SeekerDashboard';
import AuthModal from './components/AuthModal';
import { SubscriptionModal, RechargeModal, ChatModal, CallModal, UserProfileModal, DateModal, NotificationsModal, SettingsModal, WalletModal, WithdrawModal } from './components/Modals';
import MatchModal from './components/MatchModal';
import PoliciesPage from './PoliciesPage';
import CompanionDashboard from './components/CompanionDashboard';
import SplashScreen from './components/SplashScreen';

import SmoothScroll from './components/SmoothScroll';
import CustomCursor from './components/CustomCursor';
import { supabase } from './lib/supabaseClient';

function App() {
  const [showSplash, setShowSplash] = useState(true);
  const [currentView, setCurrentView] = useState('landing'); // 'landing', 'dashboard', 'policies'
  const [activePolicy, setActivePolicy] = useState('privacy');
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Check active sessions and sets the user
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        fetchUserProfile(session.user);
      }
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        fetchUserProfile(session.user);
      } else {
        setUser(null);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const fetchUserProfile = async (authUser) => {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', authUser.id)
      .single();
    
    if (data) {
      const storedRole = localStorage.getItem('fairymeet_role');
      const resolvedRole = data.role || storedRole || 'seeker';
      
      // Merge auth user info with profile data
      setUser(prev => ({
        id: data.id,
        email: data.email,
        name: data.name,
        aadhaar: data.aadhaar_number,
        gender: data.gender,
        photo: data.avatar_url,
        walletBalance: data.wallet_balance,
        subscriptionActive: data.is_active_pass || data.gender === 'Female',
        role: resolvedRole,
        ...data
      }));
      
      // Automatically redirect to the correct dashboard if they are on the landing page
      setCurrentView(prevView => {
        if (prevView === 'landing') {
          return resolvedRole === 'companion' ? 'companion_dashboard' : 'dashboard';
        }
        return prevView;
      });
    }
  };

  // Activity data
  const [bookings, setBookings] = useState([]);
  const [conversations, setConversations] = useState([]);
  const [transactions, setTransactions] = useState([]);
  
  // Modal states
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [authMode, setAuthMode] = useState('signup');
  const [authRole, setAuthRole] = useState(null);
  const [isSubOpen, setIsSubOpen] = useState(false);
  const [isRechargeOpen, setIsRechargeOpen] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isCallOpen, setIsCallOpen] = useState(false);
  const [isDateOpen, setIsDateOpen] = useState(false);
  const [isUserProfileOpen, setIsUserProfileOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isWalletOpen, setIsWalletOpen] = useState(false);
  const [isWithdrawOpen, setIsWithdrawOpen] = useState(false);
  
  useEffect(() => {
    // Lightning fast splash screen to animate logo into place
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 700);
    return () => clearTimeout(timer);
  }, []);

  // Pending connection state
  const [activeCompanion, setActiveCompanion] = useState(null);
  const [pendingAction, setPendingAction] = useState(null); // 'chat' or 'call'
  
  // Find Match state
  const [pendingFindMatch, setPendingFindMatch] = useState(false);
  const [showMatchModal, setShowMatchModal] = useState(false);

  const handleOpenAuth = (mode = 'signup', role = null) => {
    if (typeof role === 'boolean') {
      setPendingFindMatch(role);
      setAuthRole(null);
    } else {
      setAuthRole(role);
    }
    setAuthMode(mode);
    setIsAuthOpen(true);
  };

  const handleLogin = (gender, authData = {}, role = 'seeker') => {
    // Save role to local storage so it persists on refresh since it's not in DB yet
    localStorage.setItem('fairymeet_role', role);
    
    setUser(prev => ({
      ...prev,
      role,
      subscriptionActive: prev?.gender === 'Female' || gender === 'Female'
    }));
    
    setIsAuthOpen(false);
    setCurrentView(role === 'companion' ? 'companion_dashboard' : 'dashboard');
    
    if (pendingFindMatch) {
      setPendingFindMatch(false);
      setShowMatchModal(true);
    }
  };

  const handleFindMatch = () => {
    if (!user) {
      handleOpenAuth('signup', true);
    } else {
      setShowMatchModal(true);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setCurrentView('landing');
  };

  const handleGoToLanding = () => {
    setCurrentView('landing');
  };

  const handleGoToDashboard = () => {
    setCurrentView(user?.role === 'companion' ? 'companion_dashboard' : 'dashboard');
  };

  const handleOpenPolicies = (policyId = 'privacy') => {
    setActivePolicy(policyId);
    setCurrentView('policies');
  };

  const handleBackFromPolicies = () => {
    setCurrentView(user ? (user.role === 'companion' ? 'companion_dashboard' : 'dashboard') : 'landing');
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
      <AnimatePresence mode="wait">
        {showSplash ? (
          <SplashScreen key="splash" />
      ) : (
        <motion.div
          key="main-app"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="min-h-screen text-rich-black overflow-x-hidden w-full relative"
        >
          <CustomCursor />

          {currentView === 'policies' ? (
            <PoliciesPage 
              initialPolicyId={activePolicy} 
              onBack={handleBackFromPolicies} 
            />
          ) : currentView === 'landing' ? (
            <LandingPage 
              onOpenAuth={handleOpenAuth} 
              onFindMatch={handleFindMatch} 
              onBecomeSeeker={() => handleOpenAuth('signup', 'seeker')}
              onBecomeCompanion={() => handleOpenAuth('signup', 'companion')}
              user={user}
              onGoToDashboard={handleGoToDashboard}
              onOpenPolicies={handleOpenPolicies}
            />
          ) : currentView === 'companion_dashboard' ? (
            <CompanionDashboard 
              user={user} 
              onUpdateUser={setUser}
              onLogout={() => { setUser(null); setCurrentView('landing'); }}
              onSwitchMode={() => { setUser({...user, role: 'seeker'}); setCurrentView('dashboard'); }}
              onSettings={() => setIsSettingsOpen(true)}
              onOpenWallet={() => setIsWalletOpen(true)}
              onGoToLanding={handleGoToLanding}
            />
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
              onFindMatch={handleFindMatch}
              onGoToLanding={handleGoToLanding}
              onOpenPolicies={handleOpenPolicies}
              onSwitchMode={() => { setUser({...user, role: 'companion'}); setCurrentView('companion_dashboard'); }}
            />
          )}

          {/* Modals */}
          <AuthModal 
            isOpen={isAuthOpen} 
            onClose={() => setIsAuthOpen(false)} 
            onLogin={handleLogin} 
            initialMode={authMode}
            initialRole={authRole}
            onOpenPolicies={handleOpenPolicies}
          />
          
          <SubscriptionModal 
            isOpen={isSubOpen} 
            onClose={() => setIsSubOpen(false)} 
            onSubscribe={handleSubscribe} 
            onOpenPolicies={handleOpenPolicies}
          />
          
          <ChatModal 
            isOpen={isChatOpen} 
            onClose={() => setIsChatOpen(false)} 
            companionName={activeCompanion}
            companionId={null} // Null for now since activeCompanion is a string, handles mock mode gracefully
            user={user}
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
            onOpenPolicies={handleOpenPolicies}
          />

          {/* Wallet Top-Up Modal */}
          <WalletModal
            isOpen={isWalletOpen}
            onClose={() => setIsWalletOpen(false)}
            currentBalance={user?.walletBalance || 0}
            onAddBalance={handleAddWalletBalance}
            onOpenPolicies={handleOpenPolicies}
          />

          <WithdrawModal
            isOpen={isWithdrawOpen}
            onClose={() => setIsWithdrawOpen(false)}
            balance={4250} // Hardcoded for demo
            onWithdrawSuccess={(amt) => console.log('Withdrawn', amt)}
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

          <MatchModal
            isOpen={showMatchModal}
            onClose={() => setShowMatchModal(false)}
            user={user}
            companions={companions}
            onInitiateContact={handleInitiateContact}
          />
        </motion.div>
      )}
      </AnimatePresence>
    </SmoothScroll>
  );
}

export default App;
