'use client';

import React, { useState, useEffect, ReactNode } from 'react';
import { useRouter } from 'next/navigation'; // Next.js specific router
import { motion, AnimatePresence } from 'motion/react';
import { 
  ArrowRight, Zap, Layers, Lock, Search, Command, Star, Folder, Sparkles, 
  MessageSquare, Cpu, Globe, MousePointer2, ShieldCheck, FileText, 
  Image as ImageIcon, Server, Smartphone, CheckCircle2, FileJson, 
  FileCode, Hash, Bell, Activity, Loader2 
} from 'lucide-react';

// --- Types ---
interface FadeInProps {
  children: ReactNode;
  delay?: number;
  className?: string;
}

interface BentoCardProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

interface ButtonProps {
  children: ReactNode;
  primary?: boolean;
  onClick?: () => void;
}

// --- Components ---

const FadeIn = ({ children, delay = 0, className = "" }: FadeInProps) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-50px" }}
    transition={{ duration: 0.8, delay, ease: "easeOut" }}
    className={className}
  >
    {children}
  </motion.div>
);

const BentoCard = ({ children, className = "", delay = 0 }: BentoCardProps) => (
  <motion.div
    initial="idle"
    whileInView="visible"
    whileHover="hover"
    viewport={{ once: true }}
    variants={{
      idle: { opacity: 0, scale: 0.95 },
      visible: { opacity: 1, scale: 1, transition: { delay, duration: 0.8 } },
      hover: { y: -5, transition: { duration: 0.4 } }
    }}
    className={`bg-zinc-900/40 border border-zinc-800 p-6 rounded-3xl backdrop-blur-md hover:border-zinc-600/80 hover:bg-zinc-800/60 transition-colors duration-700 group overflow-hidden relative flex flex-col ${className}`}
  >
    <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-1000 pointer-events-none" />
    <div className="relative z-10 h-full w-full">{children}</div>
  </motion.div>
);

const Button = ({ children, primary = false, onClick }: ButtonProps) => (
  <motion.button
    onClick={onClick}
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    className={`px-8 py-4 rounded-full font-medium flex items-center gap-2 transition-all duration-300 ${
      primary
        ? "bg-white text-black hover:bg-zinc-200 shadow-[0_0_20px_-5px_rgba(255,255,255,0.3)]"
        : "bg-zinc-900 text-zinc-300 border border-zinc-800 hover:border-zinc-600 hover:text-white"
    }`}
  >
    {children}
  </motion.button>
);

const AIChatDemo = () => {
    const [step, setStep] = useState(0);
    const [triggered, setTriggered] = useState(false);

    useEffect(() => {
        if (triggered && step === 0) {
            const sequence = async () => {
                setStep(1); 
                await new Promise(r => setTimeout(r, 2000)); 
                setStep(2); 
                await new Promise(r => setTimeout(r, 2500)); 
                setStep(3); 
            };
            sequence();
        }
    }, [triggered, step]);

    return (
        <div 
            className="w-full h-full flex items-center justify-center"
            onMouseEnter={() => setTriggered(true)}
        >
            <div className="w-full max-w-sm mx-auto bg-zinc-950 rounded-xl border border-zinc-800 shadow-2xl flex flex-col font-mono text-xs overflow-hidden h-64 md:h-56 transition-colors duration-500 relative z-20">
                <div className="flex items-center justify-between border-b border-zinc-800 px-4 py-3 bg-zinc-900/50">
                    <div className="flex items-center gap-2 text-zinc-400">
                        <Sparkles size={12} className="text-indigo-400" /> RefRence AI
                    </div>
                    <div className="flex gap-1.5">
                        <div className="w-2 h-2 rounded-full bg-zinc-700" />
                        <div className="w-2 h-2 rounded-full bg-zinc-700" />
                    </div>
                </div>
                <div className="flex-1 p-4 flex flex-col gap-4 overflow-y-auto">
                    <AnimatePresence>
                        {step >= 1 && (
                            <motion.div
                                initial={{ opacity: 0, x: 20, scale: 0.95 }}
                                animate={{ opacity: 1, x: 0, scale: 1 }}
                                transition={{ duration: 0.8, ease: "easeOut" }}
                                className="self-end bg-zinc-800 text-zinc-200 px-3 py-2 rounded-lg rounded-tr-none max-w-[90%] shadow-sm"
                            >
                                Summarize "Future of UI Design"
                            </motion.div>
                        )}
                    </AnimatePresence>
                    <AnimatePresence mode='wait'>
                        {step === 2 && (
                            <motion.div
                                key="thinking"
                                initial={{ opacity: 0, y: 5 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.5 } }}
                                className="self-start text-zinc-500 flex items-center gap-2 px-1"
                            >
                                <div className="flex gap-1">
                                    <span className="w-1 h-1 bg-zinc-500 rounded-full animate-bounce" style={{ animationDuration: '1.5s', animationDelay: '0ms' }}/>
                                    <span className="w-1 h-1 bg-zinc-500 rounded-full animate-bounce" style={{ animationDuration: '1.5s', animationDelay: '300ms' }}/>
                                    <span className="w-1 h-1 bg-zinc-500 rounded-full animate-bounce" style={{ animationDuration: '1.5s', animationDelay: '600ms' }}/>
                                </div>
                                Reading 12 sources...
                            </motion.div>
                        )}
                    </AnimatePresence>
                    <AnimatePresence>
                        {step >= 3 && (
                            <motion.div
                                key="response"
                                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                transition={{ duration: 1, ease: "easeOut" }}
                                className="self-start bg-indigo-900/20 border border-indigo-500/30 text-indigo-200 px-3 py-3 rounded-lg rounded-tl-none max-w-[95%] shadow-sm"
                            >
                                <span className="text-indigo-400 font-bold block mb-2 flex items-center gap-2 border-b border-indigo-500/20 pb-1">
                                    <Sparkles size={10} /> Key Takeaways
                                </span>
                                <ul className="list-disc pl-4 space-y-1 text-indigo-100/80 leading-relaxed">
                                    <li>Interfaces becoming "invisible"</li>
                                    <li>Rise of intent-based navigation</li>
                                </ul>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
                <div className="px-4 py-3 border-t border-zinc-800 bg-zinc-950 flex items-center gap-3 text-zinc-600">
                    <div className="w-5 h-5 rounded-full border border-zinc-700 flex items-center justify-center hover:border-zinc-500 cursor-pointer">+</div>
                    <div className="h-8 bg-zinc-900/50 rounded-lg flex-1 border border-zinc-800 flex items-center px-3 text-xs">
                        Ask a follow up...
                    </div>
                </div>
            </div>
        </div>
    );
};

const SpeedCardContent = () => {
    const [triggered, setTriggered] = useState(false);
    return (
        <div 
            className="h-full flex flex-col justify-between relative z-10"
            onMouseEnter={() => setTriggered(true)}
        >
            <div>
                <div className="w-10 h-10 bg-yellow-500/10 rounded-xl flex items-center justify-center mb-4 text-yellow-400 border border-yellow-500/20">
                    <Zap className="w-5 h-5" />
                </div>
                <h3 className="text-xl font-bold mb-2 text-zinc-100">Zero Latency</h3>
                <p className="text-zinc-400 text-sm leading-relaxed">Local-first architecture means your second brain thinks as fast as your first one.</p>
            </div>
            <div className="flex-1 flex items-center gap-2 mt-4 relative h-16 overflow-hidden">
                <div className="absolute top-1/2 left-0 right-0 h-[1px] bg-zinc-800 w-full" />
                <div className={`relative z-10 p-1.5 rounded-lg border transition-colors duration-1000 ${triggered ? 'bg-yellow-500/10 border-yellow-500/50 text-yellow-500' : 'bg-zinc-800 border-zinc-700 text-zinc-500'}`}>
                    <Server size={16} />
                </div>
                <motion.div 
                    className="absolute top-1/2 w-8 h-1 bg-gradient-to-r from-transparent to-yellow-400 rounded-full z-20"
                    initial={{ left: '15%', opacity: 0 }}
                    animate={triggered ? { left: '80%', opacity: [0, 1, 0] } : {}}
                    transition={{ duration: 1.5, ease: "easeInOut" }} 
                />
                <div className={`relative z-10 p-1.5 rounded-lg border transition-colors duration-1000 ml-auto ${triggered ? 'bg-yellow-500/20 border-yellow-500 text-yellow-400 shadow-[0_0_15px_rgba(234,179,8,0.3)]' : 'bg-zinc-800 border-zinc-700 text-zinc-500'}`}>
                    <motion.div
                        animate={triggered ? { scale: [1, 1.2, 1] } : {}}
                        transition={{ delay: 1.2, duration: 0.5 }}
                    >
                        {triggered ? <CheckCircle2 size={16} /> : <Smartphone size={16} />}
                    </motion.div>
                </div>
                <motion.div 
                    className="absolute top-1/2 left-8 right-8 h-[2px] bg-yellow-500/50 origin-left"
                    initial={{ scaleX: 0 }}
                    animate={triggered ? { scaleX: 1 } : {}}
                    transition={{ delay: 1.3, duration: 0.8, ease: "easeOut" }}
                />
            </div>
        </div>
    );
};

const LockCardContent = () => {
    const [triggered, setTriggered] = useState(false);
    return (
        <div 
            className="h-full flex flex-col justify-between relative z-10"
            onMouseEnter={() => setTriggered(true)}
        >
            <div>
                <div className="w-10 h-10 bg-emerald-500/10 rounded-xl flex items-center justify-center mb-4 text-emerald-400 border border-emerald-500/20">
                    <ShieldCheck className="w-5 h-5" />
                </div>
                <h3 className="text-xl font-bold mb-2 text-zinc-100">Private Vault</h3>
                <p className="text-zinc-400 text-sm leading-relaxed">Your data never trains our models without permission. Stored encrypted.</p>
            </div>
            <div className="mt-4 flex flex-col items-center justify-center py-4 relative h-24">
                <div className="relative">
                    <motion.div 
                        className={`w-8 h-6 border-4 rounded-t-full border-b-0 mx-auto relative top-1 z-0 transition-colors duration-1000 ${triggered ? 'border-emerald-500' : 'border-zinc-600'}`}
                        initial={{ y: 0 }}
                        animate={triggered ? { y: -12, rotateY: 180, x: 6 } : {}}
                        transition={{ duration: 1.2, ease: "easeInOut", delay: 0.2 }}
                        style={{ originX: 1 }}
                    />
                    <div className={`w-14 h-10 rounded-lg border-2 relative z-10 flex items-center justify-center gap-2 transition-all duration-1000 ${triggered ? 'bg-emerald-900/20 border-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.2)]' : 'bg-zinc-800 border-zinc-600'}`}>
                        <div className={`w-2 h-2 rounded-full transition-colors duration-1000 ${triggered ? 'bg-emerald-400 shadow-[0_0_8px_#34d399]' : 'bg-red-500'}`} />
                        <div className={`w-4 h-0.5 rounded-full transition-colors duration-1000 ${triggered ? 'bg-emerald-500/50' : 'bg-zinc-700'}`}></div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const OrgCardContent = () => {
    const [triggered, setTriggered] = useState(false);
    return (
        <div 
            className="flex flex-row h-full items-center gap-6 relative z-10 w-full"
            onMouseEnter={() => setTriggered(true)}
        >
             <div className="relative z-20 pointer-events-none max-w-[12rem] md:max-w-[14rem]">
                <div className="w-10 h-10 bg-blue-500/10 rounded-xl flex items-center justify-center mb-4 text-blue-400 border border-blue-500/20">
                  <Layers className="w-5 h-5" />
                </div>
                <h3 className="text-xl font-bold mb-2 text-zinc-100">Liquid Organization</h3>
                <p className="text-zinc-400 text-sm leading-tight">
                    Drag, drop, and nest your links. RefRence auto-tags your content instantly.
                </p>
             </div>
             <div className="flex-1 h-full flex items-center justify-center relative">
                <div className="relative w-full max-w-[200px] h-32 flex items-center justify-center">
                    <motion.div 
                        className="absolute bottom-4 w-32 h-24 bg-zinc-800/80 border border-zinc-700 rounded-xl flex items-end justify-center pb-2 z-10 overflow-hidden"
                        initial={{ opacity: 0.8 }}
                        animate={triggered ? { borderColor: '#3b82f6', backgroundColor: 'rgba(59, 130, 246, 0.1)' } : {}}
                        transition={{ duration: 1 }}
                    >
                        <div className="absolute top-0 left-0 w-12 h-4 bg-zinc-700 rounded-br-lg" />
                    </motion.div>
                    <motion.div 
                        className="absolute w-20 h-16 bg-cyan-500/10 border border-cyan-500/30 rounded-lg flex items-center justify-center shadow-lg z-30 backdrop-blur-sm"
                        initial={{ rotate: -15, x: -80, y: -40, opacity: 0 }}
                        animate={triggered ? { rotate: 0, x: 0, y: 10, scale: 0.9, opacity: 1 } : {}}
                        transition={{ duration: 1.5, ease: "easeInOut", delay: 0.1 }}
                    >
                        <ImageIcon size={16} className="text-cyan-400" />
                    </motion.div>
                    <motion.div 
                        className="absolute w-20 h-16 bg-violet-500/10 border border-violet-500/30 rounded-lg flex items-center justify-center shadow-lg z-20 backdrop-blur-sm"
                        initial={{ rotate: 15, x: 80, y: -20, opacity: 0 }}
                        animate={triggered ? { rotate: 0, x: 0, y: 4, scale: 0.9, opacity: 1 } : {}}
                        transition={{ duration: 1.5, ease: "easeInOut", delay: 0.3 }}
                    >
                         <FileCode size={16} className="text-violet-400" />
                    </motion.div>
                    <motion.div 
                        className="absolute w-20 h-16 bg-amber-500/10 border border-amber-500/30 rounded-lg flex items-center justify-center shadow-lg z-40 backdrop-blur-sm"
                        initial={{ rotate: 5, x: 10, y: -80, opacity: 0 }}
                        animate={triggered ? { rotate: 0, x: 0, y: 16, scale: 0.9, opacity: 1 } : {}}
                        transition={{ duration: 1.5, ease: "easeInOut", delay: 0.5 }}
                    >
                         <FileText size={16} className="text-amber-400" />
                    </motion.div>
                </div>
             </div>
        </div>
    );
};

const DemoSection = () => {
    return (
        <section className="py-20 relative">
            <FadeIn className="max-w-7xl mx-auto px-6">
                <div className="mb-12 text-center">
                    <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">Experience the <span className="text-indigo-400">Future.</span></h2>
                    <p className="text-zinc-400">Watch how RefRence transforms chaos into clarity.</p>
                </div>
                <div className="relative w-full max-w-5xl mx-auto aspect-video bg-zinc-900/30 rounded-3xl border border-zinc-800 overflow-hidden backdrop-blur-sm group">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[50%] h-[50%] bg-indigo-500/20 blur-[100px] rounded-full opacity-50 group-hover:opacity-80 transition-opacity duration-1000"></div>
                    <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_100%)]"></div>
                    <div className="absolute inset-0 flex items-center justify-center z-10">
                        <motion.div 
                            initial={{ scale: 0.9, opacity: 0 }}
                            whileInView={{ scale: 1, opacity: 1 }}
                            transition={{ duration: 0.8 }}
                            className="bg-zinc-950/90 border border-zinc-800 p-10 rounded-3xl backdrop-blur-xl flex flex-col items-center shadow-2xl relative overflow-hidden max-w-sm w-full"
                        >
                            <div className="relative z-10 flex flex-col items-center text-center">
                                <div className="relative w-20 h-20 mb-6 flex items-center justify-center">
                                    <motion.div 
                                        className="absolute inset-0 rounded-full border-2 border-transparent border-t-indigo-500 border-r-indigo-500/30"
                                        animate={{ rotate: 360 }}
                                        transition={{ duration: 1.5, ease: "linear", repeat: Infinity }}
                                    />
                                    <div className="relative z-10 w-12 h-12 bg-zinc-900 rounded-full border border-zinc-800 flex items-center justify-center shadow-lg">
                                        <Sparkles className="w-5 h-5 text-indigo-400" />
                                    </div>
                                    <div className="absolute inset-0 bg-indigo-500/20 blur-xl rounded-full animate-pulse" />
                                </div>
                                <h3 className="text-xl font-bold text-white mb-2">Demo Coming Soon</h3>
                                <p className="text-zinc-500 text-sm leading-relaxed">
                                    We are adding the final touches.
                                </p>
                            </div>
                        </motion.div>
                    </div>
                     <motion.div 
                        className="absolute top-10 left-10 w-48 h-32 bg-zinc-900/50 border border-zinc-800 rounded-lg p-3 blur-[2px] group-hover:blur-0 transition-all duration-700 opacity-60"
                        animate={{ y: [0, -10, 0] }}
                        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                    >
                        <div className="w-full h-2 bg-zinc-800 rounded mb-2"></div>
                        <div className="w-2/3 h-2 bg-zinc-800 rounded mb-4"></div>
                        <div className="flex gap-2">
                             <div className="w-8 h-8 rounded bg-zinc-800"></div>
                             <div className="flex-1 h-8 rounded bg-zinc-800"></div>
                        </div>
                    </motion.div>
                    <motion.div 
                        className="absolute bottom-10 right-10 w-56 h-40 bg-zinc-900/50 border border-zinc-800 rounded-lg p-3 blur-[2px] group-hover:blur-0 transition-all duration-700 opacity-60"
                        animate={{ y: [0, 10, 0] }}
                        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                    >
                         <div className="flex justify-between mb-4">
                             <div className="w-10 h-3 bg-zinc-800 rounded"></div>
                             <div className="w-4 h-3 bg-zinc-800 rounded"></div>
                         </div>
                         <div className="w-full h-20 bg-zinc-800/50 rounded border border-zinc-800/50 flex items-end p-2 gap-1">
                             <div className="w-1/5 h-[40%] bg-indigo-500/20 rounded-t"></div>
                             <div className="w-1/5 h-[70%] bg-indigo-500/20 rounded-t"></div>
                             <div className="w-1/5 h-[50%] bg-indigo-500/20 rounded-t"></div>
                             <div className="w-1/5 h-[90%] bg-indigo-500/20 rounded-t"></div>
                             <div className="w-1/5 h-[60%] bg-indigo-500/20 rounded-t"></div>
                         </div>
                    </motion.div>
                </div>
            </FadeIn>
        </section>
    );
};

const LandingPage = () => {
  const router = useRouter(); // Next.js specific hook
  
  return (
    <div className="min-h-screen bg-black text-zinc-100 selection:bg-indigo-500/30 font-sans overflow-x-hidden">
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] left-[20%] w-[600px] h-[600px] bg-indigo-900/10 rounded-full blur-[120px] mix-blend-screen" />
        <div className="absolute bottom-[10%] right-[10%] w-[500px] h-[500px] bg-purple-900/10 rounded-full blur-[120px] mix-blend-screen" />
        <div className="absolute top-[40%] left-[-10%] w-[400px] h-[400px] bg-blue-900/5 rounded-full blur-[100px]" />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150"></div>
      </div>
      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <section className="min-h-screen flex flex-col justify-center items-center text-center pt-20 pb-20 relative">
          <FadeIn>
            <span className="px-3 py-1 rounded-full border border-zinc-800 bg-zinc-900/50 text-xs text-zinc-400 uppercase tracking-widest mb-6 inline-block backdrop-blur-md">
              RefRence 1.0
            </span>
          </FadeIn>
          <FadeIn delay={0.1}>
            <h1 className="text-6xl md:text-8xl font-bold tracking-tighter mb-6 bg-gradient-to-b from-white via-zinc-200 to-zinc-500 bg-clip-text text-transparent">
              Your Second Brain. <br/>
              <span className="bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">Now with IQ.</span>
            </h1>
          </FadeIn>
          <FadeIn delay={0.2} className="max-w-xl mx-auto mb-10">
            <p className="text-lg text-zinc-400 leading-relaxed">
              RefRence isn't just a bookmark manager. It's an AI-powered knowledge engine that reads, summarizes, and retrieves your digital life instantly.
            </p>
          </FadeIn>
          <FadeIn delay={0.3} className="flex flex-col md:flex-row gap-4">
            <Button primary onClick={() => router.push('/dashboard')}>
              Start Curating <ArrowRight className="w-4 h-4" />
            </Button>
            <Button>Watch AI Demo</Button>
          </FadeIn>
        </section>
        <section className="py-20">
          <FadeIn className="mb-16">
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">More than storage. <br/><span className="text-zinc-500">Active Intelligence.</span></h2>
          </FadeIn>
          <div className="grid grid-cols-1 md:grid-cols-3 md:grid-rows-2 gap-4 h-auto md:h-[650px]">
            <BentoCard className="md:col-span-2 md:row-span-1 justify-between bg-zinc-900/60" delay={0.1}>
              <div className="flex flex-col md:flex-row h-full gap-8 relative z-10">
                <div className="flex-1 flex flex-col justify-center">
                    <div className="w-10 h-10 bg-indigo-500/20 rounded-xl flex items-center justify-center mb-4 text-indigo-400 border border-indigo-500/30">
                        <Sparkles className="w-5 h-5" />
                    </div>
                    <h3 className="text-2xl font-bold mb-2 text-zinc-100">Ask RefRence</h3>
                    <p className="text-zinc-400 text-sm leading-relaxed mb-6">
                        Forget Ctrl+F. Just ask. <br/>
                        Chat with your knowledge base to extract summaries and insights.
                    </p>
                    <div className="flex gap-2 text-xs font-mono text-zinc-500">
                        <span className="bg-zinc-800 px-2 py-1 rounded">GPT-4o</span>
                        <span className="bg-zinc-800 px-2 py-1 rounded">Vector Search</span>
                    </div>
                </div>
                <div className="flex-1 flex items-center justify-center w-full">
                    <AIChatDemo />
                </div>
              </div>
            </BentoCard>
            <BentoCard className="md:col-span-1 md:row-span-1 overflow-hidden" delay={0.2}>
               <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_rgba(50,50,50,1),_transparent_70%)] opacity-0 group-hover:opacity-20 transition-opacity duration-1000" />
               <SpeedCardContent />
            </BentoCard>
            <BentoCard className="md:col-span-1 md:row-span-1" delay={0.3}>
              <LockCardContent />
            </BentoCard>
            <BentoCard className="md:col-span-2 md:row-span-1 overflow-visible" delay={0.4}>
              <OrgCardContent />
            </BentoCard>
          </div>
        </section>
        <DemoSection />
        <section className="py-32 flex flex-col items-center justify-center text-center relative overflow-hidden">
           <div className="absolute inset-0 bg-gradient-to-t from-zinc-900/50 to-transparent z-0 pointer-events-none" />
           <FadeIn className="relative z-10 max-w-3xl">
              <h2 className="text-5xl md:text-7xl font-bold tracking-tighter mb-8 bg-gradient-to-br from-white via-zinc-200 to-zinc-500 bg-clip-text text-transparent">
                 Turn information <br/> into <span className="text-indigo-400">insight.</span>
              </h2>
              <div className="flex flex-col md:flex-row justify-center gap-4">
                 <Button primary onClick={() => router.push('/dashboard')}>Get RefRence Free</Button>
                 <Button>Contact Sales</Button>
              </div>
           </FadeIn>
        </section>
        <footer className="border-t border-zinc-900 py-12 flex flex-col md:flex-row justify-between items-center text-sm text-zinc-500">
           <div className="mb-4 md:mb-0 flex items-center gap-2">
              <span className="font-bold text-zinc-200">RefRence</span> &copy; 2025
           </div>
           <div className="flex gap-8">
              <a href="#" className="hover:text-zinc-300 transition-colors">Twitter</a>
              <a href="#" className="hover:text-zinc-300 transition-colors">GitHub</a>
              <a href="#" className="hover:text-zinc-300 transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-zinc-300 transition-colors">Terms</a>
           </div>
        </footer>
      </div>
    </div>
  );
};

export default LandingPage;