import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, User, Settings, Calendar, MapPin, Trophy, Edit } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import ProfileSettings from './ProfileSettings';
import BookingManager from './BookingManager';

const UserProfile: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<'overview' | 'settings' | 'bookings'>('overview');

  if (!user) {
    navigate('/');
    return null;
  }

  const tabs = [
    { id: 'overview', label: 'Übersicht', icon: User },
    { id: 'settings', label: 'Einstellungen', icon: Settings },
    { id: 'bookings', label: 'Buchungen', icon: Calendar }
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <div className="space-y-6">
            {/* Profile Overview */}
            <div className="bg-gray-700 rounded-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-semibold text-white">Profil-Übersicht</h3>
                <button
                  onClick={() => setActiveTab('settings')}
                  className="text-orange-500 hover:text-orange-400 transition-colors duration-200"
                >
                  <Edit className="w-5 h-5" />
                </button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-white font-medium mb-2">Persönliche Daten</h4>
                  <div className="space-y-2 text-gray-300">
                    <p><span className="text-gray-400">Name:</span> {user.name}</p>
                    <p><span className="text-gray-400">E-Mail:</span> {user.email}</p>
                    <p><span className="text-gray-400">Mitglied seit:</span> {new Date().toLocaleDateString('de-DE')}</p>
                  </div>
                </div>
                
                <div>
                  <h4 className="text-white font-medium mb-2">Aktivitäts-Statistiken</h4>
                  <div className="space-y-2 text-gray-300">
                    <p><span className="text-gray-400">Events besucht:</span> 12</p>
                    <p><span className="text-gray-400">Events erstellt:</span> 3</p>
                    <p><span className="text-gray-400">Bewertung:</span> ⭐ 4.8</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Sports Preferences */}
            <div className="bg-gray-700 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-white mb-4">Sport-Präferenzen</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {['Fußball', 'Basketball', 'Laufen'].map((sport) => (
                  <div key={sport} className="bg-gray-600 rounded-lg p-3 text-center">
                    <div className="text-white font-medium">{sport}</div>
                    <div className="text-orange-400 text-sm">Fortgeschritten</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Location Preferences */}
            <div className="bg-gray-700 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-white mb-4">Standort-Präferenzen</h3>
              <div className="flex items-center gap-2 text-gray-300">
                <MapPin className="w-5 h-5 text-orange-500" />
                <span>Nordend, Westend, Innenstadt</span>
              </div>
            </div>
          </div>
        );
      
      case 'settings':
        return <ProfileSettings />;
      
      case 'bookings':
        return <BookingManager />;
      
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 pt-24 pb-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-center mb-8">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center text-gray-300 hover:text-orange-500 transition-colors duration-200 mr-6"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Zurück
          </button>
          <h1 className="text-3xl font-bold text-white">Mein Profil</h1>
        </div>

        <div className="bg-gray-800 rounded-2xl border border-gray-700 overflow-hidden">
          {/* Tab Navigation */}
          <div className="border-b border-gray-700">
            <nav className="flex">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as any)}
                    className={`flex items-center gap-2 px-6 py-4 font-medium transition-colors duration-200 ${
                      activeTab === tab.id
                        ? 'text-orange-500 border-b-2 border-orange-500 bg-gray-700'
                        : 'text-gray-300 hover:text-white hover:bg-gray-700'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    {tab.label}
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Tab Content */}
          <div className="p-8">
            {renderTabContent()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;