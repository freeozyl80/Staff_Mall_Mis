<template>
  <div class="mg-detail">
    
     <Breadcrumb>
      <BreadcrumbItem to="/home">首页</BreadcrumbItem>
      <BreadcrumbItem  to="/home/association_list">合作机构列表</BreadcrumbItem>
      <BreadcrumbItem >{{$route.query.firmname}}: 订单列表</BreadcrumbItem>
    </Breadcrumb> 
     <br/>
     
     <Table :columns="columns" :data="listData">
      <template slot-scope="{ row, index }" slot="status">
          <div v-if="row.order_status == 1">下定</div>
          <div v-if="row.order_status == 2">支付完成</div>
          <div v-if="row.order_status == 3">发货完成</div>
          <div v-if="row.order_status == 4">收货完成</div>
          <div v-if="row.order_status == 5">取消</div>
          <div v-if="row.order_status == 6">退换中</div>
          <div v-if="row.order_status == 7">7异常</div>
        </template>
       <template slot-scope="{ row, index }" slot="action">
           <Button v-if="row.order_status != 5 && row.order_status != 1" class="mg-button" type="error" size="small" @click="cancelOrder(row)">立即退款</Button>
           <Button v-if="row.order_status == 2" class="mg-button" type="primary" size="small" @click="deliver(row)">发货完成</Button>
        </template>
     </Table>

    <template>
        <Page :total="total" show-sizer=false :page-size="pageData.pageSize" :current="pageData.pageIndex" @on-change="jump"/>
    </template>
  </div>
</template>

<script>

import { orderList, cancelOrder, deliverOrder } from '@src/service/firm'

export default {
  name: 'AssociationAccount',
  data() {
    return {
      total: 0,
      pageData: {
        pageSize: 10,
        pageIndex: 1
      },
      columns: [
        {
          title: '订单id',
          key: 'order_id'
        },
        {
          title: '收货地址',
          key: 'order_receiving_address'
        },
        {
          title: '收货城市',
          key: 'order_receiving_city'
        },
        {
          title: '收货电话',
          key: 'order_receiving_tel'
        },
        {
          title: '收货人',
          key: 'order_receiving_username'
        },
        {
          title: '订单价格',
          key: 'order_total_price'
        },
        {
          title: '订单状态',
          key: 'oder_status',
          slot: 'status'
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
    jump(num) {
      let me = this
      me.pageData.pageIndex = num
      me.fetch(me.pageData.pageIndex, me.pageData.pageSize)
    },
    fetch(index, size) {
      let me = this;
      orderList({
        fid: me.$route.query.fid,
        pageIndex: index || me.pageData.pageIndex,
        pageSize: size || me.pageData.pageSize
      }).then((res) => {
        if(res.ok) {
          me.listData = res.data.list || []
          me.total = res.data.total
        } else {
          me.$Message.error(res.errorMsg + ":" + res.info);
        }
      })
    },
    cancelOrder(item) {
      let me = this;
      this.$Modal.confirm({
        render: (createElement) => {
          var self = this;
          return createElement('div', [
              createElement('h2', '确认操作'),
              createElement('h4', `确认退款该商品：${item.order_id}`)
          ]);
        },
        onOk() {
          cancelOrder({
            fid: me.$route.query.fid,
            orderId: item.order_id
          }).then((res) => {
            if(res.ok) {
              me.listData = res.data.list || []
              me.fetch()
            } else {
              me.$Message.error(res.errorMsg + ":" + res.info);
            }
          })
        }
      })
    },
    deliver(item) {
      let me = this;
      this.$Modal.confirm({
        render: (createElement) => {
          var self = this;
          return createElement('div', [
              createElement('h2', '确认操作'),
              createElement('h4', `确认发货该商品：${item.order_id}`)
          ]);
        },
        onOk() {
          deliverOrder({
            fid: me.$route.query.fid,
            orderId: item.order_id
          }).then((res) => {
            if(res.ok) {
              me.listData = res.data.list || []
              me.fetch()
            } else {
              me.$Message.error(res.errorMsg + ":" + res.info);
            }
          })
        }
      })
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
