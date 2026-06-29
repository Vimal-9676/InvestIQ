import { ArrowRight, TrendingUp, Shield, Zap, Brain } from 'lucide-react';

const TICKER_ITEMS = [
  { sym: 'RELIANCE', price: '₹2,947.80', change: '+1.23%', up: true },
  { sym: 'TCS', price: '₹3,812.50', change: '+0.87%', up: true },
  { sym: 'HDFCBANK', price: '₹1,621.35', change: '-0.42%', up: false },
  { sym: 'INFY', price: '₹1,435.20', change: '+2.14%', up: true },
  { sym: 'ICICIBANK', price: '₹1,254.90', change: '+1.56%', up: true },
  { sym: 'WIPRO', price: '₹452.30', change: '-0.35%', up: false },
  { sym: 'BAJFINANCE', price: '₹7,218.60', change: '+3.02%', up: true },
  { sym: 'NIFTY 50', price: '24,323.85', change: '+0.92%', up: true },
  { sym: 'SENSEX', price: '80,049.67', change: '+0.88%', up: true },
];

const MarketTicker = () => (
  <div className="bg-slate-900 text-white py-2 overflow-hidden relative">
    <div className="flex animate-marquee whitespace-nowrap gap-8 px-4">
      {[...TICKER_ITEMS, ...TICKER_ITEMS].map((item, i) => (
        <span key={i} className="inline-flex items-center gap-2 text-xs font-medium flex-shrink-0">
          <span className="text-slate-400">{item.sym}</span>
          <span>{item.price}</span>
          <span className={item.up ? 'text-emerald-400' : 'text-red-400'}>{item.change}</span>
          <span className="text-slate-600 mx-2">|</span>
        </span>
      ))}
    </div>
  </div>
);

const StatPill = ({ value, label }) => (
  <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl px-4 py-3 text-center">
    <p className="text-2xl font-black text-white">{value}</p>
    <p className="text-xs text-indigo-200 mt-0.5">{label}</p>
  </div>
);

const Hero = ({ onGetStarted }) => (
  <div>
    <MarketTicker />

    {/* Main Hero */}
    <div className="bg-gradient-to-br from-indigo-900 via-indigo-800 to-purple-900 relative overflow-hidden">
      {/* Decorative blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-32 -right-32 w-[600px] h-[600px] rounded-full bg-purple-600/20 blur-3xl" />
        <div className="absolute -bottom-32 -left-32 w-[500px] h-[500px] rounded-full bg-indigo-400/20 blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-24 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left copy */}
          <div>
            <div className="inline-flex items-center bg-white/10 border border-white/20 rounded-full px-4 py-1.5 text-sm text-indigo-200 font-medium mb-6">
              <Zap className="w-3.5 h-3.5 mr-1.5 text-yellow-400" />
              AI-Powered Indian Stock Analysis
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white leading-tight mb-6">
              Invest Smarter<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 to-purple-300">
                with AI Insights
              </span>
            </h1>
            <p className="text-indigo-200 text-lg leading-relaxed mb-8 max-w-lg">
              Real-time Nifty, Sensex & BSE data. AI-powered earnings analysis. Bull vs Bear thesis. Everything you need to make smarter investment decisions.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={onGetStarted}
                className="flex items-center justify-center px-8 py-4 bg-white text-indigo-700 font-black rounded-2xl hover:bg-indigo-50 transition-all shadow-lg hover:shadow-xl text-base"
              >
                Start Investing Free <ArrowRight className="w-5 h-5 ml-2" />
              </button>
            </div>

            {/* Stats row */}
            <div className="grid grid-cols-3 gap-3 mt-10">
              <StatPill value="50K+" label="Active Investors" />
              <StatPill value="₹2B+" label="Volume Tracked" />
              <StatPill value="99.9%" label="Uptime" />
            </div>
          </div>

          {/* Right — mock dashboard card */}
          <div className="hidden lg:block relative">
            <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl p-6 shadow-2xl">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-indigo-200 text-xs font-semibold">RELIANCE INDUSTRIES</p>
                  <p className="text-3xl font-black text-white mt-0.5">₹2,947.80</p>
                </div>
                <span className="bg-emerald-500/20 text-emerald-300 font-bold text-sm px-3 py-1.5 rounded-xl">▲ +1.23%</span>
              </div>
              {/* Mock chart bars */}
              <div className="flex items-end gap-1.5 h-24 mb-4">
                {[40, 55, 48, 62, 58, 72, 65, 80, 75, 88, 82, 95, 90, 100, 94].map((h, i) => (
                  <div key={i} className="flex-1 rounded-t-sm" style={{ height: `${h}%`, background: i > 10 ? 'rgba(52,211,153,0.7)' : 'rgba(255,255,255,0.2)' }} />
                ))}
              </div>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { l: 'Market Cap', v: '₹19.9T' },
                  { l: 'P/E Ratio', v: '28.4' },
                  { l: '52W High', v: '₹3,217' },
                  { l: 'Volume', v: '12.4M' },
                ].map((s) => (
                  <div key={s.l} className="bg-white/10 rounded-xl p-3">
                    <p className="text-xs text-indigo-300">{s.l}</p>
                    <p className="text-white font-bold">{s.v}</p>
                  </div>
                ))}
              </div>
            </div>
            {/* AI insight float */}
            <div className="absolute -bottom-6 -left-6 bg-white rounded-2xl shadow-xl p-4 flex items-start space-x-3 w-64">
              <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center flex-shrink-0">
                <Brain className="w-4 h-4 text-indigo-600" />
              </div>
              <div>
                <p className="text-xs font-bold text-slate-800">AI Insight</p>
                <p className="text-xs text-slate-500 mt-0.5">Reliance shows strong bullish momentum with high institutional interest.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    {/* Trust bar */}
    <div className="bg-white border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 py-5 flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-10">
        {[
          { icon: Shield, text: 'SEBI Compliant' },
          { icon: Zap, text: 'Real-time Data' },
          { icon: Brain, text: 'Gemini AI Powered' },
          { icon: TrendingUp, text: 'NSE & BSE Coverage' },
        ].map(({ icon: Icon, text }) => (
          <div key={text} className="flex items-center gap-2 text-sm font-medium text-slate-600">
            <Icon className="w-4 h-4 text-indigo-500" />
            {text}
          </div>
        ))}
      </div>
    </div>
  </div>
);

export default Hero;
