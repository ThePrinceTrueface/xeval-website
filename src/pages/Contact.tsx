import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Send, CheckCircle, AlertCircle, MessageSquare } from 'lucide-react';

export const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    type: 'suggestion',
    message: ''
  });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.message.trim()) return;

    setStatus('submitting');
    
    // Simuler l'envoi de l'email / requête API
    setTimeout(() => {
      setStatus('success');
      setFormData({ name: '', email: '', type: 'suggestion', message: '' });
      setTimeout(() => setStatus('idle'), 5000);
    }, 1500);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <div className="pt-24 pb-12 px-6 min-h-screen relative overflow-hidden">
      {/* Background decorations */}
      <div className="fixed top-20 right-0 w-[50vw] h-[50vw] bg-accent-green/5 rounded-full blur-[120px] -z-10 pointer-events-none" />
      
      <div className="max-w-3xl mx-auto">
        <header className="mb-12">
          <div className="flex items-center gap-2 mb-2 text-accent-green">
            <MessageSquare size={16} />
            <span className="text-[10px] font-mono font-bold uppercase tracking-widest">Ebinasoft HQ</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold uppercase italic tracking-tighter mb-4">Contact</h1>
          <p className="text-white/50 text-sm md:text-base max-w-xl font-mono leading-relaxed">
            Reportez un bug, proposez une nouvelle fonctionnalité, ou passez simplement nous dire bonjour ! Notre équipe est à votre écoute.
          </p>
        </header>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-[#0c0c0e] border border-border-dark p-6 md:p-8 relative group"
        >
          {/* Cyber accents */}
          <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-accent-green opacity-50" />
          <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-accent-green opacity-50" />
          <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-accent-green opacity-50" />
          <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-accent-green opacity-50" />

          {status === 'success' ? (
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="py-12 flex flex-col items-center justify-center text-center space-y-4"
            >
              <div className="w-16 h-16 rounded-full bg-accent-green/10 flex items-center justify-center text-accent-green mb-4 shadow-[0_0_30px_rgba(0,255,157,0.2)]">
                <CheckCircle size={32} />
              </div>
              <h3 className="text-2xl font-bold italic tracking-tight text-white">Message Envoyé</h3>
              <p className="text-white/50 font-mono text-sm max-w-md">
                Transmission réussie. L'équipe Ebinasoft a bien reçu votre message. Merci pour votre retour !
              </p>
              <button 
                onClick={() => setStatus('idle')}
                className="mt-6 px-6 py-2 border border-border-dark text-white/70 hover:text-accent-green hover:border-accent-green transition-all uppercase text-xs font-mono tracking-widest"
              >
                Nouveau Message
              </button>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-mono text-white/50 uppercase tracking-widest block">
                    Votre Nom <span className="text-white/30">(Optionnel)</span>
                  </label>
                  <input 
                    type="text" 
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full bg-black/40 border border-border-dark px-4 py-3 text-sm text-white focus:outline-none focus:border-accent-green focus:ring-1 focus:ring-accent-green/50 transition-all font-mono"
                    placeholder="Ex: John Doe"
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="text-[10px] font-mono text-white/50 uppercase tracking-widest block">
                    Sujet du Message
                  </label>
                  <select 
                    name="type"
                    value={formData.type}
                    onChange={handleChange}
                    className="w-full bg-black/40 border border-border-dark px-4 py-3 text-sm text-white focus:outline-none focus:border-accent-green focus:ring-1 focus:ring-accent-green/50 transition-all font-mono appearance-none"
                  >
                    <option value="bug">Report de Bug</option>
                    <option value="suggestion">Suggestion / Idée</option>
                    <option value="hello">Juste un Coucou 👋</option>
                    <option value="other">Autre</option>
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-mono text-white/50 uppercase tracking-widest block">
                  Votre Adresse Email <span className="text-white/30">(Pour vous répondre)</span>
                </label>
                <input 
                  type="email" 
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full bg-black/40 border border-border-dark px-4 py-3 text-sm text-white focus:outline-none focus:border-accent-green focus:ring-1 focus:ring-accent-green/50 transition-all font-mono"
                  placeholder="contact@example.com"
                />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-mono text-white/50 uppercase tracking-widest flex items-center justify-between">
                  <span>Message <span className="text-red-500">*</span></span>
                  <span className="text-white/30 lowercase">{formData.message.length} chars</span>
                </label>
                <textarea 
                  name="message"
                  required
                  value={formData.message}
                  onChange={handleChange}
                  rows={6}
                  className="w-full bg-black/40 border border-border-dark px-4 py-3 text-sm text-white focus:outline-none focus:border-accent-green focus:ring-1 focus:ring-accent-green/50 transition-all font-mono resize-none"
                  placeholder="Écrivez votre message ici..."
                />
              </div>

              <div className="pt-4 flex items-center justify-between border-t border-border-dark">
                <p className="text-[10px] text-white/40 font-mono hidden md:block">
                  Les messages sont encryptés et transmis vers nos terminaux sécurisés.
                </p>
                
                <button 
                  type="submit"
                  disabled={status === 'submitting' || !formData.message.trim()}
                  className="w-full md:w-auto px-8 py-3 bg-accent-green text-black hover:bg-accent-green/90 disabled:opacity-50 disabled:cursor-not-allowed transition-all text-xs font-bold uppercase shadow-[0_0_20px_rgba(0,255,157,0.2)] flex items-center justify-center gap-2 tracking-widest"
                >
                  {status === 'submitting' ? (
                    <>
                      <div className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                      Transmission...
                    </>
                  ) : (
                    <>
                      <Send size={14} /> 
                      Envoyer Message
                    </>
                  )}
                </button>
              </div>
            </form>
          )}
        </motion.div>
      </div>
    </div>
  );
};
