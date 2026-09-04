/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        paper: '#F7F6F1',
        panel: '#EFEDE5',
        ink: '#14213D',
        'ink-soft': '#4B5568',
        accent: '#F2A93B',
        'accent-deep': '#C9821F',
        line: 'rgba(20, 33, 61, 0.12)',
        card: {
          blue: '#2F5FE0',
          green: '#1FAE7A',
          amber: '#E8A93D',
          lavender: '#C9B8F0',
          pink: '#EFAFAE',
          orange: '#E8703A',
          blueDark: '#3557D6',
          cream: '#F2EDE0',
        },
      },
      fontFamily: {
        serif: ['"IBM Plex Serif"', 'Georgia', 'serif'],
        sans: ['"IBM Plex Sans"', 'system-ui', 'sans-serif'],
        mono: ['"IBM Plex Mono"', 'monospace'],
      },
    },
  },
  plugins: [],
}
