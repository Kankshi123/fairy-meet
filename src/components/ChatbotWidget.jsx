import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send, Sparkles } from "lucide-react";

const BOT_RESPONSES = [
  "Great question! Try being genuine and specific in your opening message. Mention something from their profile!",
  "Dating tip: Focus on open-ended questions. It shows you are genuinely curious about them.",
  "Fairy Meet connects real people. Be yourself, that is your biggest superpower!",
  "Feeling nervous before a first date? Try meeting somewhere comfortable for both of you, like a cozy cafe!",
  "A great bio is honest, fun, and specific. Instead of I love travel, say I have hiked in the Himalayas and want to try the Sahara next!",
  "Respect and kindness go a long way. A simple compliment can make someone day brighter!",
  "If you are not feeling a connection, it is perfectly okay to be honest and polite about it. Honesty is always the best policy.",
  "Pro tip: Schedule your date at a time when you are relaxed and well-rested. First impressions matter!",
];

let botIndex = 0;
const getNextBotResponse = () => {
  const response = BOT_RESPONSES[botIndex % BOT_RESPONSES.length];
  botIndex++;
  return response;
};

export default function ChatbotWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { id: 1, from: "bot", text: "Hi! I am your Fairy Meet Wingman. Ask me anything about dating tips, profile advice, or just say hello!" }
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isOpen, isTyping]);

  const handleSend = () => {
    const text = inputValue.trim();
    if (!text) return;
    setMessages(prev => [...prev, { id: Date.now(), from: "user", text }]);
    setInputValue("");
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      setMessages(prev => [...prev, { id: Date.now() + 1, from: "bot", text: getNextBotResponse() }]);
    }, 1200 + Math.random() * 600);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); handleSend(); }
  };

  return (
    <div className="fixed bottom-6 right-6 z-[200] flex flex-col items-end gap-4">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.85, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.85, y: 20 }}
            transition={{ type: "spring", stiffness: 350, damping: 28 }}
            className="w-80 bg-white rounded-[28px] shadow-hover overflow-hidden flex flex-col border border-rich-black/5"
            style={{ height: "440px" }}
          >
            <div className="bg-rich-black px-5 py-4 flex items-center justify-between flex-shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-vibrant-pink flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="font-serif text-base text-white leading-tight">Fairy Wingman</p>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-green-400"></div>
                    <p className="font-sans text-[10px] text-white/60 uppercase tracking-widest">Online</p>
                  </div>
                </div>
              </div>
              <button onClick={() => setIsOpen(false)} className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white/70 hover:bg-white/20 hover:text-white transition-colors">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="flex-grow overflow-y-auto px-4 py-4 space-y-3 bg-off-white">
              {messages.map(msg => (
                <motion.div key={msg.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className={"flex " + (msg.from === "user" ? "justify-end" : "justify-start")}>
                  <div className={"max-w-[80%] px-4 py-2.5 rounded-2xl font-sans text-sm leading-relaxed " + (msg.from === "user" ? "bg-vibrant-pink text-white rounded-br-sm" : "bg-white text-rich-black shadow-soft rounded-bl-sm")}>
                    {msg.text}
                  </div>
                </motion.div>
              ))}
              {isTyping && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex justify-start">
                  <div className="bg-white px-4 py-3 rounded-2xl rounded-bl-sm shadow-soft flex items-center gap-1.5">
                    {[0, 1, 2].map(i => (
                      <motion.div key={i} className="w-2 h-2 rounded-full bg-rich-black/30" animate={{ y: [0, -4, 0] }} transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.15 }} />
                    ))}
                  </div>
                </motion.div>
              )}
              <div ref={messagesEndRef} />
            </div>

            <div className="px-4 py-3 bg-white border-t border-rich-black/5 flex gap-2 flex-shrink-0">
              <input
                type="text"
                value={inputValue}
                onChange={e => setInputValue(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask your Wingman..."
                className="flex-grow bg-off-white rounded-xl px-4 py-2.5 font-sans text-sm text-rich-black outline-none focus:ring-2 focus:ring-vibrant-pink/30 transition-all"
              />
              <button onClick={handleSend} disabled={!inputValue.trim()} className="w-10 h-10 rounded-xl bg-vibrant-pink flex items-center justify-center text-white hover:bg-rich-black disabled:opacity-40 disabled:hover:bg-vibrant-pink transition-colors flex-shrink-0">
                <Send className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button onClick={() => setIsOpen(prev => !prev)} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} className="w-14 h-14 rounded-full bg-vibrant-pink shadow-hover flex items-center justify-center text-white relative">
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.15 }}>
              <X className="w-6 h-6" />
            </motion.div>
          ) : (
            <motion.div key="open" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.15 }}>
              <MessageCircle className="w-6 h-6" />
            </motion.div>
          )}
        </AnimatePresence>
        {!isOpen && <span className="absolute -top-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-white animate-pulse" />}
      </motion.button>
    </div>
  );
}
