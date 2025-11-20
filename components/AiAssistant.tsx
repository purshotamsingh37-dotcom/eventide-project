import React, { useState } from 'react';
import { Sparkles, Send, X, MessageSquare, Crown } from 'lucide-react';
import { GoogleGenAI } from "@google/genai";

export const AiAssistant: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [prompt, setPrompt] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);

  const handleAskAi = async () => {
    if (!prompt.trim()) return;
    setLoading(true);
    setResponse('');

    try {
      const apiKey = process.env.API_KEY || ''; 
      
      if (!apiKey) {
         setTimeout(() => {
            setResponse("I am your Royal Event Concierge. Please configure a valid API Key to receive personalized suggestions tailored to your exquisite taste.");
            setLoading(false);
         }, 1500);
         return;
      }

      const ai = new GoogleGenAI({ apiKey });
      const result = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: `You are a high-end, luxury event planner for 'Eventide'. Assist the user with this query: ${prompt}. Tone: Sophisticated, elegant, and professional. Keep it concise.`,
      });
      
      setResponse(result.text || "I could not generate a response at this moment, my lord/lady.");

    } catch (error) {
      console.error("AI Error", error);
      setResponse("My connection to the royal archives is momentarily disrupted.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Floating Action Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-8 right-8 bg-gradient-to-r from-royal-900 to-royal-800 text-gold-400 p-4 rounded-full shadow-[0_0_25px_rgba(10,15,28,0.3)] hover:shadow-[0_0_35px_rgba(212,175,55,0.4)] transition-all hover:scale-110 z-50 flex items-center gap-3 border border-gold-500/30 group"
        >
          <div className="relative">
            <Crown size={24} />
            <Sparkles size={12} className="absolute -top-1 -right-1 text-white animate-pulse" />
          </div>
          <span className="font-display font-bold tracking-wider hidden md:block group-hover:text-white transition-colors">Royal Concierge</span>
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-8 right-8 w-80 md:w-96 bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-gold-500/20 z-50 overflow-hidden flex flex-col animate-slide-up">
          <div className="bg-royal-900 p-5 flex justify-between items-center border-b border-gold-500/30">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gold-500/20 rounded-lg">
                <Crown size={20} className="text-gold-400" />
              </div>
              <div>
                <h3 className="font-display font-bold text-white text-sm tracking-wide">Eventide Concierge</h3>
                <p className="text-[10px] text-gold-400 uppercase tracking-widest">AI Powered Luxury</p>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-white transition-colors">
              <X size={20} />
            </button>
          </div>

          <div className="flex-1 p-5 min-h-[350px] max-h-[450px] overflow-y-auto bg-cream">
            {response ? (
              <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-100 text-royal-900 text-sm leading-relaxed font-serif">
                <div className="font-bold text-gold-600 mb-2 flex items-center gap-2 text-xs uppercase tracking-widest">
                  <Sparkles size={12} /> Suggestion
                </div>
                {response}
              </div>
            ) : (
              <div className="text-center mt-12 px-6">
                <Crown size={48} className="mx-auto text-slate-200 mb-4" />
                <p className="text-slate-400 font-serif text-sm italic">
                  "Ask me for sophisticated themes, gourmet menu pairings, or elite vendor recommendations."
                </p>
              </div>
            )}
          </div>

          <div className="p-4 bg-white border-t border-slate-100">
            <div className="flex gap-2 bg-slate-50 p-1 rounded-xl border border-slate-200 focus-within:border-gold-500/50 focus-within:ring-1 focus-within:ring-gold-500/20 transition-all">
              <input
                type="text"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleAskAi()}
                placeholder="Inquire here..."
                className="flex-1 bg-transparent px-3 py-2 text-sm focus:outline-none font-serif text-royal-900 placeholder:italic"
              />
              <button
                onClick={handleAskAi}
                disabled={loading}
                className="bg-royal-900 text-gold-400 p-2.5 rounded-lg hover:bg-black transition-colors disabled:opacity-50 shadow-sm"
              >
                {loading ? <span className="animate-spin block">↻</span> : <Send size={16} />}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};