[![nuxt-directus](https://nuxt-directus.netlify.app/cover.png)](https://nuxt-directus.netlify.app/)

# GitHub Form Schema HTML

[![npm version][npm-version-src]][npm-version-href]
[![npm downloads][npm-downloads-src]][npm-downloads-href]
[![Github Actions CI][github-actions-ci-src]][github-actions-ci-href]
[![Codecov][codecov-src]][codecov-href]
[![License][license-src]][license-href]

> Directus Module for [Nuxt 3](https://v3.nuxtjs.org)

- [✨ &nbsp;Release Notes](https://github.com/JonathanSchndr/github-form-schema-html/releases)

## Features

- [Primer CSS](https://primer.style/) support
- TypeScript Support


## Setup

```sh
yarn add github-form-schema-html # yarn
npm i github-form-schema-html # npm
```

## Basic usage

[Live Example](https://github.com/JonathanSchndr/github-form-schema-html/tree/main/example)

```html
<form>
  <div id="load"></div>
  <button class="btn" type="submit">Submit</button>
</form>
```

```javascript
// basic
document.getElementById('load').innerHTML = new GitHubFormSchemaHtml({ yml: { data: rawYml } }).render();

// with fetch (optional, if yml content need loaded before)
import { GitHubFormSchemaHtml } from 'github-form-schema-html';
fetch('./form.yml').then(res => res.text()).then(rawYml => {
  document.getElementById('load').innerHTML = new GitHubFormSchemaHtml({ yml: { data: rawYml } }).render();
})
```

## Development

1. Clone this repository
2. Install dependencies using `yarn install` or `npm install`
3. Change vite.confg.js to `mode:'development'` / `minify:false` / `sourcemap:true`
4. Start development server using `yarn dev && yarn build:watch` or `npm run dev && npm run build:watch`

## License

Copyright (c) 2022 Jonathan Schneider
[MIT License](./LICENSE)

<!-- Badges -->

[npm-version-src]: https://img.shields.io/npm/v/github-form-schema-html/latest.svg
[npm-version-href]: https://npmjs.com/package/github-form-schema-html
[npm-downloads-src]: https://img.shields.io/npm/dt/github-form-schema-html.svg
[npm-downloads-href]: https://npmjs.com/package/github-form-schema-html
[github-actions-ci-src]: https://github.com/JonathanSchndr/github-form-schema-html/actions/workflows/ci.yml/badge.svg
[github-actions-ci-href]: https://github.com/JonathanSchndr/github-form-schema-html/actions?query=workflow%3Aci
[codecov-src]: https://img.shields.io/codecov/c/github/JonathanSchndr/github-form-schema-html.svg
[codecov-href]: https://codecov.io/gh/JonathanSchndr/github-form-schema-html
[license-src]: https://img.shields.io/npm/l/github-form-schema-html.svg
[license-href]: https://npmjs.com/package/github-form-schema-html
