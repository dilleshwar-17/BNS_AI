/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import {
  Activity,
  Layers,
  FileText,
  Compass,
  Zap,
  ArrowUpRight,
  Sparkles,
  GitCompare,
  Shield,
  Calendar,
  Layers3
} from 'lucide-react';

interface DashboardViewProps {
  onNavigate: (tab: any) => void;
}

export default function DashboardView({ onNavigate }: DashboardViewProps) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const analyticsStats = [
    { 
      label: 'Substantive Sifts', 
      value: '1,284', 
      change: '+24% this month', 
      icon: Zap, 
      color: 'text-blue-400 bg-blue-500/10 border border-blue-500/20' 
    },
    { 
      label: 'Deep Research Logs', 
      value: '48', 
      change: '+12% this week', 
      icon: Compass, 
      color: 'text-sky-400 bg-sky-500/10 border border-sky-500/20' 
    },
    { 
      label: 'Legal Drafts', 
      value: '152', 
      change: '+8% this month', 
      icon: FileText, 
      color: 'text-emerald-400 bg-emerald-500/10 border border-emerald-500/20' 
    },
    { 
      label: 'System Latency', 
      value: '45 ms', 
      change: 'Optimal routing', 
      icon: Activity, 
      color: 'text-indigo-400 bg-indigo-500/10 border border-indigo-500/20' 
    }
  ];

  const legalUpdates = [
    {
      title: 'BSA Electronic Admissibility',
      desc: 'Ministry of Home Affairs releases revised Schedule templates for Section 63 digital proof certificates.',
      tag: 'Evidentiary'
    },
    {
      title: 'Custody Tranches Mandate',
      desc: 'High Court issues directive clarifying tranche booking conditions under BNSS Section 187.',
      tag: 'Procedural'
    },
    {
      title: 'BNS Section 69 Clarification',
      desc: 'Supreme Court guidelines regarding deceitful promise versus structural relationship dissolution.',
      tag: 'Substantive'
    }
  ];

  const quickInsights = [
    {
      title: 'BNS Overhaul Efficiency',
      stat: '78% charge sheet automation',
      desc: 'Simulated state prosecution teams note improved structural matching metrics.'
    },
    {
      title: 'Digital Admissibility Leap',
      stat: 'Admissions completed in <48 hrs',
      desc: 'Digital certificates verify cloud server dumps with instant primary rating.'
    }
  ];

  return (
    <div className="flex-1 space-y-8 animate-[fadeIn_0.4s_ease-out] max-w-5xl mx-auto px-1">
      {/* Immersive Top Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/5 pb-6">
        <div>
          <h2 className="font-sans font-extrabold text-2xl text-white tracking-tight">
            AI Command Center
          </h2>
          <p className="font-sans text-sm text-slate-400 font-medium">
            Real-time telemetry and legal intelligence streams for Indian law.
          </p>
        </div>

        {/* System Status Banner */}
        <div className="flex items-center gap-3 bg-slate-950/80 border border-white/5 rounded-xl px-4 py-2 shadow-[0_0_15px_rgba(37,99,235,0.1)]">
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-sky-500"></span>
          </span>
          <span className="font-mono text-xs font-bold text-sky-400 tracking-wider uppercase">
            Systems Operational • 45ms
          </span>
        </div>
      </div>

      {loading ? (
        /* High-fidelity shimmering skeleton bento grid */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {/* Shimmer metric cards */}
          {[1, 2, 3, 4].map(idx => (
            <div key={idx} className="shimmer-bg border border-white/5 rounded-2xl p-5 min-h-[140px] flex flex-col justify-between">
              <div className="flex items-center justify-between">
                <div className="h-3 w-24 bg-white/5 rounded" />
                <div className="h-8 w-8 bg-white/5 rounded-xl" />
              </div>
              <div>
                <div className="h-6 w-16 bg-white/10 rounded mt-4" />
                <div className="h-2.5 w-28 bg-white/5 rounded mt-2" />
              </div>
            </div>
          ))}

          {/* Shimmer stream card */}
          <div className="shimmer-bg md:col-span-2 lg:col-span-3 border border-white/5 rounded-2xl p-6 space-y-6">
            <div className="flex items-center justify-between pb-3 border-b border-white/5">
              <div className="h-4 w-48 bg-white/10 rounded" />
              <div className="h-5 w-16 bg-white/5 rounded-full" />
            </div>
            <div className="space-y-5">
              {[1, 2, 3].map(row => (
                <div key={row} className="space-y-2">
                  <div className="h-3.5 w-2/5 bg-white/10 rounded" />
                  <div className="h-3 w-5/6 bg-white/5 rounded" />
                </div>
              ))}
            </div>
          </div>

          {/* Shimmer Activity card */}
          <div className="shimmer-bg border border-white/5 rounded-2xl p-6 space-y-6">
            <div className="h-4 w-32 bg-white/10 rounded pb-1" />
            <div className="space-y-4">
              {[1, 2, 3].map(row => (
                <div key={row} className="flex gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-white/10 mt-1.5 shrink-0" />
                  <div className="space-y-2 flex-1">
                    <div className="h-3 w-32 bg-white/10 rounded" />
                    <div className="h-2.5 w-20 bg-white/5 rounded" />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Shimmer Insights cards */}
          <div className="shimmer-bg md:col-span-1 lg:col-span-2 border border-white/5 rounded-2xl p-6 space-y-4">
            <div className="h-3 w-28 bg-white/5 rounded" />
            <div className="h-5.5 w-36 bg-white/10 rounded" />
            <div className="h-3 w-4/5 bg-white/5 rounded" />
          </div>

          <div className="shimmer-bg border border-white/5 rounded-2xl p-6 space-y-4">
            <div className="h-3 w-28 bg-white/5 rounded" />
            <div className="h-5.5 w-36 bg-white/10 rounded" />
            <div className="h-3 w-4/5 bg-white/5 rounded" />
          </div>

          {/* Shimmer CTA card */}
          <div className="shimmer-bg border border-white/5 rounded-2xl p-6 space-y-5 flex flex-col justify-between">
            <div className="space-y-2">
              <div className="h-3.5 w-28 bg-white/10 rounded" />
              <div className="h-3 w-4/5 bg-white/5 rounded" />
            </div>
            <div className="h-9 w-full bg-white/10 rounded-xl" />
          </div>
        </div>
      ) : (
        /* Refactored Bento Grid System - All cards use consistent 16px rounded corners (rounded-2xl) & backdrop-blur & borders */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        
        {/* Metric Card 1: Substantive Sifts */}
        <div className="bg-slate-900/40 border border-white/5 backdrop-blur-xl rounded-2xl p-5 shadow-lg hover:border-blue-500/20 hover:shadow-[0_0_20px_rgba(59,130,246,0.05)] transition-all duration-300 flex flex-col justify-between min-h-[140px]">
          <div className="flex items-center justify-between">
            <span className="font-sans text-[10px] font-black text-slate-400 uppercase tracking-widest">
              Substantive Sifts
            </span>
            <div className="p-2 bg-blue-500/10 border border-blue-500/20 text-blue-400 rounded-xl">
              <Zap size={14} />
            </div>
          </div>
          <div className="mt-4">
            <span className="font-sans font-black text-2xl text-white block tracking-tight">
              1,284
            </span>
            <span className="font-sans text-[10px] text-sky-400 font-medium block mt-0.5">
              +24% this month
            </span>
          </div>
        </div>

        {/* Metric Card 2: Deep Research Logs */}
        <div className="bg-slate-900/40 border border-white/5 backdrop-blur-xl rounded-2xl p-5 shadow-lg hover:border-sky-500/20 hover:shadow-[0_0_20px_rgba(56,189,248,0.05)] transition-all duration-300 flex flex-col justify-between min-h-[140px]">
          <div className="flex items-center justify-between">
            <span className="font-sans text-[10px] font-black text-slate-400 uppercase tracking-widest">
              Deep Research Logs
            </span>
            <div className="p-2 bg-sky-500/10 border border-sky-500/20 text-sky-400 rounded-xl">
              <Compass size={14} />
            </div>
          </div>
          <div className="mt-4">
            <span className="font-sans font-black text-2xl text-white block tracking-tight">
              48
            </span>
            <span className="font-sans text-[10px] text-sky-400 font-medium block mt-0.5">
              +12% this week
            </span>
          </div>
        </div>

        {/* Metric Card 3: Legal Drafts */}
        <div className="bg-slate-900/40 border border-white/5 backdrop-blur-xl rounded-2xl p-5 shadow-lg hover:border-emerald-500/20 hover:shadow-[0_0_20px_rgba(16,185,129,0.05)] transition-all duration-300 flex flex-col justify-between min-h-[140px]">
          <div className="flex items-center justify-between">
            <span className="font-sans text-[10px] font-black text-slate-400 uppercase tracking-widest">
              Legal Drafts
            </span>
            <div className="p-2 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-xl">
              <FileText size={14} />
            </div>
          </div>
          <div className="mt-4">
            <span className="font-sans font-black text-2xl text-white block tracking-tight">
              152
            </span>
            <span className="font-sans text-[10px] text-emerald-400 font-medium block mt-0.5">
              +8% this month
            </span>
          </div>
        </div>

        {/* Metric Card 4: System Latency */}
        <div className="bg-slate-900/40 border border-white/5 backdrop-blur-xl rounded-2xl p-5 shadow-lg hover:border-indigo-500/20 hover:shadow-[0_0_20px_rgba(99,102,241,0.05)] transition-all duration-300 flex flex-col justify-between min-h-[140px]">
          <div className="flex items-center justify-between">
            <span className="font-sans text-[10px] font-black text-slate-400 uppercase tracking-widest">
              System Latency
            </span>
            <div className="p-2 bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 rounded-xl">
              <Activity size={14} />
            </div>
          </div>
          <div className="mt-4">
            <span className="font-sans font-black text-2xl text-white block tracking-tight">
              45 ms
            </span>
            <span className="font-sans text-[10px] text-slate-450 font-medium block mt-0.5">
              Optimal neural routing
            </span>
          </div>
        </div>

        {/* Bento Column 2 Row span 2: Live Legal Stream Updates */}
        <div className="md:col-span-2 lg:col-span-3 bg-slate-900/40 border border-white/5 backdrop-blur-xl rounded-2xl p-6 shadow-xl space-y-4 hover:border-white/10 transition-all duration-300">
          <div className="flex items-center justify-between pb-3 border-b border-white/5">
            <div className="flex items-center gap-2">
              <Layers3 size={16} className="text-blue-400" />
              <span className="font-sans font-extrabold text-sm text-white tracking-tight">
                Live Indian Jurisprudence Stream
              </span>
            </div>
            <span className="font-mono text-[9px] text-sky-400 bg-sky-950/40 border border-sky-900/30 px-2 py-0.5 rounded uppercase font-black tracking-widest">
              Index Active
            </span>
          </div>

          <div className="divide-y divide-white/5">
            {legalUpdates.map((update, idx) => (
              <div key={idx} className="py-3.5 first:pt-0 last:pb-0 group hover:bg-white/5 rounded-xl px-2.5 transition-all duration-200">
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="font-sans font-bold text-xs text-slate-200 group-hover:text-blue-400 transition-colors">
                    {update.title}
                  </span>
                  <span className="font-sans text-[9px] font-bold text-slate-400 border border-white/10 bg-slate-950/40 px-1.5 py-0.5 rounded uppercase font-mono">
                    {update.tag}
                  </span>
                </div>
                <p className="font-sans text-xs text-slate-400 leading-relaxed">
                  {update.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Bento Column 1 Row span 2: Workspace Recent Activity */}
        <div className="bg-slate-900/40 border border-white/5 backdrop-blur-xl rounded-2xl p-6 shadow-xl space-y-5 hover:border-white/10 transition-all duration-300">
          <div className="pb-1">
            <span className="font-sans font-extrabold text-sm text-white tracking-tight block">
              Workspace Activity
            </span>
          </div>

          <div className="space-y-4 text-xs">
            <div className="flex gap-3">
              <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-1.5 shrink-0 shadow-[0_0_8px_rgba(59,130,246,0.8)] animate-pulse" />
              <div className="space-y-0.5">
                <span className="font-sans text-xs font-bold text-slate-200 block leading-tight">Draft Notice Created</span>
                <p className="font-sans text-[11px] text-slate-400 leading-normal">Escrow non-payment variables</p>
                <span className="font-mono text-[9px] text-slate-500 block">12 min ago</span>
              </div>
            </div>

            <div className="flex gap-3">
              <div className="w-1.5 h-1.5 rounded-full bg-indigo-500 mt-1.5 shrink-0 shadow-[0_0_8px_rgba(99,102,241,0.8)] animate-pulse" />
              <div className="space-y-0.5">
                <span className="font-sans text-xs font-bold text-slate-200 block leading-tight">Deep Research Session</span>
                <p className="font-sans text-[11px] text-slate-400 leading-normal">Mob Lynching BNS 103(2) precedents</p>
                <span className="font-mono text-[9px] text-slate-500 block">2 hours ago</span>
              </div>
            </div>

            <div className="flex gap-3">
              <div className="w-1.5 h-1.5 rounded-full bg-sky-500 mt-1.5 shrink-0 shadow-[0_0_8px_rgba(56,189,248,0.8)] animate-pulse" />
              <div className="space-y-0.5">
                <span className="font-sans text-xs font-bold text-slate-200 block leading-tight">Comparison Exported</span>
                <p className="font-sans text-[11px] text-slate-400 leading-normal">IEA Sec 65B vs BSA Sec 63 integrity</p>
                <span className="font-mono text-[9px] text-slate-500 block">Yesterday</span>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Insight 1 */}
        <div className="md:col-span-1 lg:col-span-2 bg-gradient-to-tr from-slate-950/80 to-slate-900/40 border border-white/5 backdrop-blur-xl rounded-2xl p-6 shadow-xl space-y-3 hover:border-blue-500/20 transition-all duration-300">
          <div className="flex items-center gap-1.5">
            <Sparkles size={14} className="text-blue-400 animate-pulse" />
            <span className="font-sans text-[10px] font-black text-blue-400 uppercase tracking-widest block">
              {quickInsights[0].title}
            </span>
          </div>
          <span className="font-sans font-black text-base tracking-tight block text-white">
            {quickInsights[0].stat}
          </span>
          <p className="font-sans text-xs text-slate-400 leading-relaxed">
            {quickInsights[0].desc}
          </p>
        </div>

        {/* Quick Insight 2 */}
        <div className="bg-gradient-to-tr from-slate-950/80 to-slate-900/40 border border-white/5 backdrop-blur-xl rounded-2xl p-6 shadow-xl space-y-3 hover:border-sky-500/20 transition-all duration-300">
          <div className="flex items-center gap-1.5">
            <Calendar size={14} className="text-sky-400" />
            <span className="font-sans text-[10px] font-black text-sky-400 uppercase tracking-widest block">
              {quickInsights[1].title}
            </span>
          </div>
          <span className="font-sans font-black text-base tracking-tight block text-white">
            {quickInsights[1].stat}
          </span>
          <p className="font-sans text-xs text-slate-400 leading-relaxed">
            {quickInsights[1].desc}
          </p>
        </div>

        {/* CTA Launch Card */}
        <div className="bg-gradient-to-br from-blue-950/20 to-slate-950/60 border border-blue-500/15 backdrop-blur-xl rounded-2xl p-6 shadow-xl space-y-4 flex flex-col justify-between hover:border-blue-500/30 transition-all duration-300">
          <div className="space-y-1.5">
            <span className="font-sans font-extrabold text-sm text-blue-300 tracking-tight block">
              Interactive Workspace
            </span>
            <p className="font-sans text-[11px] text-slate-400 leading-normal">
              Directly launch the core BNS AI legal chat to map legacy acts and compile documents.
            </p>
          </div>
          <button
            onClick={() => onNavigate('workspace')}
            className="w-full py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-sans font-extrabold flex items-center justify-center gap-1.5 cursor-pointer shadow-lg shadow-blue-500/10 hover:shadow-blue-500/30 transition-all duration-250 mt-2"
          >
            <span>Activate Intel Core</span>
            <ArrowUpRight size={13} />
          </button>
        </div>

        </div>
      )}
    </div>
  );
}
