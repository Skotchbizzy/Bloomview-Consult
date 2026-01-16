import React from 'react';
import { ArrowRight, CheckCircle2, GraduationCap } from 'lucide-react';

export const Hero: React.FC = () => {
  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    const element = document.getElementById(targetId);
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

  return (
    <section id="home" className="relative min-h-screen flex items-center pt-20 overflow-hidden bg-bloom-gradient">
      {/* Abstract background shapes */}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-[500px] h-[500px] bg-brand-indigo/5 rounded-full blur-3xl opacity-60 pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-[400px] h-[400px] bg-brand-gold/10 rounded-full blur-3xl opacity-60 pointer-events-none"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8 animate-fadeIn">
            <div>
              <span className="inline-block py-1.5 px-4 rounded-full bg-brand-indigo/10 text-brand-indigo text-xs font-bold tracking-widest uppercase mb-4 border border-brand-indigo/20">
                Growth • Clarity • Innovation
              </span>
              <h1 className="text-5xl lg:text-7xl font-bold heading-serif text-brand-indigo leading-tight">
                See Opportunity <br />
                <span className="text-brand-indigo/70">Grow Confidently</span>
              </h1>
              <p className="mt-6 text-xl text-slate-600 max-w-lg leading-relaxed">
                Bloomview Consults empowers individuals and organizations through cutting-edge IT solutions and world-class educational consultancy.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="#services"
                onClick={(e) => handleScroll(e, 'services')}
                className="inline-flex items-center justify-center bg-brand-indigo text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-opacity-95 transition-all shadow-xl hover:shadow-brand-indigo/20 transform hover:-translate-y-1 group"
              >
                Explore Services
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </a>
              <a
                href="#contact"
                onClick={(e) => handleScroll(e, 'contact')}
                className="inline-flex items-center justify-center bg-white border-2 border-slate-200 text-brand-indigo px-8 py-4 rounded-xl font-bold text-lg hover:bg-slate-50 transition-all shadow-sm"
              >
                Book a Consultation
              </a>
            </div>

            <div className="flex flex-wrap gap-6 pt-4">
              <div className="flex items-center space-x-2 text-slate-600">
                <CheckCircle2 className="w-5 h-5 text-brand-indigo" />
                <span className="font-semibold">Expert Guidance</span>
              </div>
              <div className="flex items-center space-x-2 text-slate-600">
                <CheckCircle2 className="w-5 h-5 text-brand-indigo" />
                <span className="font-semibold">Global Network</span>
              </div>
              <div className="flex items-center space-x-2 text-slate-600">
                <CheckCircle2 className="w-5 h-5 text-brand-indigo" />
                <span className="font-semibold">Result Driven</span>
              </div>
            </div>
          </div>

          <div className="relative hidden lg:block">
            <div className="relative z-10 rounded-2xl overflow-hidden shadow-2xl transform rotate-1 border-8 border-white">
              <img 
                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=2071&auto=format&fit=crop" 
                alt="Students collaborating" 
                className="w-full h-[600px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-indigo/40 to-transparent"></div>
            </div>
            {/* Floating Card */}
            <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-2xl shadow-2xl z-20 max-w-xs animate-bounce-slow border border-slate-100">
              <div className="flex items-center space-x-4">
                <div className="bg-brand-indigo/10 p-3 rounded-xl">
                  <GraduationCap className="text-brand-indigo w-8 h-8" />
                </div>
                <div>
                  <p className="text-sm text-slate-500 font-medium">Study Abroad</p>
                  <p className="text-lg font-bold text-brand-indigo underline decoration-brand-gold decoration-2 underline-offset-4">Success Rate: 98%</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};