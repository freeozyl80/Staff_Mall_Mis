<template>
  <div class="mg-import">
    <Breadcrumb>
      <BreadcrumbItem to="/home">首页</BreadcrumbItem>
      <BreadcrumbItem v-if="$route.query.firmname" to="/home/association_list">合作机构列表</BreadcrumbItem>
      <BreadcrumbItem v-if="$route.query.firmname" :to="'/home/association_account?fid='+ $route.query.fid +'&firmname=' + $route.query.firmname">{{$route.query.firmname}}: 员工列表</BreadcrumbItem>
      <BreadcrumbItem v-if="$route.query.firmname">{{$route.query.firmname}}: 员工导入</BreadcrumbItem>
    </Breadcrumb> 
     <br/>
  	 <div class="tips">
  	 	 <p>1. 导入文件必须使用xlsx 文件</p>
       <p>2. 默认sheet1放置登录信息</p>
       <p>3. 登录信息依次为 账户名称，真实姓名， 初始密码</p>
       <a href="https://img.cdn.hualvmall.com/account.xlsx">查看示例excel文件</a>
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
              <p>导入账号列表</p>
          </div>
      </Upload>
     </div>
     
  </div>
</template>

<script>

import config from '@src/config'
import Cookies from 'js-cookie'
import { AdminListRegister } from '@src/service/account'

export default {
  name: 'AccountImport',
  mounted() {
    console.log('This is AccountImport')
  },
  computed: {
    uploadUrl() {
      return AdminListRegister
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
            me.$router.push({name: 'account_list'})
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
