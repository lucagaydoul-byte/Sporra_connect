import React from 'react';
import { Check, X } from 'lucide-react';

interface PasswordStrengthIndicatorProps {
  password: string;
}

interface PasswordRequirement {
  label: string;
  test: (password: string) => boolean;
}

const PasswordStrengthIndicator: React.FC<PasswordStrengthIndicatorProps> = ({ password }) => {
  const requirements: PasswordRequirement[] = [
    {
      label: 'Mindestens 8 Zeichen',
      test: (pwd) => pwd.length >= 8
    },
    {
      label: 'Ein Großbuchstabe',
      test: (pwd) => /[A-Z]/.test(pwd)
    },
    {
      label: 'Ein Kleinbuchstabe',
      test: (pwd) => /[a-z]/.test(pwd)
    },
    {
      label: 'Eine Zahl',
      test: (pwd) => /\d/.test(pwd)
    },
    {
      label: 'Ein Sonderzeichen',
      test: (pwd) => /[!@#$%^&*(),.?":{}|<>]/.test(pwd)
    }
  ];

  const getStrengthScore = () => {
    return requirements.filter(req => req.test(password)).length;
  };

  const getStrengthColor = () => {
    const score = getStrengthScore();
    if (score < 2) return 'text-red-500';
    if (score < 4) return 'text-yellow-500';
    return 'text-green-500';
  };

  const getStrengthText = () => {
    const score = getStrengthScore();
    if (score < 2) return 'Schwach';
    if (score < 4) return 'Mittel';
    return 'Stark';
  };

  return (
    <div className="mt-2">
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm text-gray-300">Passwort-Stärke:</span>
        <span className={`text-sm font-medium ${getStrengthColor()}`}>
          {getStrengthText()}
        </span>
      </div>
      
      <div className="w-full bg-gray-700 rounded-full h-2 mb-3">
        <div 
          className={`h-2 rounded-full transition-all duration-300 ${
            getStrengthScore() < 2 ? 'bg-red-500' :
            getStrengthScore() < 4 ? 'bg-yellow-500' : 'bg-green-500'
          }`}
          style={{ width: `${(getStrengthScore() / 5) * 100}%` }}
        />
      </div>

      <div className="space-y-1">
        {requirements.map((requirement, index) => {
          const isValid = requirement.test(password);
          return (
            <div key={index} className="flex items-center text-xs">
              {isValid ? (
                <Check className="w-3 h-3 text-green-500 mr-2" />
              ) : (
                <X className="w-3 h-3 text-red-500 mr-2" />
              )}
              <span className={isValid ? 'text-green-400' : 'text-gray-400'}>
                {requirement.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PasswordStrengthIndicator;