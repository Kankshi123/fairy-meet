import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Lock, CheckCircle2, Sparkles, Crown, Zap } from 'lucide-react';
import { useAppContext } from '../context/AppContext';

const plans = [
  {
    id: 'free',
    label: 'Free Trial',
    sublabel: '7 days',
    price: 0,
    priceLabel: 'FREE',
    description: 'Try Fairy Meet chat for 7 days',
    icon: Sparkles,
    color: 'bg-green-50 border-green-200',
    iconColor: 'text-green-600',
    badge: null,
  },
  {
    id: '1month',
    label: '1-Month Pass',
    sublabel: '1 month',
    price: 199,
    priceLabel: '₹199',
    description: 'Unlimited chats for 1 month',
    icon: Zap,
    color: 'bg-white border-rich-black/15',
    iconColor: 'text-vibrant-pink',
    badge: null,
  },
  {
    id: '3months',
    label: '3-Month Pass',
    sublabel: '3 months',
    price: 499,
    priceLabel: '₹499',
    description: 'Best value for regular users',
    icon: Zap,
    color: 'bg-white border-rich-black/15',
    iconColor: 'text-vibrant-pink',
    badge: 'Popular',
  },
  {
    id: '1year',
    label: 'Annual Pass',
    sublabel: '1 year',
    price: 799,
    priceLabel: '₹799',
    description: 'Full year of unlimited chats',
    icon: Crown,
    color: 'bg-rich-black border-rich-black',
    iconColor: 'text-yellow-400',
    badge: 'Best Deal',
    dark: true,
  },
];

export default function ChatSubscriptionModal({ isOpen, onClose, onSubscribed }) {
  const { subscribeToChatPlan } = useAppContext();
  const [selectedPlan, setSelectedPlan] = useState('1month');
  const [isProcessing, setIsProcessing] = useState(false);
  const [success, setSuccess] = useState(false);

  if (!isOpen) return null;

  const handleActivate = () => {
    setIsProcessing(true);
    setTimeout(() => {
      subscribeToChatPlan(selectedPlan);
      setSuccess(true);
      setIsProcessing(false);
      setTimeout(() => {
        onSubscribed();
        onClose();
      }, 1200);
    }, 1500);
  };

  const selected = plans.find(p => p.id === selectedPlan);

  return (
    <div className="fixed inset-0 z-[400] flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-rich-black/60 backdrop-blur-md"
      />

      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="relative w-full max-w-sm bg-off-white rounded-[32px] shadow-hover z-10 overflow-hidden"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-8 h-8 flex items-center justify-center rounded-full bg-white/50 backdrop-blur-md text-rich-black hover:bg-vibrant-pink hover:text-white transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        <AnimatePresence mode="wait">
          {success ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex flex-col items-center justify-center text-center p-10 gap-4"
            >
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                <CheckCircle2 className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="font-serif text-2xl text-rich-black">Access Unlocked!</h3>
              <p className="font-sans text-sm text-rich-black/60">You can now view profiles and chat with connections.</p>
            </motion.div>
          ) : (
            <motion.div key="plans" className="p-6 space-y-5">
              {/* Header */}
              <div className="flex flex-col items-center text-center pt-2 pb-1">
                <div className="w-14 h-14 bg-vibrant-pink/10 rounded-full flex items-center justify-center mb-4">
                  <Lock className="w-7 h-7 text-vibrant-pink" />
                </div>
                <h2 className="font-serif text-2xl text-rich-black mb-2">Unlock Premium Access</h2>
                <p className="font-sans text-sm text-rich-black/60 max-w-xs">
                  Choose a subscription pass to unlock profiles, accept requests, and start chatting.
                </p>
              </div>

              {/* Plans */}
              <div className="space-y-3">
                {plans.map(plan => {
                  const Icon = plan.icon;
                  const isSelected = selectedPlan === plan.id;
                  return (
                    <button
                      key={plan.id}
                      onClick={() => setSelectedPlan(plan.id)}
                      className={`w-full text-left p-4 rounded-2xl border-2 transition-all flex items-center gap-4 relative overflow-hidden ${
                        isSelected
                          ? plan.dark
                            ? 'bg-rich-black border-rich-black'
                            : plan.id === 'free'
                              ? 'bg-green-50 border-green-500'
                              : 'bg-vibrant-pink/5 border-vibrant-pink'
                          : plan.dark
                            ? 'bg-rich-black/5 border-rich-black/10 hover:border-rich-black/30'
                            : 'bg-white border-rich-black/10 hover:border-rich-black/30'
                      }`}
                    >
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                        isSelected && !plan.dark ? 'bg-vibrant-pink/10' :
                        isSelected && plan.dark ? 'bg-yellow-400/20' :
                        plan.id === 'free' ? 'bg-green-100' : 'bg-off-white'
                      }`}>
                        <Icon className={`w-5 h-5 ${
                          isSelected && plan.dark ? 'text-yellow-400' :
                          isSelected ? 'text-vibrant-pink' :
                          plan.id === 'free' ? 'text-green-600' :
                          'text-rich-black/50'
                        }`} />
                      </div>

                      <div className="flex-1 min-w-0">
                        <p className={`font-sans font-bold text-sm ${plan.dark ? (isSelected ? 'text-white' : 'text-white/90') : 'text-rich-black'}`}>
                          {plan.label}
                        </p>
                        <p className={`font-sans text-xs mt-0.5 ${plan.dark ? 'text-white/60' : 'text-rich-black/50'}`}>
                          {plan.description}
                        </p>
                      </div>

                      <div className="text-right shrink-0">
                        <p className={`font-serif text-xl font-bold ${
                          plan.id === 'free' ? 'text-green-600' :
                          plan.dark ? (isSelected ? 'text-yellow-400' : 'text-white') :
                          isSelected ? 'text-vibrant-pink' : 'text-rich-black'
                        }`}>
                          {plan.priceLabel}
                        </p>
                        <p className={`font-sans text-[10px] ${plan.dark ? 'text-white/50' : 'text-rich-black/40'}`}>
                          {plan.sublabel}
                        </p>
                      </div>

                      {plan.badge && (
                        <span className={`absolute top-2 right-2 text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${
                          plan.dark ? 'bg-yellow-400 text-rich-black' : 'bg-vibrant-pink text-white'
                        }`}>
                          {plan.badge}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>

              {/* CTA */}
              <div className="space-y-3">
                <button
                  onClick={handleActivate}
                  disabled={isProcessing}
                  className="w-full bg-rich-black text-pure-white font-sans font-bold py-4 rounded-2xl hover:bg-vibrant-pink transition-all disabled:opacity-50 flex items-center justify-center gap-2 text-sm"
                >
                  {isProcessing ? (
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <>
                      {selected?.id === 'free' ? 'Activate Free Pass' : `Pay ${selected?.priceLabel} & Activate`}
                    </>
                  )}
                </button>
                <p className="text-center font-sans text-[10px] text-rich-black/40">
                  Refund & Cancellation Policy applies. Auto-renewal off.
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
