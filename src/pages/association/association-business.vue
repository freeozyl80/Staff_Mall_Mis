<template>
  <div class="mg-detail">
  
  <Breadcrumb>
    <BreadcrumbItem to="/home">首页</BreadcrumbItem>
    <BreadcrumbItem to="/home/association_list">合作机构列表</BreadcrumbItem>
    <BreadcrumbItem>{{$route.query.firmname}}: 商品列表</BreadcrumbItem>
  </Breadcrumb> 
  <br/>

  <Button type="primary" style="margin:30px 0 30px;" @click="importProduct()">+ 导入商品列表</Button>&nbsp;&nbsp;
  <Button v-if="listData.length > 0" type="default" style="margin:30px 0 30px;" @click="createProduct()">+ 新建单个商品</Button>

   <Table :columns="columns" :data="listData">

    <template slot-scope="{ row, index }" slot="product_img">
      <img style="width: 100px;object-fit: contain":src="row.product_img"/>
    </template>

    <template slot-scope="{ row, index }" slot="product_status">
      <div v-if="row.product_status == 1" style="color: #2b85e4">状态正常</div>
      <div v-else>已下线</div>
    </template>

     <template slot-scope="{ row, index }" slot="action">
      <Button class="mg-button" type="primary" size="small" @click="manage(row)">管理商品相关</Button>
    </template>
   </Table>

    <template>
        <Page :total="total" show-sizer=false :page-size="pageData.pageSize" :current="pageData.pageIndex" @on-change="jump"/>
    </template>
  </div>
</template>

<script>


import { firmProductList } from '@src/service/firm'

export default {
  name: 'AssociationProduct',
  data() {
    return {
      total: 0,
      pageData: {
        pageSize: 10,
        pageIndex: 1
      },
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
          slot: 'product_img',
          width: 100,
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
    '$route' (to, from) {
      let me = this;
      if(to == 'association_business') {
        me.fetch()
      }
    }
  },
  mounted() {
    let me = this;
    me.fetch()
  },
  methods: {
    importProduct() {
      this.$router.push({ name: 'product_import', query: { fid: this.$route.query.fid, firmname: this.$route.query.firmname, from: this.$route.name }})
    },
    jump(num) {
      let me = this
      me.pageData.pageIndex = num
      me.fetch(me.pageData.pageIndex, me.pageData.pageSize)
    },
    fetch(index, size) {
      let me = this;
      firmProductList({
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
    manage(row) {
      let me = this;
      me.$router.push({ name: 'association_business_detail', query: {
       fid: me.$route.query.fid,
       firmname: me.$route.query.firmname,
       pid: row.pid,
       mode: 'edit'
     }})
    },
    createProduct() {
      let me = this;
      me.$router.push({ name: 'association_business_detail', query: {
       fid: me.$route.query.fid,
       firmname: me.$route.query.firmname,
       mode: 'new'
     }})
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
