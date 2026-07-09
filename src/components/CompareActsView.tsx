/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { APIService, mockCompareData } from '../services/api';
import { CompareResult } from '../types';
import {
  GitCompare,
  ArrowRight,
  Sparkles,
  Check,
  AlertCircle,
  HelpCircle,
  TrendingUp,
  Scale
} from 'lucide-react';

export default function CompareActsView() {
  const [comparisons] = useState<CompareResult[]>(mockCompareData);
  const [selectedComp, setSelectedComp] = useState<CompareResult>(mockCompareData[0]);

  return (
    <div className="flex-1 space-y-8 animate-[fadeIn_0.4s_ease-out] max-w-6xl mx-auto text-slate-100">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/5 pb-6">
        <div>
          <h2 className="font-sans font-extrabold text-2xl text-white tracking-tight">
            Statutory Reform Comparison Engine
          </h2>
          <p className="font-sans text-sm text-slate-400 font-medium">
            Side-by-side transition maps tracking the historic replacement of IPC, CrPC, and IEA with the BNS, BNSS, and BSA.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left selector menu (3 cols) */}
        <div className="lg:col-span-3 space-y-3 bg-slate-900/40 border border-white/5 backdrop-blur-xl rounded-2xl p-4 shadow-xl">
          <span className="font-sans text-xs font-bold text-slate-400 uppercase tracking-widest block pb-2 border-b border-white/5">
            Select Legal Transition
          </span>

          <div className="space-y-1">
            {comparisons.map((comp, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedComp(comp)}
                className={`w-full flex items-center justify-between p-3.5 rounded-xl text-left border transition-all cursor-pointer ${
                  selectedComp.title === comp.title
                    ? 'bg-blue-600 border-blue-600 text-white shadow-lg shadow-blue-600/20'
                    : 'border-white/5 text-slate-300 hover:bg-white/5'
                }`}
              >
                <div className="flex flex-col">
                  <span className="font-sans text-xs font-bold">{comp.title}</span>
                  <span className={`font-mono text-[9px] mt-0.5 ${
                    selectedComp.title === comp.title ? 'text-blue-200' : 'text-slate-450'
                  }`}>
                    {comp.oldSection.split(' ')[1]} → {comp.newSection.split(' ')[1]}
                  </span>
                </div>
                <ArrowRight size={12} className={selectedComp.title === comp.title ? 'text-white' : 'text-slate-500'} />
              </button>
            ))}
          </div>
        </div>

        {/* Right Split Comparison Display (9 cols) */}
        <div className="lg:col-span-9 space-y-6">
          
          {/* Active Title Banner */}
          <div className="bg-slate-950/60 border border-white/5 backdrop-blur-xl text-white rounded-2xl p-6 shadow-xl flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-blue-500/10 rounded-xl border border-blue-500/20 text-blue-400">
                <GitCompare size={20} />
              </div>
              <div>
                <span className="font-mono text-[10px] text-sky-400 uppercase tracking-widest font-bold">Inspection Case</span>
                <h3 className="font-sans font-bold text-lg">{selectedComp.title}</h3>
              </div>
            </div>
          </div>

          {/* SPLIT SCREEN CARDS */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Old Act Column */}
            <div className="bg-slate-900/40 border border-white/5 backdrop-blur-xl rounded-2xl p-6 shadow-xl space-y-4 relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-24 h-24 bg-white/5 rounded-full -mr-8 -mt-8 pointer-events-none group-hover:scale-110 transition-transform" />
              
              <div className="space-y-1.5 relative">
                <span className="font-mono text-[10px] text-slate-400 uppercase tracking-widest font-bold block">Archaic/Repealed Law</span>
                <span className="font-sans font-black text-xs text-slate-200 block">{selectedComp.oldAct}</span>
                <span className="font-mono text-base font-extrabold text-slate-350 block bg-slate-950/40 inline-block px-3 py-1 rounded-lg border border-white/5">{selectedComp.oldSection}</span>
              </div>
              
              <div className="h-[1px] bg-white/5" />
              
              <div className="space-y-2">
                <span className="font-sans text-xs font-bold text-slate-450 uppercase tracking-wider block">Historic Provision Baseline</span>
                <p className="font-sans text-xs text-slate-400 leading-relaxed italic">
                  Defines standard legal requirements under ancient colonial guidelines without specific modern tech references.
                </p>
              </div>
            </div>

            {/* New Act Column */}
            <div className="bg-blue-950/10 border border-blue-500/20 rounded-2xl p-6 shadow-xl space-y-4 relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-24 h-24 bg-blue-500/10 rounded-full -mr-8 -mt-8 pointer-events-none group-hover:scale-110 transition-transform" />
              
              <div className="space-y-1.5 relative">
                <span className="font-mono text-[10px] text-blue-400 uppercase tracking-widest font-bold block">Modern/Enacted Law</span>
                <span className="font-sans font-black text-xs text-blue-300 block">{selectedComp.newAct}</span>
                <span className="font-mono text-base font-extrabold text-blue-300 block bg-blue-500/20 inline-block px-3 py-1 rounded-lg border border-blue-500/30">{selectedComp.newSection}</span>
              </div>

              <div className="h-[1px] bg-blue-500/20" />

              <div className="space-y-2">
                <span className="font-sans text-xs font-bold text-blue-300 uppercase tracking-wider block">Codified Transition Summary</span>
                <p className="font-sans text-xs text-slate-300 leading-relaxed font-medium">
                  Directly replaces previous sections with clear boundaries, electronic parameters, and targeted prosecution tranches.
                </p>
              </div>
            </div>
          </div>

          {/* SIMILARITIES, DIFFERENCES & IMPLICATIONS CARDS */}
          <div className="bg-slate-900/40 border border-white/5 backdrop-blur-xl rounded-2xl p-6 shadow-xl space-y-6">
            
            {/* Similarities & Differences */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3 p-5 rounded-2xl border border-white/5 bg-slate-950/40">
                <div className="flex items-center gap-2 text-slate-300">
                  <Check size={16} className="text-emerald-400 animate-pulse" />
                  <span className="font-sans font-bold text-xs uppercase tracking-widest">Similarities Baseline</span>
                </div>
                <p className="font-sans text-xs text-slate-400 leading-relaxed">
                  {selectedComp.similarities}
                </p>
              </div>

              <div className="space-y-3 p-5 rounded-2xl border border-rose-500/20 bg-rose-950/20">
                <div className="flex items-center gap-2 text-rose-400">
                  <AlertCircle size={16} className="text-rose-500 animate-pulse" />
                  <span className="font-sans font-bold text-xs uppercase tracking-widest">Key Structural Differences</span>
                </div>
                <p className="font-sans text-xs text-slate-400 leading-relaxed">
                  {selectedComp.differences}
                </p>
              </div>
            </div>

            {/* Practical Implications */}
            <div className="space-y-3 border-t border-white/5 pt-6">
              <div className="flex items-center gap-2 text-slate-300">
                <Scale size={16} className="text-blue-400" />
                <span className="font-sans font-bold text-xs uppercase tracking-widest">Practical Litigation Implication</span>
              </div>
              <p className="font-sans text-xs text-slate-400 leading-relaxed">
                {selectedComp.implication}
              </p>
            </div>

            {/* Punishment changes */}
            {selectedComp.punishmentChange !== 'N/A (Evidentiary procedural upgrade)' && (
              <div className="p-4 rounded-xl bg-blue-950/20 border border-blue-500/20 flex gap-3 items-center">
                <TrendingUp size={16} className="text-blue-400 shrink-0" />
                <p className="font-sans text-[11px] text-blue-300 leading-normal font-semibold">
                  Punishment Adjustment: {selectedComp.punishmentChange}
                </p>
              </div>
            )}

          </div>

        </div>
      </div>
    </div>
  );
}
