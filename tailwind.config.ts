import type { Config } from 'tailwindcss';

/** @type {import('tailwindcss').Config} */
export default {
  corePlugins: {
    preflight: false
  },
  content: ['./app/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class', // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        primary: '#0B60B0', // 品牌主题颜色
        secondary: '#40A2D8', // 辅助色
        danger: 'rgb(245,34,45)' // 错误颜色
      },
      textColor: {
        color: 'rgba(0,0,0,.85)' // 默认文字颜色 text-color, text-color/60, text-color/30
      },
      fontWeight: {
        400: '400',
        500: '500',
        600: '600',
        700: '700',
        800: '800'
      }
    }
  },
  plugins: []
} satisfies Config;
