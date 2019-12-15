<template>
  <div class="mg-detail">

  <Breadcrumb>
      <BreadcrumbItem to="/home">首页</BreadcrumbItem>
      <BreadcrumbItem to="/home/association_list">合作机构列表</BreadcrumbItem>
      <BreadcrumbItem>{{$route.query.firmname}}: 员工列表</BreadcrumbItem>
  </Breadcrumb>

  <Button type="primary" style="margin:30px 0 30px;" @click="importStaff()">+ 导入员工列表</Button>
      &nbsp;&nbsp;&nbsp;
  <Button type="default" style="margin:30px 0 30px;" @click="addStaff()">+ 新增单个员工</Button>
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      <span>福利点数调整：</span>&nbsp;
  <Input v-model="coin" placeholder="福利点数值" style="width: 100px" />
      &nbsp;
  <Button type="warning" style="margin:30px 0 30px;" @click="addCoin()">+ 批量增加福利点数</Button>

   <Table :columns="columns" :data="listData">
     <template slot-scope="{ row, index }" slot="action">
         <Button  v-if="row.auth2 == '1000'" class="mg-button" type="default" size="small" @click="delegate(row, 'off')">取缔管理员</Button>
         <Button  v-if="row.auth2 != '1000'" class="mg-button" type="primary" size="small" @click="delegate(row, 'on')">设定为管理员</Button>
         &nbsp; &nbsp; &nbsp;
        <Button class="mg-button" type="default" size="small" @click="staff(row, 'on')">staff操作</Button>

         &nbsp; &nbsp; &nbsp;
        <Button class="mg-button" type="warning" size="small" @click="reset(row)">密码重置</Button>
      </template>
   </Table>

    <template>
        <Page :total="total" show-sizer=false :page-size="pageData.pageSize" :current="pageData.pageIndex" @on-change="jump"/>
    </template>
  </div>
</template>

<script>


import { accountList, staffList, delegateFirm, deliverStaffCoins } from '@src/service/firm'

import { accountRest } from '@src/service/account'

export default {
  name: 'AssociationAccount',
  data() {
    return {
      total: 0,
      pageData: {
        pageSize: 20,
        pageIndex: 1
      },
      coin: 0,
      columns: [
        {
          title: '用户id',
          key: 'uid'
        },
        {
          title: '账户名',
          key: 'username'
        },
        {
          title: '真实姓名',
          key: 'realname'
        },
        {
          title: '手机号',
          key: 'tel'
        },
        {
          title: '福利币点数',
          key: 'coin'
        },
        {
          title: '操作',
          key: 'action',
          slot: 'action',
          width: 500
        }
      ],
      listData: [
      ]
    }
  },

  watch: {
    '$route' (to, from) {
      let me = this;
      if(to == 'association_staff') {
        me.fetch()
      }
    }
  },
  mounted() {
    let me = this;
    me.fetch()
  },
  methods: {
    importStaff() {
      this.$router.push({ name: 'account_import', query: { fid: this.$route.query.fid, firmname: this.$route.query.firmname, from: this.$route.name }})
    },
    jump(num) {
      let me = this
      me.pageData.pageIndex = num
      me.fetch(me.pageData.pageIndex, me.pageData.pageSize)
    },
    fetch(index, size) {
      let me = this;
      Promise.all([
        accountList({
          // staffList({
          auth1: me.$route.query.fid,
          pageIndex: index || me.pageData.pageIndex,
          pageSize: size || me.pageData.pageSize
        }),
        staffList({
          auth1: me.$route.query.fid,
          pageIndex: index || me.pageData.pageIndex,
          pageSize: size || me.pageData.pageSize
        })
      ]).then(result => {
        let isReady = true;
        result.forEach(res => {
          if(res.ok) {
          } else {
            isReady = false;
            me.$Message.error(res.errorMsg + ":" + res.info);
          }
        });
        if (isReady) {
          let accountList = result[0].data.list || [];
          let staffList = result[1].data.list || [];

          const listData =  staffList.map(staff => {
            let accountOutput = staff;
            accountList.forEach(account => {
              if (staff.uid === account.uid) {
                accountOutput = {...staff, ...accountOutput};
              }
            });
            return accountOutput;
          });

          me.listData = listData || [];
          me.total = result[1].data.total;
        }
      });

      // accountList({
      // // staffList({
      //   auth1: me.$route.query.fid,
      //   pageIndex: index || me.pageData.pageIndex,
      //   pageSize: size || me.pageData.pageSize
      // }).then((res) => {
      //   if(res.ok) {
      //     me.listData = res.data.list || []
      //     me.total = res.data.total
      //   } else {
      //     me.$Message.error(res.errorMsg + ":" + res.info);
      //   }
      // })
      //
      // staffList({
      //   auth1: me.$route.query.fid,
      //   pageIndex: index || me.pageData.pageIndex,
      //   pageSize: size || me.pageData.pageSize
      // }).then((res) => {
      //   if(res.ok) {
      //     me.listData = res.data.list || []
      //     me.total = res.data.total
      //   } else {
      //     me.$Message.error(res.errorMsg + ":" + res.info);
      //   }
      // })
    },
    delegate(item, type) {
      let me = this;
      this.$Modal.confirm({
        render: (createElement) => {
          var self = this;
          return createElement('div', [
              createElement('h2', '确认操作'),
              createElement('h4', type=='off'?'请确认取缔管理员？':'请确认设定管理员？')
          ]);
        },
        onOk() {
          delegateFirm({
            type: type,
            auth1: me.$route.query.fid,
            uid: item.uid,
            uanme: item.username
          }).then((res) => {
            if(res.ok) {
              me.$Message.success('管理员操作成功');
              setTimeout(() => {
                me.fetch()
              }, 2000)
            } else {
              me.$Message.error(res.errorMsg + ":" + res.info);
            }
          })
        },
        onCancel() {
          console.log('取消')
        }
      })
      return
    },
    staff(item) {
      let me = this;
      me.$router.push({
        name: 'association_staff',
        query: {
          mode: 'edit',
          fid: me.$route.query.fid,
          firmname: me.$route.query.firmname,
          uid: item.uid
        }
      })
    },
    addStaff() {
      let me = this;
      me.$router.push({
        name: 'association_staff',
        query: {
          mode: 'new',
          fid: me.$route.query.fid,
          firmname: me.$route.query.firmname
        }
      })
    },
    addCoin() {
      let me = this;
      let uids = me.listData.map((staff) => {
        return staff.uid
      })
      this.$Modal.confirm({
        render: (createElement) => {
          var self = this;
          return createElement('div', [
              createElement('h2', '确认操作'),
              createElement('h4', `确认批量添加员工福利点数${me.coin}?`)
          ]);
        },
        onOk() {
          deliverStaffCoins({
            fid: me.$route.query.fid,
            coin: me.coin,
            uids: uids
          }).then ((res) => {
            if(res.errorCode == 0) {
               me.$Message.success('员工福利点数操作成功:');
               me.fetch()
            } else {
              me.$Message.error(res.errorMsg + ":" + res.info);
            }
          }, () => {
            me.$Message.error('员工福利点数操作失败');
          })
        }
      })
    },
    reset(row) {
      let me = this;
      this.$Modal.confirm({
        render: (createElement) => {
          var self = this;
          return createElement('div', [
              createElement('h2', '确认操作'),
              createElement('h4', `重置操作后，账号(${row.username})密码将为6个0`)
          ]);
        },
        onOk() {
          console.log('密码重置')
          accountRest({
            uid: row.uid
          }).then((res) => {
            if(res.errorCode == 0) {
               me.$Message.success('员工账号密码初始化成功');
            } else {
              console.log(res)
              me.$Message.error(res.errorMsg + ":" + res.info);
            }
          }, () => {
            me.$Message.error('员工账号密码初始化失败');
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
