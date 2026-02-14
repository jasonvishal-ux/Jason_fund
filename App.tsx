
import * as React from 'react';
import { AppView, User, InvestmentProfile, MutualFund, RiskLevel, FundCategory } from './types';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Finder from './pages/Finder';
import Results from './pages/Results';
import Subscription from './pages/Subscription';
import Navbar from './components/Navbar';

const App: React.FC = () => {
  const [view, setView] = React.useState<AppView>(AppView.LOGIN);
  const [user, setUser] = React.useState<User | null>(null);
  const [profile, setProfile] = React.useState<InvestmentProfile | null>(null);
  const [results, setResults] = React.useState<MutualFund[]>([]);

  // Simulation of auth state check
  React.useEffect(() => {
    try {
      const savedUser = localStorage.getItem('fundai_user');
      if (savedUser) {
        const parsedUser = JSON.parse(savedUser);
        setUser(parsedUser);
        setView(AppView.DASHBOARD);
      }
    } catch (e) {
      console.error("Failed to load user from local storage", e);
      localStorage.removeItem('fundai_user');
    }
  }, []);

  const handleLogin = (name: string, email: string) => {
    const newUser: User = {
      id: Math.random().toString(36).substring(2, 11),
      name,
      email,
      isSubscribed: false,
      subscriptionTier: 'Free'
    };
    setUser(newUser);
    localStorage.setItem('fundai_user', JSON.stringify(newUser));
    setView(AppView.DASHBOARD);
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('fundai_user');
    setView(AppView.LOGIN);
  };

  const updateSubscription = (tier: 'Free' | 'Pro' | 'Elite') => {
    if (user) {
      const updatedUser: User = { ...user, isSubscribed: tier !== 'Free', subscriptionTier: tier };
      setUser(updatedUser);
      localStorage.setItem('fundai_user', JSON.stringify(updatedUser));
    }
  };

  const renderContent = () => {
    switch (view) {
      case AppView.LOGIN:
        return <Login onLogin={handleLogin} />;
      case AppView.DASHBOARD:
        if (!user) return <Login onLogin={handleLogin} />;
        return <Dashboard user={user} onFindFunds={() => setView(AppView.FINDER)} />;
      case AppView.FINDER:
        return <Finder onGenerate={(p, r) => {
          setProfile(p);
          setResults(r);
          setView(AppView.RESULTS);
        }} />;
      case AppView.RESULTS:
        if (!profile) return <Finder onGenerate={(p, r) => { setProfile(p); setResults(r); setView(AppView.RESULTS); }} />;
        return <Results 
                  profile={profile} 
                  funds={results} 
                  onBack={() => setView(AppView.FINDER)} 
                  user={user!}
                  onUpgrade={() => setView(AppView.SUBSCRIPTION)}
                />;
      case AppView.SUBSCRIPTION:
        return <Subscription 
                  currentTier={user?.subscriptionTier || 'Free'} 
                  onSelect={updateSubscription} 
                  onBack={() => setView(AppView.DASHBOARD)} 
                />;
      default:
        return <Login onLogin={handleLogin} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      {view !== AppView.LOGIN && user && <Navbar user={user} setView={setView} onLogout={handleLogout} />}
      <main className="flex-grow flex flex-col">
        {renderContent()}
      </main>
      <footer className="bg-white border-t py-6 text-center text-slate-500 text-sm">
        &copy; {new Date().getFullYear()} FundAI. Financial planning powered by artificial intelligence.
      </footer>
    </div>
  );
};

export default App;
