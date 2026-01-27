import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, '.', '');
  return {
    base: '/',
    server: {
      port: 3000,
      host: '0.0.0.0',
    },
    plugins: [
      react(),
      {
        name: 'inline-css',
        apply: 'build',
        enforce: 'post',
        transformIndexHtml: {
          enforce: 'post',
          transform(html, ctx) {
            if (!ctx.bundle) return html;

            // Find the CSS bundle
            const cssBundle = Object.values(ctx.bundle).find(
              (chunk) => chunk.fileName.endsWith('.css')
            );

            if (!cssBundle || typeof cssBundle === 'string') return html;

            const cssCode = cssBundle.source;
            const cssFileName = cssBundle.fileName;

            // Create a simpler regex that handles the path flexibly
            // It matches <link rel="stylesheet" ... href=".../fileName">
            return html.replace(
              new RegExp(`<link[^>]+href="[^"]*${cssFileName}"[^>]*>`, 'i'),
              `<style>${cssCode}</style>`
            );
          }
        },
        generateBundle(_, bundle) {
          // Optional: Remove the separate CSS file if we successfully inlined it
          // But keeping it doesn't hurt, just cleaner dist
          // We can find and delete it from the bundle to prevent it being written
          const cssKey = Object.keys(bundle).find(key => key.endsWith('.css'));
          if (cssKey) {
            delete bundle[cssKey];
          }
        }
      }
    ],
    build: {
      rollupOptions: {
        output: {
          manualChunks(id) {
            // Split all node_modules into a vendor chunk
            if (id.includes('node_modules')) {
              return 'vendor';
            }
          },
        },
      },
    },
    define: {
      'process.env.API_KEY': JSON.stringify(env.GEMINI_API_KEY),
      'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY)
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      }
    }
  };
});
