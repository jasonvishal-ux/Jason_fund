
import React from 'react';
import { InvestmentProfile, MutualFund, User } from '../types';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface ResultsProps {
  profile: InvestmentProfile;
  funds: MutualFund[];
  onBack: () => void;
  user: User;
  onUpgrade: () => void;
}

const Results: React.FC<ResultsProps> = ({ profile, funds, onBack, user, onUpgrade }) => {
  // Simple projection for chart
  const averageReturn = funds.length > 0 
    ? funds.reduce((acc, fund) => acc + fund.historicalReturns.threeYear, 0) / funds.length
    : 12; // default 12%

  const chartData = Array.from({ length: profile.period + 1 }, (_, i) => {
    const value = profile.amount * Math.pow(1 + averageReturn / 100, i);
    return { year: `Year ${i}`, value: Math.round(value) };
  });

  return (
    <div className="max-w-6xl mx-auto w-full p-6 md:p-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <button onClick={onBack} className="text-indigo-600 font-semibold mb-2 flex items-center gap-1 hover:underline">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path></svg>
            Back to Planner
          </button>
          <h1 className="text-3xl font-bold text-slate-900">Recommended Portfolio</h1>
        </div>
        <div className="flex items-center gap-2 bg-slate-100 px-4 py-2 rounded-lg">
          <span className="text-sm font-medium text-slate-500 uppercase">Strategy:</span>
          <span className="text-sm font-bold text-indigo-700">{profile.risk} Risk / {profile.category}</span>
        </div>
      </div>

      {/* Projection Chart */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 mb-8">
        <h2 className="text-lg font-bold text-slate-800 mb-4">Estimated Growth Projection</h2>
        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData}>
              <defs>
                <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.1}/>
                  <stop offset="95%" stopColor="#4f46e5" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
              <XAxis dataKey="year" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
              <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
              <Tooltip 
                contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                formatter={(value: any) => [`₹${value.toLocaleString()}`, 'Projected Value']}
              />
              <Area type="monotone" dataKey="value" stroke="#4f46e5" strokeWidth={3} fillOpacity={1} fill="url(#colorValue)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
        <p className="text-xs text-slate-400 mt-4 italic text-center">
          *Projections are based on historical 3-year averages (${averageReturn.toFixed(1)}%). Past performance does not guarantee future results.
        </p>
      </div>

      {/* Fund Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
        {funds.map((fund, idx) => (
          <div key={idx} className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="font-bold text-slate-900 text-lg leading-tight mb-1">{fund.name}</h3>
                <span className="text-xs font-semibold px-2 py-1 rounded-full bg-slate-100 text-slate-500">{fund.category}</span>
              </div>
              <div className="text-right">
                <div className="text-emerald-500 font-bold text-lg">{fund.historicalReturns.threeYear}%</div>
                <div className="text-slate-400 text-xs uppercase font-medium">3Y Annualized</div>
              </div>
            </div>

            <p className="text-slate-600 text-sm mb-6 line-clamp-3">{fund.description}</p>

            <div className="grid grid-cols-3 gap-2 mb-6">
              <div className="bg-slate-50 p-2 rounded-lg text-center">
                <div className="text-xs text-slate-400 mb-1">Expense</div>
                <div className="text-sm font-bold text-slate-700">{fund.expenseRatio}%</div>
              </div>
              <div className="bg-slate-50 p-2 rounded-lg text-center">
                <div className="text-xs text-slate-400 mb-1">Risk</div>
                <div className="text-sm font-bold text-slate-700">{fund.riskRating}</div>
              </div>
              <div className="bg-slate-50 p-2 rounded-lg text-center">
                <div className="text-xs text-slate-400 mb-1">5Y Return</div>
                <div className="text-sm font-bold text-emerald-600">{fund.historicalReturns.fiveYear}%</div>
              </div>
            </div>

            <div className="bg-indigo-50 p-4 rounded-xl border border-indigo-100">
              <h4 className="text-xs font-bold text-indigo-700 uppercase mb-2 flex items-center gap-1">
                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd"></path></svg>
                Why this fund?
              </h4>
              <p className="text-xs text-indigo-900 italic leading-relaxed">{fund.whyThisFund}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Subscription CTA */}
      {!user.isSubscribed && (
        <div className="bg-indigo-600 rounded-2xl p-8 text-center text-white sticky bottom-8 shadow-2xl shadow-indigo-200">
          <h3 className="text-xl font-bold mb-2">Want a deep-dive analysis?</h3>
          <p className="text-indigo-100 mb-6 max-w-2xl mx-auto">
            Our Elite members get detailed volatility metrics, sector allocation breakdowns, and direct portfolio export features.
          </p>
          <button 
            onClick={onUpgrade}
            className="bg-white text-indigo-600 px-8 py-3 rounded-xl font-bold hover:bg-slate-50 transition-colors shadow-lg"
          >
            Upgrade to Elite
          </button>
        </div>
      )}
    </div>
  );
};

export default Results;
