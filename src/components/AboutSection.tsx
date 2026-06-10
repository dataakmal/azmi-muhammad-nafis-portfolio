import { BookOpen, GraduationCap, Calendar, Award, Star, BookMarked, Activity, CheckCircle } from 'lucide-react';
import { PERSONAL_INFO, EDUCATION } from '../data';

export default function AboutSection() {
  const milestones = [
    {
      year: '2022',
      title: 'Academic Foundations',
      description: 'Enrolled in Bachelor of Statistics at Universitas Padjadjaran. Focused on foundational mathematics, programming in R, and statistical modeling.',
      icon: <GraduationCap className="w-4 h-4 text-purple-400" />,
    },
    {
      year: '2023',
      title: 'Ambassadorial Representation',
      description: 'Elected "Putra HIMASTA" (Statistics Department Ambassador) and "Putra Favourite FMIPA" for excellence in communications and interpersonal representation.',
      icon: <Star className="w-4 h-4 text-amber-400" />,
    },
    {
      year: '2024',
      title: 'Advanced Analytics Specialization',
      description: 'Mastered predictive modeling (Regression, Time Series) and database technologies (SQL, Python), pivoting into machine learning workflows.',
      icon: <BookMarked className="w-4 h-4 text-blue-400" />,
    },
    {
      year: '2025',
      title: 'Ecosystem and Government Internships',
      description: 'Worked with Bank Rakyat Indonesia on SME KPI evaluations, followed by validation and consistency checks on national datasets at BPS Kuningan.',
      icon: <Activity className="w-4 h-4 text-emerald-400" />,
    },
    {
      year: '2026',
      title: 'Automation Engineering & Graduation',
      description: 'Developed automated outreach engines at PT Paragon, compressing multi-day efforts into 30 minutes. Graduated with a 3.52 GPA.',
      icon: <CheckCircle className="w-4 h-4 text-indigo-400" />,
    },
  ];

  return (
    <section id="about" className="py-20 relative bg-slate-950">
      {/* Decorative gradient orb */}
      <div className="absolute top-1/3 left-0 w-72 h-72 bg-purple-600/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6">
        
        {/* Section Header */}
        <div className="mb-12 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-300 text-xs font-mono mb-4">
            <BookOpen className="w-3.5 h-3.5" />
            BACKGROUND INTRO
          </div>
          <h2 className="text-3xl sm:text-4xl font-sans font-bold text-white tracking-tight">
            About Me
          </h2>
          <div className="h-1 w-12 bg-purple-500 mt-2 rounded" />
        </div>

        {/* Profile Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Narrative description */}
          <div className="lg:col-span-7 space-y-6">
            <p className="text-gray-300 text-base leading-relaxed font-sans">
              {PERSONAL_INFO.detailedAbout}
            </p>

            <div className="bg-slate-900/40 p-5 rounded-xl border border-white/5 space-y-3">
              <h4 className="text-sm font-semibold text-white tracking-wider uppercase font-mono flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-purple-500" />
                Intersectoral Analytical Value
              </h4>
              <p className="text-xs text-gray-400 leading-relaxed">
                By bridging statistical theory, programming efficiency, and intuitive commercial intuition, I act as an operational catalyst. Whether it is standardizing live stream GMV datasets or pruning critical resource overheads in micro-merchandise ecosystems, my goal is to deliver reproducible, bulletproof analyses.
              </p>
            </div>

            {/* Academic Card */}
            <div className="glass-panel p-6 rounded-2xl relative overflow-hidden group border border-white/10 shadow-lg">
              <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/5 rounded-full blur-2xl group-hover:bg-purple-500/10 transition-colors" />
              
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/5 pb-4 mb-4">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-purple-600/15 border border-purple-500/20 text-purple-300">
                    <GraduationCap className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-white leading-snug">{EDUCATION.university}</h3>
                    <p className="text-xs text-purple-300 font-medium">{EDUCATION.degree}</p>
                  </div>
                </div>
                <div className="flex flex-row sm:flex-col items-baseline sm:items-end gap-2 sm:gap-0 font-mono">
                  <span className="text-xs text-slate-500 font-semibold uppercase">Cumulative GPA</span>
                  <span className="text-lg font-bold text-emerald-400">{EDUCATION.gpa}</span>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="sm:col-span-1">
                  <div className="flex items-center gap-1.5 text-xs text-gray-500 mb-1.5 font-sans">
                    <Calendar className="w-3.5 h-3.5" />
                    Enrolled Period
                  </div>
                  <span className="text-xs text-white font-mono">{EDUCATION.period}</span>
                </div>

                <div className="sm:col-span-2">
                  <div className="flex items-center gap-1.5 text-xs text-gray-500 mb-1.5 font-sans">
                    <Award className="w-3.5 h-3.5" />
                    Specialized Coursework Focus
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {EDUCATION.coursework.map((course, idx) => (
                      <span
                        key={idx}
                        className="text-[10px] px-2 py-0.5 rounded-md bg-white/5 border border-white/5 text-gray-300 font-mono"
                      >
                        {course}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Chronological Milestone Timeline */}
          <div className="lg:col-span-5">
            <div className="glass-panel p-6 rounded-2xl border border-white/10" id="academic-journey-timeline">
              <h3 className="text-sm font-bold text-white tracking-wider uppercase font-mono mb-6 flex items-center gap-2">
                Course of Development
              </h3>

              <div className="relative border-l border-white/5 space-y-6 pl-4 ml-2">
                {milestones.map((ms, idx) => (
                  <div key={idx} className="relative group">
                    {/* Node Pointer indicator */}
                    <div className="absolute -left-[24px] top-1 w-4 h-4 rounded-full bg-slate-900 border border-white/20 flex items-center justify-center group-hover:border-purple-400 group-hover:scale-110 transition-all">
                      {ms.icon}
                    </div>

                    <div>
                      <span className="inline-block text-[10px] font-bold font-mono tracking-wide text-purple-400 bg-purple-500/10 px-2 py-0.5 rounded mb-1">
                        {ms.year}
                      </span>
                      <h4 className="text-xs font-bold text-white font-sans group-hover:text-purple-300 transition-colors">
                        {ms.title}
                      </h4>
                      <p className="text-[11px] text-gray-400 mt-1 leading-normal transition-colors group-hover:text-gray-300">
                        {ms.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
