// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import axios from 'axios'
import {Swipe, SwipeItem, Loadmore} from 'mint-ui'
import '../static/js/rem.js'
import '../static/mui/css/style.css'
import '../static/iconfont/js/iconfont.js'
import '../static/iconfont/css/iconfont.css'

Vue.prototype.$http = axios
Vue.config.productionTip = false
Vue.component(Swipe.name, Swipe)
Vue.component(SwipeItem.name, SwipeItem)
Vue.component(Loadmore.name, Loadmore)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  components: { App },
  template: '<App/>'
})
