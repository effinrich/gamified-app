import { defineConfig } from 'vite'
import tsconfigPaths from 'vite-tsconfig-paths'
import { tanstackStart } from '@tanstack/react-start/plugin/vite'
import viteReact from '@vitejs/plugin-react'

export default defineConfig({
  server: {
    port: 3000,
  },
  build: {
    // The Park UI base preset emits a bare `::placeholder` rule that the
    // Lightning CSS minifier flags as an invalid dangling combinator.
    // PostCSS (esbuild fallback) handles the minify step just fine.
    cssMinify: 'esbuild',
  },
  plugins: [
    tsconfigPaths(),
    tanstackStart(),
    viteReact(),
  ],
})
