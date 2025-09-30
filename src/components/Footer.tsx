import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Twitter, Mail, Phone, MapPin } from 'lucide-react';
import GlobalCategoryNav from './navigation/GlobalCategoryNav';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900">
      <GlobalCategoryNav />
      <div className="border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Logo & Description */}
          <div className="lg:col-span-1">
            <h3 className="text-2xl font-bold text-white mb-4">
              Sport <span className="text-orange-500">Frankfurt</span>
            </h3>
            <p className="text-gray-300 mb-6 leading-relaxed">
              Die führende Plattform für Sportangebote in Frankfurt. 
              Entdecke, buche und erlebe Sport in deiner Stadt. Lerne dabei neue Leute kennen
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-orange-500 transition-colors duration-200">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-orange-500 transition-colors duration-200">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-orange-500 transition-colors duration-200">
                <Twitter size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-6">Kategorien</h4>
            <ul className="space-y-3">
              <li><a href="#kategorien" className="text-gray-300 hover:text-orange-500 transition-colors duration-200">Fahrrad</a></li>
              <li><a href="#kategorien" className="text-gray-300 hover:text-orange-500 transition-colors duration-200">Fußball</a></li>
              <li><a href="#kategorien" className="text-gray-300 hover:text-orange-500 transition-colors duration-200">Basketball</a></li>
              <li><a href="#kategorien" className="text-gray-300 hover:text-orange-500 transition-colors duration-200">Skaten</a></li>
              <li><a href="#kategorien" className="text-gray-300 hover:text-orange-500 transition-colors duration-200">Padel</a></li>
              <li><a href="#kategorien" className="text-gray-300 hover:text-orange-500 transition-colors duration-200">Laufen</a></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-6">Support</h4>
            <ul className="space-y-3">
              <li><Link to="/help-center" className="text-gray-300 hover:text-orange-500 transition-colors duration-200">Hilfe-Center</Link></li>
              <li><Link to="/become-provider" className="text-gray-300 hover:text-orange-500 transition-colors duration-200">Anbieter werden</Link></li>
              <li><Link to="/cancellation" className="text-gray-300 hover:text-orange-500 transition-colors duration-200">Stornierung</Link></li>
              <li><Link to="/faq" className="text-gray-300 hover:text-orange-500 transition-colors duration-200">FAQ</Link></li>
              <li><a href="#" className="text-gray-300 hover:text-orange-500 transition-colors duration-200">Wir Gründer</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-6">Kontakt</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-orange-500 mt-1 flex-shrink-0" />
                <div>
                  <p className="text-gray-300">
                    Sport Frankfurt GmbH<br />
                    Taunusanlage 14<br />
                    60325 Frankfurt am Main
                  </p>
                </div>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-orange-500 flex-shrink-0" />
                <a href="tel:+496912345678" className="text-gray-300 hover:text-orange-500 transition-colors duration-200">
                  +49 (69) 123 456 78
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-orange-500 flex-shrink-0" />
                <a href="mailto:info@sport-frankfurt.de" className="text-gray-300 hover:text-orange-500 transition-colors duration-200">
                  info@sport-frankfurt.de
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm mb-4 md:mb-0">
              © {currentYear} Sport Frankfurt. Alle Rechte vorbehalten.
            </p>
            <div className="flex space-x-6 text-sm">
              <Link to="/impressum" className="text-gray-400 hover:text-orange-500 transition-colors duration-200">
                Impressum
              </Link>
              <Link to="/privacy" className="text-gray-400 hover:text-orange-500 transition-colors duration-200">Datenschutz</Link>
              <Link to="/terms" className="text-gray-400 hover:text-orange-500 transition-colors duration-200">AGB</Link>
              <a href="#" className="text-gray-400 hover:text-orange-500 transition-colors duration-200">Cookie-Einstellungen</a>
            </div>
          </div>
        </div>
      </div>
      </div>
    </footer>
  );
};

export default Footer;
