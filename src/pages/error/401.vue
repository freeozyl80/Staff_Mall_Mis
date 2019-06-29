<template>
  <error-content code="401" desc="Oh~~您没有浏览这个页面的权限~" :src="src"/>
</template>

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
      src: error401
    }
  },
  mounted () {
    console.log('This is 401 Page')
  }
}
</script>
