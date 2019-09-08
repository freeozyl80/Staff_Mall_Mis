<template>
  <div class="mg-detail">
    

  <Divider orientation="left">{{$route.query.firmname}}: 员工列表</Divider>
  <Button type="primary" style="margin:30px 0 30px;" @click="importStaff()">+ 导入员工列表</Button>

   <Table :columns="columns" :data="listData">
     <template slot-scope="{ row, index }" slot="action">
        <div v-if="row.auth2 == '1000'">
         <Button class="mg-button" type="default" size="small" @click="delegate(row, 'off')">取缔管理员</Button>
        </div>
        <div v-else>
         <Button class="mg-button" type="primary" size="small" @click="delegate(row, 'on')">设定为管理员</Button>
        </div>
        <Button class="mg-button" type="default" size="small" @click="staff(row, 'on')">staff操作</Button>
      </template>
   </Table>

  </div>
</template>

<script>


import { accountList, delegateFirm } from '@src/service/firm'

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
    importStaff() {
      this.$router.push({ name: 'account_import', query: { fid: this.$route.query.fid, firmname: this.$route.query.firmname, from: this.$route.name }})
    },
    fetch() {
      let me = this;
      accountList({
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
    delegate(item, type) {
      let me = this;
      delegateFirm({
        type: type,
        auth1: me.$route.query.fid,
        uid: item.id,
        uanme: item.username
      }).then((res) => {
        if(res.ok) {
          me.$Message.success('管理员操作成功');
          setTimeout(() => {
            me.fetch()
          }, 1000)
        } else {
          me.$Message.error(res.errorMsg + ":" + res.info);
        }
      })
    },
    staff(item) {
      let me = this;
      me.$router.push({ 
        name: 'association_staff',
        query: {
          fid: me.$route.query.fid,
          firmname: me.$route.query.firmname,
          uid: item.id
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
