require('dotenv').config()

export default {
  server:{
    port: process.env.APP_PORT,
    host: process.env.APP_ENV==='prod'? '0.0.0.0': 'localhost'
  },
  mode: 'universal',
  /*
  ** Headers of the page
  */
  head: {
    title: process.env.APP_NAME || 'OySpot',
    meta: [
      {charset: 'utf-8'},
      {name: 'viewport', content: 'width=device-width, initial-scale=1'},
      {hid: 'description', name: 'description', content: process.env.npm_package_description || ''}
    ],
    link: [
      {rel: 'icon', type: 'image/png', sizes: '16x16', href: '/favicon-16x16.png',},
      {rel: 'icon', type: 'image/png', sizes: '32x32', href: '/favicon-32x32.png',},
      {rel: 'icon', type: 'image/png', sizes: '96x96', href: '/favicon-96x96.png',},
    ]
  },
  /*
  ** Customize the progress-bar color
  */
  loading: {
    color: '#fff',
    height: '3px'
  },
  /*
  ** Global CSS
  */
  css: [
    './assets/scss/main.scss',
    'simple-line-icons/css/simple-line-icons.css'
  ],
  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    './plugins/mixins/validation',
    './plugins/axios',
    {src: './plugins/vue-flash-message', mode: 'client'},
    {src: './plugins/oyUI/oyUI', ssr: false},
    {src: './plugins/apexchart', ssr: false},
    { src: './plugins/vue-tables-2.js', ssr: false }
  ],
  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [
    ['@nuxtjs/dotenv', {filename: '.env'}]
  ],
  /*
  ** Nuxt.js modules
  */
  router: {
    middleware: [
      'clearValidationErrors'
    ]
  },
  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/dotenv',

  ],
  /*
  ** Build configuration
  */
  axios: {
    baseURL: process.env.API_HOST
  },
  build: {
    vendor:['vue-apexcharts', 'vue-tables-2'],
    /*
    ** You can extend webpack config here
    */
    extend(config, ctx) {
    }
  }
}
