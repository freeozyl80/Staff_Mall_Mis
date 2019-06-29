<template>
  <div class="mg-list">
     <Table :columns="columns1" :data="listData">
       <template slot-scope="{ row }" slot="type">
         <p v-if="row.type == 2">系统管理员</p>
         <p v-if="row.type == 3">客户负责人</p>
         <p v-if="row.type == 4">员工</p>
        </template>

       <template slot-scope="{ row, index }" slot="action">
          <Button class="mg-button" type="warning" size="small" style="margin-right: 5px" @click="rest(index)">重置</Button>
          <Button class="mg-button" type="error" size="small" @click="remove(index)">删除</Button>
          <Button class="mg-button" type="primary" size="small" @click="detail(row.id)">详情</Button>
        </template>
     </Table>
  </div>
</template>

<script>
export default {
  name: 'AccountList',
  mounted() {
    console.log('This is AccountList')
  },
  data () {
    return {
      columns1: [
        {
          title: '用户id',
          key: 'id'
        },
        {
          title: '用户类型',
          key: 'type',
          slot: 'type'
        },
        {
          title: '用户名',
          key: 'name'
        },
        {
          title: '操作',
          key: 'action',
          slot: 'action'
        }
      ],
      listData: [
        {
          id: '001',
          type: '2',
          name: '系统管理员xxx',
        },
         {
          id: '002',
          type: '3',
          name: '客户负责商',
        },
         {
          id: '003',
          type: '4',
          name: '员工xxx',
        }
      ]
    }
  },
  methods: {
    detail(id) {
      this.$router.push({ name: 'account_detail', params: { id: id }})
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
