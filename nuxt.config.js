require('dotenv').config();

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
  ],
  /*
  ** Plugins to load before mounting the App
  */
  styleResources: {
    scss: [
      '@/assets/icofont/icofont.scss',
      '@/assets/scss/*.scss'
    ]
  },
  plugins: [
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
     '@nuxtjs/axios',
     '@nuxtjs/dotenv',
     '@nuxtjs/auth'

  ],
  /*
  ** Build configuration
  */
  axios:{
    baseURL: 'http://127.0.0.1:8000/auth',
  },

  auth: {
    strategies: {
      local: {
        endpoints: {
          login: {url: 'login', method: 'post', propertyName: 'access_token'},
          user: {url: 'user', method: 'get', propertyName: false},
          logout: {
            url: 'logout', method: 'get'
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
