import React, { useState, useRef, useEffect } from 'react';
import { Search, Bell } from 'lucide-react';
import { Link } from 'react-router-dom';

const TopBar = ({ placeholder = "Search...", value, onChange, children }) => {
  const [showNotifications, setShowNotifications] = useState(false);
  const notifRef = useRef(null);

  const notifications = [
    { id: 1, title: 'Price Alert: RELIANCE', text: 'Reliance has hit your target price of ₹2900.', time: '10m ago', unread: true },
    { id: 2, title: 'Order Executed', text: 'Bought 5 shares of TCS at ₹3950.', time: '1h ago', unread: false },
    { id: 3, title: 'System Maintenance', text: 'Platform will be down for 30m this weekend.', time: '2d ago', unread: false },
  ];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (notifRef.current && !notifRef.current.contains(event.target)) {
        setShowNotifications(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="flex items-center justify-between mb-8">
      <div className="relative w-full max-w-xl">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
        <input 
          type="text" 
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className="w-full pl-12 pr-4 py-3 bg-white border border-slate-200 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all text-sm"
        />
      </div>
      <div className="flex items-center space-x-4">
        {children}
        <div className="relative" ref={notifRef}>
          <button 
            onClick={() => setShowNotifications(!showNotifications)} 
            className="relative text-slate-500 hover:text-slate-700 transition-colors p-2"
          >
            <Bell className="w-6 h-6" />
            {notifications.some(n => n.unread) && (
              <span className="absolute top-1 right-2 w-2.5 h-2.5 bg-red-500 border-2 border-[#F8FAFC] rounded-full"></span>
            )}
          </button>
          
          {/* Notification Dropdown */}
          <div className={`absolute right-0 mt-2 w-80 bg-white rounded-2xl shadow-xl border border-slate-100 z-50 transform origin-top-right transition-all duration-300 ease-in-out ${showNotifications ? 'scale-100 opacity-100 visible' : 'scale-95 opacity-0 invisible'}`}>
            <div className="p-4 border-b border-slate-100 flex justify-between items-center">
              <h3 className="font-bold text-slate-900">Notifications</h3>
              <button className="text-xs text-indigo-600 font-medium hover:text-indigo-800">Mark all as read</button>
            </div>
            <div className="max-h-96 overflow-y-auto">
              {notifications.map(notif => (
                <div key={notif.id} className={`p-4 border-b border-slate-50 hover:bg-slate-50 transition-colors cursor-pointer ${notif.unread ? 'bg-indigo-50/30' : ''}`}>
                  <div className="flex justify-between items-start mb-1">
                    <h4 className={`text-sm font-semibold ${notif.unread ? 'text-slate-900' : 'text-slate-700'}`}>{notif.title}</h4>
                    <span className="text-xs text-slate-400">{notif.time}</span>
                  </div>
                  <p className="text-xs text-slate-500 line-clamp-2">{notif.text}</p>
                </div>
              ))}
            </div>
            <div className="p-3 text-center border-t border-slate-100">
              <button className="text-sm font-medium text-slate-600 hover:text-indigo-600">View All</button>
            </div>
          </div>
        </div>
        <Link to="/dashboard/profile" className="w-10 h-10 rounded-full bg-indigo-100 overflow-hidden border-2 border-slate-200 shadow-sm block hover:ring-2 hover:ring-indigo-500 transition-all">
          <img src="https://ui-avatars.com/api/?name=User&background=3b82f6&color=fff" alt="User" className="w-full h-full object-cover" />
        </Link>
      </div>
    </header>
  );
};

export default TopBar;
