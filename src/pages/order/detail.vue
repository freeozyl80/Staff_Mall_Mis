
<template>
  <div class="mg-detail">

     <Breadcrumb>
      <BreadcrumbItem to="/home">首页</BreadcrumbItem>
      <BreadcrumbItem to="/home/order_list">订单列表</BreadcrumbItem>
      <BreadcrumbItem>订单详情</BreadcrumbItem>
    </Breadcrumb>
    <br/>
    <div style="max-width: 500px; text-align: left">
      
       <Card :bordered="false">
        <div>收货人地址 {{orderData.order_receiving_city}}: {{orderData.order_receiving_address}}</div>
        <div>收货人 {{orderData.order_receiving_username}}</div>
        <div>Tel {{orderData.order_receiving_tel}}</div>
        <div>订单金额 {{orderData.order_total_price}}</div>
      </Card>

      <br/>
      <Card v-for="(item, idx) in orderData.order_product_info">
          <p slot="title">订单 {{idx + 1}}:</p>
          <p>种类： {{item.category_realname}}</p>
          <p>数量： {{item.count}}</p>
          <p>价格： {{item.product_price}}</p>
          <p>名称： {{item.product_realname}}</p>
          <p>供应商： {{item.supplier_realname}}</p>
      </Card>

    </div>

  </div>
</template>

<script>
import {orderDetail} from '@src/service/order.js'

export default {
  name: 'OrderDetail',
  data() {
    return {
      orderData: {
      },
    }
  },
  mounted() {
    let me = this;
    me.fetchData()
  },
  methods: {
    fetchData() {
      let me = this;
      orderDetail({
        order_id: me.$route.query.id,
        uid: me.$route.query.uid
      }).then((res) => {
        if(res.errorCode == 0) {
          me.orderData = res.data.info
        } else {
          me.$Message.error('订单查询失败');
        }
      }, () => {
          me.$Message.error('订单查询失败');
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
