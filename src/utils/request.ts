import axios from 'axios'
import router from '../router'
import store from '../store'
import { Message } from 'element-ui'

axios.defaults.timeout = 30000
axios.defaults.baseURL = '/api/admin/'
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8'
axios.defaults.headers.type = 'admin'
axios.interceptors.request.use((config: any) => {
  config.headers.common.token = store.state.token;
  if (config.method) {
    const paramsLoading = config.params && config.params.loading
    const dataLoading = config.params && config.params.loading
    const formDataLoading = config.data && config.data.get && config.data.get('loading')
    if (paramsLoading || dataLoading || formDataLoading) {
      store.commit('showLoading')
    }
  }
  return config;
}, (error) => {
  store.commit('hideLoading')
  return Promise.reject(error)
})

// 添加响应拦截器
axios.interceptors.response.use(({ data, config: { params, data : res }}) => {
  const paramsLoading = params && params.loading
  const reLoading = (res && res.loading) || (res && res.get && res.get('loading'))
  if (paramsLoading || reLoading) {
    store.commit('hideLoading')
  }
  if (data.code === 401) {
    store.dispatch('resetUser')
    router.replace({ path: '/Login' })
    return Promise.reject(data)
  }
  if (data.code !== 200 && data.code !== 401) {
    Message({ message: data.errMsg, type: 'error' })
    return Promise.reject(data)
  }
  return data
}, (error) => {
  const str = error.toString()
  const errMsg = str.indexOf('timeout') > 0 ? '请求超时，请刷新后重试！' : '服务器内容部错误！'
  Message({ message: errMsg, type: 'error' })
  store.commit('hideLoading')
  return Promise.reject(error)
})

/**
 * @name request请求
 * @author 2020-4-30 zzc
 */
export default class {

  get = (url: string, query?: object) => axios.get(url, { params: query })

  post = (url: string, data: any, config?: any) => axios.post(url, data, config)

  put = (url: string, data?: object) => axios.put(url, data)

  delete = (url: string, data?: object) => axios.delete(url, { params: data })

  // get(url: string, query?: object) {
  //   return axios.get(url, { params: query })
  // }

  // post(url: string, data: any, config?: any) {
  //   return axios.post(url, data, config)
  // }

  // put(url: string, data?: object) {
  //   return axios.put(url, data)
  // }

  // delete(url: string, data?: object) {
  //   return axios.delete(url, { params: data })
  // }

}
