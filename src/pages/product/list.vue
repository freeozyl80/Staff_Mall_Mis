<template>
  <div class="mg-detail">
    

  <Divider orientation="left">所有商品列表</Divider>
  <Button type="primary" style="margin:30px 0 30px;" @click="importStaff()">+ 导入商品列表</Button>

   <Table :columns="columns" :data="listData">

    <template slot-scope="{ row, index }" slot="product_img">
      <img style="width: 300px;object-fit: contain":src="row.product_img"/>
    </template>

    <template slot-scope="{ row, index }" slot="product_status">
      <div v-if="row.product_status == 1" style="color: #2b85e4">状态正常</div>
      <div v-else>已下线</div>
    </template>

     <template slot-scope="{ row, index }" slot="action">
      <Button class="mg-button" type="primary" size="small" @click="manage(row)">管理商品相关</Button>
    </template>
   </Table>

  </div>
</template>

<script>


import { productList } from '@src/service/product'

export default {
  name: 'ProductList',
  data() {
    return {
      columns: [
        {
          title: '商品id',
          key: 'pid'
        },
        {
          title: '商品名',
          key: 'product_name'
        },
        {
          title: '商品全称',
          key: 'product_realname'
        },
        {
          title: '商品类别',
          key: 'category_name'
        },
        {
          title: '商品类别全称',
          key: 'category_realname'
        },
        {
          title: '商品价格',
          key: 'product_price'
        },
        {
          title: '商品描述',
          key: 'product_desc'
        },
        {
          title: '商品库存',
          key: 'product_count'
        },
        {
          title: '商品图片',
          key: 'product_img',
          slot: 'product_img'
        },
        {
          title: '商品状态',
          key: 'product_status',
          slot: 'product_status'
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
    importStaff() {
      this.$router.push({ name: 'product_import'})
    },
    fetch() {
      let me = this;
      productList({
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
    manage() {
      let me = this;
      console.log('这里是管理商品相关的逻辑')
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
