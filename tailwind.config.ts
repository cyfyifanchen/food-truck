import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    colors: {
      bg: '#F6F6F2',
      textColor: '#388087',
      subTextColor: '#6fb3b8',
      blueish: '#badfe7',
      greenish: '#c2edce',
      cardColor: '#FEFFF8',
    },
  },
  plugins: [],
}
export default config
