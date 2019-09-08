<template>
  <div style="width: 100%; height: 100%; position: relative;">
    <error-content code="401" desc="Oh~~您没有浏览这个页面的权限~" :src="src"/>
    <div class="tip">{{time}} 秒后将自动跳转至 登录首页</div>
  </div>
</template>


<style lang="css" scoped="">
.tip {
  position: absolute;
  bottom: 30px;
  right: 20px;
  color: #2b85e4;
  font-size: 18px;
}
</style>

<script>

import error401 from '@src/assets/images/error-401.svg'
import errorContent from '@components/error-content.vue'

export default {
  name: 'error_401',
  components: {
    errorContent
  },
  data () {
    return {
      src: error401,
      time: 4
    }
  },
  mounted () {
    console.log('This is 401 Page')
    let me = this;
    let timer = setInterval(() => {
      me.time--;
    }, 1000)
    setTimeout(() => {
      clearInterval(timer)
      me.$router.push({name: 'login'})
    }, 4000)
  }
}
</script>
