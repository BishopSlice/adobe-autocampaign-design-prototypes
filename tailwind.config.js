/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#1A1A1A',
        'on-primary': '#FFFFFF',
        surface: '#FFFFFF',
        'on-surface': '#1A1A1A',
        'surface-muted': '#F5F5F6',
        'on-surface-muted': '#6B6B70',
        'surface-sunken': '#EEEEF0',
        border: '#E2E2E5',
        'border-strong': '#D0D0D5',
        accent: '#5B4FE0',
        'on-accent': '#FFFFFF',
        'accent-hover': '#4A3FC9',
        'accent-muted': '#EEECFC',
        success: '#1E8E5A',
        'success-muted': '#E5F5EE',
        bg: '#FAFAFA',
      },
      keyframes: {
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(14px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        'fade-up': 'fade-up 0.7s cubic-bezier(0.16, 1, 0.3, 1) both',
      },
      borderRadius: {
        sm: '8px',
        md: '12px',
        lg: '16px',
        xl: '20px',
        full: '999px',
      },
      fontFamily: {
        sans: ['Inter', 'Helvetica Neue', 'Arial', 'sans-serif'],
        mono: ['"IBM Plex Mono"', '"SFMono-Regular"', 'Consolas', 'monospace'],
      },
      boxShadow: {
        sm: '0 1px 2px rgba(26,26,26,0.04), 0 1px 4px rgba(26,26,26,0.05)',
        md: '0 10px 30px rgba(26,26,26,0.07)',
        lg: '0 24px 60px rgba(26,26,26,0.12)',
        card: '0 30px 60px -18px rgba(58,54,47,0.22), 0 10px 24px -10px rgba(58,54,47,0.14)',
      },
      maxWidth: {
        page: '1080px',
      },
    },
  },
  plugins: [],
};
