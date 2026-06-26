import { useState } from 'react';
import { TrendingUp, TrendingDown, Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import TopBar from '../TopBar';

const Watchlist = () => {
  const [searchTerm, setSearchTerm] = useState('');
  
  const allStocks = [
    { ticker: 'RELIANCE', name: 'Reliance Industries', price: 2945.80, change: 1.24 },
    { ticker: 'TCS', name: 'Tata Consultancy Services', price: 3950.20, change: -0.45 },
    { ticker: 'HDFCBANK', name: 'HDFC Bank', price: 1455.50, change: 0.89 },
    { ticker: 'INFY', name: 'Infosys Ltd.', price: 1680.10, change: -1.12 },
    { ticker: 'ICICIBANK', name: 'ICICI Bank', price: 1045.60, change: 2.34 },
    { ticker: 'SBIN', name: 'State Bank of India', price: 760.40, change: 1.05 },
    { ticker: 'BHARTIARTL', name: 'Bharti Airtel', price: 1120.30, change: -0.25 },
    { ticker: 'ITC', name: 'ITC Ltd.', price: 420.75, change: 0.56 },
  ];

  const filteredStocks = allStocks.filter(stock => 
    stock.ticker.toLowerCase().includes(searchTerm.toLowerCase()) || 
    stock.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <main className="flex-1 flex flex-col h-full overflow-y-auto px-8 py-6 pb-20">
      <TopBar 
        placeholder="Search Watchlist..." 
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <div className="flex justify-between items-end mb-6">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 mb-1">My Watchlist</h1>
          <p className="text-sm text-slate-500">{filteredStocks.length} items</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-x-auto">
        <table className="w-full text-left min-w-[600px]">
          <thead>
            <tr className="border-b border-slate-100 text-sm font-medium text-slate-500 bg-slate-50/50">
              <th className="px-6 py-4 w-12"></th>
              <th className="px-6 py-4">Company</th>
              <th className="px-6 py-4 text-left">Market Price</th>
              <th className="px-6 py-4 text-left">Change (1D)</th>
              <th className="px-6 py-4 w-24"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {filteredStocks.map((stock) => (
              <tr key={stock.ticker} className="hover:bg-slate-50 transition-colors group">
                <td className="px-6 py-4">
                  <Star className="w-5 h-5 text-yellow-400 fill-current cursor-pointer" />
                </td>
                <td className="px-6 py-4">
                  <Link to={`/dashboard/stock/${stock.ticker}`} className="block">
                    <div className="font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">{stock.ticker}</div>
                    <div className="text-sm text-slate-500">{stock.name}</div>
                  </Link>
                </td>
                <td className="px-6 py-4 text-left font-medium text-slate-900">
                  ₹{stock.price.toFixed(2)}
                </td>
                <td className="px-6 py-4 text-left">
                  <div className={`inline-flex items-center text-sm font-semibold ${stock.change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {stock.change >= 0 ? <TrendingUp className="w-4 h-4 mr-1" /> : <TrendingDown className="w-4 h-4 mr-1" />}
                    {stock.change > 0 ? '+' : ''}{stock.change}%
                  </div>
                </td>
                <td className="px-6 py-4 text-right">
                   <Link to={`/dashboard/stock/${stock.ticker}`} className="px-3 py-1.5 bg-indigo-50 text-indigo-600 font-medium text-sm rounded-lg hover:bg-indigo-100 transition-colors opacity-0 group-hover:opacity-100">
                     Analyze
                   </Link>
                </td>
              </tr>
            ))}
            {filteredStocks.length === 0 && (
              <tr>
                <td colSpan="5" className="px-6 py-8 text-center text-slate-500">
                  No stocks found matching "{searchTerm}"
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </main>
  );
};

export default Watchlist;
