
import React, { useState } from 'react';
import { InvestmentProfile, RiskLevel, FundCategory, MutualFund } from '../types';
import { getFundSuggestions } from '../services/geminiService';

interface FinderProps {
  onGenerate: (profile: InvestmentProfile, results: MutualFund[]) => void;
}

const Finder: React.FC<FinderProps> = ({ onGenerate }) => {
  const [loading, setLoading] = useState(false);
  const [profile, setProfile] = useState<InvestmentProfile>({
    amount: 10000,
    period: 5,
    risk: RiskLevel.MODERATE,
    category: FundCategory.EQUITY
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const results = await getFundSuggestions(profile);
      onGenerate(profile, results);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto w-full p-6 md:p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900 mb-2">Build Your Strategy</h1>
        <p className="text-slate-500">Provide some details to help us customize your mutual fund suggestions.</p>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-8">
        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Amount */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700">Investment Amount (Monthly SIP / One-time)</label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold">₹</span>
                <input 
                  type="number"
                  className="w-full pl-8 pr-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none"
                  value={profile.amount}
                  onChange={(e) => setProfile({...profile, amount: parseInt(e.target.value)})}
                  min="500"
                />
              </div>
            </div>

            {/* Period */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700">Investment Period (Years)</label>
              <input 
                type="range"
                className="w-full h-2 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                min="1"
                max="30"
                value={profile.period}
                onChange={(e) => setProfile({...profile, period: parseInt(e.target.value)})}
              />
              <div className="flex justify-between text-xs text-slate-400 font-medium">
                <span>1 Year</span>
                <span className="text-indigo-600 font-bold">{profile.period} Years</span>
                <span>30 Years</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Risk */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700">Risk Tolerance</label>
              <div className="grid grid-cols-2 gap-2">
                {Object.values(RiskLevel).map((level) => (
                  <button
                    key={level}
                    type="button"
                    onClick={() => setProfile({...profile, risk: level})}
                    className={`py-2 px-4 rounded-lg text-sm font-medium border transition-all ${
                      profile.risk === level 
                        ? 'bg-indigo-50 border-indigo-200 text-indigo-700 ring-1 ring-indigo-200' 
                        : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300'
                    }`}
                  >
                    {level}
                  </button>
                ))}
              </div>
            </div>

            {/* Category */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700">Preferred Category</label>
              <select 
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none bg-white"
                value={profile.category}
                onChange={(e) => setProfile({...profile, category: e.target.value as FundCategory})}
              >
                {Object.values(FundCategory).map(cat => (
                  <option key={cat} value={cat}>{cat} Funds</option>
                ))}
              </select>
            </div>
          </div>

          <div className="pt-6 border-t border-slate-100">
            <button 
              type="submit"
              disabled={loading}
              className={`w-full py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-2 transition-all shadow-lg ${
                loading 
                ? 'bg-slate-200 text-slate-500 cursor-not-allowed' 
                : 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-indigo-200'
              }`}
            >
              {loading ? (
                <>
                  <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                  Analyzing Market Data...
                </>
              ) : (
                <>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                  Generate Suggestions
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Finder;
