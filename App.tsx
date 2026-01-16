import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Services } from './components/Services';
import { WhyUs } from './components/WhyUs';
import { Blog } from './components/Blog';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { ChatAssistant } from './components/ChatAssistant';
import { ScrollToTop } from './components/ScrollToTop';
import { AdminPortal } from './components/AdminPortal';
import { Shield } from 'lucide-react';

const App: React.FC = () => {
  const [isAdminOpen, setIsAdminOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white text-slate-900 flex flex-col selection:bg-brand-indigo selection:text-white">
      <Navbar />
      <main className="flex-grow">
        <Hero />
        <About />
        <Services />
        <WhyUs />
        <Blog />
        <Contact />
      </main>
      <Footer />
      <ScrollToTop />
      <ChatAssistant />
      
      {/* Admin Toggle - Discrete button for owner */}
      <button 
        onClick={() => setIsAdminOpen(true)}
        className="fixed bottom-6 left-6 z-50 p-3 bg-white/30 backdrop-blur-sm border border-slate-200 rounded-full text-slate-400 hover:text-brand-indigo hover:bg-white transition-all shadow-sm"
        title="Admin Console"
      >
        <Shield size={16} />
      </button>

      <AdminPortal isOpen={isAdminOpen} onClose={() => setIsAdminOpen(false)} />
    </div>
  );
};

export default App;