import React, { useState } from 'react';
import { Save, Plus, X, MapPin, Target } from 'lucide-react';

const PreferencesManager: React.FC = () => {
  const [sports, setSports] = useState([
    { sport: 'Fußball', skillLevel: 'intermediate' },
    { sport: 'Basketball', skillLevel: 'beginner' },
    { sport: 'Laufen', skillLevel: 'advanced' }
  ]);
  const [locations, setLocations] = useState(['Nordend', 'Westend', 'Innenstadt']);
  const [newSport, setNewSport] = useState('');
  const [newLocation, setNewLocation] = useState('');

  const availableSports = ['Fußball', 'Basketball', 'Tennis', 'Laufen', 'Fahrrad', 'Schwimmen', 'Yoga', 'Fitness'];
  const availableLocations = ['Innenstadt', 'Nordend', 'Westend', 'Sachsenhausen', 'Bockenheim', 'Ostend'];
  const skillLevels = [
    { value: 'beginner', label: 'Anfänger' },
    { value: 'intermediate', label: 'Fortgeschritten' },
    { value: 'advanced', label: 'Profi' }
  ];

  const addSport = () => {
    if (newSport && !sports.find(s => s.sport === newSport)) {
      setSports([...sports, { sport: newSport, skillLevel: 'beginner' }]);
      setNewSport('');
    }
  };

  const removeSport = (sportToRemove: string) => {
    setSports(sports.filter(s => s.sport !== sportToRemove));
  };

  const updateSkillLevel = (sport: string, skillLevel: string) => {
    setSports(sports.map(s => s.sport === sport ? { ...s, skillLevel } : s));
  };

  const addLocation = () => {
    if (newLocation && !locations.includes(newLocation)) {
      setLocations([...locations, newLocation]);
      setNewLocation('');
    }
  };

  const removeLocation = (locationToRemove: string) => {
    setLocations(locations.filter(l => l !== locationToRemove));
  };

  const handleSave = () => {
    // Save preferences logic
    console.log('Saving preferences:', { sports, locations });
  };

  return (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold text-white mb-4">Sport- und Standort-Präferenzen</h3>

      {/* Sports Preferences */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 mb-3">
          <Target className="w-5 h-5 text-orange-500" />
          <h4 className="text-lg font-medium text-white">Sportarten</h4>
        </div>

        <div className="space-y-3">
          {sports.map((sportItem, index) => (
            <div key={index} className="flex items-center gap-3 p-3 bg-gray-600 rounded-lg">
              <span className="text-white font-medium flex-1">{sportItem.sport}</span>
              <select
                value={sportItem.skillLevel}
                onChange={(e) => updateSkillLevel(sportItem.sport, e.target.value)}
                className="px-3 py-1 bg-gray-700 border border-gray-500 rounded text-white text-sm"
              >
                {skillLevels.map(level => (
                  <option key={level.value} value={level.value}>{level.label}</option>
                ))}
              </select>
              <button
                onClick={() => removeSport(sportItem.sport)}
                className="text-red-400 hover:text-red-300 transition-colors duration-200"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>

        <div className="flex gap-2">
          <select
            value={newSport}
            onChange={(e) => setNewSport(e.target.value)}
            className="flex-1 px-3 py-2 bg-gray-600 border border-gray-500 rounded-lg text-white"
          >
            <option value="">Sportart hinzufügen...</option>
            {availableSports.filter(sport => !sports.find(s => s.sport === sport)).map(sport => (
              <option key={sport} value={sport}>{sport}</option>
            ))}
          </select>
          <button
            onClick={addSport}
            disabled={!newSport}
            className="px-4 py-2 bg-orange-500 hover:bg-orange-600 disabled:bg-gray-600 text-white rounded-lg transition-colors duration-200"
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Location Preferences */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 mb-3">
          <MapPin className="w-5 h-5 text-orange-500" />
          <h4 className="text-lg font-medium text-white">Bevorzugte Standorte</h4>
        </div>

        <div className="flex flex-wrap gap-2">
          {locations.map((location, index) => (
            <span
              key={index}
              className="inline-flex items-center gap-1 bg-gray-600 text-white px-3 py-1 rounded-full text-sm"
            >
              {location}
              <button
                onClick={() => removeLocation(location)}
                className="text-red-400 hover:text-red-300 transition-colors duration-200"
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          ))}
        </div>

        <div className="flex gap-2">
          <select
            value={newLocation}
            onChange={(e) => setNewLocation(e.target.value)}
            className="flex-1 px-3 py-2 bg-gray-600 border border-gray-500 rounded-lg text-white"
          >
            <option value="">Standort hinzufügen...</option>
            {availableLocations.filter(location => !locations.includes(location)).map(location => (
              <option key={location} value={location}>{location}</option>
            ))}
          </select>
          <button
            onClick={addLocation}
            disabled={!newLocation}
            className="px-4 py-2 bg-orange-500 hover:bg-orange-600 disabled:bg-gray-600 text-white rounded-lg transition-colors duration-200"
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>
      </div>

      <button
        onClick={handleSave}
        className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-200"
      >
        <Save className="w-4 h-4" />
        Präferenzen speichern
      </button>
    </div>
  );
};

export default PreferencesManager;