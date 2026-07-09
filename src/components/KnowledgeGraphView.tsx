/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import {
  Network,
  ZoomIn,
  ZoomOut,
  Maximize,
  Search,
  Filter,
  Info,
  Layers,
  HelpCircle
} from 'lucide-react';

interface Node {
  id: string;
  label: string;
  type: 'Act' | 'Section' | 'Article' | 'Case';
  x: number;
  y: number;
  color: string;
  desc: string;
  details: string;
}

interface Edge {
  from: string;
  to: string;
  relationship: 'Explained By' | 'Depends On' | 'Procedure Under' | 'Evidence Under' | 'Refers To';
}

export default function KnowledgeGraphView() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState<'All' | 'Act' | 'Section' | 'Article' | 'Case'>('All');
  const [selectedNode, setSelectedNode] = useState<Node | null>(null);
  const [zoomScale, setZoomScale] = useState(1);

  // Core visual nodes representing Indian Law
  const nodes: Node[] = [
    {
      id: 'n1',
      label: 'Constitution Art. 21',
      type: 'Article',
      x: 300,
      y: 80,
      color: '#2563EB', // Blue
      desc: 'Fundamental Right to Life & Personal Liberty',
      details: 'Governs all procedural penal codes and dictates police custody/bail limits.'
    },
    {
      id: 'n2',
      label: 'BNS Section 103',
      type: 'Section',
      x: 180,
      y: 200,
      color: '#0EA5E9', // Sky Blue
      desc: 'Punishment for Murder & Mob Lynching',
      details: 'Codifies group-motivated hate killings replacing standard IPC 302 indictments.'
    },
    {
      id: 'n3',
      label: 'BNSS Section 187',
      type: 'Section',
      x: 420,
      y: 200,
      color: '#10B981', // Emerald Green
      desc: 'Police Custody Tranche Rules',
      details: 'Mandates tranches for police remand spread across initial 40/60 day brackets.'
    },
    {
      id: 'n4',
      label: 'BSA Section 63',
      type: 'Section',
      x: 300,
      y: 320,
      color: '#F59E0B', // Amber
      desc: 'Electronic Admissibility & Certificate',
      details: 'Requires strict validation logs for servers, smartphones, and WhatsApp exports.'
    },
    {
      id: 'n5',
      label: 'Poonawalla Precedent',
      type: 'Case',
      x: 100,
      y: 300,
      color: '#8B5CF6', // Purple
      desc: 'Tehseen S. Poonawalla v. UOI (2018)',
      details: 'Supreme Court guidelines directing state actions against mob lynching, codified in BNS Sec 103(2).'
    },
    {
      id: 'n6',
      label: 'Khotkar Certificate Rule',
      type: 'Case',
      x: 500,
      y: 300,
      color: '#EC4899', // Pink
      desc: 'Arjun Panditrao Khotkar Precedent (2020)',
      details: 'Standardized conditions where certificate validation is mandatory for secondary digital files.'
    }
  ];

  const edges: Edge[] = [
    { from: 'n2', to: 'n1', relationship: 'Depends On' },
    { from: 'n3', to: 'n1', relationship: 'Procedure Under' },
    { from: 'n5', to: 'n2', relationship: 'Explained By' },
    { from: 'n6', to: 'n4', relationship: 'Explained By' },
    { from: 'n3', to: 'n4', relationship: 'Evidence Under' },
    { from: 'n2', to: 'n3', relationship: 'Refers To' }
  ];

  // Filtering Logic
  const filteredNodes = nodes.filter(n => {
    const matchesSearch = n.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          n.desc.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = activeFilter === 'All' || n.type === activeFilter;
    return matchesSearch && matchesFilter;
  });

  // Calculate coordinates based on zoom scale
  const transformStyle = {
    transform: `scale(${zoomScale})`,
    transformOrigin: 'center center',
    transition: 'transform 0.2s ease-out'
  };

  return (
    <div className="flex-1 space-y-8 animate-[fadeIn_0.4s_ease-out] max-w-6xl mx-auto text-slate-100">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/5 pb-6">
        <div>
          <h2 className="font-sans font-extrabold text-2xl text-white tracking-tight">
            Interactive Legal Knowledge Graph
          </h2>
          <p className="font-sans text-sm text-slate-400 font-medium">
            Examine relational structures mapping how constitutional mandates, enacted codes, procedures, and precedents connect.
          </p>
        </div>
      </div>

      {/* Control/Toolbar Panel */}
      <div className="bg-slate-900/40 border border-white/5 backdrop-blur-xl rounded-2xl p-4 shadow-xl flex flex-col md:flex-row items-center justify-between gap-4">
        
        {/* Left: Filter Categories */}
        <div className="flex flex-wrap items-center gap-1.5">
          {['All', 'Act', 'Section', 'Article', 'Case'].map((f) => (
            <button
              key={f}
              onClick={() => setActiveFilter(f as any)}
              className={`px-3 py-1.5 rounded-xl text-xs font-sans font-semibold border transition-all cursor-pointer ${
                activeFilter === f
                  ? 'bg-blue-600 border-blue-600 text-white shadow-lg shadow-blue-600/20'
                  : 'bg-white/5 border-white/5 text-slate-300 hover:bg-white/10'
              }`}
            >
              {f}s
            </button>
          ))}
        </div>

        {/* Right: Search box & zoom controls */}
        <div className="flex items-center gap-3 w-full md:w-auto">
          <div className="relative flex-1 md:flex-initial">
            <Search size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Search legal entities..."
              className="w-full md:w-56 bg-slate-955 border border-white/5 hover:border-white/10 focus:border-blue-500/50 rounded-xl pl-9 pr-4 py-1.5 text-xs font-sans text-slate-200 outline-none transition-all"
            />
          </div>

          <div className="flex items-center gap-1 bg-white/5 border border-white/5 rounded-xl p-1 shrink-0">
            <button
              onClick={() => setZoomScale(prev => Math.min(prev + 0.1, 1.4))}
              className="p-1.5 hover:bg-white/10 text-slate-400 hover:text-white rounded-lg cursor-pointer transition-colors"
              title="Zoom In"
            >
              <ZoomIn size={14} />
            </button>
            <button
              onClick={() => setZoomScale(prev => Math.max(prev - 0.1, 0.7))}
              className="p-1.5 hover:bg-white/10 text-slate-400 hover:text-white rounded-lg cursor-pointer transition-colors"
              title="Zoom Out"
            >
              <ZoomOut size={14} />
            </button>
            <button
              onClick={() => setZoomScale(1)}
              className="p-1.5 hover:bg-white/10 text-slate-400 hover:text-white rounded-lg cursor-pointer transition-colors"
              title="Reset Zoom"
            >
              <Maximize size={14} />
            </button>
          </div>
        </div>

      </div>

      {/* Main Graph Grid Content */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        
        {/* Left Column (8 cols): SVG Canvas Wrapper */}
        <div className="lg:col-span-8 bg-slate-950/60 border border-white/5 rounded-3xl p-6 relative overflow-hidden min-h-[450px] shadow-inner flex items-center justify-center backdrop-blur-xl">
          
          {/* Subtle architectural background grids */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(37,99,235,0.06),transparent_70%)] pointer-events-none" />
          <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />

          {/* Core SVG Workspace */}
          <svg
            width="100%"
            height="100%"
            viewBox="0 0 600 400"
            className="cursor-grab active:cursor-grabbing relative z-10"
            style={transformStyle}
          >
            {/* SVG Markers for Edge Arrows */}
            <defs>
              <marker
                id="arrow"
                viewBox="0 0 10 10"
                refX="22"
                refY="5"
                markerWidth="6"
                markerHeight="6"
                orient="auto-start-reverse"
              >
                <path d="M 0 1 L 10 5 L 0 9 z" fill="rgba(148,163,184,0.4)" />
              </marker>
            </defs>

            {/* Render Connection Edges */}
            {edges.map((edge, idx) => {
              const fromNode = nodes.find(n => n.id === edge.from);
              const toNode = nodes.find(n => n.id === edge.to);
              if (!fromNode || !toNode) return null;

              return (
                <g key={idx} className="opacity-60 hover:opacity-100 transition-opacity">
                  <line
                    x1={fromNode.x}
                    y1={fromNode.y}
                    x2={toNode.x}
                    y2={toNode.y}
                    stroke="rgba(148,163,184,0.25)"
                    strokeWidth="1.5"
                    strokeDasharray="4 2"
                    markerEnd="url(#arrow)"
                  />
                  {/* Midpoint relation text label */}
                  <text
                    x={(fromNode.x + toNode.x) / 2}
                    y={(fromNode.y + toNode.y) / 2 - 4}
                    fill="rgba(148,163,184,0.6)"
                    className="font-mono"
                    style={{ fontSize: '8px', textAnchor: 'middle' }}
                  >
                    {edge.relationship}
                  </text>
                </g>
              );
            })}

            {/* Render Interactive Nodes */}
            {filteredNodes.map((node) => {
              const isSelected = selectedNode?.id === node.id;
              return (
                <g
                  key={node.id}
                  onClick={() => setSelectedNode(node)}
                  className="cursor-pointer group"
                >
                  {/* Subtle Node pulse ring */}
                  <circle
                    cx={node.x}
                    cy={node.y}
                    r={isSelected ? 26 : 20}
                    fill="none"
                    stroke={node.color}
                    strokeWidth="1.5"
                    className={isSelected ? "animate-pulse" : "opacity-0 group-hover:opacity-40 transition-opacity"}
                  />

                  {/* Node solid circle */}
                  <circle
                    cx={node.x}
                    cy={node.y}
                    r={isSelected ? 20 : 16}
                    fill="#0f172a"
                    stroke={node.color}
                    strokeWidth="2.5"
                    className="transition-all"
                  />

                  {/* Inner Node Core Accent */}
                  <circle
                    cx={node.x}
                    cy={node.y}
                    r="4"
                    fill={node.color}
                  />

                  {/* Text Label offset */}
                  <text
                    x={node.x}
                    y={node.y + 32}
                    fill={isSelected ? '#ffffff' : '#94a3b8'}
                    className="font-sans font-bold transition-colors"
                    style={{ fontSize: '9px', textAnchor: 'middle' }}
                  >
                    {node.label}
                  </text>
                </g>
              );
            })}
          </svg>

          {/* Mini-map Representation Card */}
          <div className="absolute bottom-4 right-4 bg-slate-950/90 border border-white/10 rounded-xl p-3 w-28 h-20 pointer-events-none z-20 flex flex-col justify-between shadow-2xl">
            <span className="font-mono text-[8px] text-slate-500 uppercase tracking-widest block">Radar Minimap</span>
            <div className="flex-1 flex items-center justify-center relative">
              {/* Draw 5 dot placeholders as minimap representation */}
              <div className="absolute top-2 left-4 w-1.5 h-1.5 rounded-full bg-blue-500 opacity-80" />
              <div className="absolute top-4 left-10 w-1 h-1 rounded-full bg-emerald-500 opacity-80" />
              <div className="absolute top-8 left-6 w-1 h-1 rounded-full bg-amber-500 opacity-80" />
              <div className="absolute top-2 left-16 w-1.5 h-1.5 rounded-full bg-purple-500 opacity-80" />
              <div className="absolute top-6 left-14 w-1 h-1 rounded-full bg-pink-500 opacity-80" />
            </div>
          </div>

        </div>

        {/* Right Column (4 cols): Detailed Inspector Metadata */}
        <div className="lg:col-span-4 space-y-6">
          {selectedNode ? (
            <div className="bg-slate-900/40 border border-white/5 backdrop-blur-xl rounded-3xl p-6 shadow-xl space-y-5 animate-[fadeIn_0.3s_ease-out] sticky top-6 text-slate-100">
              
              <div className="space-y-1">
                <span className="font-mono text-[9px] font-bold uppercase px-2 py-0.5 rounded-md bg-blue-500/10 text-blue-400 border border-blue-500/20 inline-block shadow-[0_0_10px_rgba(59,130,246,0.1)]">
                  {selectedNode.type} Entity
                </span>
                <h4 className="font-sans font-extrabold text-base text-white tracking-tight">
                  {selectedNode.label}
                </h4>
              </div>

              <div className="h-[1px] bg-white/5" />

              <div className="space-y-4">
                <div>
                  <span className="font-sans text-xs font-bold text-slate-400 uppercase tracking-widest block mb-1">Concept Summary</span>
                  <p className="font-sans text-xs text-slate-300 leading-relaxed">
                    {selectedNode.desc}
                  </p>
                </div>

                <div>
                  <span className="font-sans text-xs font-bold text-slate-400 uppercase tracking-widest block mb-1">Litigation Context</span>
                  <p className="font-sans text-xs text-slate-400 leading-relaxed">
                    {selectedNode.details}
                  </p>
                </div>

                <div>
                  <span className="font-sans text-xs font-bold text-slate-400 uppercase tracking-widest block mb-2">Mapped Linkages</span>
                  <div className="space-y-2">
                    {edges
                      .filter(e => e.from === selectedNode.id || e.to === selectedNode.id)
                      .map((edge, eidx) => {
                        const targetNode = nodes.find(n => n.id === (edge.from === selectedNode.id ? edge.to : edge.from));
                        const isOrigin = edge.from === selectedNode.id;
                        return (
                          <div key={eidx} className="flex items-center justify-between p-2.5 bg-slate-950/40 rounded-xl border border-white/5 text-xs text-slate-200">
                            <span className="font-sans font-semibold text-slate-300">{targetNode?.label}</span>
                            <span className="font-mono text-[9px] text-blue-400 font-bold uppercase tracking-wider">
                              {isOrigin ? edge.relationship : `Influences`}
                            </span>
                          </div>
                        );
                      })}
                  </div>
                </div>
              </div>

            </div>
          ) : (
            <div className="bg-slate-900/40 border border-white/5 backdrop-blur-xl rounded-3xl p-6 shadow-xl text-center py-16 space-y-4 sticky top-6">
              <div className="p-4 bg-white/5 rounded-full w-12 h-12 flex items-center justify-center mx-auto border border-white/5">
                <Info size={18} className="text-slate-450" />
              </div>
              <div>
                <span className="font-sans font-bold text-xs text-slate-200 block">Entity Inspector</span>
                <p className="font-sans text-[11px] text-slate-455 max-w-xs mx-auto mt-1 leading-relaxed">
                  Click on any node on the interactive network graph to load its statutory properties and relationships.
                </p>
              </div>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
