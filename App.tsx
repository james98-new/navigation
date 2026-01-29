
import React, { useState, useMemo, useEffect } from 'react';
import Sidebar from './components/Sidebar.tsx';
import LinkCard from './components/LinkCard.tsx';
import AdminModal from './components/AdminModal.tsx';
import { NAV_LINKS, CATEGORIES } from './constants.tsx';
import { Search, Sparkles, Menu, X, Lock } from 'lucide-react';
import { getAIToolRecommendations } from './services/geminiService.ts';
import { LinkItem } from './types.ts';

const STORAGE_KEY = 'novanav_links_data';
const AUTH_KEY = 'novanav_is_admin';

const App: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [aiRecommendations, setAiRecommendations] = useState<any[]>([]);
  const [isAiLoading, setIsAiLoading] = useState(false);
  
  const [links, setLinks] = useState<LinkItem[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : NAV_LINKS;
  });

  const [isAdminMode, setIsAdminMode] = useState(() => {
    return localStorage.getItem(AUTH_KEY) === 'true';
  });
  
  const [isAdminModalOpen, setIsAdminModalOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(links));
  }, [links]);

  useEffect(() => {
    localStorage.setItem(AUTH_KEY, isAdminMode.toString());
  }, [isAdminMode]);

  const filteredLinks = useMemo(() => {
    return links.filter(link => {
      const matchesCategory = activeCategory === 'all' || link.category === activeCategory;
      const matchesSearch = link.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                           link.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery, links]);

  const handleAiSearch = async () => {
    if (!searchQuery.trim()) return;
    setIsAiLoading(true);
    setAiRecommendations([]);
    const results = await getAIToolRecommendations(searchQuery);
    if (results && results.tools) {
      setAiRecommendations(results.tools);
    }
    setIsAiLoading(false);
  };

  const handleAddLink = (newLink: Omit<LinkItem, 'id'>) => {
    const link: LinkItem = {
      ...newLink,
      id: Math.random().toString(36).substr(2, 9)
    };
    setLinks(prev => [link, ...prev]);
  };

  const handleDeleteLink = (id: string) => {
    setLinks(prev => prev.filter(l => l.id !== id));
  };

  const openAdminPanel = () => {
    setIsAdminModalOpen(true);
    setIsMobileMenuOpen(false);
  };

  return (
    <div className="min-h-screen">
      <Sidebar 
        activeCategory={activeCategory} 
        onCategoryChange={(id) => {
          setActiveCategory(id);
          setIsMobileMenuOpen(false);
          setAiRecommendations([]);
        }}
        onAdminClick={openAdminPanel}
        isAdmin={isAdminMode}
      />

      <AdminModal
        isOpen={isAdminModalOpen}
        onClose={() => setIsAdminModalOpen(false)}
        links={links}
        onAddLink={handleAddLink}
        onDeleteLink={handleDeleteLink}
        isAdmin={isAdminMode}
        setIsAdmin={setIsAdminMode}
      />

      {/* Mobile Header */}
      <header className="lg:hidden fixed top-0 left-0 right-0 bg-[#0f172a]/90 backdrop-blur-xl border-b border-white/5 z-30 px-6 py-4 flex items-center justify-between shadow-2xl">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold">N</div>
          <span className="font-bold text-white tracking-tight">NovaNav</span>
        </div>
        <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="p-2 text-white/60">
          {isMobileMenuOpen ? <X /> : <Menu />}
        </button>
      </header>

      <main className="lg:ml-64 p-6 md:p-10 pt-24 lg:pt-16">
        <div className="max-w-[1440px] mx-auto">
          {/* Hero Section */}
          <section className="mb-14">
            <h1 className="text-3xl md:text-5xl font-black text-white mb-8 leading-tight tracking-tight">
              AI 工具 <span className="text-blue-500">资源导航</span>
            </h1>
            
            <div className="relative w-full max-w-lg group">
              <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-white/20 group-focus-within:text-blue-500 transition-colors" />
              </div>
              <input
                type="text"
                placeholder="搜索资源..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="block w-full pl-14 pr-28 py-4 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl text-white text-sm placeholder-white/20 focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500/40 transition-all"
              />
              <div className="absolute inset-y-1.5 right-1.5 flex items-center">
                <button
                  onClick={handleAiSearch}
                  className="px-5 py-2.5 bg-blue-600 text-white rounded-xl font-bold text-xs hover:bg-blue-500 transition-all flex items-center gap-2"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  AI 搜索
                </button>
              </div>
            </div>
          </section>

          {/* Links Grid - 6 Column Ratio on large screens */}
          <section>
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-xl font-black text-white/80 tracking-tight uppercase">
                {activeCategory === 'all' ? '精选发现' : CATEGORIES.find(c => c.id === activeCategory)?.name}
              </h2>
              <div className="h-px flex-1 bg-white/5 mx-6"></div>
              <div className="text-[10px] font-black text-white/20 uppercase tracking-widest">
                {filteredLinks.length} Items
              </div>
            </div>

            {filteredLinks.length > 0 ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-5">
                {filteredLinks.map(link => <LinkCard key={link.id} item={link} />)}
              </div>
            ) : (
              <div className="py-24 text-center">
                <div className="text-white/10 font-black text-4xl mb-4">404</div>
                <p className="text-white/30 text-sm">暂无相关资源</p>
              </div>
            )}
          </section>
        </div>
      </main>

      <footer className="lg:ml-64 p-12 border-t border-white/5 mt-20 text-center lg:text-left">
        <p className="text-[10px] font-black text-white/10 tracking-[0.3em] uppercase">
          Powered by NovaNav &copy; {new Date().getFullYear()}
        </p>
      </footer>
    </div>
  );
};

export default App;
