/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useRef, useEffect } from 'react';
import { OrbState, ChatMessage } from '../types';
import { APIService } from '../services/api';
import { getButtonStyle, getInputStyle, getCardStyle, componentStyles } from '../styles/componentStyles';
import Orb from './Orb';
import StreamingText from './StreamingText';
import {
  Mic,
  Send,
  Volume2,
  VolumeX,
  Copy,
  RotateCw,
  Download,
  ThumbsUp,
  ThumbsDown,
  ChevronRight,
  ShieldCheck,
  Calendar,
  Layers,
  ArrowRight,
  X,
  Settings as SettingsIcon,
  Activity
} from 'lucide-react';

interface WorkspaceViewProps {
  onAddHistoryItem: (msg: ChatMessage) => void;
}

export default function WorkspaceView({ onAddHistoryItem }: WorkspaceViewProps) {
  const [orbState, setOrbState] = useState<OrbState>('idle');
  const [inputValue, setInputValue] = useState('');
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);
  const [streamingMessageId, setStreamingMessageId] = useState<string | null>(null);
  const [isVoiceMode, setIsVoiceMode] = useState(false);
  const [voiceDuration, setVoiceDuration] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [speakerEnabled, setSpeakerEnabled] = useState(true);
  const [simulatedTranscript, setSimulatedTranscript] = useState('');
  const [ambientNoiseLevel, setAmbientNoiseLevel] = useState(12);

  const [activeVoiceSettings, setActiveVoiceSettings] = useState(false);
  const [voiceGender, setVoiceGender] = useState<'male' | 'female'>('female');

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const voiceTimerRef = useRef<any>(null);

  // Auto-scroll chat history
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatHistory, orbState]);

  // Voice timer simulation
  useEffect(() => {
    if (isVoiceMode && orbState === 'listening') {
      voiceTimerRef.current = setInterval(() => {
        setVoiceDuration(prev => prev + 1);
        setAmbientNoiseLevel(Math.floor(8 + Math.random() * 20));
      }, 1000);
    } else {
      if (voiceTimerRef.current) {
        clearInterval(voiceTimerRef.current);
      }
    }
    return () => {
      if (voiceTimerRef.current) clearInterval(voiceTimerRef.current);
    };
  }, [isVoiceMode, orbState]);

  // Submit standard text query
  const handleSend = async (text: string) => {
    if (!text.trim()) return;

    // 1. Add User message
    const userMsg: ChatMessage = {
      id: Math.random().toString(36).substring(7),
      sender: 'user',
      text,
      timestamp: new Date()
    };
    
    setChatHistory(prev => [...prev, userMsg]);
    onAddHistoryItem(userMsg);
    setInputValue('');

    // 2. State transition to thinking
    setOrbState('thinking');

    // 3. Simulated processing state
    setTimeout(() => {
      setOrbState('processing');
    }, 1500);

    try {
      const response = await APIService.askQuestion(text);
      
      // 4. State transition to speaking
      setOrbState('speaking');
      
      setStreamingMessageId(response.id);
      setChatHistory(prev => [...prev, response]);
      onAddHistoryItem(response);

    } catch (err) {
      setOrbState('error');
      setTimeout(() => setOrbState('idle'), 3000);
    }
  };

  // Trigger voice simulation
  const handleStartVoice = () => {
    setIsVoiceMode(true);
    setOrbState('listening');
    setVoiceDuration(0);
    setSimulatedTranscript('Listening to legal counsel voice cues...');
    
    // Simulate user speaking after 4 seconds
    setTimeout(() => {
      setSimulatedTranscript('What is Section 69 of BNS regarding false promises of marriage?');
      setOrbState('processing');

      setTimeout(async () => {
        setOrbState('speaking');
        setSimulatedTranscript('BNS Section 69 penalizes sexual intercourse on a false promise of marriage, carrying up to ten years imprisonment.');
        
        // Finalize voice session after speech finishes
        setTimeout(() => {
          setOrbState('completed');
          setTimeout(() => {
            setIsVoiceMode(false);
            setOrbState('idle');
            // Inject the resulting query into main chat view
            handleSend("Explain Bharatiya Nyaya Sanhita Section 69");
          }, 1500);
        }, 5000);
      }, 2000);

    }, 4000);
  };

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const handleDownload = (msg: ChatMessage) => {
    const blob = new Blob([msg.text], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `BNS_AI_Response_${msg.id}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const isGenerating = orbState === 'thinking' || orbState === 'processing' || orbState === 'speaking' || streamingMessageId !== null;

  return (
    <div className="flex-1 w-full flex flex-col items-center justify-between min-h-[65vh] md:min-h-[72vh] relative max-w-4xl mx-auto px-2 sm:px-4 py-2">
      {/* Dynamic Voice Mode Overlay Layer */}
      {isVoiceMode && (
        <div className="absolute inset-0 bg-slate-950/90 backdrop-blur-2xl rounded-3xl z-40 flex flex-col items-center justify-between p-6 md:p-12 text-white transition-all duration-500 border border-white/5 shadow-2xl">
          {/* Header Controls */}
          <div className="w-full flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="flex h-2.5 w-2.5 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-sky-500 animate-pulse"></span>
              </span>
              <span className="font-sans text-xs font-semibold uppercase tracking-wider text-sky-400">
                Voice Mode Activated
              </span>
            </div>

            <div className="flex items-center gap-4">
              <button
                onClick={() => setActiveVoiceSettings(!activeVoiceSettings)}
                className="p-2 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 text-slate-300 transition-colors cursor-pointer"
              >
                <SettingsIcon size={16} />
              </button>
              <button
                onClick={() => {
                  setIsVoiceMode(false);
                  setOrbState('idle');
                }}
                className="p-2 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 text-slate-300 transition-colors cursor-pointer"
              >
                <X size={16} />
              </button>
            </div>
          </div>

          {/* Voice Settings Panel */}
          {activeVoiceSettings && (
            <div className="absolute top-20 right-6 md:right-12 w-64 bg-slate-950/95 border border-white/10 backdrop-blur-xl rounded-xl p-4 z-50 text-left">
              <span className="font-sans text-xs font-bold text-slate-400 uppercase tracking-widest block mb-3">Voice settings</span>
              <div className="space-y-3">
                <div>
                  <label className="font-sans text-xs text-slate-300 mb-1 block">Acoustic Voice Gender</label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => setVoiceGender('female')}
                      className={`py-1 text-xs rounded-lg border font-medium cursor-pointer ${
                        voiceGender === 'female' ? 'bg-blue-600 border-blue-500 text-white' : 'bg-slate-800 border-slate-700 text-slate-400'
                      }`}
                    >
                      BNS-Female
                    </button>
                    <button
                      onClick={() => setVoiceGender('male')}
                      className={`py-1 text-xs rounded-lg border font-medium cursor-pointer ${
                        voiceGender === 'male' ? 'bg-blue-600 border-blue-500 text-white' : 'bg-slate-800 border-slate-700 text-slate-400'
                      }`}
                    >
                      BNS-Male
                    </button>
                  </div>
                </div>
                <div>
                  <label className="font-sans text-xs text-slate-300 mb-1 block">Simulation Engine</label>
                  <span className="font-mono text-[10px] text-sky-400">Neural Synthesis v2.4</span>
                </div>
              </div>
            </div>
          )}

          {/* Big Voice Orb Core */}
          <div className="flex flex-col items-center justify-center gap-6">
            <Orb state={orbState} size={200} />
            
            <div className="flex flex-col items-center gap-1">
              <span className="font-sans text-xs text-slate-400 font-medium">Duration</span>
              <span className="font-mono text-lg font-bold tracking-widest text-slate-200">
                {Math.floor(voiceDuration / 60).toString().padStart(2, '0')}:
                {(voiceDuration % 60).toString().padStart(2, '0')}
              </span>
            </div>
          </div>

          {/* Live Voice Transcript and Speech Waveform */}
          <div className="w-full max-w-xl text-center space-y-4">
            <div className="bg-slate-950/60 border border-white/5 rounded-2xl p-4 min-h-[70px] flex items-center justify-center">
              <p className="font-sans text-slate-200 text-sm italic tracking-wide leading-relaxed">
                "{simulatedTranscript}"
              </p>
            </div>

            {/* Noise meter / indicators */}
            <div className="flex items-center justify-between px-4 py-2.5 bg-slate-950/40 rounded-xl border border-white/5">
              <div className="flex items-center gap-2 text-slate-400">
                <Activity size={14} className="text-sky-400" />
                <span className="font-mono text-xs">Ambient Noise: {ambientNoiseLevel} dB</span>
              </div>
              <div className="flex items-center gap-1">
                {[...Array(6)].map((_, i) => (
                  <div
                    key={i}
                    className="w-1 h-3 rounded-full bg-sky-400 transition-all duration-150"
                    style={{
                      height: `${4 + (ambientNoiseLevel * (i + 1)) % 16}px`,
                      opacity: 0.3 + (i / 6) * 0.7
                    }}
                  />
                ))}
              </div>
            </div>

            {/* Bottom Controls */}
            <div className="flex items-center justify-center gap-4">
              <button
                onClick={() => setIsMuted(!isMuted)}
                className={`p-3 rounded-full border transition-all cursor-pointer ${
                  isMuted ? 'bg-red-600/20 border-red-500 text-red-500' : 'bg-white/5 border-white/5 text-slate-300 hover:bg-white/10'
                }`}
              >
                {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
              </button>

              <button
                onClick={() => {
                  setIsVoiceMode(false);
                  setOrbState('idle');
                }}
                className="px-6 py-2.5 bg-red-600 hover:bg-red-500 text-white rounded-full font-sans font-bold text-xs tracking-wide transition-all shadow-lg shadow-red-600/20 cursor-pointer"
              >
                End Conversation
              </button>

              <button
                onClick={() => setSpeakerEnabled(!speakerEnabled)}
                className={`p-3 rounded-full border transition-all cursor-pointer ${
                  speakerEnabled ? 'bg-blue-600/20 border-blue-500 text-blue-400' : 'bg-white/5 border-white/5 text-slate-400 hover:bg-white/10'
                }`}
              >
                <Mic size={18} />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Primary chat layout conditional state */}
      {chatHistory.length === 0 ? (
        // 1. First-turn immersive center landing
        <div className="w-full flex-1 flex flex-col items-center justify-center py-12 space-y-12 animate-[fadeIn_0.5s_ease-out]">
          <Orb state={orbState} size={250} onClick={() => setOrbState('thinking')} />
          
          <div className="text-center space-y-3">
            <h1 className="font-sans font-extrabold text-3xl md:text-4xl text-white tracking-tight leading-tight">
              BNS AI
            </h1>
            <p className="font-sans text-slate-450 text-base md:text-lg max-w-md mx-auto font-medium">
              How can I assist you with Indian Law today?
            </p>
          </div>
        </div>
      ) : (
        // 2. Active chat dialogue history view
        <div className="w-full flex-1 space-y-6 overflow-y-auto max-h-[50vh] md:max-h-[60vh] pr-2 mb-4 scrollbar-thin">
          {chatHistory.map((msg, index) => (
            <div
              key={msg.id}
              className={`flex flex-col gap-2 p-1 ${
                msg.sender === 'user' ? 'items-end' : 'items-start'
              } animate-[fadeIn_0.3s_ease-out]`}
            >
              {/* Message Bubble container */}
              <div
                className={`max-w-[92%] sm:max-w-[85%] rounded-2xl p-4 md:p-6 shadow-xl border backdrop-blur-md ${
                  msg.sender === 'user'
                    ? 'bg-blue-600/90 text-white border-blue-500/30 shadow-[0_0_15px_rgba(37,99,235,0.25)]'
                    : 'bg-slate-900/50 text-slate-100 border-white/5'
                }`}
              >
                {/* Meta details if helper response */}
                {msg.sender === 'assistant' && (msg.confidence || msg.thinkingTime) && (
                  <div className="flex items-center gap-4 mb-3 pb-2 border-b border-white/5 font-mono text-[10px] text-slate-400">
                    {msg.confidence && (
                      <span className="flex items-center gap-1.5 text-blue-400 font-bold bg-blue-500/10 border border-blue-500/20 px-2 py-0.5 rounded-full shadow-[0_0_10px_rgba(56,189,248,0.1)]">
                        <ShieldCheck size={11} /> Confidence: {msg.confidence}%
                      </span>
                    )}
                    {msg.thinkingTime && (
                      <span>Sift Time: {msg.thinkingTime}s</span>
                    )}
                  </div>
                )}

                {/* Main Message Body Text */}
                <div className="font-sans text-sm leading-relaxed whitespace-pre-wrap space-y-2">
                  {msg.id === streamingMessageId ? (
                    <StreamingText
                      text={msg.text}
                      onComplete={() => {
                        setStreamingMessageId(null);
                        setOrbState('completed');
                        setTimeout(() => setOrbState('idle'), 2000);
                      }}
                    />
                  ) : (
                    msg.text
                  )}
                </div>

                {/* Legal Citations Panel */}
                {msg.id !== streamingMessageId && msg.citations && msg.citations.length > 0 && (
                  <div className="mt-5 space-y-3 border-t border-white/5 pt-4 animate-[fadeIn_0.3s_ease-out]">
                    <span className="font-sans text-xs font-bold text-slate-400 uppercase tracking-widest block">
                      Applicable Statutory Acts
                    </span>
                    <div className="grid grid-cols-1 gap-2.5">
                      {msg.citations.map((cit, cidx) => (
                        <div
                          key={cidx}
                          className="bg-slate-950/40 border border-white/5 rounded-xl p-3.5 hover:bg-white/5 hover:border-white/10 transition-all duration-200"
                        >
                          <div className="flex items-center justify-between gap-2 mb-1.5">
                            <span className="font-mono text-xs font-extrabold text-blue-400">
                              {cit.section}
                            </span>
                            <span className="font-sans text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-blue-500/10 border border-blue-500/20 text-blue-400">
                              {cit.type}
                            </span>
                          </div>
                          <span className="font-sans font-semibold text-xs text-slate-200 block">
                            {cit.title}
                          </span>
                          <p className="font-sans text-slate-400 text-[11px] mt-1 leading-normal">
                            {cit.relevance}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Case Law / Judgment Evidence Cards */}
                {msg.id !== streamingMessageId && msg.cases && msg.cases.length > 0 && (
                  <div className="mt-5 space-y-3 border-t border-white/5 pt-4 animate-[fadeIn_0.3s_ease-out]">
                    <span className="font-sans text-xs font-bold text-slate-400 uppercase tracking-widest block">
                      Relevant Judgments & Precedent
                    </span>
                    <div className="grid grid-cols-1 gap-2.5">
                      {msg.cases.map((cs, cidx) => (
                        <div
                          key={cidx}
                          className="bg-sky-950/10 border border-sky-500/15 rounded-xl p-3.5 hover:bg-sky-950/20 hover:border-sky-500/25 transition-all duration-200"
                        >
                          <div className="flex items-center justify-between mb-1">
                            <span className="font-sans font-bold text-xs text-slate-200">
                              {cs.title}
                            </span>
                            <span className="font-mono text-[10px] font-bold text-sky-400">
                              {cs.year}
                            </span>
                          </div>
                          <span className="font-mono text-[10px] text-slate-500 block mb-1">
                            {cs.citation} • {cs.court}
                          </span>
                          <p className="font-sans text-slate-355 text-[11px] leading-relaxed italic">
                            "{cs.summary}"
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Msg Control bar (Copy, regenerate, export, ratings) */}
              {msg.sender === 'assistant' && msg.id !== streamingMessageId && (
                <div className="flex items-center gap-3.5 px-3 text-slate-400 hover:text-white transition-colors animate-[fadeIn_0.3s_ease-out]">
                  <button
                    onClick={() => handleCopy(msg.text)}
                    className="p-1.5 rounded-lg hover:bg-white/5 text-slate-400 hover:text-white transition-colors cursor-pointer"
                    title="Copy response text"
                  >
                    <Copy size={13} />
                  </button>
                  <button
                    onClick={() => handleDownload(msg)}
                    className="p-1.5 rounded-lg hover:bg-white/5 text-slate-400 hover:text-white transition-colors cursor-pointer"
                    title="Export text document"
                  >
                    <Download size={13} />
                  </button>
                  <button
                    onClick={() => {
                      // Find the user message that prompted this assistant response
                      let userMessageText = msg.text;
                      for (let i = index - 1; i >= 0; i--) {
                        if (chatHistory[i].sender === 'user') {
                          userMessageText = chatHistory[i].text;
                          break;
                        }
                      }
                      handleSend(userMessageText);
                    }}
                    className="p-1.5 rounded-lg hover:bg-white/5 text-slate-400 hover:text-white transition-colors cursor-pointer"
                    title="Regenerate"
                  >
                    <RotateCw size={13} />
                  </button>
                  <div className="h-3 w-[1px] bg-white/5" />
                  <button className="p-1.5 rounded-lg hover:bg-white/5 text-slate-400 hover:text-green-400 transition-colors cursor-pointer">
                    <ThumbsUp size={13} />
                  </button>
                  <button className="p-1.5 rounded-lg hover:bg-white/5 text-slate-400 hover:text-rose-400 transition-colors cursor-pointer">
                    <ThumbsDown size={13} />
                  </button>
                </div>
              )}
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
      )}

      {/* Input Tray & Voice Action Toggle */}
      <div className="w-full max-w-2xl bg-slate-950/60 border border-white/10 rounded-2xl p-2.5 shadow-2xl flex items-center gap-3 transition-all duration-300 focus-within:border-blue-500/50 focus-within:ring-1 focus-within:ring-blue-500/20">
        {/* Voice Microphone Toggle */}
        <button
          onClick={handleStartVoice}
          disabled={isGenerating}
          className={`${getButtonStyle('icon')} shrink-0 relative disabled:opacity-40 disabled:cursor-not-allowed hover:text-sky-400`}
          title="Voice Command Mode"
        >
          <Mic size={18} className="group-hover:scale-105 transition-transform" />
          <span className="absolute -top-10 left-1/2 -translate-x-1/2 bg-slate-950 border border-white/5 text-white text-[10px] font-bold px-2 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-30">
            Launch Voice
          </span>
        </button>

        {/* Text Input Box */}
        <input
          type="text"
          value={inputValue}
          onChange={e => setInputValue(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && !isGenerating && handleSend(inputValue)}
          placeholder={isGenerating ? "BNS AI is preparing response..." : "Type Indian Law query, section, or case keyword..."}
          disabled={isGenerating}
          className="flex-1 font-sans text-sm text-slate-200 placeholder:text-slate-500 bg-transparent outline-none border-none py-2 px-2 disabled:opacity-50"
        />

        {/* Submit Send Button */}
        <button
          onClick={() => !isGenerating && handleSend(inputValue)}
          disabled={isGenerating || !inputValue.trim()}
          className={`${getButtonStyle('primary')} shrink-0 p-3 shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 disabled:shadow-none`}
        >
          <Send size={16} />
        </button>
      </div>

      {/* Quick suggest prompts list */}
      {chatHistory.length === 0 && (
        <div className="w-full max-w-2xl grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4">
          <button
            onClick={() => handleSend("What is BNS Section 103(2) regarding mob lynching?")}
            className="p-4 rounded-xl border border-white/5 bg-slate-950/40 hover:bg-white/5 hover:border-white/10 text-left text-xs font-sans font-medium text-slate-300 hover:text-white transition-all flex items-center justify-between group shadow-xl cursor-pointer"
          >
            <span>Explain **BNS Sec 103(2)** mob lynching</span>
            <ChevronRight size={14} className="text-slate-400 group-hover:translate-x-1 transition-transform" />
          </button>
          <button
            onClick={() => handleSend("What is BNS Section 318 regarding cheating?")}
            className="p-4 rounded-xl border border-white/5 bg-slate-950/40 hover:bg-white/5 hover:border-white/10 text-left text-xs font-sans font-medium text-slate-300 hover:text-white transition-all flex items-center justify-between group shadow-xl cursor-pointer"
          >
            <span>Explain **BNS Sec 318** cheating definition</span>
            <ChevronRight size={14} className="text-slate-400 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      )}
    </div>
  );
}
