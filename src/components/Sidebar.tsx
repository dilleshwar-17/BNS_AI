/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { ActiveTab } from '../types';
import {
  Sparkles,
  LayoutDashboard,
  MessageSquarePlus,
  Compass,
  FileText,
  GitCompare,
  Network,
  History as HistoryIcon,
  Settings,
  HelpCircle,
  LogOut,
  ChevronLeft,
  ChevronRight,
  ShieldAlert
} from 'lucide-react';

interface SidebarProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  isAdmin: boolean;
  setIsAdmin: (val: boolean) => void;
  onLogout: () => void;
}

export default function Sidebar({
  activeTab,
  setActiveTab,
  isAdmin,
  setIsAdmin,
  onLogout
}: SidebarProps) {
  const [collapsed, setCollapsed] = useState(false);

  const menuItems = [
    { id: 'workspace', label: 'AI Workspace', icon: Sparkles },
    { id: 'dashboard', label: 'Command Center', icon: LayoutDashboard },
    { id: 'research', label: 'Deep Research', icon: Compass },
    { id: 'drafting', label: 'Legal Drafting', icon: FileText },
    { id: 'compare', label: 'Compare Acts', icon: GitCompare },
    { id: 'knowledge-graph', label: 'Knowledge Graph', icon: Network },
    { id: 'history', label: 'History & Bookmarks', icon: HistoryIcon },
    { id: 'settings', label: 'Settings & Help', icon: Settings },
  ] as const;

  return (
    <>
      {/* Mobile Navigation Strip (Visible on mobile only) */}
      <div className="md:hidden w-full flex flex-col gap-2 mb-2">
        <div className="w-full flex items-center gap-1.5 overflow-x-auto scrollbar-none py-2 px-3 bg-slate-950/60 backdrop-blur-xl border border-white/5 rounded-2xl shadow-xl">
          {menuItems.map(item => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-left transition-all duration-200 shrink-0 cursor-pointer ${
                  isActive
                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30'
                    : 'text-slate-400 hover:text-white hover:bg-white/10'
                }`}
              >
                <Icon size={14} className={isActive ? 'text-white animate-pulse' : 'text-slate-400'} />
                <span className="font-sans text-xs font-semibold whitespace-nowrap">{item.label}</span>
              </button>
            );
          })}
          
          {/* Admin Portal in Mobile List */}
          {isAdmin && (
            <button
              onClick={() => setActiveTab('admin')}
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-left transition-all duration-200 shrink-0 cursor-pointer ${
                activeTab === 'admin'
                  ? 'bg-red-600 text-white shadow-lg shadow-red-600/30'
                  : 'text-red-400 hover:text-red-300 hover:bg-red-950/20 border border-dashed border-red-900/30'
              }`}
            >
              <ShieldAlert size={14} />
              <span className="font-sans text-xs font-semibold whitespace-nowrap">Admin Portal</span>
            </button>
          )}

          {/* Logout in Mobile List */}
          <button
            onClick={onLogout}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-left text-slate-400 hover:text-rose-400 hover:bg-rose-950/20 transition-all duration-200 shrink-0 cursor-pointer"
          >
            <LogOut size={14} />
            <span className="font-sans text-xs font-semibold whitespace-nowrap">Log Out</span>
          </button>
        </div>
      </div>

      {/* Desktop Sidebar (Visible on desktop only) */}
      <div
        className={`hidden md:flex h-[94vh] bg-slate-950/40 backdrop-blur-xl border border-white/5 rounded-3xl flex-col justify-between py-6 transition-all duration-300 shadow-2xl relative ${
          collapsed ? 'w-20' : 'w-64'
        }`}
      >
        {/* Collapse Toggle Handle */}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="absolute -right-3 top-8 w-6 h-6 rounded-full bg-slate-900 hover:bg-slate-800 border border-white/5 text-slate-300 flex items-center justify-center cursor-pointer shadow-md transition-colors z-30"
        >
          {collapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
        </button>

        {/* Top Identity / Brand */}
        <div>
          <div className={`px-6 flex items-center gap-3 ${collapsed ? 'justify-center' : 'justify-start'}`}>
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-sky-400 flex items-center justify-center shadow-lg shadow-blue-500/20 relative overflow-hidden group">
              <span className="font-sans font-bold text-lg text-white select-none">B</span>
              <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
            {!collapsed && (
              <div className="flex flex-col">
                <span className="font-sans font-semibold tracking-wider text-sm text-white">BNS AI</span>
                <span className="font-mono text-[9px] text-sky-400 tracking-widest uppercase">Operating System</span>
              </div>
            )}
          </div>

          {/* Navigation Menu */}
          <nav className="mt-8 px-3 space-y-1">
            {menuItems.map(item => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-all duration-200 group relative cursor-pointer ${
                    isActive
                      ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30'
                      : 'text-slate-400 hover:text-white hover:bg-white/10'
                  }`}
                >
                  <Icon size={18} className={isActive ? 'text-white animate-pulse' : 'text-slate-400 group-hover:text-white'} />
                  {!collapsed && <span className="font-sans text-sm font-medium">{item.label}</span>}
                  
                  {/* Collapsed Tooltip */}
                  {collapsed && (
                    <div className="absolute left-24 bg-slate-950/95 border border-white/5 text-white text-xs px-3 py-2 rounded-lg opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-150 shadow-xl whitespace-nowrap z-50">
                      {item.label}
                    </div>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Bottom Toggles & Roles */}
        <div className="px-3 space-y-2">
          {/* Admin Portal Toggle (For demo exploration of requested admin features) */}
          <div className="border-t border-white/5 pt-4">
            <button
              onClick={() => {
                if (isAdmin) {
                  setActiveTab('admin');
                } else {
                  // Elevate role for demo purposes and go to admin tab
                  setIsAdmin(true);
                  setActiveTab('admin');
                }
              }}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-all duration-200 group relative cursor-pointer ${
                activeTab === 'admin'
                  ? 'bg-red-600/95 text-white shadow-lg shadow-red-600/30'
                  : isAdmin
                  ? 'text-red-400 hover:text-red-300 hover:bg-red-950/20 border border-dashed border-red-900/30'
                  : 'text-slate-500 hover:text-slate-400 hover:bg-white/5'
              }`}
            >
              <ShieldAlert size={18} className={activeTab === 'admin' ? 'text-white' : isAdmin ? 'text-red-400' : 'text-slate-500'} />
              {!collapsed && (
                <div className="flex flex-col">
                  <span className="font-sans text-sm font-semibold">Admin Portal</span>
                  <span className="font-mono text-[9px] text-slate-500">Enterprise Access</span>
                </div>
              )}
              
              {collapsed && (
                <div className="absolute left-24 bg-slate-950/95 border border-white/5 text-white text-xs px-3 py-2 rounded-lg opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-150 shadow-xl whitespace-nowrap z-50">
                  Admin Portal (Enterprise)
                </div>
              )}
            </button>
          </div>

          {/* Logout Control */}
          <button
            onClick={onLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left text-slate-400 hover:text-rose-400 hover:bg-rose-950/20 transition-all duration-200 group relative cursor-pointer"
          >
            <LogOut size={18} className="text-slate-400 group-hover:text-rose-400" />
            {!collapsed && <span className="font-sans text-sm font-medium">Log out</span>}

            {collapsed && (
              <div className="absolute left-24 bg-slate-950/95 border border-white/5 text-rose-400 text-xs px-3 py-2 rounded-lg opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-150 shadow-xl whitespace-nowrap z-50">
                Sign Out
              </div>
            )}
          </button>
        </div>
      </div>
    </>
  );
}
