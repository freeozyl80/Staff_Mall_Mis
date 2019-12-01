<template>
  <div class="mg-import">
    <Breadcrumb>
      <BreadcrumbItem to="/home">首页</BreadcrumbItem>
      <BreadcrumbItem v-if="$route.query.firmname" to="/home/association_list">合作机构列表</BreadcrumbItem>
      <BreadcrumbItem v-if="$route.query.firmname" :to="'/home/association_business?fid='+ $route.query.fid +'&firmname=' + $route.query.firmname">{{$route.query.firmname}}: 商品列表</BreadcrumbItem>
      <BreadcrumbItem v-if="$route.query.firmname">{{$route.query.firmname}}: 商品导入</BreadcrumbItem>
    </Breadcrumb> 
     <br/>

  	 <div class="tips">
  	 	 <p>1. 导入文件必须使用xlsx 文件</p>
       <p>2. 默认sheet1放置登录信息</p>
       <p>3. 登录信息依次为商品简称，商品全称，商品类别简称，商品类别全称， 库存，价格，商品描述，商品图片</p>
       <a href="https://img.cdn.hualvmall.com/product.xlsx">查看示例excel文件</a>
  	 </div>

     <div style="margin-top: 20px;">
        <Upload
          type="drag"
          :data="$route.query.fid ? {'fid': $route.query.fid} : {}"
          :headers="headers"
          :show-upload-list="false"
          :action="uploadUrl"
          :on-success="uploadCb">
          <div style="padding: 20px 0">
              <Icon type="ios-cloud-upload" size="52" style="color: #3399ff"></Icon>
              <p>导入商品列表</p>
          </div>
      </Upload>
     </div>
     
  </div>
</template>

<script>

import config from '@src/config'
import Cookies from 'js-cookie'
import { ProductListRegister } from '@src/service/product'

export default {
  name: 'PooductImport',
  mounted() {
    console.log('This is PooductImport')
  },
  computed: {
    uploadUrl() {
      return ProductListRegister
    },
    headers() {
      return {
        'hualvmall_authorization': Cookies.get(config.loginOpts.cookieKey) || ''
      }
    }
  },
  methods: {
    uploadCb(res) {
      let me = this;
      if(res.errorCode != 0) {
        me.$Message.error(res.errorMsg + ":" + res.info);
      } else {
        me.$Message.success("上传成功");
        setTimeout(() => {
          if(me.$route.query.from) {
            me.$router.push({
              name: me.$route.query.from,
              query: {
                fid: me.$route.query.fid, 
                firmname: me.$route.query.firmname
              }
            })
          } else {
           me.$router.push({name: 'product_list'})
          }
        }, 1000)
      }
    }
  }
}
</script>
<style lang="less" scoped>
.mg-import {
  padding: 40px;
  text-align: left;
}
.tips {
  color: #3d3d3d;
  text-align: left;
}
</style>
