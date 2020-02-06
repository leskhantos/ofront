require('dotenv').config()

export default {
  mode: 'universal',
  /*
  ** Headers of the page
  */
  head: {
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },
  /*
  ** Global CSS
  */
  css: [
    './assets/icofont/icofont.css',
    './assets/scss/main.scss'
  ],
  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    './plugins/mixins/validation',
    './plugins/axios',
    { src: './plugins/vue-flash-message', mode: 'client'},

  ],
  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [
    ['@nuxtjs/dotenv', { filename: '.env' }]
  ],
  /*
  ** Nuxt.js modules
  */
  router: {
    middleware:[
      'clearValidationErrors'
    ]
  },
  modules: [
     '@nuxtjs/axios',
     '@nuxtjs/dotenv',
     '@nuxtjs/auth'

  ],
  /*
  ** Build configuration
  */
  axios:{
    baseURL: process.env.API_HOST
  },

  auth: {
    strategies: {
      local: {
        endpoints: {
          login: {url: 'auth/login', method: 'post', propertyName: 'access_token'},
          user: {url: 'auth/user', method: 'get', propertyName: false},
          logout: {
            url: 'auth/logout', method: 'get'
          }
        }
      }
    }
  },
  build: {
    /*
    ** You can extend webpack config here
    */
    extend (config, ctx) {
    }
  }
}
