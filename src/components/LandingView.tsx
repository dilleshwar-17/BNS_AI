/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import {
  Scale,
  Sparkles,
  ArrowRight,
  Shield,
  BookOpen,
  Cpu,
  Layers,
  ChevronRight,
  GitCompare,
  Search,
  FileText,
  Clock,
  Briefcase,
  Globe2,
  CheckCircle2,
  Activity
} from 'lucide-react';
import { motion } from 'motion/react';
import StreamingText from './StreamingText';

interface LandingViewProps {
  onEnterPortal: () => void;
}

export default function LandingView({ onEnterPortal }: LandingViewProps) {
  const [activeTab, setActiveTab] = useState<'how-it-works' | 'features' | 'transition'>('features');
  const [selectedSandboxQuery, setSelectedSandboxQuery] = useState<number | null>(null);
  const [sandboxStreamText, setSandboxStreamText] = useState('');
  const [isSandboxTyping, setIsSandboxTyping] = useState(false);

  const sandboxQueries = [
    {
      id: 1,
      title: "IPC Section 302 to BNS Alignment",
      query: "What replaced Section 302 of the Indian Penal Code (IPC) for Murder, and what are the structural changes?",
      response: "Under the Bharatiya Nyaya Sanhita (BNS), Section 302 IPC (Murder) has been replaced by Section 103 BNS.\n\nKey Alignments:\n1. Core offense elements and the death penalty/life imprisonment sanction remain identical.\n2. Organised crime and mob lynching are now separately classified under Sections 111 and 103(2) with explicit legal definitions and structured penalties.\n3. The law is reorganized into streamlined chapters with modern legal terminology."
    },
    {
      id: 2,
      title: "Zero-FIR Procedure under BNSS",
      query: "How does the Bharatiya Nagarik Suraksha Sanhita (BNSS) codify and regulate the Zero-FIR filing mechanism?",
      response: "BNSS Section 173 officially codifies the filing of a 'Zero FIR'.\n\nProcedural Rules:\n1. Mandatory Ingestion: Any police officer in charge of a station MUST record information of a cognizable offense, irrespective of territorial jurisdiction.\n2. Jurisdictional Dispatch: The registered FIR is assigned the number '0' and must be transferred immediately to the competent jurisdictional police station within 24 hours.\n3. Digital Integration: Information can be submitted orally or digitally (with signature confirmation within 3 days)."
    },
    {
      id: 3,
      title: "Digital Records under BSA",
      query: "What are the rules of admissibility for electronic and digital evidence under Section 61 of the Bharatiya Sakshya Adhiniyam (BSA)?",
      response: "The Bharatiya Sakshya Adhiniyam (BSA) replaces the Indian Evidence Act. Section 61 to 63 govern digital records.\n\nKey Enhancements:\n1. Primary Admissibility: Server logs, cloud database backups, emails, and encrypted chats are elevated to primary evidence status when original storage devices are verified.\n2. Updated Certifications: The legacy Section 65B Certificate is replaced with modern schedules under the BSA, mandating standardized digital hash hashes and tamper-detection logs."
    }
  ];

  const handleRunSandbox = (id: number) => {
    const item = sandboxQueries.find(q => q.id === id);
    if (!item) return;
    
    setSelectedSandboxQuery(id);
    setSandboxStreamText('');
    setIsSandboxTyping(true);
    
    // Slight delay before typing stream starts
    setTimeout(() => {
      setSandboxStreamText(item.response);
    }, 150);
  };

  const steps = [
    {
      num: "01",
      title: "Cognitive Parsing",
      desc: "BNS AI ingests complex legal drafts, notices, or user queries in natural language, extracting core codification terms.",
      icon: Search,
      color: "from-blue-500 to-indigo-500"
    },
    {
      num: "02",
      title: "Legacy-New Cross Align",
      desc: "Our neural index automatically cross-maps IPC, CrPC, and Indian Evidence Act sections to BNS, BNSS, and BSA provisions.",
      icon: GitCompare,
      color: "from-sky-500 to-blue-600"
    },
    {
      num: "03",
      title: "Precedent Sourcing",
      desc: "Extracts historic Supreme Court judgments and precedents to formulate valid legal arguments based on mapped statutes.",
      icon: BookOpen,
      color: "from-violet-500 to-purple-600"
    }
  ];

  const features = [
    {
      title: "BNS Cog-Engine",
      desc: "Instantly translate natural language queries into deep statutory breakdowns from BNS, BNSS, and BSA acts.",
      icon: Cpu,
      badge: "Real-time"
    },
    {
      title: "Deep Legal Research",
      desc: "Run comprehensive reasoning models that trace case laws, parse definitions, and extract judicial precedents in seconds.",
      icon: Sparkles,
      badge: "Pro Model"
    },
    {
      title: "Intelligent Law Draftsman",
      desc: "Automatically formulate high-fidelity complaints, bail applications, legal replies, and legal notices with fully citation-backed text.",
      icon: FileText,
      badge: "Smart-Doc"
    },
    {
      title: "Dynamic Knowledge Graph",
      desc: "Explore visual nodes connecting legacy provisions to the corresponding new clauses in Indian jurisprudence.",
      icon: Layers,
      badge: "Interactive"
    },
    {
      title: "Acts Comparative Matrix",
      desc: "Side-by-side legal sidecars that spotlight fine-grained structural amendments between old and new systems.",
      icon: GitCompare,
      badge: "Compliance"
    },
    {
      title: "Judicial Precedents Index",
      desc: "Query supreme and high court landmark case citations aligned with the newly legislated provisions.",
      icon: Shield,
      badge: "Reference"
    }
  ];

  return (
    <div className="min-h-screen text-slate-100 font-sans relative flex flex-col justify-between overflow-x-hidden">
      {/* Dynamic ambient backdrop decoration */}
      <div className="absolute top-[-10%] right-[-10%] w-[50vw] h-[50vw] bg-blue-600/10 rounded-full filter blur-[150px] pointer-events-none z-0" />
      <div className="absolute bottom-[10%] left-[-10%] w-[45vw] h-[45vw] bg-indigo-600/10 rounded-full filter blur-[150px] pointer-events-none z-0" />

      {/* Primary Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20 relative z-10 w-full flex-1 flex flex-col gap-16">
        
        {/* Brand Header */}
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto space-y-6">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3 py-1 bg-slate-950/80 border border-white/5 rounded-full shadow-[0_0_15px_rgba(37,99,235,0.15)]"
          >
            <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse shadow-[0_0_8px_rgba(59,130,246,0.8)]" />
            <span className="font-mono text-[10px] text-sky-400 font-black tracking-widest uppercase">
              2026 EDITION • MODERN INDIAN JURISPRUDENCE
            </span>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-sans text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-none"
          >
            The Advanced Research & Reasoning Platform for <span className="bg-gradient-to-r from-blue-400 via-sky-400 to-indigo-400 bg-clip-text text-transparent">Indian Legal Research</span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="font-sans text-base sm:text-lg text-slate-400 leading-relaxed max-w-2xl"
          >
            Seamlessly navigate the transition from legacy acts (IPC, CrPC, Evidence Act) to the new legal frameworks (BNS, BNSS, BSA). Designed for judges, litigation counsels, and law officers.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center gap-4 pt-4"
          >
            <button
              onClick={onEnterPortal}
              className="px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white rounded-2xl font-sans font-extrabold text-sm tracking-wide transition-all shadow-xl shadow-blue-500/20 hover:shadow-blue-500/35 flex items-center gap-2.5 cursor-pointer"
            >
              <span>Launch BNS AI Platform</span>
              <ArrowRight size={16} />
            </button>
            
            <a 
              href="#playground"
              className="px-6 py-4 bg-slate-950/80 hover:bg-slate-900 border border-white/5 text-slate-300 hover:text-white rounded-2xl font-sans font-bold text-sm transition-all flex items-center gap-2 cursor-pointer"
            >
              <span>Try Interactive Sandbox</span>
              <span className="text-[10px] bg-slate-900 border border-white/10 text-sky-400 px-1.5 py-0.5 rounded uppercase font-black tracking-widest font-mono">Free</span>
            </a>
          </motion.div>
        </div>

        {/* Visual Dashboard Mockup Display */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="w-full bg-slate-950/40 backdrop-blur-xl border border-white/5 rounded-3xl p-1.5 shadow-2xl relative overflow-hidden max-w-5xl mx-auto"
        >
          <div className="bg-slate-900/60 border border-white/5 rounded-[22px] overflow-hidden">
            {/* Mock Header Controls */}
            <div className="w-full h-11 bg-slate-950/60 border-b border-white/5 px-4 flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full bg-rose-500/80" />
                <span className="w-3 h-3 rounded-full bg-amber-500/80" />
                <span className="w-3 h-3 rounded-full bg-emerald-500/80" />
              </div>
              <div className="flex items-center gap-2 bg-slate-900 border border-white/5 px-4 py-1 rounded-lg text-[10px] font-mono text-slate-500 tracking-wider">
                https://bns-legal.ai/workspace/counsel-console
              </div>
              <div className="w-12 h-2 rounded bg-white/5" />
            </div>

            {/* Mock Page Content layout preview */}
            <div className="grid grid-cols-1 md:grid-cols-4 min-h-[360px] text-slate-400 text-xs">
              {/* Sidebar Preview */}
              <div className="hidden md:flex flex-col gap-4 p-4 border-r border-white/5 bg-slate-950/20">
                <div className="flex items-center gap-2 px-2 py-1 bg-white/5 rounded-lg text-white font-bold">
                  <img 
                    src="/src/assets/images/bns_ai_icon_1783613389575.jpg" 
                    alt="BNS AI" 
                    className="w-4.5 h-4.5 rounded object-cover shadow-[0_0_8px_rgba(59,130,246,0.25)]"
                    referrerPolicy="no-referrer"
                  />
                  <span>BNS AI Workspace</span>
                </div>
                <div className="space-y-1.5 text-[11px] px-2">
                  <div className="flex items-center gap-2 py-1 hover:text-white transition-colors"><Cpu size={12} /> BNS AI Chatbot</div>
                  <div className="flex items-center gap-2 py-1 hover:text-white transition-colors"><GitCompare size={12} /> Acts Comparative sidecar</div>
                  <div className="flex items-center gap-2 py-1 hover:text-white transition-colors"><Layers size={12} /> Knowledge Graph</div>
                  <div className="flex items-center gap-2 py-1 hover:text-white transition-colors"><FileText size={12} /> Drafting Suite</div>
                </div>
              </div>

              {/* Central Main Body Preview */}
              <div className="col-span-3 p-6 flex flex-col justify-between bg-slate-900/10">
                <div className="space-y-4">
                  <div className="flex items-center gap-2.5">
                    <span className="w-6 h-6 rounded-lg bg-blue-600 flex items-center justify-center font-bold text-white text-[10px]">B</span>
                    <span className="font-bold text-white text-sm">Bharatiya Law Assistant • Judicial AI</span>
                  </div>
                  <div className="p-4 bg-slate-950/60 border border-white/5 rounded-xl space-y-2 font-mono text-[11px] leading-relaxed">
                    <p className="text-sky-400"># QUERY: Map Section 320 IPC (Grievous Hurt) to corresponding BNS provisions.</p>
                    <p className="text-slate-300"># BNS AI: Legally mapped Section 320 IPC to Section 116 BNS. The Adhiniyam maintains identical bodily injury categories but reforms the penal parameters and implements digital compliance records.</p>
                  </div>
                </div>

                <div className="flex items-center justify-between border-t border-white/5 pt-4 mt-6">
                  <span className="text-[10px] font-mono text-slate-500">SYSTEM STABLE • INDEX COMPLIANCE VALIDATED</span>
                  <button onClick={onEnterPortal} className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-lg transition-all text-[11px] cursor-pointer">
                    Enter Workspace
                  </button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Section Tabs: Features / How it works */}
        <div className="space-y-12">
          <div className="flex flex-col items-center gap-3 text-center">
            <h2 className="font-sans text-2xl sm:text-3xl font-black text-white tracking-tight">
              Engineered for Enterprise Judicial Standards
            </h2>
            <p className="font-sans text-slate-400 text-sm max-w-xl">
              We replace guesswork with cognitive precision, enabling immediate access to statutory codifications.
            </p>

            <div className="flex items-center gap-1.5 bg-slate-950/60 border border-white/5 rounded-xl p-1 mt-4">
              <button
                onClick={() => setActiveTab('features')}
                className={`px-4 py-2 text-xs font-sans font-bold rounded-lg transition-all cursor-pointer ${
                  activeTab === 'features' ? 'bg-slate-900 text-white shadow-lg border border-white/5' : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Platform Features
              </button>
              <button
                onClick={() => setActiveTab('how-it-works')}
                className={`px-4 py-2 text-xs font-sans font-bold rounded-lg transition-all cursor-pointer ${
                  activeTab === 'how-it-works' ? 'bg-slate-900 text-white shadow-lg border border-white/5' : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                How It Works
              </button>
            </div>
          </div>

          {/* Conditional Views Based on Selection */}
          {activeTab === 'features' ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {features.map((feat, index) => {
                const Icon = feat.icon;
                return (
                  <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.05 }}
                    key={feat.title}
                    className="p-6 bg-slate-950/20 hover:bg-slate-900/30 border border-white/5 hover:border-white/10 rounded-2xl transition-all group relative overflow-hidden"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <div className="p-3 bg-blue-600/10 group-hover:bg-blue-600/20 text-blue-400 border border-blue-500/10 rounded-xl transition-all">
                        <Icon size={18} />
                      </div>
                      <span className="text-[9px] font-mono font-black tracking-widest text-slate-500 border border-white/5 px-2 py-0.5 rounded uppercase">
                        {feat.badge}
                      </span>
                    </div>
                    <h3 className="font-sans font-bold text-sm text-white mb-2">{feat.title}</h3>
                    <p className="font-sans text-xs text-slate-400 leading-relaxed">{feat.desc}</p>
                  </motion.div>
                );
              })}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              {steps.map((st, index) => {
                const Icon = st.icon;
                return (
                  <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    key={st.num}
                    className="flex flex-col items-start gap-4 p-6 bg-slate-950/20 border border-white/5 rounded-2xl relative"
                  >
                    <div className="flex items-center justify-between w-full">
                      <span className="font-mono text-3xl font-black text-slate-700">{st.num}</span>
                      <div className={`p-2 bg-white/5 rounded-lg text-blue-400`}>
                        <Icon size={16} />
                      </div>
                    </div>
                    <div>
                      <h4 className="font-sans font-bold text-sm text-white mb-1.5">{st.title}</h4>
                      <p className="font-sans text-xs text-slate-400 leading-relaxed">{st.desc}</p>
                    </div>
                    {index < 2 && (
                      <div className="hidden md:block absolute -right-4 top-1/2 -translate-y-1/2 text-slate-700 font-bold z-20">
                        <ChevronRight size={18} />
                      </div>
                    )}
                  </motion.div>
                );
              })}
            </div>
          )}
        </div>

        {/* Interactive Trial Sandbox / Playground */}
        <div id="playground" className="scroll-mt-10 py-6 border-t border-white/5">
          <div className="bg-slate-900/20 border border-white/5 rounded-3xl p-6 sm:p-8 space-y-8 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/5 rounded-full filter blur-[80px] pointer-events-none" />
            
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="space-y-2">
                <div className="inline-flex items-center gap-1.5 text-blue-400 font-mono text-[10px] font-bold tracking-widest uppercase bg-blue-950/30 border border-blue-900/30 px-2.5 py-0.5 rounded-full">
                  <Activity size={10} />
                  <span>Interactive Playground</span>
                </div>
                <h3 className="font-sans text-xl sm:text-2xl font-black text-white tracking-tight">
                  Experience BNS AI Live
                </h3>
                <p className="font-sans text-slate-400 text-xs max-w-xl">
                  Select a common transition legal scenario below to see how BNS AI automatically reformulates, structures, and provides citation references instantly.
                </p>
              </div>

              <button
                onClick={onEnterPortal}
                className="px-5 py-2.5 bg-slate-950/60 hover:bg-slate-900 border border-white/10 text-white font-bold text-xs rounded-xl flex items-center gap-1.5 transition-all self-start md:self-center cursor-pointer"
              >
                <span>Unlock Full App</span>
                <ArrowRight size={12} />
              </button>
            </div>

            {/* Sandbox Grid Controls & Display */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Queries list sidebar */}
              <div className="lg:col-span-5 space-y-3">
                <span className="font-sans text-[10px] font-bold text-slate-500 uppercase tracking-widest block pl-1">
                  Click a Sample to Run
                </span>
                
                <div className="space-y-2.5">
                  {sandboxQueries.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => handleRunSandbox(item.id)}
                      className={`w-full text-left p-4 rounded-xl border font-sans transition-all flex items-start gap-3 cursor-pointer ${
                        selectedSandboxQuery === item.id
                          ? 'bg-blue-950/20 border-blue-500/40 text-white shadow-lg'
                          : 'bg-slate-950/40 border-white/5 text-slate-400 hover:text-slate-200 hover:bg-slate-950/70'
                      }`}
                    >
                      <div className={`mt-0.5 w-4 h-4 rounded-full border flex items-center justify-center shrink-0 text-[10px] font-bold ${
                        selectedSandboxQuery === item.id ? 'border-blue-400 text-blue-400 bg-blue-950' : 'border-slate-700 text-slate-500'
                      }`}>
                        {item.id}
                      </div>
                      <div className="space-y-1">
                        <span className="text-xs font-bold block text-white">{item.title}</span>
                        <p className="text-[11px] leading-relaxed text-slate-400 line-clamp-1">{item.query}</p>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Sandbox live output display panel */}
              <div className="lg:col-span-7 bg-slate-950/60 border border-white/5 rounded-2xl p-5 min-h-[220px] flex flex-col justify-between relative shadow-inner">
                {selectedSandboxQuery === null ? (
                  <div className="flex-1 flex flex-col items-center justify-center text-center p-6 space-y-3">
                    <Scale size={24} className="text-slate-600 animate-pulse" />
                    <span className="font-sans text-xs text-slate-500 font-medium">
                      Select one of the query scenarios on the left to initialize the live neural streaming experience.
                    </span>
                  </div>
                ) : (
                  <div className="space-y-4 flex-1 flex flex-col justify-between">
                    <div className="space-y-3">
                      {/* Active Input Query bubble */}
                      <div className="flex items-start gap-2 text-xs pb-3 border-b border-white/5">
                        <span className="font-mono text-[10px] text-sky-400 bg-sky-950/40 border border-sky-900/30 px-2 py-0.5 rounded font-black tracking-widest">
                          INPUT
                        </span>
                        <p className="font-sans text-slate-300 font-medium italic">
                          "{sandboxQueries.find(q => q.id === selectedSandboxQuery)?.query}"
                        </p>
                      </div>

                      {/* AI Response Output */}
                      <div className="space-y-2">
                        <div className="flex items-center gap-1.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                          <span className="font-mono text-[9px] text-slate-500 tracking-wider uppercase font-extrabold">
                            AI STREAM ENGINE ACTIVE
                          </span>
                        </div>
                        
                        <div className="min-h-[120px] text-xs">
                          {isSandboxTyping && sandboxStreamText ? (
                            <StreamingText
                              text={sandboxStreamText}
                              onComplete={() => setIsSandboxTyping(false)}
                              speed={4}
                            />
                          ) : (
                            <span className="font-sans text-sm text-slate-200 whitespace-pre-wrap">{sandboxStreamText}</span>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Footer note */}
                    {!isSandboxTyping && (
                      <div className="pt-2 border-t border-white/5 flex items-center justify-between text-[10px] text-slate-500 animate-[fadeIn_0.3s_ease-out]">
                        <span className="font-mono font-bold">MATCH: BNS SYSTEM 100% CORRECT</span>
                        <button 
                          onClick={onEnterPortal}
                          className="text-blue-400 hover:text-blue-300 font-sans font-bold flex items-center gap-0.5 cursor-pointer"
                        >
                          Unlock full case search <ChevronRight size={10} />
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Closing Final Call To Action Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="w-full bg-gradient-to-br from-blue-900/30 via-indigo-950/20 to-slate-950 border border-blue-500/20 rounded-3xl p-8 sm:p-12 text-center relative overflow-hidden shadow-2xl space-y-6 max-w-4xl mx-auto"
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(37,99,235,0.15)_0%,transparent_70%)] pointer-events-none" />
          
          <div className="max-w-xl mx-auto space-y-4">
            <h3 className="font-sans text-2xl sm:text-3xl font-black text-white tracking-tight leading-none">
              Empower Your Counsel Practice Today
            </h3>
            <p className="font-sans text-slate-400 text-xs sm:text-sm leading-relaxed">
              Transition seamlessly to Bharatiya Nyaya Sanhita. Get instant compliance, legal mappings, and drafted templates with fully referenced statutory acts.
            </p>
          </div>

          <div className="pt-2">
            <button
              onClick={onEnterPortal}
              className="px-8 py-4 bg-blue-600 hover:bg-blue-500 text-white rounded-2xl font-sans font-extrabold text-sm tracking-wide transition-all shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 inline-flex items-center gap-2 cursor-pointer"
            >
              <span>Access BNS AI Portal</span>
              <ArrowRight size={16} />
            </button>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-[10px] text-slate-500 uppercase font-black tracking-widest font-mono">
            <span className="flex items-center gap-1"><CheckCircle2 size={12} className="text-emerald-400" /> SECURE SSL ENCRYPTED</span>
            <span className="flex items-center gap-1"><CheckCircle2 size={12} className="text-emerald-400" /> NO INSTALLED SOFTWARE</span>
            <span className="flex items-center gap-1"><CheckCircle2 size={12} className="text-emerald-400" /> LAW ASSOCIATION COMPLIANT</span>
          </div>
        </motion.div>

      </div>
    </div>
  );
}
