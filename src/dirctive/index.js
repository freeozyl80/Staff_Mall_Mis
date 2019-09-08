
import store from '@src//store'
import { hasOneOf } from '@src/util'

const importDirective = Vue => {

  Vue.directive('access', {
    bind: function(el, binding, vnode) {
      console.log(binding.value)
      const toAccess = binding.value.access
      const toSubAccess = binding.value.subAccess

      if(!toAccess) { toAccess = []}
      if(!toSubAccess) { toSubAccess = []}

      const fromAccess= store.state.app.access
      const fromSubAccess = store.state.app.subAccess
      if(hasOneOf(toAccess, fromAccess) && hasOneOf(toSubAccess, fromSubAccess)) {
        return
      } else {
        el.style.display = 'none'
      }
    }
  })
}

export default importDirective
