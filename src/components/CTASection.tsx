import React from 'react';
import { Plus, Target, Users, Trophy } from 'lucide-react';

const CTASection = () => {
  const benefits = [
    {
      icon: <Target className="w-8 h-8" />,
      title: 'Zielgruppengenau',
      description: 'Erreiche sportinteressierte Menschen in Frankfurt direkt'
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: 'Große Reichweite',
      description: 'Über 10.000 aktive Nutzer suchen täglich nach Sportangeboten'
    },
    {
      icon: <Trophy className="w-8 h-8" />,
      title: 'Kostenfrei starten',
      description: 'Basis-Eintrag komplett kostenlos, Premium-Features optional'
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-r from-orange-500 to-orange-600">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full mb-6">
            <Plus className="w-8 h-8 text-white" />
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Dein Angebot kostenlos eintragen
          </h2>
          
          <p className="text-xl text-orange-100 max-w-3xl mx-auto mb-12">
            Werde Teil der größten Sportplattform in Frankfurt und erreiche täglich neue Kunden. 
            Starte noch heute kostenfrei und wachse mit uns.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {benefits.map((benefit, index) => (
            <div key={index} className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full mb-4 text-white">
                {benefit.icon}
              </div>
              <h3 className="text-xl font-bold text-white mb-3">
                {benefit.title}
              </h3>
              <p className="text-orange-100">
                {benefit.description}
              </p>
            </div>
          ))}
        </div>

        <div className="text-center">
          <div className="bg-white rounded-2xl p-8 max-w-md mx-auto shadow-2xl">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">
              Jetzt kostenlos anmelden
            </h3>
            
            <form className="space-y-4">
              <input
                type="text"
                placeholder="Name des Anbieters"
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              />
              <input
                type="email"
                placeholder="E-Mail-Adresse"
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              />
              <input
                type="tel"
                placeholder="Telefonnummer"
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              />
              <select className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent">
                <option value="">Sportart auswählen</option>
                <option value="fahrrad">Fahrrad</option>
                <option value="fussball">Fußball</option>
                <option value="basketball">Basketball</option>
                <option value="skaten">Skaten</option>
                <option value="paddel">Paddel</option>
                <option value="laufen">Laufen</option>
                <option value="other">Sonstiges</option>
              </select>
              
              <button
                type="submit"
                className="w-full bg-orange-500 hover:bg-orange-600 text-gray py-4 rounded-lg font-bold text-lg transition-all duration-200 hover:shadow-lg transform hover:scale-105"
              >
                Kostenlos eintragen
              </button>
            </form>
            
            <p className="text-sm text-gray-500 mt-4">
              * Basis-Eintrag komplett kostenfrei. Keine versteckten Kosten.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;