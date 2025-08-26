import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
  },
  css: {
    devSourcemap: true, // ← 開発時にCSSソースマップを出力
  },
});
