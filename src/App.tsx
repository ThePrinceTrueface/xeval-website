import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { onAuthStateChanged, User } from 'firebase/auth';
import { auth } from './lib/firebase';
import { Navbar } from './components/Navbar';
import { Home } from './pages/Home';
import { Features } from './pages/Features';
import { DocumentationLayout } from './pages/DocumentationLayout';
import * as Doc from './pages/DocPages';
import { Why } from './pages/Why';
import { Playground } from './pages/Playground';
import { NextPageWidget } from './components/NextPageWidget';
import { Navigate } from 'react-router-dom';
import { RubyLogo } from './components/RubyLogo';
import { Chatbot } from './components/Chatbot';

// Scroll to top on route change
function ScrollToTop() {
  const { pathname, hash } = useLocation();
  
  useEffect(() => {
    if (hash) {
      const id = hash.replace('#', '');
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      window.scrollTo(0, 0);
    }
  }, [pathname, hash]);
  
  return null;
}

export default function App() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (u) => {
      setUser(u);
    });
    return () => unsubscribe();
  }, []);

  return (
    <Router>
      <div className="min-h-screen grid-bg relative selection:bg-accent-green/30">
        <ScrollToTop />
        <Navbar user={user} />
        
        <main>
          <Routes>
            <Route path="/" element={<Home user={user} />} />
            <Route path="/why" element={<Why />} />
            <Route path="/features" element={<Features />} />
            <Route path="/playground" element={<Playground />} />
            <Route path="/docs" element={<DocumentationLayout />}>
              <Route index element={<Navigate to="/docs/intro" />} />
              <Route path="intro" element={<Doc.DocIntro />} />
              <Route path="install" element={<Doc.DocInstall />} />
              <Route path="basic" element={<Doc.DocBasic />} />
              <Route path="script" element={<Doc.DocScript />} />
              <Route path="html" element={<Doc.DocHtml />} />
              <Route path="css" element={<Doc.DocCss />} />
              <Route path="templates" element={<Doc.DocTemplates />} />
              <Route path="lifecycle" element={<Doc.DocLifecycle />} />
              <Route path="updates" element={<Doc.DocUpdates />} />
              <Route path="remote" element={<Doc.DocRemote />} />
              <Route path="api" element={<Doc.DocApi />} />
            </Route>
          </Routes>
        </main>

        <NextPageWidget />
        <Chatbot />

        <footer className="py-12 border-t border-white/5 bg-black/40">
          <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-3 opacity-50">
              <RubyLogo className="w-6 h-6 grayscale" />
              <span className="text-lg font-mono font-bold tracking-tighter uppercase text-white/30">xeval</span>
            </div>
            <div className="text-[10px] font-mono text-white/20 uppercase tracking-widest">
              © 2026 Developed for high-performance logic injection.
            </div>
          </div>
        </footer>
      </div>
    </Router>
  );
}
