import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, Clock, MapPin, Users, Euro, FileText, Plus, X } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { eventStore } from '../data/offers';

interface EventFormData {
  title: string;
  description: string;
  category: string;
  skillLevel: string;
  location: string;
  district: string;
  date: string;
  time: string;
  duration: string;
  maxParticipants: number;
  price: number;
  equipment: string[];
  isRecurring: boolean;
  recurrencePattern: string;
}

const EventCreation: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [formData, setFormData] = useState<EventFormData>({
    title: '',
    description: '',
    category: '',
    skillLevel: '',
    location: '',
    district: '',
    date: '',
    time: '',
    duration: '',
    maxParticipants: 10,
    price: 0,
    equipment: [],
    isRecurring: false,
    recurrencePattern: 'weekly'
  });

  const [newEquipment, setNewEquipment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const categories = ['Fußball', 'Basketball', 'Tennis', 'Laufen', 'Fahrrad', 'Schwimmen', 'Yoga', 'Fitness'];
  const skillLevels = ['Alle Level', 'Anfänger', 'Fortgeschritten', 'Profi'];
  const districts = ['Innenstadt', 'Nordend', 'Westend', 'Sachsenhausen', 'Bockenheim', 'Ostend'];
  const durations = ['30 Min', '1 Std', '1.5 Std', '2 Std', '3 Std', '4 Std'];

  const handleInputChange = (field: keyof EventFormData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const addEquipment = () => {
    if (newEquipment.trim() && !formData.equipment.includes(newEquipment.trim())) {
      setFormData(prev => ({
        ...prev,
        equipment: [...prev.equipment, newEquipment.trim()]
      }));
      setNewEquipment('');
    }
  };

  const removeEquipment = (equipment: string) => {
    setFormData(prev => ({
      ...prev,
      equipment: prev.equipment.filter(e => e !== equipment)
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Create new offer object
      const newOffer = {
        title: formData.title,
        provider: user?.name || 'Unbekannter Anbieter',
        image: 'https://images.pexels.com/photos/416978/pexels-photo-416978.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&fit=crop', // Default image
        price: formData.price.toString(),
        period: '/Event',
        district: formData.district,
        rating: 5.0, // Default rating for new events
        duration: formData.duration,
        category: formData.category,
        description: formData.description,
        date: formData.date,
        time: formData.time,
        currentParticipants: 0,
        maxParticipants: formData.maxParticipants,
        location: formData.location,
        fullDescription: formData.description,
        content: `${formData.skillLevel}, ${formData.equipment.join(', ')}`,
        createdBy: user?.id
      };
      
      // Add to global event store
      const createdEvent = eventStore.addOffer(newOffer);
      
      console.log('Event erstellt:', createdEvent);
      
      alert('Event erfolgreich erstellt!');
      navigate('/');
    } catch (error) {
      console.error('Fehler beim Erstellen des Events:', error);
      alert('Fehler beim Erstellen des Events. Bitte versuchen Sie es erneut.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-900 pt-24 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gray-800 rounded-2xl border border-gray-700 p-8 text-center">
            <h1 className="text-3xl font-bold text-white mb-6">Event erstellen</h1>
            <p className="text-gray-300 mb-6">
              Sie müssen angemeldet sein, um ein Event zu erstellen.
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
        <div className="bg-gray-800 rounded-2xl border border-gray-700 overflow-hidden">
          <div className="p-8">
            <h1 className="text-3xl font-bold text-white mb-6">Neues Event erstellen</h1>
            <p className="text-gray-300 mb-8">
              Erstelle ein Event und finde Gleichgesinnte für deine Sportaktivität.
            </p>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Titel */}
              <div>
                <label className="block text-white font-semibold mb-2">
                  Event-Titel *
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => handleInputChange('title', e.target.value)}
                  placeholder="z.B. Fußball im Park"
                  className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  required
                />
              </div>

              {/* Kategorie und Skill Level */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-white font-semibold mb-2">
                    Sportart *
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) => handleInputChange('category', e.target.value)}
                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    required
                  >
                    <option value="">Sportart wählen</option>
                    {categories.map(category => (
                      <option key={category} value={category}>{category}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-white font-semibold mb-2">
                    Skill Level
                  </label>
                  <select
                    value={formData.skillLevel}
                    onChange={(e) => handleInputChange('skillLevel', e.target.value)}
                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  >
                    {skillLevels.map(level => (
                      <option key={level} value={level}>{level}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Beschreibung */}
              <div>
                <label className="block text-white font-semibold mb-2">
                  Beschreibung *
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  placeholder="Beschreibe dein Event..."
                  rows={4}
                  className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent resize-none"
                  required
                />
              </div>

              {/* Ort und Bezirk */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-white font-semibold mb-2">
                    <MapPin className="w-4 h-4 inline mr-1" />
                    Ort *
                  </label>
                  <input
                    type="text"
                    value={formData.location}
                    onChange={(e) => handleInputChange('location', e.target.value)}
                    placeholder="z.B. Günthersburgpark"
                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    required
                  />
                </div>

                <div>
                  <label className="block text-white font-semibold mb-2">
                    Bezirk *
                  </label>
                  <select
                    value={formData.district}
                    onChange={(e) => handleInputChange('district', e.target.value)}
                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    required
                  >
                    <option value="">Bezirk wählen</option>
                    {districts.map(district => (
                      <option key={district} value={district}>{district}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Datum, Zeit und Dauer */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-white font-semibold mb-2">
                    <Calendar className="w-4 h-4 inline mr-1" />
                    Datum *
                  </label>
                  <input
                    type="date"
                    value={formData.date}
                    onChange={(e) => handleInputChange('date', e.target.value)}
                    min={new Date().toISOString().split('T')[0]}
                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    required
                  />
                </div>

                <div>
                  <label className="block text-white font-semibold mb-2">
                    <Clock className="w-4 h-4 inline mr-1" />
                    Uhrzeit *
                  </label>
                  <input
                    type="time"
                    value={formData.time}
                    onChange={(e) => handleInputChange('time', e.target.value)}
                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    required
                  />
                </div>

                <div>
                  <label className="block text-white font-semibold mb-2">
                    Dauer
                  </label>
                  <select
                    value={formData.duration}
                    onChange={(e) => handleInputChange('duration', e.target.value)}
                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  >
                    <option value="">Dauer wählen</option>
                    {durations.map(duration => (
                      <option key={duration} value={duration}>{duration}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Teilnehmer und Preis */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-white font-semibold mb-2">
                    <Users className="w-4 h-4 inline mr-1" />
                    Max. Teilnehmer
                  </label>
                  <input
                    type="number"
                    value={formData.maxParticipants}
                    onChange={(e) => handleInputChange('maxParticipants', parseInt(e.target.value) || 1)}
                    min="1"
                    max="100"
                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-white font-semibold mb-2">
                    <Euro className="w-4 h-4 inline mr-1" />
                    Preis (€)
                  </label>
                  <input
                    type="number"
                    value={formData.price}
                    onChange={(e) => handleInputChange('price', parseFloat(e.target.value) || 0)}
                    min="0"
                    step="0.01"
                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  />
                </div>
              </div>

              {/* Equipment */}
              <div>
                <label className="block text-white font-semibold mb-2">
                  Benötigte Ausrüstung
                </label>
                <div className="flex gap-2 mb-3">
                  <input
                    type="text"
                    value={newEquipment}
                    onChange={(e) => setNewEquipment(e.target.value)}
                    placeholder="z.B. Fußball, Sportschuhe"
                    className="flex-1 px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addEquipment())}
                  />
                  <button
                    type="button"
                    onClick={addEquipment}
                    className="px-4 py-3 bg-orange-500 hover:bg-orange-600 text-white rounded-lg transition-colors duration-200"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
                
                {formData.equipment.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {formData.equipment.map((item, index) => (
                      <span
                        key={index}
                        className="inline-flex items-center gap-1 bg-gray-700 text-white px-3 py-1 rounded-full text-sm"
                      >
                        {item}
                        <button
                          type="button"
                          onClick={() => removeEquipment(item)}
                          className="text-gray-400 hover:text-white transition-colors duration-200"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* Wiederkehrend */}
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  id="recurring"
                  checked={formData.isRecurring}
                  onChange={(e) => handleInputChange('isRecurring', e.target.checked)}
                  className="w-4 h-4 text-orange-500 bg-gray-700 border-gray-600 rounded focus:ring-orange-500 focus:ring-2"
                />
                <label htmlFor="recurring" className="text-white">
                  Wiederkehrendes Event
                </label>
                
                {formData.isRecurring && (
                  <select
                    value={formData.recurrencePattern}
                    onChange={(e) => handleInputChange('recurrencePattern', e.target.value)}
                    className="ml-4 px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
                  >
                    <option value="weekly">Wöchentlich</option>
                    <option value="biweekly">Alle 2 Wochen</option>
                    <option value="monthly">Monatlich</option>
                  </select>
                )}
              </div>

              {/* Submit Button */}
              <div className="pt-6">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-orange-500 hover:bg-orange-600 disabled:bg-orange-400 text-white py-4 rounded-lg font-semibold text-lg transition-all duration-200 hover:shadow-lg hover:shadow-orange-500/25"
                >
                  {isSubmitting ? 'Event wird erstellt...' : 'Event erstellen'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventCreation;