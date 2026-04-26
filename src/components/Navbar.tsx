import { auth, db, googleProvider, signInWithPopup, signOut, collection, addDoc, query, orderBy, onSnapshot, serverTimestamp, handleFirestoreError, OperationType } from '../lib/firebase';
import { User, onAuthStateChanged } from 'firebase/auth';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { LogOut, Menu, X, ChevronDown, Github } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

export const Navbar = ({ user }: { user: User | null }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const handleLogin = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const exploreLinks = [
    { name: 'Playground', path: '/playground' },
    { name: 'Features', path: '/features' },
    { name: 'Changelog', path: '/changelog' },
    { name: 'Contact', path: '/contact' }
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b ${isScrolled ? 'glass border-border-dark py-3' : 'bg-transparent border-transparent py-5'}`}>
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <Link to="/" className="flex items-center group cursor-pointer">
          <span className="text-2xl font-mono font-bold tracking-tighter uppercase transition-colors group-hover:text-accent-green">xeval</span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8 text-[10px] font-mono uppercase tracking-[0.2em] text-white/50">
          <Link to="/why" className={`hover:text-accent-green transition-colors ${location.pathname === '/why' ? 'text-accent-green' : ''}`}>Why xeval?</Link>
          <Link to="/docs" className={`hover:text-accent-green transition-colors ${location.pathname.startsWith('/docs') ? 'text-accent-green' : ''}`}>Documentation</Link>
          
          <div className="relative group">
            <button className="flex items-center gap-1 hover:text-accent-green transition-colors focus:outline-none">
              Discover <ChevronDown size={12} className="opacity-50 transition-transform group-hover:rotate-180" />
            </button>
            <div className="absolute top-full -left-4 pt-4 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
              <div className="glass border border-white/10 flex flex-col min-w-[160px] rounded-sm backdrop-blur-xl bg-[#0a0a0b]/90 shadow-2xl overflow-hidden py-1">
                {exploreLinks.map(link => (
                  <Link 
                    key={link.name} 
                    to={link.path} 
                    className={`px-4 py-2 hover:bg-white/5 hover:text-accent-green transition-colors ${location.pathname === link.path ? 'text-accent-green bg-white/5' : ''}`}
                  >
                    {link.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          <a href="https://github.com/ThePrinceTrueface/xeval" target="_blank" rel="noopener noreferrer" className="hover:text-accent-green transition-colors flex items-center gap-2">
            <Github size={14} /> GitHub
          </a>
          
          {user ? (
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 text-white/80">
                <img src={user.photoURL || ''} alt="" className="w-5 h-5 rounded-full border border-accent-green/30" />
                <span className="text-[9px]">{user.displayName?.split(' ')[0]}</span>
              </div>
              <button 
                onClick={handleLogout}
                className="p-1.5 border border-border-dark hover:border-red-500/50 hover:text-red-500 rounded-sm transition-all active:scale-95"
                title="Log out"
              >
                <LogOut size={12} />
              </button>
            </div>
          ) : (
            <button 
              onClick={handleLogin}
              className="px-4 py-1.5 border border-border-dark hover:border-accent-green hover:text-accent-green rounded-sm transition-all active:scale-95"
            >
              LOG IN
            </button>
          )}
        </div>

        {/* Mobile Toggle */}
        <button className="md:hidden text-white" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden absolute top-full left-0 right-0 glass border-t border-white/10 flex flex-col text-[11px] font-mono uppercase tracking-widest text-white/70 overflow-hidden"
          >
            <div className="flex flex-col py-4 px-6 gap-4">
              <Link to="/" onClick={() => setMobileMenuOpen(false)} className="py-2 border-b border-white/5 hover:text-accent-green">Home</Link>
              <Link to="/why" onClick={() => setMobileMenuOpen(false)} className="py-2 border-b border-white/5 hover:text-accent-green">Why xeval?</Link>
              <Link to="/docs" onClick={() => setMobileMenuOpen(false)} className="py-2 border-b border-white/5 hover:text-accent-green">Documentation</Link>
              
              <div className="py-2 text-white/30 font-bold">Discover</div>
              <div className="flex flex-col gap-2 pl-4 border-l border-white/10 ml-2">
                {exploreLinks.map(link => (
                  <Link key={link.name} to={link.path} onClick={() => setMobileMenuOpen(false)} className="py-2 hover:text-accent-green">
                    {link.name}
                  </Link>
                ))}
              </div>

              <a href="https://github.com/ThePrinceTrueface/xeval" target="_blank" rel="noopener noreferrer" onClick={() => setMobileMenuOpen(false)} className="py-2 mt-2 flex items-center justify-center gap-2 border border-white/10 rounded-sm hover:text-accent-green hover:border-accent-green/50">
                <Github size={14} /> Source Code
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};
