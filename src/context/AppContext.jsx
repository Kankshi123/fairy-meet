import React, { createContext, useContext, useState, useEffect } from 'react';

const AppContext = createContext();

export function AppProvider({ children }) {
  // Mock Initial Data
  const initialRequests = [];

  const initialMeetups = [
    { id: 1, name: 'Ananya', date: '18 Sept', time: '6:30 PM', location: 'Rajpur Road', intent: 'Coffee', status: 'Confirmed', image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=200&h=200' },
  ];

  const initialReviews = [
    { id: 1, name: 'Vikram', rating: 5, text: 'Amazing conversation and very polite!', date: '2 days ago' },
    { id: 2, name: 'Sneha', rating: 4, text: 'Had a great time over coffee.', date: '1 week ago' },
  ];

  // Try to load from localStorage first
  const loadState = (key, fallback) => {
    try {
      const saved = localStorage.getItem(`fairymeet_${key}`);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (typeof parsed === 'object' && !Array.isArray(parsed) && parsed !== null) {
          return { ...fallback, ...parsed };
        }
        return parsed;
      }
      return fallback;
    } catch (e) {
      console.error("Error loading state", e);
      return fallback;
    }
  };

  const [requests, setRequests] = useState(() => {
    // Clear out old mock requests from localstorage to fulfill user request
    localStorage.removeItem('fairymeet_requests');
    return initialRequests;
  });
  const [connections, setConnections] = useState(() => loadState('connections', []));
  const [meetups, setMeetups] = useState(() => loadState('meetups', initialMeetups));
  const [reviews, setReviews] = useState(() => loadState('reviews', initialReviews));
  const [unlockedConnections, setUnlockedConnections] = useState(() => loadState('unlockedConnections', []));
  const [chatSubscription, setChatSubscription] = useState(() => loadState('fairymeet_premium_subscription', null));
  const [companionProfile, setCompanionProfile] = useState(() => loadState('companionProfile', {
    bio: "Hi! I love deep conversations, exploring new cafes, and going on long drives. Let's make some memories.",
    services: ['Coffee & Conversation', 'Dinner Dates', 'Weekend Activities', 'Events & Parties', 'Travel Companion'],
    locations: ['Rajpur Road, Dehradun', 'Clement Town', 'Vasant Vihar'],
    isOnline: true,
    recurringHours: [
      { id: 1, day: 'Monday', start: '18:00', end: '22:00' },
      { id: 2, day: 'Tuesday', start: '18:00', end: '22:00' },
      { id: 3, day: 'Wednesday', start: '18:00', end: '22:00' }
    ]
  }));

  useEffect(() => {
    localStorage.setItem('fairymeet_requests', JSON.stringify(requests));
    localStorage.setItem('fairymeet_connections', JSON.stringify(connections));
    localStorage.setItem('fairymeet_meetups', JSON.stringify(meetups));
    localStorage.setItem('fairymeet_reviews', JSON.stringify(reviews));
    localStorage.setItem('fairymeet_unlockedConnections', JSON.stringify(unlockedConnections));
    localStorage.setItem('fairymeet_premium_subscription', JSON.stringify(chatSubscription));
    localStorage.setItem('fairymeet_companionProfile', JSON.stringify(companionProfile));
  }, [requests, connections, meetups, reviews, unlockedConnections, chatSubscription, companionProfile]);

  // Actions
  const updateProfile = (updates) => {
    setCompanionProfile(prev => ({ ...prev, ...updates }));
  };

  const addRequest = (newRequest) => {
    setRequests(prev => [{...newRequest, id: Date.now(), status: 'pending'}, ...prev]);
  };

  const acceptRequest = (id) => {
    setRequests(prev => prev.map(req => req.id === id ? { ...req, status: 'accepted' } : req));
    // Move to connections as well
    const req = requests.find(r => r.id === id);
    if (req && !connections.find(c => c.id === id)) {
      setConnections(prev => [...prev, req]);
    }
  };

  const declineRequest = (id) => {
    setRequests(prev => prev.map(req => req.id === id ? { ...req, status: 'declined' } : req));
  };

  const completeRequest = (id) => {
    setRequests(prev => prev.map(req => req.id === id ? { ...req, status: 'completed' } : req));
  };

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

  return (
    <AppContext.Provider value={{
      requests, setRequests,
      connections, setConnections,
      meetups, setMeetups,
      reviews, setReviews,
      unlockedConnections, setUnlockedConnections,
      chatSubscription, setChatSubscription,
      companionProfile, updateProfile,
      addRequest, acceptRequest, declineRequest, completeRequest, bookService, subscribeToChatPlan,
      checkSubscription
    }}>
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  return useContext(AppContext);
}
