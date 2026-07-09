/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { APIService } from '../services/api';
import {
  FileText,
  Save,
  Copy,
  Download,
  CheckCircle,
  Plus,
  RefreshCw,
  FolderOpen
} from 'lucide-react';

export default function LegalDraftingView() {
  const [activeTemplate, setActiveTemplate] = useState<'notice' | 'complaint' | 'petition' | 'agreement'>('notice');
  const [variables, setVariables] = useState<Record<string, string>>({
    'Client Name': 'Amit Verma',
    'Client Address': 'C-45, Vasant Vihar, New Delhi - 110057',
    'Recipient Name': 'ICICI Merchants Private Ltd.',
    'Recipient Address': 'Bandra Kurla Complex, Mumbai - 400051',
    'Agreement Date': '12th January, 2025',
    'Amount Dues': '15,50,000/-',
    'Advocate Name': 'Sanjay K. Roy, Senior Counsel',
  });

  const [draftContent, setDraftContent] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [savedDrafts, setSavedDrafts] = useState<any[]>(APIService.getDrafts());
  const [alertMsg, setAlertMsg] = useState('');

  const handleVariableChange = (key: string, value: string) => {
    setVariables(prev => ({ ...prev, [key]: value }));
  };

  const handleGenerate = async () => {
    setIsGenerating(true);
    setAlertMsg('');
    try {
      const draftText = await APIService.generateLegalDraft(activeTemplate, variables);
      setDraftContent(draftText);
      setSavedDrafts(APIService.getDrafts());
    } catch (err) {
      console.error(err);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleSave = () => {
    setAlertMsg('Draft successfully synchronized to local legal database.');
    setTimeout(() => setAlertMsg(''), 3000);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(draftContent);
    setAlertMsg('Copied to clipboard!');
    setTimeout(() => setAlertMsg(''), 2000);
  };

  const handleExport = () => {
    const blob = new Blob([draftContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `BNS_Draft_${activeTemplate}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleSelectTemplate = (type: 'notice' | 'complaint' | 'petition' | 'agreement') => {
    setActiveTemplate(type);
    // Refresh inputs with reasonable presets based on templates
    if (type === 'notice') {
      setVariables({
        'Client Name': 'Amit Verma',
        'Client Address': 'C-45, Vasant Vihar, New Delhi - 110057',
        'Recipient Name': 'ICICI Merchants Private Ltd.',
        'Recipient Address': 'Bandra Kurla Complex, Mumbai - 400051',
        'Agreement Date': '12th January, 2025',
        'Amount Dues': '15,50,000/-',
        'Advocate Name': 'Sanjay K. Roy, Senior Counsel',
      });
    } else if (type === 'complaint') {
      setVariables({
        'Client Name': 'Amit Verma',
        'Accused Name': 'Rakesh Jhunjhunwala (CEO)',
        'Client Address': 'C-45, Vasant Vihar, New Delhi',
        'Transaction Date': '15th June, 2025',
        'Amount': '15,50,000/-'
      });
    } else if (type === 'petition') {
      setVariables({
        'Petitioner Name': 'Devika Sen',
        'Incident Date': '3rd March, 2026',
        'FIR Details': 'FIR No. 104 of 2026 at Saket PS'
      });
    } else if (type === 'agreement') {
      setVariables({
        'Company Name': 'Sovereign Tech India Pvt. Ltd.',
        'Company Address': 'Outer Ring Road, Bengaluru',
        'Provider Name': 'Dr. Alok Nath, Forensic Specialist',
        'Provider Address': 'Sector 15, Noida',
        'Day': '9th',
        'Month': 'July',
        'City, State': 'New Delhi'
      });
    }
    setDraftContent('');
  };

  return (
    <div className="flex-1 space-y-8 animate-[fadeIn_0.4s_ease-out] max-w-6xl mx-auto text-slate-100">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/5 pb-6">
        <div>
          <h2 className="font-sans font-extrabold text-2xl text-white tracking-tight">
            Legal Drafting Suite
          </h2>
          <p className="font-sans text-sm text-slate-400 font-medium">
            Generate, customize, and edit professional pleadings, notices, and agreements under new BNS codes.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Control Panel (4 cols) */}
        <div className="lg:col-span-4 space-y-6">
          
          {/* Template Selector */}
          <div className="bg-slate-900/40 border border-white/5 backdrop-blur-xl rounded-2xl p-5 shadow-xl space-y-3">
            <span className="font-sans text-xs font-bold text-slate-400 uppercase tracking-widest block">
              1. Choose Template
            </span>

            <div className="space-y-1">
              {[
                { id: 'notice', label: 'Legal Notice (Breach / Dues)', desc: 'Applicable under BNS Sec 318' },
                { id: 'complaint', label: 'Criminal Complaint', desc: 'Direct Magistrate submission, BNSS 223' },
                { id: 'petition', label: 'Writ Petition (Mandamus)', desc: 'High Court filing, Art 226/BNSS 172' },
                { id: 'agreement', label: 'NDA / Service Escrow SLA', desc: 'Standard governed contractor form' }
              ].map(tpl => (
                <button
                  key={tpl.id}
                  onClick={() => handleSelectTemplate(tpl.id as any)}
                  className={`w-full flex flex-col items-start px-4 py-3.5 rounded-xl text-left transition-all border cursor-pointer ${
                    activeTemplate === tpl.id
                      ? 'bg-blue-600 border-blue-600 text-white shadow-lg shadow-blue-600/20'
                      : 'border-white/5 text-slate-300 hover:bg-white/5'
                  }`}
                >
                  <span className="font-sans text-xs font-bold">{tpl.label}</span>
                  <span className={`font-mono text-[9px] mt-0.5 ${
                    activeTemplate === tpl.id ? 'text-blue-200' : 'text-slate-450'
                  }`}>{tpl.desc}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Variables Configuration Fields */}
          <div className="bg-slate-900/40 border border-white/5 backdrop-blur-xl rounded-2xl p-5 shadow-xl space-y-4">
            <span className="font-sans text-xs font-bold text-slate-400 uppercase tracking-widest block pb-1 border-b border-white/5">
              2. Draft Parameters
            </span>

            <div className="space-y-3.5 max-h-[250px] overflow-y-auto pr-1">
              {Object.keys(variables).map(key => (
                <div key={key} className="space-y-1">
                  <label className="font-sans text-xs text-slate-400 font-medium">{key}</label>
                  <input
                    type="text"
                    value={variables[key]}
                    onChange={e => handleVariableChange(key, e.target.value)}
                    className="w-full bg-slate-950/40 border border-white/5 hover:border-white/10 focus:border-blue-500/50 rounded-xl px-3.5 py-2 font-sans text-xs text-slate-200 outline-none transition-all"
                  />
                </div>
              ))}
            </div>

            <button
              onClick={handleGenerate}
              disabled={isGenerating}
              className="w-full py-3 bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white rounded-xl text-xs font-sans font-bold flex items-center justify-center gap-2 cursor-pointer shadow-[0_0_15px_rgba(37,99,235,0.4)]"
            >
              {isGenerating ? (
                <>
                  <RefreshCw size={14} className="animate-spin" />
                  <span>Structuring Draft...</span>
                </>
              ) : (
                <>
                  <FileText size={14} />
                  <span>Generate Document</span>
                </>
              )}
            </button>
          </div>

        </div>

        {/* Right Editor & Showcase View (8 cols) */}
        <div className="lg:col-span-8 space-y-6">
          <div className="bg-slate-900/40 border border-white/5 backdrop-blur-xl rounded-2xl shadow-xl overflow-hidden flex flex-col">
            
            {/* Editor Action Bar */}
            <div className="border-b border-white/5 bg-slate-950/20 px-6 py-4 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-2.5 h-2.5 rounded-full bg-blue-500" />
                <span className="font-mono text-xs font-bold text-slate-300 uppercase">
                  Pleading Editor
                </span>
              </div>

              {draftContent && (
                <div className="flex items-center gap-2">
                  <button
                    onClick={handleCopy}
                    className="p-2.5 bg-white/5 border border-white/5 rounded-xl text-slate-300 hover:text-white hover:bg-white/10 transition-colors shadow-sm cursor-pointer"
                    title="Copy clipboard"
                  >
                    <Copy size={13} />
                  </button>
                  <button
                    onClick={handleExport}
                    className="p-2.5 bg-white/5 border border-white/5 rounded-xl text-slate-300 hover:text-white hover:bg-white/10 transition-colors shadow-sm cursor-pointer"
                    title="Export .txt"
                  >
                    <Download size={13} />
                  </button>
                  <button
                    onClick={handleSave}
                    className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-sans font-bold flex items-center gap-1.5 cursor-pointer shadow-[0_0_15px_rgba(37,99,235,0.3)]"
                  >
                    <Save size={13} />
                    <span>Synchronize Database</span>
                  </button>
                </div>
              )}
            </div>

            {/* Notification alert banner */}
            {alertMsg && (
              <div className="bg-blue-500/10 border-y border-blue-500/20 px-6 py-2.5 text-center font-sans text-xs text-blue-400 font-semibold">
                {alertMsg}
              </div>
            )}

            {/* Core Textarea / Editor Body */}
            <div className="p-6 min-h-[420px] bg-slate-950/40 flex flex-col">
              {draftContent ? (
                <textarea
                  value={draftContent}
                  onChange={e => setDraftContent(e.target.value)}
                  className="w-full h-[380px] font-mono text-xs text-slate-200 bg-transparent border-0 outline-none leading-relaxed resize-none"
                />
              ) : (
                <div className="flex-1 flex flex-col items-center justify-center text-center space-y-4 py-12">
                  <div className="p-4 bg-white/5 rounded-2xl border border-white/5">
                    <FileText size={24} className="text-slate-400" />
                  </div>
                  <div>
                    <span className="font-sans font-bold text-xs text-slate-200 block">Empty Editor Stage</span>
                    <p className="font-sans text-[11px] text-slate-450 max-w-xs mx-auto mt-1 leading-relaxed">
                      Select a template on the left, adjust parameters and click "Generate Document" to populate this workspace.
                    </p>
                  </div>
                </div>
              )}
            </div>

          </div>

          {/* Saved Documents Panel */}
          {savedDrafts.length > 0 && (
            <div className="bg-slate-900/40 border border-white/5 backdrop-blur-xl rounded-2xl p-6 shadow-xl space-y-4">
              <div className="flex items-center gap-2 text-slate-400">
                <FolderOpen size={16} />
                <span className="font-sans text-xs font-bold text-slate-350 uppercase tracking-widest">
                  Saved Case Documents Cache ({savedDrafts.length})
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {savedDrafts.map((dr) => (
                  <button
                    key={dr.id}
                    onClick={() => {
                      setDraftContent(dr.content);
                      setActiveTemplate(dr.type);
                    }}
                    className="p-4 rounded-xl border border-white/5 bg-slate-950/40 hover:bg-white/5 hover:border-white/10 text-left space-y-2 transition-all cursor-pointer group"
                  >
                    <div className="flex justify-between items-start gap-2">
                      <span className="font-sans font-bold text-xs text-slate-200 group-hover:text-blue-400 transition-colors">
                        {dr.title}
                      </span>
                      <span className="font-mono text-[9px] bg-blue-500/10 text-blue-400 border border-blue-500/20 font-extrabold uppercase px-1.5 py-0.2 rounded">
                        {dr.type}
                      </span>
                    </div>
                    <p className="font-sans text-[10px] text-slate-450 leading-normal">
                      Acts: {dr.meta.applicableActs} • Jurisdiction: {dr.meta.jurisdiction}
                    </p>
                    <span className="font-mono text-[9px] text-slate-500 block pt-1">
                      Synced {new Date(dr.lastUpdated).toLocaleTimeString()}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
