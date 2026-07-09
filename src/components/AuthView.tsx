/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import {
  Shield,
  Lock,
  Mail,
  User,
  ArrowRight,
  Sparkles,
  HelpCircle
} from 'lucide-react';

interface AuthViewProps {
  onLogin: (email: string) => void;
  onBackToLanding?: () => void;
}

export default function AuthView({ onLogin, onBackToLanding }: AuthViewProps) {
  const [activeTab, setActiveTab] = useState<'login' | 'register' | 'forgot'>('login');
  
  const [email, setEmail] = useState('sriramasita90@gmail.com');
  const [password, setPassword] = useState('password123');
  const [name, setName] = useState('Srirama Sita');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');

    if (activeTab === 'login') {
      if (!email || !password) {
        setErrorMessage('Please fill in all credentials.');
        return;
      }
      onLogin(email);
    } else if (activeTab === 'register') {
      if (!name || !email || !password) {
        setErrorMessage('All registration fields are required.');
        return;
      }
      setSuccessMessage('Account successfully created! You can now log in.');
      setTimeout(() => {
        setActiveTab('login');
        setSuccessMessage('');
      }, 1500);
    } else if (activeTab === 'forgot') {
      if (!email) {
        setErrorMessage('Please provide your email address.');
        return;
      }
      setSuccessMessage('Recovery instruction stream dispatched to your email.');
      setTimeout(() => {
        setActiveTab('login');
        setSuccessMessage('');
      }, 3000);
    }
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center p-4 relative overflow-hidden">
      {/* Decorative background glows */}
      <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-blue-500/10 rounded-full filter blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-sky-500/10 rounded-full filter blur-[100px] pointer-events-none" />

      {/* Auth Card Container */}
      <div className="w-full max-w-md bg-slate-900/40 backdrop-blur-xl border border-white/5 rounded-3xl p-8 shadow-2xl relative z-10 space-y-6 text-slate-100">
        
        {/* Logo identity */}
        <div className="flex flex-col items-center text-center gap-2">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-blue-600 via-cyan-500 to-indigo-500 flex items-center justify-center shadow-[0_0_20px_rgba(37,99,235,0.4)]">
            <Shield size={24} className="text-white" />
          </div>
          <div>
            <h2 className="font-sans font-black text-xl text-white tracking-tight">
              BNS AI Access Portal
            </h2>
            <p className="font-sans text-xs text-slate-400 font-medium">
              Enterprise Judicial Intelligence for Indian Law
            </p>
          </div>
        </div>

        {/* Toggle sub-tabs */}
        {activeTab !== 'forgot' && (
          <div className="grid grid-cols-2 gap-1 bg-slate-950/60 border border-white/5 rounded-xl p-1">
            <button
              type="button"
              onClick={() => {
                setActiveTab('login');
                setErrorMessage('');
              }}
              className={`py-2 text-xs font-sans font-bold rounded-lg transition-all cursor-pointer ${
                activeTab === 'login' ? 'bg-slate-900 text-white shadow-[0_0_15px_rgba(37,99,235,0.25)] border border-white/5' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Sign In
            </button>
            <button
              type="button"
              onClick={() => {
                setActiveTab('register');
                setErrorMessage('');
              }}
              className={`py-2 text-xs font-sans font-bold rounded-lg transition-all cursor-pointer ${
                activeTab === 'register' ? 'bg-slate-900 text-white shadow-[0_0_15px_rgba(37,99,235,0.25)] border border-white/5' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Register
            </button>
          </div>
        )}

        {/* Status Alerts */}
        {errorMessage && (
          <div className="p-3.5 bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-sans font-semibold rounded-xl text-center shadow-[0_0_15px_rgba(239,68,68,0.1)]">
            {errorMessage}
          </div>
        )}
        {successMessage && (
          <div className="p-3.5 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-sans font-semibold rounded-xl text-center shadow-[0_0_15px_rgba(16,185,129,0.1)]">
            {successMessage}
          </div>
        )}

        {/* Auth form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          
          {/* Register: Name input */}
          {activeTab === 'register' && (
            <div className="space-y-1">
              <label className="font-sans text-xs text-slate-400 font-semibold">Full Legal Name</label>
              <div className="relative">
                <User size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  required
                  value={name}
                  onChange={e => setName(e.target.value)}
                  placeholder="Enter counsel or officer name..."
                  className="w-full bg-slate-950/40 border border-white/5 hover:border-white/10 focus:border-blue-500 rounded-xl pl-10 pr-4 py-2.5 font-sans text-xs text-slate-200 placeholder:text-slate-500 outline-none transition-all"
                />
              </div>
            </div>
          )}

          {/* Email input */}
          <div className="space-y-1">
            <label className="font-sans text-xs text-slate-400 font-semibold">User Email Address</label>
            <div className="relative">
              <Mail size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="email"
                required
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="counsel@highcourt.in"
                className="w-full bg-slate-950/40 border border-white/5 hover:border-white/10 focus:border-blue-500 rounded-xl pl-10 pr-4 py-2.5 font-sans text-xs text-slate-200 placeholder:text-slate-500 outline-none transition-all"
              />
            </div>
          </div>

          {/* Login/Register: Password input */}
          {activeTab !== 'forgot' && (
            <div className="space-y-1">
              <div className="flex justify-between items-center">
                <label className="font-sans text-xs text-slate-400 font-semibold">Secure Key / Password</label>
                {activeTab === 'login' && (
                  <button
                    type="button"
                    onClick={() => setActiveTab('forgot')}
                    className="font-sans text-[11px] text-blue-400 hover:text-blue-300 hover:underline cursor-pointer"
                  >
                    Forgot Password?
                  </button>
                )}
              </div>
              <div className="relative">
                <Lock size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-slate-950/40 border border-white/5 hover:border-white/10 focus:border-blue-500 rounded-xl pl-10 pr-4 py-2.5 font-sans text-xs text-slate-200 placeholder:text-slate-500 outline-none transition-all"
                />
              </div>
            </div>
          )}

          {/* Submit button */}
          <button
            type="submit"
            className="w-full py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-sans font-bold flex items-center justify-center gap-2 cursor-pointer transition-all shadow-md shadow-blue-500/10 hover:shadow-blue-500/25 mt-6"
          >
            <span>
              {activeTab === 'login' ? 'Authenticate Account' :
               activeTab === 'register' ? 'Register Counsel Account' : 'Dispatch Recovery Instructions'}
            </span>
            <ArrowRight size={14} />
          </button>

        </form>

        {/* Back to login trigger for Forgot tab */}
        {activeTab === 'forgot' && (
          <div className="text-center">
            <button
              onClick={() => {
                setActiveTab('login');
                setErrorMessage('');
                setSuccessMessage('');
              }}
              className="font-sans text-xs text-slate-400 hover:text-slate-200 font-bold"
            >
              ← Back to Sign In
            </button>
          </div>
        )}

        {/* Back to product overview/landing page link */}
        {onBackToLanding && (
          <div className="text-center pt-4 border-t border-white/5">
            <button
              type="button"
              onClick={onBackToLanding}
              className="font-sans text-[11px] text-slate-500 hover:text-slate-300 font-bold tracking-wide uppercase cursor-pointer transition-colors"
            >
              ← Back to Product Overview
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
