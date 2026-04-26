import { motion } from 'motion/react';
import { Rocket, Shield, Zap, Box, Puzzle, Palette } from 'lucide-react';
import { SectionTitle } from '../components/Common';

export const Why = () => {
  return (
    <div className="pt-32 pb-20 px-6 max-w-7xl mx-auto">
      <SectionTitle title="Why Xeval?" subtitle="Philosophy & Vision" />
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 mb-32 items-center">
        <div className="space-y-6">
          <h3 className="text-4xl font-bold uppercase italic leading-tight">
            Beyond the <span className="text-accent-green">eval()</span> bottleneck.
          </h3>
          <p className="text-white/70 text-lg leading-relaxed font-light">
            L'injection de code dynamique a longtemps été considérée comme une "mauvaise pratique" à cause des risques de sécurité et de la difficulté à gérer le scope. 
            <span className="text-white font-bold"> xeval </span> change la donne en proposant une couche d'abstraction contrôlée, performante et sécurisée.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-6">
            <div className="flex gap-4">
              <div className="mt-1 text-accent-green"><Shield size={20} /></div>
              <div>
                <h4 className="font-bold uppercase text-xs mb-1">Managed Security</h4>
                <p className="text-[10px] text-white/40 uppercase font-mono">Isolation native et mode safe pour prévenir les injections XSS.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="mt-1 text-accent-green"><Zap size={20} /></div>
              <div>
                <h4 className="font-bold uppercase text-xs mb-1">Unified Context</h4>
                <p className="text-[10px] text-white/40 uppercase font-mono">Partagez vos variables globales et locales sans polluer le scope global.</p>
              </div>
            </div>
          </div>
        </div>
        <div className="relative">
          <div className="absolute -inset-4 bg-accent-green/10 blur-3xl rounded-full" />
          <div className="relative p-10 border border-white/10 bg-[#0e0e10] rounded-sm">
            <pre className="text-[10px] font-mono text-accent-green/60 leading-relaxed">
              {`// Traditional way (Dangerous)
eval("alert('unsafe')");

// The xeval way (Controlled)
xeval.prepare("console.log($$msg)")
     .run({ 
        safe: true, 
        context: { msg: "Isolated & Verified" } 
     });`}
            </pre>
          </div>
        </div>
      </div>

      <SectionTitle title="What to build?" subtitle="Real-world Use Cases" />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <CaseCard 
          icon={Puzzle}
          title="Micro-Plugin Architectures"
          description="Créez des systèmes où les utilisateurs ou des tiers peuvent injecter leurs propres fonctionnalités sans avoir accès au code source de votre application."
        />
        <CaseCard 
          icon={Palette}
          title="Dynamic UI Personalization"
          description="Injectez des bannières, des thèmes ou des composants de marketing basés sur des segments d'utilisateurs en temps réel via une API distante."
        />
        <CaseCard 
          icon={Rocket}
          title="Modding & Gaming Engines"
          description="Permettez aux joueurs de scripter des comportements, des niveaux ou des interfaces personnalisées dans vos jeux web avec une latence ultra-faible."
        />
        <CaseCard 
          icon={Box}
          title="A/B Testing Frameworks"
          description="Testez des variations de boutons, de messages ou de styles instantanément sans passer par un cycle de déploiement CI/CD complet."
        />
        <CaseCard 
          icon={Shield}
          title="Remote Hot-Patching"
          description="Corrigez des bugs critiques ou modifiez des paramètres de logique métier à distance en injectant des correctifs directement dans les sessions actives."
        />
        <CaseCard 
          icon={Zap}
          title="Dynamic Live Dashboards"
          description="Mettez à jour des visualisations de données complexes et leurs styles associés dynamiquement au fur et à mesure que les données arrivent."
        />
      </div>
    </div>
  );
};

const CaseCard = ({ icon: Icon, title, description }: { icon: any, title: string, description: string }) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    className="p-8 border border-white/5 bg-white/5 hover:bg-white/[0.07] transition-all group"
  >
    <div className="w-10 h-10 mb-6 flex items-center justify-center border border-white/10 group-hover:border-accent-green group-hover:text-accent-green transition-all">
      <Icon size={20} />
    </div>
    <h4 className="text-lg font-bold uppercase italic mb-3">{title}</h4>
    <p className="text-white/40 text-sm leading-relaxed font-light">{description}</p>
  </motion.div>
);
