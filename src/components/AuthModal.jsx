import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ArrowRight, Camera, CheckCircle, ScanFace } from 'lucide-react';

const WebcamCapture = ({ onCapture }) => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [stream, setStream] = useState(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    let activeStream = null;
    const startCamera = async () => {
      try {
        const mediaStream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: "user" } });
        activeStream = mediaStream;
        setStream(mediaStream);
        if (videoRef.current) {
          videoRef.current.srcObject = mediaStream;
        }
      } catch (err) {
        console.error("Error accessing camera:", err);
        setError(true);
      }
    };
    startCamera();
    return () => {
      if (activeStream) {
        activeStream.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  const capture = () => {
    if (videoRef.current && canvasRef.current) {
      const context = canvasRef.current.getContext('2d');
      // Set canvas size equal to video dimensions for clear capture
      canvasRef.current.width = videoRef.current.videoWidth;
      canvasRef.current.height = videoRef.current.videoHeight;
      context.drawImage(videoRef.current, 0, 0, canvasRef.current.width, canvasRef.current.height);
      const dataUrl = canvasRef.current.toDataURL('image/jpeg');
      onCapture(dataUrl);
    }
  };

  if (error) {
    return (
      <div className="text-center p-4 bg-vibrant-pink/10 rounded-xl text-vibrant-pink font-sans text-sm">
        Unable to access camera. Please check your browser permissions.
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center gap-6">
      <div className="relative w-48 h-48 rounded-full overflow-hidden border-4 border-vibrant-pink bg-rich-black/5 shadow-soft">
        <video 
          ref={videoRef} 
          autoPlay 
          playsInline 
          muted
          className="w-full h-full object-cover transform -scale-x-100" 
        />
        <canvas ref={canvasRef} className="hidden" />
      </div>
      <button 
        onClick={capture} 
        type="button" 
        className="flex items-center gap-2 bg-rich-black text-pure-white font-sans text-sm font-medium px-6 py-3 rounded-pill hover:bg-vibrant-pink transition-all shadow-sm hover:shadow-hover hover:-translate-y-0.5"
      >
        <Camera className="w-4 h-4" /> Capture Photo
      </button>
    </div>
  );
};

export default function AuthModal({ isOpen, onClose, onLogin, initialMode = 'signup' }) {
  const [mode, setMode] = useState('signup'); // 'login' or 'signup'
  const [step, setStep] = useState(1);
  const [gender, setGender] = useState('');
  
  // Verification states
  const [capturedImage, setCapturedImage] = useState(null);
  const [isVerifying, setIsVerifying] = useState(false);
  const [verificationSuccess, setVerificationSuccess] = useState(false);
  
  // Vibe Check state
  const [quizAnswers, setQuizAnswers] = useState({});
  const quizQuestions = [
    { id: 'q1', question: 'Ideal first date?', options: ['Coffee Shop', 'Cocktail Bar', 'Adventure', 'Cozy Inside'] },
    { id: 'q2', question: 'Communication style?', options: ['Text all day', 'Voice Notes', 'Long Calls', 'In-person'] },
    { id: 'q3', question: 'Weekend vibe?', options: ['Party time', 'Nature walks', 'Binge-watching', 'Socializing'] }
  ];

  // Storing form data temporarily
  const [formData, setFormData] = useState({});

  useEffect(() => {
    if (isOpen) {
      setMode(initialMode || 'signup');
      setStep(1);
      setGender('');
      setCapturedImage(null);
      setIsVerifying(false);
      setVerificationSuccess(false);
      setFormData({});
      setQuizAnswers({});
    }
  }, [isOpen, initialMode]);

  if (!isOpen) return null;

  const handleNext = () => {
    if (gender) setStep(2);
  };

  const handleSignupFormSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    setFormData({
      ...formData,
      name: form.firstName.value,
      email: form.email.value,
      aadhaar: form.aadhaar.value
    });
    setStep(3); // Move to Vibe Check
  };

  const handleQuizSubmit = () => {
    if (Object.keys(quizAnswers).length === quizQuestions.length) {
      setStep(4); // Move to Face Verification
    }
  };

  const handleLoginFormSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    setFormData({ 
      mockGender: form.mockGender.value,
      email: form.email.value,
      name: 'Seeker', // Default for login since we don't have it
      aadhaar: 'XXXX XXXX XXXX'
    });
    setStep(2); // Move to Face Verification
  };

  const handleSignupCapture = (dataUrl) => {
    setCapturedImage(dataUrl);
    // Mock saving to DB by using localStorage
    localStorage.setItem('userFaceData', dataUrl);
    setVerificationSuccess(true);
    
    // Automatically login after success
    setTimeout(() => {
      onLogin(gender, formData);
    }, 1500);
  };

  const handleLoginCapture = (dataUrl) => {
    setCapturedImage(dataUrl);
    setIsVerifying(true);
    
    // Simulate AI matching process
    setTimeout(() => {
      setIsVerifying(false);
      setVerificationSuccess(true);
      
      // Automatically login after success
      setTimeout(() => {
        onLogin(formData.mockGender || 'Female', formData);
      }, 1500);
    }, 2500);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-rich-black/40 backdrop-blur-sm"
        />
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-md max-h-[95vh] sm:max-h-[90vh] bg-off-white rounded-2xl md:rounded-[32px] shadow-hover overflow-hidden flex flex-col"
        >
          {/* Header */}
          <div className="flex justify-between items-center p-6 border-b border-rich-black/10">
            <div className="flex gap-4">
              <button 
                onClick={() => { setMode('login'); setStep(1); setCapturedImage(null); }}
                className={`font-serif text-2xl transition-colors ${mode === 'login' ? 'text-rich-black' : 'text-rich-black/40 hover:text-rich-black/70'}`}
              >
                Log In
              </button>
              <span className="font-serif text-2xl text-rich-black/20">|</span>
              <button 
                onClick={() => { setMode('signup'); setStep(1); setGender(''); setCapturedImage(null); }}
                className={`font-serif text-2xl transition-colors ${mode === 'signup' ? 'text-rich-black' : 'text-rich-black/40 hover:text-rich-black/70'}`}
              >
                Sign Up
              </button>
            </div>
            <button 
              onClick={onClose}
              className="w-8 h-8 flex items-center justify-center rounded-full bg-off-white text-rich-black hover:bg-vibrant-pink hover:text-white transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Content */}
          <div className="p-6 md:p-8 overflow-y-auto">
            
            {/* SIGN UP FLOW */}
            {mode === 'signup' && step === 1 && (
              <motion.div 
                key="signup-step1"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
              >
                <h3 className="font-sans text-lg font-semibold text-rich-black mb-2">How do you identify?</h3>
                <p className="font-sans text-sm text-rich-black/60 mb-6">
                  Fairy Meet is an inclusive space. We ask this to curate your experience.
                </p>
                
                <div className="space-y-3 mb-8">
                  {['Female', 'Male', 'LGBTQ+'].map(option => (
                    <button
                      key={option}
                      onClick={() => setGender(option)}
                      className={`w-full text-left px-6 py-4 rounded-xl border transition-all ${
                        gender === option 
                          ? 'border-vibrant-pink bg-off-white text-rich-black shadow-sm' 
                          : 'border-rich-black/20 bg-white text-rich-black/80 hover:border-vibrant-pink/50'
                      }`}
                    >
                      <span className="font-sans font-medium text-base">{option}</span>
                    </button>
                  ))}
                </div>

                <button 
                  onClick={handleNext}
                  disabled={!gender}
                  className="w-full flex items-center justify-center gap-2 bg-rich-black text-pure-white font-sans text-base font-medium px-8 py-4 rounded-pill hover:bg-rich-black disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                >
                  Continue <ArrowRight className="w-4 h-4" />
                </button>
              </motion.div>
            )}

            {mode === 'signup' && step === 2 && (
              <motion.div 
                key="signup-step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
              >
                <form onSubmit={handleSignupFormSubmit} className="space-y-4">
                  <div>
                    <label className="block font-sans text-sm font-medium text-rich-black mb-1.5">First Name</label>
                    <input 
                      type="text" 
                      name="firstName"
                      required
                      placeholder="e.g. Maya"
                      className="w-full bg-white border border-rich-black/20 rounded-xl px-4 py-3 font-sans text-rich-black outline-none focus:border-vibrant-pink focus:ring-1 focus:ring-vibrant-pink transition-all"
                    />
                  </div>
                  <div>
                    <label className="block font-sans text-sm font-medium text-rich-black mb-1.5">Email</label>
                    <input 
                      type="email" 
                      name="email"
                      required
                      placeholder="maya@example.com"
                      className="w-full bg-white border border-rich-black/20 rounded-xl px-4 py-3 font-sans text-rich-black outline-none focus:border-vibrant-pink focus:ring-1 focus:ring-vibrant-pink transition-all"
                    />
                  </div>
                  <div>
                    <label className="block font-sans text-sm font-medium text-rich-black mb-1.5">Aadhaar Number</label>
                    <input 
                      type="text" 
                      name="aadhaar"
                      required
                      pattern="\d{12}"
                      title="Please enter a valid 12-digit Aadhaar number"
                      placeholder="1234 5678 9012"
                      className="w-full bg-white border border-rich-black/20 rounded-xl px-4 py-3 font-sans text-rich-black outline-none focus:border-vibrant-pink focus:ring-1 focus:ring-vibrant-pink transition-all"
                    />
                  </div>
                  <div>
                    <label className="block font-sans text-sm font-medium text-rich-black mb-1.5">Password</label>
                    <input 
                      type="password" 
                      required
                      placeholder="••••••••"
                      className="w-full bg-white border border-rich-black/20 rounded-xl px-4 py-3 font-sans text-rich-black outline-none focus:border-vibrant-pink focus:ring-1 focus:ring-vibrant-pink transition-all"
                    />
                  </div>
                  <div className="pt-4">
                    <button 
                      type="submit"
                      className="w-full flex items-center justify-center gap-2 bg-rich-black text-pure-white font-sans text-base font-medium px-8 py-4 rounded-pill hover:bg-vibrant-pink hover:-translate-y-0.5 transition-all"
                    >
                      Continue to Verification <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </form>
              </motion.div>
            )}

            {mode === 'signup' && step === 3 && (
              <motion.div 
                key="signup-step3"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
              >
                <h3 className="font-sans text-xl font-semibold text-rich-black mb-2">Vibe Check ✨</h3>
                <p className="font-sans text-sm text-rich-black/60 mb-6">
                  Answer a few quick questions to help us find your perfect match.
                </p>

                <div className="space-y-6 mb-8">
                  {quizQuestions.map((q) => (
                    <div key={q.id}>
                      <p className="font-sans text-sm font-medium text-rich-black mb-3">{q.question}</p>
                      <div className="flex flex-wrap gap-2">
                        {q.options.map(opt => (
                          <button
                            key={opt}
                            onClick={() => setQuizAnswers(prev => ({ ...prev, [q.id]: opt }))}
                            className={`px-4 py-2 rounded-full border text-sm font-sans transition-all ${
                              quizAnswers[q.id] === opt 
                                ? 'bg-vibrant-pink border-vibrant-pink text-white shadow-sm'
                                : 'bg-white border-rich-black/20 text-rich-black/80 hover:border-vibrant-pink'
                            }`}
                          >
                            {opt}
                          </button>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>

                <button 
                  onClick={handleQuizSubmit}
                  disabled={Object.keys(quizAnswers).length !== quizQuestions.length}
                  className="w-full flex items-center justify-center gap-2 bg-rich-black text-pure-white font-sans text-base font-medium px-8 py-4 rounded-pill hover:bg-vibrant-pink disabled:opacity-50 disabled:hover:bg-rich-black disabled:cursor-not-allowed transition-all"
                >
                  Almost there <ArrowRight className="w-4 h-4" />
                </button>
              </motion.div>
            )}

            {mode === 'signup' && step === 4 && (
              <motion.div 
                key="signup-step4"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center text-center"
              >
                <h3 className="font-sans text-xl font-semibold text-rich-black mb-2">Face Verification</h3>
                <p className="font-sans text-sm text-rich-black/60 mb-8 max-w-[250px]">
                  Take a quick selfie to secure your profile and keep our community safe.
                </p>

                {verificationSuccess ? (
                  <motion.div 
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="flex flex-col items-center gap-4 py-8"
                  >
                    <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center">
                      <CheckCircle className="w-10 h-10 text-white" />
                    </div>
                    <p className="font-sans font-medium text-green-600 text-lg">Face Registered!</p>
                    <p className="font-sans text-sm text-rich-black/60">Creating your profile...</p>
                  </motion.div>
                ) : (
                  <WebcamCapture onCapture={handleSignupCapture} />
                )}
              </motion.div>
            )}

            {/* LOG IN FLOW */}
            {mode === 'login' && step === 1 && (
              <motion.div 
                key="login-step1"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <form onSubmit={handleLoginFormSubmit} className="space-y-4">
                  <div>
                    <label className="block font-sans text-sm font-medium text-rich-black mb-1.5">Email</label>
                    <input 
                      type="email"
                      name="email" 
                      required
                      placeholder="maya@example.com"
                      className="w-full bg-white border border-rich-black/20 rounded-xl px-4 py-3 font-sans text-rich-black outline-none focus:border-vibrant-pink focus:ring-1 focus:ring-vibrant-pink transition-all"
                    />
                  </div>
                  <div>
                    <label className="block font-sans text-sm font-medium text-rich-black mb-1.5">Password</label>
                    <input 
                      type="password" 
                      required
                      placeholder="••••••••"
                      className="w-full bg-white border border-rich-black/20 rounded-xl px-4 py-3 font-sans text-rich-black outline-none focus:border-vibrant-pink focus:ring-1 focus:ring-vibrant-pink transition-all"
                    />
                  </div>
                  
                  {/* Mock Gender for Dashboard Logic */}
                  <div className="pt-2 pb-2">
                    <label className="block font-sans text-xs font-semibold text-rich-black/50 mb-1.5 uppercase tracking-wider">Test Dashboard As:</label>
                    <select 
                      name="mockGender"
                      className="w-full bg-off-white border border-vibrant-pink/30 rounded-xl px-4 py-2 font-sans text-sm text-rich-black outline-none"
                    >
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="LGBTQ+">LGBTQ+</option>
                    </select>
                  </div>

                  <div className="pt-2">
                    <button 
                      type="submit"
                      className="w-full flex items-center justify-center gap-2 bg-rich-black text-pure-white font-sans text-base font-medium px-8 py-4 rounded-pill hover:bg-vibrant-pink hover:-translate-y-0.5 transition-all"
                    >
                      Log In <ScanFace className="w-5 h-5 ml-1" />
                    </button>
                  </div>
                </form>
              </motion.div>
            )}

            {mode === 'login' && step === 2 && (
              <motion.div 
                key="login-step2"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center text-center"
              >
                <h3 className="font-sans text-xl font-semibold text-rich-black mb-2">Verify Identity</h3>
                <p className="font-sans text-sm text-rich-black/60 mb-8 max-w-[250px]">
                  Confirm it's really you to access your profile.
                </p>

                {!capturedImage ? (
                  <WebcamCapture onCapture={handleLoginCapture} />
                ) : (
                  <div className="flex flex-col items-center gap-6 py-4">
                    <div className="relative w-48 h-48 rounded-full overflow-hidden border-4 border-vibrant-pink">
                      <img src={capturedImage} alt="Captured" className="w-full h-full object-cover transform -scale-x-100" />
                      
                      {/* Scanning Animation */}
                      {isVerifying && (
                        <motion.div 
                          className="absolute inset-0 bg-gradient-to-b from-transparent via-vibrant-pink/40 to-transparent"
                          animate={{ y: ['-100%', '100%'] }}
                          transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                        />
                      )}
                    </div>
                    
                    {isVerifying && (
                      <div className="flex flex-col items-center gap-2">
                        <div className="w-6 h-6 border-2 border-vibrant-pink border-t-transparent rounded-full animate-spin"></div>
                        <p className="font-sans text-sm font-medium text-vibrant-pink animate-pulse">Matching with database...</p>
                      </div>
                    )}

                    {verificationSuccess && (
                      <motion.div 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex flex-col items-center gap-2"
                      >
                        <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center mb-2 shadow-soft">
                          <CheckCircle className="w-6 h-6 text-white" />
                        </div>
                        <p className="font-sans font-medium text-green-600 text-lg">Verification Successful!</p>
                        <p className="font-sans text-sm text-rich-black/60">Logging you in...</p>
                      </motion.div>
                    )}
                  </div>
                )}
              </motion.div>
            )}

          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
