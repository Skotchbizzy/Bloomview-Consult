
import React, { useState } from 'react';
import { Monitor, GraduationCap, BookOpen, ChevronRight } from 'lucide-react';
import { SERVICES } from '../constants';

const IconMap = {
  Monitor: Monitor,
  GraduationCap: GraduationCap,
  BookOpen: BookOpen
};

export const Services: React.FC = () => {
  const [activeTab, setActiveTab] = useState<number>(0);

  return (
    <section id="services" className="py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-brand-indigo font-bold tracking-widest uppercase mb-2">Our Expertise</h2>
          <p className="text-4xl font-bold heading-serif text-slate-900 mb-6 leading-tight">Comprehensive Solutions <br />Tailored to Your Needs</p>
          <p className="text-slate-600 text-lg">Whether you are building the future of tech, seeking global education, or pursuing academic excellence, we have the expertise to get you there.</p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Navigation Sidebar */}
          <div className="lg:w-1/3 flex flex-col space-y-4">
            {SERVICES.map((service, index) => {
              const Icon = IconMap[service.icon as keyof typeof IconMap];
              return (
                <button
                  key={index}
                  onClick={() => setActiveTab(index)}
                  className={`flex items-center p-6 rounded-2xl transition-all text-left border-2 ${
                    activeTab === index 
                      ? 'bg-white border-brand-indigo shadow-xl' 
                      : 'bg-transparent border-transparent hover:bg-brand-indigo/5'
                  }`}
                >
                  <div className={`p-3 rounded-xl mr-4 ${activeTab === index ? 'bg-brand-indigo text-white' : 'bg-white text-brand-indigo shadow-sm'}`}>
                    <Icon size={24} />
                  </div>
                  <div>
                    <h3 className={`font-bold text-lg ${activeTab === index ? 'text-brand-indigo' : 'text-slate-600'}`}>
                      {service.title}
                    </h3>
                    <p className="text-sm text-slate-500 line-clamp-1">{service.description}</p>
                  </div>
                  <ChevronRight className={`ml-auto transition-transform ${activeTab === index ? 'text-brand-indigo rotate-90' : 'text-slate-300'}`} />
                </button>
              );
            })}
          </div>

          {/* Details Content */}
          <div className="lg:w-2/3">
            <div className="bg-white rounded-3xl shadow-2xl p-8 lg:p-12 min-h-[500px] border border-brand-indigo/5 animate-fadeIn">
              <div className="flex items-center space-x-4 mb-8">
                <div className="w-16 h-16 bg-brand-indigo text-white rounded-2xl flex items-center justify-center shadow-lg">
                  {React.createElement(IconMap[SERVICES[activeTab].icon as keyof typeof IconMap], { size: 32 })}
                </div>
                <div>
                  <h3 className="text-3xl font-bold heading-serif text-brand-indigo">{SERVICES[activeTab].title}</h3>
                  <p className="text-slate-500 font-medium">{SERVICES[activeTab].description}</p>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                {SERVICES[activeTab].subServices.map((sub, idx) => (
                  <div key={idx} className="flex items-start space-x-3 p-4 rounded-xl bg-slate-50 hover:bg-brand-light transition-all border border-transparent hover:border-brand-indigo/10">
                    <div className="mt-1 flex-shrink-0 w-2.5 h-2.5 rounded-full bg-brand-gold shadow-sm"></div>
                    <span className="text-slate-700 font-semibold">{sub}</span>
                  </div>
                ))}
              </div>

              <div className="mt-12 pt-8 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-6">
                <p className="text-slate-500 italic">Interested in these services? Let's discuss your goals.</p>
                <a 
                  href="#contact" 
                  className="bg-brand-indigo text-white px-8 py-3 rounded-xl font-bold hover:bg-opacity-90 transition-all shadow-xl hover:shadow-brand-indigo/30"
                >
                  Request Consultation
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
