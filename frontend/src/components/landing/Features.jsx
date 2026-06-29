import { TrendingUp, FileText, BarChart2, Newspaper, Star, Brain, ArrowRight } from 'lucide-react';

const FEATURES = [
  {
    icon: TrendingUp,
    color: 'text-indigo-600',
    bg: 'bg-indigo-50',
    border: 'border-indigo-100',
    title: 'Live Market Data',
    desc: 'Real-time Nifty 50, Sensex, and global indices. Top gainers and losers updated every minute. Never miss a market move.',
    tags: ['Nifty 50', 'Sensex', 'S&P 500', 'Top Gainers'],
  },
  {
    icon: Brain,
    color: 'text-purple-600',
    bg: 'bg-purple-50',
    border: 'border-purple-100',
    title: 'AI Stock Analysis',
    desc: 'Ask any question about any stock. Get deep fundamental and technical analysis powered by Gemini AI — without being told what to buy.',
    tags: ['Gemini 2.5', 'Fundamentals', 'Technicals'],
  },
  {
    icon: FileText,
    color: 'text-emerald-600',
    bg: 'bg-emerald-50',
    border: 'border-emerald-100',
    title: 'Earnings Analyzer',
    desc: 'Upload any earnings transcript or annual report PDF. AI extracts summary, key insights, opportunities and risks in seconds.',
    tags: ['PDF Upload', 'Auto-Summary', 'Risk Detection'],
  },
  {
    icon: BarChart2,
    color: 'text-sky-600',
    bg: 'bg-sky-50',
    border: 'border-sky-100',
    title: 'Bull vs Bear AI',
    desc: 'Get a balanced, AI-generated Bull and Bear thesis for any stock. Understand both sides before committing your capital.',
    tags: ['Bull Case', 'Bear Case', 'Risk Overview'],
  },
  {
    icon: Star,
    color: 'text-amber-600',
    bg: 'bg-amber-50',
    border: 'border-amber-100',
    title: 'Smart Watchlist',
    desc: 'Star any stock to add it to your personal watchlist. Track price, weekly P&L and sentiment for your entire portfolio at a glance.',
    tags: ['Portfolio Tracking', 'Weekly P&L', 'Alerts'],
  },
  {
    icon: Newspaper,
    color: 'text-rose-600',
    bg: 'bg-rose-50',
    border: 'border-rose-100',
    title: 'Market News Feed',
    desc: 'Latest global market news curated in real time. Filter by stock or get a broad market overview. Stay ahead of the headlines.',
    tags: ['Real-time', 'Curated Feed', 'Stock-specific'],
  },
];

const FeatureCard = ({ icon: Icon, color, bg, border, title, desc, tags }) => (
  <div className={`bg-white rounded-2xl border ${border} p-6 shadow-sm hover:shadow-md transition-all group`}>
    <div className={`w-12 h-12 rounded-2xl ${bg} flex items-center justify-center mb-4`}>
      <Icon className={`w-6 h-6 ${color}`} />
    </div>
    <h3 className="font-bold text-slate-900 text-lg mb-2">{title}</h3>
    <p className="text-slate-500 text-sm leading-relaxed mb-4">{desc}</p>
    <div className="flex flex-wrap gap-1.5">
      {tags.map((t) => (
        <span key={t} className="text-[11px] font-semibold bg-slate-100 text-slate-500 px-2 py-0.5 rounded-full">{t}</span>
      ))}
    </div>
  </div>
);

const Features = ({ onGetStarted }) => (
  <section className="py-20 bg-[#F8FAFC]">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

      {/* Section header */}
      <div className="text-center mb-14">
        <p className="text-indigo-600 font-bold text-sm uppercase tracking-widest mb-3">Everything in one place</p>
        <h2 className="text-3xl sm:text-4xl font-black text-slate-900 mb-4">
          Your complete market intelligence platform
        </h2>
        <p className="text-slate-500 max-w-xl mx-auto text-base">
          From live Nifty data to AI-powered earnings analysis — InvestIQ gives every investor the tools of a professional analyst.
        </p>
      </div>

      {/* Feature grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
        {FEATURES.map((f) => <FeatureCard key={f.title} {...f} />)}
      </div>

      {/* How it works */}
      <div className="bg-gradient-to-br from-indigo-900 to-purple-900 rounded-3xl p-10 text-white">
        <div className="text-center mb-10">
          <h2 className="text-2xl sm:text-3xl font-black mb-3">Start in 3 simple steps</h2>
          <p className="text-indigo-200">No broker account needed. Completely free to start.</p>
        </div>
        <div className="grid sm:grid-cols-3 gap-8 mb-10">
          {[
            { step: '01', title: 'Create Free Account', desc: 'Sign up in under 30 seconds. No credit card required.' },
            { step: '02', title: 'Search Any Stock', desc: 'Search NSE/BSE stocks, view live charts, key metrics & news.' },
            { step: '03', title: 'Get AI Insights', desc: 'Ask the AI, analyze earnings PDFs, build your watchlist.' },
          ].map(({ step, title, desc }) => (
            <div key={step} className="text-center">
              <div className="w-12 h-12 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center text-xl font-black text-white mx-auto mb-4">
                {step}
              </div>
              <h3 className="font-bold text-white text-lg mb-2">{title}</h3>
              <p className="text-indigo-200 text-sm">{desc}</p>
            </div>
          ))}
        </div>
        <div className="text-center">
          <button
            onClick={onGetStarted}
            className="inline-flex items-center px-8 py-4 bg-white text-indigo-700 font-black rounded-2xl hover:bg-indigo-50 transition-all shadow-lg text-base"
          >
            Get Started Free <ArrowRight className="w-5 h-5 ml-2" />
          </button>
        </div>
      </div>
    </div>
  </section>
);

export default Features;
