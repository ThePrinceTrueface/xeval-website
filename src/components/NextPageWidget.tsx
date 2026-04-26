import { useLocation, Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowRight, ChevronRight } from 'lucide-react';

const PAGE_SEQUENCE = [
  { path: '/', name: 'Introduction', description: 'Start the journey' },
  { path: '/why', name: 'Why Xeval?', description: 'Philosophy & vision' },
  { path: '/features', name: 'Features', description: 'Explore capabilities' },
  { path: '/docs/intro', name: 'Documentation', description: 'Master the engine' },
];

export const NextPageWidget = () => {
  const location = useLocation();
  
  // If we are deep in documentation, we use DocPagination instead
  if (location.pathname.startsWith('/docs')) return null;

  const currentIndex = PAGE_SEQUENCE.findIndex(p => p.path === location.pathname);
  
  if (currentIndex === -1) return null;
  
  const nextIndex = (currentIndex + 1) % PAGE_SEQUENCE.length;
  const nextView = PAGE_SEQUENCE[nextIndex];

  return (
    <section className="py-20 px-6 border-t border-white/5 bg-accent-green/[0.02]">
      <div className="max-w-7xl mx-auto">
        <Link 
          to={nextView.path}
          className="group block p-12 border border-white/10 bg-white/5 rounded-sm hover:border-accent-green transition-all relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 p-8 opacity-[0.03] group-hover:opacity-[0.07] transition-opacity">
            <ArrowRight size={200} />
          </div>
          
          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-8">
            <div className="space-y-2">
              <span className="text-[10px] font-mono text-accent-green uppercase tracking-[0.4em] block">Next Sequence</span>
              <h3 className="text-4xl md:text-6xl font-bold uppercase italic tracking-tighter group-hover:text-accent-green transition-colors">
                {nextView.name}
              </h3>
              <p className="text-white/40 font-light text-lg">
                {nextView.description}
              </p>
            </div>
            
            <div className="flex items-center gap-4">
              <span className="text-xs font-mono uppercase tracking-widest text-white/20 group-hover:text-white transition-colors">Proceed to module</span>
              <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center group-hover:border-accent-green group-hover:bg-accent-green group-hover:text-black transition-all">
                <ChevronRight size={24} />
              </div>
            </div>
          </div>
        </Link>
      </div>
    </section>
  );
};
