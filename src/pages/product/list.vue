<template>
  <div class="mg-detail">

  <Divider orientation="left">所有商品列表</Divider>


  <Select v-model="firmData" style="width:200px" @on-change="select">
    <Option v-for="item in firmList" :value="item.fid" :key="item.fid">{{ item.firmname }}</Option>
  </Select>
  <Button type="primary" style="margin:30px 0 30px;" @click="addToFirm()">勾选后, 导入机构</Button>

  <br/>
  <label>商品状态&nbsp;&nbsp;&nbsp;</label>
  <Select v-model="productStatus" style="width:200px" @on-change="reload">
    <Option value=1>有效商品管理</Option>
    <Option value=2>失效商品管理</Option>
  </Select>

  <br/>

  <Button type="primary" style="margin:30px 0 30px;" @click="importProduct()">+ 导入商品列表</Button>

   <Table :columns="columns" :data="listData" ref="selection" @on-selection-change="choose">

    <template slot-scope="{ row, index }" slot="product_img">
      <img style="width: 85px; height: 85px; object-fit: contain; border: 1px solid #999" :src="row.product_img"/>
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
        <Page :total="total" :show-sizer=false :page-size="pageData.pageSize" :current="pageData.pageIndex" @on-change="jump"/>
    </template>
  </div>
</template>

<script>


import { firmList, firmInfo, firmUpdate } from '@src/service/firm'

import { productList } from '@src/service/product'

export default {
  name: 'ProductList',
  data() {
    return {
      total: 0,
      productStatus: "1",
      pageData: {
        pageSize: 20,
        pageIndex: 1
      },
      firmData: '',
      firmList: [],
      firmDetail: {},
      firmChoosePid: [],
      firmChooseCid: [],
      columns: [
        {
          type: 'selection',
          width: 60,
          align: 'center'
        },
        {
          title: '商品id',
          key: 'pid',
          width: 60
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
          width: 120,
        },
        {
          title: '商品状态',
          key: 'product_status',
          slot: 'product_status'
        },
        {
          title: '供应商简称',
          key: 'supplier_name'
        },
        {
          title: '供应商名称',
          key: 'supplier_realname'
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
    '$route': 'fetch',
    'firmDetail': function() {
      let me = this;
      let productArr = me.firmDetail.product_group ? me.firmDetail.product_group.split(',') : []

      me.listData.forEach((product) => {
        product._disabled = false
      })

      productArr.forEach((fproduct) => {
        me.listData.forEach((product) => {
          if(product.pid == fproduct) {
            product._disabled = true
          }
        })
      })
    }
  },
  mounted() {
    window.test = this;
    let me = this;
    me.fetch()
  },
  methods: {
    importProduct() {
      this.$router.push({
        name: 'product_import'
      })
    },
    jump(num) {
      let me = this
      me.pageData.pageIndex = num
      me.fetch(me.pageData.pageIndex, me.pageData.pageSize)
    },
    reload() {
      let me = this;
      me.pageData = {
        pageSize: 20,
        pageIndex: 1
      }
      me.fetch()
    },
    fetch(index, size) {
      let me = this;
      productList({
        productStatus: parseInt(me.productStatus, 10),
        pageIndex: index || me.pageData.pageIndex,
        pageSize: size || me.pageData.pageSize
      }).then((res) => {
        if(res.ok) {
          me.total = res.data.total
          let data = res.data.list || []
          data.forEach((product) => {
            product._disabled = false
          })
          me.listData = data
        } else {
          me.$Message.error(res.errorMsg + ":" + res.info);
        }
      })

      firmList({
        pageIndex: 1,
        pageSize: 100
      }).then((res)=>{
        if(res.errorCode == 0) {
          me.firmList = res.data.list || []
        } else {
          me.$Message.error(res.errorMsg + ":" + res.info);
        }
      }, (e) => {
        me.$Message.error(e + ":" + res.info);
      })
    },
    manage(row) {
      let me = this;
      me.$router.push({ name: 'association_business_detail', query: {
       pid: row.pid,
       mode: 'edit'
     }})
    },
    select(fid) {
      let me = this;
      firmInfo({
        fid: fid
      }).then((res) => {
        if(res.errorCode == 0) {
          me.firmDetail = res.data.info
        } else {
          me.$Message.error('机构查询失败');
        }
      }, () => {
          me.$Message.error('机构查询失败');
      })
    },
    choose(list) {
      let me = this;
      let pidList = list.map((ele) => {
        return ele.pid
      })

      let cidList = list.map((ele) => {
        return ele.cid
      })

      me.firmChoosePid = pidList
      me.firmChooseCid = cidList
    },
    addToFirm() {
      let me = this
      if (!me.firmData) {
        me.$Message.error('请选择机构');
      }
      if (me.firmChoosePid.length == 0) {
        me.$Message.error('请勾选需要的商品');
      }

      let group = me.genGroup()

      firmUpdate({
        fid: me.firmData,
        firmName: me.firmDetail.firm_name,
        firmRealName: me.firmDetail.firm_realname,
        balance: me.firmDetail.balance,
        productGroup: group.productGroup,
        categoryGroup: group.categoryGroup
      }).then ((res) => {
        if(res.errorCode == 0) {
           me.$Message.success('机构更新成功:' + res.data.firmname + '(' + res.data.firm_realname  +')');
           setTimeout(() => {
            window.location.reload()
           }, 2000)
        }
      }, () => {
        me.$Message.error('机构更新失败');
      })
    },
    genGroup() {
      let me = this;
      let res = {}
      let pgroup = me.firmDetail.product_group ? (me.firmDetail.product_group + ',') : me.firmDetail.product_group
      let cgroup = me.firmDetail.category_group ? me.firmDetail.category_group.split(',') : []

      function unique (arr) {
        return Array.from(new Set(arr))
      }

      res.productGroup = pgroup + me.firmChoosePid.join(',')

      res.categoryGroup = unique(cgroup.concat(me.firmChooseCid)).join(',')

      return res
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
