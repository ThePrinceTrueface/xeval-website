import { auth, db, googleProvider, signInWithPopup, signOut, collection, addDoc, query, orderBy, onSnapshot, serverTimestamp, handleFirestoreError, OperationType } from '../lib/firebase';
import { User, onAuthStateChanged } from 'firebase/auth';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { LogOut, Menu, X } from 'lucide-react';
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

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Why?', path: '/why' },
    { name: 'Features', path: '/features' },
    { name: 'Playground', path: '/playground' },
    { name: 'Documentation', path: '/docs' },
    { name: 'Terminal', path: '/#feedback' }
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b ${isScrolled ? 'glass border-border-dark py-3' : 'bg-transparent border-transparent py-5'}`}>
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <Link to="/" className="flex items-center group cursor-pointer">
          <span className="text-2xl font-mono font-bold tracking-tighter uppercase transition-colors group-hover:text-accent-green">xeval</span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8 text-[10px] font-mono uppercase tracking-[0.2em] text-white/50">
          {navLinks.map((link) => (
            link.path.startsWith('/#') ? (
               <a key={link.name} href={link.path} className="hover:text-accent-green transition-colors">{link.name}</a>
            ) : (
               <Link key={link.name} to={link.path} className={`hover:text-accent-green transition-colors ${location.pathname === link.path ? 'text-accent-green' : ''}`}>{link.name}</Link>
            )
          ))}
          <a href="https://github.com/ThePrinceTrueface/xeval.js" target="_blank" rel="noopener noreferrer" className="hover:text-accent-green transition-colors">GitHub</a>
          
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
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden absolute top-full left-0 right-0 glass border-t border-white/10 p-6 flex flex-col gap-4 text-center"
          >
            {navLinks.map((link) => (
               link.path.startsWith('/#') ? (
                 <a key={link.name} href={link.path} onClick={() => setMobileMenuOpen(false)} className="py-2 hover:text-neon-cyan">{link.name}</a>
               ) : (
                 <Link key={link.name} to={link.path} onClick={() => setMobileMenuOpen(false)} className="py-2 hover:text-neon-cyan">{link.name}</Link>
               )
            ))}
            <a href="https://github.com/ThePrinceTrueface/xeval.js" target="_blank" rel="noopener noreferrer" onClick={() => setMobileMenuOpen(false)} className="py-2 hover:text-neon-cyan">Source</a>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};
