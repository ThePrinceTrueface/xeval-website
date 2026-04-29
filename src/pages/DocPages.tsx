import { Terminal, Layers, Box, Palette, Database, Code, Trash2, RefreshCw, Search, Shield, Zap, Cpu, Download } from 'lucide-react';
import { CodeBlock, SectionTitle } from '../components/Common';
import { DocPagination } from '../components/DocNavigation';
import { motion } from 'motion/react';

const DocContentWrapper = ({ children }: { children: React.ReactNode }) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="space-y-12"
  >
    {children}
    <DocPagination />
  </motion.div>
);

export const DocIntro = () => (
  <DocContentWrapper>
    <div className="space-y-6">
      <div className="flex items-center gap-4 mb-4">
        <div className="w-10 h-10 border border-accent-green flex items-center justify-center">
          <Terminal size={20} className="text-accent-green" />
        </div>
        <h3 className="text-4xl font-bold uppercase italic tracking-tighter">Introduction</h3>
      </div>
      <p className="text-white/70 text-lg leading-relaxed font-light">
        <span className="text-white font-bold italic">xeval 5.3.0</span> n'est plus un simple injecteur de scripts. C'est un <span className="text-accent-green">Unified Runtime</span> conçu pour assembler dynamiquement des applications complexes. En regroupant la logique (JS), la structure (HTML) et le style (CSS) sous une interface commune basée sur les <span className="italic">CoreEngines</span>, xeval permet une orchestration totale de vos ressources éphémères.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-6 border border-white/5 bg-white/5 rounded-sm">
          <span className="text-accent-green text-[10px] font-mono uppercase block mb-2">Native Integration</span>
          <p className="text-xs text-white/40 leading-relaxed">Exploite le cycle de rendu du navigateur sans passer par des simulateurs lourds ou des iframes restrictifs.</p>
        </div>
        <div className="p-6 border border-white/5 bg-white/5 rounded-sm">
          <span className="text-accent-green text-[10px] font-mono uppercase block mb-2">Stateless Assembly</span>
          <p className="text-xs text-white/40 leading-relaxed">Passez des états complexes (fonctions, objets JSON) directement dans le scope d'exécution injecté.</p>
        </div>
      </div>
    </div>
  </DocContentWrapper>
);

export const DocInstall = () => (
  <DocContentWrapper>
    <div className="space-y-6">
      <h3 className="text-4xl font-bold uppercase italic border-b border-white/10 pb-4">Installation</h3>
      <p className="text-white/70">
        Intégrez le moteur logic en moins de 10 secondes. xeval est universel et s'adapte à tous les environnements JS modernes.
      </p>
      <div className="space-y-8">
        <div className="space-y-2">
          <span className="text-[10px] uppercase font-bold tracking-[0.2em] text-white/30 px-2 py-1 border border-white/10">ES Module (Mainstream)</span>
          <CodeBlock code={`import xeval from 'xeval';`} />
        </div>
        <div className="space-y-2">
          <span className="text-[10px] uppercase font-bold tracking-[0.2em] text-white/30 px-2 py-1 border border-white/10">Zero-Config CDN</span>
          <CodeBlock code={`<!-- Chargez xeval en haut de votre document -->
<script src="https://cdn.jsdelivr.net/npm/@ebinasoft/xeval/dist/xeval.esm.min.js" type="module"></script>`} />
        </div>
        <div className="space-y-2">
            <span className="text-[10px] uppercase font-bold tracking-[0.2em] text-white/30 px-2 py-1 border border-white/10">Package Manager</span>
            <CodeBlock code={`npm install @ebinasoft/xeval`} />
        </div>
      </div>
    </div>
  </DocContentWrapper>
);

export const DocBasic = () => (
  <DocContentWrapper>
    <div className="space-y-6">
      <h3 className="text-4xl font-bold uppercase italic border-b border-white/10 pb-4">Basic Usage</h3>
      <p className="text-white/70">
        Chaque opération suit le même pattern : <code className="text-accent-green">Prepare → Run</code>.
      </p>
      <CodeBlock code={`const engine = xeval.prepare(\`
  console.log("Runtime Active");
\`);

// Injection immédiate dans le DOM
engine.inject();`} />
      <div className="p-6 border border-white/5 bg-accent-green/[0.02]">
        <h4 className="text-xs font-bold uppercase tracking-widest text-accent-green mb-2">The Engine Lifecycle</h4>
        <p className="text-white/40 text-xs">Un moteur préparé peut être exécuté plusieurs fois (run/inject) ou nettoyé (cleanup) de manière atomique.</p>
      </div>
    </div>
  </DocContentWrapper>
);

export const DocScript = () => (
  <DocContentWrapper>
    <div className="space-y-10 border-l-4 border-accent-green/20 pl-8">
      <div>
        <h3 className="text-4xl font-bold uppercase italic mb-4 text-accent-green">Script Engine</h3>
        <p className="text-white/70 max-w-2xl">
          L'injecteur de logique originel. Convertit n'importe quelle chaîne de caractères ou URL distante en un tag <code className="text-accent-green">&lt;script&gt;</code> exécutable avec son propre contexte.
        </p>
      </div>
      <CodeBlock code={`const script = xeval.prepare("alert('Logic Layer Bound')");
script.run({ id: 'core-logic', module: false });`} />
    </div>
  </DocContentWrapper>
);

export const DocHtml = () => (
  <DocContentWrapper>
    <div className="space-y-10 border-l-4 border-blue-500/20 pl-8">
      <div>
        <h3 className="text-4xl font-bold uppercase italic mb-4 text-blue-400">HTML Engine</h3>
        <p className="text-white/70 max-w-2xl">
          Générez des fragments d'UI réactifs. L'injection HTML est désormais <span className="font-bold">intelligente</span> : les éléments simples (ex: <code className="text-white">&lt;button&gt;</code>) sont injectés nativement sans conteneur superflu.
        </p>
      </div>
      <CodeBlock code={`const ui = xeval.prepareHTML(\`
  <div class="card">
    <h3>$$title</h3>
    <p>$$content</p>
  </div>
\`);

ui.run({ 
  target: '#app', 
  context: { title: 'Dashboard', content: 'Operational' } 
});`} />
    </div>
  </DocContentWrapper>
);

export const DocCss = () => (
  <DocContentWrapper>
    <div className="space-y-10 border-l-4 border-pink-500/20 pl-8">
      <div>
        <h3 className="text-4xl font-bold uppercase italic mb-4 text-pink-400">CSS Engine</h3>
        <p className="text-white/70 max-w-2xl">
          Manipulez le style global ou local. Injecte des tags <code className="text-pink-400">&lt;style&gt;</code> avec support des media queries.
        </p>
      </div>
      <CodeBlock code={`const theme = xeval.prepareCSS(\`
  body { background: $$bg; transition: all 0.5s; }
\`);

theme.run({ context: { bg: '#09090b' } });`} />
    </div>
  </DocContentWrapper>
);

export const DocTemplates = () => (
  <DocContentWrapper>
    <div className="space-y-8 bg-[#151518] p-10 rounded-sm border border-white/5 relative overflow-hidden">
      <div className="absolute top-0 right-0 p-8 opacity-5">
        <Layers size={200} />
      </div>
      <h3 className="text-4xl font-bold uppercase italic mb-6">Template Syntax: $$key</h3>
      <p className="text-white/70 text-lg leading-relaxed font-light mb-10 max-w-2xl">
        L'interpolation dynamique est le cœur de xeval. La syntaxe <span className="text-accent-green">$$key</span> gère la sérialisation intelligente de vos types de données.
      </p>
      <CodeBlock code={`xeval.prepare(\`
  const user = $$profile; 
  $$greetFn
  greetFn(); 
\`).inject({
  context: {
    profile: { name: "Prince", role: "Dev" },
    greetFn: () => console.log("Logic Active")
  }
});`} />
    </div>
  </DocContentWrapper>
);

export const DocLifecycle = () => (
  <DocContentWrapper>
    <div className="space-y-10 border-l-4 border-red-500/20 pl-8">
      <div>
        <h3 className="text-4xl font-bold uppercase italic mb-4 text-red-500">Lifecycle & Cleanup</h3>
        <p className="text-white/70 max-w-2xl">
          Chaque injection xeval reçoit une empreinte unique <code className="text-red-400">data-xeval-key</code>. Cela permet une gestion granulaire de vos ressources DOM sans polluer votre document à long terme.
        </p>
      </div>
      <CodeBlock code={`const instance = xeval.prepare("...");
const key = instance.run();

instance.cleanupOne(key); // Supprime l'élément spécifique
instance.cleanup(); // Purge TOUTES les injections de cette instance`} />
    </div>
  </DocContentWrapper>
);

export const DocUpdates = () => (
  <DocContentWrapper>
    <div className="space-y-10 border-l-4 border-orange-500/20 pl-8">
      <div>
        <h3 className="text-4xl font-bold uppercase italic mb-4 text-orange-500">Stateful Updates</h3>
        <p className="text-white/70 max-w-2xl">
          Exclusif aux moteurs <code className="text-orange-400">HtmlEngine</code> et <code className="text-orange-400">CSSEngine</code>. Rafraîchissez le contenu d'un élément déjà injecté.
        </p>
      </div>
      <CodeBlock code={`const ui = xeval.prepareHTML("<p>$$msg</p>");
ui.run({ context: { msg: "Init" } });

// Mise à jour réactive
ui.update({ context: { msg: "New State" } });`} />
    </div>
  </DocContentWrapper>
);

export const DocRemote = () => (
  <DocContentWrapper>
    <div className="space-y-10 border-l-4 border-purple-500/20 pl-8">
      <div>
        <h3 className="text-4xl font-bold uppercase italic mb-4 text-purple-400">Remote & Cache</h3>
        <p className="text-white/70 max-w-2xl">
           La méthode <code className="text-purple-400">loadFrom</code> analyse l'URL pour détecter automatiquement l'extension et inclut un système de cache intelligent.
        </p>
      </div>
      <CodeBlock code={`// Définir un TTL pour le cache
const engine = await xeval.loadFrom('/api/plugin', { type: 'js', ttl: 5 * 60 * 1000 });
engine.run({ context: { mode: 'prod' } });

// Gestion du cache global
xeval.isCached('/api/plugin'); // true | false
xeval.clearCache('/api/plugin'); // Vider l'entrée spécifique
xeval.clearCache(); // Vider tout le cache`} />
    </div>
  </DocContentWrapper>
);

export const DocCallbacks = () => (
  <DocContentWrapper>
    <div className="space-y-10 border-l-4 border-yellow-500/20 pl-8">
      <div>
        <h3 className="text-4xl font-bold uppercase italic mb-4 text-yellow-500">Dual Callback System</h3>
        <p className="text-white/70 max-w-2xl">
          Le système de callbacks à deux niveaux (moteur et run) permet d'interagir nativement avec les éléments tout juste injectés.
        </p>
      </div>
      <CodeBlock code={`const engine = xeval.prepareHTML(\`<p>$$text</p>\`)
  // Callback niveau moteur (s'applique à toutes les injections)
  .onInject((el, key) => {
    el.classList.add('fade-in');
    console.log('Engine callback — key:', key);
  });

// Callback niveau 'run' (s'applique uniquement ici)
engine.run({
  context: { text: 'Hello' },
  onInject: (el, key) => console.log('Run callback — key:', key)
});`} />
    </div>
  </DocContentWrapper>
);

export const DocApi = () => (
  <DocContentWrapper>
    <h3 className="text-4xl font-bold uppercase italic border-b border-white/10 pb-4">API Reference</h3>
    <div className="overflow-x-auto">
      <table className="w-full text-left font-mono text-[11px] uppercase tracking-tighter">
        <thead>
          <tr className="border-b border-white/10 text-white/30 text-xs">
            <th className="pb-4 pr-10">Method</th>
            <th className="pb-4">Return Type</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-white/5">
          <tr><td className="py-6 text-accent-green">prepare(source: string)</td><td className="py-6 text-white/50">ScriptEngine</td></tr>
          <tr><td className="py-6 text-accent-green">prepareHTML(source: string)</td><td className="py-6 text-white/50">HtmlEngine</td></tr>
          <tr><td className="py-6 text-accent-green">prepareCSS(source: string)</td><td className="py-6 text-white/50">CSSEngine</td></tr>
          <tr><td className="py-6 text-accent-green">loadFrom(url: string, options?: object)</td><td className="py-6 text-white/50">Promise&lt;Engine&gt;</td></tr>
          <tr><td className="py-6 text-accent-green">clearCache(url?: string)</td><td className="py-6 text-white/50">void</td></tr>
          <tr><td className="py-6 text-accent-green">isCached(url: string)</td><td className="py-6 text-white/50">boolean</td></tr>
          <tr><td className="py-6 text-accent-green">cacheInfo(url: string)</td><td className="py-6 text-white/50">object | null</td></tr>
          <tr><td className="py-6 text-accent-green">engine.run(options?: object)</td><td className="py-6 text-white/50">HTMLElement</td></tr>
          <tr><td className="py-6 text-accent-green">engine.update(options?: object)</td><td className="py-6 text-white/50">Element | null</td></tr>
          <tr><td className="py-6 text-accent-green">engine.getByKey(key: string)</td><td className="py-6 text-white/50">Element | null</td></tr>
          <tr><td className="py-6 text-accent-green">engine.onInject(callback)</td><td className="py-6 text-white/50">this</td></tr>
          <tr><td className="py-6 text-accent-green">engine.cleanup() / cleanupOne(key)</td><td className="py-6 text-white/50">void / boolean</td></tr>
          <tr><td className="py-6 text-accent-green">engine.render(options?: object)</td><td className="py-6 text-white/50">string</td></tr>
          <tr><td className="py-6 text-accent-green">engine.lastKey / lastInjected / keys</td><td className="py-6 text-white/50">string | Element | string[]</td></tr>
        </tbody>
      </table>
    </div>
  </DocContentWrapper>
);
