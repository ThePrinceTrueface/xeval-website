import { motion } from 'motion/react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { useState } from 'react';
import { Check, Copy } from 'lucide-react';

const customCodeStyle: any = {
  'code[class*="language-"]': {
    color: '#e0e0e0',
    background: 'none',
    fontFamily: '"JetBrains Mono", monospace',
    textAlign: 'left',
    whiteSpace: 'pre',
    wordSpacing: 'normal',
    wordBreak: 'normal',
    wordWrap: 'normal',
    lineHeight: '1.5',
    tabSize: '4',
    hyphens: 'none',
  },
  'comment': { color: '#7f848e', fontStyle: 'italic' },
  'prolog': { color: '#7f848e' },
  'doctype': { color: '#7f848e' },
  'punctuation': { color: '#e0e0e0' },
  'namespace': { opacity: '.7' },
  'property': { color: '#d19a66' },
  'tag': { color: '#e06c75' },
  'boolean': { color: '#d19a66' },
  'number': { color: '#d19a66' },
  'constant': { color: '#d19a66' },
  'symbol': { color: '#d19a66' },
  'deleted': { color: '#e06c75' },
  'selector': { color: '#98c379' },
  'attr-name': { color: '#d19a66' },
  'string': { color: '#98c379' },
  'char': { color: '#98c379' },
  'builtin': { color: '#e5c07b' },
  'inserted': { color: '#98c379' },
  'operator': { color: '#56b6c2' },
  'entity': { color: '#61afef', cursor: 'help' },
  'url': { color: '#61afef' },
  'variable': { color: '#e06c75' },
  'atrule': { color: '#c678dd' },
  'attr-value': { color: '#98c379' },
  'function': { color: '#61afef' },
  'keyword': { color: '#c678dd' },
  'regex': { color: '#56b6c2' },
  'important': { color: '#c678dd', fontWeight: 'bold' },
  'bold': { fontWeight: 'bold' },
  'italic': { fontStyle: 'italic' },
};

export const SectionTitle = ({ title, subtitle, light = false }: { title: string, subtitle?: string, light?: boolean }) => (
  <div className="mb-12">
    <motion.div 
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      className="flex items-center gap-4 mb-2"
    >
      <div className={`h-[1px] w-12 ${light ? 'bg-white/20' : 'bg-accent-green/50'}`} />
      <span className={`text-[10px] font-mono uppercase tracking-[0.4em] ${light ? 'text-white/40' : 'text-accent-green'}`}>{subtitle || 'System Entry'}</span>
    </motion.div>
    <motion.h2 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="text-4xl md:text-5xl font-bold uppercase tracking-tighter"
    >
      {title}
    </motion.h2>
  </div>
);

export const FeatureCard = ({ icon: Icon, title, description, index }: { icon: any, title: string, description: string, index: number }) => (
  <motion.div 
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay: index * 0.1 }}
    className="group p-8 border border-border-dark bg-[#0e0e10] rounded-sm hover:border-accent-green transition-all cursor-default"
  >
    <div className="w-12 h-12 border border-border-dark flex items-center justify-center rounded-sm mb-6 group-hover:border-accent-green group-hover:text-accent-green transition-all duration-300">
      <Icon size={24} />
    </div>
    <h3 className="text-xl font-bold mb-3 uppercase tracking-tighter group-hover:text-accent-green transition-colors">{title}</h3>
    <p className="font-mono text-[#888] leading-relaxed text-xs">
      {description}
    </p>
  </motion.div>
);

export const CodeBlock = ({ code, language = "javascript" }: { code: string, language?: string }) => {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="terminal-window my-6 group">
      <div className="terminal-header">
        <div className="flex gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-red-500/50" />
          <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/50" />
          <div className="w-2.5 h-2.5 rounded-full bg-green-500/50" />
        </div>
        <div className="text-[10px] uppercase tracking-widest text-white/30 font-mono">
          {language}.sys
        </div>
        <button 
          onClick={copyToClipboard}
          className="text-white/40 hover:text-accent-green transition-colors"
          title="Copy"
        >
          {copied ? <Check size={14} className="text-accent-green" /> : <Copy size={14} />}
        </button>
      </div>
      <div className="p-0 overflow-x-auto bg-black/40">
        <SyntaxHighlighter
          language={language}
          style={customCodeStyle}
          customStyle={{
            background: 'transparent',
            padding: '1.5rem',
            margin: '0',
            fontSize: '0.875rem',
            lineHeight: '1.5',
          }}
          showLineNumbers={true}
          lineNumberStyle={{ minWidth: '2em', paddingRight: '1em', color: 'rgba(255,255,255,0.1)', textAlign: 'right', userSelect: 'none' }}
        >
          {code}
        </SyntaxHighlighter>
      </div>
    </div>
  );
};
