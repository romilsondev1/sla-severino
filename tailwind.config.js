/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        bgRight: '#02091D',
        card: '#071533',
        cardBorder: '#102A6B',
        accent: '#38BDF8',
        primary: '#3B82F6',
        muted: '#94A3B8',
        online: '#10B981',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        '2xl': '12px',
      },
    },
  },
  plugins: [],
}
