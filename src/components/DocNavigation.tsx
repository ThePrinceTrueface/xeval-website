import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { DOC_STRUCTURE } from '../constants';
import { ChevronRight, ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';

export const DocSidebar = () => {
  return (
    <div className="space-y-8">
      {DOC_STRUCTURE.map((group) => (
        <div key={group.category} className="space-y-4">
          <h4 className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/30 px-4 border-l-2 border-white/5">
            {group.category}
          </h4>
          <div className="space-y-1">
            {group.items.map((item) => (
              <NavLink 
                key={item.id} 
                to={item.path}
                className={({ isActive }) => 
                  `flex items-center gap-3 px-4 py-2 text-sm transition-all rounded group ${
                    isActive 
                    ? 'text-accent-green bg-accent-green/5 border-l-2 border-accent-green -ml-0.5' 
                    : 'text-white/40 hover:text-white/80 hover:bg-white/5'
                  }`
                }
              >
                <item.icon size={14} className="opacity-50 group-hover:opacity-100" />
                <span>{item.name}</span>
              </NavLink>
            ))}
          </div>
        </div>
      ))}

      <div className="p-4 border border-white/5 bg-white/5 rounded-sm">
        <span className="text-[9px] font-mono text-white/20 uppercase block mb-2">Technical Specs</span>
        <div className="flex justify-between text-[10px] font-mono">
          <span className="text-white/40">GZIPPED</span>
          <span className="text-accent-green">1.8 KB</span>
        </div>
        <div className="flex justify-between text-[10px] font-mono mt-1">
          <span className="text-white/40">LATENCY</span>
          <span className="text-accent-green">~4ms</span>
        </div>
      </div>
    </div>
  );
};

export const DocPagination = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  const allItems = DOC_STRUCTURE.flatMap(g => g.items);
  const currentIndex = allItems.findIndex(i => i.path === location.pathname);
  
  if (currentIndex === -1) return null;
  
  const nextItem = allItems[currentIndex + 1];
  
  if (!nextItem) return null;

  return (
    <div className="pt-20 border-t border-white/5 mt-32">
      <button 
        onClick={() => navigate(nextItem.path)}
        className="group w-full text-right flex flex-col items-end gap-2"
      >
        <span className="text-[10px] font-mono uppercase tracking-[0.4em] text-white/30">Next Concept</span>
        <div className="flex items-center gap-4">
          <span className="text-3xl font-bold uppercase italic group-hover:text-accent-green transition-colors">{nextItem.name}</span>
          <div className="w-10 h-10 border border-white/10 flex items-center justify-center group-hover:border-accent-green group-hover:text-black group-hover:bg-accent-green transition-all">
            <ArrowRight size={20} />
          </div>
        </div>
      </button>
    </div>
  );
};
