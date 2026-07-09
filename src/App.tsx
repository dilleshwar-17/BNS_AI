/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { ActiveTab, ChatMessage } from './types';
import Sidebar from './components/Sidebar';
import WorkspaceView from './components/WorkspaceView';
import DashboardView from './components/DashboardView';
import DeepResearchView from './components/DeepResearchView';
import LegalDraftingView from './components/LegalDraftingView';
import CompareActsView from './components/CompareActsView';
import KnowledgeGraphView from './components/KnowledgeGraphView';
import SettingsHelpView from './components/SettingsHelpView';
import AdminPortalView from './components/AdminPortalView';
import AuthView from './components/AuthView';
import LandingView from './components/LandingView';
import { ShieldCheck, Mail, Info, Sparkles, Scale, BookOpen } from 'lucide-react';

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showLanding, setShowLanding] = useState(true);
  const [userEmail, setUserEmail] = useState('');
  const [activeTab, setActiveTab] = useState<ActiveTab>('workspace');
  const [isAdmin, setIsAdmin] = useState(true); // Default admin role for demonstration purposes
  const [customHistory, setCustomHistory] = useState<ChatMessage[]>([]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  const handleLogin = (email: string) => {
    setUserEmail(email);
    setIsAuthenticated(true);
    setActiveTab('workspace');
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUserEmail('');
    setShowLanding(true);
  };

  const handleAddHistoryItem = (msg: ChatMessage) => {
    setCustomHistory(prev => [msg, ...prev]);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#0F172A] text-slate-100 flex flex-col items-center justify-center font-sans relative overflow-hidden select-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,#1e293b_0%,#0f172a_100%)] pointer-events-none" />
        <div className="relative z-10 flex flex-col items-center gap-6 max-w-sm text-center animate-[fadeIn_0.5s_ease-out]">
          <div className="relative">
            <div className="absolute -inset-1.5 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 opacity-45 blur-lg animate-pulse" />
            <img 
              src="/src/assets/images/bns_ai_icon_1783613389575.jpg" 
              alt="BNS AI Brand Mark" 
              className="w-24 h-24 rounded-2xl border border-white/10 relative z-10 object-cover shadow-2xl"
              referrerPolicy="no-referrer"
            />
          </div>
          <div className="space-y-2">
            <h1 className="font-sans font-black text-2xl tracking-widest text-white uppercase">
              BNS AI
            </h1>
            <p className="font-mono text-[9px] text-sky-400 font-extrabold tracking-widest uppercase">
              Indian Judicial OS • Initializing Neural Core
            </p>
          </div>
          <div className="w-48 h-1 bg-slate-950 rounded-full overflow-hidden mt-2 border border-white/5">
            <div className="h-full bg-gradient-to-r from-blue-500 via-sky-400 to-indigo-500 animate-[loading_1.5s_ease-in-out_infinite] rounded-full w-2/3" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0F172A] text-slate-100 flex flex-col font-sans select-none antialiased relative overflow-hidden">
      {/* Immersive radial gradient background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,#1e293b_0%,#0f172a_100%)] pointer-events-none z-0" />

      {/* Immersive Top Navigation Bar */}
      <header className="w-full bg-slate-950/60 backdrop-blur-xl text-white py-4 px-6 md:px-8 border-b border-white/5 flex items-center justify-between z-30">
        <button
          onClick={() => {
            setIsAuthenticated(false);
            setUserEmail('');
            setShowLanding(true);
          }}
          className="flex items-center gap-2.5 hover:opacity-85 transition-all cursor-pointer text-left focus:outline-none"
          title="Return to Product Landing Page"
        >
          <img 
            src="/src/assets/images/bns_ai_icon_1783613389575.jpg" 
            alt="BNS AI Logo" 
            className="w-7 h-7 rounded-lg border border-blue-500/30 object-cover shadow-[0_0_10px_rgba(59,130,246,0.25)]"
            referrerPolicy="no-referrer"
          />
          <span className="font-sans font-black tracking-tight text-base">BNS AI</span>
          <span className="h-4 w-[1px] bg-slate-850" />
          <span className="font-sans text-[11px] font-bold text-slate-400 tracking-wide uppercase hidden sm:inline">
            Indian Legal Intelligence OS
          </span>
        </button>

        {isAuthenticated && (
          <div className="flex items-center gap-4">
            <span className="font-mono text-[10px] text-sky-400 bg-sky-950/40 border border-sky-900/30 px-3 py-1 rounded-full font-bold hidden md:inline-block shadow-[0_0_15px_rgba(56,189,248,0.15)]">
              Index: 2026-BNS-STABLE
            </span>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)] animate-pulse" />
              <span className="font-sans text-xs text-slate-300 font-semibold max-w-[150px] truncate">
                {userEmail}
              </span>
            </div>
          </div>
        )}
      </header>

      {/* Main Layout Area */}
      <main className={`flex-1 w-full flex flex-col ${isAuthenticated ? 'md:flex-row gap-6 p-4 md:p-6' : 'p-2 sm:p-4 md:p-6'} relative z-10`}>
        {!isAuthenticated ? (
          showLanding ? (
            <LandingView onEnterPortal={() => setShowLanding(false)} />
          ) : (
            <AuthView onLogin={handleLogin} onBackToLanding={() => setShowLanding(true)} />
          )
        ) : (
          <>
            {/* Sidebar component */}
            <Sidebar
              activeTab={activeTab}
              setActiveTab={setActiveTab}
              isAdmin={isAdmin}
              setIsAdmin={setIsAdmin}
              onLogout={handleLogout}
            />

            {/* Core View Container with smooth page fades */}
            <div className="flex-1 bg-slate-900/40 backdrop-blur-xl border border-white/5 rounded-2xl md:rounded-3xl p-4 sm:p-6 md:p-8 shadow-2xl min-h-[70vh] md:min-h-[78vh] overflow-y-auto scrollbar-thin relative z-10 text-slate-100">
              
              {activeTab === 'workspace' && (
                <WorkspaceView onAddHistoryItem={handleAddHistoryItem} />
              )}

              {activeTab === 'dashboard' && (
                <DashboardView onNavigate={(tab) => setActiveTab(tab)} />
              )}

              {activeTab === 'research' && (
                <DeepResearchView />
              )}

              {activeTab === 'drafting' && (
                <LegalDraftingView />
              )}

              {activeTab === 'compare' && (
                <CompareActsView />
              )}

              {activeTab === 'knowledge-graph' && (
                <KnowledgeGraphView />
              )}

              {activeTab === 'history' && (
                <SettingsHelpView />
              )}

              {activeTab === 'settings' && (
                <SettingsHelpView />
              )}

              {activeTab === 'admin' && isAdmin && (
                <AdminPortalView />
              )}

            </div>
          </>
        )}
      </main>

      {/* Footer - Minimalist containing only requested elements */}
      <footer className="w-full bg-slate-950/60 backdrop-blur-xl border-t border-white/5 text-slate-500 py-6 px-8 text-[11px] tracking-wider uppercase font-semibold mt-auto relative z-10">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <span>BNS AI Legal OS • © 2026 Sovereign Jurisprudence</span>
            <span className="h-3 w-[1px] bg-slate-800 hidden sm:inline" />
            <span className="flex items-center gap-1.5 text-emerald-400 font-bold tracking-widest text-[10px]">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
              Neural Engine Active
            </span>
          </div>
          
          <div className="flex items-center gap-6 text-slate-400">
            <button
              onClick={() => alert('BNS AI: Enterprise-grade Artificial Intelligence Operating System engineered to parse Bharatiya Nyaya Sanhita, BNSS, and BSA codifications in Indian Jurisprudence.')}
              className="hover:text-white transition-colors cursor-pointer"
            >
              About
            </button>
            <button
              onClick={() => alert('Contact: support@bns-legal.ai | Tel: +91 11 4050 9000 (New Delhi Office)')}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Contact
            </button>
            <span className="text-slate-600 hidden md:inline">v4.0.2 - ENTERPRISE</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
