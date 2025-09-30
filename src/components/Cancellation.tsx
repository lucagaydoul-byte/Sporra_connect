import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Calendar, MapPin, Clock, X, AlertTriangle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Cancellation = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [selectedBooking, setSelectedBooking] = useState<number | null>(null);

  // Mock gebuchte Events (normalerweise aus der Datenbank)
  const bookedEvents = [
    {
      id: 1,
      title: 'Basketball Training',
      provider: 'Frankfurt Basketball Club',
      date: '2024-03-20',
      time: '18:30',
      location: 'Nordend Halle',
      price: '45€',
      bookingDate: '2024-03-10'
    },
    {
      id: 2,
      title: 'Bike Tour Frankfurt',
      provider: 'Frankfurt Cycling Club',
      date: '2024-03-22',
      time: '10:00',
      location: 'Römerberg',
      price: '15€',
      bookingDate: '2024-03-12'
    }
  ];

  const handleCancelBooking = (bookingId: number) => {
    // Hier würde normalerweise die Stornierung verarbeitet werden
    console.log('Stornierung für Buchung:', bookingId);
    alert('Buchung wurde erfolgreich storniert!');
    setSelectedBooking(null);
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-900 pt-24 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center mb-8">
            <button
              onClick={() => navigate(-1)}
              className="flex items-center text-gray-300 hover:text-orange-500 transition-colors duration-200 mr-6"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Zurück
            </button>
          </div>

          <div className="bg-gray-800 rounded-2xl border border-gray-700 p-8 text-center">
            <h1 className="text-3xl font-bold text-white mb-6">Stornierungen</h1>
            <p className="text-gray-300 mb-6">
              Sie müssen angemeldet sein, um Ihre Buchungen zu verwalten.
            </p>
            <button
              onClick={() => {
                const event = new CustomEvent('openLoginModal');
                window.dispatchEvent(event);
              }}
              className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-200"
            >
              Jetzt anmelden
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 pt-24 pb-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-center mb-8">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center text-gray-300 hover:text-orange-500 transition-colors duration-200 mr-6"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Zurück
          </button>
        </div>

        <div className="bg-gray-800 rounded-2xl border border-gray-700 overflow-hidden">
          <div className="p-8">
            <h1 className="text-3xl font-bold text-white mb-6">Meine Buchungen</h1>
            <p className="text-gray-300 mb-8">
              Hier können Sie Ihre gebuchten Events verwalten und bei Bedarf stornieren.
            </p>

            {bookedEvents.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-400 mb-4">Sie haben noch keine Buchungen.</p>
                <button
                  onClick={() => navigate('/')}
                  className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-200"
                >
                  Angebote entdecken
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {bookedEvents.map((booking) => (
                  <div key={booking.id} className="bg-gray-700 rounded-lg border border-gray-600 p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <h3 className="text-xl font-semibold text-white mb-2">{booking.title}</h3>
                        <p className="text-orange-400 text-sm font-medium mb-3">{booking.provider}</p>
                        
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-300">
                          <div className="flex items-center">
                            <Calendar className="w-4 h-4 mr-2 text-orange-500" />
                            {new Date(booking.date).toLocaleDateString('de-DE')}
                          </div>
                          <div className="flex items-center">
                            <Clock className="w-4 h-4 mr-2 text-orange-500" />
                            {booking.time}
                          </div>
                          <div className="flex items-center">
                            <MapPin className="w-4 h-4 mr-2 text-orange-500" />
                            {booking.location}
                          </div>
                        </div>
                        
                        <p className="text-gray-400 text-xs mt-2">
                          Gebucht am: {new Date(booking.bookingDate).toLocaleDateString('de-DE')}
                        </p>
                      </div>
                      
                      <div className="text-right">
                        <p className="text-lg font-bold text-white mb-3">{booking.price}</p>
                        <button
                          onClick={() => setSelectedBooking(booking.id)}
                          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg font-medium transition-all duration-200"
                        >
                          Stornieren
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Stornierung Bestätigung Modal */}
        {selectedBooking && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-gray-800 rounded-2xl border border-gray-700 w-full max-w-md">
              <div className="p-6">
                <div className="flex items-center mb-4">
                  <AlertTriangle className="w-6 h-6 text-red-500 mr-3" />
                  <h3 className="text-xl font-bold text-white">Buchung stornieren</h3>
                </div>
                
                <p className="text-gray-300 mb-6">
                  Sind Sie sicher, dass Sie diese Buchung stornieren möchten? 
                  Diese Aktion kann nicht rückgängig gemacht werden.
                </p>
                
                <div className="flex gap-4">
                  <button
                    onClick={() => setSelectedBooking(null)}
                    className="flex-1 bg-gray-700 hover:bg-gray-600 text-white py-3 rounded-lg font-medium transition-all duration-200"
                  >
                    Abbrechen
                  </button>
                  <button
                    onClick={() => handleCancelBooking(selectedBooking)}
                    className="flex-1 bg-red-500 hover:bg-red-600 text-white py-3 rounded-lg font-medium transition-all duration-200"
                  >
                    Stornieren
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cancellation;