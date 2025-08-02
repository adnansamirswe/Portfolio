/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        'black-primary': '#0a0a0a',
        'black-secondary': '#1a1a1a',
        'black-tertiary': '#2a2a2a',
        'red-primary': '#ff0000',
        'red-secondary': '#cc0000',
        'red-tertiary': '#990000',
        'red-neon': '#ff1744',
        'red-glow': 'rgba(255, 23, 68, 0.5)',
      },
      animation: {
        'neon-pulse': 'neonPulse 2s ease-in-out infinite alternate',
        'float': 'float 6s ease-in-out infinite',
        'gradient-shift': 'gradientShift 3s ease infinite',
        'spin': 'spin 1s linear infinite',
      },
      keyframes: {
        neonPulse: {
          '0%': {
            textShadow: '0 0 5px #ff1744, 0 0 10px #ff1744, 0 0 15px #ff1744, 0 0 20px #ff1744',
          },
          '100%': {
            textShadow: '0 0 10px #ff1744, 0 0 20px #ff1744, 0 0 30px #ff1744, 0 0 40px #ff1744',
          },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '25%': { transform: 'translateY(-10px) rotate(1deg)' },
          '50%': { transform: 'translateY(-20px) rotate(0deg)' },
          '75%': { transform: 'translateY(-10px) rotate(-1deg)' },
        },
        gradientShift: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
      },
      boxShadow: {
        'neon-red': '0 0 20px rgba(255, 23, 68, 0.5)',
        'neon-red-lg': '0 0 40px rgba(255, 23, 68, 0.6)',
        'glass': '0 8px 32px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'red-black-gradient': 'linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 25%, rgba(255, 0, 0, 0.1) 50%, #1a1a1a 75%, #0a0a0a 100%)',
      },
      perspective: {
        '1000': '1000px',
      },
      transformStyle: {
        '3d': 'preserve-3d',
      },
    },
  },
  plugins: [],
};
