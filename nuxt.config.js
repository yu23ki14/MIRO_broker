
export default {
  mode: 'universal',
  /*
  ** Headers of the page
  */
  head: {
    title: 'MIRO Broker | csv2mirosticker',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'MIRO broker はオンラインホワイトボードサービスMiroにCSVから付箋内容を流し込めるツールです。' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  serverMiddleware: ['~~/api/'],
  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },
  /*
  ** Global CSS
  */
  css: [
  ],
  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [
  ],
  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://github.com/nuxt-community/modules/tree/master/packages/bulma
    '@nuxtjs/bulma',
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    '@nuxtjs/proxy'
  ],
  /*
  ** Axios module configuration
  ** See https://axios.nuxtjs.org/options
  */
  axios: {
    prefix: '/api'
  },
  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
  ],
  /*
  ** Build configuration
  */
  build: {
    postcss: {
      preset: {
        features: {
          customProperties: false
        }
      }
    },
    /*
    ** You can extend webpack config here
    */
    extend (config, ctx) {
    }
  }
}
