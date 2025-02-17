import figmaKitPreset from 'figma-kit/tailwind.preset.js';

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./dist/ui.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {},
  },
  plugins: [],
  presets: [figmaKitPreset],
};
