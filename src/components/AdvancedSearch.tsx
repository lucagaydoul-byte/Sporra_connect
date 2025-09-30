import React, { useState, useMemo } from 'react';
import { Search, Filter, MapPin, Calendar, Euro, Users, Clock, X } from 'lucide-react';
import { allOffers } from '../data/offers';

interface SearchFilters {
  term: string;
  categories: string[];
  skillLevels: string[];
  districts: string[];
  dateRange: {
    start: string;
    end: string;
  };
  priceRange: {
    min: number;
    max: number;
  };
  timeSlots: string[];
  participantRange: {
    min: number;
    max: number;
  };
}

interface AdvancedSearchProps {
  onResults: (results: any[]) => void;
  onClose: () => void;
}

const AdvancedSearch: React.FC<AdvancedSearchProps> = ({ onResults, onClose }) => {
  const [filters, setFilters] = useState<SearchFilters>({
    term: '',
    categories: [],
    skillLevels: [],
    districts: [],
    dateRange: { start: '', end: '' },
    priceRange: { min: 0, max: 100 },
    timeSlots: [],
    participantRange: { min: 1, max: 50 }
  });

  const [showFilters, setShowFilters] = useState(false);

  const categories = ['Fahrrad', 'Fußball', 'Basketball', 'Skaten', 'Paddel', 'Laufen'];
  const skillLevels = ['Anfänger', 'Fortgeschritten', 'Profi'];
  const districts = ['Innenstadt', 'Nordend', 'Westend', 'Sachsenhausen', 'Bockenheim', 'Ostend'];
  const timeSlots = ['Morgens (6-12)', 'Mittags (12-18)', 'Abends (18-22)', 'Wochenende'];

  const filteredResults = useMemo(() => {
    return allOffers.filter(offer => {
      // Text search
      const matchesTerm = !filters.term || 
        offer.title.toLowerCase().includes(filters.term.toLowerCase()) ||
        offer.provider.toLowerCase().includes(filters.term.toLowerCase()) ||
        offer.description.toLowerCase().includes(filters.term.toLowerCase()) ||
        offer.location.toLowerCase().includes(filters.term.toLowerCase());

      // Category filter
      const matchesCategory = filters.categories.length === 0 || 
        filters.categories.includes(offer.category);

      // District filter
      const matchesDistrict = filters.districts.length === 0 || 
        filters.districts.includes(offer.district);

      // Price filter
      const price = parseInt(offer.price);
      const matchesPrice = price >= filters.priceRange.min && price <= filters.priceRange.max;

      // Participant filter
      const matchesParticipants = offer.maxParticipants >= filters.participantRange.min && 
        offer.maxParticipants <= filters.participantRange.max;

      // Date filter
      const matchesDate = !filters.dateRange.start || !filters.dateRange.end ||
        (new Date(offer.date) >= new Date(filters.dateRange.start) && 
         new Date(offer.date) <= new Date(filters.dateRange.end));

      return matchesTerm && matchesCategory && matchesDistrict && 
             matchesPrice && matchesParticipants && matchesDate;
    });
  }, [filters]);

  const handleFilterChange = (key: keyof SearchFilters, value: any) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const handleArrayFilterToggle = (key: keyof SearchFilters, value: string) => {
    setFilters(prev => ({
      ...prev,
      [key]: (prev[key] as string[]).includes(value)
        ? (prev[key] as string[]).filter(item => item !== value)
        : [...(prev[key] as string[]), value]
    }));
  };

  const handleSearch = () => {
    onResults(filteredResults);
  };

  const clearFilters = () => {
    setFilters({
      term: '',
      categories: [],
      skillLevels: [],
      districts: [],
      dateRange: { start: '', end: '' },
      priceRange: { min: 0, max: 100 },
      timeSlots: [],
      participantRange: { min: 1, max: 50 }
    });
  };

  const activeFiltersCount = 
    filters.categories.length + 
    filters.skillLevels.length + 
    filters.districts.length + 
    filters.timeSlots.length +
    (filters.dateRange.start ? 1 : 0) +
    (filters.priceRange.min > 0 || filters.priceRange.max < 100 ? 1 : 0);

  return (
    <div className="bg-gray-800 rounded-2xl border border-gray-700 p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-white">Erweiterte Suche</h2>
        <button
          onClick={onClose}
          className="text-gray-400 hover:text-white transition-colors duration-200"
        >
          <X className="w-6 h-6" />
        </button>
      </div>

      {/* Search Input */}
      <div className="relative mb-6">
        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
        <input
          type="text"
          placeholder="Sportart, Anbieter oder Ort suchen..."
          value={filters.term}
          onChange={(e) => handleFilterChange('term', e.target.value)}
          className="w-full pl-12 pr-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
        />
      </div>

      {/* Filter Toggle */}
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="flex items-center gap-2 text-orange-500 hover:text-orange-400 transition-colors duration-200"
        >
          <Filter className="w-4 h-4" />
          Filter {activeFiltersCount > 0 && `(${activeFiltersCount})`}
        </button>
        
        {activeFiltersCount > 0 && (
          <button
            onClick={clearFilters}
            className="text-gray-400 hover:text-white text-sm transition-colors duration-200"
          >
            Alle Filter löschen
          </button>
        )}
      </div>

      {/* Filters */}
      {showFilters && (
        <div className="space-y-6 mb-6">
          {/* Categories */}
          <div>
            <h3 className="text-white font-semibold mb-3">Sportarten</h3>
            <div className="flex flex-wrap gap-2">
              {categories.map(category => (
                <button
                  key={category}
                  onClick={() => handleArrayFilterToggle('categories', category)}
                  className={`px-3 py-2 rounded-full text-sm transition-all duration-200 ${
                    filters.categories.includes(category)
                      ? 'bg-orange-500 text-white'
                      : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          {/* Districts */}
          <div>
            <h3 className="text-white font-semibold mb-3">Bezirke</h3>
            <div className="flex flex-wrap gap-2">
              {districts.map(district => (
                <button
                  key={district}
                  onClick={() => handleArrayFilterToggle('districts', district)}
                  className={`px-3 py-2 rounded-full text-sm transition-all duration-200 ${
                    filters.districts.includes(district)
                      ? 'bg-orange-500 text-white'
                      : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                  }`}
                >
                  {district}
                </button>
              ))}
            </div>
          </div>

          {/* Time Slots */}
          <div>
            <h3 className="text-white font-semibold mb-3">Tageszeiten</h3>
            <div className="flex flex-wrap gap-2">
              {timeSlots.map(slot => (
                <button
                  key={slot}
                  onClick={() => handleArrayFilterToggle('timeSlots', slot)}
                  className={`px-3 py-2 rounded-full text-sm transition-all duration-200 ${
                    filters.timeSlots.includes(slot)
                      ? 'bg-orange-500 text-white'
                      : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                  }`}
                >
                  {slot}
                </button>
              ))}
            </div>
          </div>

          {/* Price Range */}
          <div>
            <h3 className="text-white font-semibold mb-3">Preisspanne</h3>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Euro className="w-4 h-4 text-gray-400" />
                <input
                  type="number"
                  placeholder="Min"
                  value={filters.priceRange.min}
                  onChange={(e) => handleFilterChange('priceRange', {
                    ...filters.priceRange,
                    min: parseInt(e.target.value) || 0
                  })}
                  className="w-20 px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>
              <span className="text-gray-400">bis</span>
              <div className="flex items-center gap-2">
                <Euro className="w-4 h-4 text-gray-400" />
                <input
                  type="number"
                  placeholder="Max"
                  value={filters.priceRange.max}
                  onChange={(e) => handleFilterChange('priceRange', {
                    ...filters.priceRange,
                    max: parseInt(e.target.value) || 100
                  })}
                  className="w-20 px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>
            </div>
          </div>

          {/* Date Range */}
          <div>
            <h3 className="text-white font-semibold mb-3">Zeitraum</h3>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-gray-400" />
                <input
                  type="date"
                  value={filters.dateRange.start}
                  onChange={(e) => handleFilterChange('dateRange', {
                    ...filters.dateRange,
                    start: e.target.value
                  })}
                  className="px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>
              <span className="text-gray-400">bis</span>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-gray-400" />
                <input
                  type="date"
                  value={filters.dateRange.end}
                  onChange={(e) => handleFilterChange('dateRange', {
                    ...filters.dateRange,
                    end: e.target.value
                  })}
                  className="px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>
            </div>
          </div>

          {/* Participant Range */}
          <div>
            <h3 className="text-white font-semibold mb-3">Teilnehmerzahl</h3>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-gray-400" />
                <input
                  type="number"
                  placeholder="Min"
                  value={filters.participantRange.min}
                  onChange={(e) => handleFilterChange('participantRange', {
                    ...filters.participantRange,
                    min: parseInt(e.target.value) || 1
                  })}
                  className="w-20 px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>
              <span className="text-gray-400">bis</span>
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-gray-400" />
                <input
                  type="number"
                  placeholder="Max"
                  value={filters.participantRange.max}
                  onChange={(e) => handleFilterChange('participantRange', {
                    ...filters.participantRange,
                    max: parseInt(e.target.value) || 50
                  })}
                  className="w-20 px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Results Count */}
      <div className="flex items-center justify-between mb-4">
        <span className="text-gray-300">
          {filteredResults.length} Angebote gefunden
        </span>
      </div>

      {/* Search Button */}
      <button
        onClick={handleSearch}
        className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-lg font-semibold transition-all duration-200 hover:shadow-lg hover:shadow-orange-500/25"
      >
        Suche starten
      </button>
    </div>
  );
};

export default AdvancedSearch;