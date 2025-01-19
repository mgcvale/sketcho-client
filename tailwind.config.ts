import type { Config } from 'tailwindcss';

export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],

  theme: {
    extend: {},
    colors: {
      'sk-base': {
        900: '1C1B2A',
        800: '232238',
        700: '2D2B4A',
        600: '35335A',
        500: '3F3B70',
        400: '4C4888',
        300: '59559C',
        200: '7B75C3',
        100: '9994E7',
        50: 'B7B1FF',
      },
      'sk-accent': {
        100: 'BA68C8',
        200: '9C27B0',
        300: '9023BB',
        400: '6A1B9A',
      },
    },
  },

  plugins: []
} satisfies Config;
