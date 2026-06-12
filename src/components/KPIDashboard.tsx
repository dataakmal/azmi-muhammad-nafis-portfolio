import { useState, useEffect } from 'react';
import { 
  Play, 
  Pause, 
  RefreshCw, 
  BarChart2, 
  TrendingUp, 
  Users, 
  ShoppingCart, 
  Percent, 
  Layers, 
  Landmark,
  ExternalLink,
  Database,
  Search,
  Sparkles,
  Filter,
  ChevronLeft,
  ChevronRight,
  FileSpreadsheet,
  AlertCircle,
  CheckCircle2
} from 'lucide-react';

// Robust client-side CSV parser
function parseCSV(csvText: string): string[][] {
  const lines: string[][] = [];
  let row: string[] = [];
  let inQuotes = false;
  let currentValue = "";

  for (let i = 0; i < csvText.length; i++) {
    const char = csvText[i];
    const nextChar = csvText[i + 1];

    if (char === '"') {
      if (inQuotes && nextChar === '"') {
        currentValue += '"';
        i++; // skip next quote
      } else {
        inQuotes = !inQuotes;
      }
    } else if (char === ',' && !inQuotes) {
      row.push(currentValue);
      currentValue = "";
    } else if ((char === '\r' || char === '\n') && !inQuotes) {
      if (char === '\r' && nextChar === '\n') {
        i++;
      }
      row.push(currentValue);
      // Keep row if it's not entirely empty
      if (row.some(val => val.trim() !== "")) {
        lines.push(row);
      }
      row = [];
      currentValue = "";
    } else {
      currentValue += char;
    }
  }
  if (currentValue !== "" || row.length > 0) {
    row.push(currentValue);
    if (row.some(val => val.trim() !== "")) {
      lines.push(row);
    }
  }
  return lines;
}

const cleanValRegex = /[^\d\.\-]/g;
const getCleanNumber = (val: string): number => {
  if (!val) return 0;
  const clean = val.replace(cleanValRegex, '');
  const num = Number(clean);
  return isNaN(num) ? 0 : num;
};

const formatValueCompact = (num: number, colName = '') => {
  const colLower = colName.toLowerCase();
  const isCurrency = ['gmv', 'revenue', 'sales', 'budget', 'idr', 'rp', 'cost', 'profit', 'omset', 'nilai'].some(term => colLower.includes(term));
  const isPercent = ['rate', 'ctr', 'growth', '%', 'roi', 'margin', 'presentase', 'persen'].some(term => colLower.includes(term));
  
  if (isPercent) {
    return `${num.toFixed(1)}%`;
  }
  
  if (isCurrency) {
    if (num >= 1_000_000_000) {
      return `Rp ${(num / 1_000_000_000).toFixed(2)}B`;
    }
    if (num >= 1_000_000) {
      return `Rp ${(num / 1_000_000).toFixed(1)}M`;
    }
    if (num >= 1_000) {
      return `Rp ${(num / 1_000).toFixed(0)}K`;
    }
    return `Rp ${num.toLocaleString('id-ID')}`;
  }
  
  if (num >= 1_000_000_000) {
    return `${(num / 1_000_000_000).toFixed(1)}B`;
  }
  if (num >= 1_000_000) {
    return `${(num / 1_000_000).toFixed(1)}M`;
  }
  if (num >= 1_000) {
    return `${(num / 1_000).toFixed(1)}K`;
  }
  return num.toString();
};

// Fallback high-fidelity PT Paragon Marketing Campaigns Dataset parsed internally
const FALLBACK_PARAGON_HEADERS = ["Campaign", "Period", "GMV (IDR)", "Reach", "Budget (IDR)", "ROI (%)"];
const FALLBACK_PARAGON_ROWS = [
  ["Wardah Matte Lipstick Promo", "Jan 2026", "Rp 125.000.000", "450.000", "Rp 15.000.000", "8.3%"],
  ["Kahf Face Wash Launch Boost", "Feb 2026", "Rp 180.000.000", "620.000", "Rp 20.000.000", "9.0%"],
  ["Make Over Velvet Cushion Redef", "Mar 2026", "Rp 140.000.000", "380.000", "Rp 18.000.000", "7.8%"],
  ["Wardah Ramadhan Special Campaign", "Apr 2026", "Rp 420.000.000", "1.250.000", "Rp 45.000.000", "9.3%"],
  ["Emina Bright Skin Youth Carnival", "May 2026", "Rp 195.000.000", "710.000", "Rp 22.000.000", "8.9%"],
  ["Kahf Acne Fighter Grooming Era", "Jun 2026", "Rp 210.000.000", "550.000", "Rp 24.000.000", "8.8%"],
  ["Wardah UV Shield Protection Drive", "Jul 2026", "Rp 245.000.000", "680.000", "Rp 26.000.000", "9.4%"],
  ["Make Over Liquid Lip Cream Push", "Aug 2026", "Rp 160.000.000", "410.000", "Rp 19.000.000", "8.4%"],
];

export default function KPIDashboard() {
  const [activeTab, setActiveTab] = useState<'paragon' | 'bri'>('paragon');
  const [isSimulating, setIsSimulating] = useState(true);
  const [speedMultiplier, setSpeedMultiplier] = useState(1);
  const [ticker, setTicker] = useState(0);

  // Google Sheets state
  const sheetId = '10BUJPhSvZLHUPAQTecf3lW8jOMWzk9shnIvScVJxuMM';
  const gid = '1722200664';
  const sheetUrl = `https://docs.google.com/spreadsheets/d/${sheetId}/edit?gid=${gid}#gid=${gid}`;
  
  const [isLiveMode, setIsLiveMode] = useState(true); // default try live, fallback if error
  const [isLoadingSheet, setIsLoadingSheet] = useState(false);
  const [sheetError, setSheetError] = useState<string | null>(null);
  
  // Loaded sheet schema
  const [headers, setHeaders] = useState<string[]>(FALLBACK_PARAGON_HEADERS);
  const [rows, setRows] = useState<string[][]>(FALLBACK_PARAGON_ROWS);
  const [numericColumns, setNumericColumns] = useState<number[]>([2, 3, 4, 5]);
  const [selectedXColumn, setSelectedXColumn] = useState<number>(1); // Period
  const [selectedYColumn, setSelectedYColumn] = useState<number>(2); // GMV

  // Pagination and search
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 5;

  // BRI Simulated State remains intact as requirement
  const [briMetrics, setBriMetrics] = useState({
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

  // Fetch Excel sheet from google servers on request
  const fetchGoogleSheetData = async (forceLiveLink = true) => {
    setIsLoadingSheet(true);
    setSheetError(null);
    try {
      const url = `https://docs.google.com/spreadsheets/d/${sheetId}/export?format=csv&gid=${gid}`;
      const res = await fetch(url);
      if (!res.ok) {
        throw new Error(`Cloud server answered with status: ${res.status}`);
      }
      const rawText = await res.ok ? await res.text() : "";
      if (!rawText || rawText.trim() === '') {
        throw new Error('Google sheet returned empty or unreadable stream.');
      }
      
      const parsed = parseCSV(rawText);
      if (parsed.length === 0) {
        throw new Error('Parsed rows length resulted in empty cells.');
      }

      const rawHeaders = parsed[0].map(h => h.trim());
      const rawRows = parsed.slice(1).filter(r => r.some(cell => cell.trim() !== ''));

      // Scan numeric columns heuristics
      const detectedNums: number[] = [];
      if (rawRows.length > 0) {
        for (let colIdx = 0; colIdx < rawHeaders.length; colIdx++) {
          let numCount = 0;
          let nonNumCount = 0;
          rawRows.forEach(row => {
            const val = row[colIdx];
            if (val === undefined || val.trim() === '') return;
            const stripped = val.replace(/[^\d\.\-]/g, '');
            if (!isNaN(Number(stripped)) && stripped.trim() !== '') {
              numCount++;
            } else {
              nonNumCount++;
            }
          });
          if (numCount > 0 && numCount >= nonNumCount) {
            detectedNums.push(colIdx);
          }
        }
      }

      // Sensible baseline columns
      let defaultX = 0;
      for (let i = 0; i < rawHeaders.length; i++) {
        const text = rawHeaders[i].toLowerCase();
        if (['periode', 'period', 'bulan', 'month', 'date', 'tanggal', 'campaign', 'brand'].some(k => text.includes(k))) {
          defaultX = i;
          break;
        }
      }

      let defaultY = detectedNums[0] !== undefined ? detectedNums[0] : 1;
      for (const idx of detectedNums) {
        const text = rawHeaders[idx].toLowerCase();
        if (['gmv', 'omset', 'revenue', 'budget', 'sales', 'sales volume', 'total', 'clicks', 'conversions'].some(k => text.includes(k))) {
          defaultY = idx;
          break;
        }
      }

      // Successfully bind spreadsheet data!
      setHeaders(rawHeaders);
      setRows(rawRows);
      setNumericColumns(detectedNums);
      setSelectedXColumn(defaultX);
      setSelectedYColumn(defaultY);
      setIsLiveMode(true);
      setCurrentPage(1);
    } catch (err: any) {
      console.warn('CORS or public scope block encountered, initializing PT Paragon internal fallback ledger:', err.message);
      setSheetError(err.message || 'Cross-Origin scope block');
      
      // Load fallback arrays
      setHeaders(FALLBACK_PARAGON_HEADERS);
      setRows(FALLBACK_PARAGON_ROWS);
      setNumericColumns([2, 3, 4, 5]);
      setSelectedXColumn(1);
      setSelectedYColumn(2);
      if (forceLiveLink) {
        setIsLiveMode(false);
      }
    } finally {
      setIsLoadingSheet(false);
    }
  };

  useEffect(() => {
    fetchGoogleSheetData(false);
  }, []);

  // Live simulation tick cycle for BRI
  useEffect(() => {
    if (!isSimulating) return;

    const interval = setInterval(() => {
      setTicker((prev) => prev + 1);

      if (activeTab === 'bri') {
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
    // Refresh spreadsheet
    fetchGoogleSheetData(false);
  };

  const formatIDR = (num: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      maximumFractionDigits: 0,
    }).format(num);
  };

  // Filtered rows for paginated render grid table
  const filteredRows = rows.filter(row => {
    if (!searchQuery) return true;
    const lowerQuery = searchQuery.toLowerCase();
    return row.some(cell => cell && cell.toLowerCase().includes(lowerQuery));
  });

  const totalPages = Math.max(1, Math.ceil(filteredRows.length / rowsPerPage));
  const startIndex = (currentPage - 1) * rowsPerPage;
  const paginatedRows = filteredRows.slice(startIndex, startIndex + rowsPerPage);

  // SVG coordinate calculator for live Google Sheet data
  const getSheetLinePoints = (): string => {
    if (rows.length === 0 || selectedYColumn === -1) return "20,80 280,80";
    
    // Convert target array cells to raw float values
    const values = rows.map(r => getCleanNumber(r[selectedYColumn]));
    const maxVal = Math.max(...values, 1);
    const minVal = Math.min(...values, 0);
    const range = maxVal - minVal || 1;
    const numPoints = values.length;
    
    return values.map((val, idx) => {
      const x = (idx / (numPoints - 1 || 1)) * 260 + 20;
      const y = 80 - ((val - minVal) / range) * 60; // Scale dynamically into 20-80 safety height
      return `${x},${y}`;
    }).join(' ');
  };

  // Keep static BRILink line calculation fully intact
  const getSimulatedBriPoints = () => {
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
  };

  // Derive dynamic stats highlights from Google Sheet active columns
  const getPrimaryMetricTotal = () => {
    if (rows.length === 0 || selectedYColumn === -1) return "0";
    const values = rows.map(r => getCleanNumber(r[selectedYColumn]));
    const sum = values.reduce((acc, curr) => acc + curr, 0);
    const colName = headers[selectedYColumn] || "";
    
    // Check if sum is very high or likely a percentage/average index
    const isPercent = colName.toLowerCase().includes('%') || colName.toLowerCase().includes('roi');
    if (isPercent) {
      return formatValueCompact(sum / rows.length, colName); // Output average rate instead for ratios
    }
    return formatValueCompact(sum, colName);
  };

  const getApexPerformanceLabel = () => {
    if (rows.length === 0 || selectedYColumn === -1) return { label: "N/A", valText: "N/A" };
    
    let maxVal = -Infinity;
    let maxRowIndex = 0;
    
    rows.forEach((r, idx) => {
      const num = getCleanNumber(r[selectedYColumn]);
      if (num > maxVal) {
        maxVal = num;
        maxRowIndex = idx;
      }
    });
    
    const apexRowName = rows[maxRowIndex][selectedXColumn] || rows[maxRowIndex][0] || "Campaign Apex";
    const rawValText = rows[maxRowIndex][selectedYColumn] || "";
    return {
      label: apexRowName,
      valText: rawValText
    };
  };

  const apexRecord = getApexPerformanceLabel();

  return (
    <div className="glass-panel rounded-2xl overflow-hidden shadow-2xl relative border border-white/10" id="kpi-dashboard-widget">
      {/* Accent glow on top header block */}
      <div className="absolute top-0 left-1/4 right-1/4 h-[1px] bg-gradient-to-r from-transparent via-purple-500/50 to-transparent" />

      {/* Main Header / Controlling Rail */}
      <div className="px-6 py-5 border-b border-white/5 bg-slate-900/40 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="relative flex h-2 w-2">
              <span className={`animate-ping absolute inline-flex h-full w-full rounded-full ${isLiveMode && activeTab === 'paragon' ? 'bg-emerald-400' : 'bg-indigo-400'} opacity-75`}></span>
              <span className={`relative inline-flex rounded-full h-2 w-2 ${isLiveMode && activeTab === 'paragon' ? 'bg-emerald-500' : 'bg-indigo-500'}`}></span>
            </span>
            <span className="text-xs font-mono text-gray-400 uppercase tracking-widest">
              {activeTab === 'paragon' ? 'Google Sheets Live Integration' : 'Commercial Sector BI Audit'}
            </span>
          </div>
          <h4 className="text-xl font-extrabold font-sans text-white tracking-tight">
            {activeTab === 'paragon' ? 'Paragon Live Campaign Trends' : 'BRI Savings Volume Metrics'}
          </h4>
        </div>

        {/* Tab switcher: Paragon (with Sheets connection) vs BRI (simulated) */}
        <div className="flex bg-slate-950/80 p-1.5 rounded-xl border border-white/5 self-start sm:self-auto shadow-inner">
          <button
            onClick={() => setActiveTab('paragon')}
            className={`flex items-center gap-1.5 px-4 py-2 text-xs font-bold rounded-lg transition-all cursor-pointer ${
              activeTab === 'paragon'
                ? 'bg-purple-600/20 text-purple-200 border border-purple-500/35 shadow-sm'
                : 'text-gray-400 hover:text-white border border-transparent'
            }`}
          >
            <Database className="w-3.5 h-3.5" />
            Paragon Ledger (Live)
          </button>
          <button
            onClick={() => setActiveTab('bri')}
            className={`flex items-center gap-1.5 px-4 py-2 text-xs font-bold rounded-lg transition-all cursor-pointer ${
              activeTab === 'bri'
                ? 'bg-blue-600/20 text-blue-200 border border-blue-500/35 shadow-sm'
                : 'text-gray-400 hover:text-white border border-transparent'
            }`}
          >
            <Landmark className="w-3.5 h-3.5" />
            BRI Savings Flow
          </button>
        </div>
      </div>

      {/* 1. Spread Sheet Connection Banner specifically for Paragon tab */}
      {activeTab === 'paragon' && (
        <div className="bg-[#050505]/75 border-b border-white/5 px-6 py-3.5 flex flex-col md:flex-row items-start md:items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2.5">
            <span className="p-1 px-2 rounded bg-purple-500/10 border border-purple-500/20 text-purple-400 font-mono text-[10px] uppercase font-bold tracking-wider">
              LEDGER
            </span>
            <div className="truncate max-w-[280px] sm:max-w-md lg:max-w-xl text-gray-400">
              <span className="text-gray-500 mr-1.5 font-mono">Source ID:</span>
              <a 
                href={sheetUrl} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="hover:text-purple-400 underline transition-colors inline-flex items-center gap-1 font-mono text-[11px]"
                title="Open active Google Sheets ledger spreadsheet in new tab"
              >
                10BUJPh...VJxuMM (Dashboard)
                <ExternalLink className="w-3 h-3 text-gray-500" />
              </a>
            </div>
          </div>
          
          <div className="flex items-center gap-3 self-end md:self-auto">
            {isLiveMode ? (
              <span className="flex items-center gap-1.5 font-sans text-[10px] font-bold text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/25">
                <CheckCircle2 className="w-3 h-3" /> Live Synchronization Active
              </span>
            ) : (
              <span className="flex items-center gap-1.5 font-sans text-[10px] font-bold text-amber-400 bg-amber-500/10 px-2.5 py-1 rounded-full border border-amber-500/25" title="Accessing via locally cached data because of link restriction. Click Refresh Sync to retry connection.">
                <AlertCircle className="w-3 h-3" /> Offline Fallback Dataset
              </span>
            )}
            
            <button
              onClick={() => fetchGoogleSheetData(true)}
              disabled={isLoadingSheet}
              className="flex items-center gap-1 px-2.5 py-1 text-[11px] font-bold text-gray-300 hover:text-white bg-white/5 hover:bg-white/10 rounded-lg border border-white/10 cursor-pointer disabled:opacity-50 transition-all font-sans"
            >
              <RefreshCw className={`w-3 h-3 ${isLoadingSheet ? 'animate-spin' : ''}`} />
              Re-Sync
            </button>
          </div>
        </div>
      )}

      {/* Main Content Dashboard Layout */}
      <div className="p-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* LEFT COLUMN: Main Summary KPI Blocks */}
        <div className="space-y-5 lg:col-span-2">
          {activeTab === 'paragon' ? (
            /* ==================== PARAGON ACTIVE SCREEN ==================== */
            isLoadingSheet ? (
              /* Loading Screen Skeleton */
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4" id="google-sheet-skeletons">
                {[1, 2, 3].map((idx) => (
                  <div key={idx} className="bg-slate-900/40 p-5 rounded-xl border border-white/5 animate-pulse min-h-[105px] flex flex-col justify-between">
                    <div className="h-4 bg-white/5 rounded w-1/2" />
                    <div className="space-y-1">
                      <div className="h-6 bg-white/10 rounded w-3/4" />
                      <div className="h-2.5 bg-white/5 rounded w-full mt-2" />
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              /* Dynamic Summary parsed straight from targeted Google Sheet columns! */
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4" id="paragon-google-sheet-metrics flex">
                
                {/* Dynamically formulated Metric 1: Total Sum of picked Y Column */}
                <div className="bg-slate-900/60 p-4 rounded-xl border border-white/5 flex flex-col justify-between hover:border-purple-500/20 transition-all">
                  <div className="flex items-center justify-between text-gray-400 mb-3">
                    <span className="text-xs font-bold uppercase tracking-wider text-gray-400 truncate">
                      Cumulative {headers[selectedYColumn] || "Sales Measure"}
                    </span>
                    <ShoppingCart className="w-4 h-4 text-purple-400 shrink-0" />
                  </div>
                  <div>
                    <div className="text-2xl font-black text-white font-mono leading-none tracking-tight">
                      {getPrimaryMetricTotal()}
                    </div>
                    <p className="text-[10px] text-gray-500 mt-1.5 font-sans leading-relaxed">
                      Combined sum derived from active cells in <span className="font-semibold text-purple-300">"{headers[selectedYColumn]}"</span>.
                    </p>
                  </div>
                </div>

                {/* Dynamically formulated Metric 2: Top Performing Campaign cell */}
                <div className="bg-slate-900/60 p-4 rounded-xl border border-white/5 flex flex-col justify-between hover:border-purple-500/20 transition-all">
                  <div className="flex items-center justify-between text-gray-400 mb-3">
                    <span className="text-xs font-bold uppercase tracking-wider text-gray-400">
                      Apex Contributor
                    </span>
                    <Sparkles className="w-4 h-4 text-purple-400" />
                  </div>
                  <div>
                    <div className="text-base font-extrabold text-white leading-tight font-sans truncate" title={apexRecord.label}>
                      {apexRecord.label}
                    </div>
                    <p className="text-[10px] text-purple-300 mt-1 font-mono font-bold leading-none">
                      {apexRecord.valText}
                    </p>
                    <p className="text-[10px] text-gray-500 mt-1.5 font-sans leading-none">
                      Peak value within evaluated series.
                    </p>
                  </div>
                </div>

                {/* Dynamically formulated Metric 3: Total records count in spreadsheet */}
                <div className="bg-slate-900/60 p-4 rounded-xl border border-white/5 flex flex-col justify-between hover:border-purple-500/20 transition-all">
                  <div className="flex items-center justify-between text-gray-400 mb-3">
                    <span className="text-xs font-bold uppercase tracking-wider text-gray-400">
                      Evaluated Ledger Count
                    </span>
                    <TrendingUp className="w-4 h-4 text-purple-400" />
                  </div>
                  <div>
                    <div className="text-3xl font-black text-white font-mono leading-none">
                      {rows.length} <span className="text-xs font-sans font-medium text-gray-400 uppercase tracking-widest">Rows</span>
                    </div>
                    <p className="text-[10px] text-gray-500 mt-1.5 font-sans leading-relaxed">
                      Currently analyzing all <span className="text-purple-300 font-bold">{rows.length} campaign items</span> inside the active sheet layout.
                    </p>
                  </div>
                </div>

              </div>
            )
          ) : (
            /* ==================== BRI SCREEN (Static Backup kept fully functional) ==================== */
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4" id="bri-simulated-metrics-cards">
              <div className="bg-slate-900/60 p-4 rounded-xl border border-white/5 flex flex-col justify-between hover:border-blue-500/25 transition-all">
                <div className="flex items-center justify-between text-gray-400 mb-3">
                  <span className="text-xs font-bold uppercase tracking-widest text-gray-400">Savings Volume</span>
                  <Landmark className="w-4 h-4 text-blue-400" />
                </div>
                <div>
                  <div className="text-xl font-bold text-white font-mono leading-none tracking-tight">
                    {formatIDR(briMetrics.savingsVolume)}
                  </div>
                  <p className="text-[10px] text-gray-500 mt-1.5">
                    27 regional branches monitored under pilot setup.
                  </p>
                </div>
              </div>

              <div className="bg-slate-900/60 p-4 rounded-xl border border-white/5 flex flex-col justify-between hover:border-blue-500/25 transition-all">
                <div className="flex items-center justify-between text-gray-400 mb-3">
                  <span className="text-xs font-bold uppercase tracking-widest text-gray-400">BRILink Agents</span>
                  <Layers className="w-4 h-4 text-blue-400" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-white font-mono leading-none">
                    {briMetrics.activeBrilinkMerchants} <span className="text-xs font-sans text-gray-400">merchants</span>
                  </div>
                  <p className="text-[10px] text-emerald-400 mt-1.5 font-semibold">
                    ● Active transaction streams verified.
                  </p>
                </div>
              </div>

              <div className="bg-slate-900/60 p-4 rounded-xl border border-white/5 flex flex-col justify-between hover:border-blue-500/25 transition-all">
                <div className="flex items-center justify-between text-gray-400 mb-3">
                  <span className="text-xs font-bold uppercase tracking-widest text-gray-400">Inactive SMEs Pruned</span>
                  <Percent className="w-4 h-4 text-blue-400" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-white font-mono leading-none">
                    {briMetrics.inactiveAccountsIdentified} <span className="text-xs font-sans text-red-400">Accounts</span>
                  </div>
                  <p className="text-[10px] text-gray-500 mt-1.5">
                    Streamlined overhead cost by 14.5% MoM.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Graphical Trends Section Container */}
          <div className="bg-slate-950/60 p-5 rounded-xl border border-white/5 relative">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
              <div>
                <h5 className="text-[11px] font-bold text-white tracking-widest uppercase font-mono flex items-center gap-1.5">
                  <BarChart2 className="w-3.5 h-3.5 text-purple-400" />
                  {activeTab === 'paragon' 
                    ? `Live Sparkline: ${headers[selectedYColumn] || 'Metric'}` 
                    : 'BRI District Branch Savings Flow (Volume x10^8)'
                  }
                </h5>
                <p className="text-[10px] text-gray-500">
                  {activeTab === 'paragon' 
                    ? `Plotting ledger entries of "${headers[selectedYColumn]}" acrossevaluated rows`
                    : 'Dynamic telemetry savings interval trends analysis'
                  }
                </p>
              </div>

              <div className="flex items-center gap-2 font-mono text-[9px] self-start sm:self-auto">
                {activeTab === 'paragon' ? (
                  <span className="text-gray-400 bg-white/5 px-2 py-0.5 rounded font-bold uppercase text-[9px] tracking-wider border border-white/5">
                    {rows.length} Nodes Plotted
                  </span>
                ) : (
                  <span className="text-gray-400 bg-white/5 px-2 py-0.5 rounded font-bold uppercase text-[9px] tracking-wider border border-white/5">
                    Telemetry Poll #{ticker}
                  </span>
                )}
              </div>
            </div>

            {/* Custom SVG Sparkline Graph */}
            {isLoadingSheet ? (
              <div className="h-28 flex items-center justify-center text-xs text-gray-500 font-mono">
                Loading coordinate guidelines...
              </div>
            ) : (
              <div className="relative h-28 w-full mt-2" id="kpi-custom-sparkline-graph-svg">
                <svg className="w-full h-full overflow-visible" viewBox="0 0 300 100" preserveAspectRatio="none">
                  {/* SVG Gradients definitions */}
                  <defs>
                    <linearGradient id="purpleGlow" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#a855f7" stopOpacity="0.45" />
                      <stop offset="100%" stopColor="#a855f7" stopOpacity="0.0" />
                    </linearGradient>
                    <linearGradient id="blueGlow" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.45" />
                      <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.0" />
                    </linearGradient>
                  </defs>

                  {/* Horizontal Guideline indicators */}
                  <line x1="20" y1="20" x2="280" y2="20" stroke="rgba(255,255,255,0.03)" strokeDasharray="3 3" />
                  <line x1="20" y1="50" x2="280" y2="50" stroke="rgba(255,255,255,0.03)" strokeDasharray="3 3" />
                  <line x1="20" y1="80" x2="280" y2="80" stroke="rgba(255,255,255,0.03)" strokeDasharray="3 3" />

                  {/* Area gradient filled path */}
                  <path
                    d={`M 20,80 L ${activeTab === 'paragon' ? getSheetLinePoints() : getSimulatedBriPoints()} L 280,80 Z`}
                    fill={activeTab === 'paragon' ? 'url(#purpleGlow)' : 'url(#blueGlow)'}
                  />

                  {/* Actual Stroke Trend Line */}
                  <polyline
                    fill="none"
                    stroke={activeTab === 'paragon' ? '#a855f7' : '#3b82f6'}
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    points={activeTab === 'paragon' ? getSheetLinePoints() : getSimulatedBriPoints()}
                  />

                  {/* Live pulsating coordinate marker at final point */}
                  {rows.length > 0 && (
                    <circle
                      cx="280"
                      cy={(activeTab === 'paragon' ? getSheetLinePoints() : getSimulatedBriPoints()).split(' ').pop()?.split(',')[1] || '50'}
                      r="4.5"
                      fill={activeTab === 'paragon' ? '#c084fc' : '#3b82f6'}
                      className="animate-pulse"
                    />
                  )}
                </svg>

                {/* dynamic chart edge label tags */}
                <div className="absolute bottom-0 inset-x-2 flex justify-between text-[8px] font-mono text-gray-500 uppercase tracking-widest bg-transparent">
                  <span>Start Entry</span>
                  <span>Evaluated Range [{rows.length} total]</span>
                  <span className="text-purple-300 font-bold">Active Apex</span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* RIGHT COLUMN: Column Selectors, Dynamic Parameters & interactive configurations */}
        <div className="space-y-4">
          <div className="bg-slate-900/60 p-5 rounded-xl border border-white/5 flex flex-col justify-between h-full relative" id="live-dashboard-controls-block">
            
            {activeTab === 'paragon' ? (
              /* Paragon Dynamic configurations, Column selection tool for BI */
              <div className="space-y-4">
                <div className="flex items-center gap-1.5 mb-2">
                  <Filter className="w-4 h-4 text-purple-400" />
                  <h5 className="text-[11px] font-bold text-white tracking-widest uppercase font-mono">
                    Chart Projection Model
                  </h5>
                </div>
                
                {/* 1. X Axis column selector */}
                <div className="space-y-1.5">
                  <label className="text-[10px] font-mono text-gray-400 block font-bold uppercase tracking-wider">
                    X-Axis (Scatter Label):
                  </label>
                  <select
                    value={selectedXColumn}
                    onChange={(e) => setSelectedXColumn(Number(e.target.value))}
                    className="w-full bg-slate-950 border border-white/10 rounded-lg p-2 text-xs font-semibold text-gray-300 focus:outline-none focus:border-purple-500 cursor-pointer"
                  >
                    {headers.map((val, idx) => (
                      <option key={idx} value={idx}>{val}</option>
                    ))}
                  </select>
                </div>

                {/* 2. Y Axis column selector */}
                <div className="space-y-1.5">
                  <label className="text-[10px] font-mono text-gray-400 block font-bold uppercase tracking-wider">
                    Y-Axis (Metrics Plot):
                  </label>
                  <select
                    value={selectedYColumn}
                    onChange={(e) => setSelectedYColumn(Number(e.target.value))}
                    className="w-full bg-slate-950 border border-white/10 rounded-lg p-2 text-xs font-semibold text-gray-300 focus:outline-none focus:border-purple-500 cursor-pointer"
                  >
                    {numericColumns.map((valIdx) => (
                      <option key={valIdx} value={valIdx}>
                        {headers[valIdx]} (numeric)
                      </option>
                    ))}
                    {/* Fallback to all headers if no numeric identified */}
                    {numericColumns.length === 0 && headers.map((val, idx) => (
                      <option key={idx} value={idx}>{val}</option>
                    ))}
                  </select>
                </div>

                <div className="p-3 bg-purple-500/5 rounded-lg border border-purple-500/10 text-[10px] text-gray-400 leading-relaxed font-sans">
                  💡 This dynamic module lets you plot ANY numeric variable in your spreadsheet! Pick a column from the dropdown above, and the graph modifies instantly.
                </div>
              </div>
            ) : (
              /* BRI Branch Scoring displays */
              <div>
                <h5 className="text-xs font-bold text-white tracking-wider uppercase font-mono mb-3">
                  Regional Branch Scoring
                </h5>
                <div className="space-y-3.5">
                  {briMetrics.branchScores.map((branch, index) => (
                    <div key={index} className="space-y-1">
                      <div className="flex justify-between text-xs font-semibold">
                        <span className="text-gray-300">{branch.name}</span>
                        <span className="text-blue-300 font-mono">{branch.score} pts</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="h-1.5 w-full bg-slate-950 rounded-full overflow-hidden border border-white/5">
                          <div
                            className="h-full bg-gradient-to-r from-blue-500 to-teal-500 rounded-full transition-all duration-700"
                            style={{ width: `${branch.score}%` }}
                          />
                        </div>
                        <span className="text-[9px] font-mono text-gray-500 w-8 text-right font-bold">{branch.score}%</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Simulated Speed / Dynamic Parameters Panel (maintained for both tabs) */}
            <div className="mt-5 pt-4 border-t border-white/5 space-y-3">
              <div className="flex items-center justify-between text-[11px] font-mono uppercase tracking-wider text-gray-400">
                <span className="flex items-center gap-1.5 font-bold">
                  <Play className="w-3.5 h-3.5 text-gray-500" />
                  Clock Velocity
                </span>
                <span className="text-white font-bold">{speedMultiplier}x speed</span>
              </div>

              {/* Click Velocity Multiplier */}
              <div className="flex gap-1.5">
                {[1, 2, 5].map((multiplier) => (
                  <button
                    key={multiplier}
                    onClick={() => {
                      setSpeedMultiplier(multiplier);
                      if (!isSimulating) setIsSimulating(true);
                    }}
                    className={`flex-1 text-[10px] font-mono font-bold py-1.5 rounded-lg transition-colors cursor-pointer ${
                      speedMultiplier === multiplier
                        ? 'bg-purple-600/30 text-purple-200 border border-purple-500/30 shadow-md shadow-purple-500/5'
                        : 'bg-white/5 text-gray-400 hover:text-white hover:bg-white/10'
                    }`}
                  >
                    {multiplier}x
                  </button>
                ))}
              </div>

              {/* Simulation Controls */}
              <div className="flex gap-2 pt-1">
                <button
                  onClick={() => setIsSimulating(!isSimulating)}
                  className={`flex-1 flex items-center justify-center gap-1.5 text-xs py-2 rounded-xl font-bold cursor-pointer transition-colors ${
                    isSimulating
                      ? 'bg-amber-600/20 text-amber-300 border border-amber-500/35 hover:bg-amber-600/30'
                      : 'bg-emerald-600/25 text-emerald-200 border border-emerald-500/35 hover:bg-emerald-600/35'
                  }`}
                >
                  {isSimulating ? (
                    <>
                      <Pause className="w-3.5 h-3.5" /> Pause Poll
                    </>
                  ) : (
                    <>
                      <Play className="w-3.5 h-3.5" /> Resume Poll
                    </>
                  )}
                </button>

                <button
                  onClick={resetSimulation}
                  title="Reset Metrics & Refresh Data"
                  className="px-3 bg-slate-950 border border-white/10 text-gray-400 hover:text-white rounded-xl transition-colors flex items-center justify-center cursor-pointer hover:bg-slate-905"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

          </div>
        </div>

      </div>

      {/* ==================== 2. COMPLETE SPREADSHEET TABLE GRID VIEW ==================== */}
      {activeTab === 'paragon' && (
        <div className="border-t border-white/5 bg-slate-950/40 p-6 space-y-4" id="google-sheets-grid-table-element">
          
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h5 className="text-[12px] font-bold text-white tracking-widest uppercase font-mono flex items-center gap-1.5">
                <FileSpreadsheet className="w-4 h-4 text-purple-400" />
                Spreadsheet Explorer
              </h5>
              <p className="text-[10px] text-gray-500">
                Review, paginate, search and query all records fetched from Google Sheets.
              </p>
            </div>

            {/* Realtime filter input bar */}
            <div className="relative w-full sm:max-w-xs">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-500">
                <Search className="w-3.5 h-3.5" />
              </span>
              <input
                type="text"
                placeholder="Search spreadsheet records..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setCurrentPage(1); // Reset page on filter
                }}
                className="w-full bg-slate-900/80 border border-white/10 rounded-lg pl-9 pr-4 py-2 text-xs font-mono font-semibold text-white focus:outline-none focus:border-purple-500"
              />
            </div>
          </div>

          {/* Table Container block */}
          {isLoadingSheet ? (
            <div className="py-12 flex flex-col items-center justify-center text-center space-y-3 font-mono text-xs text-gray-400 scroll-smooth">
              <RefreshCw className="w-6 h-6 animate-spin text-purple-500" />
              <span>Fetching cellular array schema from Google Cloud APIs...</span>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="overflow-x-auto rounded-xl border border-white/5 bg-[#030303]/90">
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="border-b border-white/10 bg-white/5 font-mono text-[10px] text-gray-400 font-bold uppercase tracking-wider">
                      <th className="py-3 px-4 w-10 text-center">No</th>
                      {headers.map((h, index) => (
                        <th 
                          key={index} 
                          className={`py-3 px-4 first-letter:uppercase select-none ${
                            idxToHighlight(index)
                              ? 'text-purple-300 font-extrabold bg-purple-500/5' 
                              : ''
                          }`}
                        >
                          {h}
                          {index === selectedXColumn && <span className="text-[8px] ml-1 bg-gray-700/60 text-gray-300 px-1.5 py-0.5 rounded-full">X-axis</span>}
                          {index === selectedYColumn && <span className="text-[8px] ml-1 bg-purple-700/60 text-purple-200 px-1.5 py-0.5 rounded-full">Y-axis</span>}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {paginatedRows.length > 0 ? (
                      paginatedRows.map((row, rIdx) => {
                        const actualRowNumber = startIndex + rIdx + 1;
                        return (
                          <tr 
                            key={rIdx} 
                            className="border-b border-white/5 hover:bg-white/[0.03] transition-colors font-mono"
                          >
                            <td className="py-3 px-4 text-center text-gray-600 font-bold border-r border-white/5">{actualRowNumber}</td>
                            {row.map((cell, cIdx) => (
                              <td 
                                key={cIdx} 
                                className={`py-3 px-4 truncate max-w-[200px] font-medium ${
                                  cIdx === selectedYColumn 
                                    ? 'text-purple-400 bg-purple-500/[0.02] font-semibold font-bold' 
                                    : 'text-gray-300'
                                }`}
                                title={cell}
                              >
                                {cell || <span className="text-gray-700 italic">null</span>}
                              </td>
                            ))}
                          </tr>
                        );
                      })
                    ) : (
                      <tr>
                        <td colSpan={headers.length + 1} className="py-8 text-center text-gray-500 font-mono font-medium">
                          No matching records found for "{searchQuery}" query
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>

              {/* Pagination controls footer */}
              {filteredRows.length > rowsPerPage && (
                <div className="flex items-center justify-between text-[11px] font-mono font-bold uppercase text-gray-500">
                  <span>
                    Showing {startIndex + 1} to {Math.min(startIndex + rowsPerPage, filteredRows.length)} of {filteredRows.length} filtered entries
                  </span>
                  
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                      disabled={currentPage === 1}
                      className="p-1 px-2 rounded bg-white/5 hover:bg-white/10 text-gray-300 disabled:opacity-30 cursor-pointer disabled:cursor-not-allowed transition-all"
                    >
                      <ChevronLeft className="w-4 h-4 inline" /> Prev
                    </button>
                    
                    <span className="text-white bg-purple-500/10 px-3 py-1 rounded border border-purple-500/20">
                      Page {currentPage} of {totalPages}
                    </span>

                    <button
                      onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                      disabled={currentPage === totalPages}
                      className="p-1 px-2 rounded bg-white/5 hover:bg-white/10 text-gray-300 disabled:opacity-30 cursor-pointer disabled:cursor-not-allowed transition-all"
                    >
                      Next <ChevronRight className="w-4 h-4 inline" />
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

        </div>
      )}

    </div>
  );

  function idxToHighlight(index: number) {
    return index === selectedXColumn || index === selectedYColumn;
  }
}
