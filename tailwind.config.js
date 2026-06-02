/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        // Semantic aliases
        background: '#F2F1ED',
        surface: '#FAFAF7',
        border: '#E5E4E0',
        'text-primary': '#1C1B1F',
        'text-secondary': '#6B7368',
        'accent-primary': '#FF9232',
        'accent-secondary': '#A4AB7D',
        // Form-validation only — deep warm red. Clearly red (hue ≈ 5°, well
        // outside the orange ramp so it reads as "error" not "darker orange")
        // but darker and more restrained than a vivid alert red — sits
        // comfortably alongside the warm industrial-minimalist palette.
        // Contrast on bg-surface ≈ 6.8:1 — passes WCAG AA small text.
        // Form errors are functional, not shaming; do NOT use for
        // calorie/macro warnings.
        error: '#AD3F35',

        // Orange ramp
        orange: {
          50: '#FFF7EC',
          100: '#FFEDD3',
          200: '#FFD7A5',
          300: '#FFBA6D',
          400: '#FF9232',
          500: '#FF730A',
          600: '#FF5C00',
          700: '#CC4102',
          800: '#A1330B',
          900: '#822C0C',
          950: '#461404',
        },

        // Neutral ramp
        neutral: {
          50: '#FAFAFA',
          100: '#F4F4F5',
          200: '#E5E4E7',
          300: '#D5D4D8',
          400: '#A3A0AB',
          500: '#73707B',
          600: '#54515C',
          700: '#403E47',
          800: '#28272A',
          900: '#1C1B1F',
          950: '#0A090B',
        },

        // Sage ramp
        sage: {
          50: '#F5F6F0',
          100: '#E6E9DB',
          200: '#D0D4BB',
          300: '#B4BA93',
          400: '#A4AB7D',
          500: '#878E5C',
          600: '#70754A',
          700: '#5B5D3C',
          800: '#4D4E35',
          900: '#444431',
          950: '#252519',
        },
      },
      fontFamily: {
        default: ['"IBM Plex Sans"', 'system-ui', 'sans-serif'],
        numbers: ['"IBM Plex Mono"', 'ui-monospace', 'monospace'],
      },
      fontSize: {
        display: ['40px', { lineHeight: '1.1', fontWeight: '500' }],
        h1: ['28px', { lineHeight: '1.2', fontWeight: '500' }],
        h2: ['22px', { lineHeight: '1.25', fontWeight: '500' }],
        h3: ['18px', { lineHeight: '1.35', fontWeight: '500' }],
        'body-l': ['16px', { lineHeight: '1.5', fontWeight: '400' }],
        body: ['14px', { lineHeight: '1.5', fontWeight: '400' }],
        caption: ['12px', { lineHeight: '1.4', fontWeight: '400' }],
        'num-l': ['32px', { lineHeight: '1.1', fontWeight: '500' }],
        num: ['14px', { lineHeight: '1.4', fontWeight: '400' }],
      },
      borderRadius: {
        sm: '4px',
        md: '6px',
        lg: '12px',
      },
      // Continuous laser scan sweep (Analyzing screen). The animated element is
      // full-frame-height, so the % translate carries the line across the whole
      // viewfinder: starts just above the top, ends just past the bottom, loops.
      keyframes: {
        scanline: {
          '0%': { transform: 'translateY(-10%)' },
          '100%': { transform: 'translateY(110%)' },
        },
      },
      animation: {
        // ~1.4s linear, endless — a crisp, high-tech laser feel.
        scanline: 'scanline 1.4s linear infinite',
      },
    },
  },
  plugins: [],
}
