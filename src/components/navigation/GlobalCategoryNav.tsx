import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

interface GlobalCategoryNavProps {
  onCategorySelect?: (category: string) => void;
}

const GlobalCategoryNav: React.FC<GlobalCategoryNavProps> = ({ onCategorySelect }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const categories = [
    {
      id: 1,
      title: 'Fahrrad',
      description: 'Rennrad, Mountainbike und Stadtradtouren',
      count: '12 Angebote'
    },
    {
      id: 2,
      title: 'Fußball',
      description: 'Vereinstraining und Spielgruppen',
      count: '18 Angebote'
    },
    {
      id: 3,
      title: 'Basketball',
      description: 'Streetball und Vereinsbasketball',
      count: '8 Angebote'
    },
    {
      id: 4,
      title: 'Skaten',
      description: 'Skateboard und Inline-Skates',
      count: '6 Angebote'
    },
    {
      id: 5,
      title: 'Paddel',
      description: 'Kajak, SUP und Kanu',
      count: '9 Angebote'
    },
    {
      id: 6,
      title: 'Laufen',
      description: 'Laufgruppen und Training',
      count: '15 Angebote'
    }
  ];

  const handleCategoryClick = (category: string) => {
    if (onCategorySelect) {
      onCategorySelect(category);
    } else {
      // Navigate to offers page with category filter
      navigate(`/offers/${category.toLowerCase()}`);
    }
  };

  // Don't show on homepage if we're already there
  if (location.pathname === '/') {
    return null;
  }

  return (
    <section className="py-12 bg-gray-800 border-t border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
            Sport<span className="text-orange-500">kategorien</span>
          </h2>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Entdecke vielfältige Sportarten und finde das perfekte Training für dich
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => handleCategoryClick(category.title)}
              className="group p-4 bg-gray-900 rounded-lg border border-gray-700 hover:border-orange-500 transition-all duration-300 hover:shadow-lg hover:shadow-orange-500/10 transform hover:-translate-y-1 text-left"
            >
              <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-orange-500 transition-colors duration-200">
                {category.title}
              </h3>
              <p className="text-gray-400 text-sm mb-2 line-clamp-2">
                {category.description}
              </p>
              <span className="text-orange-500 text-xs font-medium">
                {category.count}
              </span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default GlobalCategoryNav;