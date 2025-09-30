import React from 'react';
import { ArrowLeft, MapPin, Clock, Users, Euro, Calendar, Star, Phone, Mail } from 'lucide-react';
import { useOffers } from '../data/offers';

interface Offer {
  id: number;
  title: string;
  provider: string;
  image: string;
  price: string;
  period: string;
  district: string;
  rating: number;
  duration: string;
  category: string;
  description: string;
  date: string;
  time: string;
  currentParticipants: number;
  maxParticipants: number;
  location: string;
  fullDescription: string;
}

interface OfferDetailProps {
  offer?: Offer;
  offerId?: number;
  onBack: () => void;
}

const OfferDetail: React.FC<OfferDetailProps> = ({ offer: propOffer, offerId, onBack }) => {
  const allOffers = useOffers();
  
  // Get offer from props or find by ID
  const offer = propOffer || (offerId ? allOffers.find(o => o.id === offerId) : null);
  
  if (!offer) {
    return (
      <div className="min-h-screen bg-gray-900 pt-24 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center mb-8">
            <button
              onClick={onBack}
              className="flex items-center text-gray-300 hover:text-orange-500 transition-colors duration-200 mr-6"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Zurück zu den Angeboten
            </button>
          </div>
          <div className="bg-gray-800 rounded-2xl border border-gray-700 p-8 text-center">
            <p className="text-gray-300">Angebot nicht gefunden</p>
          </div>
        </div>
      </div>
    );
  }
  
  const handleBooking = () => {
    alert(`Buchung für "${offer.title}" wurde gestartet! (Demo-Funktion)`);
  };

  const isFullyBooked = offer.currentParticipants >= offer.maxParticipants;
  const availableSpots = offer.maxParticipants - offer.currentParticipants;

  return (
    <div className="min-h-screen bg-gray-900 pt-24 pb-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-center mb-8">
          <button
            onClick={onBack}
            className="flex items-center text-gray-300 hover:text-orange-500 transition-colors duration-200 mr-6"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Zurück zu den Angeboten
          </button>
        </div>

        {/* Main Content */}
        <div className="bg-gray-800 rounded-2xl border border-gray-700 overflow-hidden">
          {/* Hero Image */}
          <div className="relative h-64 md:h-80">
            <img
              src={offer.image}
              alt={offer.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 to-transparent"></div>
            
            {/* Category Badge */}
            <div className="absolute top-6 left-6">
              <span className="bg-orange-500 text-white px-4 py-2 rounded-full text-sm font-medium">
                {offer.category}
              </span>
            </div>
            
            {/* Rating */}
            <div className="absolute top-6 right-6 flex items-center bg-gray-900/80 backdrop-blur-sm rounded-full px-3 py-2">
              <Star className="w-5 h-5 text-orange-500 fill-current mr-2" />
              <span className="text-white font-medium">{offer.rating}</span>
            </div>

            {/* Title Overlay */}
            <div className="absolute bottom-6 left-6 right-6">
              <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
                {offer.title}
              </h1>
              <p className="text-orange-400 text-lg font-medium">
                {offer.provider}
              </p>
            </div>
          </div>

          <div className="p-8">
            {/* Key Details Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <div className="bg-gray-700 rounded-lg p-4 text-center">
                <Calendar className="w-6 h-6 text-orange-500 mx-auto mb-2" />
                <p className="text-gray-300 text-sm">Datum</p>
                <p className="text-white font-semibold">
                  {new Date(offer.date).toLocaleDateString('de-DE', {
                    weekday: 'short',
                    day: '2-digit',
                    month: '2-digit'
                  })}
                </p>
              </div>

              <div className="bg-gray-700 rounded-lg p-4 text-center">
                <Clock className="w-6 h-6 text-orange-500 mx-auto mb-2" />
                <p className="text-gray-300 text-sm">Zeit</p>
                <p className="text-white font-semibold">{offer.time}</p>
                <p className="text-gray-400 text-xs">({offer.duration})</p>
              </div>

              <div className="bg-gray-700 rounded-lg p-4 text-center">
                <Users className="w-6 h-6 text-orange-500 mx-auto mb-2" />
                <p className="text-gray-300 text-sm">Teilnehmer</p>
                <p className="text-white font-semibold">
                  {offer.currentParticipants}/{offer.maxParticipants}
                </p>
                <p className="text-gray-400 text-xs">
                  {availableSpots > 0 ? `${availableSpots} Plätze frei` : 'Ausgebucht'}
                </p>
              </div>

              <div className="bg-gray-700 rounded-lg p-4 text-center">
                <Euro className="w-6 h-6 text-orange-500 mx-auto mb-2" />
                <p className="text-gray-300 text-sm">Preis</p>
                <p className="text-white font-semibold text-lg">
                  {offer.price}€
                </p>
                <p className="text-gray-400 text-xs">{offer.period}</p>
              </div>
            </div>

            {/* Location */}
            <div className="bg-gray-700 rounded-lg p-6 mb-8">
              <div className="flex items-start gap-4">
                <MapPin className="w-6 h-6 text-orange-500 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="text-white font-semibold mb-2">Treffpunkt</h3>
                  <p className="text-gray-300">{offer.location}</p>
                  <p className="text-gray-400 text-sm mt-1">{offer.district}, Frankfurt</p>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="mb-8">
              <h3 className="text-xl font-bold text-white mb-4">Beschreibung</h3>
              <p className="text-gray-300 leading-relaxed mb-4">
                {offer.fullDescription}
              </p>
              <p className="text-gray-300 leading-relaxed">
                {offer.description}
              </p>
            </div>

            {/* Contact & Booking */}
            <div className="border-t border-gray-700 pt-8">
              <div className="flex flex-col md:flex-row gap-6 items-center justify-between">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-white mb-2">
                    Bereit mitzumachen?
                  </h3>
                  <p className="text-gray-300 text-sm">
                    {isFullyBooked 
                      ? 'Dieses Angebot ist leider ausgebucht.'
                      : `Noch ${availableSpots} Plätze verfügbar!`
                    }
                  </p>
                </div>
                
                <div className="flex gap-4">
                  <button className="flex items-center gap-2 bg-gray-700 hover:bg-gray-600 text-white px-6 py-3 rounded-lg font-medium transition-all duration-200">
                    <Phone className="w-4 h-4" />
                    Kontakt
                  </button>
                  
                  <button
                    onClick={handleBooking}
                    disabled={isFullyBooked}
                    className={`px-8 py-3 rounded-lg font-semibold transition-all duration-200 ${
                      isFullyBooked
                        ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
                        : 'bg-orange-500 hover:bg-orange-600 text-white hover:shadow-lg hover:shadow-orange-500/25 transform hover:scale-105'
                    }`}
                  >
                    {isFullyBooked ? 'Ausgebucht' : 'Jetzt buchen'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OfferDetail;