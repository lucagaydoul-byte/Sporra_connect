import React, { useState, useEffect } from 'react';
import { Menu, X, User, LogOut, Settings, Calendar, Mail, Lock, Eye, EyeOff } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import NotificationSystem from './NotificationSystem';
import { useNavigate } from 'react-router-dom';
import PasswordStrengthIndicator from './auth/PasswordStrengthIndicator';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: ''
  });
  const [error, setError] = useState('');
  const [showUserDropdown, setShowUserDropdown] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const { user, login, register, logout, isLoading } = useAuth();
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = () => {
    logout();
    setIsMenuOpen(false);
    setShowUserDropdown(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Password validation for registration
    if (!isLogin) {
      const passwordRequirements = [
        { test: (pwd: string) => pwd.length >= 8, message: 'Passwort muss mindestens 8 Zeichen haben' },
        { test: (pwd: string) => /[A-Z]/.test(pwd), message: 'Passwort muss einen Großbuchstaben enthalten' },
        { test: (pwd: string) => /[a-z]/.test(pwd), message: 'Passwort muss einen Kleinbuchstaben enthalten' },
        { test: (pwd: string) => /\d/.test(pwd), message: 'Passwort muss eine Zahl enthalten' },
        { test: (pwd: string) => /[!@#$%^&*(),.?":{}|<>]/.test(pwd), message: 'Passwort muss ein Sonderzeichen enthalten' }
      ];

      const failedRequirement = passwordRequirements.find(req => !req.test(formData.password));
      if (failedRequirement) {
        setError(failedRequirement.message);
        return;
      }

      if (!formData.name.trim()) {
        setError('Bitte geben Sie Ihren Namen ein.');
        return;
      }
    }

    if (isLogin) {
      const success = await login(formData.email, formData.password);
      if (success) {
        setIsLoginModalOpen(false);
        setFormData({ email: '', password: '', name: '' });
      } else {
        setError('Anmeldung fehlgeschlagen. Bitte überprüfen Sie Ihre Daten.');
      }
    } else {
      const success = await register(formData.email, formData.password, formData.name);
      if (success) {
        setIsLoginModalOpen(false);
        setFormData({ email: '', password: '', name: '' });
        // Redirect to onboarding for new users
        navigate('/onboarding');
      } else {
        setError('Registrierung fehlgeschlagen. Bitte versuchen Sie es erneut.');
      }
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > lastScrollY) {
        setHidden(true);
      } else {
        setHidden(false);
      }
      setLastScrollY(window.scrollY);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);


  return (
    <header
      className={`fixed top-0 left-0 right-0 bg-gray-900/95 backdrop-blur-sm border-b border-gray-800 z-50 transform transition-transform duration-300 ${
        hidden ? "-translate-y-full" : "translate-y-0"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <a href="/" className="text-2xl font-bold text-white hover:text-orange-500 transition-colors duration-200">
               <span className="text-orange-500">Sporra</span>
            </a>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <a
              href="/offers"
              className="text-gray-300 hover:text-orange-500 transition-colors duration-200"
            >
              Kategorien
            </a>
            <a
              href="/offers"
              className="text-gray-300 hover:text-orange-500 transition-colors duration-200"
            >
              Anbieter
            </a>
            <a
              href="/help-center"
              className="text-gray-300 hover:text-orange-500 transition-colors duration-200"
            >
              Hilfe
            </a>
          </nav>

          {/* User Section */}
          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              <div className="flex items-center space-x-4 relative">
                <NotificationSystem />
                <button
                  onClick={() => setShowUserDropdown(!showUserDropdown)}
                  className="flex items-center space-x-2 text-gray-300 hover:text-orange-500 transition-colors duration-200"
                >
                  <User className="w-5 h-5 text-gray-300" />
                  <span className="text-gray-300">{user.name}</span>
                </button>
                
                {/* User Dropdown */}
                {showUserDropdown && (
                  <div className="absolute right-0 top-full mt-2 w-48 bg-gray-800 border border-gray-700 rounded-lg shadow-2xl z-50">
                    <div className="py-2">
                      <button
                        onClick={() => {
                          navigate('/profile');
                          setShowUserDropdown(false);
                        }}
                        className="w-full text-left px-4 py-2 text-gray-300 hover:bg-gray-700 hover:text-orange-500 transition-colors duration-200 flex items-center gap-2"
                      >
                        <Settings className="w-4 h-4" />
                        Profil & Einstellungen
                      </button>
                      <button
                        onClick={() => {
                          navigate('/cancellation');
                          setShowUserDropdown(false);
                        }}
                        className="w-full text-left px-4 py-2 text-gray-300 hover:bg-gray-700 hover:text-orange-500 transition-colors duration-200 flex items-center gap-2"
                      >
                        <Calendar className="w-4 h-4" />
                        Meine Buchungen
                      </button>
                      <hr className="border-gray-700 my-1" />
                      <button
                        onClick={handleLogout}
                        className="w-full text-left px-4 py-2 text-gray-300 hover:bg-gray-700 hover:text-red-400 transition-colors duration-200 flex items-center gap-2"
                      >
                        <LogOut className="w-4 h-4" />
                        Abmelden
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <button
                onClick={() => setIsLoginModalOpen(true)}
                className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-lg font-medium transition-all duration-200"
              >
                Anmelden
              </button>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="text-gray-300 hover:text-white transition-colors duration-200"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-gray-800/95 rounded-lg mt-2 border border-gray-700">
              <a
                href="/offers"
                className="block px-3 py-2 text-gray-300 hover:text-orange-500 transition-colors duration-200"
              >
                Kategorien
              </a>
              <a
                href="/offers"
                className="block px-3 py-2 text-gray-300 hover:text-orange-500 transition-colors duration-200"
              >
                Anbieter
              </a>
              <a
                href="/help-center"
                className="block px-3 py-2 text-gray-300 hover:text-orange-500 transition-colors duration-200"
              >
                Hilfe
              </a>
              
              {user ? (
                <div className="border-t border-gray-700 pt-2 mt-2">
                  <div className="px-3 py-2 text-gray-300">
                    Angemeldet als: {user.name}
                  </div>
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-3 py-2 text-gray-300 hover:text-orange-500 transition-colors duration-200"
                  >
                    Abmelden
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setIsLoginModalOpen(true)}
                  className="w-full mt-2 bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-lg font-medium transition-all duration-200"
                >
                  Anmelden
                </button>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Login Modal */}
      {isLoginModalOpen && (
        // Korrektur: items-start, py-10 und overflow-y-auto hinzugefügt
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-start justify-center p-4 py-10 overflow-y-auto">
          <div className="bg-gray-800 rounded-2xl border border-gray-700 w-full max-w-md">
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-700">
              <h2 className="text-2xl font-bold text-white">
                {isLogin ? 'Anmelden' : 'Registrieren'}
              </h2>
              <button
                onClick={() => setIsLoginModalOpen(false)}
                className="text-gray-400 hover:text-white transition-colors duration-200"
              >
                <X size={24} />
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="p-6">
              {error && (
                <div className="bg-red-500/20 border border-red-500/50 rounded-lg p-3 mb-4">
                  <p className="text-red-400 text-sm">{error}</p>
                </div>
              )}

              <div className="space-y-4">
                {!isLogin && (
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                    <input
                      type="text"
                      placeholder="Vollständiger Name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full pl-10 pr-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      required={!isLogin}
                    />
                  </div>
                )}

                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                  <input
                    type="email"
                    placeholder="E-Mail-Adresse"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full pl-10 pr-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    required
                  />
                </div>

                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Passwort"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    className="w-full pl-10 pr-12 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    required
                    minLength={8}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors duration-200"
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
                
                {!isLogin && formData.password && (
                  <PasswordStrengthIndicator password={formData.password} />
                )}
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full mt-6 bg-orange-500 hover:bg-orange-600 disabled:bg-orange-400 text-white py-3 rounded-lg font-semibold transition-all duration-200 hover:shadow-lg hover:shadow-orange-500/25"
              >
                {isLoading ? 'Wird verarbeitet...' : (isLogin ? 'Anmelden' : 'Registrieren')}
              </button>

              <div className="mt-6 text-center">
                <p className="text-gray-400">
                  {isLogin ? 'Noch kein Konto?' : 'Bereits registriert?'}
                  <button
                    type="button"
                    onClick={() => {
                      setIsLogin(!isLogin);
                      setError('');
                      setFormData({ email: '', password: '', name: '' });
                    }}
                    className="text-orange-500 hover:text-orange-400 ml-2 font-medium transition-colors duration-200"
                  >
                    {isLogin ? 'Jetzt registrieren' : 'Hier anmelden'}
                  </button>
                </p>
              </div>
            </form>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;