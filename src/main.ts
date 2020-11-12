import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui'
import router from './router'
import store from './store'
import api from './api'
import dict from './dict'
import consts from './consts'
import Mixins from './mixins';
import moment from 'moment'

import './assets/theme/index.css'

import YzpPage from '@/components/common/YzpPage.vue'

Vue.config.productionTip = false

Vue.component('YzpPage', YzpPage)
Vue.use(ElementUI);
Vue.prototype.$api = api
Vue.prototype.$dict = dict
Vue.prototype.$consts = consts
Vue.prototype.$moment = moment

Vue.mixin(Mixins);

Vue.filter('$formatTime', (time: any) => moment(time).format('YYYY-MM-DD:HH:ss'))


router.beforeEach((to, from, next) => {
  if (!to.name || typeof (to.name) === 'object') {
    ElementUI.Message({ message: '抱歉，页面不存在', type: 'warning' })
    router.replace({ path: '/404' })
    return
  }
  if (!to.meta.noAuth && !store.state.token) {
    router.replace({ path: '/login' })
  } else {
    next()
  }
});

new Vue({
  router,
  store,
  render: (h: any) => h(App),
}).$mount('#app')
