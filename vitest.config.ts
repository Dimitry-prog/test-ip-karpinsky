import { defineConfig } from 'vitest/config';
import { mergeConfig } from 'vite';
import viteConfig from './vite.config';
import path from 'path';

export default mergeConfig(
  viteConfig,
  defineConfig({
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
        '@shared': path.resolve(__dirname, './src/shared/'),
      },
    },
    test: {
      environment: 'jsdom',
      include: ['src/**/__tests__/*'],
      setupFiles: ['./vitest.setup.ts'],
      globals: true,
    },
  })
);
