import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    sourcemap: true,
    rollupOptions: {
      // Убираем externals для SVG
      // Можно настроить, если хотите, чтобы Vite игнорировал SVG файлы
    },
  },
  assetsInclude: ['**/*.svg'], // Добавляем SVG в список обрабатываемых активов
});
