import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, MapPin, Target, Clock, CheckCircle, ArrowRight, ArrowLeft } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

interface OnboardingData {
  sports: string[];
  skillLevels: { [sport: string]: string };
  location: string;
  availability: string[];
  goals: string[];
}

const OnboardingFlow: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [currentStep, setCurrentStep] = useState(1);
  const [onboardingData, setOnboardingData] = useState<OnboardingData>({
    sports: [],
    skillLevels: {},
    location: '',
    availability: [],
    goals: []
  });

  const totalSteps = 4;

  const sports = [
    'Fußball', 'Basketball', 'Tennis', 'Laufen', 'Fahrrad', 
    'Schwimmen', 'Yoga', 'Fitness', 'Klettern', 'Volleyball'
  ];

  const skillLevels = [
    { value: 'beginner', label: 'Anfänger', description: 'Ich fange gerade erst an' },
    { value: 'intermediate', label: 'Fortgeschritten', description: 'Ich habe schon Erfahrung' },
    { value: 'advanced', label: 'Profi', description: 'Ich bin sehr erfahren' }
  ];

  const districts = [
    'Innenstadt', 'Nordend', 'Westend', 'Sachsenhausen', 
    'Bockenheim', 'Ostend', 'Bornheim', 'Höchst'
  ];

  const availabilityOptions = [
    'Montag Morgen', 'Montag Abend', 'Dienstag Morgen', 'Dienstag Abend',
    'Mittwoch Morgen', 'Mittwoch Abend', 'Donnerstag Morgen', 'Donnerstag Abend',
    'Freitag Morgen', 'Freitag Abend', 'Samstag', 'Sonntag'
  ];

  const goals = [
    'Neue Leute kennenlernen', 'Fitness verbessern', 'Wettkämpfe bestreiten',
    'Spaß haben', 'Stress abbauen', 'Neue Sportarten ausprobieren'
  ];

  const handleSportToggle = (sport: string) => {
    setOnboardingData(prev => ({
      ...prev,
      sports: prev.sports.includes(sport)
        ? prev.sports.filter(s => s !== sport)
        : [...prev.sports, sport]
    }));
  };

  const handleSkillLevelChange = (sport: string, level: string) => {
    setOnboardingData(prev => ({
      ...prev,
      skillLevels: { ...prev.skillLevels, [sport]: level }
    }));
  };

  const handleAvailabilityToggle = (time: string) => {
    setOnboardingData(prev => ({
      ...prev,
      availability: prev.availability.includes(time)
        ? prev.availability.filter(t => t !== time)
        : [...prev.availability, time]
    }));
  };

  const handleGoalToggle = (goal: string) => {
    setOnboardingData(prev => ({
      ...prev,
      goals: prev.goals.includes(goal)
        ? prev.goals.filter(g => g !== goal)
        : [...prev.goals, goal]
    }));
  };

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    } else {
      // Onboarding abschließen
      localStorage.setItem('onboardingCompleted', 'true');
      localStorage.setItem('userPreferences', JSON.stringify(onboardingData));
      navigate('/');
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const canProceed = () => {
    switch (currentStep) {
      case 1: return onboardingData.sports.length > 0;
      case 2: return onboardingData.sports.every(sport => onboardingData.skillLevels[sport]);
      case 3: return onboardingData.location !== '';
      case 4: return onboardingData.availability.length > 0;
      default: return false;
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <Target className="w-16 h-16 text-orange-500 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-white mb-2">
                Welche Sportarten interessieren dich?
              </h2>
              <p className="text-gray-300">
                Wähle mindestens eine Sportart aus, um passende Partner zu finden.
              </p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {sports.map((sport) => (
                <button
                  key={sport}
                  onClick={() => handleSportToggle(sport)}
                  className={`p-4 rounded-lg border-2 transition-all duration-200 ${
                    onboardingData.sports.includes(sport)
                      ? 'border-orange-500 bg-orange-500/20 text-orange-500'
                      : 'border-gray-600 bg-gray-700 text-gray-300 hover:border-orange-500'
                  }`}
                >
                  {sport}
                </button>
              ))}
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <User className="w-16 h-16 text-orange-500 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-white mb-2">
                Wie ist dein Skill-Level?
              </h2>
              <p className="text-gray-300">
                Gib für jede gewählte Sportart dein Level an.
              </p>
            </div>

            <div className="space-y-6">
              {onboardingData.sports.map((sport) => (
                <div key={sport} className="bg-gray-700 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-white mb-4">{sport}</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    {skillLevels.map((level) => (
                      <button
                        key={level.value}
                        onClick={() => handleSkillLevelChange(sport, level.value)}
                        className={`p-4 rounded-lg border-2 text-left transition-all duration-200 ${
                          onboardingData.skillLevels[sport] === level.value
                            ? 'border-orange-500 bg-orange-500/20'
                            : 'border-gray-600 bg-gray-800 hover:border-orange-500'
                        }`}
                      >
                        <div className="font-semibold text-white">{level.label}</div>
                        <div className="text-sm text-gray-300">{level.description}</div>
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <MapPin className="w-16 h-16 text-orange-500 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-white mb-2">
                Wo bist du aktiv?
              </h2>
              <p className="text-gray-300">
                Wähle deinen bevorzugten Bezirk in Frankfurt.
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {districts.map((district) => (
                <button
                  key={district}
                  onClick={() => setOnboardingData(prev => ({ ...prev, location: district }))}
                  className={`p-4 rounded-lg border-2 transition-all duration-200 ${
                    onboardingData.location === district
                      ? 'border-orange-500 bg-orange-500/20 text-orange-500'
                      : 'border-gray-600 bg-gray-700 text-gray-300 hover:border-orange-500'
                  }`}
                >
                  {district}
                </button>
              ))}
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <Clock className="w-16 h-16 text-orange-500 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-white mb-2">
                Wann hast du Zeit?
              </h2>
              <p className="text-gray-300">
                Wähle deine verfügbaren Zeiten aus.
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {availabilityOptions.map((time) => (
                <button
                  key={time}
                  onClick={() => handleAvailabilityToggle(time)}
                  className={`p-3 rounded-lg border-2 transition-all duration-200 text-sm ${
                    onboardingData.availability.includes(time)
                      ? 'border-orange-500 bg-orange-500/20 text-orange-500'
                      : 'border-gray-600 bg-gray-700 text-gray-300 hover:border-orange-500'
                  }`}
                >
                  {time}
                </button>
              ))}
            </div>

            <div className="mt-8">
              <h3 className="text-lg font-semibold text-white mb-4">
                Was sind deine Ziele? (Optional)
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {goals.map((goal) => (
                  <button
                    key={goal}
                    onClick={() => handleGoalToggle(goal)}
                    className={`p-3 rounded-lg border-2 transition-all duration-200 text-sm ${
                      onboardingData.goals.includes(goal)
                        ? 'border-orange-500 bg-orange-500/20 text-orange-500'
                        : 'border-gray-600 bg-gray-700 text-gray-300 hover:border-orange-500'
                    }`}
                  >
                    {goal}
                  </button>
                ))}
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  if (!user) {
    navigate('/');
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-900 pt-24 pb-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-2xl font-bold text-white">Profil einrichten</h1>
            <span className="text-gray-300">Schritt {currentStep} von {totalSteps}</span>
          </div>
          <div className="w-full bg-gray-700 rounded-full h-2">
            <div 
              className="bg-orange-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${(currentStep / totalSteps) * 100}%` }}
            />
          </div>
        </div>

        {/* Content */}
        <div className="bg-gray-800 rounded-2xl border border-gray-700 p-8">
          {renderStep()}

          {/* Navigation */}
          <div className="flex justify-between mt-8">
            <button
              onClick={handleBack}
              disabled={currentStep === 1}
              className={`flex items-center px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
                currentStep === 1
                  ? 'bg-gray-700 text-gray-500 cursor-not-allowed'
                  : 'bg-gray-700 text-white hover:bg-gray-600'
              }`}
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Zurück
            </button>

            <button
              onClick={handleNext}
              disabled={!canProceed()}
              className={`flex items-center px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
                canProceed()
                  ? 'bg-orange-500 text-white hover:bg-orange-600'
                  : 'bg-gray-700 text-gray-500 cursor-not-allowed'
              }`}
            >
              {currentStep === totalSteps ? (
                <>
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Fertig
                </>
              ) : (
                <>
                  Weiter
                  <ArrowRight className="w-4 h-4 ml-2" />
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OnboardingFlow;