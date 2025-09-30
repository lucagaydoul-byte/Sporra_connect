/** @type {import('tailwindcss').Config} */

// Annahmen:
// - Grau-Palette ist auf dunklen Hintergrund optimiert (700–900 für Hintergrund, 50–300 für Flächen/Text).
// - Orange ist die Akzentfarbe (400–500 = primär für Buttons, Hover, etc.).
// - Struktur bleibt identisch: 50–900 Keys, plus ggf. Zwischenstufen.

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        gray: {
          50:  '#f3f3f4',
          100: '#e0e1e3',
          200: '#bdbfc2',
          300: '#9aa0a5',
          400: '#555b61',
          500: '#3a3f45',
          600: '#2e3338',
          700: '#202427',
          800: '#1a1e22',
          900: '#0f1113',
        },
        orange: {
          50:  '#fff2e6',
          100: '#ffe0bf',
          200: '#ffc799',
          300: '#ffad73',
          400: '#ff8844',
          450: '#ff7a33',
          500: '#ff6c22',
          550: '#e65d1f',
          600: '#cc4f1c',
          700: '#b34219',
          800: '#993816',
          900: '#7f2f13',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        '2xs': ['0.625rem', { lineHeight: '0.75rem' }],
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '112': '28rem',
        '128': '32rem',
      },
      maxWidth: {
        '8xl': '88rem',
        '9xl': '96rem',
      },
      animation: {
        'fadeInUp': 'fadeInUp 0.6s ease-out',
        'slideInRight': 'slideInRight 0.6s ease-out',
        'bounce-slow': 'bounce 2s infinite',
      },
      keyframes: {
        fadeInUp: {
          '0%': {
            opacity: '0',
            transform: 'translateY(30px)',
          },
          '100%': {
            opacity: '1',
            transform: 'translateY(0)',
          },
        },
        slideInRight: {
          '0%': {
            opacity: '0',
            transform: 'translateX(30px)',
          },
          '100%': {
            opacity: '1',
            transform: 'translateX(0)',
          },
        }
      },
      backdropBlur: {
        xs: '2px',
      },
      boxShadow: {
        'glow-orange': '0 0 20px rgba(255, 106, 0, 0.3)',
        'glow-orange-lg': '0 0 40px rgba(255, 106, 0, 0.2)',
        'inner-glow': 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.05)',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
};
