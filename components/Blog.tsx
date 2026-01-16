import React, { useState, useEffect, useCallback } from 'react';
import { ArrowRight, Calendar, Clock, RefreshCw, ExternalLink, Sparkles, AlertCircle } from 'lucide-react';
import { BLOG_POSTS } from '../constants';
import { getLatestNews } from '../services/geminiService';
import { BlogPost } from '../types';

export const Blog: React.FC = () => {
  const [posts, setPosts] = useState<BlogPost[]>(BLOG_POSTS);
  const [loading, setLoading] = useState(false);
  const [isLive, setIsLive] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchLiveNews = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const dynamicPosts = await getLatestNews();
      if (dynamicPosts && dynamicPosts.length > 0) {
        setPosts(dynamicPosts);
        setIsLive(true);
      }
    } catch (err) {
      console.error("Failed to load live news:", err);
      setError("Unable to sync live updates right now. Showing featured insights instead.");
      // Fallback to static posts if they aren't already set
      if (posts.length === 0) setPosts(BLOG_POSTS);
    } finally {
      setLoading(false);
    }
  }, [posts.length]);

  // Automatically fetch live news on mount
  useEffect(() => {
    fetchLiveNews();
  }, []);

  // Robust link handler to bypass common iframe/preview environment issues
  const handleSourceLink = (e: React.MouseEvent, url: string | undefined) => {
    e.preventDefault();
    if (!url || url === "#") return;
    
    // Use window.open with specific features to encourage browser to open a real new tab
    // which usually bypasses iframe 'refused to connect' restrictions
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <section id="blog" className="py-24 bg-brand-light/30 transition-all duration-500">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16">
          <div className="max-w-2xl">
            <div className="flex items-center space-x-2 mb-2">
              <h2 className="text-brand-indigo font-bold tracking-widest uppercase">Bloomview Insights</h2>
              {isLive && !loading && (
                <span className="flex items-center space-x-1 bg-green-100 text-green-700 text-[10px] font-black px-2 py-0.5 rounded-full animate-pulse border border-green-200">
                  <span className="w-1 h-1 bg-green-500 rounded-full"></span>
                  <span>LIVE FEED SYNCED</span>
                </span>
              )}
            </div>
            <p className="text-4xl font-bold heading-serif text-slate-900 leading-tight">Latest from the World of <br />Tech & AI</p>
            <p className="mt-4 text-slate-600 text-lg">Stay updated with the trends, innovations, and opportunities shaping the global landscape.</p>
            
            {error && (
              <div className="mt-4 flex items-center space-x-2 text-amber-600 bg-amber-50 px-4 py-2 rounded-lg text-sm border border-amber-100 animate-fadeIn">
                <AlertCircle size={16} />
                <span>{error}</span>
              </div>
            )}
          </div>
          
          <div className="flex space-x-4 mt-6 md:mt-0">
            <button 
              onClick={fetchLiveNews}
              disabled={loading}
              className={`flex items-center space-x-2 bg-white border border-slate-200 text-brand-indigo px-5 py-2.5 rounded-xl font-bold text-sm shadow-sm hover:shadow-md transition-all active:scale-95 disabled:opacity-50 ${loading ? 'animate-pulse' : ''}`}
            >
              <RefreshCw size={16} className={loading ? 'animate-spin' : ''} />
              <span>{loading ? 'Updating...' : 'Sync Live News'}</span>
            </button>
            <button className="hidden sm:flex items-center space-x-2 text-brand-indigo font-bold uppercase tracking-widest text-sm hover:translate-x-1 transition-transform group">
              <span>Archive</span>
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post) => (
            <article 
              key={post.id} 
              className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl transition-all border border-slate-100 group flex flex-col h-full animate-fadeIn"
            >
              <div className="relative h-56 overflow-hidden">
                <img 
                  src={post.image} 
                  alt={post.title} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute top-4 left-4 flex space-x-2">
                  <span className="bg-brand-indigo text-white px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                    {post.category}
                  </span>
                  {isLive && post.url && (
                    <span className="bg-brand-gold text-brand-indigo px-2 py-1 rounded-full text-[10px] font-black uppercase flex items-center shadow-sm">
                      <Sparkles size={10} className="mr-1" />
                      SOURCE VERIFIED
                    </span>
                  )}
                </div>
              </div>
              
              <div className="p-8 flex flex-col flex-1">
                <div className="flex items-center space-x-4 text-slate-400 text-xs font-bold uppercase tracking-widest mb-4">
                  <div className="flex items-center space-x-1">
                    <Calendar size={14} />
                    <span>{post.date}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Clock size={14} />
                    <span>{post.readTime}</span>
                  </div>
                </div>
                
                <h3 className="text-xl font-bold text-brand-indigo mb-4 group-hover:text-brand-indigo/80 transition-colors line-clamp-2">
                  {post.title}
                </h3>
                <p className="text-slate-600 text-sm leading-relaxed mb-6 flex-1 line-clamp-3">
                  {post.excerpt}
                </p>
                
                <div className="pt-6 border-t border-slate-50">
                  <button 
                    onClick={(e) => handleSourceLink(e, post.url)}
                    className="text-brand-indigo font-extrabold text-xs uppercase tracking-[0.2em] flex items-center group/btn w-full text-left"
                  >
                    {post.url ? 'Visit News Source' : 'Read Full Story'}
                    {post.url ? <ExternalLink size={14} className="ml-2 group-hover/btn:scale-110 transition-transform" /> : <ArrowRight size={14} className="ml-2 group-hover/btn:translate-x-1 transition-transform" />}
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* AI Pulse Banner */}
        <div className="mt-16 bg-brand-indigo rounded-[40px] p-8 lg:p-12 relative overflow-hidden text-white shadow-2xl">
          <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-brand-gold/10 to-transparent pointer-events-none"></div>
          <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="max-w-xl text-center lg:text-left">
              <h4 className="text-brand-gold font-bold uppercase tracking-[0.3em] text-xs mb-4">Growth Assistant</h4>
              <h3 className="text-3xl font-bold heading-serif mb-4 leading-tight">Looking for deep-dive information?</h3>
              <p className="text-slate-300">Our Growth Assistant is connected to the live web via Gemini Search. Ask it for detailed summaries of any recent tech or educational news.</p>
            </div>
            <button 
               onClick={() => {
                 const chatBtn = document.querySelector('[class*="fixed bottom-6 right-6"]') as HTMLButtonElement;
                 if (chatBtn) chatBtn.click();
               }}
               className="bg-brand-gold text-brand-indigo px-10 py-5 rounded-2xl font-extrabold text-sm uppercase tracking-widest hover:scale-105 transition-transform shadow-xl shadow-brand-gold/10"
            >
              Ask Bloomview AI
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};