import { User, Mail, Phone, MapPin, Shield, Key, Bell, LogOut } from 'lucide-react';
import { useAuth } from '../../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <main className="flex-1 flex flex-col h-full overflow-y-auto px-8 py-6 pb-20">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900 mb-1">Profile & Settings</h1>
        <p className="text-sm text-slate-500">Manage your account details and preferences.</p>
      </header>

      <div className="grid grid-cols-3 gap-8">
        {/* Left Column: Personal Info & Navigation */}
        <div className="col-span-1 space-y-6">
          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 text-center">
            <div className="w-24 h-24 rounded-full bg-indigo-100 mx-auto mb-4 border-4 border-white shadow-sm overflow-hidden flex items-center justify-center">
              <span className="text-3xl font-bold text-indigo-600">
                {user?.name?.charAt(0) || 'U'}
              </span>
            </div>
            <h2 className="text-xl font-bold text-slate-900">{user?.name || 'User'}</h2>
            <p className="text-sm text-slate-500 mb-4">{user?.email || 'user@example.com'}</p>
            <span className="px-3 py-1 bg-green-50 text-green-700 text-xs font-semibold rounded-full border border-green-100">
              Verified Account
            </span>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
            <div className="p-2">
              <button className="w-full flex items-center px-4 py-3 bg-indigo-50 text-indigo-700 rounded-xl font-medium text-sm transition-colors">
                <User className="w-4 h-4 mr-3" />
                Personal Information
              </button>
              <button className="w-full flex items-center px-4 py-3 text-slate-600 hover:bg-slate-50 rounded-xl font-medium text-sm transition-colors mt-1">
                <Shield className="w-4 h-4 mr-3" />
                Security & Privacy
              </button>
              <button className="w-full flex items-center px-4 py-3 text-slate-600 hover:bg-slate-50 rounded-xl font-medium text-sm transition-colors mt-1">
                <Bell className="w-4 h-4 mr-3" />
                Notifications
              </button>
              <button className="w-full flex items-center px-4 py-3 text-slate-600 hover:bg-slate-50 rounded-xl font-medium text-sm transition-colors mt-1">
                <Key className="w-4 h-4 mr-3" />
                API Keys
              </button>
            </div>
            <div className="p-4 border-t border-slate-100">
              <button onClick={handleLogout} className="w-full flex items-center justify-center px-4 py-2.5 text-red-600 hover:bg-red-50 rounded-xl font-medium text-sm transition-colors">
                <LogOut className="w-4 h-4 mr-2" />
                Sign Out
              </button>
            </div>
          </div>
        </div>

        {/* Right Column: Settings Form */}
        <div className="col-span-2">
          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-8">
            <h3 className="text-lg font-bold text-slate-900 mb-6">Personal Information</h3>
            
            <form className="space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Full Name</label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input type="text" defaultValue={user?.name || "Vimal"} className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Email Address</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input type="email" defaultValue={user?.email || "vimal@example.com"} className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all" />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Phone Number</label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input type="tel" defaultValue="+91 98765 43210" className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Location</label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input type="text" defaultValue="Mumbai, India" className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all" />
                  </div>
                </div>
              </div>
              
              <div className="pt-4 flex justify-end">
                <button type="button" className="px-6 py-2.5 bg-indigo-600 text-white font-medium text-sm rounded-lg hover:bg-indigo-700 transition-colors shadow-sm">
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Profile;
