import { Briefcase, CreditCard, PieChart, FileText } from 'lucide-react';
import TopBar from '../TopBar';

const Portfolio = () => {
  return (
    <main className="flex-1 flex flex-col h-full overflow-y-auto px-8 py-6 pb-20">
      <TopBar placeholder="Search Portfolio..." />
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900 mb-1">Portfolio & Accounts</h1>
        <p className="text-sm text-slate-500">Manage your Demat accounts, holdings, and IPO applications.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        {/* Demat Account Details */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
          <div className="flex items-center space-x-3 mb-6">
            <div className="p-3 bg-indigo-50 rounded-xl">
              <CreditCard className="w-6 h-6 text-indigo-600" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900">Linked Demat Account</h2>
              <p className="text-xs text-slate-500">Active • Verified</p>
            </div>
          </div>
          
          <div className="space-y-4">
            <div className="flex justify-between pb-4 border-b border-slate-50">
              <span className="text-sm text-slate-500">Broker</span>
              <span className="font-medium text-slate-900">Zerodha Broking Ltd.</span>
            </div>
            <div className="flex justify-between pb-4 border-b border-slate-50">
              <span className="text-sm text-slate-500">DP ID</span>
              <span className="font-medium text-slate-900">IN301549</span>
            </div>
            <div className="flex justify-between pb-4 border-b border-slate-50">
              <span className="text-sm text-slate-500">Client ID</span>
              <span className="font-medium text-slate-900">83921034</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-slate-500">Account Status</span>
              <span className="font-medium text-green-600 bg-green-50 px-2 py-0.5 rounded">Active</span>
            </div>
          </div>
          
          <button className="w-full mt-6 py-2.5 bg-slate-50 text-indigo-600 font-medium text-sm rounded-xl hover:bg-indigo-50 transition-colors">
            Manage Account
          </button>
        </div>

        {/* Asset Allocation */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
          <div className="flex items-center space-x-3 mb-6">
            <div className="p-3 bg-indigo-50 rounded-xl">
              <PieChart className="w-6 h-6 text-indigo-600" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900">Asset Allocation</h2>
              <p className="text-xs text-slate-500">Current holding breakdown</p>
            </div>
          </div>
          
          <div className="space-y-4 mt-8">
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="font-medium text-slate-700">Equity (Stocks)</span>
                <span className="font-bold text-slate-900">65%</span>
              </div>
              <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                <div className="w-[65%] h-full bg-indigo-600 rounded-full"></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="font-medium text-slate-700">Mutual Funds</span>
                <span className="font-bold text-slate-900">25%</span>
              </div>
              <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                <div className="w-[25%] h-full bg-blue-500 rounded-full"></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="font-medium text-slate-700">Gold (SGBs)</span>
                <span className="font-bold text-slate-900">10%</span>
              </div>
              <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                <div className="w-[10%] h-full bg-yellow-400 rounded-full"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <h3 className="text-xl font-bold text-slate-900 mb-4 mt-8">IPO Applications</h3>
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-x-auto">
        <table className="w-full text-left min-w-[600px]">
          <thead>
            <tr className="border-b border-slate-100 text-sm font-medium text-slate-500 bg-slate-50/50">
              <th className="px-6 py-4">Company Name</th>
              <th className="px-6 py-4">Application No.</th>
              <th className="px-6 py-4">Amount</th>
              <th className="px-6 py-4">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            <tr className="hover:bg-slate-50 transition-colors">
              <td className="px-6 py-4 font-medium text-slate-900">Swiggy Ltd.</td>
              <td className="px-6 py-4 text-sm text-slate-500">APP928174</td>
              <td className="px-6 py-4 font-medium text-slate-900">₹14,800.00</td>
              <td className="px-6 py-4">
                <span className="px-2.5 py-1 bg-yellow-50 text-yellow-700 text-xs font-semibold rounded-md border border-yellow-100">Allotment Pending</span>
              </td>
            </tr>
            <tr className="hover:bg-slate-50 transition-colors">
              <td className="px-6 py-4 font-medium text-slate-900">Tata Tech</td>
              <td className="px-6 py-4 text-sm text-slate-500">APP109283</td>
              <td className="px-6 py-4 font-medium text-slate-900">₹14,950.00</td>
              <td className="px-6 py-4">
                <span className="px-2.5 py-1 bg-green-50 text-green-700 text-xs font-semibold rounded-md border border-green-100">Allotted</span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </main>
  );
};

export default Portfolio;
