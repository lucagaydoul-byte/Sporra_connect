import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, User, Mail, Phone, Building, MapPin, Send } from 'lucide-react';

const BecomeProvider = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    sportType: '',
    location: '',
    description: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Anbieter-Anfrage:', formData);
    setIsSubmitted(true);

    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({
        name: '',
        email: '',
        phone: '',
        company: '',
        sportType: '',
        location: '',
        description: ''
      });
    }, 3000);
  };

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
            <h1 className="text-3xl font-bold text-white mb-6">Anbieter werden</h1>
            <p className="text-gray-300 mb-8">
              Werden Sie Teil unserer Plattform und erreichen Sie sportbegeisterte Menschen in Frankfurt.
              Füllen Sie das Formular aus und wir melden uns bei Ihnen!
            </p>

            {isSubmitted ? (
              <div className="bg-green-500/20 border border-green-500/50 rounded-lg p-6 text-center">
                <div className="text-green-400 mb-2">
                  <Send className="w-8 h-8 mx-auto mb-2" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">Anfrage gesendet!</h3>
                <p className="text-gray-300">
                  Vielen Dank für Ihr Interesse! Wir werden uns innerhalb von 24 Stunden bei Ihnen melden.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Name */}
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                    <input
                      type="text"
                      placeholder="Ihr Name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full pl-10 pr-4 py-3 bg-gray-700 border border-gray-600 rounded-lg 
                                 text-white placeholder-gray-400 focus:outline-none focus:ring-2 
                                 focus:ring-orange-500 focus:border-transparent"
                      required
                    />
                  </div>

                  {/* E-Mail */}
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                    <input
                      type="email"
                      placeholder="E-Mail-Adresse"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full pl-10 pr-4 py-3 bg-gray-700 border border-gray-600 rounded-lg 
                                 text-white placeholder-gray-400 focus:outline-none focus:ring-2 
                                 focus:ring-orange-500 focus:border-transparent"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Telefon */}
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                    <input
                      type="tel"
                      placeholder="Telefonnummer"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full pl-10 pr-4 py-3 bg-gray-700 border border-gray-600 rounded-lg 
                                 text-white placeholder-gray-400 focus:outline-none focus:ring-2 
                                 focus:ring-orange-500 focus:border-transparent"
                      required
                    />
                  </div>

                  {/* Unternehmen */}
                  <div className="relative">
                    <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                    <input
                      type="text"
                      placeholder="Unternehmen/Verein"
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      className="w-full pl-10 pr-4 py-3 bg-gray-700 border border-gray-600 rounded-lg 
                                 text-white placeholder-gray-400 focus:outline-none focus:ring-2 
                                 focus:ring-orange-500 focus:border-transparent"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Sportart */}
                  <div>
                    <select
                      value={formData.sportType}
                      onChange={(e) => setFormData({ ...formData, sportType: e.target.value })}
                      className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg 
                                 text-white placeholder-gray-400 focus:outline-none focus:ring-2 
                                 focus:ring-orange-500 focus:border-transparent appearance-none"
                      required
                    >
                      <option value="" className="bg-gray-800 text-gray-400">Sportart auswählen</option>
                      <option value="fahrrad" className="bg-gray-800 text-gray-300">Fahrrad</option>
                      <option value="fussball" className="bg-gray-800 text-gray-300">Fußball</option>
                      <option value="basketball" className="bg-gray-800 text-gray-300">Basketball</option>
                      <option value="skaten" className="bg-gray-800 text-gray-300">Skaten</option>
                      <option value="paddel" className="bg-gray-800 text-gray-300">Paddel</option>
                      <option value="laufen" className="bg-gray-800 text-gray-300">Laufen</option>
                      <option value="other" className="bg-gray-800 text-gray-300">Sonstiges</option>
                    </select>
                  </div>

                  {/* Standort */}
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                    <input
                      type="text"
                      placeholder="Standort in Frankfurt"
                      value={formData.location}
                      onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                      className="w-full pl-10 pr-4 py-3 bg-gray-700 border border-gray-600 rounded-lg 
                                 text-white placeholder-gray-400 focus:outline-none focus:ring-2 
                                 focus:ring-orange-500 focus:border-transparent"
                      required
                    />
                  </div>
                </div>

                {/* Beschreibung */}
                <div>
                  <textarea
                    placeholder="Beschreiben Sie Ihr Sportangebot..."
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    rows={6}
                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg 
                               text-white placeholder-gray-400 focus:outline-none focus:ring-2 
                               focus:ring-orange-500 focus:border-transparent resize-none"
                    required
                  />
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-lg 
                             font-semibold transition-all duration-200 hover:shadow-lg 
                             hover:shadow-orange-500/25 transform hover:scale-105"
                >
                  Anfrage senden
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BecomeProvider;