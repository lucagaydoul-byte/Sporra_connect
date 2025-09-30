import React, { useState } from 'react';
import { Search, MapPin } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Hero = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [searchTerm, setSearchTerm] = useState('');
  const [district, setDistrict] = useState('');
  const navigate = useNavigate();

  const categories = [
    'Fahrrad', 'Fußball', 'Basketball', 'Skaten', 'Paddel', 'Laufen'
  ];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();

    // Query-Parameter bauen
    const params = new URLSearchParams();
    if (searchTerm) params.append('term', searchTerm);
    if (selectedCategory) params.append('category', selectedCategory);
    if (district) params.append('district', district);

    // Weiterleiten auf SearchResults
    navigate(`/search?${params.toString()}`);
  };

  return (
    <section className="relative bg-gray-900 pt-24 pb-16 min-h-screen flex items-center">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-gradient-to-br from-orange-500/20 to-transparent"></div>
        <div className="grid grid-cols-12 gap-4 h-full opacity-30">
          {Array.from({ length: 144 }).map((_, i) => (
            <div key={i} className="border border-gray-700/50"></div>
          ))}
        </div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
            Finde dein
            <span className="text-orange-500 block">Sport-Partner:in</span>
            in Frankfurt
          </h1>
          
          <p className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto">
            Entdecke lokale Sportangebote, Vereine, Kurse oder Personen die einfach Sport machen möchten in deiner Nähe. 
            Es ist für jeden etwas dabei. Lerne dabei neue Leute kennen. Alles in Frankfurt und Umgebung
          </p>

          {/* Search Form */}
          <form onSubmit={handleSearch} className="mb-12">
            <div className="bg-gray-800 p-6 rounded-2xl border border-gray-700 shadow-2xl max-w-2xl mx-auto">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                  <input
                    type="text"
                    placeholder="Sportart oder Anbieter suchen..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  />
                </div>
                <div className="relative">
                  <MapPin className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                  <select
                    value={district}
                    onChange={(e) => setDistrict(e.target.value)}
                    className="appearance-none pl-12 pr-8 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent min-w-[180px]"
                  >
                    <option value="">Alle Bezirke</option>
                    <option value="mitte">Frankfurt Mitte</option>
                    <option value="nord">Frankfurt Nord</option>
                    <option value="sued">Frankfurt Süd</option>
                    <option value="ost">Frankfurt Ost</option>
                    <option value="west">Frankfurt West</option>
                  </select>
                </div>
                <button
                  type="submit"
                  className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 rounded-lg font-semibold transition-all duration-200 hover:shadow-lg hover:shadow-orange-500/25 transform hover:scale-105"
                >
                  Suchen
                </button>
              </div>
            </div>
          </form>

          {/* Category Pills */}
          <div className="flex flex-wrap justify-center gap-3">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(selectedCategory === category ? '' : category)}
                className={`px-6 py-2 rounded-full font-medium transition-all duration-200 hover:scale-105 ${
                  selectedCategory === category
                    ? 'bg-orange-500 text-white shadow-lg shadow-orange-500/25'
                    : 'bg-gray-800 text-gray-300 border border-gray-700 hover:border-orange-500 hover:text-orange-500'
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Quick Actions */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
            <button
              onClick={() => navigate('/create-event')}
              className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 rounded-lg font-semibold transition-all duration-200 hover:shadow-lg hover:shadow-orange-500/25 transform hover:scale-105"
            >
              Event erstellen
            </button>
            <button
              onClick={() => navigate('/offers')}
              className="bg-gray-800 hover:bg-gray-700 text-white border border-gray-700 hover:border-orange-500 px-8 py-3 rounded-lg font-semibold transition-all duration-200"
            >
              Alle Events durchsuchen
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
