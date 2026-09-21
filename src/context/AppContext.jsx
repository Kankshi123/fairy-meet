import React, { createContext, useContext, useState, useEffect } from 'react';

import { supabase } from '../lib/supabaseClient';

const AppContext = createContext();

export function AppProvider({ children }) {
  const [connections, setConnections] = useState([]);
  const [meetups, setMeetups] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [unlockedConnections, setUnlockedConnections] = useState([]);
  const [chatSubscription, setChatSubscription] = useState(null);
  const [companionProfile, setCompanionProfile] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);

  // Listen to auth changes and fetch user data
  useEffect(() => {
    let subscriptionAuth;
    const fetchUserData = async (userId) => {
      if (!userId) return;
      
      // Fetch meetups
      const { data: meetupsData } = await supabase
        .from('meetups')
        .select('*')
        .or(`requester_id.eq.${userId},companion_id.eq.${userId}`);
      if (meetupsData) setMeetups(meetupsData);

      // Fetch reviews
      const { data: reviewsData } = await supabase
        .from('reviews')
        .select('*')
        .eq('companion_id', userId);
      if (reviewsData) setReviews(reviewsData);

      // MOCK CONNECTIONS FETCH
      const storedConns = localStorage.getItem('fairymeet_connections');
      if (storedConns) {
        try {
          const parsed = JSON.parse(storedConns);
          setConnections(parsed.filter(c => c.seeker_id === userId || c.companion_id === userId));
        } catch(e) {}
      }
      
      // Fetch profile data for companion mode
      let { data: profileData } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .maybeSingle();
      
      if (!profileData) {
        // Create a default profile row if one doesn't exist
        const newProfile = { id: userId, is_online: false };
        const { error: insertError } = await supabase.from('profiles').insert([newProfile]);
        if (insertError) {
          console.error("Failed to insert default profile:", insertError);
        }
        profileData = newProfile;
      }
      
      setCompanionProfile({
        bio: profileData.bio || '',
        services: profileData.services || [],
        locations: profileData.locations || [],
        recurringHours: profileData.recurringHours || [],
        isOnline: profileData.is_online || false,
        role: profileData.role || 'Seeker',
        city: profileData.city || '',
        pincode: profileData.pincode || '',
        name: profileData.name || '',
        gender: profileData.gender || '',
        avatar_url: profileData.avatar_url || '',
        email: profileData.email || ''
      });
    };

    supabase.auth.getSession().then(({ data: { session } }) => {
      setCurrentUser(session?.user || null);
      if (session?.user) fetchUserData(session.user.id);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setCurrentUser(session?.user || null);
      if (session?.user) {
        fetchUserData(session.user.id);
      } else {
        setMeetups([]);
        setReviews([]);
        setConnections([]);
        setCompanionProfile(null);
      }
    });
    
    subscriptionAuth = subscription;
    return () => subscriptionAuth?.unsubscribe();
  }, []);

  // Actions
  const updateProfile = async (updates) => {
    // Always update UI immediately (optimistic update)
    setCompanionProfile(prev => ({ ...prev, ...updates }));

    if (!currentUser) {
      console.warn('updateProfile: No authenticated user, skipping DB save');
      return;
    }
    
    // Map internal updates to DB column names if necessary
    const dbUpdates = {};
    if (updates.bio !== undefined) dbUpdates.bio = updates.bio;
    if (updates.services !== undefined) dbUpdates.services = updates.services;
    if (updates.locations !== undefined) dbUpdates.locations = updates.locations;
    if (updates.recurringHours !== undefined) dbUpdates.recurringHours = updates.recurringHours;
    if (updates.isOnline !== undefined) dbUpdates.is_online = updates.isOnline;

    try {
      const { error } = await supabase
        .from('profiles')
        .update(dbUpdates)
        .eq('id', currentUser.id);
        
      if (error) {
        console.warn('Profile save to DB failed (will retry on next interaction):', error.message || error);
      }
    } catch (networkErr) {
      console.warn('Network error saving profile:', networkErr.message);
    }
  };

  const updateMockConnection = (id, status) => {
    try {
      const stored = JSON.parse(localStorage.getItem('fairymeet_connections') || '[]');
      const updated = stored.map(c => c.id === id ? { ...c, status } : c);
      localStorage.setItem('fairymeet_connections', JSON.stringify(updated));
      setConnections(updated.filter(c => c.seeker_id === currentUser?.id || c.companion_id === currentUser?.id));
    } catch(e) {}
  };

  const acceptRequest = async (id) => updateMockConnection(id, 'accepted');
  const declineRequest = async (id) => updateMockConnection(id, 'declined');
  const completeRequest = async (id) => updateMockConnection(id, 'completed');

  const bookService = (companionId) => {
    setUnlockedConnections(prev => {
      if (!prev.includes(companionId)) {
        return [...prev, companionId];
      }
      return prev;
    });
  };

  const subscribeToChatPlan = (plan) => {
    const now = new Date();
    const expiresAt = new Date(now);
    if (plan === 'free') expiresAt.setDate(now.getDate() + 7);
    else if (plan === '1month') expiresAt.setMonth(now.getMonth() + 1);
    else if (plan === '3months') expiresAt.setMonth(now.getMonth() + 3);
    else if (plan === '1year') expiresAt.setFullYear(now.getFullYear() + 1);
    setChatSubscription({ plan, expiresAt: expiresAt.toISOString() });
  };

  const checkSubscription = (user, mode) => {
    const hasActiveSub = chatSubscription && new Date(chatSubscription.expiresAt) > new Date();
    
    if (mode === 'seeker') {
      // Seekers of ALL genders must pay
      return hasActiveSub;
    } else if (mode === 'companion') {
      // Companion females are free. Males and LGBTQ must pay
      if (user?.gender === 'Female') return true;
      return hasActiveSub;
    }
    return false;
  };

  const sendConnectionRequest = async (companionId) => {
    if (!currentUser) return;
    
    // MOCK SEND CONNECTION
    const newReq = { 
      id: Math.random().toString(36).substr(2, 9),
      seeker_id: currentUser.id, 
      companion_id: companionId, 
      status: 'pending',
      // Provide mock profile details for the dashboard to render
      seeker: { name: 'Test Seeker', gender: 'Female', avatar_url: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=600&auto=format&fit=crop&q=80', age: 24, city: 'New Delhi' },
      companion: { name: 'Test Companion', gender: 'Female', avatar_url: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=600&auto=format&fit=crop&q=80' }
    };
    
    try {
      const stored = JSON.parse(localStorage.getItem('fairymeet_connections') || '[]');
      stored.push(newReq);
      localStorage.setItem('fairymeet_connections', JSON.stringify(stored));
      setConnections(stored.filter(c => c.seeker_id === currentUser.id || c.companion_id === currentUser.id));
      alert("Connection request sent (Mock)!");
    } catch(e) {
      alert("Could not send mock request right now.");
    }
  };

  // Sync mock connections continuously so the Companion tab updates when Seeker clicks like
  useEffect(() => {
    const interval = setInterval(() => {
      if (currentUser) {
        try {
          const stored = JSON.parse(localStorage.getItem('fairymeet_connections') || '[]');
          const userConns = stored.filter(c => c.seeker_id === currentUser.id || c.companion_id === currentUser.id);
          setConnections(prev => prev.length !== userConns.length ? userConns : prev);
        } catch(e) {}
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [currentUser]);

  return (
    <AppContext.Provider value={{
      connections, setConnections,
      meetups, setMeetups,
      reviews, setReviews,
      unlockedConnections, setUnlockedConnections,
      chatSubscription, setChatSubscription,
      companionProfile, updateProfile,
      currentUser,
      acceptRequest, declineRequest, completeRequest, bookService, subscribeToChatPlan,
      checkSubscription, sendConnectionRequest
    }}>
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  return useContext(AppContext);
}
