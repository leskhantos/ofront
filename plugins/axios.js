export default function ({$axios,store, app}) {
  $axios.onError(error => {
    if (error.response.status === 405 || error.response.status === 500) {
      store.dispatch('app/setErrors','Во время выполнения запроса произошла ошибка')
    }

    if (error.response.status===422){
      store.dispatch('app/setErrors',error.response.data)
    }else if (error.response.status===401){
      if (
        error.config.url === 'auth/user' &&
        error.response.statusText === 'Unauthorized'
      ) {
        store.commit('setAuth', null);
        app.router.push({ name: 'index' });
      }
      store.dispatch('app/setErrors',error.response.data)
    }else if (error.response.status === 404) {
      console.log(error.response.data)
      app.router.push({ name: 'not-found' });

      store.dispatch('app/setErrors', error.response.data)
    }
    return Promise.reject(error)
  })
  $axios.onRequest(config => {
    if (store.state.auth!==null){
      config.headers.common['Authorization'] = `Bearer ${store.state.auth.accessToken}`
    }
    store.dispatch('app/clearErrors');
  })
}
