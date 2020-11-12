import { db } from '../utils/index'
import { Loading } from 'element-ui'

const mutations: any = {
  setToken(state: any, token: any) {
    state.token = token;
    db.set('token', token);
  },
  setUser(state: any, data: any) {
    state.user = data;
    db.set('user', data);
  },
  showLoading(state: any) {
    const loading = Loading.service({
      text: '加载中...',
      lock: true,
      spinner: 'el-icon-loading',
    })
    state.loading = loading
    state.isLoading = true
  },
  hideLoading(state: any) {
    if (state.isLoading) {
      state.loading.close()
      state.isLoading = false
    }
  },
}

export default mutations
