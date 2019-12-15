<template>
  <div class="mg-list">
    <Divider orientation="left">客服账号列表</Divider>

    <Button type="default" style="margin:30px 0 30px;" @click="addService()">+ 新增客服</Button>
    </br>

     <Table :columns="columns1" :data="listData">
       <template slot-scope="{ row }" slot="usertype">
         <p v-if="row.usertype == 4">客服</p>
        </template>

       <template slot-scope="{ row, index }" slot="action">
          <Button class="mg-button" type="default" size="small" @click="detail(row, 'on')">客服操作</Button>
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
    jump(num) {
      let me = this
      me.pageData.pageIndex = num
      me.fetch(me.pageData.pageIndex, me.pageData.pageSize)
    },
    fetch(index, size) {
      let me = this;
      accountList({
        pageIndex: index || me.pageData.pageIndex,
        pageSize: size || me.pageData.pageSize,
        userType: 4 
      }).then((res) => {
        if(res.ok) {
          me.listData = res.data.list
          me.total = res.data.total
        } else {
          me.$Message.error(res.errorMsg + ":" + res.info);
        }
      })
    },
    addService() {
      let me = this;
      me.$router.push({ 
        name: 'service_detail',
        query: {
          mode: 'new'
        }
      })
    },
    detail(item) {
      let me = this;
      me.$router.push({ 
        name: 'service_detail',
        query: {
          mode: 'edit',
          uid: item.id,
          username: item.username,
          realname: item.realname
        }
      })
    }
  }
}
</script>
<style lang="less" scoped>
.mg-list {
  text-align: left;
  padding: 40px;
  .mg-button {
    margin: 0 12px;
  }
}
</style>
