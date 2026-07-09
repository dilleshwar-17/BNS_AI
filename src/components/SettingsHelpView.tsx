/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import {
  Settings,
  HelpCircle,
  Star,
  User,
  Shield,
  BookOpen,
  Mail,
  MapPin,
  ExternalLink
} from 'lucide-react';

export default function SettingsHelpView() {
  const [activeSubTab, setActiveSubTab] = useState<'profile' | 'bookmarks' | 'help'>('bookmarks');
  
  const savedBookmarks = [
    { title: 'BNS Section 103(2) - Mob Lynching Punishment', code: 'BNS 2023', relevance: 'Governs group murder based on community hate.' },
    { title: 'BSA Section 63 - Electronic Records Certificate', code: 'BSA 2023', relevance: 'Specifies integrity certification criteria for digital logs.' },
    { title: 'BNSS Section 187 - Remand tranche limits', code: 'BNSS 2023', relevance: 'Allows police custody to be requested in intermittent segments.' }
  ];

  return (
    <div className="flex-1 space-y-8 animate-[fadeIn_0.4s_ease-out] max-w-5xl mx-auto text-slate-100">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/5 pb-6">
        <div>
          <h2 className="font-sans font-extrabold text-2xl text-white tracking-tight">
            Configuration & Knowledge Base
          </h2>
          <p className="font-sans text-sm text-slate-400 font-medium">
            Manage your bookmarked statutory indexes, edit profile details, or consult help materials.
          </p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-white/5 pb-px gap-6">
        {[
          { id: 'bookmarks', label: 'Bookmarked Sections', icon: Star },
          { id: 'profile', label: 'Profile Settings', icon: User },
          { id: 'help', label: 'Help Center & Documentation', icon: HelpCircle }
        ].map(tb => {
          const Icon = tb.icon;
          const isSelected = activeSubTab === tb.id;
          return (
            <button
              key={tb.id}
              onClick={() => setActiveSubTab(tb.id as any)}
              className={`pb-4 font-sans text-xs font-bold uppercase tracking-wider flex items-center gap-2 transition-all relative border-b-2 cursor-pointer ${
                isSelected ? 'border-blue-500 text-white' : 'border-transparent text-slate-400 hover:text-slate-300'
              }`}
            >
              <Icon size={14} />
              <span>{tb.label}</span>
            </button>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Main Side (8 cols) */}
        <div className="lg:col-span-8 space-y-6">

          {/* Bookmarks */}
          {activeSubTab === 'bookmarks' && (
            <div className="bg-slate-900/40 border border-white/5 backdrop-blur-xl rounded-2xl p-6 shadow-xl space-y-4">
              <span className="font-sans font-bold text-sm text-white tracking-tight block pb-2 border-b border-white/5">
                Active Statutory Bookmarks
              </span>

              <div className="space-y-3">
                {savedBookmarks.map((bk, bix) => (
                  <div key={bix} className="p-4 rounded-xl border border-white/5 bg-slate-950/40 hover:bg-white/5 transition-colors flex justify-between items-start gap-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-sans font-bold text-xs text-slate-200">{bk.title}</span>
                        <span className="font-mono text-[9px] bg-blue-500/10 text-blue-400 border border-blue-500/20 font-extrabold uppercase px-1.5 py-0.2 rounded">
                          {bk.code}
                        </span>
                      </div>
                      <p className="font-sans text-[11px] text-slate-400 leading-normal">
                        {bk.relevance}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Profile */}
          {activeSubTab === 'profile' && (
            <div className="bg-slate-900/40 border border-white/5 backdrop-blur-xl rounded-2xl p-6 shadow-xl space-y-5">
              <span className="font-sans font-bold text-sm text-white tracking-tight block pb-2 border-b border-white/5">
                Personal Operator Credentials
              </span>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="font-sans text-xs text-slate-400 font-semibold">User Email ID</label>
                  <input
                    type="text"
                    disabled
                    value="sriramasita90@gmail.com"
                    className="w-full bg-slate-950/40 border border-white/5 rounded-xl px-4 py-2.5 font-sans text-xs text-slate-400 outline-none cursor-not-allowed"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="font-sans text-xs text-slate-400 font-semibold">Account Role</label>
                  <input
                    type="text"
                    disabled
                    value="Senior Law Counsel / Admin"
                    className="w-full bg-slate-950/40 border border-white/5 rounded-xl px-4 py-2.5 font-sans text-xs text-slate-400 outline-none cursor-not-allowed"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Help Center */}
          {activeSubTab === 'help' && (
            <div className="space-y-6">
              
              {/* FAQ Accordion */}
              <div className="bg-slate-900/40 border border-white/5 backdrop-blur-xl rounded-2xl p-6 shadow-xl space-y-4">
                <span className="font-sans font-bold text-sm text-white tracking-tight block pb-2 border-b border-white/5">
                  Frequently Consulted Questions (FAQ)
                </span>

                <div className="space-y-4">
                  <div className="space-y-1">
                    <span className="font-sans font-bold text-xs text-slate-200 block">How are Indian Penal Code sections mapped?</span>
                    <p className="font-sans text-xs text-slate-400 leading-relaxed">
                      BNS AI features a built-in semantic embedding model that maps previous IPC/CrPC/IEA elements with their modern statutory equivalents (e.g. BNS Sec 318, BNSS Sec 187, BSA Sec 63) side-by-side automatically during your conversations.
                    </p>
                  </div>

                  <div className="space-y-1">
                    <span className="font-sans font-bold text-xs text-slate-200 block">Is electronic evidence certification compliant?</span>
                    <p className="font-sans text-xs text-slate-400 leading-relaxed">
                      Yes. The Legal Drafting module generates templates matching BSA Section 63 Schedule declarations for immediate presentation in judicial magistrates or high courts.
                    </p>
                  </div>
                </div>
              </div>

            </div>
          )}

        </div>

        {/* Right Info Sidebar (4 cols) */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-gradient-to-tr from-slate-900 to-slate-950 text-white rounded-3xl p-6 shadow-xl border border-white/5 space-y-5">
            <span className="font-mono text-[10px] text-sky-400 uppercase tracking-widest font-bold block">
              Contact & About
            </span>

            <div className="space-y-4 font-sans text-xs">
              <p className="text-slate-300 leading-relaxed">
                **BNS AI** is India\'s premier AI-powered legal intelligence system, designed specifically to decode the major statutory transitions of Indian Law.
              </p>
              
              <div className="h-[1px] bg-white/5" />

              <div className="space-y-3 text-slate-400">
                <div className="flex gap-2.5 items-center">
                  <Mail size={13} className="text-sky-400 shrink-0" />
                  <span>support@bns-legal.ai</span>
                </div>
                <div className="flex gap-2.5 items-center">
                  <MapPin size={13} className="text-sky-400 shrink-0" />
                  <span>Outer Ring Road, New Delhi, India</span>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
