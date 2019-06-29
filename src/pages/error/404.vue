<template>
  <error-content code="404" desc="Oh~~您的页面好像飞走了~" :src="src"/>
</template>

<script>
import error404 from '@src/assets/images/error-404.svg'
import errorContent from '@components/error-content.vue'

export default {
  name: 'error_404',
  components: {
    errorContent
  },
  data () {
    return {
      src: error404
    }
  },
  mounted () {
    console.log('This is 404 Page')
  }
}
</script>
