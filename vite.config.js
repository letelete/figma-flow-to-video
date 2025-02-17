import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { fileURLToPath } from 'url';
import tailwindcss from 'tailwindcss';
import autoprefixer from 'autoprefixer';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig(({ mode }) => {
  return {
    plugins: [react()],
    minify: mode === 'testing' ? true : false,
    resolve: {
      alias: {
        '~': path.resolve(__dirname, 'src'),
      },
    },
    css: {
      postcss: {
        plugins: [tailwindcss, autoprefixer],
      },
    },
  };
});
