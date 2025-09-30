import React, { useState } from 'react';
import { Mail, CheckCircle } from 'lucide-react';

const Newsletter = () => {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Newsletter signup logic would go here
    if (email) {
      setIsSubscribed(true);
      setEmail('');
      
      // Reset success state after 3 seconds
      setTimeout(() => {
        setIsSubscribed(false);
      }, 3000);
    }
  };

  return (
    <section id="newsletter" className="py-20 bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-orange-500/20 rounded-full mb-6">
            <Mail className="w-8 h-8 text-orange-500" />
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Verpasse keine <span className="text-orange-500">Sport-News</span>
          </h2>
          
          <p className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto">
            Erhalte wöchentlich die besten Sportangebote, neue Kurse und exklusive Deals 
            direkt in dein Postfach. Kostenlos und jederzeit abbestellbar.
          </p>

          <form onSubmit={handleSubmit} className="max-w-lg mx-auto">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1 relative">
                <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="email"
                  placeholder="Deine E-Mail-Adresse"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  required
                />
              </div>
              
              <button
                type="submit"
                disabled={isSubscribed}
                className="bg-orange-500 hover:bg-orange-600 disabled:bg-green-500 disabled:hover:bg-green-500 text-white px-8 py-4 rounded-lg font-semibold transition-all duration-200 hover:shadow-lg hover:shadow-orange-500/25 transform hover:scale-105 disabled:transform-none whitespace-nowrap flex items-center justify-center gap-2"
              >
                {isSubscribed ? (
                  <>
                    <CheckCircle size={20} />
                    Erfolgreich!
                  </>
                ) : (
                  'Jetzt abonnieren'
                )}
              </button>
            </div>
          </form>

          <div className="flex items-center justify-center gap-8 mt-8 text-sm text-gray-400">
            <div className="flex items-center gap-2">
              <CheckCircle size={16} className="text-green-400" />
              <span>Kostenlos</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle size={16} className="text-green-400" />
              <span>Jederzeit kündbar</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle size={16} className="text-green-400" />
              <span>Kein Spam</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;