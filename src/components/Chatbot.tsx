import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageSquare, X, Send, Bot, ExternalLink, Loader2 } from 'lucide-react';
import { GoogleGenAI } from '@google/genai';
import { useNavigate } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';

// Initialize Gemini
let ai: GoogleGenAI | null = null;
try {
  ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "missing" });
} catch (e) {
  console.warn("GenAI init failed:", e);
}


interface Message {
  role: 'user' | 'model';
  text: string;
  isRedirect?: boolean;
  isComplete?: boolean;
}

const Typewriter = ({ text, speed = 10, onComplete, onCharTyped }: { text: string, speed?: number, onComplete?: () => void, onCharTyped?: () => void }) => {
  const [displayedText, setDisplayedText] = useState('');
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (index < text.length) {
      const timeout = setTimeout(() => {
        setDisplayedText(prev => prev + text[index]);
        setIndex(prev => prev + 1);
        if (onCharTyped) onCharTyped();
      }, speed);
      return () => clearTimeout(timeout);
    } else {
      if (onComplete) onComplete();
    }
  }, [index, text, speed, onComplete, onCharTyped]);

  return (
    <div className="relative">
      <ReactMarkdown>{displayedText}</ReactMarkdown>
      {index < text.length && (
        <motion.span
          animate={{ opacity: [0, 1, 0] }}
          transition={{ duration: 0.8, repeat: Infinity }}
          className="inline-block w-1 h-3 bg-accent-green ml-1 align-middle"
        />
      )}
    </div>
  );
};

export const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: 'model', text: 'Salut ! Je suis XevalBot. Comment puis-je vous aider avec @ebinasoft/xeval aujourd\'hui ?' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const scrollToBottom = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setIsLoading(true);

    try {
      const systemInstruction = `
        You are XevalBot, the official specialized assistant for xeval (formerly @ebinasoft/xeval).
        Your goal is to help users understand xeval and navigate the documentation.
        Xeval is a high-performance dynamic injection engine for JS, HTML, and CSS (latence < 5ms) supporting version 5.1.0 features.
        
        Core Concepts:
        - Managed Security: safe mode, context isolation.
        - Unified Context: $$key syntax for sharing variables.
        - Core Engines: ScriptEngine, HtmlEngine, CSSEngine.
        - Lifecycle: Prepare -> Run pattern, data-xeval-key, cleanup.
        - Remote & Cache (v5.1.0): loadFrom with TTL memory cache and stale fallback.
        - Dual Callbacks (v5.1.0): onInject hooks at engine level and individual run level.

        Site Routes:
        - / : Home (Overview)
        - /why : Philosophy, security, use cases (mods, hot-patching, micro-plugins).
        - /features : Detailed list of capabilities.
        - /contact : Contact the Ebinasoft HQ.
        - /docs/intro : Introduction to Unified Runtime.
        - /docs/install : npm i xeval or CDN.
        - /playground : Interactive playground (CodePen style).
        - /docs/basic : Prepare -> Run lifecycle.
        - /docs/script : Logic/Javascript engine.
        - /docs/html : UI/HTML fragments engine.
        - /docs/css : Style/CSS engine.
        - /docs/templates : Template syntax ($$key).
        - /docs/lifecycle : Memory management and cleanup.
        - /docs/updates : Stateful updates for HTML/CSS.
        - /docs/remote : Remote file loading & Caching (loadFrom).
        - /docs/callbacks : Dual Callback System (Engine & Run level).
        - /docs/api : Full API reference table.

        Strict Rules:
        1. Always stay in context: only answer about Xeval, development, or navigating this site.
        2. If a user asks something off-topic, politely say you can only help with Xeval.
        3. REDIRECTION CAPABILITY: If a user wants to "see the installation", "read the api", or "why use it", etc., you MUST include a JSON field in your thought process to trigger a redirection.
        4. MARKDOWN SUPPORT: Feel free to use markdown (bold, lists, code blocks) in your answers to make them more readable.
        
        RESPONSE FORMAT:
        You must respond in a valid JSON format with two fields:
        {
          "answer": "Your visible response to the user in French (unless they speak English)",
          "redirectTo": "/path/to/page" (Optional, set only if the user needs to go to a specific page)
        }
      `;

      const history = messages.map(m => ({
        role: m.role,
        parts: [{ text: m.text }]
      }));

      if (!ai || !process.env.GEMINI_API_KEY || process.env.GEMINI_API_KEY === 'missing') {
        setMessages(prev => [...prev, { role: 'model', text: 'Je suis actuellement hors service ou en cours de maintenance (clé API manquante). Veuillez revenir plus tard !' }]);
        return;
      }

      const model = 'gemini-3-flash-preview';
      const result = await ai.models.generateContent({
        model,
        contents: [...history, { role: 'user', parts: [{ text: userMsg }] }],
        config: {
          systemInstruction,
          responseMimeType: "application/json"
        }
      });

      const responseText = result.text;
      if (responseText) {
        try {
          const parsed = JSON.parse(responseText);
          setMessages(prev => [...prev, { role: 'model', text: parsed.answer }]);
          
          if (parsed.redirectTo) {
            // Short delay to let the user read the reply before moving
            setTimeout(() => {
              navigate(parsed.redirectTo);
            }, 1500);
          }
        } catch (e) {
          setMessages(prev => [...prev, { role: 'model', text: responseText }]);
        }
      }
    } catch (error: any) {
      console.error('Chatbot error:', error);
      const errorMessage = error?.message?.toLowerCase() || '';
      
      if (errorMessage.includes('api key') || errorMessage.includes('403') || errorMessage.includes('unauthorized') || errorMessage.includes('permission')) {
         setMessages(prev => [...prev, { role: 'model', text: 'Je suis actuellement hors service ou en cours de maintenance (clé d\'API non autorisée pour ce domaine). Veuillez revenir plus tard !' }]);
      } else {
         setMessages(prev => [...prev, { role: 'model', text: 'Désolé, j\'ai rencontré une erreur technique. Réessayez plus tard.' }]);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-[60]">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="absolute bottom-20 right-0 w-[350px] h-[500px] bg-[#0c0c0e] border border-border-dark flex flex-col shadow-2xl overflow-hidden"
          >
            {/* Header */}
            <div className="p-4 border-b border-border-dark flex items-center justify-between bg-black/50">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-sm bg-accent-green/20 flex items-center justify-center border border-accent-green/30">
                  <Bot size={16} className="text-accent-green" />
                </div>
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-wider">XevalBot</h3>
                  <div className="flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent-green animate-pulse" />
                    <span className="text-[8px] text-white/40 uppercase font-mono">Logic Assistant Online</span>
                  </div>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="text-white/40 hover:text-white transition-colors"
              >
                <X size={18} />
              </button>
            </div>

            {/* Messages */}
            <div 
              ref={scrollRef}
              className="flex-1 overflow-y-auto p-4 space-y-4 scroll-smooth custom-scrollbar"
            >
              {messages.map((msg, i) => (
                <div 
                  key={i} 
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-[85%] p-3 text-[12px] leading-relaxed ${
                    msg.role === 'user' 
                      ? 'bg-accent-green text-black font-bold rounded-sm' 
                      : 'bg-[#151518] border border-white/5 text-white/90 rounded-sm'
                  }`}>
                    {msg.role === 'user' ? (
                      msg.text
                    ) : (
                      <div className="markdown-body prose prose-invert max-w-none 
                        prose-p:my-1.5 prose-p:leading-relaxed prose-p:text-[12px]
                        prose-headings:text-[13px] prose-headings:font-bold prose-headings:mb-1 prose-headings:mt-2
                        prose-code:text-accent-green prose-code:text-[11px] prose-code:bg-black/30 prose-code:px-1.5 prose-code:rounded-xs
                        prose-pre:bg-black/50 prose-pre:p-2.5 prose-pre:my-2 prose-pre:border prose-pre:border-white/5
                        prose-ul:my-1.5 prose-ul:pl-4 prose-li:my-0.5 prose-li:text-[12px]">
                        {i === messages.length - 1 && !msg.isComplete ? (
                          <Typewriter 
                            text={msg.text} 
                            onCharTyped={scrollToBottom}
                            onComplete={() => {
                              const newMessages = [...messages];
                              newMessages[i].isComplete = true;
                              setMessages(newMessages);
                            }}
                          />
                        ) : (
                          <ReactMarkdown>{msg.text}</ReactMarkdown>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-white/5 border border-white/5 p-3 rounded-sm">
                    <Loader2 size={16} className="animate-spin text-accent-green" />
                  </div>
                </div>
              )}
            </div>

            {/* Input */}
            <div className="p-4 border-t border-border-dark bg-black/50">
              <form 
                onSubmit={(e) => { e.preventDefault(); handleSend(); }}
                className="flex gap-2"
              >
                <input 
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Posez une question sur Xeval..."
                  className="flex-1 bg-white/5 border border-border-dark rounded-sm px-3 py-2 text-[11px] focus:outline-none focus:border-accent-green/50 text-white placeholder:text-white/20"
                />
                <button 
                  type="submit"
                  disabled={isLoading || !input.trim()}
                  className="bg-accent-green text-black p-2 rounded-sm disabled:opacity-50 hover:bg-accent-green/90 transition-colors"
                >
                  <Send size={16} />
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className={`w-14 h-14 rounded-sm flex items-center justify-center shadow-2xl transition-all ${
          isOpen ? 'bg-white text-black' : 'bg-accent-green text-black'
        }`}
      >
        {isOpen ? <X size={24} /> : <MessageSquare size={24} />}
      </motion.button>
    </div>
  );
};
