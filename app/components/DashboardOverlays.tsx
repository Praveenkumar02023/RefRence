'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, X, Sparkles, Command, ArrowRight, Link as LinkIcon, 
  Loader2, CheckCircle2, MessageSquare, FileText, CornerDownLeft 
} from 'lucide-react';

// --- Types ---
interface OverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

// ==========================================
// 1. COMMAND PALETTE (Search + AI Chat)
// ==========================================

export const CommandPalette = ({ isOpen, onClose }: OverlayProps) => {
  const [query, setQuery] = useState("");
  const [mode, setMode] = useState<'search' | 'chat'>('search');
  const [isTyping, setIsTyping] = useState(false);

  // Close on Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  // Simulate AI Typing
  useEffect(() => {
    if (mode === 'chat' && query.length > 5) {
        setIsTyping(true);
        const timer = setTimeout(() => setIsTyping(false), 1500);
        return () => clearTimeout(timer);
    }
  }, [query, mode]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-[20vh] px-4">
      {/* Backdrop */}
      <motion.div 
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
      />

      {/* Modal */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: -20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: -20 }}
        className="relative w-full max-w-2xl bg-zinc-900 border border-zinc-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col"
      >
        {/* Search Input */}
        <div className="flex items-center px-4 py-4 border-b border-zinc-800 gap-3">
            {mode === 'search' ? <Search className="text-zinc-500" /> : <Sparkles className="text-indigo-400 animate-pulse" />}
            <input 
                autoFocus
                type="text"
                placeholder={mode === 'search' ? "Search your second brain..." : "Ask RefRence a question..."}
                className="flex-1 bg-transparent border-none outline-none text-lg text-white placeholder-zinc-500"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
            />
            <div className="flex gap-2 text-[10px] uppercase font-mono text-zinc-500">
                <span className={`px-2 py-1 rounded border border-zinc-800 transition-colors ${mode === 'search' ? 'bg-zinc-800 text-white' : ''}`}>Search</span>
                <span className={`px-2 py-1 rounded border border-zinc-800 transition-colors ${mode === 'chat' ? 'bg-indigo-900/50 text-indigo-400 border-indigo-500/30' : ''}`}>Ask AI</span>
            </div>
        </div>

        {/* Content Area */}
        <div className="min-h-[300px] bg-zinc-950/50 p-2">
            {query.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-zinc-500 py-12">
                    <Command size={48} className="mb-4 opacity-20" />
                    <p className="text-sm">Type to search or use <span className="text-zinc-400 bg-zinc-800 px-1.5 py-0.5 rounded text-xs">Tab</span> to switch to Chat.</p>
                </div>
            ) : mode === 'search' ? (
                // Mock Search Results
                <div className="space-y-1">
                    {[1, 2, 3].map((i) => (
                        <div key={i} className="flex items-center gap-3 p-3 hover:bg-zinc-800/50 rounded-lg cursor-pointer group">
                            <div className="p-2 bg-zinc-800 rounded-lg text-zinc-400 group-hover:text-white group-hover:bg-zinc-700 transition-colors"><FileText size={16}/></div>
                            <div className="flex-1">
                                <div className="text-sm text-zinc-200">The Future of Invisible Interfaces</div>
                                <div className="text-xs text-zinc-500 line-clamp-1">AI will replace traditional navigation with intent-based interaction models...</div>
                            </div>
                            <CornerDownLeft size={14} className="text-zinc-600 opacity-0 group-hover:opacity-100" />
                        </div>
                    ))}
                </div>
            ) : (
                // Mock AI Chat
                <div className="p-4 space-y-4">
                    <div className="flex gap-3">
                        <div className="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center shrink-0"><Sparkles size={14} className="text-white"/></div>
                        <div className="space-y-2">
                            <div className="text-sm text-zinc-300 bg-zinc-800/50 p-3 rounded-lg rounded-tl-none border border-zinc-800">
                                {isTyping ? (
                                    <div className="flex gap-1 h-5 items-center">
                                        <span className="w-1.5 h-1.5 bg-zinc-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}/>
                                        <span className="w-1.5 h-1.5 bg-zinc-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}/>
                                        <span className="w-1.5 h-1.5 bg-zinc-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}/>
                                    </div>
                                ) : (
                                    <p>Based on your saved articles, invisible interfaces rely heavily on <strong>intent prediction</strong>. The article from <em>uxdesign.cc</em> suggests that future UIs will be generated on-the-fly.</p>
                                )}
                            </div>
                            {!isTyping && (
                                <div className="flex gap-2">
                                    <button className="text-xs bg-zinc-800 hover:bg-zinc-700 px-3 py-1.5 rounded-full text-zinc-400 transition-colors">Copy Summary</button>
                                    <button className="text-xs bg-zinc-800 hover:bg-zinc-700 px-3 py-1.5 rounded-full text-zinc-400 transition-colors">View Source</button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>

        {/* Footer */}
        <div className="bg-zinc-900 border-t border-zinc-800 px-4 py-2 flex justify-between items-center text-[10px] text-zinc-500">
            <div className="flex gap-4">
                <span className="flex items-center gap-1"><kbd className="bg-zinc-800 px-1 rounded">↵</kbd> to select</span>
                <span className="flex items-center gap-1"><kbd className="bg-zinc-800 px-1 rounded">Tab</kbd> to toggle mode</span>
            </div>
            <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                Local Index Active
            </div>
        </div>
      </motion.div>
    </div>
  );
};

// ==========================================
// 2. ADD LINK MODAL (Magic Paste)
// ==========================================

export const AddLinkModal = ({ isOpen, onClose }: OverlayProps) => {
    const [url, setUrl] = useState("");
    const [status, setStatus] = useState<'idle' | 'scanning' | 'complete'>('idle');

    const handleAnalyze = () => {
        if (!url) return;
        setStatus('scanning');
        // Simulate API call
        setTimeout(() => setStatus('complete'), 2500);
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
            <motion.div 
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                onClick={onClose}
                className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            />

            <motion.div 
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                className="relative w-full max-w-md bg-zinc-950 border border-zinc-800 rounded-2xl shadow-2xl p-6 overflow-hidden"
            >
                {/* Background Grid */}
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none"></div>
                
                <div className="relative z-10">
                    <div className="flex justify-between items-center mb-6">
                        <div className="flex items-center gap-2">
                            <div className="p-2 bg-zinc-900 rounded-lg border border-zinc-800">
                                <LinkIcon size={18} className="text-zinc-400" />
                            </div>
                            <h2 className="text-lg font-bold text-white">Add to Library</h2>
                        </div>
                        <button onClick={onClose} className="text-zinc-500 hover:text-white transition-colors"><X size={18}/></button>
                    </div>

                    <div className="space-y-4">
                        <div>
                            <label className="text-xs font-medium text-zinc-500 mb-1.5 block">URL to save</label>
                            <div className="flex gap-2">
                                <input 
                                    type="text" 
                                    placeholder="https://..." 
                                    className="flex-1 bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3 text-sm text-white focus:ring-2 focus:ring-indigo-500/50 outline-none transition-all placeholder:text-zinc-600"
                                    value={url}
                                    onChange={(e) => setUrl(e.target.value)}
                                    disabled={status !== 'idle'}
                                />
                            </div>
                        </div>

                        {/* Status Area */}
                        <AnimatePresence mode='wait'>
                            {status === 'idle' && (
                                <motion.div 
                                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                                    className="pt-2"
                                >
                                    <button 
                                        onClick={handleAnalyze}
                                        disabled={!url}
                                        className="w-full bg-white text-black font-medium py-3 rounded-xl hover:bg-zinc-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                                    >
                                        <Sparkles size={16} /> Analyze & Save
                                    </button>
                                </motion.div>
                            )}

                            {status === 'scanning' && (
                                <motion.div 
                                    key="scanning"
                                    initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0 }}
                                    className="bg-zinc-900/50 rounded-xl p-4 border border-zinc-800"
                                >
                                    <div className="flex items-center gap-3 mb-3">
                                        <Loader2 size={16} className="animate-spin text-indigo-500" />
                                        <span className="text-sm text-zinc-300">RefRence AI is reading...</span>
                                    </div>
                                    <div className="space-y-2">
                                        <div className="h-1.5 bg-zinc-800 rounded-full overflow-hidden">
                                            <motion.div 
                                                className="h-full bg-indigo-500"
                                                initial={{ width: "0%" }}
                                                animate={{ width: "100%" }}
                                                transition={{ duration: 2.5, ease: "easeInOut" }}
                                            />
                                        </div>
                                        <div className="flex justify-between text-[10px] text-zinc-500 font-mono">
                                            <span>Scraping Content</span>
                                            <span>Vectorizing...</span>
                                        </div>
                                    </div>
                                </motion.div>
                            )}

                            {status === 'complete' && (
                                <motion.div 
                                    key="complete"
                                    initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
                                    className="bg-emerald-500/10 rounded-xl p-4 border border-emerald-500/20"
                                >
                                    <div className="flex items-start gap-3">
                                        <div className="p-1 bg-emerald-500/20 rounded-full text-emerald-500 mt-0.5">
                                            <CheckCircle2 size={16} />
                                        </div>
                                        <div>
                                            <h4 className="text-sm font-bold text-emerald-400 mb-1">Saved to Library</h4>
                                            <p className="text-xs text-emerald-200/60 mb-3">
                                                Auto-tagged as <span className="text-emerald-100 bg-emerald-500/20 px-1 rounded">#Design</span> and <span className="text-emerald-100 bg-emerald-500/20 px-1 rounded">#AI</span>
                                            </p>
                                            <button 
                                                onClick={() => { setStatus('idle'); setUrl(''); onClose(); }}
                                                className="text-xs bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 px-3 py-1.5 rounded-lg transition-colors"
                                            >
                                                Done
                                            </button>
                                        </div>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};