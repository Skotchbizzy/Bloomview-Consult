import React, { useState, useEffect } from 'react';
import { Shield, X, Trash2, CheckCircle, Clock, Search, Database, BarChart3, List, PieChart, Wifi, WifiOff, Loader2, Info, ExternalLink } from 'lucide-react';
import { dbService, Lead, AnalyticsData } from '../services/dbService';

export const AdminPortal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<'leads' | 'insights'>('leads');
  const [leads, setLeads] = useState<Lead[]>([]);
  const [analytics, setAnalytics] = useState<AnalyticsData | null>(null);
  const [filter, setFilter] = useState('');
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [passcode, setPasscode] = useState('');
  const [loading, setLoading] = useState(false);
  const [isConnected, setIsConnected] = useState<boolean | null>(null);
  const [showTroubleshoot, setShowTroubleshoot] = useState(false);

  const checkStatus = async () => {
    const status = await dbService.checkConnection();
    setIsConnected(status);
  };

  const refreshData = async (code: string) => {
    setLoading(true);
    await checkStatus();
    if (activeTab === 'leads') {
      const data = await dbService.getLeads(code);
      setLeads(data);
    } else {
      const stats = await dbService.getAnalytics(code);
      setAnalytics(stats);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (isOpen) {
      checkStatus();
      const interval = setInterval(checkStatus, 5000);
      return () => clearInterval(interval);
    }
  }, [isOpen]);

  useEffect(() => {
    if (isAuthorized) refreshData(passcode);
  }, [activeTab]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (passcode === 'bloom2025') {
      setIsAuthorized(true);
      await refreshData('bloom2025');
    } else {
      alert("Invalid Access Code");
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm("Are you sure?")) {
      const success = await dbService.deleteLead(id, passcode);
      if (success) await refreshData(passcode);
    }
  };

  const handleStatus = async (id: string, status: Lead['status']) => {
    const success = await dbService.updateLeadStatus(id, status, passcode);
    if (success) await refreshData(passcode);
  };

  const filteredLeads = leads.filter(l => 
    l.name?.toLowerCase().includes(filter.toLowerCase()) || 
    l.email?.toLowerCase().includes(filter.toLowerCase()) ||
    l.service?.toLowerCase().includes(filter.toLowerCase())
  );

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-brand-indigo/60 backdrop-blur-md" onClick={onClose}></div>
      
      <div className="relative bg-white w-full max-w-5xl h-[85vh] rounded-[32px] shadow-2xl overflow-hidden flex flex-col animate-fadeIn">
        <div className="bg-brand-indigo p-6 text-white flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <div className="bg-brand-gold p-2 rounded-lg shadow-lg">
              <Shield className="text-brand-indigo" size={20} />
            </div>
            <div>
              <h2 className="text-xl font-bold heading-serif flex items-center space-x-3">
                <span>Admin Portal</span>
                <div className={`px-2 py-0.5 rounded-full text-[10px] font-black uppercase flex items-center space-x-1 ${
                  isConnected === true ? 'bg-green-500/20 text-green-400 border border-green-500/30' : 
                  isConnected === false ? 'bg-red-500/20 text-red-400 border border-red-500/30' : 'bg-slate-500/20 text-slate-400'
                }`}>
                  {isConnected === true ? <Wifi size={10} /> : isConnected === false ? <WifiOff size={10} /> : <Loader2 size={10} className="animate-spin" />}
                  <span>{isConnected === true ? 'Live' : isConnected === false ? 'Offline' : 'Connecting'}</span>
                </div>
              </h2>
            </div>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full transition-colors">
            <X size={24} />
          </button>
        </div>

        {isConnected === false && (
          <div className="bg-amber-50 border-b border-amber-100 p-4 animate-fadeIn">
            <div className="max-w-4xl mx-auto flex items-start space-x-4">
              <div className="p-2 bg-amber-100 text-amber-700 rounded-lg"><Info size={20} /></div>
              <div className="flex-1">
                <p className="text-amber-900 font-bold text-sm">Communication Breakdown Detected</p>
                <p className="text-amber-700 text-xs mt-1">The frontend cannot reach your local backend. This usually happens for two reasons:</p>
                
                <div className="grid sm:grid-cols-2 gap-4 mt-3">
                  <div className="bg-white/50 p-3 rounded-xl border border-amber-200 shadow-sm">
                    <p className="text-[10px] font-black uppercase tracking-widest text-amber-800">1. Server Not Running</p>
                    <p className="text-[11px] text-amber-700 mt-1">Run <code>node server.js</code> in your terminal. Look for "BLOOMVIEW SERVER IS RUNNING".</p>
                  </div>
                  <div className="bg-white/50 p-3 rounded-xl border border-amber-200 shadow-sm">
                    <p className="text-[10px] font-black uppercase tracking-widest text-amber-800">2. Browser Block (HTTPS vs HTTP)</p>
                    <p className="text-[11px] text-amber-700 mt-1">If this site is HTTPS, click the 'Lock' icon in the URL bar and select 'Allow Insecure Content'.</p>
                  </div>
                </div>
              </div>
              <button onClick={() => setShowTroubleshoot(true)} className="text-xs font-bold text-brand-indigo underline flex items-center space-x-1">
                <span>View Full Guide</span>
                <ExternalLink size={12} />
              </button>
            </div>
          </div>
        )}

        {!isAuthorized ? (
          <div className="flex-1 flex flex-col items-center justify-center p-12 text-center">
            <Database className="w-16 h-16 text-slate-200 mb-6" />
            <h3 className="text-2xl font-bold text-slate-800 mb-2">Secure Access Required</h3>
            <p className="text-sm text-slate-500 mb-8 max-w-sm">Enter your administrative passcode to access the MySQL and ClickHouse data hubs.</p>
            <form onSubmit={handleLogin} className="w-full max-w-xs space-y-4">
              <input 
                autoFocus
                type="password" 
                placeholder="Passcode"
                className="w-full border-2 border-slate-100 rounded-xl px-4 py-3 text-center text-lg tracking-[0.5em] focus:border-brand-indigo outline-none transition-all"
                value={passcode}
                onChange={(e) => setPasscode(e.target.value)}
              />
              <button className="w-full bg-brand-indigo text-white font-bold py-3 rounded-xl hover:brightness-125 transition-all">Authorize Session</button>
            </form>
          </div>
        ) : (
          <>
            <div className="flex border-b border-slate-100 px-6 bg-slate-50/50">
              <button 
                onClick={() => setActiveTab('leads')}
                className={`py-4 px-6 font-bold text-sm uppercase tracking-widest flex items-center space-x-2 border-b-2 transition-all ${
                  activeTab === 'leads' ? 'border-brand-indigo text-brand-indigo' : 'border-transparent text-slate-400 hover:text-slate-600'
                }`}
              >
                <List size={18} />
                <span>Leads Manager</span>
              </button>
              <button 
                onClick={() => setActiveTab('insights')}
                className={`py-4 px-6 font-bold text-sm uppercase tracking-widest flex items-center space-x-2 border-b-2 transition-all ${
                  activeTab === 'insights' ? 'border-brand-indigo text-brand-indigo' : 'border-transparent text-slate-400 hover:text-slate-600'
                }`}
              >
                <BarChart3 size={18} />
                <span>Insights</span>
              </button>
            </div>

            {activeTab === 'leads' ? (
              <>
                <div className="p-6 border-b border-slate-100 flex flex-col sm:flex-row gap-4 items-center justify-between bg-white">
                  <div className="relative w-full sm:w-96">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                    <input 
                      type="text" 
                      placeholder="Search leads..."
                      className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none"
                      value={filter}
                      onChange={(e) => setFilter(e.target.value)}
                    />
                  </div>
                  <div className="flex items-center space-x-4">
                    <button onClick={() => refreshData(passcode)} className={`p-2 rounded-lg text-slate-400 hover:text-brand-indigo transition-colors ${loading ? 'animate-spin' : ''}`}>
                      <Clock size={20} />
                    </button>
                    <button onClick={() => setIsAuthorized(false)} className="text-slate-400 hover:text-red-500 font-bold text-xs uppercase tracking-widest px-3 py-1 rounded-lg border border-slate-100">Logout</button>
                  </div>
                </div>

                <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-slate-50/30">
                  {filteredLeads.length === 0 && !loading && (
                    <div className="py-20 text-center text-slate-400 font-bold">
                      {isConnected === false ? "Cannot load leads while offline." : "No leads found."}
                    </div>
                  )}
                  {filteredLeads.map((lead) => (
                    <div key={lead.id} className="bg-white border border-slate-100 rounded-2xl p-5 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4 group hover:border-brand-indigo/20 transition-all">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3">
                          <h4 className="font-bold text-slate-900">{lead.name}</h4>
                          <span className={`text-[9px] font-black px-2 py-0.5 rounded-full uppercase tracking-tighter ${
                            lead.status === 'new' ? 'bg-brand-gold/20 text-brand-indigo' : 
                            lead.status === 'contacted' ? 'bg-blue-50 text-blue-600' : 'bg-green-50 text-green-600'
                          }`}>
                            {lead.status}
                          </span>
                        </div>
                        <p className="text-xs text-slate-500 mt-1">{lead.email} • <span className="text-brand-indigo font-bold">{lead.service}</span></p>
                        <p className="mt-2 text-sm text-slate-600 italic border-l-2 border-slate-100 pl-3">"{lead.message}"</p>
                      </div>
                      <div className="flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        {lead.status !== 'resolved' && (
                          <button onClick={() => handleStatus(lead.id, 'resolved')} className="p-2 bg-slate-50 text-brand-indigo hover:bg-brand-indigo hover:text-white rounded-lg transition-all" title="Mark Resolved"><CheckCircle size={16} /></button>
                        )}
                        <button onClick={() => handleDelete(lead.id)} className="p-2 bg-red-50 text-red-500 hover:bg-red-500 hover:text-white rounded-lg transition-all" title="Delete Lead"><Trash2 size={16} /></button>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <div className="flex-1 flex flex-col items-center justify-center p-8 bg-slate-50/50">
                <BarChart3 className="w-12 h-12 text-slate-200 mb-4" />
                <p className="font-bold uppercase tracking-widest text-xs text-slate-400">Insight visualization coming soon.</p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};