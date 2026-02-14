
import React from 'react';
import { User, AppView } from '../types';

interface NavbarProps {
  user: User | null;
  setView: (view: AppView) => void;
  onLogout: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ user, setView, onLogout }) => {
  return (
    <nav className="bg-white border-b border-slate-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <div 
          className="flex items-center gap-2 cursor-pointer group"
          onClick={() => setView(AppView.DASHBOARD)}
        >
          <div className="bg-indigo-600 p-2 rounded-lg group-hover:bg-indigo-700 transition-colors">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path></svg>
          </div>
          <span className="text-xl font-bold text-slate-900 tracking-tight">Fund<span className="text-indigo-600">AI</span></span>
        </div>

        <div className="flex items-center gap-6">
          <button 
            onClick={() => setView(AppView.SUBSCRIPTION)}
            className="hidden md:block text-slate-600 hover:text-indigo-600 font-medium transition-colors text-sm"
          >
            Pricing
          </button>
          
          <div className="h-6 w-px bg-slate-200 hidden md:block"></div>

          {user && (
            <div className="flex items-center gap-4">
              <div className="hidden sm:flex flex-col items-end">
                <span className="text-sm font-bold text-slate-900">{user.name}</span>
                <span className="text-xs text-indigo-600 font-semibold">{user.subscriptionTier} Plan</span>
              </div>
              <button 
                onClick={onLogout}
                className="p-2 text-slate-400 hover:text-red-500 transition-colors"
                title="Logout"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path></svg>
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
