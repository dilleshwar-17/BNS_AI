/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useRef, useState } from 'react';
import { OrbState } from '../types';

interface OrbProps {
  state: OrbState;
  onClick?: () => void;
  size?: number;
}

export default function Orb({ state, onClick, size = 280 }: OrbProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationFrameRef = useRef<number | null>(null);
  const [hovered, setHovered] = useState(false);

  // Sound visualization data simulation
  const [equalizerBars, setEqualizerBars] = useState<number[]>(new Array(12).fill(10));

  // Speech equalizer effect
  useEffect(() => {
    let interval: any;
    if (state === 'speaking') {
      interval = setInterval(() => {
        setEqualizerBars(prev =>
          prev.map(() => 5 + Math.random() * 35)
        );
      }, 80);
    } else if (state === 'listening') {
      interval = setInterval(() => {
        setEqualizerBars(prev =>
          prev.map(() => 2 + Math.random() * 15)
        );
      }, 100);
    } else {
      setEqualizerBars(new Array(12).fill(6));
    }
    return () => clearInterval(interval);
  }, [state]);

  // Canvas particle / energy animation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = size * 2;
    canvas.height = size * 2;
    ctx.scale(2, 2);

    let angle = 0;
    let particles: Array<{
      x: number;
      y: number;
      radius: number;
      color: string;
      speed: number;
      angle: number;
      distance: number;
    }> = [];

    // Initialize state-specific particles
    const initParticles = () => {
      particles = [];
      const numParticles =
        state === 'thinking' ? 45 :
        state === 'processing' ? 35 :
        state === 'synchronizing' ? 30 :
        state === 'connecting' ? 50 : 15;

      for (let i = 0; i < numParticles; i++) {
        const pDistance = 40 + Math.random() * 60;
        const pAngle = Math.random() * Math.PI * 2;
        particles.push({
          x: size / 2,
          y: size / 2,
          radius: 1.5 + Math.random() * 2,
          color:
            state === 'thinking' ? 'rgba(14, 165, 233, 0.7)' : // Sky Blue
            state === 'processing' ? 'rgba(37, 99, 235, 0.7)' : // Blue
            state === 'error' ? 'rgba(239, 68, 68, 0.7)' : // Red
            state === 'completed' ? 'rgba(34, 197, 94, 0.7)' : // Green
            'rgba(255, 255, 255, 0.6)',
          speed: 0.01 + Math.random() * 0.02,
          angle: pAngle,
          distance: pDistance,
        });
      }
    };

    initParticles();

    const render = () => {
      ctx.clearRect(0, 0, size, size);
      const centerX = size / 2;
      const centerY = size / 2;
      angle += 0.015;

      // Draw background glow base
      const gradientBase = ctx.createRadialGradient(
        centerX, centerY, 5,
        centerX, centerY, size / 2
      );

      // Gradient color mapping based on Orb State
      let stop0 = 'rgba(37, 99, 235, 0.2)';
      let stop1 = 'rgba(14, 165, 233, 0.05)';
      let stop2 = 'rgba(0, 0, 0, 0)';

      if (state === 'error') {
        stop0 = 'rgba(239, 68, 68, 0.35)';
        stop1 = 'rgba(239, 68, 68, 0.1)';
      } else if (state === 'completed') {
        stop0 = 'rgba(34, 197, 94, 0.3)';
        stop1 = 'rgba(34, 197, 94, 0.08)';
      } else if (state === 'disconnected') {
        stop0 = 'rgba(100, 116, 139, 0.15)';
        stop1 = 'rgba(100, 116, 139, 0.02)';
      } else if (state === 'thinking') {
        stop0 = 'rgba(14, 165, 233, 0.3)';
        stop1 = 'rgba(37, 99, 235, 0.1)';
      } else if (state === 'listening') {
        const pulse = 1 + Math.sin(angle * 4) * 0.08;
        stop0 = `rgba(14, 165, 233, ${0.35 * pulse})`;
        stop1 = 'rgba(37, 99, 235, 0.15)';
      } else if (state === 'processing') {
        stop0 = 'rgba(37, 99, 235, 0.35)';
        stop1 = 'rgba(56, 189, 248, 0.15)';
      } else if (state === 'loading') {
        stop0 = 'rgba(37, 99, 235, 0.2)';
        stop1 = 'rgba(14, 165, 233, 0.08)';
      }

      gradientBase.addColorStop(0, stop0);
      gradientBase.addColorStop(0.5, stop1);
      gradientBase.addColorStop(1, stop2);
      ctx.fillStyle = gradientBase;
      ctx.beginPath();
      ctx.arc(centerX, centerY, size / 2, 0, Math.PI * 2);
      ctx.fill();

      // State-specific particle behavior
      if (state === 'thinking') {
        // Draw orbital connection lines
        ctx.strokeStyle = 'rgba(14, 165, 233, 0.15)';
        ctx.lineWidth = 0.5;
        ctx.beginPath();
        particles.forEach((p, idx) => {
          p.angle += p.speed * 0.5;
          const px = centerX + Math.cos(p.angle) * p.distance;
          const py = centerY + Math.sin(p.angle) * p.distance;
          
          if (idx === 0) ctx.moveTo(px, py);
          else if (idx % 4 === 0) {
            ctx.lineTo(px, py);
          }
        });
        ctx.stroke();

        // Draw particle nodes
        particles.forEach(p => {
          const px = centerX + Math.cos(p.angle) * p.distance;
          const py = centerY + Math.sin(p.angle) * p.distance;
          ctx.fillStyle = p.color;
          ctx.beginPath();
          ctx.arc(px, py, p.radius, 0, Math.PI * 2);
          ctx.fill();
        });
      } else if (state === 'processing') {
        // Draw spiral energy lines
        ctx.strokeStyle = 'rgba(37, 99, 235, 0.25)';
        ctx.lineWidth = 1;
        for (let j = 0; j < 3; j++) {
          ctx.beginPath();
          const offset = (j * Math.PI * 2) / 3;
          for (let d = 10; d < 70; d += 2) {
            const curAngle = angle * 2 + d * 0.08 + offset;
            const px = centerX + Math.cos(curAngle) * d;
            const py = centerY + Math.sin(curAngle) * d;
            if (d === 10) ctx.moveTo(px, py);
            else ctx.lineTo(px, py);
          }
          ctx.stroke();
        }
      } else if (state === 'synchronizing') {
        // Linear data streaks traveling around the orb core
        particles.forEach(p => {
          p.distance -= 0.4;
          if (p.distance < 15) {
            p.distance = 65;
            p.angle = Math.random() * Math.PI * 2;
          }
          const px = centerX + Math.cos(p.angle) * p.distance;
          const py = centerY + Math.sin(p.angle) * p.distance;
          ctx.fillStyle = 'rgba(14, 165, 233, 0.6)';
          ctx.beginPath();
          ctx.arc(px, py, p.radius * 0.8, 0, Math.PI * 2);
          ctx.fill();
        });
      } else if (state === 'connecting') {
        // Network grid node connections
        ctx.strokeStyle = 'rgba(37, 99, 235, 0.12)';
        ctx.lineWidth = 0.5;
        particles.forEach((p1, i) => {
          p1.angle += p1.speed * 0.3;
          const p1x = centerX + Math.cos(p1.angle) * p1.distance;
          const p1y = centerY + Math.sin(p1.angle) * p1.distance;

          particles.slice(i + 1, i + 8).forEach(p2 => {
            const p2x = centerX + Math.cos(p2.angle) * p2.distance;
            const p2y = centerY + Math.sin(p2.angle) * p2.distance;
            const dist = Math.hypot(p1x - p2x, p1y - p2y);
            if (dist < 45) {
              ctx.beginPath();
              ctx.moveTo(p1x, p1y);
              ctx.lineTo(p2x, p2y);
              ctx.stroke();
            }
          });
        });
      }

      animationFrameRef.current = requestAnimationFrame(render);
    };

    render();

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [state, size]);

  // Color theme logic mapping for external rings and glow
  const ringColors: Record<OrbState, string> = {
    idle: 'border-blue-500/30 shadow-blue-500/20 shadow-lg',
    listening: 'border-sky-400/60 shadow-sky-400/40 shadow-2xl scale-[1.04]',
    processing: 'border-blue-600/50 shadow-blue-600/30 shadow-xl animate-[spin_8s_linear_infinite]',
    thinking: 'border-sky-500/40 shadow-sky-500/30 shadow-xl',
    speaking: 'border-blue-500/50 shadow-blue-400/40 shadow-2xl scale-[1.02]',
    completed: 'border-green-500/50 shadow-green-500/30 shadow-xl',
    error: 'border-red-500/60 shadow-red-500/40 shadow-xl animate-[pulse_1s_infinite]',
    disconnected: 'border-slate-500/20 shadow-none grayscale opacity-40',
    loading: 'border-blue-400/30 shadow-blue-400/10 animate-[pulse_2s_infinite]',
    synchronizing: 'border-sky-400/40 shadow-sky-400/20',
    connecting: 'border-blue-500/40 shadow-blue-500/20'
  };

  const orbColorGradients: Record<OrbState, string> = {
    idle: 'from-blue-600 via-blue-500 to-sky-400',
    listening: 'from-sky-500 via-cyan-400 to-blue-500',
    processing: 'from-indigo-600 via-blue-600 to-sky-400',
    thinking: 'from-sky-500 via-indigo-500 to-violet-500',
    speaking: 'from-blue-500 via-sky-400 to-indigo-500',
    completed: 'from-emerald-500 via-green-500 to-teal-400',
    error: 'from-red-600 via-rose-500 to-red-700',
    disconnected: 'from-slate-600 via-slate-500 to-slate-700',
    loading: 'from-blue-500/90 via-blue-600/90 to-sky-500/90',
    synchronizing: 'from-sky-500 via-blue-500 to-indigo-500',
    connecting: 'from-blue-600 via-indigo-500 to-sky-400'
  };

  return (
    <div
      id="bns-ai-orb-container"
      className="relative flex items-center justify-center cursor-pointer transition-all duration-700 select-none"
      style={{ width: size, height: size }}
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Dynamic Ambient Blur Backlight Layer */}
      <div
        className={`absolute inset-4 rounded-full filter blur-[40px] opacity-60 transition-all duration-1000 ${
          state === 'error' ? 'bg-red-500' :
          state === 'completed' ? 'bg-green-500' :
          state === 'disconnected' ? 'bg-slate-500' :
          state === 'thinking' ? 'bg-sky-400' : 'bg-blue-500'
        } ${hovered ? 'scale-110 opacity-75' : 'scale-100'}`}
      />

      {/* Embedded Style Block for cinematic keyframe graphics */}
      <style>{`
        @keyframes bns-float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-10px) rotate(2deg); }
        }
        @keyframes bns-breathe {
          0%, 100% { transform: scale(1); filter: brightness(1); }
          50% { transform: scale(1.05); filter: brightness(1.1); }
        }
        @keyframes bns-ripple-wave {
          0% { transform: scale(0.95); opacity: 0.8; }
          100% { transform: scale(1.4); opacity: 0; }
        }
        .animate-float-breathe {
          animation: bns-float 6s ease-in-out infinite, bns-breathe 4s ease-in-out infinite alternate;
        }
        .orb-ripple {
          animation: bns-ripple-wave 2s cubic-bezier(0.1, 0.8, 0.3, 1) infinite;
        }
        .orb-ripple-delayed {
          animation: bns-ripple-wave 2s cubic-bezier(0.1, 0.8, 0.3, 1) infinite;
          animation-delay: 1s;
        }
      `}</style>

      {/* Listening / Speaking Ripples */}
      {(state === 'listening' || state === 'speaking') && (
        <>
          <div className="absolute inset-0 rounded-full border-2 border-sky-400/40 orb-ripple pointer-events-none" />
          <div className="absolute inset-0 rounded-full border-2 border-blue-500/30 orb-ripple-delayed pointer-events-none" />
        </>
      )}

      {/* Rotating Outer Energy Rings */}
      <div
        className={`absolute inset-0 rounded-full border border-dashed transition-all duration-700 pointer-events-none ${ringColors[state]}`}
        style={{ margin: '-10px' }}
      />
      <div
        className="absolute inset-0 rounded-full border border-double border-white/5 pointer-events-none animate-[spin_30s_linear_infinite]"
        style={{ margin: '-18px' }}
      />

      {/* Canvas Layer for fine-grained internal flows, neural linkages, and particle clusters */}
      <canvas
        ref={canvasRef}
        style={{ width: size, height: size }}
        className="absolute inset-0 z-10 pointer-events-none"
      />

      {/* Glassmorphic Core Container */}
      <div
        className={`relative z-20 w-3/4 h-3/4 rounded-full bg-gradient-to-tr ${orbColorGradients[state]} p-[1.5px] transition-all duration-1000 shadow-2xl overflow-hidden animate-float-breathe`}
      >
        {/* Deep glass filter overlay inside core */}
        <div className="w-full h-full rounded-full bg-slate-950/85 backdrop-blur-[12px] flex items-center justify-center relative group">
          {/* Internal gradient lighting reflection */}
          <div className="absolute top-1/4 left-1/4 w-1/2 h-1/2 rounded-full bg-white/10 filter blur-[8px] pointer-events-none" />
          
          {/* Subtle energy core */}
          <div
            className={`w-1/2 h-1/2 rounded-full bg-gradient-to-br ${orbColorGradients[state]} opacity-40 filter blur-[15px] transition-all duration-1000 ${
              state === 'processing' ? 'scale-125 opacity-60' : 'scale-100'
            }`}
          />

          {/* Equalizer animation inside the Orb (only for listening & speaking) */}
          {(state === 'speaking' || state === 'listening') && (
            <div className="absolute inset-0 flex items-center justify-center gap-[3px] px-8">
              {equalizerBars.map((h, idx) => (
                <div
                  key={idx}
                  className={`w-[3px] rounded-full transition-all duration-100 ${
                    state === 'speaking' ? 'bg-blue-400' : 'bg-sky-400'
                  }`}
                  style={{ height: `${h}px` }}
                />
              ))}
            </div>
          )}

          {/* Status Label centered under the orb core */}
          {state !== 'speaking' && state !== 'listening' && (
            <span className="absolute bottom-6 font-mono text-[10px] tracking-[0.2em] text-slate-400 uppercase select-none opacity-80 scale-90">
              {state}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
