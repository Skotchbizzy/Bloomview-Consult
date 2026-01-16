import React, { useState } from 'react';
import { Facebook, Twitter, Instagram, Linkedin, Globe, Check } from 'lucide-react';
import { NAV_ITEMS } from '../constants';
import { dbService } from '../services/dbService';

export const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [subscribed, setSubscribed] = useState(false);

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
    }
  };

  const handleExternalLink = (e: React.MouseEvent, url: string) => {
    e.preventDefault();
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubmitting(true);
    const success = await dbService.subscribe(email);
    setSubmitting(false);
    if (success) {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 5000);
    }
  };

  return (
    <footer className="bg-white pt-24 pb-12 border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <div className="space-y-6">
            <div className="flex items-center">
              <div className="h-16 w-16 rounded-[14px] overflow-hidden flex items-center justify-center bg-brand-indigo shadow-md">
                <img 
                  src="./logo-dark.png" 
                  alt="Bloomview Consults" 
                  className="w-full h-full object-cover"
                  onError={(e) => { e.currentTarget.style.display = 'none'; }}
                />
              </div>
              <div className="ml-3 flex flex-col -space-y-1">
                <span className="text-2xl font-bold heading-serif text-brand-indigo leading-tight tracking-tight">
                  Bloomview
                </span>
                <span className="text-2xl font-medium heading-serif text-brand-indigo/90 leading-tight tracking-tight">
                  Consults
                </span>
              </div>
            </div>
            <p className="text-slate-500 leading-relaxed max-w-xs text-sm">
              Empowering people through education and technology. We help you see opportunities clearly and grow confidently in a changing world.
            </p>
            <div className="flex space-x-4">
              <a 
                href="#" 
                onClick={(e) => handleExternalLink(e, 'https://facebook.com/bloomviewconsults')} 
                className="p-2.5 bg-brand-light rounded-xl text-brand-indigo hover:bg-brand-indigo hover:text-white transition-all transform hover:-translate-y-1 shadow-sm"
                aria-label="Facebook"
              >
                <Facebook size={18} />
              </a>
              <a 
                href="#" 
                onClick={(e) => handleExternalLink(e, 'https://twitter.com/bloomviewcons')} 
                className="p-2.5 bg-brand-light rounded-xl text-brand-indigo hover:bg-brand-indigo hover:text-white transition-all transform hover:-translate-y-1 shadow-sm"
                aria-label="Twitter"
              >
                <Twitter size={18} />
              </a>
              <a 
                href="#" 
                onClick={(e) => handleExternalLink(e, 'https://www.instagram.com/bloomviewconsults?igsh=NnBid2Jqemxic2J1')} 
                className="p-2.5 bg-brand-light rounded-xl text-brand-indigo hover:bg-brand-indigo hover:text-white transition-all transform hover:-translate-y-1 shadow-sm"
                aria-label="Instagram"
              >
                <Instagram size={18} />
              </a>
              <a 
                href="#" 
                onClick={(e) => handleExternalLink(e, 'https://www.linkedin.com/company/bloomview-consults')} 
                className="p-2.5 bg-brand-light rounded-xl text-brand-indigo hover:bg-brand-indigo hover:text-white transition-all transform hover:-translate-y-1 shadow-sm"
                aria-label="LinkedIn"
              >
                <Linkedin size={18} />
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-bold text-brand-indigo mb-6 uppercase text-xs tracking-[0.2em]">Company</h4>
            <ul className="space-y-4">
              {NAV_ITEMS.map((item) => (
                <li key={item.label}>
                  <a 
                    href={item.href} 
                    onClick={(e) => scrollToSection(e, item.href)}
                    className="text-slate-500 hover:text-brand-indigo font-semibold transition-colors flex items-center text-sm cursor-pointer"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-brand-gold mr-3"></span>
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-brand-indigo mb-6 uppercase text-xs tracking-[0.2em]">Our Solutions</h4>
            <ul className="space-y-4 text-slate-500 font-medium text-sm">
              <li className="hover:text-brand-indigo transition-colors cursor-pointer">Study Abroad (UK/USA/Canada)</li>
              <li className="hover:text-brand-indigo transition-colors cursor-pointer">Web & App Development</li>
              <li className="hover:text-brand-indigo transition-colors cursor-pointer">Graphic Design & Branding</li>
              <li className="hover:text-brand-indigo transition-colors cursor-pointer">Academic Writing & Editing</li>
              <li className="hover:text-brand-indigo transition-colors cursor-pointer">Data Analysis Support</li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-brand-indigo mb-6 uppercase text-xs tracking-[0.2em]">Connect</h4>
            <p className="text-slate-500 text-xs mb-4 leading-relaxed">Stay updated on our latest opportunities and insights.</p>
            {subscribed ? (
              <div className="bg-brand-light p-4 rounded-xl flex items-center space-x-3 animate-fadeIn">
                <div className="bg-brand-indigo text-white rounded-full p-1">
                  <Check size={14} />
                </div>
                <span className="text-brand-indigo font-bold text-xs uppercase tracking-wider">Subscribed!</span>
              </div>
            ) : (
              <form className="space-y-3" onSubmit={handleSubscribe}>
                <input 
                  type="email" 
                  required
                  placeholder="Email Address" 
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-brand-indigo transition-all text-sm"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <button 
                  disabled={submitting}
                  className="w-full bg-brand-indigo text-white py-3 rounded-xl font-bold hover:brightness-125 transition-all shadow-lg shadow-brand-indigo/10 text-xs uppercase tracking-widest disabled:opacity-50"
                >
                  {submitting ? 'Processing...' : 'Subscribe'}
                </button>
              </form>
            )}
          </div>
        </div>

        <div className="pt-12 border-t border-slate-100 flex flex-col md:flex-row justify-between items-center text-[11px] uppercase tracking-[0.15em] text-slate-400 font-bold">
          <p>© {new Date().getFullYear()} Bloomview Consults. Excellence in Growth.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" onClick={(e) => e.preventDefault()} className="hover:text-brand-indigo transition-colors">Privacy Policy</a>
            <a href="#" onClick={(e) => e.preventDefault()} className="hover:text-brand-indigo transition-colors">Terms of Service</a>
            <div className="flex items-center space-x-1">
              <Globe size={12} />
              <span>International</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};