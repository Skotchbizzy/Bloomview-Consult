import React from 'react';
import { X, Shield, FileText, Lock, Globe, Scale } from 'lucide-react';

interface LegalModalProps {
  type: 'privacy' | 'terms' | null;
  onClose: () => void;
}

export const LegalModal: React.FC<LegalModalProps> = ({ type, onClose }) => {
  if (!type) return null;

  const isPrivacy = type === 'privacy';

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-brand-indigo/80 backdrop-blur-sm animate-fadeIn" onClick={onClose}></div>
      
      <div className="relative bg-white w-full max-w-4xl max-h-[90vh] rounded-[40px] shadow-2xl overflow-hidden flex flex-col animate-fadeIn border-t-8 border-brand-gold">
        {/* Header */}
        <div className="p-8 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
          <div className="flex items-center space-x-4">
            <div className="bg-brand-indigo p-3 rounded-2xl text-white shadow-lg">
              {isPrivacy ? <Shield size={24} /> : <Scale size={24} />}
            </div>
            <div>
              <h2 className="text-2xl font-bold heading-serif text-brand-indigo">
                {isPrivacy ? 'Privacy Policy' : 'Terms of Service'}
              </h2>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Effective Date: October 2023</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-slate-200 rounded-full transition-colors text-slate-400">
            <X size={28} />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-8 lg:p-12 prose prose-slate max-w-none">
          {isPrivacy ? (
            <div className="space-y-8">
              <section>
                <div className="flex items-center space-x-2 text-brand-indigo mb-3">
                  <Globe size={18} />
                  <h3 className="text-xl font-bold m-0">Introduction</h3>
                </div>
                <p className="text-slate-600 leading-relaxed">
                  At Bloomview Consults, we value your privacy. This policy outlines how we collect, use, and protect your personal information when you use our IT solutions, study abroad consultancy, and academic support services.
                </p>
              </section>

              <section>
                <div className="flex items-center space-x-2 text-brand-indigo mb-3">
                  <FileText size={18} />
                  <h3 className="text-xl font-bold m-0">Information We Collect</h3>
                </div>
                <p className="text-slate-600 leading-relaxed">
                  We collect information that you provide directly to us through our contact forms, newsletter signups, and consultation bookings. This may include:
                </p>
                <ul className="list-disc pl-5 text-slate-600 space-y-2 mt-2">
                  <li><strong>Personal Identifiers:</strong> Name, email address, phone number.</li>
                  <li><strong>Consultancy Data:</strong> Educational background, target study destinations (UK/USA/Canada), and research interests.</li>
                  <li><strong>Technical Data:</strong> IP address, browser type, and usage patterns via ClickHouse analytics.</li>
                </ul>
              </section>

              <section>
                <div className="flex items-center space-x-2 text-brand-indigo mb-3">
                  <Lock size={18} />
                  <h3 className="text-xl font-bold m-0">How We Protect Your Data</h3>
                </div>
                <p className="text-slate-600 leading-relaxed">
                  Your data is stored securely in our MySQL and ClickHouse databases. We implement industry-standard encryption and access controls. We do not sell your personal data to third parties. For study abroad applicants, data is shared only with partner institutions with your explicit consent.
                </p>
              </section>
            </div>
          ) : (
            <div className="space-y-8">
              <section>
                <div className="flex items-center space-x-2 text-brand-indigo mb-3">
                  <Scale size={18} />
                  <h3 className="text-xl font-bold m-0">Acceptance of Terms</h3>
                </div>
                <p className="text-slate-600 leading-relaxed">
                  By accessing or using Bloomview Consults' services, you agree to be bound by these Terms of Service. If you do not agree, please refrain from using our website.
                </p>
              </section>

              <section>
                <h3 className="text-xl font-bold text-brand-indigo mb-3">Service Boundaries</h3>
                <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
                  <ul className="list-disc pl-5 text-slate-600 space-y-3 m-0">
                    <li><strong>Consultancy:</strong> Our advice is based on current immigration and academic trends. However, Bloomview Consults does not guarantee university admission or visa approval, as these are determined by third-party authorities.</li>
                    <li><strong>IT Solutions:</strong> Project timelines and deliverables are defined in individual service agreements.</li>
                    <li><strong>Academic Support:</strong> Our research support is intended for guidance and editing purposes. Clients are responsible for ensuring their final submissions comply with their institution's academic integrity policies.</li>
                  </ul>
                </div>
              </section>

              <section>
                <h3 className="text-xl font-bold text-brand-indigo mb-3">Intellectual Property</h3>
                <p className="text-slate-600 leading-relaxed m-0">
                  The content, logo, and branding on this website are the property of Bloomview Consults. Unauthorized use of our materials is strictly prohibited.
                </p>
              </section>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-8 border-t border-slate-100 bg-slate-50 flex justify-center">
          <button 
            onClick={onClose}
            className="bg-brand-indigo text-white px-12 py-3 rounded-2xl font-bold hover:brightness-125 transition-all shadow-lg"
          >
            I Understand
          </button>
        </div>
      </div>
    </div>
  );
};