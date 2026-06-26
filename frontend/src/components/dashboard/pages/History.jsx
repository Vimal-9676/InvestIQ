import { History as HistoryIcon, ArrowDownToLine, ArrowUpFromLine, RefreshCw, Filter } from 'lucide-react';
import TopBar from '../TopBar';

const History = () => {
  const transactions = [
    { id: 'TXN-092831', date: '26 Jun 2026', time: '14:30', type: 'Buy', asset: 'RELIANCE', shares: 5, price: 2940.50, total: 14702.50, status: 'Completed' },
    { id: 'TXN-092830', date: '25 Jun 2026', time: '10:15', type: 'Sell', asset: 'TCS', shares: 2, price: 3955.00, total: 7910.00, status: 'Completed' },
    { id: 'TXN-092829', date: '22 Jun 2026', time: '09:45', type: 'Deposit', asset: 'INR', shares: null, price: null, total: 50000.00, status: 'Completed' },
    { id: 'TXN-092828', date: '20 Jun 2026', time: '11:20', type: 'Buy', asset: 'HDFCBANK', shares: 20, price: 1450.00, total: 29000.00, status: 'Completed' },
    { id: 'TXN-092827', date: '18 Jun 2026', time: '15:10', type: 'Withdrawal', asset: 'INR', shares: null, price: null, total: 15000.00, status: 'Processing' },
    { id: 'TXN-092826', date: '15 Jun 2026', time: '12:05', type: 'Dividend', asset: 'ITC', shares: 100, price: 6.50, total: 650.00, status: 'Completed' },
  ];

  return (
    <main className="flex-1 flex flex-col h-full overflow-y-auto px-8 py-6 pb-20">
      <TopBar placeholder="Search Transactions..." />
      <header className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 mb-1">Transaction History</h1>
          <p className="text-sm text-slate-500">View and download your past transactions and account activity.</p>
        </div>
        <div className="flex items-center space-x-3">
          <button className="flex items-center px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors shadow-sm">
            <Filter className="w-4 h-4 mr-2" />
            Filter
          </button>
          <button className="flex items-center px-4 py-2 bg-indigo-600 text-white border border-transparent rounded-lg text-sm font-medium hover:bg-indigo-700 transition-colors shadow-sm">
            <ArrowDownToLine className="w-4 h-4 mr-2" />
            Download Statement
          </button>
        </div>
      </header>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-x-auto">
        <table className="w-full text-left min-w-[700px]">
          <thead>
            <tr className="border-b border-slate-100 text-sm font-medium text-slate-500 bg-slate-50/50">
              <th className="px-6 py-4">Transaction Details</th>
              <th className="px-6 py-4">Asset</th>
              <th className="px-6 py-4 text-right">Quantity & Price</th>
              <th className="px-6 py-4 text-right">Total Amount</th>
              <th className="px-6 py-4 text-right">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {transactions.map((txn) => (
              <tr key={txn.id} className="hover:bg-slate-50 transition-colors group">
                <td className="px-6 py-4">
                  <div className="flex items-center">
                    <div className={`p-2 rounded-lg mr-4 flex-shrink-0 ${
                      txn.type === 'Buy' ? 'bg-blue-50 text-blue-600' :
                      txn.type === 'Sell' ? 'bg-purple-50 text-purple-600' :
                      txn.type === 'Deposit' ? 'bg-green-50 text-green-600' :
                      txn.type === 'Dividend' ? 'bg-yellow-50 text-yellow-600' :
                      'bg-slate-100 text-slate-600'
                    }`}>
                      {txn.type === 'Buy' && <ArrowDownToLine className="w-4 h-4" />}
                      {txn.type === 'Sell' && <ArrowUpFromLine className="w-4 h-4" />}
                      {(txn.type === 'Deposit' || txn.type === 'Dividend') && <HistoryIcon className="w-4 h-4" />}
                      {txn.type === 'Withdrawal' && <ArrowUpFromLine className="w-4 h-4" />}
                    </div>
                    <div>
                      <div className="font-bold text-slate-900 text-sm">{txn.type}</div>
                      <div className="text-xs text-slate-500">{txn.date} • {txn.time}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 font-medium text-slate-900">
                  {txn.asset}
                </td>
                <td className="px-6 py-4 text-right">
                  {txn.shares ? (
                    <>
                      <div className="font-medium text-slate-900">{txn.shares} units</div>
                      <div className="text-xs text-slate-500">@ ₹{txn.price?.toFixed(2)}</div>
                    </>
                  ) : (
                    <span className="text-slate-400">-</span>
                  )}
                </td>
                <td className="px-6 py-4 text-right font-bold text-slate-900">
                  <span className={txn.type === 'Buy' || txn.type === 'Withdrawal' ? 'text-red-600' : 'text-green-600'}>
                    {txn.type === 'Buy' || txn.type === 'Withdrawal' ? '-' : '+'}₹{txn.total.toFixed(2)}
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <span className={`inline-flex items-center px-2.5 py-1 rounded-md text-xs font-semibold ${
                    txn.status === 'Completed' ? 'bg-green-100 text-green-700' : 
                    'bg-yellow-100 text-yellow-700'
                  }`}>
                    {txn.status === 'Processing' && <RefreshCw className="w-3 h-3 mr-1 animate-spin" />}
                    {txn.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
};

export default History;
