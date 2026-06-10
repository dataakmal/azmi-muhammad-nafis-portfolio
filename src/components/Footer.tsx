import { Database, GitFork, ShieldAlert, Cpu } from 'lucide-react';
import { PERSONAL_INFO } from '../data';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const handleSmoothScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <footer className="bg-slate-950 border-t border-white/5 py-12 relative overflow-hidden" id="page-footer">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-4/5 h-[1px] bg-gradient-to-r from-transparent via-purple-500/20 to-transparent" />

      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6 relative z-10">
        
        {/* Brand alignment */}
        <div className="flex items-center gap-2 text-center md:text-left">
          <div className="p-1.5 rounded-lg bg-slate-900 border border-white/10 text-purple-400">
            <Cpu className="w-4 h-4" />
          </div>
          <div>
            <span className="block text-xs font-bold text-white font-mono leading-none">
              {PERSONAL_INFO.name}
            </span>
            <span className="block text-[9px] text-gray-500 mt-0.5 leading-none font-mono">
              Data & Statistics Portfolio
            </span>
          </div>
        </div>



        {/* Back to top or legal block */}
        <div className="flex flex-col items-center md:items-end gap-1 font-mono">
          <button
            onClick={handleSmoothScrollToTop}
            className="text-[10px] text-purple-400 hover:text-purple-300 cursor-pointer transition-colors"
          >
            ▲ Return to Core Parameters
          </button>
          <p className="text-[10px] text-gray-600 mt-1 leading-none">
            © {currentYear} Azmi Muhammad Nafis. All rights reserved.
          </p>
        </div>

      </div>
    </footer>
  );
}
