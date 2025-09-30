import React, { useState } from 'react';
import { Save, User, MapPin, Bell, Shield } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import PreferencesManager from './PreferencesManager';
import PersonalDataForm from './PersonalDataForm';

const ProfileSettings: React.FC = () => {
  const { user } = useAuth();
  const [activeSection, setActiveSection] = useState<'personal' | 'preferences' | 'notifications' | 'privacy'>('personal');

  const sections = [
    { id: 'personal', label: 'Persönliche Daten', icon: User },
    { id: 'preferences', label: 'Sport-Präferenzen', icon: MapPin },
    { id: 'notifications', label: 'Benachrichtigungen', icon: Bell },
    { id: 'privacy', label: 'Datenschutz', icon: Shield }
  ];

  const renderSectionContent = () => {
    switch (activeSection) {
      case 'personal':
        return <PersonalDataForm />;
      
      case 'preferences':
        return <PreferencesManager />;
      
      case 'notifications':
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-white mb-4">Benachrichtigungs-Einstellungen</h3>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-gray-700 rounded-lg">
                <div>
                  <h4 className="text-white font-medium">Neue Event-Matches</h4>
                  <p className="text-gray-400 text-sm">Benachrichtigung bei passenden Events</p>
                </div>
                <input
                  type="checkbox"
                  defaultChecked
                  className="w-4 h-4 text-orange-500 bg-gray-600 border-gray-500 rounded focus:ring-orange-500"
                />
              </div>
              
              <div className="flex items-center justify-between p-4 bg-gray-700 rounded-lg">
                <div>
                  <h4 className="text-white font-medium">Event-Änderungen</h4>
                  <p className="text-gray-400 text-sm">Benachrichtigung bei Änderungen an gebuchten Events</p>
                </div>
                <input
                  type="checkbox"
                  defaultChecked
                  className="w-4 h-4 text-orange-500 bg-gray-600 border-gray-500 rounded focus:ring-orange-500"
                />
              </div>
              
              <div className="flex items-center justify-between p-4 bg-gray-700 rounded-lg">
                <div>
                  <h4 className="text-white font-medium">Neue Nachrichten</h4>
                  <p className="text-gray-400 text-sm">Benachrichtigung bei neuen Chat-Nachrichten</p>
                </div>
                <input
                  type="checkbox"
                  defaultChecked
                  className="w-4 h-4 text-orange-500 bg-gray-600 border-gray-500 rounded focus:ring-orange-500"
                />
              </div>
            </div>
          </div>
        );
      
      case 'privacy':
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-white mb-4">Datenschutz-Einstellungen</h3>
            
            <div className="space-y-4">
              <div className="p-4 bg-gray-700 rounded-lg">
                <h4 className="text-white font-medium mb-2">Profil-Sichtbarkeit</h4>
                <select className="w-full px-3 py-2 bg-gray-600 border border-gray-500 rounded-lg text-white">
                  <option>Öffentlich</option>
                  <option>Nur für Matches</option>
                  <option>Privat</option>
                </select>
              </div>
              
              <div className="p-4 bg-gray-700 rounded-lg">
                <h4 className="text-white font-medium mb-2">Daten-Export</h4>
                <p className="text-gray-400 text-sm mb-3">Lade deine gespeicherten Daten herunter</p>
                <button className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg transition-colors duration-200">
                  Daten exportieren
                </button>
              </div>
              
              <div className="p-4 bg-red-900/20 border border-red-500/50 rounded-lg">
                <h4 className="text-red-400 font-medium mb-2">Konto löschen</h4>
                <p className="text-gray-400 text-sm mb-3">Lösche dein Konto und alle zugehörigen Daten permanent</p>
                <button className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition-colors duration-200">
                  Konto löschen
                </button>
              </div>
            </div>
          </div>
        );
      
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      {/* Section Navigation */}
      <div className="flex flex-wrap gap-2">
        {sections.map((section) => {
          const Icon = section.icon;
          return (
            <button
              key={section.id}
              onClick={() => setActiveSection(section.id as any)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors duration-200 ${
                activeSection === section.id
                  ? 'bg-orange-500 text-white'
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
            >
              <Icon className="w-4 h-4" />
              {section.label}
            </button>
          );
        })}
      </div>

      {/* Section Content */}
      <div className="bg-gray-700 rounded-lg p-6">
        {renderSectionContent()}
      </div>
    </div>
  );
};

export default ProfileSettings;