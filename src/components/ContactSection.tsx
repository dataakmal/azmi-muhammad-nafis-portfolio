import { useState, FormEvent } from 'react';
import { Mail, Phone, Linkedin, MapPin, Send, Check, ArrowUpRight, MessageCircle } from 'lucide-react';
import { PERSONAL_INFO } from '../data';

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [formStatus, setFormStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [ticketId, setTicketId] = useState('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      setFormStatus('error');
      return;
    }

    setFormStatus('sending');

    // Simulate database secure write or API ingestion
    setTimeout(() => {
      setFormStatus('success');
      const mockTicketNum = 'TKT-2026-' + Math.floor(Math.random() * 9000 + 1000);
      setTicketId(mockTicketNum);
      setFormData({ name: '', email: '', subject: '', message: '' });
    }, 1500);
  };

  const formattedWhatsAppUrl = `https://wa.me/6289515204969?text=Hi%20Azmi%2C%20I%20visited%20your%20portfolio%20and%20would%20love%20to%20connect%21`;

  return (
    <section id="contact" className="py-20 relative bg-slate-905">
      {/* Visual neon orb */}
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-600/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6">
        
        {/* Section Header */}
        <div className="mb-14 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-300 text-xs font-mono mb-4">
            <Mail className="w-3.5 h-3.5" />
            COMMUNICATION ROUTE
          </div>
          <h2 className="text-3xl sm:text-4xl font-sans font-bold text-white tracking-tight">
            Connect With Me
          </h2>
          <div className="h-1 w-12 bg-blue-500 mt-2 rounded" />
        </div>

        {/* Layout Split: Details and Interactive Form */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
          
          {/* LEFT: Quick Reach Panels */}
          <div className="lg:col-span-5 flex flex-col justify-between gap-6">
            <div className="space-y-4">
              <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider font-mono flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-purple-400" />
                Contact Information
              </h3>
              <p className="text-sm text-gray-400 leading-relaxed font-sans">
                Whether you have a commercial analytics project, require custom Business Intelligence dashboards, or want to co-author statistical work, reach out through whichever medium suits you best.
              </p>
            </div>

            {/* Quick Contact Links */}
            <div className="space-y-4">
              
              {/* Email channel */}
              <a
                href={`mailto:${PERSONAL_INFO.email}`}
                className="glass-panel p-4 rounded-xl border border-white/5 flex items-center justify-between group hover:border-purple-500/30 transition-all cursor-pointer"
              >
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-purple-500/10 text-purple-400 rounded-xl border border-purple-500/20">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="block text-[10px] uppercase font-mono text-gray-500">Official Inbox</span>
                    <span className="block text-sm font-medium text-white group-hover:text-purple-300 transition-colors font-mono">{PERSONAL_INFO.email}</span>
                  </div>
                </div>
                <ArrowUpRight className="w-4 h-4 text-gray-500 group-hover:text-white transition-colors" />
              </a>

              {/* LinkedIn channel */}
              <a
                href={PERSONAL_INFO.linkedin}
                target="_blank"
                rel="noreferrer"
                className="glass-panel p-4 rounded-xl border border-white/5 flex items-center justify-between group hover:border-blue-500/30 transition-all cursor-pointer"
              >
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-blue-500/10 text-blue-400 rounded-xl border border-blue-500/20">
                    <Linkedin className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="block text-[10px] uppercase font-mono text-gray-500">Corporate Sync</span>
                    <span className="block text-sm font-medium text-white group-hover:text-blue-300 transition-colors font-mono">LinkedIn Profile</span>
                  </div>
                </div>
                <ArrowUpRight className="w-4 h-4 text-gray-500 group-hover:text-white transition-colors" />
              </a>

              {/* WhatsApp channel */}
              <a
                href={formattedWhatsAppUrl}
                target="_blank"
                rel="noreferrer"
                className="glass-panel p-4 rounded-xl border border-white/5 flex items-center justify-between group hover:border-emerald-500/30 transition-all cursor-pointer"
              >
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-emerald-500/10 text-emerald-400 rounded-xl border border-emerald-500/20">
                    <MessageCircle className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="block text-[10px] uppercase font-mono text-gray-500">Direct Message</span>
                    <span className="block text-sm font-medium text-white group-hover:text-emerald-300 transition-colors font-mono">{PERSONAL_INFO.phone}</span>
                  </div>
                </div>
                <ArrowUpRight className="w-4 h-4 text-gray-500 group-hover:text-white transition-colors" />
              </a>

              {/* Location display */}
              <div
                className="glass-panel p-4 rounded-xl border border-white/5 flex items-center gap-4"
              >
                <div className="p-3 bg-slate-900 text-gray-400 rounded-xl border border-white/10">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <span className="block text-[10px] uppercase font-mono text-gray-500">Regional Domain</span>
                  <span className="block text-sm font-medium text-white font-sans">{PERSONAL_INFO.location}</span>
                </div>
              </div>

            </div>

            {/* Simulated Inbox Traffic Counter */}
            <div className="bg-slate-950 p-4 rounded-xl border border-white/5 text-center">
              <span className="text-[10px] uppercase font-mono text-gray-500 block mb-1">Standard SLA Response Window</span>
              <span className="text-white text-xs font-semibold">🕒 Typically responds within 12 hours max</span>
            </div>
          </div>

          {/* RIGHT: High Fidelity Inquiry Submission Form */}
          <div className="lg:col-span-7">
            <div className="glass-panel p-6 sm:p-8 rounded-2xl border border-white/10 relative overflow-hidden h-full flex flex-col justify-between">
              
              <div className="absolute top-0 right-0 w-36 h-36 bg-purple-500/5 rounded-full blur-2xl" />

              <div className="mb-6">
                <h3 className="text-base font-bold text-white font-sans">
                  Direct Messaging Console
                </h3>
                <p className="text-xs text-gray-400 mt-1">
                  Submit your payload parameter coordinates to write directly to Azmi's portfolio dashboard.
                </p>
              </div>

              {formStatus === 'success' ? (
                /* Success Layout Screen */
                <div className="flex-1 flex flex-col items-center justify-center text-center p-6 space-y-4 animate-scaleUp">
                  <div className="p-4 bg-emerald-500/10 border border-emerald-500/35 text-emerald-400 rounded-full">
                    <Check className="w-10 h-10 animate-bounce" />
                  </div>
                  <div>
                    <h4 className="text-base font-bold text-white">Payload Ingested Successfully!</h4>
                    <p className="text-xs text-gray-400 mt-1.5 max-w-sm mx-auto">
                      Form telemetry parsed correctly. Azmi has been notified and will trigger a secure response back to your coordinates.
                    </p>
                  </div>
                  <div className="bg-slate-950 p-3 rounded-lg border border-white/5 text-[10px] font-mono text-gray-400">
                    Routing Ticket: <span className="text-emerald-400 font-bold">{ticketId}</span>
                  </div>

                  <button
                    onClick={() => setFormStatus('idle')}
                    className="text-xs font-semibold text-purple-300 hover:text-white transition-colors pt-2 cursor-pointer"
                  >
                    ← Inject another payload
                  </button>
                </div>
              ) : (
                /* Interactive HTML Form fields */
                <form onSubmit={handleSubmit} className="space-y-4 flex-1">
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label htmlFor="form-sender-name" className="block text-[10px] uppercase font-mono text-gray-400 font-semibold">
                        Sender Identity (Name) *
                      </label>
                      <input
                        id="form-sender-name"
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="John Doe"
                        className="w-full text-xs font-sans bg-slate-950 border border-white/5 focus:border-purple-500 focus:outline-none rounded-xl px-4 py-3 text-white transition-all placeholder:text-gray-600"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label htmlFor="form-sender-email" className="block text-[10px] uppercase font-mono text-gray-400 font-semibold">
                        Callback Address (Email) *
                      </label>
                      <input
                        id="form-sender-email"
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="john@organization.com"
                        className="w-full text-xs font-sans bg-slate-950 border border-white/5 focus:border-purple-500 focus:outline-none rounded-xl px-4 py-3 text-white transition-all placeholder:text-gray-600"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label htmlFor="form-subject" className="block text-[10px] uppercase font-mono text-gray-400 font-semibold">
                      Payload Domain (Subject)
                    </label>
                    <input
                      id="form-subject"
                      type="text"
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      placeholder="Custom BI Dashboard / Predictive Modeling Project"
                      className="w-full text-xs font-sans bg-slate-950 border border-white/5 focus:border-purple-500 focus:outline-none rounded-xl px-4 py-3 text-white transition-all placeholder:text-gray-600"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label htmlFor="form-message" className="block text-[10px] uppercase font-mono text-gray-400 font-semibold">
                      Inquiry Payload (Message) *
                      </label>
                    <textarea
                      id="form-message"
                      required
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Specify your business case, dataset requirements, or schedule coordinate details here..."
                      className="w-full text-xs font-sans bg-slate-950 border border-white/5 focus:border-purple-500 focus:outline-none rounded-xl px-4 py-3 text-white transition-all placeholder:text-gray-600 resize-none"
                    />
                  </div>

                  {formStatus === 'error' && (
                    <p className="text-xs text-red-400 font-medium">
                      ⚠ Please fill out all required fields marked with * correctly before submitting.
                    </p>
                  )}

                  <button
                    type="submit"
                    disabled={formStatus === 'sending'}
                    className="w-full flex items-center justify-center gap-2 text-xs font-bold py-3.5 rounded-xl cursor-pointer bg-gradient-to-r from-purple-600 to-indigo-600 text-white hover:opacity-95 transform active:scale-95 transition-all shadow-md shadow-purple-500/10 disabled:opacity-50"
                  >
                    <Send className="w-4 h-4" />
                    {formStatus === 'sending' ? 'Transmitting Pipeline...' : 'Transmit Ingest Pipeline'}
                  </button>

                </form>
              )}

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
