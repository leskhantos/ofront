export default function ({$axios,store}) {
  $axios.onError(error => {
    if (error.response.status===422){
      store.dispatch('app/setErrors',error.response.data)
    }else if (error.response.status===401){
      store.dispatch('app/setErrors',error.response.data)
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
