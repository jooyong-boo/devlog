import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  darkMode: 'class',
  theme: {
    extend: {
      keyframes: {
        bounceLeft: {
          '0%': {
            transform: 'translateX(0)',
          },
          '50%': {
            transform: 'translateX(-8px)',
          },
          '100%': {
            transform: 'translateX(0)',
          },
        },
        bounceRight: {
          '0%': {
            transform: 'translateX(0)',
          },
          '50%': {
            transform: 'translateX(8px)',
          },
          '100%': {
            transform: 'translateX(0)',
          },
        },
      },
      animation: {
        'bounce-left': 'bounceLeft 0.35s ease-in-out',
        'bounce-right': 'bounceRight 0.35s ease-in-out',
      },
    },
  },
  safelist: [
    {
      pattern: /^(bg|text|fill)-(.*)$/,
    },
  ],
};
export default config;
