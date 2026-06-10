import { BarChart2, ShieldCheck, Database, LineChart, Code } from 'lucide-react';
import { SKILL_CATEGORIES } from '../data';

export default function SkillsSection() {
  const getCategoryIcon = (title: string) => {
    if (title.toLowerCase().includes('programming')) {
      return <Code className="w-5 h-5 text-purple-400" />;
    }
    if (title.toLowerCase().includes('visualization')) {
      return <BarChart2 className="w-5 h-5 text-blue-400" />;
    }
    return <LineChart className="w-5 h-5 text-teal-400" />;
  };

  return (
    <section id="skills" className="py-20 relative bg-slate-900/40">
      {/* Visual background gradient */}
      <div className="absolute top-1/3 right-10 w-80 h-80 bg-purple-600/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6">
        
        {/* Section Header */}
        <div className="mb-16 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-mono mb-4">
            <ShieldCheck className="w-3.5 h-3.5" />
            COMPETENCY MATRIX
          </div>
          <h2 className="text-3xl sm:text-4xl font-sans font-bold text-white tracking-tight">
            Technical Skillset
          </h2>
          <div className="h-1 w-12 bg-indigo-500 mt-2 rounded" />
        </div>

        {/* Skill Card Categories Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {SKILL_CATEGORIES.map((cat, catIdx) => (
            <div
              key={catIdx}
              className="glass-panel p-6 sm:p-8 rounded-2xl relative border border-white/5 shadow-xl flex flex-col justify-between"
              id={`skill-cat-${catIdx}`}
            >
              <div>
                {/* Header title */}
                <div className="flex items-center gap-3 border-b border-white/5 pb-4 mb-6">
                  <div className="p-2 rounded-xl bg-slate-950 border border-white/10 shadow-inner">
                    {getCategoryIcon(cat.title)}
                  </div>
                  <h3 className="text-base font-bold font-sans text-white leading-none">
                    {cat.title}
                  </h3>
                </div>

                {/* Sub-item progress blocks */}
                <div className="space-y-4">
                  {cat.skills.map((skill, sIdx) => (
                    <div key={sIdx} className="space-y-1.5 group">
                      <div className="flex justify-between items-center text-xs font-medium">
                        <span className="text-gray-300 font-sans group-hover:text-white transition-colors duration-200">
                          {skill.name}
                        </span>
                        <span className="text-gray-400 font-mono text-[10px] bg-white/5 px-1.5 py-0.5 rounded">
                          {skill.level}%
                        </span>
                      </div>

                      {/* Animated Linear progress loading block */}
                      <div className="h-2 w-full bg-slate-950/80 rounded-full overflow-hidden border border-white/5">
                        <div
                          className="h-full bg-gradient-to-r from-purple-500 via-indigo-500 to-blue-500 rounded-full transition-all duration-1000 ease-out"
                          style={{ width: `${skill.level}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Card Badge Footer indicators */}
              <div className="mt-8 pt-4 border-t border-white/5 flex items-center justify-between text-[10px] text-gray-500 font-mono">
                <span>Domain Level: Expert</span>
                <span className="text-purple-400">Validated ✦</span>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
