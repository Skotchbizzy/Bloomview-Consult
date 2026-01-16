import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { NAV_ITEMS } from '../constants';

export const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    // Improved Intersection Observer for better section detection
    const observerOptions = {
      root: null,
      // Focus on the top part of the viewport to detect active section
      rootMargin: '-10% 0px -70% 0px',
      threshold: 0,
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    
    // Watch all sections mentioned in NAV_ITEMS
    NAV_ITEMS.forEach((item) => {
      const el = document.getElementById(item.href.replace('#', ''));
      if (el) observer.observe(el);
    });

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      observer.disconnect();
    };
  }, []);

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const id = href.replace('#', '');
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
      setActiveSection(id);
    }
    setIsOpen(false);
  };

  return (
    <nav className={`fixed w-full z-50 transition-all duration-500 ${
      scrolled 
        ? 'bg-white/95 backdrop-blur-md shadow-lg py-3' 
        : 'bg-transparent py-6'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Logo Area */}
          <div className="flex-shrink-0">
            <a 
              href="#home" 
              onClick={(e) => scrollToSection(e, '#home')}
              className="flex items-center group cursor-pointer"
            >
              <div className="h-10 w-10 sm:h-12 sm:w-12 rounded-xl overflow-hidden shadow-md flex items-center justify-center bg-brand-indigo transition-transform group-hover:scale-105">
                <img 
                  src="./logo-dark.png" 
                  alt="Bloomview" 
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                    e.currentTarget.parentElement!.innerHTML = '<span class="text-white font-bold text-xs">BV</span>';
                  }}
                />
              </div>
              <div className="ml-3 flex flex-col -space-y-1">
                <span className="text-lg sm:text-xl font-bold heading-serif leading-tight tracking-tight text-brand-indigo">
                  Bloomview
                </span>
                <span className="text-lg sm:text-xl font-medium heading-serif leading-tight tracking-tight text-brand-indigo/70">
                  Consults
                </span>
              </div>
            </a>
          </div>

          {/* Navigation Items - Horizontal for desktop (md and up) */}
          <div className="hidden md:flex items-center space-x-1 lg:space-x-4">
            {NAV_ITEMS.map((item) => {
              const isActive = activeSection === item.href.replace('#', '');
              return (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={(e) => scrollToSection(e, item.href)}
                  className={`relative px-3 py-2 text-sm font-bold uppercase tracking-wider transition-all duration-300 cursor-pointer group ${
                    isActive ? 'text-brand-indigo' : 'text-slate-500 hover:text-brand-indigo'
                  }`}
                >
                  {item.label}
                  {/* Active Highlighting Effect: Gold Underline */}
                  <span className={`absolute bottom-0 left-3 right-3 h-0.5 bg-brand-gold rounded-full transition-all duration-300 origin-center ${
                    isActive ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100 opacity-50'
                  }`} />
                </a>
              );
            })}
            
            <div className="pl-4">
              <a
                href="#contact"
                onClick={(e) => scrollToSection(e, '#contact')}
                className="bg-brand-indigo text-white px-6 py-2.5 rounded-xl font-bold text-sm uppercase tracking-widest hover:brightness-125 transition-all shadow-lg hover:shadow-brand-indigo/20 transform hover:-translate-y-0.5 cursor-pointer whitespace-nowrap"
              >
                Get Started
              </a>
            </div>
          </div>

          {/* Mobile Menu Button - Visible below md breakpoint */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 text-brand-indigo rounded-lg hover:bg-slate-100 transition-colors"
              aria-label="Toggle menu"
            >
              {isOpen ? <X size={26} /> : <Menu size={26} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      <div className={`md:hidden bg-white shadow-2xl transition-all duration-500 ease-in-out overflow-hidden ${
        isOpen ? 'max-h-screen opacity-100 border-t border-slate-100' : 'max-h-0 opacity-0'
      }`}>
        <div className="px-6 py-8 space-y-4">
          {NAV_ITEMS.map((item) => {
            const isActive = activeSection === item.href.replace('#', '');
            return (
              <a
                key={item.label}
                href={item.href}
                onClick={(e) => scrollToSection(e, item.href)}
                className={`block px-4 py-3 text-lg font-bold uppercase tracking-widest rounded-xl transition-all ${
                  isActive 
                    ? 'bg-brand-indigo text-white shadow-lg shadow-brand-indigo/10' 
                    : 'text-slate-600 hover:bg-brand-light'
                }`}
              >
                {item.label}
              </a>
            );
          })}
          <div className="pt-4">
            <a
              href="#contact"
              onClick={(e) => scrollToSection(e, '#contact')}
              className="block w-full text-center bg-brand-indigo text-white py-4 rounded-xl font-extrabold text-sm uppercase tracking-widest shadow-xl"
            >
              Book Now
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
};