import { motion, useScroll, useTransform } from 'motion/react';
import { Download, Copy, Zap, Layers } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { CodeBlock, SectionTitle, FeatureCard } from '../components/Common';
import { FeedbackSection } from '../components/FeedbackSection';
import { User } from 'firebase/auth';
import { RubyLogo } from '../components/RubyLogo';

export const Home = ({ user }: { user: User | null }) => {
  const [cdnLink, setCdnLink] = useState('');
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const logoY = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const textY = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const bgY = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  useEffect(() => {
    const currentUrl = window.location.origin;
    setCdnLink(`<script src="${currentUrl}/xeval.js" type="module"></script>`);
  }, []);

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section ref={containerRef} className="relative pt-12 pb-32 px-6 border-b border-border-dark overflow-hidden">
        {/* Background Accents */}
        <motion.div 
          style={{ y: bgY }}
          className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full pointer-events-none"
        >
          <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-accent-green/5 blur-[120px] rounded-full" />
          <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-accent-green/5 blur-[100px] rounded-full" />
        </motion.div>

        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          <motion.div 
            style={{ y: logoY, opacity }}
            className="lg:col-span-12 flex flex-col items-center text-center relative z-10"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="mb-8"
            >
              <RubyLogo className="w-20 h-20 md:w-28 md:h-28" />
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mb-8"
            >
              <span className="px-2 py-1 bg-accent-green/10 text-accent-green text-[10px] font-mono border border-accent-green/30 uppercase tracking-tighter">
                Version 5.1.0 — Moteur d'Injection Unifié
              </span>
            </motion.div>

            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              style={{ y: textY }}
              className="text-7xl md:text-[120px] font-bold uppercase tracking-[0.05em] leading-[0.85] mb-10"
            >
              FASTEST <span className="text-accent-green">LOGIC</span><br/>LAYER
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="max-w-xl font-mono text-sm uppercase tracking-widest text-white/40 mb-12 leading-relaxed"
            >
              Injection dynamique haute performance pour JS, HTML et CSS avec manipulation d'état native. Latence inférieure à 5ms.
            </motion.p>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full max-w-2xl"
            >
              <div className="w-full flex items-center bg-[#151518] border border-border-dark p-1 rounded-sm">
                <code className="flex-1 font-mono text-[10px] px-3 text-accent-green text-left overflow-hidden whitespace-nowrap">npm i @ebinasoft/xeval</code>
                <button 
                  onClick={() => navigator.clipboard.writeText('npm i @ebinasoft/xeval')}
                  className="bg-accent-green hover:bg-accent-green/90 text-black px-4 py-2 text-[10px] font-bold uppercase tracking-tighter rounded-sm transition-all"
                >
                  Copier
                </button>
              </div>
              <Link 
                to="/playground"
                className="w-full py-3.5 bg-white text-black font-bold uppercase tracking-tighter text-[10px] rounded-sm hover:bg-white/90 transition-all flex items-center justify-center gap-2"
              >
                <Zap size={14} fill="currentColor" /> Try Playground
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="mt-8"
            >
              <Link 
                to="/why" 
                className="group flex flex-col items-center gap-2 opacity-40 hover:opacity-100 transition-all"
              >
                <div className="flex items-center gap-3">
                  <div className="w-6 h-[1px] bg-white/20 group-hover:bg-accent-green/50" />
                  <span className="text-[9px] font-mono uppercase tracking-[0.3em]">Explorer la philosophie</span>
                  <div className="w-6 h-[1px] bg-white/20 group-hover:bg-accent-green/50" />
                </div>
                <div className="flex items-center gap-2 text-[10px] font-bold text-accent-green/70 group-hover:text-accent-green uppercase tracking-widest">
                  Pourquoi Xeval <span className="text-[8px] group-hover:translate-x-1 transition-transform">→</span>
                </div>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Feature Preview (Terminal) */}
      <section id="features-preview" className="py-20 px-6 max-w-7xl mx-auto">
        <SectionTitle title="Moteur de Rendu" subtitle="Core Processing" />
        
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-center">
          <div className="lg:col-span-3">
            <CodeBlock code={`// Importez xeval et préparez vos sources (JS, HTML, CSS)
import xeval from '@ebinasoft/xeval';

// Moteur de Script
const script = xeval.prepare(\`
  console.log("Hello, $$name!");
  $$callback
  callback();
\`);

// Moteur HTML
const ui = xeval.prepareHTML(\`
  <div class="banner">Logic Layer: $$status</div>
\`);

// Injection synchronisée
script.inject({ context: { name: "Dev", callback: () => alert("Logic run!") } });
ui.inject({ context: { status: "Online" } });`} />
          </div>
          <div className="lg:col-span-2 space-y-8">
            <div className="space-y-2">
              <h3 className="text-2xl font-bold flex items-center gap-3 italic">
                <Zap className="text-accent-green" size={20} />
                Léger & Sans Dépendance
              </h3>
              <p className="text-white/50 text-sm leading-relaxed">
                xeval est une bibliothèque pure JavaScript sans dépendances externes. 
                Une simple classe pour gérer toutes vos injections complexes.
              </p>
            </div>
            <div className="space-y-2">
              <h3 className="text-2xl font-bold flex items-center gap-3 italic text-accent-green">
                <Layers className="text-accent-green" size={20} />
                Unified Templates
              </h3>
              <p className="text-white/50 text-sm leading-relaxed">
                Utilisez la syntaxe <code className="text-white">$$key</code> pour une interpolation profonde dans tous vos types de fichiers injectés.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Integration Section */}
      <section id="download" className="py-20 px-6 max-w-7xl mx-auto">
        <SectionTitle title="Integration Directe" subtitle="Interface Link" />
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="p-10 glass rounded-3xl border-accent-green/20">
            <h3 className="text-3xl font-bold mb-6 italic uppercase">CDN Link</h3>
            <p className="text-white/60 mb-8 text-sm leading-relaxed">
              Ajoutez simplement la librairie à votre projet via le lien direct. Pas besoin de build step pour commencer votre prototypage.
            </p>
            <div className="relative group">
              <input 
                readOnly 
                value={cdnLink}
                className="w-full bg-black/40 border border-white/20 rounded-xl px-5 py-4 font-mono text-xs text-white/80 pr-12 focus:outline-none focus:border-accent-green group-hover:border-white/40 transition-all"
              />
              <button 
                onClick={() => {
                  navigator.clipboard.writeText(cdnLink);
                }}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-white/40 hover:text-accent-green transition-colors"
              >
                <Copy size={18} />
              </button>
            </div>
          </div>

          <div className="p-10 glass rounded-3xl border-accent-green/20">
            <h3 className="text-3xl font-bold mb-6 italic uppercase">Local Source</h3>
            <p className="text-white/60 mb-8 text-sm leading-relaxed">
              Téléchargez le fichier source complet pour une gestion locale de vos ressources. Inclut les types JSDoc pour une intelligence native dans VS Code.
            </p>
            <a 
              href="/xeval.js" 
              download
              className="w-full flex items-center justify-center gap-3 py-4 bg-accent-green text-black font-bold rounded-xl hover:bg-accent-green/80 transition-all active:scale-95 shadow-lg shadow-accent-green/20 uppercase tracking-widest text-sm"
            >
              <Download size={20} /> Download xeval.js
            </a>
          </div>
        </div>
      </section>

      {/* Use Cases Section Teaser */}
      <section className="py-20 px-6 max-w-7xl mx-auto border-t border-white/5">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <SectionTitle title="Que construire avec xeval ?" subtitle="Possibilities" />
            <p className="text-white/60 mb-8 leading-relaxed">
              De la personnalisation d'interface en temps réel aux systèmes de plugins complexes, xeval offre la flexibilité nécessaire pour construire des expériences web dynamiques sans les compromis habituels de performance ou de sécurité.
            </p>
            <ul className="space-y-4 mb-10">
              {['Micro-frontends & Plugins', 'A/B Testing Dynamique', 'Moteurs de Modding (Jeux)', 'Correctifs Logiciels à Distance'].map((item) => (
                <li key={item} className="flex items-center gap-3 text-sm font-mono text-white/40 uppercase">
                  <div className="w-1.5 h-1.5 bg-accent-green" />
                  {item}
                </li>
              ))}
            </ul>
            <a 
              href="/why" 
              className="inline-flex items-center gap-2 text-accent-green text-[10px] font-bold uppercase tracking-widest hover:gap-4 transition-all"
            >
              Learn More about Use Cases <span>→</span>
            </a>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="p-8 border border-white/5 bg-accent-green/5 rounded-sm">
              <h4 className="text-3xl font-bold italic mb-2">99%</h4>
              <p className="text-[9px] uppercase tracking-widest text-white/30">Browser Compatibility</p>
            </div>
            <div className="p-8 border border-white/5 bg-white/5 rounded-sm">
              <h4 className="text-3xl font-bold italic mb-2">&lt;2ms</h4>
              <p className="text-[9px] uppercase tracking-widest text-white/30">Injection Latency</p>
            </div>
            <div className="p-8 border border-white/5 bg-white/5 rounded-sm">
              <h4 className="text-3xl font-bold italic mb-2">60fps</h4>
              <p className="text-[9px] uppercase tracking-widest text-white/30">UI Consistency</p>
            </div>
            <div className="p-8 border border-white/5 bg-accent-green/5 rounded-sm">
              <h4 className="text-3xl font-bold italic mb-2">Zero</h4>
              <p className="text-[9px] uppercase tracking-widest text-white/30">Dependencies</p>
            </div>
          </div>
        </div>
      </section>

      <FeedbackSection user={user} />
    </div>
  );
};
