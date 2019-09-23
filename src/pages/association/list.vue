<template>
  <div class="mg-list">
    <Divider orientation="left">所有机构列表</Divider>
    <div style="text-align: left;">
     <Button type="primary" style="margin:30px 0 30px;" @click="importAssociation()">+ 新建合作机构</Button>
    </div>
     <Table :columns="columns1" :data="listData">

       <template slot-scope="{ row, index }" slot="action">
          <Button class="mg-button" type="default" size="small" style="margin-right: 5px" @click="account(row)">账号管理</Button>
          <Button class="mg-button" type="primary" size="small" @click="busin(row)">商品管理</Button>
          <Button class="mg-button" type="info" size="small" @click="order(row)">订单管理</Button>
        </template>
     </Table>
  </div>
</template>

<script>

import { firmList,firmAdd } from '@src/service/firm'

export default {
  name: 'FirmList',
  mounted() {
    let me = this;
    me.fetch()
  },
  data () {
    return {
      columns1: [
        {
          title: '机构id',
          key: 'fid'
        },
        {
          title: '机构name',
          key: 'firmname',
        },
        {
          title: '机构全称',
          key: 'firm_realname'
        },
        {
          title: '机构剩余金额',
          key: 'balance'
        },
        {
          title: '操作',
          key: 'action',
          slot: 'action',
          width: 400
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
    fetch() {
      let me = this;
      firmList({
        pageIndex: 1,
        pageSize: 10
      }).then((res)=>{
        console.log(res)
        if(res.errorCode == 0) {
          me.listData = res.data.list || []
        } else {
          me.$Message.error(res.errorMsg + ":" + res.info);
        }
      }, (e) => {
        me.$Message.error(e + ":" + res.info);
      })
    },
    importAssociation() {
      let me = this;
      me.$router.push({ name: 'association_detail', query: {mode: 'new'}})

    },
    account(item) {
      let me = this;
      me.$router.push({ 
        name: 'association_account',
        query: {
          fid: item.fid,
          firmname: item.firmname
        }
      })
    },
    busin(item) {
      let me = this;
      me.$router.push({ 
        name: 'association_business',
        query: {
          fid: item.fid,
          firmname: item.firmname
        }
      })
    },
    order(item) {
      let me = this;
      me.$router.push({ 
        name: 'association_order',
        query: {
          fid: item.fid,
          firmname: item.firmname
        }
      })
    }
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
