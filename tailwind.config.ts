import type { Config } from 'tailwindcss'
import { COLOR_PRIMARY } from './app/lib/config'

/** @type {import('tailwindcss').Config} */
export default {
  corePlugins: {
    preflight: false
  },
  content: ['./app/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'selector',
  theme: {
    extend: {
      colors: {
        primary: COLOR_PRIMARY, // 品牌主题颜色
        secondary: '#40A2D8', // 辅助色
        danger: 'rgb(245,34,45)' // 错误颜色
      },
      backgroundColor: {
        white: 'rgb(var(--bg-white))'
      },
      textColor: {
        color: 'rgb(var(--text-color))'
      },
      fontWeight: {
        400: '400',
        500: '500',
        600: '600',
        700: '700',
        800: '800'
      }
    },
  },
  plugins: [],
} satisfies Config

