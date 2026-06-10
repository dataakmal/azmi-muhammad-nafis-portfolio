import { useState } from 'react';
import { Menu, X, Database, Terminal, MessageSquare } from 'lucide-react';
import { PERSONAL_INFO } from '../data';

interface NavbarProps {
  activePage: string;
  setActivePage: (page: string) => void;
}

export default function Navbar({ activePage, setActivePage }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);

  // Layout items mirroring the user mockup's refined categorization
  const menuItems = [
    { label: 'Home', id: 'home' },
    { label: 'About', id: 'about' },
    { label: 'Experience', id: 'experience' },
    { label: 'Projects', id: 'projects' },
    { label: 'Skills', id: 'skills' },
    { label: 'Honors', id: 'honors' },
  ];

  return (
    <nav
      id="main-navigation-bar"
      className="fixed top-0 inset-x-0 z-50 bg-black/85 backdrop-blur-md border-b border-white/5 py-4.5 shadow-2xl transition-all"
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        
        {/* Brand Logo - Styled exactly like the mockup: square block enclosing HTML tags, plus the text */}
        <button
          onClick={() => {
            setActivePage('home');
            setIsOpen(false);
          }}
          className="flex items-center gap-3 group text-left cursor-pointer transition-transform duration-300"
          id="navbar-brand-logo-btn"
        >
          <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-white text-black font-extrabold font-mono text-sm leading-none transition-all group-hover:bg-purple-500 group-hover:text-white">
            &lt;/&gt;
          </div>
          <div>
            <span className="block text-base font-extrabold tracking-tight text-white leading-none font-sans">
              azmi
            </span>
            <span className="block text-[9px] text-gray-400 mt-1 leading-none font-mono">
              [data.analyst]
            </span>
          </div>
        </button>

        {/* Center / Right Menu Items */}
        <div className="hidden lg:flex items-center gap-2">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                setActivePage(item.id);
                setIsOpen(false);
              }}
              className={`px-4.5 py-2 text-xs font-semibold rounded-full cursor-pointer tracking-wider transition-all duration-300 ${
                activePage === item.id
                  ? 'bg-purple-500/10 text-purple-300 border border-purple-500/25 shadow-[0_0_15px_rgba(168,85,247,0.07)]'
                  : 'text-gray-300 hover:text-white border border-transparent'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>

        {/* Mockup Action Button: Contact (Solid vibrant purple capsule CTA in the right) */}
        <div className="hidden sm:block">
          <button
            onClick={() => {
              setActivePage('contact');
              setIsOpen(false);
            }}
            className={`flex items-center gap-2 text-xs font-bold px-5.5 py-2.5 rounded-lg cursor-pointer transition-all duration-300 ${
              activePage === 'contact'
                ? 'bg-purple-600 text-white shadow-lg shadow-purple-500/25 hover:bg-purple-500'
                : 'bg-purple-600 text-white hover:bg-purple-500 shadow-md shadow-purple-500/15 hover:scale-[1.02]'
            }`}
            id="nav-contact-cta-btn"
          >
            <MessageSquare className="w-3.5 h-3.5" />
            Contact
          </button>
        </div>

        {/* Mobile Menu Actions */}
        <div className="flex lg:hidden items-center gap-3">
          <button
            onClick={() => {
              setActivePage('contact');
              setIsOpen(false);
            }}
            className="sm:hidden text-xs font-bold px-4 py-2 rounded-lg bg-purple-600 text-white cursor-pointer"
          >
            Contact
          </button>
          
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 text-gray-400 hover:text-white focus:outline-none focus:ring-0"
            aria-label="Toggle navigation list drawer"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

      </div>

      {/* Mobile Drawer Slide Navigation Panel */}
      <div
        className={`lg:hidden fixed top-[67px] inset-x-0 bg-black/95 backdrop-blur-lg border-b border-white/5 transition-all duration-300 overflow-hidden ${
          isOpen ? 'max-h-[380px] opacity-100 py-6 px-6' : 'max-h-0 opacity-0 pointer-events-none'
        }`}
      >
        <div className="grid grid-cols-2 gap-3.5">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                setActivePage(item.id);
                setIsOpen(false);
              }}
              className={`py-3.5 px-4 text-xs font-bold tracking-wider rounded-xl text-left transition-all ${
                activePage === item.id
                  ? 'bg-purple-600/10 text-purple-200 border-l-2 border-purple-500 font-semibold'
                  : 'text-gray-400 hover:text-white bg-white/5'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
}
