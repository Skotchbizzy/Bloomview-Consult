
import React from 'react';
import { ShieldCheck, Award, TrendingUp, Layers } from 'lucide-react';
import { CORE_VALUES } from '../constants';

const IconMap = {
  ShieldCheck: ShieldCheck,
  Award: Award,
  TrendingUp: TrendingUp,
  Layers: Layers
};

export const WhyUs: React.FC = () => {
  return (
    <section id="why-us" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <div>
              <h2 className="text-brand-indigo font-bold tracking-widest uppercase mb-2">Why Choose Us</h2>
              <p className="text-4xl font-bold heading-serif text-slate-900 leading-tight">Your Success is Our <br />Biggest Achievement</p>
              <p className="mt-6 text-lg text-slate-600 leading-relaxed">
                We combine technical expertise with human-centered consulting to ensure you don't just achieve your goals, but surpass them. Our values drive every interaction.
              </p>
            </div>

            <ul className="space-y-4">
              <li className="flex items-center space-x-3 text-slate-700 group">
                <div className="bg-brand-indigo/10 p-1.5 rounded-full transition-colors group-hover:bg-brand-indigo group-hover:text-white"><ShieldCheck size={20} /></div>
                <span className="font-bold text-lg text-brand-indigo">Personalized Support</span>
              </li>
              <li className="flex items-center space-x-3 text-slate-700 group">
                <div className="bg-brand-indigo/10 p-1.5 rounded-full transition-colors group-hover:bg-brand-indigo group-hover:text-white"><ShieldCheck size={20} /></div>
                <span className="font-bold text-lg text-brand-indigo">Professional and Ethical Service</span>
              </li>
              <li className="flex items-center space-x-3 text-slate-700 group">
                <div className="bg-brand-indigo/10 p-1.5 rounded-full transition-colors group-hover:bg-brand-indigo group-hover:text-white"><ShieldCheck size={20} /></div>
                <span className="font-bold text-lg text-brand-indigo">Affordable and Transparent Pricing</span>
              </li>
            </ul>

            <div className="pt-6">
              <div className="bg-brand-indigo rounded-3xl p-8 text-white flex items-center justify-between shadow-2xl relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-10 -mt-10 blur-xl"></div>
                <div className="relative z-10">
                  <p className="text-4xl font-bold text-brand-gold">500+</p>
                  <p className="text-brand-light/80 text-sm font-bold uppercase tracking-widest">Global Placements</p>
                </div>
                <div className="w-px h-12 bg-white/20"></div>
                <div className="relative z-10">
                  <p className="text-4xl font-bold text-brand-gold">100%</p>
                  <p className="text-brand-light/80 text-sm font-bold uppercase tracking-widest">Client Satisfaction</p>
                </div>
                <div className="w-px h-12 bg-white/20"></div>
                <div className="relative z-10">
                  <p className="text-4xl font-bold text-brand-gold">10+</p>
                  <p className="text-brand-light/80 text-sm font-bold uppercase tracking-widest">Years Experience</p>
                </div>
              </div>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-6">
            {CORE_VALUES.map((value, index) => {
              const Icon = IconMap[value.icon as keyof typeof IconMap];
              return (
                <div key={index} className="p-8 rounded-3xl bg-brand-light hover:bg-white transition-all border border-brand-indigo/5 shadow-sm hover:shadow-2xl transform hover:-translate-y-2 group">
                  <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center mb-6 shadow-md text-brand-indigo group-hover:bg-brand-indigo group-hover:text-white transition-all">
                    <Icon size={28} />
                  </div>
                  <h3 className="text-xl font-bold heading-serif text-brand-indigo mb-3">{value.title}</h3>
                  <p className="text-slate-600 leading-relaxed text-sm">
                    {value.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
