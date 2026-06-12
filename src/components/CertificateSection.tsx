import { useState } from 'react';
import { Award, FileText, Download, CheckCircle, ShieldCheck, ExternalLink, Calendar, User, Eye, EyeOff } from 'lucide-react';
import { ACHIEVEMENTS, CERTIFICATE_INFO, PERSONAL_INFO } from '../data';

export default function CertificateSection() {
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  const triggerCVDownload = () => {
    window.open('https://drive.google.com/file/d/1acIiLThQdobEuwk5DdGMd5NYWvh0g-Cs/view', '_blank', 'noopener,noreferrer');
  };

  const triggerCertificateDownload = () => {
    window.open('https://drive.google.com/file/d/1-RUCwfKUGnL6n-zYFSZ5wrPv_OXlJvxu/view', '_blank', 'noopener,noreferrer');
  };

  return (
    <section id="achievements" className="py-20 relative bg-slate-950">
      <div id="certificates" /> {/* Anchor for navigation target */}
      
      {/* Background visual highlight */}
      <div className="absolute top-1/2 left-1/3 w-80 h-80 bg-indigo-600/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6">
        
        {/* Section Header */}
        <div className="mb-14 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-300 text-xs font-mono mb-4">
            <Award className="w-3.5 h-3.5" />
            OUTCOMES & CREDENTIALS
          </div>
          <h2 className="text-3xl sm:text-4xl font-sans font-bold text-white tracking-tight">
            Achievements & Certificates
          </h2>
          <div className="h-1 w-12 bg-purple-500 mt-2 rounded" />
        </div>

        {/* Core Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT: Achievement Ambassador Cards */}
          <div className="lg:col-span-7 space-y-6">
            <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider font-mono mb-2 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
              Leadership and Excellence
            </h3>

            {ACHIEVEMENTS.map((ach) => (
              <div
                key={ach.id}
                className="glass-panel p-6 rounded-2xl relative border border-white/5 shadow-xl flex gap-5 items-start group hover:border-amber-500/30 transition-all duration-300"
              >
                {/* Visual badge highlight */}
                <div className="p-3 bg-gradient-to-br from-amber-500/20 to-orange-500/10 rounded-xl border border-amber-500/20 text-amber-300 shadow-md">
                  <Award className="w-6 h-6 animate-pulse" />
                </div>

                <div className="space-y-1.5">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-[9px] uppercase font-mono font-bold tracking-wider text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
                      {ach.label || 'Honour'}
                    </span>
                    <span className="text-[10px] text-gray-500 font-mono flex items-center gap-1">
                      <Calendar className="w-3 h-3" /> 2023
                    </span>
                  </div>
                  <h4 className="text-base font-bold text-white leading-snug group-hover:text-amber-300 transition-colors">
                    {ach.title}
                  </h4>
                  <p className="text-xs text-gray-400 font-mono">
                    Issuer: <span className="text-gray-300 font-semibold">{ach.issuedBy}</span>
                  </p>
                  <p className="text-xs text-gray-400 leading-relaxed font-sans pt-1">
                    {ach.description}
                  </p>

                  <button
                    onClick={triggerCVDownload}
                    className="mt-3 inline-flex items-center gap-1.5 text-[11px] font-mono text-amber-300 hover:text-amber-200 transition-colors"
                  >
                    <FileText className="w-3.5 h-3.5" />
                    Request Ambassador dossier [Verified PDF]
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* RIGHT: Certification Card & CV Download CTA */}
          <div className="lg:col-span-5 space-y-6">
            <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider font-mono mb-2 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-purple-400" />
              Technical Certifications
            </h3>

            {/* Premium Data Engineer Certificate Display */}
            <div className="glass-panel p-6 rounded-2xl border border-white/15 relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-36 h-36 bg-purple-500/5 rounded-full blur-2xl" />
              
              <div className="flex items-center gap-3.5 border-b border-white/5 pb-4 mb-4">
                <div className="p-2.5 rounded-xl bg-purple-500/10 text-purple-400 border border-purple-500/20">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <div>
                  <span className="block text-[10px] font-mono text-gray-500 uppercase">Verified Professional Credential</span>
                  <h4 className="text-base font-bold text-white font-sans">{CERTIFICATE_INFO.title}</h4>
                </div>
              </div>

              <div className="space-y-3 font-sans text-xs">
                <div className="flex justify-between border-b border-white/5 pb-2">
                  <span className="text-gray-500">Certified Recipient</span>
                  <span className="text-white font-medium font-mono">{CERTIFICATE_INFO.owner}</span>
                </div>
                <div className="flex justify-between border-b border-white/5 pb-2">
                  <span className="text-gray-500">Issuer Institution</span>
                  <span className="text-purple-300 font-medium">Data Academy ID</span>
                </div>
                <div className="flex justify-between border-b border-white/5 pb-2">
                  <span className="text-gray-500">Verification Hash</span>
                  <span className="text-emerald-400 font-bold font-mono">CRED-DATAENG-2025</span>
                </div>
              </div>

              {/* Action Buttons inside Card */}
              <div className="grid grid-cols-2 gap-3 mt-5">
                <button
                  onClick={() => setIsPreviewOpen(!isPreviewOpen)}
                  className="flex items-center justify-center gap-1.5 text-xs py-2 px-3 rounded-lg font-medium border border-white/10 text-gray-300 hover:text-white bg-white/5 transition-all cursor-pointer"
                >
                  {isPreviewOpen ? (
                    <>
                      <EyeOff className="w-4 h-4" /> Close Frame
                    </>
                  ) : (
                    <>
                      <Eye className="w-4 h-4" /> Live Preview
                    </>
                  )}
                </button>

                <button
                  onClick={triggerCertificateDownload}
                  className="flex items-center justify-center gap-1.5 text-xs py-2 px-3 rounded-lg font-medium bg-purple-600 hover:bg-purple-500 text-white transition-all cursor-pointer shadow-md shadow-purple-500/20"
                >
                  <ExternalLink className="w-4 h-4" />
                  Get Cert
                </button>
              </div>

              {/* Certificate Preview Modal/Drawer inside component (Self-Contained) */}
              {isPreviewOpen && (
                <div className="mt-4 p-4 rounded-xl bg-slate-950/90 border border-purple-500/30 text-left space-y-3 animate-fadeIn">
                  <div className="flex items-center justify-between border-b border-white/5 pb-1.5">
                    <span className="text-[10px] font-mono text-emerald-400 flex items-center gap-1">
                      <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                      Status: Active
                    </span>
                    <span className="text-[9px] font-mono text-slate-500">CRED-DATAENG-2025-992A</span>
                  </div>
                  <div className="text-center py-3 bg-slate-900 border border-white/5 rounded-lg">
                    <ShieldCheck className="w-8 h-8 text-purple-400 mx-auto mb-1" />
                    <span className="block text-xs font-semibold text-white">3 Days to Be Data Engineer</span>
                    <span className="block text-[10px] text-gray-500 mt-1">recipient: Azmi Muhammad Nafis</span>
                  </div>
                  <p className="text-[10px] text-slate-400 leading-normal">
                    This certifies competence in building scalable storage engines, streaming API pipelines, and configuring Spark analytics clusters.
                  </p>
                </div>
              )}
            </div>

            {/* PRIMARY CALL TO ACTION: Download Full Academic CV Dossier */}
            <div className="bg-gradient-to-br from-indigo-950/80 to-purple-950/80 p-6 rounded-2xl border border-indigo-500/20 shadow-2xl space-y-4">
              <div className="space-y-1.5">
                <h4 className="text-base font-bold text-white font-sans">
                  Need a comprehensive dossier?
                </h4>
                <p className="text-xs text-indigo-200 leading-relaxed font-sans">
                  Acquire Azmi's formatted academic resume containing in-depth project layouts, statistical samplers, and GPA breakdowns.
                </p>
              </div>

              <button
                onClick={triggerCVDownload}
                className="w-full flex items-center justify-center gap-2 text-xs font-bold py-3 rounded-xl cursor-pointer bg-gradient-to-r from-purple-500 to-indigo-600 text-white hover:opacity-90 transform hover:scale-[1.01] active:scale-[0.99] transition-all shadow-lg shadow-purple-500/10"
              >
                <Download className="w-4 h-4" />
                View & Download Professional CV
              </button>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
