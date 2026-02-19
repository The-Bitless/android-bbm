import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        surface: {
          800: '#1a1d24',
          900: '#12151a',
          950: '#0c0e12',
        },
        accent: {
          cyan: '#22d3ee',
          emerald: '#34d399',
          amber: '#fbbf24',
        },
        border: {
          muted: '#2d323b',
          subtle: '#252a33',
        },
      },
      fontFamily: {
        mono: ['var(--font-jetbrains)', 'ui-monospace', 'monospace'],
        sans: ['var(--font-geist)', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        card: '0 1px 3px 0 rgb(0 0 0 / 0.25), 0 1px 2px -1px rgb(0 0 0 / 0.2)',
        'card-lg': '0 4px 6px -1px rgb(0 0 0 / 0.3), 0 2px 4px -2px rgb(0 0 0 / 0.2)',
        'card-glow': '0 0 0 1px rgb(34 211 238 / 0.08), 0 4px 6px -1px rgb(0 0 0 / 0.3)',
      },
    },
  },
  plugins: [],
}
export default config
