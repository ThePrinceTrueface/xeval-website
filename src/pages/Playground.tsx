import React, { useState, useEffect, useRef } from 'react';
import xeval from '@ebinasoft/xeval';
import Editor from 'react-simple-code-editor';
// @ts-ignore
import { highlight, languages } from 'prismjs';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-markup';
import 'prismjs/components/prism-css';
import 'prismjs/components/prism-json';
import 'prismjs/themes/prism-tomorrow.css';
import { Play, RotateCcw, Code, Box, Palette, Terminal, Zap, ExternalLink, Database } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const DEFAULT_HTML = `<div class="playground-card">
  <h1>$$title</h1>
  <p>Status: <span id="status">$$status</span></p>
  <button id="action-btn">Trigger Logic</button>
</div>`;

const DEFAULT_CSS = `.playground-card {
  padding: 2rem;
  background: rgba(255, 255, 255, 0.03);
  border: 1px border rgba(255, 255, 255, 0.1);
  border-radius: 4px;
}

h1 {
  color: #00ff9d;
  font-family: 'Space Grotesk', sans-serif;
  margin-bottom: 1rem;
}

button {
  background: #00ff9d;
  color: black;
  border: none;
  padding: 0.5rem 1rem;
  font-weight: bold;
  cursor: pointer;
  margin-top: 1rem;
  text-transform: uppercase;
  font-size: 10px;
  letter-spacing: 0.1em;
}`;

const DEFAULT_JS = `// Logic bound to the HTML above
const btn = document.getElementById('action-btn');
const status = document.getElementById('status');

if (btn && status) {
  btn.onclick = () => {
    status.innerText = 'LOGIC INJECTED';
    status.style.color = '#00ff9d';
    console.log('Action triggered from xeval!');
  };
}`;

const DEFAULT_CONTEXT = `{
  "title": "XEVAL PLAYGROUND",
  "status": "Waiting..."
}`;

export const Playground = () => {
  const [html, setHtml] = useState(DEFAULT_HTML);
  const [css, setCss] = useState(DEFAULT_CSS);
  const [js, setJs] = useState(DEFAULT_JS);
  const [contextJson, setContextJson] = useState(DEFAULT_CONTEXT);
  const [activeTab, setActiveTab] = useState<'html' | 'css' | 'js' | 'context'>('html');
  const [logs, setLogs] = useState<string[]>([]);
  const previewRef = useRef<HTMLDivElement>(null);
  
  const htmlEngineRef = useRef<any>(null);
  const cssEngineRef = useRef<any>(null);
  const scriptEngineRef = useRef<any>(null);

  const runCode = () => {
    // Cleanup previous injections
    if (htmlEngineRef.current) htmlEngineRef.current.cleanup();
    if (cssEngineRef.current) cssEngineRef.current.cleanup();
    if (scriptEngineRef.current) scriptEngineRef.current.cleanup();

    try {
      let parsedContext = {};
      try {
        parsedContext = JSON.parse(contextJson);
      } catch (err: any) {
        throw new Error("Invalid JSON in context: " + err.message);
      }

      // 1. Prepare CSS
      cssEngineRef.current = xeval.prepareCSS(css);
      cssEngineRef.current.run();

      // 2. Prepare HTML
      htmlEngineRef.current = xeval.prepareHTML(html);
      htmlEngineRef.current.run({ 
        target: '#preview-container',
        context: parsedContext
      });

      // 3. Prepare JS Logic (Script)
      const wrappedJs = `(() => {
${js}
})();`;
      scriptEngineRef.current = xeval.prepare(wrappedJs);
      scriptEngineRef.current.run();
      
      setLogs(prev => [...prev.slice(-4), `[${new Date().toLocaleTimeString()}] Runtime assembled successfully.`]);
    } catch (err: any) {
      setLogs(prev => [...prev.slice(-4), `[${new Date().toLocaleTimeString()}] ERROR: ${err.message}`]);
    }
  };

  useEffect(() => {
    runCode();
    
    // Override console.log
    const originalLog = console.log;
    console.log = (...args) => {
      setLogs(prev => [...prev.slice(-4), `[LOG] ${args.join(' ')}`]);
      originalLog(...args);
    };

    return () => {
      console.log = originalLog;
      if (htmlEngineRef.current) htmlEngineRef.current.cleanup();
      if (cssEngineRef.current) cssEngineRef.current.cleanup();
      if (scriptEngineRef.current) scriptEngineRef.current.cleanup();
    };
  }, []);

  const reset = () => {
    setHtml(DEFAULT_HTML);
    setCss(DEFAULT_CSS);
    setJs(DEFAULT_JS);
    setContextJson(DEFAULT_CONTEXT);
    setTimeout(runCode, 50);
  };

  return (
    <div className="pt-24 pb-12 px-6">
      <div className="max-w-7xl mx-auto">
        <header className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2 text-accent-green">
              <Zap size={16} />
              <span className="text-[10px] font-mono font-bold uppercase tracking-widest">Unified Runtime Environment</span>
            </div>
            <h1 className="text-5xl font-bold uppercase italic tracking-tighter">Playground</h1>
          </div>
          <div className="flex gap-2">
            <button 
              onClick={reset}
              className="px-4 py-2 bg-white/5 border border-white/10 text-white/50 hover:text-white hover:bg-white/10 transition-all text-xs font-bold uppercase flex items-center gap-2"
            >
              <RotateCcw size={14} /> Reset
            </button>
            <button 
              onClick={runCode}
              className="px-6 py-2 bg-accent-green text-black hover:bg-accent-green/90 transition-all text-xs font-bold uppercase shadow-[0_0_20px_rgba(0,255,157,0.3)] flex items-center gap-2"
            >
              <Play size={14} fill="currentColor" /> Run Engine
            </button>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:h-[600px]">
          {/* Editors Section */}
          <div className="lg:col-span-7 flex flex-col bg-[#0c0c0e] border border-border-dark overflow-hidden min-h-[400px] lg:min-h-0">
            <div className="flex flex-wrap border-b border-border-dark bg-black/40">
              <button 
                onClick={() => setActiveTab('html')}
                className={`px-4 py-4 text-[10px] uppercase font-bold tracking-widest flex items-center gap-2 transition-all ${activeTab === 'html' ? 'text-accent-green bg-white/5 border-b border-accent-green' : 'text-white/30 hover:text-white/60'}`}
              >
                <Box size={14} /> HTML Structure
              </button>
              <button 
                onClick={() => setActiveTab('css')}
                className={`px-4 py-4 text-[10px] uppercase font-bold tracking-widest flex items-center gap-2 transition-all ${activeTab === 'css' ? 'text-blue-400 bg-white/5 border-b border-blue-400' : 'text-white/30 hover:text-white/60'}`}
              >
                <Palette size={14} /> CSS Styling
              </button>
              <button 
                onClick={() => setActiveTab('js')}
                className={`px-4 py-4 text-[10px] uppercase font-bold tracking-widest flex items-center gap-2 transition-all ${activeTab === 'js' ? 'text-pink-500 bg-white/5 border-b border-pink-500' : 'text-white/30 hover:text-white/60'}`}
              >
                <Code size={14} /> JS Logic
              </button>
              <button 
                onClick={() => setActiveTab('context')}
                className={`px-4 py-4 text-[10px] uppercase font-bold tracking-widest flex items-center gap-2 transition-all ${activeTab === 'context' ? 'text-yellow-400 bg-white/5 border-b border-yellow-400' : 'text-white/30 hover:text-white/60'}`}
              >
                <Database size={14} /> Context JSON
              </button>
            </div>
            
            <div className="flex-1 overflow-auto custom-scrollbar bg-[#0c0c0e]">
              <AnimatePresence mode="wait">
                {activeTab === 'html' && (
                  <motion.div
                    key="html"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="p-4"
                  >
                    <Editor
                      value={html}
                      onValueChange={setHtml}
                      highlight={code => highlight(code, languages.markup, 'markup')}
                      padding={10}
                      className="font-mono text-sm min-h-full"
                      style={{
                        fontFamily: '"JetBrains Mono", monospace',
                      }}
                    />
                  </motion.div>
                )}
                {activeTab === 'css' && (
                  <motion.div
                    key="css"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="p-4"
                  >
                    <Editor
                      value={css}
                      onValueChange={setCss}
                      highlight={code => highlight(code, languages.css, 'css')}
                      padding={10}
                      className="font-mono text-sm min-h-full"
                      style={{
                        fontFamily: '"JetBrains Mono", monospace',
                      }}
                    />
                  </motion.div>
                )}
                {activeTab === 'js' && (
                  <motion.div
                    key="js"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="p-4"
                  >
                    <Editor
                      value={js}
                      onValueChange={setJs}
                      highlight={code => highlight(code, languages.javascript, 'javascript')}
                      padding={10}
                      className="font-mono text-sm min-h-full"
                      style={{
                        fontFamily: '"JetBrains Mono", monospace',
                      }}
                    />
                  </motion.div>
                )}
                {activeTab === 'context' && (
                  <motion.div
                    key="context"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="p-4"
                  >
                    <Editor
                      value={contextJson}
                      onValueChange={setContextJson}
                      highlight={code => highlight(code, languages.json || languages.javascript, 'json')}
                      padding={10}
                      className="font-mono text-sm min-h-full"
                      style={{
                        fontFamily: '"JetBrains Mono", monospace',
                      }}
                    />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Preview & Logs Section */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            <div className="flex-1 bg-[#0c0c0e] border border-border-dark flex flex-col overflow-hidden">
              <div className="px-4 py-3 border-b border-border-dark bg-black/40 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-accent-green" />
                  <span className="text-[10px] uppercase font-bold tracking-widest text-white/40">Live Preview</span>
                </div>
                <div className="flex items-center gap-3">
                  <button className="text-white/20 hover:text-white transition-colors">
                    <ExternalLink size={14} />
                  </button>
                </div>
              </div>
              <div className="flex-1 p-6 overflow-auto relative bg-[#09090b]/50" id="preview-container" ref={previewRef}>
                {/* Xeval will inject here */}
                {(!html && !css && !js) && (
                  <div className="absolute inset-0 flex items-center justify-center text-white/10 font-mono text-[10px] uppercase italic">
                    Waiting for assembly...
                  </div>
                )}
              </div>
            </div>

            <div className="h-40 bg-black/60 border border-border-dark flex flex-col overflow-hidden">
              <div className="px-4 py-2 border-b border-white/5 flex items-center gap-2">
                <Terminal size={12} className="text-white/30" />
                <span className="text-[9px] uppercase font-bold tracking-widest text-white/30">System Console</span>
              </div>
              <div className="flex-1 p-4 font-mono text-[10px] overflow-y-auto custom-scrollbar space-y-1">
                {logs.length === 0 && <span className="text-white/10 italic">Initializing logic logs...</span>}
                {logs.map((log, i) => (
                  <div key={i} className={log.includes('ERROR') ? 'text-red-400' : 'text-white/40'}>
                    {log}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-12 p-8 border border-white/5 bg-white/[0.02]">
          <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-accent-green mb-4">How it works</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <span className="text-white font-bold block mb-2 text-sm italic">Core Engines</span>
              <p className="text-xs text-white/40 leading-relaxed">
                Le playground utilise <code className="text-accent-green">HtmlEngine</code>, <code className="text-accent-green">CSSEngine</code>, et <code className="text-accent-green">ScriptEngine</code> séparément pour assembler une instance locale.
              </p>
            </div>
            <div>
              <span className="text-white font-bold block mb-2 text-sm italic">Scoped Lifecycle</span>
              <p className="text-xs text-white/40 leading-relaxed">
                À chaque reload, xeval nettoie les injections précédentes en ciblant les nœuds DOM par leur clé unique, évitant toute fuite mémoire.
              </p>
            </div>
            <div>
              <span className="text-white font-bold block mb-2 text-sm italic">Real-DOM Rendering</span>
              <p className="text-xs text-white/40 leading-relaxed">
                Contrairement à CodePen qui utilise des shadow-dom complexes ou des iframes, xeval injecte directement dans le DOM parent de manière isolée.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
