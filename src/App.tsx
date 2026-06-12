import { useState, useEffect } from 'react';
import { Database, Download, Code, ArrowRight, ExternalLink, Calendar, Landmark, Server, FileText, CheckCircle2, RefreshCw } from 'lucide-react';
import { PERSONAL_INFO, COUNTERS } from './data';

// Component imports
import ParticlesBg from './components/ParticlesBg';
import KPIDashboard from './components/KPIDashboard';
import Navbar from './components/Navbar';
import AboutSection from './components/AboutSection';
import ExperienceSection from './components/ExperienceSection';
import ProjectsSection from './components/ProjectsSection';
import SkillsSection from './components/SkillsSection';
import CertificateSection from './components/CertificateSection';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';
import { motion, AnimatePresence } from 'motion/react';

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [loadingPercent, setLoadingPercent] = useState(0);
  const [loadingStage, setLoadingStage] = useState('Initializing server arrays...');
  const [activePage, setActivePage] = useState('home');

  // Page sequencing definition for sequential navigation footer
  const pageSequence = [
    { id: 'home', label: 'Cover' },
    { id: 'about', label: 'About Me' },
    { id: 'experience', label: 'Experience' },
    { id: 'projects', label: 'Projects Showcase' },
    { id: 'skills', label: 'Technical Skills' },
    { id: 'honors', label: 'Honors & Credentials' },
    { id: 'contact', label: 'Get In Touch' },
  ];

  const activePageIndex = pageSequence.findIndex((p) => p.id === activePage);
  const prevPage = activePageIndex > 0 ? pageSequence[activePageIndex - 1] : null;
  const nextPage = activePageIndex < pageSequence.length - 1 ? pageSequence[activePageIndex + 1] : null;

  const navigateToPage = (id: string) => {
    setActivePage(id);
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  // Loading screen simulated pipeline
  useEffect(() => {
    const stages = [
      'Ingesting statistics libraries...',
      'Mapping neural network node structures...',
      'Compiling BI interactive modules...',
      'Synchronizing data structures...',
      'Mounting Azmi Nafis Portfolio...',
    ];

    const interval = setInterval(() => {
      setLoadingPercent((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => setIsLoading(false), 300);
          return 100;
        }

        const nextVal = prev + Math.floor(Math.random() * 15 + 8);
        const stageIndex = Math.min(
          stages.length - 1,
          Math.floor((nextVal / 100) * stages.length)
        );
        setLoadingStage(stages[stageIndex]);
        return Math.min(100, nextVal);
      });
    }, 120);

    return () => clearInterval(interval);
  }, []);

  const handleDownloadCVDirect = () => {
    window.open('https://drive.google.com/file/d/1acIiLThQdobEuwk5DdGMd5NYWvh0g-Cs/view', '_blank', 'noopener,noreferrer');
  };

  if (isLoading) {
    /* Startup Loading Screen */
    return (
      <div className="fixed inset-0 z-[100] bg-black flex flex-col items-center justify-center p-6 text-center select-none font-mono">
        {/* Subtle background particles light grid */}
        <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-purple-500/5 to-transparent blur-3xl" />
        
        <div className="space-y-6 max-w-sm w-full relative z-10">
          <div className="relative inline-flex items-center justify-center p-4 bg-slate-900 border border-white/10 rounded-2xl shadow-xl">
            <Database className="w-10 h-10 text-purple-400 animate-spin" />
            <div className="absolute inset-0 border border-purple-500/20 rounded-2xl animate-ping" />
          </div>

          <div className="space-y-2">
            <h1 className="text-sm font-bold tracking-widest uppercase text-white">
              Azmi Muhammad Nafis
            </h1>
            <p className="text-[10px] text-purple-400 font-semibold tracking-wider uppercase">
              PORTFOLIO DATA PIPELINE
            </p>
          </div>

          {/* Progress bar container */}
          <div className="space-y-2.5">
            <div className="h-1.5 w-full bg-slate-900 rounded-full overflow-hidden border border-white/5 p-[1px]">
              <div
                className="h-full bg-gradient-to-r from-purple-500 via-indigo-500 to-blue-500 rounded-full transition-all duration-100"
                style={{ width: `${loadingPercent}%` }}
              />
            </div>
            <div className="flex justify-between items-center text-[10px] text-gray-500 font-bold">
              <span className="text-gray-400 font-sans">{loadingStage}</span>
              <span>{loadingPercent}%</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white relative font-sans overflow-x-hidden antialiased">
      
      {/* Absolute floating background node elements */}
      <div className="absolute top-[10%] left-[5%] w-96 h-96 bg-purple-600/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-[40%] right-[5%] w-[450px] h-[450px] bg-blue-600/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-[20%] left-[10%] w-80 h-80 bg-emerald-600/5 rounded-full blur-[120px] pointer-events-none" />

      {/* Floating Animated Canvas Background */}
      <ParticlesBg />

      {/* Persistent Static Headers with Prop-driven Page State */}
      <Navbar activePage={activePage} setActivePage={navigateToPage} />

      {/* Main Single-Page Content Frame */}
      <div className="relative pt-24 z-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={activePage}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
            className="min-h-[calc(100vh-80px)]"
          >
            {activePage === 'home' && (
              /* MOCKUP DESIGN PRESET: Custom Cover Layout Screen */
              <section className="pt-20 pb-16 min-h-[80vh] flex flex-col justify-center">
                <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
                  
                  {/* Left Side: Modern display typographies paired exactly like Lukman's design cover */}
                  <div className="lg:col-span-7 space-y-7 text-left">
                    
                    <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-purple-600/10 border border-purple-500/20 text-purple-300 text-xs font-mono">
                      <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-pulse" />
                      {PERSONAL_INFO.tagline}
                    </div>

                    <div className="space-y-4">
                      <h1 className="text-5xl sm:text-6xl lg:text-[5.5rem] font-extrabold tracking-tight text-white leading-[1.05] font-sans">
                        I am Azmi
                      </h1>
                      <h2 className="text-4xl sm:text-5xl lg:text-[4.7rem] font-extrabold tracking-tight leading-tight font-sans text-purple-500">
                        Next-Level Data Analyst.
                      </h2>
                    </div>

                    <p className="text-gray-300 text-sm sm:text-base leading-relaxed max-w-xl font-sans">
                      I help companies translate complex commercial datasets and experience problems by building accessible, automated analytics engines and interactive database pipelines.
                    </p>

                    {/* Dual block actions at bottom-left */}
                    <div className="flex flex-wrap gap-4 pt-4">
                      <button
                        onClick={() => navigateToPage('contact')}
                        className="text-xs font-bold px-7 py-3.5 rounded-lg cursor-pointer bg-purple-600 text-white hover:bg-purple-500 transition-all hover:scale-[1.02] shadow-lg shadow-purple-500/25"
                      >
                        Contact Me
                      </button>

                      <button
                        onClick={handleDownloadCVDirect}
                        className="text-xs font-bold px-7 py-3.5 rounded-lg cursor-pointer bg-white text-purple-700 hover:bg-neutral-100 transition-all hover:scale-[1.02] shadow-md"
                      >
                        Download CV
                      </button>
                    </div>

                    {/* Quick stats board summary */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-8 border-t border-white/5">
                      {COUNTERS.map((c, index) => (
                        <div key={index} className="space-y-1">
                          <span className="text-2xl sm:text-3xl font-bold text-white block font-mono text-glow">
                            {c.value}
                          </span>
                          <span className="text-xs font-semibold text-purple-300 block font-sans leading-tight">
                            {c.label}
                          </span>
                        </div>
                      ))}
                    </div>

                  </div>

                  {/* Right Side: Portrait inside wide rounded borders with elegant purple backlight glow */}
                  <div className="lg:col-span-5 flex justify-center lg:justify-end">
                    <div className="relative group w-full max-w-[380px]">
                      
                      {/* Purple ambient backlighting */}
                      <div className="absolute -inset-1 bg-gradient-to-tr from-purple-600 to-indigo-600 rounded-[2.5rem] blur opacity-20 group-hover:opacity-35 transition-all duration-700" />

                      {/* Cover portrait frame with wide smooth rounded corners matching mockup (rounded-[2rem]) */}
                      <div className="relative rounded-[2.5rem] p-2 bg-[#050505] border border-white/10 overflow-hidden shadow-2xl">
                        <div className="relative rounded-[2rem] overflow-hidden aspect-[4/5] bg-neutral-900 border border-white/5">
                          <img
                            src={PERSONAL_INFO.avatarUrl}
                            alt="Azmi Muhammad Nafis - Portfolio Cover"
                            className="w-full h-full object-cover transition-all duration-700 font-sans"
                            referrerPolicy="no-referrer"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                        </div>
                      </div>

                    </div>
                  </div>

                </div>
              </section>
            )}

            {activePage === 'about' && (
              <div className="animate-scaleUp">
                <AboutSection />
              </div>
            )}

            {activePage === 'experience' && (
              <div className="animate-scaleUp">
                <ExperienceSection />
              </div>
            )}

            {activePage === 'projects' && (
              <div className="space-y-12 animate-scaleUp">
                {/* Custom Analytical Simulator Dashboard as centerpiece for data science projects */}
                <section className="max-w-7xl mx-auto px-6 pt-6">
                  <div className="mb-6">
                    <span className="text-xs font-mono text-purple-400 font-bold uppercase tracking-widest block mb-2">LIVE PORTFOLIO SHOWCASE</span>
                    <h3 className="text-2xl font-bold font-sans text-white">Interactive Performance Exhibits</h3>
                    <p className="text-xs text-gray-400 mt-1">Experience live execution of statistical tracking routines designed for commercial microfinance and FMCG pipelines.</p>
                  </div>
                  <KPIDashboard />
                </section>
                <ProjectsSection />
              </div>
            )}

            {activePage === 'skills' && (
              <div className="animate-scaleUp">
                <SkillsSection />
              </div>
            )}

            {activePage === 'honors' && (
              <div className="animate-scaleUp">
                <CertificateSection />
              </div>
            )}

            {activePage === 'contact' && (
              <div className="animate-scaleUp">
                <ContactSection />
              </div>
            )}

            {/* Dynamic Pagination footer matching "buat per page nya" */}
            <div className="max-w-7xl mx-auto px-6 py-10 mt-14 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono tracking-wider text-gray-500 uppercase select-none">
              <div>
                {prevPage ? (
                  <button
                    onClick={() => navigateToPage(prevPage.id)}
                    className="flex items-center gap-2 hover:text-purple-400 transition-colors cursor-pointer group"
                  >
                    <span className="group-hover:-translate-x-1 transition-transform">←</span> Back: {prevPage.label}
                  </button>
                ) : (
                  <span className="text-gray-700">❚ FIRST COVER PAGE</span>
                )}
              </div>
              
              <div className="text-[11px] font-sans text-purple-400 bg-purple-500/5 px-4.5 py-1.5 rounded-full border border-purple-500/10">
                PAGE {activePageIndex + 1} OF 7 &middot; <span className="font-mono text-[10px]">{pageSequence[activePageIndex].label}</span>
              </div>

              <div>
                {nextPage ? (
                  <button
                    onClick={() => navigateToPage(nextPage.id)}
                    className="flex items-center gap-2 hover:text-purple-400 transition-colors cursor-pointer group"
                  >
                    Next: {nextPage.label} <span className="group-hover:translate-x-1 transition-transform">→</span>
                  </button>
                ) : (
                  <span className="text-gray-700">END OF DOSSIER ❚</span>
                )}
              </div>
            </div>

          </motion.div>
        </AnimatePresence>
      </div>

      {/* Global Compact Footer */}
      <Footer />

    </div>
  );
}
