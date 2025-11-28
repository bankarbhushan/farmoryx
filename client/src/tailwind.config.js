/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        inter: [
          'Inter',
          'system-ui',
          '-apple-system',
          'Segoe UI',
          'Roboto',
          'Helvetica Neue',
          'Arial',
          'sans-serif',
        ],
      },
      colors: {
        primary: '#16C79A',
        primaryBright: '#00C48C',
        primaryAccent: '#0FBF8A',

        deep: '#0F172A',
        slateDark: '#12202E',
        textPrimary: '#0B1220',

        accentBright: '#11D18C',
        accent: '#22C6A0',
        sunlight: '#F4C430',
        destructive: '#FF6B6B',

        bgPage: '#F8FAF8',
        bgSoft: '#F3F4EE',
        bgCard: '#FFFFFF',
        bgTint: '#E9EFE6',
        bgMuted: '#F1F5F4',

        textMuted: '#4B5563',
        textMutedLight: '#94A3B8',

        borderSoft: '#E6E9EA',

        danger: '#E53E3E',
      },
    },
  },
  plugins: [require('daisyui')],
}
