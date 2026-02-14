
import * as React from 'react';

interface LoginProps {
  onLogin: (name: string, email: string) => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.debug('Login attempt with:', { name, email });
    if (name.trim() && email.trim()) {
      onLogin(name, email);
    }
  };

  const handleQuickLogin = () => {
    onLogin('Guest User', 'guest@fundai.io');
  };

  return (
    <div className="min-h-screen w-full flex flex-col md:flex-row">
      <div className="md:w-1/2 bg-indigo-600 flex items-center justify-center p-12 text-white">
        <div className="max-w-md">
          <h1 className="text-5xl font-bold mb-6">Invest Smarter with FundAI</h1>
          <p className="text-xl text-indigo-100 mb-8 leading-relaxed">
            Personalized mutual fund strategies tailored to your life goals. Powered by the latest in generative AI for objective, data-driven advice.
          </p>
          <div className="space-y-4">
            <div className="flex items-start gap-4">
              <div className="bg-indigo-500 p-2 rounded-lg">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
              </div>
              <div>
                <h3 className="font-semibold">Smart Diversification</h3>
                <p className="text-indigo-200 text-sm">Balanced portfolios based on risk analysis.</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="bg-indigo-500 p-2 rounded-lg">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path></svg>
              </div>
              <div>
                <h3 className="font-semibold">Performance Tracking</h3>
                <p className="text-indigo-200 text-sm">Real-time insights into fund growth.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="md:w-1/2 flex items-center justify-center p-8 bg-slate-50">
        <div className="max-w-md w-full bg-white p-8 rounded-2xl shadow-xl shadow-slate-200">
          <h2 className="text-3xl font-bold text-slate-800 mb-2">Welcome back</h2>
          <p className="text-slate-500 mb-8">Login to manage your portfolio</p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Full Name</label>
              <input 
                type="text" 
                required
                className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                placeholder="John Doe"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Email Address</label>
              <input 
                type="email" 
                required
                className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                placeholder="john@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <button 
              type="submit"
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 rounded-lg transition-colors shadow-lg shadow-indigo-200 focus:outline-none focus:ring-4 focus:ring-indigo-300"
            >
              Get Started
            </button>
          </form>

          <div className="mt-4">
            <button 
              onClick={handleQuickLogin}
              className="w-full bg-slate-100 hover:bg-slate-200 text-slate-600 font-semibold py-3 rounded-lg transition-colors flex items-center justify-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
              Quick Demo Access
            </button>
          </div>

          <div className="mt-8 pt-8 border-t border-slate-100 text-center">
            <p className="text-sm text-slate-500">
              New to FundAI? <a href="#" className="text-indigo-600 font-semibold hover:underline">Create an account</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
