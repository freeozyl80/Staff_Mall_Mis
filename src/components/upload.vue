<template>
  <div class="hualvmall-upload">
     <div @click="handleClick">
      <input
        ref="input"
        type="file"
        :class="[prefixCls + '-input']"
        @change="handleChange"
        accept="image/gif, image/jpeg, image/png">
        <slot></slot>
      </div>
    </div>
</template>
<script>
import * as qiniu from 'qiniu-js'
import { qiniuHost } from '@src/config'
import { getQiniuToken } from '@src/service/common'
let getClientRect = function getClientRect(file) {
  let reader = new FileReader()
  return new Promise(function (resolve, reject) {
    reader.readAsDataURL(file)

    reader.onload = function (evt) {
      let image = new Image()

      image.onload = function () {
        let width = this.width
        let height = this.height
        resolve(width + 'x' + height)
      }

      image.onerror = function (evt) {
        resolve('0x0')
      }

      image.src = evt.target.result
    }
  })
}

export default {
  props: {
    prefixCls: {
      type: String,
      default: 'Pic'
    },
  },
  data() {
    return {

    }
  },
  mounted() {

  },
  methods: {
    handleClick() {
      console.log('wtf')
      this.$refs.input.click();
    },
    handleChange (e) {
      const files = e.target.files;
      if (!files) {
          return;
      }
      this.uploadFiles(files[0]);
      this.$refs.input.value = null;
    },
    async uploadFiles (file) {
      let me = this;
      let ext = file.name.split('.')[file.name.split('.').length - 1]
      let rect = await getClientRect(file)
      let today = new Date()
      let prefix = today.getFullYear() + '/' + (today.getMonth() + 1) + '/' +  today.getDate() + '/' + today.getHours()+ '/' + today.getMinutes()
      let key = 'mis/' + prefix + '/' + this.$store.state.user.userId + '_' + rect + '.' + ext;
      let config = {
        region: 'https://img.cdn.hualvmall.com',
        useCdnDomain: true,
        region: qiniu.region.z2
      }
      let tokenInfo = await getQiniuToken()

      if (tokenInfo.errorCode != 0) {
        me.$Message.error('获取上传token失败');
      } 
      let putExtra = {
        fname: file.name,
        mimeType: null
      };
      let observable = qiniu.upload(file, key, tokenInfo.data.token, putExtra, config)

      let observer = {
        next(res){
        },
        error(err){
          me.$Message.error('图片上传失败', err);
        },
        complete(res){
          let url = qiniuHost + res.key
          me.$emit("finsh", url)
        }
      }

      let subscription = observable.subscribe(observer) 
    }
  }
}
</script>
<style scoped="">
input {
  display: none;
}
</style>