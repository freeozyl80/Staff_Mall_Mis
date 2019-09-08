import Vue from 'vue'
import App from './App.vue'
import router from './router'
import iView from 'iview'
import store from './store'
import importDirective from './dirctive'
import { sync } from 'vuex-router-sync'
import 'iview/dist/styles/iview.css';


sync(store, router, { moduleName: 'router' } )

importDirective(Vue)

Vue.config.productionTip = false

Vue.use(iView, {})


new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
