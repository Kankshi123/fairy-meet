import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { User, Link as LinkIcon, QrCode, Smile, Edit2, X, Check } from 'lucide-react';

export default function MyProfilePhotoModal({ user, onClose }) {
  const [toast, setToast] = useState(null);
  const fileInputRef = useRef(null);

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    showToast('Profile link copied to clipboard!');
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Fairy Meet Profile',
          text: `Check out ${user?.name || 'my'} profile on Fairy Meet!`,
          url: window.location.href,
        });
      } catch (err) {
        console.error('Error sharing:', err);
      }
    } else {
      handleCopyLink();
    }
  };

  const handleQrCode = () => {
    showToast('QR Code generated! (Demo functionality)');
  };

  const handleFileSelect = (e) => {
    if (e.target.files && e.target.files[0]) {
      showToast('Profile photo updated successfully!');
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="fixed inset-0 z-[400] flex flex-col items-center justify-center">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-rich-black/90 backdrop-blur-sm"
      />
      
      <button onClick={onClose} className="absolute top-6 left-6 z-10 text-white p-2">
        <X className="w-6 h-6" />
      </button>

      {/* Hidden File Input */}
      <input 
        type="file" 
        accept="image/*" 
        ref={fileInputRef} 
        onChange={handleFileSelect} 
        className="hidden" 
      />

      {/* Toast Notification */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-20 z-50 bg-white text-rich-black px-6 py-3 rounded-full shadow-xl flex items-center gap-2 font-medium"
          >
            <Check className="w-5 h-5 text-green-500" />
            {toast}
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div 
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 20 }}
        className="relative z-10 flex flex-col items-center w-full"
      >
        <div className="relative w-64 h-64 md:w-80 md:h-80 rounded-full border-4 border-white/10 shadow-2xl mb-24">
          {user?.photo ? (
            <img src={user.photo} alt="My Profile" className="w-full h-full rounded-full object-cover" />
          ) : (
            <div className="w-full h-full rounded-full bg-vibrant-pink flex items-center justify-center text-white text-6xl font-serif">
              {user?.name?.charAt(0) || 'S'}
            </div>
          )}
          <button 
            onClick={triggerFileInput}
            className="absolute bottom-4 right-4 w-12 h-12 bg-rich-black/80 backdrop-blur-md rounded-full border border-white/20 flex items-center justify-center text-white hover:bg-vibrant-pink hover:border-transparent transition-colors shadow-lg cursor-pointer"
          >
            <Edit2 className="w-5 h-5" />
          </button>
        </div>

        <div className="flex justify-center gap-6 md:gap-12 w-full px-4">
          <button onClick={handleShare} className="flex flex-col items-center gap-3 text-white/70 hover:text-white transition-colors group cursor-pointer">
            <div className="w-16 h-16 rounded-full border border-white/20 flex items-center justify-center group-hover:bg-white/10 transition-colors">
              <User className="w-7 h-7" />
            </div>
            <span className="text-xs font-medium">Share profile</span>
          </button>
          
          <button onClick={handleCopyLink} className="flex flex-col items-center gap-3 text-white/70 hover:text-white transition-colors group cursor-pointer">
            <div className="w-16 h-16 rounded-full border border-white/20 flex items-center justify-center group-hover:bg-white/10 transition-colors">
              <LinkIcon className="w-7 h-7" />
            </div>
            <span className="text-xs font-medium">Copy link</span>
          </button>
          
          <button onClick={handleQrCode} className="flex flex-col items-center gap-3 text-white/70 hover:text-white transition-colors group cursor-pointer">
            <div className="w-16 h-16 rounded-full border border-white/20 flex items-center justify-center group-hover:bg-white/10 transition-colors">
              <QrCode className="w-7 h-7" />
            </div>
            <span className="text-xs font-medium">QR code</span>
          </button>
          
          <button onClick={triggerFileInput} className="flex flex-col items-center gap-3 text-white/70 hover:text-white transition-colors group cursor-pointer">
            <div className="w-16 h-16 rounded-full border border-white/20 flex items-center justify-center group-hover:bg-white/10 transition-colors">
              <Smile className="w-7 h-7" />
            </div>
            <span className="text-xs font-medium">Add avatar</span>
          </button>
        </div>
      </motion.div>
    </div>
  );
}
