import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Marquee from './components/Marquee';
import WhyFairyMeet from './components/WhyFairyMeet';
import DiscoverSection from './components/DiscoverSection';
import CompatibilitySection from './components/CompatibilitySection';
import HowItWorks from './components/HowItWorks';
import Stories from './components/Stories';
import SafetySection from './components/SafetySection';
import FinalCTA from './components/FinalCTA';
import Footer from './components/Footer';

const LandingPage = ({ onOpenAuth, onFindMatch, user, onGoToDashboard, onOpenPolicies }) => {
  return (
    <div id="app-root" className="bg-off-white text-rich-black overflow-x-hidden min-h-screen flex flex-col w-full relative">
      <Navbar onOpenAuth={onOpenAuth} onFindMatch={onFindMatch} user={user} onGoToDashboard={onGoToDashboard} />
      <main className="flex-grow">
        <Hero onOpenAuth={onOpenAuth} onFindMatch={onFindMatch} />
        <Marquee />
        <WhyFairyMeet />
        <DiscoverSection onOpenAuth={onOpenAuth} />
        <CompatibilitySection />
        <HowItWorks />
        <Stories />
        <SafetySection />
        <FinalCTA onOpenAuth={onOpenAuth} />
      </main>
      <Footer onOpenPolicies={onOpenPolicies} />
    </div>
  );
};

export default LandingPage;
