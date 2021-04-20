export default {
  // Global page headers (https://go.nuxtjs.dev/config-head)
  head: {
    htmlAttrs: {
      lang: 'uk'
    },
    title: '',
    meta: [
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Open Public Finance' },
      { name: 'google', content: 'notranslate' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      // { rel: 'preload', lang: 'css', href: 'https://fonts.googleapis.com/css?family=PT+Sans:400,700' },
      // {
      //   rel: 'preload',
      //   href: 'https://cdn.jsdelivr.net/npm/@mdi/font@latest/css/materialdesignicons.min.css',
      //   as: 'style',
      //   onload: 'this.onload=null;this.rel="stylesheet"'
      // }
    ],
    script: [
      {
        src: 'https://polyfill.io/v3/polyfill.min.js?features=IntersectionObserver', defer: true
      }
    ],
  },

  loading: {
    color: '#0f4c86',
    height: '2px'
  },

  loadingIndicator: {
    name: 'circle',
    color: '#0f4c86',
    background: 'white'
  },

  // Global CSS (https://go.nuxtjs.dev/config-css)
  css: [
  ],

  // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
  plugins: [
    { ssr: false, src: '~plugins/vee-validate.js' },
    { ssr: false, src: '~plugins/i18n.js' },
    { ssr: false, src: '~plugins/vue-pdf.js' },
    { ssr: false, src: '~plugins/vue-youtube.js' },
    { src: '~plugins/filters.js' }
  ],

  // Auto import components (https://go.nuxtjs.dev/config-components)
  components: true,

  // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
  buildModules: [
    '@nuxtjs/vuetify',
    '@nuxtjs/pwa'
  ],

  // Modules (https://go.nuxtjs.dev/config-modules)
  modules: [
    [
      'nuxt-i18n',
      {
        seo: true,
        lazy:true,
        locales: [
          {
            name: 'UK',
            code: 'uk',
            iso: 'uk',
            file: 'uk-UA.js'
          },
          {
            name: 'EN',
            code: 'en',
            iso: 'en-US',
            file: 'en-UA.js'
          },
        ],
        langDir: 'lang/',
        defaultLocale: 'uk'
      }
    ],
    '@nuxtjs/markdownit',
    '@nuxtjs/axios'
  ],

  i18n: {
    vueI18n: {
      fallbackLocale: ['en', 'uk'],
      silentTranslationWarn: process.env.NODE_ENV === 'production'
      // https://kazupon.github.io/vue-i18n/guide/fallback.html#explicit-fallback-with-one-locale
    }
  },

  // https://markdown-it.github.io/
  markdownit: {
    runtime: true // Support `$md()`
  },

  // Build Configuration (https://go.nuxtjs.dev/config-build)
  build: {
    // extend(config, { isClient }) {
    //   if (isClient) {
    //     config.optimization.splitChunks.minSize = 20000
    //   }
    // },
    optimizeCSS: true,
    // analyze: true,
    html: {
      // https://github.com/kangax/html-minifier
      minify: {
        removeStyleLinkTypeAttributes: true,
        collapseBooleanAttributes: true,
        decodeEntities: true,
        minifyCSS: true,
        minifyJS: true,
        processConditionalComments: true,
        removeEmptyAttributes: true,
        removeRedundantAttributes: true,
        trimCustomFragments: true,
        useShortDoctype: true,
        removeScriptTypeAttributes: true
      },
    },
    transpile: ["vee-validate/dist/rules"],
    cssSourceMap: false,
    terser: {
      extractComments: false // default was LICENSES
    }
  },

  render: {
    // bundleRenderer: {
    //   shouldPreload: (file, type) => {
    //     return ['link', 'style', 'font'].includes(type)
    //   },
    // },
    // http2: {
    //   pushAssets: (req, res, publicPath, preloadFiles) =>
    //     publicPath
    //       .filter(f => f.asType === 'link')
    //       .map(f => `<${publicPath}${f.file}>; rel=preload; as=${f.asType}`)
    // }
  },

  // https://www.npmjs.com/package/@nuxtjs/vuetify
  vuetify: {
    optionsPath: './plugins/vuetify.js',
    treeShake: true,
    defaultAssets: {
      icons: false
    }
  },

  pwa: {
    icon: {
      fileName: 'icon.png'
    },
    manifest: {
      name: '',
      short_name: '',
      lang: 'en',
      display: 'browser',
    },
  }
}
