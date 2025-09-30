import React from 'react';
import { MapPin, Clock, Euro, Star } from 'lucide-react';
import { useOffers } from '../data/offers';

interface HighlightsProps {
  onShowAllOffers: () => void;
  onOfferSelect: (offer: any) => void;
}

const Highlights: React.FC<HighlightsProps> = ({ onShowAllOffers, onOfferSelect }) => {
  // Use reactive offers hook
  const allOffers = useOffers();
  const highlights = allOffers.slice(0, 5);

  return (
    <section id="highlights" className="py-20 bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Top <span className="text-orange-500">Angebote</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Die beliebtesten Sportangebote in Frankfurt - von unserer Community empfohlen
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {highlights.map((offer) => (
            <div
              key={offer.id}
              className="group cursor-pointer bg-gray-800 rounded-xl border border-gray-700 overflow-hidden hover:border-orange-500 transition-all duration-300 hover:shadow-2xl hover:shadow-orange-500/10 transform hover:-translate-y-1"
              onClick={() => onOfferSelect(offer)}
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={offer.image}
                  alt={offer.title}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 to-transparent"></div>
                
                {/* Category Badge */}
                <div className="absolute top-4 left-4">
                  <span className="bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                    {offer.category}
                  </span>
                </div>
                
                {/* Rating */}
                <div className="absolute top-4 right-4 flex items-center bg-gray-900/80 backdrop-blur-sm rounded-full px-2 py-1">
                  <Star className="w-4 h-4 text-orange-500 fill-current mr-1" />
                  <span className="text-white text-sm font-medium">{offer.rating}</span>
                </div>

                {/* Price */}
                <div className="absolute bottom-4 right-4">
                  <div className="bg-orange-500 text-white px-3 py-2 rounded-lg font-bold">
                    <span className="text-lg">{offer.price}€</span>
                    <span className="text-sm opacity-90">{offer.period}</span>
                  </div>
                </div>
              </div>
              
              <div className="p-6">
                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-orange-500 transition-colors duration-200">
                  {offer.title}
                </h3>
                
                <p className="text-orange-400 text-sm font-medium mb-3">
                  {offer.provider}
                </p>
                
                <p className="text-gray-300 mb-4 line-clamp-2">
                  {offer.description}
                </p>
                
                <div className="flex items-center justify-between text-sm text-gray-400 mb-4">
                  <div className="flex items-center">
                    <MapPin className="w-4 h-4 mr-1" />
                    <span>{offer.district}</span>
                  </div>
                  <div className="flex items-center">
                    <Clock className="w-4 h-4 mr-1" />
                    <span>{offer.duration}</span>
                  </div>
                </div>
                
                <button className="w-full bg-gray-700 hover:bg-orange-500 text-white py-3 rounded-lg font-medium transition-all duration-200 group-hover:shadow-lg hover:shadow-orange-500/25">
                  Details ansehen
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <button 
            onClick={onShowAllOffers}
            className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 rounded-lg font-semibold transition-all duration-200 hover:shadow-lg hover:shadow-orange-500/25 transform hover:scale-105"
          >
            Alle Angebote entdecken
          </button>
        </div>
      </div>
    </section>
  );
};

export default Highlights;