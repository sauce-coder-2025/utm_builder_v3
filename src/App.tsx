// /src/App.tsx
import React, { useEffect, useState } from 'react';
import { useFormStore } from './store/formStore';
import AuthScreen from './components/AuthScreen';
import CampaignOrganization from './components/CampaignOrganization';
import CampaignTiming from './components/CampaignTiming';
import CampaignDetails from './components/CampaignDetails';
import CampaignStructure from './components/CampaignStructure';
import UTMLog from './components/UTMLog';
import { formOptions } from './data/formOptions';

const App: React.FC = () => {
  const [userEmail, setUserEmail] = useState<string | null>(
    localStorage.getItem('userEmail')
  );
  
  const { setField } = useFormStore();

  useEffect(() => {
    // Initialize form options
    setField('options', formOptions);
  }, [setField]);

  const handleLogin = (email: string) => {
    setUserEmail(email);
    localStorage.setItem('userEmail', email);
  };

  const handleLogout = () => {
    setUserEmail(null);
    localStorage.removeItem('userEmail');
  };

  if (!userEmail) {
    return <AuthScreen onLogin={handleLogin} />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center">
            <img
              src="./fp-logo.png"
              alt="Fisher & Paykel"
              className="h-8 w-auto"
            />
            <h1 className="ml-4 text-2xl font-bold text-gray-900">
              UTM Builder
            </h1>
          </div>
          <div className="flex items-center">
            <span className="text-sm text-gray-600 mr-4">{userEmail}</span>
            <button
              onClick={handleLogout}
              className="text-sm text-blue-600 hover:text-blue-800"
            >
              Sign Out
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <CampaignOrganization />
            <CampaignTiming />
            <CampaignDetails />
            <CampaignStructure />
          </div>
          <div className="lg:col-span-1">
            <UTMLog />
          </div>
        </div>
      </main>
    </div>
  );
};

export default App;
