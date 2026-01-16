import React, { useState, useEffect } from 'react';
import { Shield, X, Trash2, CheckCircle, Clock, Search, LogOut, Database } from 'lucide-react';
import { dbService, Lead } from '../services/dbService';

export const AdminPortal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [filter, setFilter] = useState('');
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [passcode, setPasscode] = useState('');

  useEffect(() => {
    if (isOpen && isAuthorized) {
      setLeads(dbService.getLeads());
    }
  }, [isOpen, isAuthorized]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would be a real authentication call
    if (passcode === 'bloom2025') {
      setIsAuthorized(true);
    } else {
      alert("Invalid Access Code");
    }
  };

  const handleDelete = (id: string) => {
    if (window.confirm("Are you sure you want to delete this lead?")) {
      dbService.deleteLead(id);
      setLeads(dbService.getLeads());
    }
  };

  const handleStatus = (id: string, status: Lead['status']) => {
    dbService.updateLeadStatus(id, status);
    setLeads(dbService.getLeads());
  };

  const filteredLeads = leads.filter(l => 
    l.name.toLowerCase().includes(filter.toLowerCase()) || 
    l.email.toLowerCase().includes(filter.toLowerCase()) ||
    l.service.toLowerCase().includes(filter.toLowerCase())
  );

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-brand-indigo/60 backdrop-blur-md" onClick={onClose}></div>
      
      <div className="relative bg-white w-full max-w-5xl h-[80vh] rounded-[32px] shadow-2xl overflow-hidden flex flex-col animate-fadeIn">
        {/* Header */}
        <div className="bg-brand-indigo p-6 text-white flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <div className="bg-brand-gold p-2 rounded-lg">
              <Shield className="text-brand-indigo" size={20} />
            </div>
            <div>
              <h2 className="text-xl font-bold heading-serif">Admin Command Center</h2>
              <p className="text-xs text-brand-gold/80 font-bold uppercase tracking-widest">Secure Backend Access</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full transition-colors">
            <X size={24} />
          </button>
        </div>

        {!isAuthorized ? (
          <div className="flex-1 flex flex-col items-center justify-center p-12 text-center">
            <Database className="w-16 h-16 text-slate-200 mb-6" />
            <h3 className="text-2xl font-bold text-slate-800 mb-2">Restricted Access</h3>
            <p className="text-slate-500 mb-8 max-w-sm">Please enter your Bloomview administrator passcode to access the secure lead database.</p>
            <form onSubmit={handleLogin} className="w-full max-w-xs space-y-4">
              <input 
                autoFocus
                type="password" 
                placeholder="Enter Passcode"
                className="w-full border-2 border-slate-100 rounded-xl px-4 py-3 text-center text-lg tracking-[0.5em] focus:border-brand-indigo outline-none transition-all"
                value={passcode}
                onChange={(e) => setPasscode(e.target.value)}
              />
              <button className="w-full bg-brand-indigo text-white font-bold py-3 rounded-xl hover:brightness-125 transition-all">
                Authorize Access
              </button>
            </form>
          </div>
        ) : (
          <>
            {/* Toolbar */}
            <div className="p-6 border-b border-slate-100 flex flex-col sm:flex-row gap-4 items-center justify-between bg-slate-50/50">
              <div className="relative w-full sm:w-96">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input 
                  type="text" 
                  placeholder="Search leads by name, email or service..."
                  className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-brand-indigo/20 outline-none"
                  value={filter}
                  onChange={(e) => setFilter(e.target.value)}
                />
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-xs font-bold text-slate-400 uppercase mr-4">{filteredLeads.length} Total Records</span>
                <button 
                  onClick={() => setIsAuthorized(false)}
                  className="flex items-center space-x-2 text-slate-500 hover:text-red-600 font-bold text-xs uppercase tracking-widest px-3 py-2"
                >
                  <LogOut size={14} />
                  <span>Lock Database</span>
                </button>
              </div>
            </div>

            {/* List */}
            <div className="flex-1 overflow-y-auto p-6">
              {filteredLeads.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-slate-300">
                  <Clock size={48} className="mb-4 opacity-20" />
                  <p className="font-bold">No leads matching your criteria.</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {filteredLeads.map((lead) => (
                    <div key={lead.id} className="bg-white border border-slate-100 rounded-2xl p-5 shadow-sm hover:shadow-md transition-all flex flex-col md:flex-row md:items-center justify-between gap-6">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-1">
                          <h4 className="font-bold text-slate-900 text-lg">{lead.name}</h4>
                          <span className={`text-[10px] font-black px-2 py-0.5 rounded-full uppercase ${
                            lead.status === 'new' ? 'bg-brand-gold/20 text-brand-indigo' : 
                            lead.status === 'contacted' ? 'bg-blue-50 text-blue-600' : 'bg-green-50 text-green-600'
                          }`}>
                            {lead.status}
                          </span>
                        </div>
                        <div className="flex flex-wrap gap-x-4 text-xs text-slate-500 font-medium">
                          <span>{lead.email}</span>
                          <span className="text-brand-indigo font-bold">Interested in: {lead.service}</span>
                          <span>{new Date(lead.timestamp).toLocaleDateString()}</span>
                        </div>
                        <p className="mt-3 text-sm text-slate-600 italic border-l-2 border-slate-100 pl-4 py-1">"{lead.message}"</p>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        {lead.status !== 'resolved' && (
                          <button 
                            onClick={() => handleStatus(lead.id, lead.status === 'new' ? 'contacted' : 'resolved')}
                            className="p-2.5 bg-brand-light text-brand-indigo hover:bg-brand-indigo hover:text-white rounded-xl transition-all"
                            title="Update Status"
                          >
                            <CheckCircle size={18} />
                          </button>
                        )}
                        <button 
                          onClick={() => handleDelete(lead.id)}
                          className="p-2.5 bg-red-50 text-red-500 hover:bg-red-500 hover:text-white rounded-xl transition-all"
                          title="Delete Lead"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};