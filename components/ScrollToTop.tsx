import React, { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';

export const ScrollToTop: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  // Show button when page is scrolled down
  const toggleVisibility = () => {
    if (window.pageYOffset > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    window.addEventListener('scroll', toggleVisibility);
    return () => {
      window.removeEventListener('scroll', toggleVisibility);
    };
  }, []);

  return (
    <div className={`fixed bottom-28 right-7 z-40 transition-all duration-300 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0 pointer-events-none'}`}>
      <button
        onClick={scrollToTop}
        aria-label="Scroll to top"
        className="bg-white text-brand-indigo p-3 rounded-xl shadow-2xl border border-slate-100 hover:bg-brand-indigo hover:text-white transition-all group active:scale-95"
      >
        <ArrowUp size={20} className="group-hover:-translate-y-1 transition-transform" />
        <div className="absolute -top-1 -right-1 w-2 h-2 bg-brand-gold rounded-full animate-pulse"></div>
      </button>
    </div>
  );
};