import dts from 'vite-plugin-dts';

export default {
  mode: 'development',
  root: './',
  build: {
    // minify: false,
    sourcemap: true,
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
