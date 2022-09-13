import dts from 'vite-plugin-dts';

export default {
  mode: 'production',
  root: './',
  build: {
    minify: true,
    sourcemap: false,
    emptyOutDir: false,
    lib: {
      formats: ['es', 'cjs', 'umd'],
      entry: './src/github-form-schema-html.ts',
      name: 'githubformschemahtml'
    },
  },
  server: {
    open: '/example/index.html'
  },
  plugins: [dts()]
}
