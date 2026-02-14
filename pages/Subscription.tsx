
import React from 'react';

interface SubscriptionProps {
  currentTier: 'Free' | 'Pro' | 'Elite';
  onSelect: (tier: 'Free' | 'Pro' | 'Elite') => void;
  onBack: () => void;
}

const Subscription: React.FC<SubscriptionProps> = ({ currentTier, onSelect, onBack }) => {
  const plans = [
    {
      name: 'Free',
      price: '₹0',
      description: 'Basic suggestions for casual investors.',
      features: [
        'Up to 4 fund suggestions',
        'Basic growth projection',
        'Historical returns overview',
        'Standard AI processing'
      ],
      tier: 'Free' as const
    },
    {
      name: 'Pro',
      price: '₹499',
      period: '/ month',
      description: 'Advanced tools for serious wealth builders.',
      features: [
        'Unlimited fund suggestions',
        'Advanced growth models',
        'Sector exposure analysis',
        'Priority AI processing',
        'Ad-free experience'
      ],
      tier: 'Pro' as const,
      highlight: true
    },
    {
      name: 'Elite',
      price: '₹999',
      period: '/ month',
      description: 'The ultimate professional suite.',
      features: [
        'Everything in Pro',
        '1-on-1 AI strategy session',
        'Tax optimization reports',
        'Direct portfolio export',
        'Beta access to new models'
      ],
      tier: 'Elite' as const
    }
  ];

  return (
    <div className="max-w-6xl mx-auto w-full p-6 md:p-8">
      <div className="text-center mb-12">
        <button onClick={onBack} className="text-indigo-600 font-semibold mb-2 hover:underline inline-flex items-center gap-1">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path></svg>
          Back to Dashboard
        </button>
        <h1 className="text-4xl font-bold text-slate-900 mb-4">Choose Your Path to Wealth</h1>
        <p className="text-slate-500 max-w-xl mx-auto">Scale your investments with premium features designed for maximum returns and minimum risk.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {plans.map((plan) => (
          <div 
            key={plan.name}
            className={`relative flex flex-col p-8 rounded-3xl border ${
              plan.highlight 
                ? 'bg-white border-indigo-600 shadow-2xl shadow-indigo-100 ring-2 ring-indigo-600 ring-opacity-10' 
                : 'bg-white border-slate-100 shadow-sm'
            }`}
          >
            {plan.highlight && (
              <span className="absolute -top-4 left-1/2 -translate-x-1/2 bg-indigo-600 text-white text-xs font-bold px-4 py-1 rounded-full uppercase tracking-wider">
                Most Popular
              </span>
            )}
            
            <div className="mb-8">
              <h3 className="text-xl font-bold text-slate-900 mb-2">{plan.name}</h3>
              <div className="flex items-baseline gap-1 mb-2">
                <span className="text-4xl font-bold text-slate-900">{plan.price}</span>
                {plan.period && <span className="text-slate-400">{plan.period}</span>}
              </div>
              <p className="text-slate-500 text-sm">{plan.description}</p>
            </div>

            <ul className="space-y-4 mb-10 flex-grow">
              {plan.features.map((feature, fidx) => (
                <li key={fidx} className="flex items-start gap-3 text-sm text-slate-600">
                  <svg className="w-5 h-5 text-indigo-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path></svg>
                  {feature}
                </li>
              ))}
            </ul>

            <button 
              onClick={() => {
                onSelect(plan.tier);
                onBack();
              }}
              disabled={currentTier === plan.tier}
              className={`w-full py-3 rounded-xl font-bold transition-all ${
                currentTier === plan.tier
                  ? 'bg-slate-100 text-slate-400 cursor-not-allowed'
                  : plan.highlight
                    ? 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-lg shadow-indigo-100'
                    : 'bg-slate-900 text-white hover:bg-black shadow-lg shadow-slate-100'
              }`}
            >
              {currentTier === plan.tier ? 'Current Plan' : 'Get Started'}
            </button>
          </div>
        ))}
      </div>

      <div className="mt-16 text-center">
        <p className="text-slate-400 text-sm">
          All plans include a 30-day money-back guarantee. No questions asked.
        </p>
      </div>
    </div>
  );
};

export default Subscription;
