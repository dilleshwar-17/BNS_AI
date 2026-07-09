/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { APIService } from '../services/api';
import { DeepResearchSession } from '../types';
import {
  Compass,
  Play,
  RotateCw,
  Plus,
  Trash2,
  Calendar,
  Sparkles,
  Award,
  BookOpen,
  FileText,
  Download,
  Share2,
  GitCommit,
  Layers,
  Activity,
  CheckCircle2,
  ChevronRight
} from 'lucide-react';

export default function DeepResearchView() {
  const [researchGoal, setResearchGoal] = useState(
    'Assess legal liabilities and admissibility pathways for an online escrow payment fraud where UPI transaction logs are disputed under BNS and BSA.'
  );
  const [status, setStatus] = useState<'idle' | 'running' | 'completed'>('idle');
  const [progressMsg, setProgressMsg] = useState('');
  const [progressPercent, setProgressPercent] = useState(0);
  const [session, setSession] = useState<DeepResearchSession | null>(null);

  const handleStartResearch = async () => {
    if (!researchGoal.trim()) return;

    setStatus('running');
    setSession(null);
    setProgressPercent(10);
    setProgressMsg('Initiating vector database connection...');

    try {
      const result = await APIService.startDeepResearch(researchGoal, (step, percent) => {
        setProgressMsg(step);
        setProgressPercent(percent);
      });

      setSession(result);
      setStatus('completed');
    } catch (err) {
      setStatus('idle');
    }
  };

  const handleExport = () => {
    if (!session?.reportMarkdown) return;
    const blob = new Blob([session.reportMarkdown], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'BNS_AI_Deep_Research_Report.md';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="flex-1 space-y-8 animate-[fadeIn_0.4s_ease-out] max-w-6xl mx-auto text-slate-100">
      {/* Top Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/5 pb-6">
        <div>
          <h2 className="font-sans font-extrabold text-2xl text-white tracking-tight">
            Deep Research Workspace
          </h2>
          <p className="font-sans text-sm text-slate-400 font-medium">
            Formulate multi-statute research targets, synthesize timelines, and generate evidentiary sifts.
          </p>
        </div>

        {status === 'running' && (
          <div className="flex items-center gap-2 bg-blue-500/10 border border-blue-500/20 rounded-xl px-4 py-2">
            <RotateCw size={14} className="text-blue-400 animate-spin" />
            <span className="font-mono text-xs font-bold text-blue-400">Analyzing statutes...</span>
          </div>
        )}
      </div>

      {/* Goal Entry Area */}
      <div className="bg-slate-900/40 border border-white/5 backdrop-blur-xl rounded-2xl p-6 shadow-xl space-y-4">
        <label className="font-sans text-xs font-bold text-slate-400 uppercase tracking-widest block">
          Enter Research Objective
        </label>
        
        <div className="flex flex-col md:flex-row gap-4 items-stretch">
          <textarea
            value={researchGoal}
            onChange={e => setResearchGoal(e.target.value)}
            disabled={status === 'running'}
            rows={2}
            placeholder="Describe the legal situation, parties involved, and specific sections or acts to research..."
            className="flex-1 bg-slate-950/40 border border-white/5 hover:border-white/10 focus:border-blue-500/50 rounded-xl p-4 font-sans text-sm text-slate-250 placeholder:text-slate-550 outline-none resize-none transition-all disabled:opacity-60"
          />
          
          <button
            onClick={handleStartResearch}
            disabled={status === 'running' || !researchGoal.trim()}
            className="md:w-56 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-sans font-bold text-sm flex items-center justify-center gap-2 cursor-pointer transition-all disabled:opacity-50 select-none shadow-[0_0_15px_rgba(37,99,235,0.4)] py-4 md:py-0"
          >
            <Play size={16} />
            <span>Sift Precedents</span>
          </button>
        </div>

        {/* Processing/Progress state */}
        {status === 'running' && (
          <div className="space-y-2 pt-2 animate-pulse">
            <div className="flex items-center justify-between text-xs font-mono text-slate-400">
              <span className="font-sans italic">{progressMsg}</span>
              <span className="font-bold">{progressPercent}%</span>
            </div>
            <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
              <div
                className="h-full bg-blue-500 rounded-full transition-all duration-300"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>
        )}
      </div>

      {status === 'running' && (
        /* High-fidelity shimmering bento grid skeleton matching the final research layout structure */
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Shimmer Left Column (7 cols): Planner, Timeline, Sources */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Shimmer Research Planner */}
            <div className="shimmer-bg border border-white/5 rounded-2xl p-6 space-y-4 shadow-xl">
              <div className="h-4 w-52 bg-white/10 rounded pb-2 border-b border-white/5" />
              <div className="space-y-3">
                {[1, 2, 3].map(row => (
                  <div key={row} className="flex items-center justify-between p-3.5 bg-slate-950/20 rounded-xl border border-white/5">
                    <div className="flex items-center gap-3 flex-1">
                      <div className="h-4 w-4 bg-white/10 rounded-full shrink-0" />
                      <div className="h-3 w-1/2 bg-white/10 rounded" />
                    </div>
                    <div className="h-5 w-24 bg-white/5 rounded-full" />
                  </div>
                ))}
              </div>
            </div>

            {/* Shimmer Evidence Timeline */}
            <div className="shimmer-bg border border-white/5 rounded-2xl p-6 space-y-5 shadow-xl">
              <div className="h-4 w-48 bg-white/10 rounded pb-2 border-b border-white/5" />
              <div className="relative pl-6 border-l border-white/5 space-y-6">
                {[1, 2, 3].map(row => (
                  <div key={row} className="relative space-y-2">
                    <span className="absolute -left-[30px] top-1 w-4 h-4 rounded-full border-2 border-slate-950 bg-white/5 shadow-md" />
                    <div className="flex items-center gap-2.5">
                      <div className="h-4 w-12 bg-white/5 rounded" />
                      <div className="h-3 w-16 bg-white/5 rounded" />
                    </div>
                    <div className="h-3.5 w-1/3 bg-white/10 rounded" />
                    <div className="h-3 w-4/5 bg-white/5 rounded" />
                    <div className="h-2.5 w-24 bg-white/5 rounded" />
                  </div>
                ))}
              </div>
            </div>

            {/* Shimmer Precedents & Acts Mapping */}
            <div className="shimmer-bg border border-white/5 rounded-2xl p-6 space-y-4 shadow-xl">
              <div className="h-4 w-56 bg-white/10 rounded pb-2 border-b border-white/5" />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[1, 2].map(row => (
                  <div key={row} className="p-4 rounded-xl border border-white/5 bg-slate-950/20 space-y-2">
                    <div className="flex justify-between items-start gap-2">
                      <div className="h-3.5 w-2/3 bg-white/10 rounded" />
                      <div className="h-4 w-8 bg-white/5 rounded" />
                    </div>
                    <div className="h-2.5 w-1/3 bg-white/5 rounded" />
                    <div className="h-3 w-5/6 bg-white/5 rounded" />
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Shimmer Right Column (5 cols): Brief and summary */}
          <div className="lg:col-span-5 space-y-6">
            <div className="shimmer-bg border border-white/5 rounded-2xl p-6 space-y-6 shadow-xl">
              <div className="h-4 w-32 bg-white/10 rounded pb-2 border-b border-white/5" />
              <div className="bg-slate-950/20 rounded-xl p-5 min-h-[420px] space-y-4">
                <div className="h-4 w-4/5 bg-white/10 rounded" />
                <div className="h-3 w-2/3 bg-white/5 rounded" />
                <div className="space-y-2 pt-2">
                  <div className="h-3 w-full bg-white/5 rounded" />
                  <div className="h-3 w-full bg-white/5 rounded" />
                  <div className="h-3 w-5/6 bg-white/5 rounded" />
                </div>
                <div className="space-y-2 pt-2">
                  <div className="h-3 w-full bg-white/5 rounded" />
                  <div className="h-3 w-full bg-white/5 rounded" />
                  <div className="h-3 w-4/5 bg-white/5 rounded" />
                </div>
              </div>
              <div className="h-12 w-full bg-white/5 rounded-xl" />
            </div>
          </div>
        </div>
      )}

      {session && status === 'completed' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left Column (8 cols): Planner, Timeline, Sources */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* 1. Research Planner */}
            <div className="bg-slate-900/40 border border-white/5 backdrop-blur-xl rounded-2xl p-6 shadow-xl space-y-4">
              <span className="font-sans font-extrabold text-sm text-white block pb-2 border-b border-white/5">
                1. Intelligence Sifting Pipeline
              </span>
              <div className="space-y-3">
                {session.planner.map((step) => (
                  <div key={step.id} className="flex items-center justify-between p-3.5 bg-slate-950/40 rounded-xl border border-white/5">
                    <div className="flex items-center gap-3">
                      <CheckCircle2 size={16} className="text-emerald-400 shrink-0" />
                      <span className="font-sans text-xs font-semibold text-slate-200">{step.title}</span>
                    </div>
                    <span className="font-mono text-[10px] bg-blue-500/10 text-blue-400 border border-blue-500/20 px-2.5 py-0.5 rounded-full font-bold whitespace-nowrap shadow-[0_0_10px_rgba(59,130,246,0.1)]">
                      {step.sourcesFound} sources matches
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* 2. Evidence Timeline */}
            <div className="bg-slate-900/40 border border-white/5 backdrop-blur-xl rounded-2xl p-6 shadow-xl space-y-5">
              <span className="font-sans font-extrabold text-sm text-white block pb-2 border-b border-white/5">
                2. Chronological Fact Timeline
              </span>
              
              <div className="relative pl-6 border-l border-white/5 space-y-6">
                {session.timeline.map((evt, idx) => (
                  <div key={idx} className="relative group">
                    {/* Bullet marker */}
                    <span className={`absolute -left-[30px] top-1 w-4 h-4 rounded-full border-2 border-slate-950 flex items-center justify-center shadow-md ${
                      evt.factType === 'critical' ? 'bg-red-500 shadow-[0_0_10px_rgba(239,68,68,0.5)]' :
                      evt.factType === 'disputed' ? 'bg-amber-500 shadow-[0_0_10px_rgba(245,158,11,0.5)]' : 'bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.5)]'
                    }`} />
                    
                    <div className="space-y-1">
                      <div className="flex items-center gap-2.5">
                        <span className="font-mono text-[10px] font-extrabold text-slate-300 bg-white/5 border border-white/5 px-2 py-0.5 rounded">
                          {evt.date}
                        </span>
                        <span className={`font-sans text-[9px] font-bold uppercase px-1.5 py-0.2 rounded ${
                          evt.factType === 'critical' ? 'bg-red-500/10 text-red-400 border border-red-500/20' :
                          evt.factType === 'disputed' ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20' : 'bg-blue-500/10 text-blue-400 border border-blue-500/20'
                        }`}>
                          {evt.factType}
                        </span>
                      </div>
                      
                      <span className="font-sans font-bold text-xs text-slate-200 block">
                        {evt.title}
                      </span>
                      <p className="font-sans text-slate-400 text-[11px] leading-relaxed">
                        {evt.description}
                      </p>
                      <span className="font-mono text-[9px] text-slate-500 block italic pt-1">
                        Source: {evt.source}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 3. Precedents & Acts Mapping */}
            <div className="bg-slate-900/40 border border-white/5 backdrop-blur-xl rounded-2xl p-6 shadow-xl space-y-4">
              <span className="font-sans font-extrabold text-sm text-white block pb-2 border-b border-white/5">
                3. Substantive & Precedent Anchors
              </span>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {session.judgments.map((jd, jidx) => (
                  <div key={jidx} className="p-4 rounded-xl border border-sky-500/15 bg-sky-950/10 space-y-2">
                    <div className="flex justify-between items-start gap-2">
                      <span className="font-sans font-bold text-xs text-slate-200">{jd.title}</span>
                      <span className="font-mono text-[9px] font-bold text-sky-400 bg-sky-500/10 border border-sky-500/20 px-2 py-0.5 rounded">{jd.year}</span>
                    </div>
                    <span className="font-mono text-[9px] text-slate-450 block">{jd.citation}</span>
                    <p className="font-sans text-slate-400 text-[11px] leading-relaxed">
                      "{jd.summary}"
                    </p>
                  </div>
                ))}

                {session.acts.map((act, aix) => (
                  <div key={aix} className="p-4 rounded-xl border border-white/5 bg-slate-950/40 space-y-2">
                    <div className="flex justify-between items-start gap-2">
                      <span className="font-sans font-bold text-xs text-slate-200">{act.act}</span>
                      <span className="font-mono text-[10px] font-extrabold text-blue-400 uppercase">{act.section}</span>
                    </div>
                    <span className="font-sans text-[11px] font-medium text-slate-300 block">{act.title}</span>
                    <p className="font-sans text-slate-400 text-[11px] leading-relaxed">
                      {act.relevance}
                    </p>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Right Column (5 cols): Final synthesized markdown report */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-slate-900/40 border border-white/5 backdrop-blur-xl rounded-2xl p-6 shadow-xl space-y-6 sticky top-6">
              
              <div className="flex items-center justify-between pb-3 border-b border-white/5">
                <span className="font-sans font-extrabold text-sm text-white">
                  Synthesized Brief
                </span>
                
                <div className="flex items-center gap-2">
                  <button
                    onClick={handleExport}
                    className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white border border-white/5 transition-colors cursor-pointer"
                    title="Download Report (Markdown)"
                  >
                    <Download size={14} />
                  </button>
                </div>
              </div>

              {/* Render synthesized Markdown nicely */}
              <div className="bg-slate-950/40 border border-white/5 rounded-xl p-5 max-h-[500px] overflow-y-auto scrollbar-thin">
                <div className="font-sans text-xs text-slate-300 space-y-4 leading-relaxed">
                  <h3 className="font-sans font-black text-sm text-white uppercase border-b border-white/10 pb-2">
                    LEGAL INTELLIGENCE BRIEF: CONTRACTUAL ESCROW FRAUD
                  </h3>
                  <div className="space-y-1">
                    <p className="font-mono text-[10px] text-slate-500">
                      **Focus Statutes**: BNS, 2023 (Sec 316, 318) | BNSS, 2023 (Sec 173, 187) | BSA, 2023 (Sec 63)
                    </p>
                  </div>
                  
                  <div className="space-y-2">
                    <h4 className="font-sans font-bold text-xs text-slate-200">1. Substantive Liability Assessment</h4>
                    <p className="text-slate-400">
                      The transaction log dated June 15, combined with the WhatsApp logs dated June 18, prima facie satisfies the criteria for **Cheating and Dishonestly Inducing Delivery of Property** under **Section 318(4) of the Bharatiya Nyaya Sanhita (BNS), 2023** (formerly Section 420 IPC).
                    </p>
                    <p className="text-slate-400">
                      The deliberate omission to refund despite holding liquid assets establishes *fraudulent intent at inception*, which is a vital prerequisite to criminalize a civil contract breach.
                    </p>
                  </div>

                  <div className="space-y-2">
                    <h4 className="font-sans font-bold text-xs text-slate-200">2. Evidentiary Admissibility (Digital Assets)</h4>
                    <p className="text-slate-400">
                      To successfully introduce the AWS server logs and WhatsApp chat snapshots, the prosecution must strictly satisfy **Section 63 of the Bharatiya Sakshya Adhiniyam (BSA), 2023**:
                    </p>
                    <ul className="list-disc list-inside space-y-1 pl-2 text-slate-400">
                      <li>**Forensic Integrity**: Provide a digital certificate signed by the IT Administrator conforming to the BSA Schedule.</li>
                      <li>**Device Custody**: Confirm that the mobile handset operated continuously without unauthorized access.</li>
                    </ul>
                  </div>

                  <div className="space-y-2">
                    <h4 className="font-sans font-bold text-xs text-slate-200">3. Defense Sifting & Weakness Profile</h4>
                    <p className="text-slate-400">
                      * **Defense Pitch**: The counterparty will argue that the UPI server outage was an "Act of God" / force majeure, attempting to re-route this to a standard commercial arbitration chamber.
                    </p>
                    <p className="text-slate-400">
                      * **Counter-Strategy**: Rely on the WhatsApp logs of June 18 which show they actively diverted funds to alternate personal accounts rather than attempting to retry the failed transaction pipeline.
                    </p>
                  </div>
                </div>
              </div>

              {/* Action notice */}
              <div className="bg-sky-500/10 border border-sky-500/20 rounded-xl p-4 flex gap-3 text-sky-300">
                <Sparkles size={16} className="text-sky-400 shrink-0" />
                <p className="font-sans text-[11px] text-sky-300 leading-normal">
                  Sift report successfully compiled using BNS vector index 2026. Ready for legal notice drafting.
                </p>
              </div>

            </div>
          </div>
        </div>
      )}
    </div>
  );
}
