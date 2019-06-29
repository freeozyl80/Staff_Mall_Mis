<template>
  <div>
    <div class="mg-home-header">
      <Menu mode="horizontal" :theme="theme1" active-name="1" @on-select="jump">
          <MenuItem name="account_list">
              <Icon type="ios-people" />
              <span>账户列表</span>
          </MenuItem>
          <MenuItem name="account_import">
              <Icon type="ios-construct" />
              <span>账户导入</span>
          </MenuItem>
      </Menu>

      <Dropdown class="mg-home-drop">
          <a href="javascript:void(0)" style="padding-top: 20px;display:inline-block">
              <span style="color:#fff;">账户</span>
              <Icon style="color:#fff;" type="ios-arrow-down"></Icon>
          </a>
          <DropdownMenu slot="list">
              <DropdownItem>登录</DropdownItem>
              <DropdownItem>注销</DropdownItem>
          </DropdownMenu>
      </Dropdown>
    </div>

    <keep-alive>
      <router-view ref="child"/>
    </keep-alive>

  </div>
</template>

<script>
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
  methods: {
    jump(name) {
      console.log('跳转: ' + name)
      this.$router.push({name: name})
    }
  }
}
</script>
<style lang="less" scoped>
.mg-home-header {
  background: #2d8cf0;
  display: flex;
  justify-content: space-between;
  .mg-home-drop {
    width: 200px;
  }
}
</style>
