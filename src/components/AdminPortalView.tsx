/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import {
  ShieldAlert,
  UploadCloud,
  Database,
  Cpu,
  RefreshCw,
  Sliders,
  CheckCircle,
  FileText,
  Users,
  AlertTriangle,
  Flame,
  Search
} from 'lucide-react';

export default function AdminPortalView() {
  const [activeTab, setActiveTab] = useState<'ingest' | 'models' | 'system' | 'users'>('ingest');
  
  // Simulated file upload states
  const [ingestionFiles, setIngestionFiles] = useState([
    { name: 'MHA_Section63_Directives.pdf', size: '1.4 MB', status: 'Ingested', nodes: 48, timestamp: '10 mins ago' },
    { name: 'SC_Poonawalla_CaseSummary.docx', size: '420 KB', status: 'Embedded', nodes: 12, timestamp: '1 hour ago' },
    { name: 'BNSS_Procedural_Custody_Drafts.pdf', size: '3.2 MB', status: 'Processing', nodes: 0, timestamp: 'Just now' }
  ]);
  const [uploadProgress, setUploadProgress] = useState<number | null>(null);
  const [dragging, setDragging] = useState(false);

  // Model Config States
  const [selectedModel, setSelectedModel] = useState('models/gemini-3.5-flash');
  const [temperature, setTemperature] = useState(0.2);
  const [thinkingLevel, setThinkingLevel] = useState<'high' | 'standard'>('high');

  // Logs
  const auditLogs = [
    { user: 'sriramasita90@gmail.com', action: 'Deep Research Compiled', ip: '105.250.77.3', time: '12 mins ago' },
    { user: 'advocate.sen@delhihc.in', action: 'Legal Notice Generated', ip: '142.12.89.54', time: '1 hour ago' },
    { user: 'prosecutor.sharma@gov.in', action: 'IPC 302 Transition Query', ip: '10.50.12.101', time: '4 hours ago' }
  ];

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setDragging(true);
  };

  const handleDragLeave = () => {
    setDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      simulateUpload(e.dataTransfer.files[0].name, e.dataTransfer.files[0].size);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      simulateUpload(e.target.files[0].name, e.target.files[0].size);
    }
  };

  const simulateUpload = (name: string, sizeRaw: number) => {
    const size = (sizeRaw / 1024 / 1024).toFixed(1) + ' MB';
    setUploadProgress(10);
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev === null) return null;
        if (prev >= 100) {
          clearInterval(interval);
          setIngestionFiles(old => [
            { name, size, status: 'Processing', nodes: 0, timestamp: 'Just now' },
            ...old
          ]);
          setTimeout(() => setUploadProgress(null), 1000);
          return 100;
        }
        return prev + 30;
      });
    }, 400);
  };

  return (
    <div className="flex-1 space-y-8 animate-[fadeIn_0.4s_ease-out] max-w-6xl mx-auto text-slate-100">
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/5 pb-6">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-red-500/10 rounded-2xl border border-red-500/20 text-red-400">
            <ShieldAlert size={22} />
          </div>
          <div>
            <h2 className="font-sans font-extrabold text-2xl text-white tracking-tight">
              Enterprise Admin Portal
            </h2>
            <p className="font-sans text-sm text-slate-400 font-medium">
              Only authorized operators can ingest case materials, synchronize vector graphs and adjust LLM configs.
            </p>
          </div>
        </div>

        {/* Portal Badges */}
        <div className="bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-2 flex items-center gap-2 shadow-[0_0_15px_rgba(239,68,68,0.15)]">
          <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
          <span className="font-mono text-[10px] text-red-400 font-bold uppercase tracking-wider">
            Operator Access Active
          </span>
        </div>
      </div>

      {/* Admin Horizontal Sub Navigation */}
      <div className="flex border-b border-white/5 pb-px gap-6">
        {[
          { id: 'ingest', label: 'Document Ingestion (Legal DB)', icon: UploadCloud },
          { id: 'models', label: 'Model Configuration', icon: Sliders },
          { id: 'system', label: 'System Monitoring', icon: Database },
          { id: 'users', label: 'Operator Logs & Roles', icon: Users }
        ].map(sub => {
          const Icon = sub.icon;
          const isSelected = activeTab === sub.id;
          return (
            <button
              key={sub.id}
              onClick={() => setActiveTab(sub.id as any)}
              className={`pb-4 font-sans text-xs font-bold uppercase tracking-wider flex items-center gap-2 transition-all relative border-b-2 cursor-pointer ${
                isSelected ? 'border-red-500 text-white' : 'border-transparent text-slate-400 hover:text-slate-300'
              }`}
            >
              <Icon size={14} />
              <span>{sub.label}</span>
            </button>
          );
        })}
      </div>

      {/* RENDER ACTIVE ADMINISTRATIVE VIEW */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left main segment (8 cols) */}
        <div className="lg:col-span-8 space-y-6">

          {/* Tab 1: Ingestion workspace */}
          {activeTab === 'ingest' && (
            <div className="space-y-6">
              
              {/* Drag Drop Area */}
              <div
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                className={`border-2 border-dashed rounded-3xl p-10 text-center transition-all relative backdrop-blur-xl ${
                  dragging ? 'border-red-500 bg-red-500/10 shadow-[0_0_20px_rgba(239,68,68,0.2)]' : 'border-white/5 bg-slate-900/40 hover:border-white/10'
                }`}
              >
                <input
                  type="file"
                  id="admin-file-picker"
                  onChange={handleFileSelect}
                  className="hidden"
                  accept=".pdf,.docx,.doc,.txt,.json"
                />

                <div className="space-y-4 max-w-sm mx-auto">
                  <div className="p-4 bg-white/5 border border-white/5 rounded-2xl w-14 h-14 flex items-center justify-center mx-auto text-slate-400">
                    <UploadCloud size={24} />
                  </div>
                  <div>
                    <span className="font-sans font-bold text-sm text-slate-200 block">
                      Ingest Legal Documentation
                    </span>
                    <p className="font-sans text-xs text-slate-400 mt-1 leading-relaxed">
                      Drag and drop PDF statutes, case transcripts, or JSON graphs here, or{' '}
                      <label htmlFor="admin-file-picker" className="text-blue-400 hover:underline cursor-pointer font-semibold">
                        browse local storage
                      </label>
                    </p>
                  </div>
                  <span className="font-mono text-[9px] text-slate-500 block uppercase tracking-wider">
                    Maximum single chunk size: 50MB (PDF/JSON)
                  </span>
                </div>

                {uploadProgress !== null && (
                  <div className="absolute inset-0 bg-slate-950/95 backdrop-blur-md rounded-3xl flex flex-col items-center justify-center p-8 z-20 space-y-3">
                    <RefreshCw size={24} className="text-red-500 animate-spin" />
                    <span className="font-sans text-xs font-bold text-slate-200">Uploading to legal database index...</span>
                    <div className="w-48 h-1.5 bg-white/5 rounded-full overflow-hidden">
                      <div className="h-full bg-red-500 rounded-full transition-all duration-150" style={{ width: `${uploadProgress}%` }} />
                    </div>
                  </div>
                )}
              </div>

              {/* Ingest queue logs table */}
              <div className="bg-slate-900/40 border border-white/5 backdrop-blur-xl rounded-2xl p-6 shadow-xl space-y-4">
                <span className="font-sans font-extrabold text-sm text-white block pb-2 border-b border-white/5">
                  Ingestion & Embedding Queue Logs
                </span>

                <div className="divide-y divide-white/5">
                  {ingestionFiles.map((file, idx) => (
                    <div key={idx} className="py-3.5 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <FileText size={16} className="text-slate-400 shrink-0" />
                        <div className="space-y-0.5">
                          <span className="font-sans text-xs font-bold text-slate-200 block">{file.name}</span>
                          <span className="font-mono text-[9px] text-slate-450">{file.size} • Uploaded {file.timestamp}</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        {file.nodes > 0 && (
                          <span className="font-mono text-[10px] text-slate-400 font-medium">
                            {file.nodes} graph nodes mapped
                          </span>
                        )}
                        <span className={`font-mono text-[9px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider border ${
                          file.status === 'Ingested' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' :
                          file.status === 'Embedded' ? 'bg-blue-500/10 text-blue-400 border-blue-500/20' : 'bg-amber-500/10 text-amber-400 border-amber-500/20 animate-pulse'
                        }`}>
                          {file.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          )}

          {/* Tab 2: Models Config */}
          {activeTab === 'models' && (
            <div className="bg-slate-900/40 border border-white/5 backdrop-blur-xl rounded-2xl p-6 shadow-xl space-y-6">
              <span className="font-sans font-extrabold text-sm text-white block pb-2 border-b border-white/5">
                Model Parameter Configuration
              </span>

              <div className="space-y-5">
                {/* Switch LLM */}
                <div className="space-y-2">
                  <label className="font-sans text-xs font-bold text-slate-400 block">Select Primary Reasoning Engine</label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <button
                      onClick={() => setSelectedModel('models/gemini-3.5-flash')}
                      className={`p-4 rounded-xl text-left border transition-all cursor-pointer ${
                        selectedModel === 'models/gemini-3.5-flash'
                          ? 'border-red-500/40 bg-red-500/10 text-red-400 font-bold shadow-[0_0_15px_rgba(239,68,68,0.1)]'
                          : 'border-white/5 text-slate-300 hover:bg-white/5'
                      }`}
                    >
                      <span className="font-sans text-xs block">models/gemini-3.5-flash</span>
                      <span className="font-mono text-[9px] text-slate-500 mt-0.5 block">Default low-latency processing stream</span>
                    </button>
                    <button
                      onClick={() => setSelectedModel('models/gemini-3.1-pro-preview')}
                      className={`p-4 rounded-xl text-left border transition-all cursor-pointer ${
                        selectedModel === 'models/gemini-3.1-pro-preview'
                          ? 'border-red-500/40 bg-red-500/10 text-red-400 font-bold shadow-[0_0_15px_rgba(239,68,68,0.1)]'
                          : 'border-white/5 text-slate-300 hover:bg-white/5'
                      }`}
                    >
                      <span className="font-sans text-xs block">models/gemini-3.1-pro-preview</span>
                      <span className="font-mono text-[9px] text-slate-500 mt-0.5 block">High Thinking Mode enabled (thinkingLevel: HIGH)</span>
                    </button>
                  </div>
                </div>

                {/* Thinking level toggle */}
                <div className="space-y-2">
                  <label className="font-sans text-xs font-bold text-slate-400 block">Thinking level toggle</label>
                  <div className="flex gap-4">
                    <button
                      onClick={() => setThinkingLevel('high')}
                      className={`px-4 py-2 rounded-xl text-xs font-sans font-bold border transition-all cursor-pointer ${
                        thinkingLevel === 'high' ? 'bg-red-600 border-red-600 text-white shadow-[0_0_15px_rgba(239,68,68,0.3)]' : 'bg-white/5 border-white/5 text-slate-400 hover:text-slate-200'
                      }`}
                    >
                      High Level (Max reasoning)
                    </button>
                    <button
                      onClick={() => setThinkingLevel('standard')}
                      className={`px-4 py-2 rounded-xl text-xs font-sans font-bold border transition-all cursor-pointer ${
                        thinkingLevel === 'standard' ? 'bg-red-600 border-red-600 text-white shadow-[0_0_15px_rgba(239,68,68,0.3)]' : 'bg-white/5 border-white/5 text-slate-400 hover:text-slate-200'
                      }`}
                    >
                      Standard Level (No threshold)
                    </button>
                  </div>
                </div>

                {/* Temperature slider */}
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <label className="font-sans text-xs font-bold text-slate-400">Model Temperature</label>
                    <span className="font-mono text-xs text-red-400 font-bold">{temperature} (Highly Deterministic)</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.1"
                    value={temperature}
                    onChange={e => setTemperature(parseFloat(e.target.value))}
                    className="w-full accent-red-600 cursor-pointer"
                  />
                  <div className="flex justify-between font-mono text-[9px] text-slate-500">
                    <span>0.0 (Deterministic Legal Codes)</span>
                    <span>1.0 (Creative/Fluid commentary)</span>
                  </div>
                </div>

                <button
                  onClick={() => alert('Model parameters successfully synced to BNS vector router.')}
                  className="px-6 py-2.5 bg-red-600 hover:bg-red-500 text-white rounded-xl text-xs font-sans font-bold flex items-center justify-center gap-1.5 cursor-pointer shadow-[0_0_15px_rgba(239,68,68,0.3)]"
                >
                  <Sliders size={13} />
                  <span>Commit Parameters</span>
                </button>
              </div>
            </div>
          )}

          {/* Tab 3: Systems Monitoring */}
          {activeTab === 'system' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Telemetry charts */}
              <div className="bg-slate-900/40 border border-white/5 backdrop-blur-xl rounded-2xl p-6 shadow-xl space-y-4">
                <span className="font-sans font-bold text-xs text-slate-450 uppercase tracking-widest block">Core Telemetry Load</span>
                <div className="space-y-3.5">
                  <div>
                    <div className="flex justify-between font-mono text-xs text-slate-300 mb-1">
                      <span>Server Processor (CPU)</span>
                      <span>12.5%</span>
                    </div>
                    <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden border border-white/5">
                      <div className="h-full bg-emerald-500 rounded-full" style={{ width: '12.5%' }} />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between font-mono text-xs text-slate-300 mb-1">
                      <span>Vector DB Embedding Space</span>
                      <span>42.8 GB / 100 GB</span>
                    </div>
                    <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden border border-white/5">
                      <div className="h-full bg-blue-500 rounded-full" style={{ width: '42.8%' }} />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between font-mono text-xs text-slate-300 mb-1">
                      <span>Redis Cache Status</span>
                      <span>98.2% Hit Rate</span>
                    </div>
                    <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden border border-white/5">
                      <div className="h-full bg-purple-500 rounded-full" style={{ width: '98.2%' }} />
                    </div>
                  </div>
                </div>
              </div>

              {/* Database health status list */}
              <div className="bg-slate-900/40 border border-white/5 backdrop-blur-xl rounded-2xl p-6 shadow-xl space-y-4">
                <span className="font-sans font-bold text-xs text-slate-450 uppercase tracking-widest block">Connection Health Pool</span>
                <div className="space-y-3">
                  <div className="p-3.5 bg-emerald-500/5 border border-emerald-500/15 hover:border-emerald-500/30 rounded-xl flex items-center justify-between text-xs font-sans transition-all">
                    <span className="font-bold text-slate-200">PostgreSQL Instance</span>
                    <span className="font-mono text-emerald-400 font-bold">ONLINE (0 ms delay)</span>
                  </div>

                  <div className="p-3.5 bg-emerald-500/5 border border-emerald-500/15 hover:border-emerald-500/30 rounded-xl flex items-center justify-between text-xs font-sans transition-all">
                    <span className="font-bold text-slate-200">HNSW Vector Indexes</span>
                    <span className="font-mono text-emerald-400 font-bold">STABLE (99.8% precision)</span>
                  </div>

                  <div className="p-3.5 bg-emerald-500/5 border border-emerald-500/15 hover:border-emerald-500/30 rounded-xl flex items-center justify-between text-xs font-sans transition-all">
                    <span className="font-bold text-slate-200">API Gateway Router</span>
                    <span className="font-mono text-emerald-400 font-bold">ONLINE (active fallback)</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Tab 4: Audit Logs */}
          {activeTab === 'users' && (
            <div className="bg-slate-900/40 border border-white/5 backdrop-blur-xl rounded-2xl p-6 shadow-xl space-y-4">
              <span className="font-sans font-extrabold text-sm text-white block pb-2 border-b border-white/5">
                Operator Action Audit Logs
              </span>

              <div className="divide-y divide-white/5">
                {auditLogs.map((log, idx) => (
                  <div key={idx} className="py-3.5 flex items-center justify-between text-xs">
                    <div className="space-y-0.5">
                      <span className="font-sans font-bold text-slate-200 block">{log.user}</span>
                      <span className="font-mono text-[10px] text-slate-500">IP: {log.ip}</span>
                    </div>
                    
                    <div className="text-right space-y-0.5">
                      <span className="font-sans font-semibold text-slate-300 block">{log.action}</span>
                      <span className="font-mono text-[9px] text-slate-450 block">{log.time}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>

        {/* Right Admin Stats Panel (4 cols) */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-slate-900/40 border border-white/5 backdrop-blur-xl rounded-3xl p-6 shadow-xl space-y-6">
            <span className="font-mono text-[10px] text-red-400 uppercase tracking-widest font-bold block">
              Enterprise Summary
            </span>

            <div className="space-y-4 font-sans text-xs">
              <div className="flex justify-between">
                <span className="text-slate-400">Total Ingested Files</span>
                <span className="font-bold font-mono">142</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Total Graph Mappings</span>
                <span className="font-bold font-mono">1,540 nodes</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Active Operators</span>
                <span className="font-bold font-mono">12 online</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Redis Cache Hitrate</span>
                <span className="font-bold font-mono">98.2%</span>
              </div>
            </div>

            <div className="h-[1px] bg-white/5" />

            <div className="p-4 bg-red-500/5 border border-red-500/10 rounded-xl space-y-2">
              <div className="flex gap-2 text-red-400 items-center">
                <AlertTriangle size={14} />
                <span className="font-sans font-bold text-xs uppercase">Security Advisory</span>
              </div>
              <p className="font-sans text-[11px] text-slate-400 leading-normal">
                Admissions and ingest queries are compiled into the vector index dynamically. Verify document copyright before indexing.
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
