/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './*.html',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#135bec',
        background: '#FFFFFF',
        charcoal: '#121212',
        'card-light': '#F9F9F9',
        'border-light': '#E5E5E5',
        'text-muted': '#64748b',
        'surface-grey': '#F9F9F9',
        'text-charcoal': '#121212',
        'background-light': '#FFFFFF',
        'background-dark': '#FFFFFF',
        'neutral-100': '#FFFFFF',
        'neutral-200': '#E5E5E5',
        'neutral-800': '#121212',
        'neutral-900': '#121212',
      },
      fontFamily: {
        display: ['Inter', 'sans-serif'],
      },
      borderRadius: {
        sm: '2px',
        DEFAULT: '2px',
        md: '2px',
        lg: '2px',
        xl: '2px',
        '2xl': '2px',
        '3xl': '2px',
        full: '9999px',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/container-queries'),
  ],
};
