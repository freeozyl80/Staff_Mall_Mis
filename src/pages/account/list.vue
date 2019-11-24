<template>
  <div class="mg-list">
    <Divider orientation="left">所有账户列表</Divider>
    <!-- <div style="text-align: left;">
     <Button type="primary" style="margin:30px 0 30px;" @click="importAccout()">+ 批量导入账户</Button>
    </div> -->
     <Table :columns="columns1" :data="listData">
       <template slot-scope="{ row }" slot="usertype">
         <p v-if="row.usertype == 1">系统管理员</p>
         <p v-if="row.usertype == 2">客户负责人</p>
         <p v-if="row.usertype == 3">员工</p>
        </template>

       <template slot-scope="{ row, index }" slot="action">
        <!-- <div v-if="row.usertype != 1">
          <Button class="mg-button" type="warning" size="small" style="margin-right: 5px" @click="rest(index)">重置</Button>
          <Button class="mg-button" type="error" size="small" @click="remove(index)">删除</Button>
          <Button class="mg-button" type="primary" size="small" @click="detail(row.id)">详情</Button>
        </div> -->
         
        </template>
     </Table>

     <template>
        <Page :total="total" show-sizer=false :page-size="pageData.pageSize" :current="pageData.pageIndex" @on-change="jump"/>
    </template>

  </div>
</template>

<script>

import { accountList } from '@src/service/account'

export default {
  name: 'AccountList',
  mounted() {
    let me = this;
    me.fetch()
  },
  data () {
    return {
      total: 0,
      pageData: {
        pageSize: 10,
        pageIndex: 1
      },
      columns1: [
        {
          title: '用户id',
          key: 'id'
        },
        {
          title: '用户类型',
          key: 'usertype',
          slot: 'usertype'
        },
        {
          title: '账户名',
          key: 'username'
        },
        {
          title: '姓名',
          key: 'realname'
        },
        {
          title: '操作',
          key: 'action',
          slot: 'action'
        }
      ],
      listData: [
      ]
    }
  },
  watch: {
    '$route': 'fetch'
  },
  methods: {
    detail(id) {
      this.$router.push({ name: 'account_detail', params: { id: id }})
    },
    importAccout() {
      this.$router.push({ name: 'account_import'})
    },
    jump(num) {
      let me = this
      me.pageData.pageIndex = num
      me.fetch(me.pageData.pageIndex, me.pageData.pageSize)
    },
    fetch(index, size) {
      let me = this;
      accountList({
        pageIndex: index || me.pageData.pageIndex,
        pageSize: size || me.pageData.pageSize
      }).then((res) => {
        if(res.ok) {
          me.listData = res.data.list
          me.total = res.data.total
        } else {
          me.$Message.error(res.errorMsg + ":" + res.info);
        }
      })
    },
  }
}
</script>
<style lang="less" scoped>
.mg-list {
  padding: 40px;
  .mg-button {
    margin: 0 12px;
  }
}
</style>
