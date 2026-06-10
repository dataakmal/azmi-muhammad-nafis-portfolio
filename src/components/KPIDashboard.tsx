import { useState, useEffect } from 'react';
import { Play, Pause, RefreshCw, BarChart2, TrendingUp, Users, ShoppingCart, Percent, Layers, Landmark } from 'lucide-react';

export default function KPIDashboard() {
  const [activeTab, setActiveTab] = useState<'paragon' | 'bri'>('paragon');
  const [isSimulating, setIsSimulating] = useState(true);
  const [speedMultiplier, setSpeedMultiplier] = useState(1);
  const [ticker, setTicker] = useState(0);

  // Live Paragon Simulated State
  const [paragonMetrics, setParagonMetrics] = useState({
    dailyGmv: 42800000, // IDR
    affiliateContacts: 214,
    automationSavedHours: 124.5,
    sentimentsPos: 76,
    liveSKUs: [
      { name: 'Wardah Matte Lipstick', growth: 18.4, sales: 1250 },
      { name: 'Kahf Face Wash', growth: 24.1, sales: 980 },
      { name: 'Make Over Cushion', growth: 12.5, sales: 840 },
    ],
  });

  // Live BRI Simulated State
  const [briMetrics, setBriMetrics] = useState({
    activeBrilinkMerchants: 1420,
    savingsVolume: 8450000000, // IDR
    inactiveAccountsIdentified: 204,
    averageQrisResponseTimeMs: 124,
    branchScores: [
      { name: 'Siliwangi Branch', score: 94 },
      { name: 'Kuningan Central', score: 88 },
      { name: 'Bogor Outer Branch', score: 91 },
    ],
  });

  // Real-time animation cycle
  useEffect(() => {
    if (!isSimulating) return;

    const interval = setInterval(() => {
      setTicker((prev) => prev + 1);

      if (activeTab === 'paragon') {
        setParagonMetrics((prev) => {
          const deltaGmv = (Math.random() - 0.4) * 850000 * speedMultiplier;
          const deltaHours = Math.random() > 0.7 ? 0.5 : 0;
          return {
            ...prev,
            dailyGmv: Math.max(38000000, Math.floor(prev.dailyGmv + deltaGmv)),
            automationSavedHours: +(prev.automationSavedHours + deltaHours).toFixed(1),
          };
        });
      } else {
        setBriMetrics((prev) => {
          const deltaRate = (Math.random() - 0.5) * 4 * speedMultiplier;
          const deltaSavings = (Math.random() - 0.3) * 15000000 * speedMultiplier;
          return {
            ...prev,
            averageQrisResponseTimeMs: Math.max(85, Math.min(180, Math.floor(prev.averageQrisResponseTimeMs + deltaRate))),
            savingsVolume: Math.max(8100000000, Math.floor(prev.savingsVolume + deltaSavings)),
          };
        });
      }
    }, 1200);

    return () => clearInterval(interval);
  }, [isSimulating, activeTab, speedMultiplier]);

  const resetSimulation = () => {
    setParagonMetrics({
      dailyGmv: 42800000,
      affiliateContacts: 214,
      automationSavedHours: 124.5,
      sentimentsPos: 76,
      liveSKUs: [
        { name: 'Wardah Matte Lipstick', growth: 18.4, sales: 1250 },
        { name: 'Kahf Face Wash', growth: 24.1, sales: 980 },
        { name: 'Make Over Cushion', growth: 12.5, sales: 840 },
      ],
    });

    setBriMetrics({
      activeBrilinkMerchants: 1420,
      savingsVolume: 8450000000,
      inactiveAccountsIdentified: 204,
      averageQrisResponseTimeMs: 124,
      branchScores: [
        { name: 'Siliwangi Branch', score: 94 },
        { name: 'Kuningan Central', score: 88 },
        { name: 'Bogor Outer Branch', score: 91 },
      ],
    });
    setTicker(0);
  };

  const formatIDR = (num: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      maximumFractionDigits: 0,
    }).format(num);
  };

  // Generate coordinate lines for customized SVG charts
  const getLinePoints = () => {
    // Return sample graphical trend line matching dynamic ticks
    if (activeTab === 'paragon') {
      const baseValues = [41.2, 41.8, 39.5, 42.4, 43.1, 42.8];
      // Modify last item based on actual state, scaled 0 to 100 height
      const currentVal = (paragonMetrics.dailyGmv / 1000000);
      const values = [...baseValues.slice(1), currentVal];
      const maxVal = Math.max(...values);
      const minVal = Math.min(...values);
      const range = maxVal - minVal || 1;

      return values.map((v, idx) => {
        const x = (idx / 5) * 260 + 20;
        const y = 80 - ((v - minVal) / range) * 50;
        return `${x},${y}`;
      }).join(' ');
    } else {
      const baseValues = [82, 85, 83, 86, 84, 84.5];
      const currentVal = (briMetrics.savingsVolume / 100000000);
      const values = [...baseValues.slice(1), currentVal];
      const maxVal = Math.max(...values);
      const minVal = Math.min(...values);
      const range = maxVal - minVal || 1;

      return values.map((v, idx) => {
        const x = (idx / 5) * 260 + 20;
        const y = 80 - ((v - minVal) / range) * 50;
        return `${x},${y}`;
      }).join(' ');
    }
  };

  return (
    <div className="glass-panel rounded-2xl overflow-hidden shadow-2xl relative border border-white/10" id="kpi-dashboard-widget">
      {/* Glow highlight */}
      <div className="absolute top-0 left-1/4 right-1/4 h-[1px] bg-gradient-to-r from-transparent via-purple-500/50 to-transparent" />

      {/* Header Controls */}
      <div className="px-6 py-5 border-b border-white/5 bg-slate-900/40 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="relative flex h-2 w-2">
              <span className={`animate-ping absolute inline-flex h-full w-full rounded-full ${isSimulating ? 'bg-emerald-400' : 'bg-amber-400'} opacity-75`}></span>
              <span className={`relative inline-flex rounded-full h-2 w-2 ${isSimulating ? 'bg-emerald-500' : 'bg-amber-500'}`}></span>
            </span>
            <span className="text-xs font-mono text-gray-400 uppercase tracking-wider">Interactive BI Simulation</span>
          </div>
          <h4 className="text-lg font-bold font-sans text-white">Live Execution Performance Playground</h4>
        </div>

        {/* Tab Selector */}
        <div className="flex bg-slate-950/80 p-1 rounded-lg border border-white/5 self-start sm:self-auto">
          <button
            onClick={() => setActiveTab('paragon')}
            className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all ${
              activeTab === 'paragon'
                ? 'bg-purple-600/20 text-purple-200 border-b border-purple-500/50 shadow-sm'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            FMCG Stream (Paragon)
          </button>
          <button
            onClick={() => setActiveTab('bri')}
            className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all ${
              activeTab === 'bri'
                ? 'bg-blue-600/20 text-blue-200 border-b border-blue-500/50 shadow-sm'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            Micro Finance (BRI)
          </button>
        </div>
      </div>

      {/* Main Content Dashboard Layout */}
      <div className="p-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* LEFT COLUMN: Main KPI Metrics */}
        <div className="space-y-4 lg:col-span-2">
          {activeTab === 'paragon' ? (
            /* PARAGON SCREEN */
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-slate-900/60 p-4 rounded-xl border border-white/5 flex flex-col justify-between">
                <div className="flex items-center justify-between text-gray-400 mb-3">
                  <span className="text-xs font-medium">Daily GMV (Live)</span>
                  <ShoppingCart className="w-4 h-4 text-purple-400" />
                </div>
                <div>
                  <div className="text-xl font-bold text-white font-mono leading-none tracking-tight">
                    {formatIDR(paragonMetrics.dailyGmv)}
                  </div>
                  <p className="text-[10px] text-gray-500 mt-1 flex items-center gap-1">
                    <span className="text-emerald-400 font-medium">✦ MoM +14.2%</span> from real-time stream
                  </p>
                </div>
              </div>

              <div className="bg-slate-900/60 p-4 rounded-xl border border-white/5 flex flex-col justify-between">
                <div className="flex items-center justify-between text-gray-400 mb-3">
                  <span className="text-xs font-medium">Outreach Automations</span>
                  <Users className="w-4 h-4 text-purple-400" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-white font-mono leading-none">
                    {paragonMetrics.affiliateContacts} <span className="text-sm font-sans text-gray-400">contacts</span>
                  </div>
                  <p className="text-[10px] text-gray-500 mt-1">
                    ML-Automated 200+ affiliates
                  </p>
                </div>
              </div>

              <div className="bg-slate-900/60 p-4 rounded-xl border border-white/5 flex flex-col justify-between">
                <div className="flex items-center justify-between text-gray-400 mb-3">
                  <span className="text-xs font-medium">Hours Transformed</span>
                  <TrendingUp className="w-4 h-4 text-purple-400" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-white font-mono leading-none">
                    {paragonMetrics.automationSavedHours} <span className="text-sm font-sans text-emerald-400">Hrs Saved</span>
                  </div>
                  <p className="text-[10px] text-gray-500 mt-1 text-purple-300 font-medium">
                    ⚡ Accelerates workflow by 99%
                  </p>
                </div>
              </div>
            </div>
          ) : (
            /* BRI SCREEN */
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-slate-900/60 p-4 rounded-xl border border-white/5 flex flex-col justify-between">
                <div className="flex items-center justify-between text-gray-400 mb-3">
                  <span className="text-xs font-medium">Savings Volume</span>
                  <Landmark className="w-4 h-4 text-blue-400" />
                </div>
                <div>
                  <div className="text-xl font-bold text-white font-mono leading-none tracking-tight">
                    {formatIDR(briMetrics.savingsVolume)}
                  </div>
                  <p className="text-[10px] text-gray-500 mt-1">
                    27 regional branches monitored
                  </p>
                </div>
              </div>

              <div className="bg-slate-900/60 p-4 rounded-xl border border-white/5 flex flex-col justify-between">
                <div className="flex items-center justify-between text-gray-400 mb-3">
                  <span className="text-xs font-medium">BRILink Agents</span>
                  <Layers className="w-4 h-4 text-blue-400" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-white font-mono leading-none">
                    {briMetrics.activeBrilinkMerchants} <span className="text-sm font-sans text-gray-400">merchants</span>
                  </div>
                  <p className="text-[10px] text-gray-500 mt-1 text-emerald-400 font-medium">
                    Active transaction streams
                  </p>
                </div>
              </div>

              <div className="bg-slate-900/60 p-4 rounded-xl border border-white/5 flex flex-col justify-between">
                <div className="flex items-center justify-between text-gray-400 mb-3">
                  <span className="text-xs font-medium">Inactive SMEs Removed</span>
                  <Percent className="w-4 h-4 text-blue-400" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-white font-mono leading-none">
                    {briMetrics.inactiveAccountsIdentified} <span className="text-sm font-sans text-red-400">Accounts</span>
                  </div>
                  <p className="text-[10px] text-gray-500 mt-1">
                    Optimized cost overheads
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Graphical Trends Section */}
          <div className="bg-slate-950/60 p-5 rounded-xl border border-white/5">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h5 className="text-xs font-semibold text-white tracking-wider uppercase font-mono">
                  {activeTab === 'paragon' ? 'Paragon Live Campaign Trends (GMV x10^6)' : 'BRI District Branch Savings Flow (Volume x10^8)'}
                </h5>
                <p className="text-[10px] text-gray-500">Continuous interval trend analysis</p>
              </div>
              <span className="text-[10px] font-mono text-gray-400 bg-white/5 px-2 py-0.5 rounded">
                Live Poll #{ticker}
              </span>
            </div>

            {/* Custom SVG Sparkline Graph */}
            <div className="relative h-28 w-full mt-2">
              <svg className="w-full h-full overflow-visible" viewBox="0 0 300 100" preserveAspectRatio="none">
                {/* SVG Gradients */}
                <defs>
                  <linearGradient id="purpleGlow" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#c084fc" stopOpacity="0.4" />
                    <stop offset="100%" stopColor="#c084fc" stopOpacity="0.0" />
                  </linearGradient>
                  <linearGradient id="blueGlow" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.4" />
                    <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.0" />
                  </linearGradient>
                </defs>

                {/* Grid guidelines */}
                <line x1="20" y1="20" x2="280" y2="20" stroke="rgba(255,255,255,0.03)" strokeDasharray="3 3" />
                <line x1="20" y1="50" x2="280" y2="50" stroke="rgba(255,255,255,0.03)" strokeDasharray="3 3" />
                <line x1="20" y1="80" x2="280" y2="80" stroke="rgba(255,255,255,0.03)" strokeDasharray="3 3" />

                {/* Area path */}
                <path
                  d={`M 20,80 L ${getLinePoints()} L 280,80 Z`}
                  fill={activeTab === 'paragon' ? 'url(#purpleGlow)' : 'url(#blueGlow)'}
                />

                {/* Line path */}
                <polyline
                  fill="none"
                  stroke={activeTab === 'paragon' ? '#c084fc' : '#3b82f6'}
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  points={getLinePoints()}
                />

                {/* Live pulsing coordinate marker */}
                <circle
                  cx="280"
                  cy={getLinePoints().split(' ').pop()?.split(',')[1] || '50'}
                  r="4"
                  fill={activeTab === 'paragon' ? '#c084fc' : '#3b82f6'}
                  className="animate-pulse"
                />
              </svg>

              {/* Chart labels */}
              <div className="absolute bottom-0 inset-x-2 flex justify-between text-[9px] font-mono text-gray-500 bg-transparent">
                <span>Period T-5</span>
                <span>T-4</span>
                <span>T-3</span>
                <span>T-2</span>
                <span>T-1</span>
                <span className="text-white">Active</span>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Performance Breakdowns / Parameters */}
        <div className="space-y-4">
          <div className="bg-slate-900/60 p-5 rounded-xl border border-white/5 flex flex-col justify-between h-full">
            <div>
              <h5 className="text-xs font-semibold text-white tracking-wider uppercase font-mono mb-3">
                {activeTab === 'paragon' ? 'Top Brand SKUs Performance' : 'Branch Health Assessment'}
              </h5>
              <div className="space-y-3">
                {activeTab === 'paragon' ? (
                  paragonMetrics.liveSKUs.map((sku, index) => (
                    <div key={index} className="space-y-1">
                      <div className="flex justify-between text-xs">
                        <span className="text-gray-300 font-medium">{sku.name}</span>
                        <span className="text-purple-300 font-mono font-medium">+{sku.growth}%</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="h-1.5 w-full bg-slate-950 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full transition-all duration-500"
                            style={{ width: `${(sku.sales / 1500) * 100}%` }}
                          />
                        </div>
                        <span className="text-[10px] font-mono text-gray-500 w-8 text-right">{sku.sales}</span>
                      </div>
                    </div>
                  ))
                ) : (
                  briMetrics.branchScores.map((branch, index) => (
                    <div key={index} className="space-y-1">
                      <div className="flex justify-between text-xs">
                        <span className="text-gray-300 font-medium">{branch.name}</span>
                        <span className="text-blue-300 font-mono font-medium">{branch.score} pts</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="h-1.5 w-full bg-slate-950 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-blue-500 to-teal-500 rounded-full transition-all duration-500"
                            style={{ width: `${branch.score}%` }}
                          />
                        </div>
                        <span className="text-[10px] font-mono text-gray-500 w-8 text-right">{branch.score}%</span>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Simulated Speed / Dynamic Parameters Panel */}
            <div className="mt-5 pt-4 border-t border-white/5 space-y-3">
              <div className="flex items-center justify-between text-[11px]">
                <span className="text-gray-400 flex items-center gap-1.5">
                  <BarChart2 className="w-3.5 h-3.5 text-gray-500" />
                  Simulation Velocity
                </span>
                <span className="text-white font-mono font-medium">{speedMultiplier}x</span>
              </div>

              {/* Click Velocity Multiplier */}
              <div className="flex gap-1.5">
                {[1, 2, 5].map((multiplier) => (
                  <button
                    key={multiplier}
                    onClick={() => setSpeedMultiplier(multiplier)}
                    className={`flex-1 text-[10px] font-mono py-1 rounded transition-colors ${
                      speedMultiplier === multiplier
                        ? 'bg-purple-600/30 text-purple-200 border border-purple-500/30'
                        : 'bg-white/5 text-gray-400 hover:text-white'
                    }`}
                  >
                    {multiplier}x speed
                  </button>
                ))}
              </div>

              {/* Simulation Controls */}
              <div className="flex gap-2 pt-1.5">
                <button
                  onClick={() => setIsSimulating(!isSimulating)}
                  className={`flex-1 flex items-center justify-center gap-1.5 text-xs py-2 rounded-lg font-medium transition-colors ${
                    isSimulating
                      ? 'bg-amber-600/20 text-amber-300 border border-amber-500/30 hover:bg-amber-600/30'
                      : 'bg-emerald-600/25 text-emerald-200 border border-emerald-500/30 hover:bg-emerald-600/35'
                  }`}
                >
                  {isSimulating ? (
                    <>
                      <Pause className="w-3.5 h-3.5" /> Pause Sync
                    </>
                  ) : (
                    <>
                      <Play className="w-3.5 h-3.5" /> Resume Sync
                    </>
                  )}
                </button>

                <button
                  onClick={resetSimulation}
                  title="Reset Metrics"
                  className="px-3 bg-slate-900 border border-white/10 text-gray-400 hover:text-white rounded-lg transition-colors flex items-center justify-center"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
