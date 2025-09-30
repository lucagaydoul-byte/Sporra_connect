import React, { useMemo, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { MapPin, Clock, Users, Euro, Calendar, Star, ChevronDown, ChevronUp } from 'lucide-react';
import { useOffers } from "../data/offers";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const OffersList: React.FC = () => {
  const query = useQuery();
  const navigate = useNavigate();
  const { category } = useParams<{ category: string }>();
  const [expandedOffer, setExpandedOffer] = useState<number | null>(null);
  
  // Use reactive offers hook
  const allOffers = useOffers();

  const categoryParam = category?.toLowerCase() || "";
  const district = query.get("district")?.toLowerCase() || "";

  const results = useMemo(() => {
    return allOffers.filter((offer) => {
      const matchCategory = !categoryParam || offer.category.toLowerCase() === categoryParam;
      const matchDistrict = !district || offer.district.toLowerCase() === district;
      return matchCategory && matchDistrict;
    });
  }, [categoryParam, district]);

  const toggleExpanded = (offerId: number) => {
    setExpandedOffer(expandedOffer === offerId ? null : offerId);
  };

  const handleBooking = (offer: any) => {
    alert(`Buchung für "${offer.title}" wurde gestartet! (Demo-Funktion)`);
  };

  return (
    <div className="min-h-screen bg-gray-900 pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold text-white mb-2">
              {categoryParam ? `${categoryParam.charAt(0).toUpperCase() + categoryParam.slice(1)} Angebote` : 'Alle Angebote'}
            </h2>
            {district && (
              <p className="text-gray-300">
                Bezirk: <span className="text-orange-500 font-medium">{district}</span>
              </p>
            )}
          </div>
          <button
            onClick={() => navigate(-1)}
            className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-lg font-medium transition-all"
          >
            Zurück
          </button>
        </div>

        {results.length === 0 ? (
          <div className="bg-gray-800 p-8 rounded-xl text-center border border-gray-700">
            <p className="text-gray-300 mb-4">Keine Angebote gefunden.</p>
            <button
              onClick={() => navigate("/")}
              className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-lg font-medium transition-all"
            >
              Zurück zur Startseite
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            <p className="text-gray-400 mb-6">{results.length} Angebote gefunden</p>
            
            {results.map((offer) => {
              const isExpanded = expandedOffer === offer.id;
              const isFullyBooked = offer.currentParticipants >= offer.maxParticipants;
              const availableSpots = offer.maxParticipants - offer.currentParticipants;

              return (
                <div
                  key={offer.id}
                  className="bg-gray-800 border border-gray-700 rounded-xl overflow-hidden hover:border-orange-500 transition-all duration-300"
                >
                  {/* Kompakte Ansicht */}
                  <div
                    className="p-6 cursor-pointer"
                    onClick={() => toggleExpanded(offer.id)}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-6 flex-1">
                        <img
                          src={offer.image}
                          alt={offer.title}
                          className="w-20 h-20 object-cover rounded-lg"
                        />
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="text-xl font-semibold text-white">{offer.title}</h3>
                            <span className="bg-orange-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                              {offer.category}
                            </span>
                          </div>
                          <p className="text-orange-400 text-sm font-medium mb-1">{offer.provider}</p>
                          <div className="flex items-center gap-4 text-sm text-gray-400">
                            <div className="flex items-center">
                              <Calendar className="w-4 h-4 mr-1" />
                              {new Date(offer.date).toLocaleDateString('de-DE')}
                            </div>
                            <div className="flex items-center">
                              <Clock className="w-4 h-4 mr-1" />
                              {offer.time}
                            </div>
                            <div className="flex items-center">
                              <MapPin className="w-4 h-4 mr-1" />
                              {offer.district}
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-2xl font-bold text-white mb-1">
                            {offer.price}€
                            <span className="text-sm text-gray-400 font-normal">{offer.period}</span>
                          </div>
                          <div className="flex items-center text-sm text-gray-400">
                            <Users className="w-4 h-4 mr-1" />
                            {offer.currentParticipants}/{offer.maxParticipants}
                          </div>
                        </div>
                      </div>
                      <div className="ml-4">
                        {isExpanded ? (
                          <ChevronUp className="w-6 h-6 text-orange-500" />
                        ) : (
                          <ChevronDown className="w-6 h-6 text-gray-400" />
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Erweiterte Ansicht */}
                  {isExpanded && (
                    <div className="border-t border-gray-700 p-6">
                      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        {/* Hauptinhalt */}
                        <div className="lg:col-span-2">
                          <h4 className="text-lg font-semibold text-white mb-3">Beschreibung</h4>
                          <p className="text-gray-300 mb-4 leading-relaxed">
                            {offer.fullDescription}
                          </p>
                          <p className="text-gray-300 leading-relaxed">
                            {offer.description}
                          </p>

                          {/* Details Grid */}
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
                            <div className="bg-gray-700 rounded-lg p-3 text-center">
                              <Calendar className="w-5 h-5 text-orange-500 mx-auto mb-1" />
                              <p className="text-gray-300 text-xs">Datum</p>
                              <p className="text-white font-semibold text-sm">
                                {new Date(offer.date).toLocaleDateString('de-DE', {
                                  weekday: 'short',
                                  day: '2-digit',
                                  month: '2-digit'
                                })}
                              </p>
                            </div>

                            <div className="bg-gray-700 rounded-lg p-3 text-center">
                              <Clock className="w-5 h-5 text-orange-500 mx-auto mb-1" />
                              <p className="text-gray-300 text-xs">Zeit</p>
                              <p className="text-white font-semibold text-sm">{offer.time}</p>
                              <p className="text-gray-400 text-xs">({offer.duration})</p>
                            </div>

                            <div className="bg-gray-700 rounded-lg p-3 text-center">
                              <Users className="w-5 h-5 text-orange-500 mx-auto mb-1" />
                              <p className="text-gray-300 text-xs">Teilnehmer</p>
                              <p className="text-white font-semibold text-sm">
                                {offer.currentParticipants}/{offer.maxParticipants}
                              </p>
                            </div>

                            <div className="bg-gray-700 rounded-lg p-3 text-center">
                              <Star className="w-5 h-5 text-orange-500 mx-auto mb-1" />
                              <p className="text-gray-300 text-xs">Bewertung</p>
                              <p className="text-white font-semibold text-sm">{offer.rating}</p>
                            </div>
                          </div>
                        </div>

                        {/* Sidebar */}
                        <div className="lg:col-span-1">
                          {/* Location */}
                          <div className="bg-gray-700 rounded-lg p-4 mb-4">
                            <div className="flex items-start gap-3">
                              <MapPin className="w-5 h-5 text-orange-500 mt-1 flex-shrink-0" />
                              <div>
                                <h4 className="text-white font-semibold mb-1">Treffpunkt</h4>
                                <p className="text-gray-300 text-sm">{offer.location}</p>
                                <p className="text-gray-400 text-xs mt-1">{offer.district}, Frankfurt</p>
                              </div>
                            </div>
                          </div>

                          {/* Booking */}
                          <div className="bg-gray-700 rounded-lg p-4">
                            <div className="text-center mb-4">
                              <div className="text-2xl font-bold text-white mb-1">
                                {offer.price}€
                                <span className="text-sm text-gray-400 font-normal">{offer.period}</span>
                              </div>
                              <p className="text-sm text-gray-300">
                                {isFullyBooked 
                                  ? 'Ausgebucht'
                                  : `${availableSpots} Plätze frei`
                                }
                              </p>
                            </div>
                            
                            <button
                              onClick={() => handleBooking(offer)}
                              disabled={isFullyBooked}
                              className={`w-full py-3 rounded-lg font-semibold transition-all duration-200 ${
                                isFullyBooked
                                  ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
                                  : 'bg-orange-500 hover:bg-orange-600 text-white hover:shadow-lg hover:shadow-orange-500/25'
                              }`}
                            >
                              {isFullyBooked ? 'Ausgebucht' : 'Jetzt buchen'}
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default OffersList;
