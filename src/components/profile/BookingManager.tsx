import React, { useState } from 'react';
import { Calendar, Clock, MapPin, Edit, Trash2, CheckCircle, XCircle } from 'lucide-react';

interface Booking {
  id: string;
  eventTitle: string;
  provider: string;
  date: string;
  time: string;
  location: string;
  status: 'confirmed' | 'pending' | 'cancelled';
  price: string;
  canCancel: boolean;
  canModify: boolean;
}

const BookingManager: React.FC = () => {
  const [bookings, setBookings] = useState<Booking[]>([
    {
      id: '1',
      eventTitle: 'Basketball Training',
      provider: 'Frankfurt Basketball Club',
      date: '2024-03-20',
      time: '18:30',
      location: 'Nordend Halle',
      status: 'confirmed',
      price: '45€',
      canCancel: true,
      canModify: true
    },
    {
      id: '2',
      eventTitle: 'Bike Tour Frankfurt',
      provider: 'Frankfurt Cycling Club',
      date: '2024-03-22',
      time: '10:00',
      location: 'Römerberg',
      status: 'pending',
      price: '15€',
      canCancel: true,
      canModify: false
    },
    {
      id: '3',
      eventTitle: 'Yoga Session',
      provider: 'Zen Studio',
      date: '2024-03-18',
      time: '19:00',
      location: 'Westend Studio',
      status: 'cancelled',
      price: '20€',
      canCancel: false,
      canModify: false
    }
  ]);

  const [filter, setFilter] = useState<'all' | 'confirmed' | 'pending' | 'cancelled'>('all');

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'confirmed':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'pending':
        return <Clock className="w-5 h-5 text-yellow-500" />;
      case 'cancelled':
        return <XCircle className="w-5 h-5 text-red-500" />;
      default:
        return null;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'confirmed': return 'Bestätigt';
      case 'pending': return 'Ausstehend';
      case 'cancelled': return 'Storniert';
      default: return status;
    }
  };

  const handleCancel = (bookingId: string) => {
    if (confirm('Möchten Sie diese Buchung wirklich stornieren?')) {
      setBookings(bookings.map(booking => 
        booking.id === bookingId 
          ? { ...booking, status: 'cancelled' as const, canCancel: false, canModify: false }
          : booking
      ));
    }
  };

  const handleModify = (bookingId: string) => {
    // Open modification modal or navigate to edit page
    console.log('Modify booking:', bookingId);
  };

  const filteredBookings = bookings.filter(booking => 
    filter === 'all' || booking.status === filter
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-semibold text-white">Meine Buchungen</h3>
        
        {/* Filter Buttons */}
        <div className="flex gap-2">
          {[
            { key: 'all', label: 'Alle' },
            { key: 'confirmed', label: 'Bestätigt' },
            { key: 'pending', label: 'Ausstehend' },
            { key: 'cancelled', label: 'Storniert' }
          ].map(({ key, label }) => (
            <button
              key={key}
              onClick={() => setFilter(key as any)}
              className={`px-3 py-1 rounded-full text-sm transition-colors duration-200 ${
                filter === key
                  ? 'bg-orange-500 text-white'
                  : 'bg-gray-600 text-gray-300 hover:bg-gray-500'
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {filteredBookings.length === 0 ? (
        <div className="text-center py-12">
          <Calendar className="w-16 h-16 text-gray-500 mx-auto mb-4" />
          <p className="text-gray-400">Keine Buchungen gefunden.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredBookings.map((booking) => (
            <div key={booking.id} className="bg-gray-600 rounded-lg p-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h4 className="text-lg font-semibold text-white">{booking.eventTitle}</h4>
                    <div className="flex items-center gap-1">
                      {getStatusIcon(booking.status)}
                      <span className={`text-sm font-medium ${
                        booking.status === 'confirmed' ? 'text-green-400' :
                        booking.status === 'pending' ? 'text-yellow-400' :
                        'text-red-400'
                      }`}>
                        {getStatusText(booking.status)}
                      </span>
                    </div>
                  </div>
                  
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
                </div>
                
                <div className="text-right">
                  <p className="text-lg font-bold text-white mb-3">{booking.price}</p>
                  
                  <div className="flex gap-2">
                    {booking.canModify && (
                      <button
                        onClick={() => handleModify(booking.id)}
                        className="flex items-center gap-1 px-3 py-1 bg-blue-500 hover:bg-blue-600 text-white text-sm rounded transition-colors duration-200"
                      >
                        <Edit className="w-3 h-3" />
                        Ändern
                      </button>
                    )}
                    
                    {booking.canCancel && (
                      <button
                        onClick={() => handleCancel(booking.id)}
                        className="flex items-center gap-1 px-3 py-1 bg-red-500 hover:bg-red-600 text-white text-sm rounded transition-colors duration-200"
                      >
                        <Trash2 className="w-3 h-3" />
                        Stornieren
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default BookingManager;