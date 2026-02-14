
import React from 'react';
import { User } from '../types';

interface DashboardProps {
  user: User;
  onFindFunds: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({ user, onFindFunds }) => {
  return (
    <div className="max-w-6xl mx-auto w-full p-6 md:p-8">
      <header className="mb-12">
        <h1 className="text-4xl font-bold text-slate-900 mb-2">Hello, {user.name}!</h1>
        <p className="text-slate-500">Welcome back to your financial control center.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
          <div className="flex items-center justify-between mb-4">
            <span className="text-slate-400 text-sm font-medium uppercase">Active Portfolio</span>
            <div className="bg-emerald-100 p-2 rounded-lg">
              <svg className="w-5 h-5 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
            </div>
          </div>
          <div className="text-3xl font-bold text-slate-800">₹0.00</div>
          <div className="text-slate-400 text-sm mt-1">Ready to start?</div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
          <div className="flex items-center justify-between mb-4">
            <span className="text-slate-400 text-sm font-medium uppercase">Subscription</span>
            <div className="bg-indigo-100 p-2 rounded-lg">
              <svg className="w-5 h-5 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-7.714 2.143L11 21l-2.286-6.857L1 12l7.714-2.143L11 3z"></path></svg>
            </div>
          </div>
          <div className="text-3xl font-bold text-slate-800">{user.subscriptionTier}</div>
          <div className="text-indigo-600 text-sm font-semibold mt-1">Upgrade for advanced insights</div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
          <div className="flex items-center justify-between mb-4">
            <span className="text-slate-400 text-sm font-medium uppercase">Market Status</span>
            <div className="bg-blue-100 p-2 rounded-lg">
              <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
            </div>
          </div>
          <div className="text-3xl font-bold text-slate-800">Open</div>
          <div className="text-emerald-500 text-sm font-semibold mt-1">Healthy conditions</div>
        </div>
      </div>

      <div className="bg-indigo-600 rounded-3xl p-8 md:p-12 text-white flex flex-col md:flex-row items-center justify-between overflow-hidden relative">
        <div className="z-10 max-w-lg mb-8 md:mb-0">
          <h2 className="text-3xl font-bold mb-4">Ready to find your next investment?</h2>
          <p className="text-indigo-100 mb-8">
            Tell us about your goals, risk appetite, and time horizon. Our AI engine will scan thousands of mutual funds to suggest the best fit for you.
          </p>
          <button 
            onClick={onFindFunds}
            className="bg-white text-indigo-600 px-8 py-3 rounded-xl font-bold hover:bg-slate-50 transition-colors shadow-lg"
          >
            Find Funds Now
          </button>
        </div>
        <div className="relative h-48 w-48 md:h-64 md:w-64 opacity-20 md:opacity-100">
          <svg className="absolute top-0 right-0 w-full h-full text-indigo-400" viewBox="0 0 200 200" fill="currentColor">
            <circle cx="100" cy="100" r="100" />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center scale-150">
             <svg className="w-32 h-32 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path></svg>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
