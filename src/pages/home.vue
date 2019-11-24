<template>
  <div class="container">
    <div class="mg-home-header">
      <Menu mode="horizontal" :theme="theme1" active-name="1" @on-select="jump">
          <MenuItem name="account_list" v-if="userType == '1'">
              <Icon type="ios-people" />
              <span>账户管理</span>
          </MenuItem>
          <!--  <MenuItem name="product_list"  v-if="userType == '1'">
              <Icon type="ios-construct" />
              <span>商品管理</span>
          </MenuItem> -->
          <MenuItem name="association_list"  v-if="userType == '1'">
              <Icon type="ios-construct" />
              <span>合作机构管理</span>
          </MenuItem>
           <!-- <MenuItem name="association_list" v-if="userType == '1'">
              <Icon type="ios-construct" />
              <span>订单列表</span>
          </MenuItem>
           <MenuItem name="association_list" v-if="userType == '2'">
              <Icon type="ios-construct" />
              <span>所属机构管理</span>
          </MenuItem> -->
      </Menu>

      <Dropdown class="mg-home-drop" @on-click="accountOperate" trigger="click">
          <a href="javascript:void(0)" style="padding-top: 20px;display:inline-block">
              <span style="color:#fff;" v-if="userName">{{userName}}({{useTypeDesc}})</span>
              <span style="color:#fff;" v-else>未登录</span>
              <Icon style="color:#fff;" type="ios-arrow-down"></Icon>
          </a>
          <DropdownMenu slot="list">
              <DropdownItem name="logout" v-if="userName">注销</DropdownItem>
              <DropdownItem name="login" v-else>登录</DropdownItem>
          </DropdownMenu>
      </Dropdown>
    </div>

    <router-view ref="child"/>
    
  </div>
</template>

<script>

import { mapMutations, mapActions, mapGetters } from 'vuex'

export default {
  name: 'Home',
  mounted() {
    console.log('This is Home')
  },
  data () {
    return {
      theme1: 'primary'
    }
  },
  computed: {
    userName () {
      return this.$store.state.user.userName
    },
    userType () {
      return this.$store.state.user.userType
    },
    useTypeDesc () {
      let res;
      switch(this.$store.state.user.userType) {
        case '1':
          res = '超级管理员'
        break;
        case '2':
          res = "商户管理员"
        break;
      }
      return res
    }
  },
  methods: { 
    ...mapActions([
      'handleLogOut'
    ]),
    jump(name) {
      console.log('跳转: ' + name)
      this.$router.push({name: name})
    },
    accountOperate(type) {
      let me = this;
      if (type == 'login') {
        me.$router.push({
          name: 'login',
        })
      } else if (type == 'logout') {
        me.handleLogOut().then(() => {
          this.$router.push({
            name: 'login'
          })
        })
      }
    }
  }
}
</script>
<style lang="less" scoped>
.container {
  min-width: 100%;
  min-height: 100%;
  background-size: 100%;
  background: url(https://gw.alipayobjects.com/zos/rmsportal/TVYTbAXWheQpRcWDaDMu.svg)
}
.mg-home-header {
  background: #2d8cf0;
  display: flex;
  justify-content: space-between;
  .mg-home-drop {
    width: 200px;
  }
}
</style>
