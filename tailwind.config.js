/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#fdf2f8',
          100: '#fce7f3',
          200: '#fbcfe8',
          300: '#f9a8d4',
          400: '#f472b6',
          500: '#ec4899',
          600: '#db2777',
          700: '#be185d',
          800: '#9d174d',
          900: '#831843',
        },
        accent: {
          50: '#fff1f2',
          100: '#ffe4e6',
          200: '#fecdd3',
          300: '#fda4af',
          400: '#fb7185',
          500: '#f43f5e',
          600: '#e11d48',
          700: '#be123c',
          800: '#9f1239',
          900: '#881337',
        },
        neutral: {
          50: '#fafafa',
          100: '#f5f5f5',
          200: '#e5e5e5',
          300: '#d4d4d4',
          400: '#a3a3a3',
          500: '#737373',
          600: '#525252',
          700: '#404040',
          800: '#262626',
          900: '#171717',
        },
        black: '#0A0A0A',
        darkSlate: '#1a1a1a',
        white: '#FFFFFF',
        pink: '#ec4899',
        gray: '#666666',
        lightGray: '#F5F5F5',
        charcoal: '#111827',
      },
      fontFamily: {
        sans: ['-apple-system', 'SF Pro Display', 'Inter', 'system-ui', 'sans-serif'],
      },
      fontWeight: {
        light: '300',
        normal: '400',
      },
      fontSize: {
        'hero': '100px',
        'section-title': '64px',
        'large-title': '72px',
        'quote': '48px',
        'stats': '72px',
        'overline': '11px',
        'body': '17px',
        'subhead': '22px',
      },
      letterSpacing: {
        'overline': '3px',
      },
      lineHeight: {
        'relaxed': '1.7',
      },
      maxWidth: {
        'content': '1400px',
        'reading': '700px',
        'hero': '40vw',
      },
      padding: {
        'section': '200px',
        'section-lg': '240px',
      },
      spacing: {
        '18': '4.5rem',
        '60': '15rem',
        '80': '20rem',
      },
    },
  },
  plugins: [],
}