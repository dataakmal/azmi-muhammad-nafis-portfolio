import { Calendar, Briefcase, ChevronRight, Activity, Cpu, Database, Check } from 'lucide-react';
import { EXPERIENCES } from '../data';

export default function ExperienceSection() {
  // Map experiences to stylized icons
  const getExperienceIcon = (id: string) => {
    switch (id) {
      case 'exp1':
        return <Cpu className="w-5 h-5 text-purple-400" />; // Paragon tech automation
      case 'exp2':
        return <Activity className="w-5 h-5 text-blue-400" />; // BRI dashboards
      case 'exp3':
        return <Database className="w-5 h-5 text-teal-400" />; // BPS Kuningan statistics
      default:
        return <Briefcase className="w-5 h-5 text-gray-400" />;
    }
  };

  return (
    <section id="experience" className="py-20 relative bg-slate-900/40">
      {/* Dynamic graphic accents */}
      <div className="absolute top-1/2 right-0 w-80 h-80 bg-blue-600/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6">
        
        {/* Section Header */}
        <div className="mb-16 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-300 text-xs font-mono mb-4">
            <Briefcase className="w-3.5 h-3.5" />
            PROFESSIONAL ROLES
          </div>
          <h2 className="text-3xl sm:text-4xl font-sans font-bold text-white tracking-tight">
            Work Experience
          </h2>
          <div className="h-1 w-12 bg-blue-500 mt-2 rounded" />
        </div>

        {/* Vertical Timeline Wrapper */}
        <div className="relative border-l border-white/5 max-w-4xl mx-auto space-y-12 pl-6 sm:pl-10">
          
          {EXPERIENCES.map((exp, idx) => (
            <div key={exp.id} className="relative group">
              
              {/* Chronological pointer indicator block */}
              <div className="absolute -left-[45px] sm:-left-[61px] top-1.5 w-10 h-10 rounded-xl bg-slate-950 border border-white/10 flex items-center justify-center group-hover:border-purple-500/50 group-hover:bg-slate-900 group-hover:scale-105 transition-all shadow-md">
                {getExperienceIcon(exp.id)}
              </div>

              {/* Company & Role Glassmorphism Card */}
              <div className="glass-panel p-6 sm:p-8 rounded-2xl relative overflow-hidden group border border-white/5 shadow-xl hover:border-white/10 transition-all duration-300">
                {/* Subtle decorative linear grid inside top card */}
                <div className="absolute top-0 right-0 w-44 h-44 bg-gradient-to-bl from-white/3 to-transparent pointer-events-none rounded-bl-full" />
                
                {/* Header Information */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 border-b border-white/5 pb-4">
                  <div>
                    <span className="text-xs font-bold font-mono text-purple-400 bg-purple-500/10 px-2.5 py-1 rounded-md mb-2 inline-block">
                      {exp.period}
                    </span>
                    <h3 className="text-lg sm:text-xl font-bold font-sans text-white group-hover:text-purple-300 transition-colors">
                      {exp.role}
                    </h3>
                    <p className="text-sm text-gray-300 font-medium mt-1 leading-none">
                      {exp.company}
                    </p>
                  </div>

                  <div className="flex items-center gap-2 text-xs font-mono text-gray-500 bg-white/5 px-3 py-1.5 rounded-lg self-start sm:self-auto">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>Internship</span>
                  </div>
                </div>

                {/* Bullet Points with checkmarks */}
                <div className="space-y-3">
                  {exp.responsibilities.map((resp, bulletIdx) => (
                    <div key={bulletIdx} className="flex items-start gap-3 text-slate-300 text-xs sm:text-sm leading-relaxed">
                      <div className="p-1 rounded-md bg-purple-500/10 text-purple-400 border border-purple-500/20 shrink-0 mt-0.5">
                        <Check className="w-3 h-3" />
                      </div>
                      <span>{resp}</span>
                    </div>
                  ))}
                </div>

                {/* Small indicator at bottom-right */}
                <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between">
                  <span className="text-[10px] font-mono text-slate-500">
                    Portfolio Timeline Node #{idx + 1}
                  </span>
                  <div className="flex items-center gap-1.5 text-xs text-purple-400 font-medium group-hover:translate-x-1 transition-transform">
                    <span>Performance Analytics Verified</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </div>
                </div>

              </div>
            </div>
          ))}

        </div>

      </div>
    </section>
  );
}
