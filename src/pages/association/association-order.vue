<template>
  <div class="mg-detail">
    
    <Divider orientation="left">{{$route.query.firmname}}: 订单列表</Divider>

     <Table :columns="columns" :data="listData">
       <template slot-scope="{ row, index }" slot="action">
           <Button class="mg-button" type="default" size="small" @click="cancelOrder(row, 'off')">取消订单</Button>
        </template>
     </Table>

  </div>
</template>

<script>


import { orderList, cancelOrder } from '@src/service/firm'

export default {
  name: 'AssociationAccount',
  data() {
    return {
      columns: [
        {
          title: '用户id',
          key: 'id'
        },
        {
          title: '账户名',
          key: 'username'
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
  mounted() {
    let me = this;
    me.fetch()
  },
  methods: {
    fetch() {
      let me = this;
      orderList({
        auth1: me.$route.query.fid,
        pageIndex: 1,
        pageSize: 10
      }).then((res) => {
        if(res.ok) {
          me.listData = res.data.list || []
        } else {
          me.$Message.error(res.errorMsg + ":" + res.info);
        }
      })
    },
    cancelOrder(item, type) {
    }
  }
}
</script>
<style lang="less" scoped>
.mg-detail{
  text-align: left;
  padding: 40px;
}
</style>
