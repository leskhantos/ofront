export default function ({$axios,store}) {
  $axios.onError(error => {
    if (error.response.status===422){
      store.dispatch('app/setErrors',error.response.data)
    }else if (error.response.status===401){
      store.dispatch('app/setErrors',error.response.data)
    }
    return Promise.reject(error)
  })
  $axios.onRequest(()=>{
    store.dispatch('app/clearErrors');
  })
}
