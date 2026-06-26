import { TrendingUp, TrendingDown, Wallet, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import TopBar from '../TopBar';

const Home = () => {
  const investedStocks = [
    { ticker: 'RELIANCE', name: 'Reliance Ind.', shares: 10, avgPrice: 2800, currentPrice: 2945.80, change: 1.24 },
    { ticker: 'TCS', name: 'Tata Consultancy', shares: 5, avgPrice: 3800, currentPrice: 3950.20, change: -0.45 },
    { ticker: 'HDFCBANK', name: 'HDFC Bank', shares: 20, avgPrice: 1400, currentPrice: 1455.50, change: 0.89 },
  ];

  const topPerformers = [
    { ticker: 'ZOMATO', name: 'Zomato Ltd.', price: 165.40, change: 5.67 },
    { ticker: 'TATOMOTORS', name: 'Tata Motors', price: 980.15, change: 4.12 },
    { ticker: 'IRFC', name: 'Indian Railway Fin.', price: 145.20, change: 3.85 },
  ];

  return (
    <main className="flex-1 flex flex-col h-full overflow-y-auto px-8 py-6 pb-20">
      <TopBar placeholder="Search stocks, mutual funds..." />

      {/* Header Section */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900 mb-2">Hello, User 👋</h1>
        <p className="text-slate-500">Here's your investment overview for today.</p>
      </div>

      {/* Portfolio Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-indigo-600 text-white p-6 rounded-2xl shadow-md">
          <div className="flex items-center space-x-2 text-indigo-100 mb-4">
            <Wallet className="w-5 h-5" />
            <span className="font-medium">Total Portfolio Value</span>
          </div>
          <h2 className="text-4xl font-bold tracking-tight">₹78,319.00</h2>
          <div className="mt-4 flex items-center text-sm font-medium bg-white/20 w-max px-3 py-1 rounded-full">
            <TrendingUp className="w-4 h-4 mr-1" />
            +₹2,319.00 (3.05%)
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-col justify-center">
          <span className="text-slate-500 font-medium mb-1">Invested Amount</span>
          <h3 className="text-2xl font-bold text-slate-900">₹76,000.00</h3>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-col justify-center">
          <span className="text-slate-500 font-medium mb-1">Available to Invest</span>
          <h3 className="text-2xl font-bold text-slate-900">₹12,450.00</h3>
          <button className="mt-3 text-sm text-indigo-600 font-medium text-left hover:text-indigo-800 transition-colors">
            + Add Funds
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Your Investments */}
        <div className="lg:col-span-2 overflow-x-auto">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-bold text-slate-900">Your Investments</h3>
            <button className="text-sm font-medium text-indigo-600 hover:text-indigo-800 transition-colors">View All</button>
          </div>
          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-x-auto">
            <table className="w-full text-left min-w-[600px]">
              <thead>
                <tr className="border-b border-slate-100 text-sm font-medium text-slate-500">
                  <th className="px-6 py-4 text-left">Company</th>
                  <th className="px-6 py-4 text-left">Holdings</th>
                  <th className="px-6 py-4 text-left">Current Price</th>
                  <th className="px-6 py-4 text-left">Returns</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {investedStocks.map((stock) => (
                  <tr key={stock.ticker} className="hover:bg-slate-50 transition-colors group">
                    <td className="px-6 py-4 text-left">
                      <Link to={`/dashboard/stock/${stock.ticker}`} className="block">
                        <div className="font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">{stock.ticker}</div>
                        <div className="text-sm text-slate-500">{stock.name}</div>
                      </Link>
                    </td>
                    <td className="px-6 py-4 text-left">
                      <div className="font-medium text-slate-900">{stock.shares} shares</div>
                      <div className="text-sm text-slate-500">Avg: ₹{stock.avgPrice}</div>
                    </td>
                    <td className="px-6 py-4 text-left font-medium text-slate-900">
                      ₹{stock.currentPrice.toFixed(2)}
                    </td>
                    <td className="px-6 py-4 text-left">
                      <div className={`inline-flex items-center px-2.5 py-1 rounded-md text-sm font-semibold ${stock.change >= 0 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                        {stock.change >= 0 ? <ArrowUpRight className="w-4 h-4 mr-1" /> : <ArrowDownRight className="w-4 h-4 mr-1" />}
                        {Math.abs(stock.change)}%
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Top Performers */}
        <div>
          <h3 className="text-xl font-bold text-slate-900 mb-4">Top Performers</h3>
          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 space-y-6">
            {topPerformers.map((stock) => (
              <Link to={`/dashboard/stock/${stock.ticker}`} key={stock.ticker} className="flex justify-between items-center group cursor-pointer">
                <div>
                  <div className="font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">{stock.ticker}</div>
                  <div className="text-sm text-slate-500">{stock.name}</div>
                </div>
                <div className="text-right">
                  <div className="font-medium text-slate-900">₹{stock.price.toFixed(2)}</div>
                  <div className="text-sm text-green-600 font-medium flex items-center justify-end">
                    <TrendingUp className="w-3 h-3 mr-1" />
                    +{stock.change}%
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
};

export default Home;
