import { TrendingUp, TrendingDown, Wallet, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import TopBar from '../TopBar';
import { useAuth } from '../../../context/AuthContext';
import { useState, useEffect } from 'react';
import axios from 'axios';

const Home = () => {
  const { user } = useAuth();
  
  const [portfolio, setPortfolio] = useState({
    invested_amount: 0,
    available_balance: 0,
    total_portfolio_value: 0,
    companies_invested: []
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPortfolio = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/portfolio');
        setPortfolio(res.data);
      } catch (error) {
        console.warn('Portfolio data not found in DB or error fetching. Falling back to mock data.', error);
        setPortfolio({
          invested_amount: 76000.00,
          available_balance: 12450.00,
          total_portfolio_value: 78319.00,
          companies_invested: [
            { ticker: 'RELIANCE', company_name: 'Reliance Ind.', shares: 10, avgPrice: 2800, current_price: 2945.80, percentage_returns: 1.24 },
            { ticker: 'TCS', company_name: 'Tata Consultancy', shares: 5, avgPrice: 3800, current_price: 3950.20, percentage_returns: -0.45 },
            { ticker: 'HDFCBANK', company_name: 'HDFC Bank', shares: 20, avgPrice: 1400, current_price: 1455.50, percentage_returns: 0.89 },
          ]
        });
      } finally {
        setLoading(false);
      }
    };
    
    if (user) {
      fetchPortfolio();
    }
  }, [user]);

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
        <h1 className="text-3xl font-bold text-slate-900 mb-2">Hello, {user?.name || user?.full_name || 'User'} 👋</h1>
        <p className="text-slate-500">Here's your investment overview for today.</p>
      </div>

      {/* Portfolio Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-indigo-600 text-white p-6 rounded-2xl shadow-md">
          <div className="flex items-center space-x-2 text-indigo-100 mb-4">
            <Wallet className="w-5 h-5" />
            <span className="font-medium">Total Portfolio Value</span>
          </div>
          <h2 className="text-4xl font-bold tracking-tight">₹{portfolio.total_portfolio_value.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}</h2>
          <div className="mt-4 flex items-center text-sm font-medium bg-white/20 w-max px-3 py-1 rounded-full">
            <TrendingUp className="w-4 h-4 mr-1" />
            +₹{(portfolio.total_portfolio_value - portfolio.invested_amount).toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})} ({portfolio.invested_amount ? ((portfolio.total_portfolio_value - portfolio.invested_amount) / portfolio.invested_amount * 100).toFixed(2) : '0.00'}%)
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-col justify-center">
          <span className="text-slate-500 font-medium mb-1">Invested Amount</span>
          <h3 className="text-2xl font-bold text-slate-900">₹{portfolio.invested_amount.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}</h3>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-col justify-center">
          <span className="text-slate-500 font-medium mb-1">Available to Invest</span>
          <h3 className="text-2xl font-bold text-slate-900">₹{portfolio.available_balance.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}</h3>
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
                {portfolio.companies_invested.map((stock) => (
                  <tr key={stock.ticker} className="hover:bg-slate-50 transition-colors group">
                    <td className="px-6 py-4 text-left">
                      <Link to={`/dashboard/stock/${stock.ticker}`} className="block">
                        <div className="font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">{stock.ticker}</div>
                        <div className="text-sm text-slate-500">{stock.company_name}</div>
                      </Link>
                    </td>
                    <td className="px-6 py-4 text-left">
                      <div className="font-medium text-slate-900">{stock.shares} shares</div>
                      <div className="text-sm text-slate-500">Avg: ₹{stock.avgPrice || (stock.current_price / (1 + stock.percentage_returns / 100)).toFixed(2)}</div>
                    </td>
                    <td className="px-6 py-4 text-left font-medium text-slate-900">
                      ₹{stock.current_price?.toFixed(2)}
                    </td>
                    <td className="px-6 py-4 text-left">
                      <div className={`inline-flex items-center px-2.5 py-1 rounded-md text-sm font-semibold ${stock.percentage_returns >= 0 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                        {stock.percentage_returns >= 0 ? <ArrowUpRight className="w-4 h-4 mr-1" /> : <ArrowDownRight className="w-4 h-4 mr-1" />}
                        {Math.abs(stock.percentage_returns)}%
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
