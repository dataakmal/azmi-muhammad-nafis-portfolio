import { useState } from 'react';
import { Layers, Search, Filter, TrendingUp, Cpu, Smile, Activity, BarChart3, Database } from 'lucide-react';
import { PROJECTS } from '../data';
import { Project } from '../types';

export default function ProjectsSection() {
  const [activeFilter, setActiveFilter] = useState<string>('all');

  const filters = [
    { label: 'All Projects', value: 'all', icon: <Layers className="w-3.5 h-3.5" /> },
    { label: 'BI & Dashboards', value: 'dashboard', icon: <BarChart3 className="w-3.5 h-3.5" /> },
    { label: 'NLP & ML', value: 'nlp-ml', icon: <Cpu className="w-3.5 h-3.5" /> },
    { label: 'Survey & Sampling', value: 'survey', icon: <Database className="w-3.5 h-3.5" /> },
    { label: 'Data Analytics', value: 'analytics', icon: <Activity className="w-3.5 h-3.5" /> },
  ];

  const filteredProjects = activeFilter === 'all'
    ? PROJECTS
    : PROJECTS.filter(p => p.category === activeFilter);

  // Helper to render customized interactive card illustrations mimicking real UI
  const renderCardIllustration = (p: Project) => {
    switch (p.category) {
      case 'dashboard':
        return (
          <div className="h-36 bg-slate-950/80 border-b border-white/5 relative overflow-hidden flex flex-col justify-end p-4">
            <div className="absolute inset-0 bg-gradient-to-tr from-purple-500/10 via-transparent to-transparent pointer-events-none" />
            <div className="space-y-2 relative">
              <div className="flex gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-red-400" />
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              </div>
              {/* Illustrated KPI Panel */}
              <div className="grid grid-cols-3 gap-2">
                <div className="bg-slate-900 border border-white/5 p-2 rounded-lg">
                  <span className="block text-[8px] text-gray-500 uppercase">GMV Live</span>
                  <span className="block text-xs font-bold font-mono text-purple-300">MoM +18%</span>
                </div>
                <div className="bg-slate-900 border border-white/5 p-2 rounded-lg col-span-2">
                  <span className="block text-[8px] text-gray-500 uppercase">Interactive Trend</span>
                  <div className="flex items-end gap-1 h-4 mt-1 bg-transparent">
                    <div className="h-2 w-full bg-purple-500/30 rounded-xs" />
                    <div className="h-3 w-full bg-purple-500/40 rounded-xs" />
                    <div className="h-1 w-full bg-purple-500/30 rounded-xs" />
                    <div className="h-4 w-full bg-purple-500 rounded-xs animate-pulse" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      case 'nlp-ml':
        return (
          <div className="h-36 bg-slate-950/80 border-b border-white/5 relative overflow-hidden flex flex-col justify-center p-4">
            <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/10 via-transparent to-transparent pointer-events-none" />
            <div className="space-y-2 relative z-10">
              <div className="text-[10px] font-mono text-blue-400 font-semibold uppercase flex items-center gap-1">
                <Cpu className="w-3.5 h-3.5" /> Classification Engine
              </div>
              {/* Natural Language processing visualization */}
              <div className="bg-slate-900 border border-white/5 p-2.5 rounded-lg space-y-1.5">
                <div className="flex justify-between items-center">
                  <span className="text-[9px] text-slate-400 font-mono">"Sangat cepat dan membantu..."</span>
                  <span className="text-[8px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-1 rounded font-mono font-bold">Positif 98%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[9px] text-slate-400 font-mono">"Masalah koneksi lambat..."</span>
                  <span className="text-[8px] bg-red-500/10 text-red-500 border border-red-500/20 px-1 rounded font-mono font-bold">Negatif 84%</span>
                </div>
              </div>
            </div>
          </div>
        );
      case 'survey':
        return (
          <div className="h-36 bg-slate-950/80 border-b border-white/5 relative overflow-hidden flex flex-col justify-end p-4">
            <div className="absolute inset-0 bg-gradient-to-tr from-teal-500/10 via-transparent to-transparent pointer-events-none" />
            <div className="space-y-2 relative">
              <div className="text-[10px] font-mono text-teal-400 uppercase font-semibold flex items-center gap-1">
                <Database className="w-3.5 h-3.5" /> Sample Distribution
              </div>
              <div className="bg-slate-900 border border-white/5 p-2.5 rounded-lg">
                <div className="flex justify-between text-[8px] text-gray-500 mb-1">
                  <span>Normal Sampling Size</span>
                  <span>n=400</span>
                </div>
                {/* Standard Bell Curve or Bar Illustration */}
                <div className="flex items-end gap-1.5 h-7">
                  <div className="h-2 w-full bg-slate-800 rounded-xs" />
                  <div className="h-4 w-full bg-teal-500/40 rounded-xs" />
                  <div className="h-6 w-full bg-teal-500 rounded-xs" />
                  <div className="h-3 w-full bg-teal-500/40 rounded-xs" />
                  <div className="h-1 w-full bg-slate-800 rounded-xs" />
                </div>
              </div>
            </div>
          </div>
        );
      default:
        return (
          <div className="h-36 bg-slate-950/80 border-b border-white/5 relative overflow-hidden flex flex-col justify-end p-4">
            <div className="absolute inset-0 bg-gradient-to-tr from-amber-500/10 via-transparent to-transparent pointer-events-none" />
            <div className="space-y-2 relative">
              <div className="text-[10px] font-mono text-amber-400 uppercase font-semibold flex items-center gap-1">
                <BarChart3 className="w-3.5 h-3.5" /> Analytical Infographic
              </div>
              {/* Infographic report structure */}
              <div className="grid grid-cols-2 gap-2">
                <div className="bg-slate-900 border border-white/5 p-2 rounded-lg">
                  <span className="block text-[8px] text-gray-500">Service Gaps</span>
                  <span className="text-xs font-mono font-bold text-amber-300">G = -1.24</span>
                </div>
                <div className="bg-slate-900 border border-white/5 p-2 rounded-lg">
                  <span className="block text-[8px] text-gray-500">Improvement</span>
                  <span className="text-xs font-mono font-bold text-amber-300">+24.5%</span>
                </div>
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <section id="projects" className="py-20 relative bg-slate-950">
      {/* Visual background element */}
      <div className="absolute top-1/4 left-10 w-96 h-96 bg-purple-600/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-300 text-xs font-mono mb-4">
              <TrendingUp className="w-3.5 h-3.5" />
              CASE STUDIES & CODE
            </div>
            <h2 className="text-3xl sm:text-4xl font-sans font-bold text-white tracking-tight">
              Featured Work
            </h2>
            <div className="h-1 w-12 bg-purple-500 mt-2 rounded" />
          </div>

          {/* Filtering Navigation Row */}
          <div className="flex flex-wrap gap-1.5 bg-slate-900/60 p-1 rounded-xl border border-white/5 max-w-full">
            {filters.map((f) => (
              <button
                key={f.value}
                onClick={() => setActiveFilter(f.value)}
                className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg cursor-pointer transition-all duration-300 ${
                  activeFilter === f.value
                    ? 'bg-purple-600/20 text-purple-200 border border-purple-500/30 font-semibold'
                    : 'text-gray-400 hover:text-white border border-transparent'
                }`}
              >
                {f.icon}
                <span>{f.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Project Card Display Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredProjects.map((p) => (
            <div
              key={p.id}
              className="glass-panel rounded-2xl overflow-hidden flex flex-col justify-between border border-white/5 hover:border-white/10 glass-panel-hover"
            >
              <div>
                {/* Styled CSS mockup illustration representation */}
                {renderCardIllustration(p)}

                {/* Textual descriptions */}
                <div className="p-5">
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="text-[10px] uppercase font-mono font-bold tracking-wider text-purple-400">
                      {p.category === 'dashboard' && 'Dashboard Engineering'}
                      {p.category === 'nlp-ml' && 'Natural Language Processing'}
                      {p.category === 'survey' && 'Statistical Research'}
                      {p.category === 'analytics' && 'Operational Analytics'}
                    </span>
                    {p.metric && (
                      <span className="text-[10px] font-mono font-bold bg-purple-500/10 text-purple-300 px-2 py-0.5 rounded border border-purple-500/20 shadow-sm">
                        {p.metric} {p.metricLabel}
                      </span>
                    )}
                  </div>

                  <h3 className="text-sm font-bold text-white leading-snug font-sans group-hover:text-purple-300 mb-2">
                    {p.title}
                  </h3>
                  
                  {p.company && (
                    <p className="text-[11px] text-gray-400 leading-none mb-3">
                      Corporate Internship: <span className="text-gray-300">{p.company}</span>
                    </p>
                  )}

                  <p className="text-xs text-gray-400 leading-relaxed font-sans mb-4">
                    {p.description}
                  </p>

                  <div className="bg-slate-900/50 p-3 rounded-lg border border-white/5">
                    <span className="block text-[10px] uppercase font-mono text-emerald-400 font-semibold mb-1">
                      Business Impact:
                    </span>
                    <p className="text-[11px] text-gray-300 leading-normal">
                      {p.impact}
                    </p>
                  </div>
                </div>
              </div>

              {/* Tools list footer container */}
              <div className="p-5 pt-0">
                <div className="h-[1px] bg-white/5 w-full mb-3" />
                <div className="flex flex-wrap gap-1">
                  {p.tools.map((t, idx) => (
                    <span
                      key={idx}
                      className="text-[9px] font-mono text-purple-200 bg-white/5 px-2 py-0.5 rounded border border-white/5"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
