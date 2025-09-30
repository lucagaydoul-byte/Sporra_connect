import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, FileText } from 'lucide-react';

const Terms = () => {
  const navigate = useNavigate();

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
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-orange-500/20 rounded-full mb-4">
                <FileText className="w-8 h-8 text-orange-500" />
              </div>
              <h1 className="text-3xl font-bold text-white mb-4">Allgemeine Geschäftsbedingungen</h1>
              <p className="text-gray-300">
                Letzte Aktualisierung: {new Date().toLocaleDateString('de-DE')}
              </p>
            </div>

            <div className="prose prose-invert max-w-none">
              <div className="bg-gray-700 rounded-lg p-6 mb-6">
                <h2 className="text-xl font-semibold text-white mb-4">
                  Platzhalter für AGB
                </h2>
                <p className="text-gray-300 leading-relaxed">
                  Hier können Sie Ihre vollständigen Allgemeinen Geschäftsbedingungen einfügen. 
                  Dieser Bereich ist vorbereitet für Ihren individuellen AGB-Text.
                </p>
              </div>

              <div className="space-y-6 text-gray-300">
                <section>
                  <h3 className="text-lg font-semibold text-white mb-3">§ 1 Geltungsbereich</h3>
                  <p className="leading-relaxed">
                    [Hier können Sie den Geltungsbereich Ihrer AGB definieren]
                  </p>
                </section>

                <section>
                  <h3 className="text-lg font-semibold text-white mb-3">§ 2 Vertragsschluss</h3>
                  <p className="leading-relaxed">
                    [Hier können Sie Details zum Vertragsschluss einfügen]
                  </p>
                </section>

                <section>
                  <h3 className="text-lg font-semibold text-white mb-3">§ 3 Leistungen</h3>
                  <p className="leading-relaxed">
                    [Hier können Sie Ihre Leistungen beschreiben]
                  </p>
                </section>

                <section>
                  <h3 className="text-lg font-semibold text-white mb-3">§ 4 Preise und Zahlung</h3>
                  <p className="leading-relaxed">
                    [Hier können Sie Preis- und Zahlungsbedingungen einfügen]
                  </p>
                </section>

                <section>
                  <h3 className="text-lg font-semibold text-white mb-3">§ 5 Stornierung</h3>
                  <p className="leading-relaxed">
                    [Hier können Sie Stornierungsbedingungen einfügen]
                  </p>
                </section>

                <section>
                  <h3 className="text-lg font-semibold text-white mb-3">§ 6 Haftung</h3>
                  <p className="leading-relaxed">
                    [Hier können Sie Haftungsbestimmungen einfügen]
                  </p>
                </section>

                <section>
                  <h3 className="text-lg font-semibold text-white mb-3">§ 7 Schlussbestimmungen</h3>
                  <p className="leading-relaxed">
                    [Hier können Sie Schlussbestimmungen einfügen]
                  </p>
                </section>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Terms;