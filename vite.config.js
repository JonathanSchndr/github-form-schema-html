import dts from 'vite-plugin-dts';

export default {
  mode: 'production',
  root: './',
  build: {
    minify: true,
    sourcemap: false,
    emptyOutDir: false,
    lib: {
      formats: ['es'],
      entry: './src/github-form-schema-html.ts',
      name: 'GitHubFormSchemaHtml'
    },
  },
  server: {
    open: '/example/index.html'
  },
  plugins: [dts()]
}
