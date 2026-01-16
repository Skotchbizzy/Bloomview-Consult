
import React from 'react';
import { Target, Eye } from 'lucide-react';

export const About: React.FC = () => {
  return (
    <section id="about" className="py-24 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-brand-indigo font-bold tracking-widest uppercase mb-2">Who We Are</h2>
          <p className="text-4xl font-bold heading-serif text-slate-900 leading-tight">Empowering People through <br />Education and Technology</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="order-2 lg:order-1">
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2070&auto=format&fit=crop" 
                alt="Our Team" 
                className="rounded-3xl shadow-2xl z-10 relative grayscale-[20%] hover:grayscale-0 transition-all duration-700"
              />
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-brand-indigo/10 rounded-full -z-0"></div>
              <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-brand-gold/20 rounded-full -z-0"></div>
            </div>
          </div>

          <div className="space-y-8 order-1 lg:order-2">
            <div className="bg-brand-light p-8 rounded-3xl border border-brand-indigo/5">
              <h3 className="text-2xl font-bold heading-serif text-brand-indigo mb-4">Our Story</h3>
              <p className="text-slate-600 leading-relaxed text-lg">
                At Bloomview Consults, our name is our promise. <strong>"Bloom"</strong> represents the growth and flourishing we desire for every client, while <strong>"View"</strong> embodies the clear vision and perspective we bring to complex challenges. 
              </p>
              <p className="mt-4 text-slate-600 leading-relaxed text-lg">
                Founded with a mission to bridge the gap between aspirations and achievements, we specialize in navigating the intricate paths of global education and technological advancement.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 gap-6">
              <div className="p-6 bg-slate-50 rounded-2xl hover:bg-white hover:shadow-xl transition-all border border-slate-100 group">
                <div className="w-12 h-12 bg-brand-indigo/10 rounded-xl flex items-center justify-center mb-4 text-brand-indigo group-hover:bg-brand-indigo group-hover:text-white transition-colors">
                  <Target size={24} />
                </div>
                <h4 className="font-bold text-slate-900 mb-2">Our Mission</h4>
                <p className="text-slate-600 text-sm">Empowering global citizens through transformative education and innovative tech solutions.</p>
              </div>
              <div className="p-6 bg-slate-50 rounded-2xl hover:bg-white hover:shadow-xl transition-all border border-slate-100 group">
                <div className="w-12 h-12 bg-brand-gold/20 rounded-xl flex items-center justify-center mb-4 text-brand-indigo group-hover:bg-brand-indigo group-hover:text-white transition-colors">
                  <Eye size={24} />
                </div>
                <h4 className="font-bold text-slate-900 mb-2">Our Vision</h4>
                <p className="text-slate-600 text-sm">To be the most trusted global brand for holistic personal and professional growth solutions.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
