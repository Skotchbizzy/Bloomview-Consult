import React, { useState } from 'react';
import { Mail, Phone, MessageSquare, Send, MapPin, Loader2, CheckCircle2 } from 'lucide-react';
import { dbService } from '../services/dbService';

export const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    service: 'study-abroad',
    message: '',
    honeypot: '' // SECURITY: Anti-bot field
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // SECURITY: If honeypot is filled, it's a bot
    if (formData.honeypot) {
      console.warn("Bot detected.");
      return;
    }

    setIsSubmitting(true);
    
    const success = await dbService.saveLead({
      name: formData.name,
      email: formData.email,
      service: formData.service,
      message: formData.message
    });

    setIsSubmitting(false);
    if (success) {
      setSubmitted(true);
      setFormData({ name: '', email: '', service: 'study-abroad', message: '', honeypot: '' });
      setTimeout(() => setSubmitted(false), 8000);
    } else {
      alert("Something went wrong. Please try again or email us directly.");
    }
  };

  return (
    <section id="contact" className="py-24 bg-brand-indigo text-white relative overflow-hidden">
      <div className="absolute top-0 right-0 w-full h-full opacity-5 pointer-events-none">
        <div className="absolute top-0 left-1/2 w-[1000px] h-[1000px] bg-brand-gold rounded-full blur-[120px] -translate-x-1/2 -translate-y-1/2 pointer-events-none"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16">
          <div className="space-y-8">
            <div>
              <h2 className="text-brand-gold font-bold tracking-widest uppercase mb-2">Contact Us</h2>
              <p className="text-4xl font-bold heading-serif mb-6 leading-tight">Let's Start Your <br />Growth Journey</p>
              <p className="text-slate-300 text-lg leading-relaxed max-w-md">
                Have questions or ready to book a consultation? Reach out to us via any of the channels below or fill out our secure form.
              </p>
            </div>

            <div className="space-y-6">
              <div className="flex items-center space-x-4 p-5 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all group">
                <div className="w-12 h-12 bg-brand-gold/20 text-brand-gold rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Mail size={24} />
                </div>
                <div>
                  <p className="text-xs font-bold uppercase tracking-widest text-slate-400">Email Address</p>
                  <p className="text-lg font-bold">bloomviewconsults@gmail.com</p>
                </div>
              </div>
              <div className="flex items-center space-x-4 p-5 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all group">
                <div className="w-12 h-12 bg-brand-gold/20 text-brand-gold rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Phone size={24} />
                </div>
                <div>
                  <p className="text-xs font-bold uppercase tracking-widest text-slate-400">Phone & WhatsApp</p>
                  <p className="text-lg font-bold">+234 (0) 800 BLOOMVIEW</p>
                </div>
              </div>
            </div>

            <div className="pt-6">
              <a 
                href="https://wa.me/2348000000000" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-3 bg-brand-gold text-brand-indigo px-10 py-4 rounded-full font-extrabold hover:brightness-110 transition-all shadow-2xl shadow-brand-gold/10 transform hover:-translate-y-1"
              >
                <MessageSquare size={20} />
                <span>Chat on WhatsApp</span>
              </a>
            </div>
          </div>

          <div className="bg-white rounded-3xl p-8 lg:p-12 shadow-2xl text-slate-900 border-t-8 border-brand-gold transition-all duration-500">
            {submitted ? (
              <div className="h-full flex flex-col items-center justify-center text-center space-y-6 animate-fadeIn py-10">
                <div className="w-24 h-24 bg-green-50 text-green-500 rounded-full flex items-center justify-center shadow-inner animate-bounce-slow">
                  <CheckCircle2 size={48} />
                </div>
                <div>
                  <h3 className="text-2xl font-bold heading-serif text-brand-indigo">Securely Received</h3>
                  <p className="text-slate-600 mt-2">Your inquiry has been logged in our secure database. A consultant will contact you within 24 hours.</p>
                </div>
                <button 
                  onClick={() => setSubmitted(false)}
                  className="bg-brand-indigo text-white px-8 py-3 rounded-xl font-bold hover:brightness-125 transition-all"
                >
                  Send Another Inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Honeypot Field - Hidden from humans, caught by bots */}
                <input 
                  type="text" 
                  name="honeypot" 
                  className="hidden" 
                  tabIndex={-1} 
                  autoComplete="off"
                  value={formData.honeypot}
                  onChange={(e) => setFormData({...formData, honeypot: e.target.value})}
                />

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700 uppercase tracking-wide">Your Name</label>
                    <input 
                      required
                      type="text" 
                      placeholder="John Doe"
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-brand-indigo transition-all"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700 uppercase tracking-wide">Email Address</label>
                    <input 
                      required
                      type="email" 
                      placeholder="john@example.com"
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-brand-indigo transition-all"
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700 uppercase tracking-wide">Service of Interest</label>
                  <select 
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-brand-indigo transition-all"
                    value={formData.service}
                    onChange={(e) => setFormData({...formData, service: e.target.value})}
                  >
                    <option value="Study Abroad Consultancy">Study Abroad Consultancy</option>
                    <option value="IT Solutions">IT Solutions</option>
                    <option value="Academic & Research Support">Academic & Research Support</option>
                    <option value="General Inquiry">General Inquiry</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700 uppercase tracking-wide">Your Message</label>
                  <textarea 
                    required
                    rows={4}
                    placeholder="Tell us about your goals..."
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-brand-indigo transition-all"
                    value={formData.message}
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                  ></textarea>
                </div>
                <button 
                  disabled={isSubmitting}
                  type="submit"
                  className="w-full bg-brand-indigo text-white font-bold py-4 rounded-xl hover:brightness-125 transition-all shadow-xl shadow-brand-indigo/20 transform hover:-translate-y-1 flex items-center justify-center space-x-2 disabled:opacity-70"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 size={20} className="animate-spin" />
                      <span>Transmitting...</span>
                    </>
                  ) : (
                    <>
                      <Send size={20} />
                      <span>Book My Consultation</span>
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};