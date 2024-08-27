import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  darkMode: 'class',
  theme: {
    extend: {},
  },
  safelist: [
    {
      pattern: /^(bg|text|fill)-(.*)$/,
    },
  ],
};
export default config;
