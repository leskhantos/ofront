import https from 'https'
const Cookie = process.client ? require('js-cookie') : undefined

export default function ({$axios, store, app, redirect}) {
  const agent = new https.Agent({
    rejectUnauthorized: false
  })

  $axios.onError(error => {
    console.log(error);
    if (error.response.status === 405 || error.response.status === 500) {
      store.dispatch('app/setErrors', 'Во время выполнения запроса произошла ошибка')
    }

    if (error.response.status === 422) {
      store.dispatch('app/setErrors', error.response.data)
    }
    if (error.response.status === 401) {
      store.commit('setAuth', null)
      Cookie.remove('auth')
      app.router.push({name: 'index'});
    }

    if (error.response.status === 404) {
      console.log(error.response.data)
      app.router.push({name: 'dashboard-not-found'});

      store.dispatch('app/setErrors', error.response.data)
    }
    return Promise.reject(error)
  })
  $axios.onRequest(config => {
    config.httpsAgent = agent
    if (store.state.auth !== null) {
      config.headers.common['Authorization'] = `Bearer ${store.state.auth.accessToken}`
    }
    store.dispatch('app/clearErrors');
  })
}
