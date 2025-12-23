'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, Plus, LayoutGrid, Bell, Settings, 
  Layers, Hash, Sparkles, Folder, Lock, 
  MoreHorizontal, ExternalLink, Filter, LucideIcon,
  Star 
} from 'lucide-react';

// Import the interactive overlays
import { CommandPalette, AddLinkModal } from './DashboardOverlays';

// --- Types ---

interface Link {
  id: number;
  title: string;
  domain: string;
  summary: string;
  tags: string[];
  type: 'article' | 'code' | 'sheet' | 'image' | 'video';
  date: string;
  image: string;
}

interface Category {
  id: string;
  label: string;
  icon: LucideIcon;
  color?: string;
}

interface SidebarItemProps {
  icon: LucideIcon;
  label: string;
  active?: boolean;
  onClick: () => void;
  color?: string;
}

interface LinkCardProps {
  data: Link;
}

interface SearchBarProps {
  onClick: () => void;
}

// --- Mock Data ---
const MOCK_LINKS: Link[] = [
  {
    id: 1,
    title: "The Future of Invisible Interfaces",
    domain: "uxdesign.cc",
    summary: "AI will replace traditional navigation with intent-based interaction models.",
    tags: ["Design", "AI"],
    type: "article",
    date: "2h ago",
    image: "bg-gradient-to-br from-purple-500/20 to-indigo-500/20"
  },
  {
    id: 2,
    title: "React Server Components Deep Dive",
    domain: "react.dev",
    summary: "Comprehensive guide to streaming SSR and data fetching patterns in Next.js 14.",
    tags: ["Dev", "React"],
    type: "code",
    date: "4h ago",
    image: "bg-gradient-to-br from-blue-500/20 to-cyan-500/20"
  },
  {
    id: 3,
    title: "Q3 Financial Projections",
    domain: "sheets.google.com",
    summary: "Spreadsheet containing Q3 burn rate and runway analysis.",
    tags: ["Finance", "Work"],
    type: "sheet",
    date: "1d ago",
    image: "bg-gradient-to-br from-emerald-500/20 to-teal-500/20"
  },
  {
    id: 4,
    title: "Design System 2.0 Assets",
    domain: "figma.com",
    summary: "Main component library for the new mobile app refresh.",
    tags: ["Design", "Work"],
    type: "image",
    date: "2d ago",
    image: "bg-gradient-to-br from-pink-500/20 to-rose-500/20"
  },
  {
    id: 5,
    title: "Supabase vs Firebase 2025",
    domain: "youtube.com",
    summary: "Video comparison of vector search capabilities and edge functions.",
    tags: ["Dev", "Database"],
    type: "video",
    date: "3d ago",
    image: "bg-gradient-to-br from-orange-500/20 to-amber-500/20"
  },
  {
    id: 6,
    title: "Minimalist Architecture Trends",
    domain: "archdaily.com",
    summary: "Photo gallery of brutalist concrete structures in Japan.",
    tags: ["Inspo", "Design"],
    type: "image",
    date: "5d ago",
    image: "bg-zinc-800"
  }
];

const CATEGORIES: Category[] = [
  { id: 'all', label: 'All Items', icon: Layers },
  { id: 'design', label: 'Design', icon: Hash, color: 'text-cyan-400' },
  { id: 'dev', label: 'Development', icon: Hash, color: 'text-violet-400' },
  { id: 'finance', label: 'Finance', icon: Hash, color: 'text-emerald-400' },
  { id: 'inspo', label: 'Inspiration', icon: Hash, color: 'text-amber-400' },
];

// --- Components ---

const SidebarItem = ({ icon: Icon, label, active = false, onClick, color }: SidebarItemProps) => (
  <button
    onClick={onClick}
    className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
      active 
        ? "bg-zinc-800 text-white" 
        : "text-zinc-500 hover:bg-zinc-900 hover:text-zinc-300"
    }`}
  >
    <Icon size={18} className={color || (active ? "text-indigo-400" : "text-zinc-600")} />
    <span>{label}</span>
    {active && (
      <motion.div 
        layoutId="active-pill"
        className="ml-auto w-1.5 h-1.5 rounded-full bg-indigo-500"
      />
    )}
  </button>
);

const LinkCard = ({ data }: LinkCardProps) => (
  <motion.div
    layout
    initial={{ opacity: 0, scale: 0.9 }}
    animate={{ opacity: 1, scale: 1 }}
    exit={{ opacity: 0, scale: 0.9 }}
    transition={{ duration: 0.3 }}
    className="group relative break-inside-avoid mb-4"
  >
    <div className="bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden hover:border-zinc-600 transition-all duration-300 hover:shadow-2xl hover:-translate-y-1">
      
      {/* Visual Header / Image Placeholder */}
      <div className={`h-32 w-full ${data.image} relative p-4 flex flex-col justify-between`}>
         <div className="flex justify-between items-start opacity-0 group-hover:opacity-100 transition-opacity duration-300">
             <div className="bg-black/50 backdrop-blur-md p-1.5 rounded-lg text-white cursor-pointer hover:bg-black/70">
                <ExternalLink size={14} />
             </div>
             <div className="bg-black/50 backdrop-blur-md p-1.5 rounded-lg text-white cursor-pointer hover:bg-black/70">
                <MoreHorizontal size={14} />
             </div>
         </div>
      </div>

      {/* Content Body */}
      <div className="p-5">
        <div className="flex items-center gap-2 mb-2">
            <img 
                src={`https://www.google.com/s2/favicons?domain=${data.domain}&sz=32`} 
                alt="favicon"
                className="w-4 h-4 rounded-full opacity-70" 
            />
            <span className="text-[10px] uppercase tracking-wider text-zinc-500 font-mono">{data.domain}</span>
            <span className="text-[10px] text-zinc-600 ml-auto">{data.date}</span>
        </div>
        
        <h3 className="text-zinc-100 font-semibold leading-tight mb-2 group-hover:text-indigo-400 transition-colors">
            {data.title}
        </h3>
        
        <p className="text-zinc-400 text-xs leading-relaxed line-clamp-2 mb-4">
            {data.summary}
        </p>

        {/* Footer: Tags */}
        <div className="flex flex-wrap gap-2 pt-3 border-t border-zinc-800/50">
            {data.tags.map((tag) => (
                <span key={tag} className="text-[10px] px-2 py-0.5 rounded bg-zinc-800 text-zinc-400 border border-zinc-700/50">
                    #{tag}
                </span>
            ))}
        </div>
      </div>
    </div>
  </motion.div>
);

const SearchBar = ({ onClick }: SearchBarProps) => (
    <div 
        onClick={onClick}
        className="relative w-full max-w-xl group cursor-pointer"
    >
        <div className="absolute inset-0 bg-indigo-500/20 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        <div className="relative flex items-center gap-3 bg-zinc-900 border border-zinc-800 text-zinc-400 px-4 py-3 rounded-xl shadow-lg transition-all group-hover:border-zinc-700 group-hover:text-zinc-200">
            <Sparkles size={16} className="text-indigo-400" />
            <span className="text-sm font-medium flex-1 pointer-events-none">Ask RefRence anything...</span>
            <div className="flex gap-1">
                <kbd className="hidden md:inline-flex h-5 items-center gap-1 rounded border border-zinc-700 bg-zinc-800 px-1.5 font-mono text-[10px] font-medium text-zinc-500 opacity-100">
                  <span className="text-xs">⌘</span>K
                </kbd>
            </div>
        </div>
    </div>
);

// --- Main Dashboard ---

const Dashboard: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isAddLinkOpen, setIsAddLinkOpen] = useState(false);

  // Keyboard shortcut for Search
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchOpen(true);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Liquid Filtering Logic
  const filteredLinks = activeCategory === 'all' 
    ? MOCK_LINKS 
    : MOCK_LINKS.filter(link => 
        link.tags.some(tag => tag.toLowerCase() === activeCategory)
      );

  return (
    <div className="flex h-screen bg-black text-zinc-100 font-sans overflow-hidden selection:bg-indigo-500/30">
      
      {/* 1. Sidebar */}
      <aside className="w-64 border-r border-zinc-900 flex flex-col p-4 bg-zinc-950/50 backdrop-blur-xl">
        {/* Brand */}
        <div className="flex items-center gap-2 px-2 mb-8 mt-2">
            <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white font-bold shadow-lg shadow-indigo-500/20">R</div>
            <span className="font-bold text-lg tracking-tight">RefRence</span>
        </div>

        {/* Navigation */}
        <div className="space-y-1 mb-8">
            <div className="px-3 text-xs font-semibold text-zinc-600 uppercase tracking-wider mb-2">Library</div>
            <SidebarItem icon={Layers} label="All Items" active={activeCategory === 'all'} onClick={() => setActiveCategory('all')} />
            <SidebarItem icon={Star} label="Favorites" onClick={() => {}} />
            <SidebarItem icon={Lock} label="Private Vault" onClick={() => {}} />
        </div>

        {/* Smart Stacks */}
        <div className="space-y-1 flex-1">
             <div className="px-3 text-xs font-semibold text-zinc-600 uppercase tracking-wider mb-2 flex justify-between items-center">
                Smart Stacks
                <Plus size={12} className="cursor-pointer hover:text-white" />
             </div>
             {CATEGORIES.filter(c => c.id !== 'all').map(cat => (
                 <SidebarItem 
                    key={cat.id} 
                    icon={cat.icon} 
                    label={cat.label} 
                    active={activeCategory === cat.id} 
                    onClick={() => setActiveCategory(cat.id)}
                    color={cat.color}
                 />
             ))}
        </div>

        {/* Storage / User */}
        <div className="mt-auto pt-4 border-t border-zinc-900 space-y-2">
            <div className="px-3 py-2">
                <div className="flex justify-between text-[10px] text-zinc-500 mb-1">
                    <span>Storage</span>
                    <span>1.2GB / 5GB</span>
                </div>
                <div className="w-full h-1 bg-zinc-800 rounded-full overflow-hidden">
                    <div className="w-[24%] h-full bg-zinc-600 rounded-full"></div>
                </div>
            </div>
            <button className="flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-zinc-900 w-full text-left transition-colors">
                <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500"></div>
                <div className="flex-1">
                    <div className="text-xs font-medium text-zinc-200">Alex Designer</div>
                    <div className="text-[10px] text-zinc-500">Pro Plan</div>
                </div>
                <Settings size={14} className="text-zinc-600" />
            </button>
        </div>
      </aside>

      {/* 2. Main Content Area */}
      <main className="flex-1 flex flex-col h-screen relative">
        
        {/* Top Bar */}
        <header className="h-20 border-b border-zinc-900 flex items-center justify-between px-8 bg-black/50 backdrop-blur-md z-10">
            {/* Search */}
            <SearchBar onClick={() => setIsSearchOpen(true)} />

            {/* Actions */}
            <div className="flex items-center gap-4">
                <button className="p-2 text-zinc-500 hover:text-white hover:bg-zinc-900 rounded-lg transition-colors relative">
                    <Bell size={18} />
                    <span className="absolute top-2 right-2 w-2 h-2 bg-indigo-500 rounded-full border-2 border-black"></span>
                </button>
                <div className="h-6 w-[1px] bg-zinc-800"></div>
                <button 
                    onClick={() => setIsAddLinkOpen(true)}
                    className="flex items-center gap-2 bg-zinc-100 hover:bg-white text-black px-4 py-2 rounded-lg text-sm font-medium transition-colors shadow-[0_0_15px_-3px_rgba(255,255,255,0.3)]"
                >
                    <Plus size={16} /> New Link
                </button>
            </div>
        </header>

        {/* Scrollable Canvas */}
        <div className="flex-1 overflow-y-auto p-8 relative">
            {/* Filters / Sort Bar */}
            <div className="flex items-center justify-between mb-8">
                <h1 className="text-2xl font-bold text-white flex items-center gap-2">
                    {activeCategory === 'all' ? 'All Items' : `#${CATEGORIES.find(c => c.id === activeCategory)?.label}`}
                    <span className="text-zinc-600 text-sm font-normal bg-zinc-900 px-2 py-0.5 rounded-full border border-zinc-800">
                        {filteredLinks.length}
                    </span>
                </h1>
                <div className="flex items-center gap-2">
                    <button className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-zinc-900 border border-zinc-800 text-xs text-zinc-400 hover:text-white hover:border-zinc-700 transition-colors">
                        <Filter size={12} /> Filter
                    </button>
                    <button className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-zinc-900 border border-zinc-800 text-xs text-zinc-400 hover:text-white hover:border-zinc-700 transition-colors">
                        <LayoutGrid size={12} /> View
                    </button>
                </div>
            </div>

            {/* Masonry Grid */}
            <motion.div 
                layout
                className="columns-1 md:columns-2 lg:columns-3 gap-4 space-y-4"
            >
                <AnimatePresence>
                    {filteredLinks.map((link) => (
                        <LinkCard key={link.id} data={link} />
                    ))}
                </AnimatePresence>
            </motion.div>

            {/* Empty State if needed */}
            {filteredLinks.length === 0 && (
                <div className="h-64 flex flex-col items-center justify-center text-zinc-500">
                    <Folder size={48} className="mb-4 opacity-20" />
                    <p>No items found in this stack.</p>
                </div>
            )}
        </div>

      </main>

      {/* 3. Global Overlays */}
      <AnimatePresence>
        {isSearchOpen && <CommandPalette isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />}
        {isAddLinkOpen && <AddLinkModal isOpen={isAddLinkOpen} onClose={() => setIsAddLinkOpen(false)} />}
      </AnimatePresence>

    </div>
  );
};

export default Dashboard;