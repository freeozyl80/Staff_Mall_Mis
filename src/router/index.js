import routes from './route'
import Vue from 'vue'
import Router from 'vue-router'
import { appName } from '@config'

import { AuthCheck } from '@src/service/common'

Vue.use(Router)

const router = new Router({
  routes: routes,
  base: appName,
  mode: 'history'
})

router.beforeEach(async (to, from, next) => {
  // 401 不需要鉴权
  if (to.name == 'error_401' || to.name == 'login') {
    next()
    return
  }
  AuthCheck({}).then((res) => {
    if(res && res.ok) {
      next();
      return;
    } else {
      next({ replace: true, name: 'error_401' }) // 无权限，重定向到401页面
    }
  })

})
export default router