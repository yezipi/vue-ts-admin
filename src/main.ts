import Vue from 'vue'
import App from './App.vue'
import ElementUI, { Form } from 'element-ui'
import router from './router'
import store from './store'
import api from './api'
import dict from './dict'
import consts from './consts'
import Mixins from './mixins';
import moment from 'moment'

import './assets/theme/index.css'



import VueAMap from 'vue-amap';
import YzpPage from '@/components/common/YzpPage.vue'
import YzpDrawer from '@/components/common/YzpDrawer.vue'
import YzpRemoveBtn from '@/components/common/YzpRemoveBtn.vue'
import YzpUpdateBtn from '@/components/common/YzpUpdateBtn.vue'


Vue.config.productionTip = false

Vue.component('yzp-page', YzpPage)
Vue.component('yzp-drawer', YzpDrawer)
Vue.component('yzp-remove-btn', YzpRemoveBtn)
Vue.component('yzp-update-btn', YzpUpdateBtn)

Vue.use(ElementUI);
Vue.prototype.$api = api
Vue.prototype.$dict = dict
Vue.prototype.$consts = consts
Vue.prototype.$moment = moment

Vue.mixin(Mixins);

Vue.use(VueAMap);

// 初始化vue-amap
VueAMap.initAMapApiLoader({
  // 高德的key
  key: 'cf8337b3cff2ee4210fac6ee8f1c7476',
  // 插件集合
  plugin: ['AMap.Autocomplete', 'AMap.PlaceSearch', 'AMap.Scale', 'AMap.OverView', 'AMap.ToolBar', 'AMap.MapType', 'AMap.PolyEditor', 'AMap.CircleEditor'],
  // 高德 sdk 版本，默认为 1.4.4
  v: '1.4.4',
});

Vue.filter('$formatTime', (time: any) => moment(time).format('YYYY-MM-DD:HH:ss'))

const nav: any = router
const allPath: any = []

nav.options.routes.forEach((e: any) => {
  if (e.path) {
    allPath.push(e.path)
  }
  if (e.children) {
    e.children.forEach((i: any) => {
      allPath.push(i.path)
    })
  }
});


router.beforeEach((to, from, next) => {
  if (!to.name || allPath.indexOf(to.path) < 0) {
    ElementUI.Message({ message: '抱歉，页面不存在', type: 'warning' })
    router.replace({ path: '/404' })
    return
  }
  if (!to.meta.noAuth && !store.state.token) {
    router.replace({ path: '/Login', query: { referrer: to.path } })
  } else {
    next()
  }
});

new Vue({
  router,
  store,
  render: (h: any) => h(App),
}).$mount('#app')
