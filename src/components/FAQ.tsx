import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ChevronDown, ChevronUp, HelpCircle } from 'lucide-react';

const FAQ = () => {
  const navigate = useNavigate();
  const [expandedFAQ, setExpandedFAQ] = useState<number | null>(null);

  const faqs = [
    {
      id: 1,
      question: 'Wie kann ich mich für ein Sportangebot anmelden?',
      answer: 'Klicken Sie einfach auf das gewünschte Angebot und dann auf "Jetzt buchen". Sie werden durch den Buchungsprozess geführt.'
    },
    {
      id: 2,
      question: 'Kann ich meine Buchung stornieren?',
      answer: 'Ja, Sie können Ihre Buchungen bis zu 24 Stunden vor dem Event kostenfrei stornieren. Gehen Sie dazu in Ihr Profil unter "Meine Buchungen".'
    },
    {
      id: 3,
      question: 'Wie werde ich Anbieter auf der Plattform?',
      answer: 'Füllen Sie das Formular unter "Anbieter werden" aus. Wir prüfen Ihre Anfrage und melden uns innerhalb von 24 Stunden bei Ihnen.'
    },
    {
      id: 4,
      question: 'Sind die Sportangebote für Anfänger geeignet?',
      answer: 'Viele unserer Angebote sind speziell für Anfänger konzipiert. Schauen Sie in der Beschreibung nach dem Level oder kontaktieren Sie den Anbieter direkt.'
    },
    {
      id: 5,
      question: 'Was passiert bei schlechtem Wetter?',
      answer: 'Bei Outdoor-Aktivitäten entscheidet der Anbieter über die Durchführung. Sie werden rechtzeitig informiert und erhalten bei Ausfall eine vollständige Rückerstattung.'
    },
    {
      id: 6,
      question: 'Wie kann ich Kontakt zum Anbieter aufnehmen?',
      answer: 'In jedem Angebot finden Sie einen "Kontakt"-Button. Darüber können Sie direkt mit dem Anbieter kommunizieren.'
    },
    {
      id: 7,
      question: 'Gibt es Rabatte für mehrere Buchungen?',
      answer: 'Viele Anbieter gewähren Rabatte bei Mehrfachbuchungen oder Monatsabos. Details finden Sie in der jeweiligen Angebotsbeschreibung.'
    },
    {
      id: 8,
      question: 'Kann ich ein Angebot bewerten?',
      answer: 'Ja, nach Teilnahme an einem Event können Sie eine Bewertung abgeben. Dies hilft anderen Nutzern bei der Auswahl.'
    }
  ];

  const toggleFAQ = (faqId: number) => {
    setExpandedFAQ(expandedFAQ === faqId ? null : faqId);
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
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-orange-500/20 rounded-full mb-4">
                <HelpCircle className="w-8 h-8 text-orange-500" />
              </div>
              <h1 className="text-3xl font-bold text-white mb-4">Häufig gestellte Fragen</h1>
              <p className="text-gray-300">
                Hier finden Sie Antworten auf die häufigsten Fragen rund um Sport Frankfurt.
              </p>
            </div>

            <div className="space-y-4">
              {faqs.map((faq) => (
                <div key={faq.id} className="bg-gray-700 rounded-lg border border-gray-600 overflow-hidden">
                  <button
                    onClick={() => toggleFAQ(faq.id)}
                    className="w-full p-6 text-left flex items-center justify-between hover:bg-gray-600 transition-colors duration-200"
                  >
                    <h3 className="text-lg font-semibold text-white pr-4">
                      {faq.question}
                    </h3>
                    {expandedFAQ === faq.id ? (
                      <ChevronUp className="w-5 h-5 text-orange-500 flex-shrink-0" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-gray-400 flex-shrink-0" />
                    )}
                  </button>
                  
                  {expandedFAQ === faq.id && (
                    <div className="px-6 pb-6 border-t border-gray-600">
                      <p className="text-gray-300 leading-relaxed pt-4">
                        {faq.answer}
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="mt-8 p-6 bg-gray-700 rounded-lg border border-gray-600">
              <h3 className="text-lg font-semibold text-white mb-3">
                Ihre Frage ist nicht dabei?
              </h3>
              <p className="text-gray-300 mb-4">
                Kontaktieren Sie uns über unser Hilfe-Center und wir helfen Ihnen gerne weiter.
              </p>
              <button
                onClick={() => navigate('/help-center')}
                className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-200"
              >
                Zum Hilfe-Center
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQ;