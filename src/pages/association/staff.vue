<template>
  <div class="mg-staff">

    <Breadcrumb>
      <BreadcrumbItem to="/home">首页</BreadcrumbItem>
      <BreadcrumbItem to="/home/association_list">合作机构列表</BreadcrumbItem>
      <BreadcrumbItem :to="'/home/association_account?fid='+ $route.query.fid +'&firmname=' + $route.query.firmname">{{$route.query.firmname}}: 员工列表</BreadcrumbItem>
      <BreadcrumbItem>机构{{$route.query.firmname}}：员工操作页面</BreadcrumbItem>
    </Breadcrumb> 

    <br/>
    <div v-if="isEdit">
      <div class="staff-info">
        <div>staff 姓名: <span>{{staffInfo.username}}</span></div>
        <div>剩余福利点数: <span>{{staffInfo.coi}}</span></div>
      </div>
      <div style="max-width: 500px; text-align: left">
      </div>

      <Form ref="formData" :model="formData" :rules="rules" :label-width="100" width="400">

        <FormItem label="增加福利点数" prop="coin">
          <Input v-model="formData.coin" placeholder="输入coin" number></Input>
        </FormItem>

        <FormItem>
          <Button type="primary" @click="handleSubmit('formData')">确定</Button>
        </FormItem>

      </Form>
    </div>

    <div v-else>
      <Form ref="formAddData" :model="formAddData" :rules="addRules" :label-width="100" width="400">

        <FormItem label="员工账号名称" prop="username">
          <Input v-model="formAddData.username" placeholder="输入员工账号名称（英文拼音）"></Input>
        </FormItem>


        <FormItem label="员工姓名" prop="userRealname">
          <Input v-model="formAddData.userRealname" placeholder="输入员工姓名"></Input>
        </FormItem>

        <FormItem label="员工密码" prop="password">
          <Input v-model="formAddData.password" placeholder="输入员工密码"></Input>
        </FormItem>

        <FormItem>
          <Button type="primary" @click="handleAddSubmit('formAddData')">确定</Button>
        </FormItem>

      </Form>
    </div>
  </div>
</template>

<script>
import { getStaffInfo, deliverStaffCoin, addStaff } from '@src/service/firm'

export default {
  name: 'staffDetail',
  data() {
    const isEdit = Boolean(this.$route.query.mode != 'new');

    const validateCoin = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('coin cannot be empty'));
      }
      if (!Number.isInteger(value)) {
        callback(new Error('Please enter a numeric value'));
      } else {
        if (value < 0) {
          callback(new Error('Must be over of o coin'));
        } else {
          callback();
        }
      }
    }
    return {
      isEdit: isEdit,
      staffInfo: {},
      formData: {
        coin: 100
      },
      formAddData: {
        username: '',
        userRealname: '',
        password: null
      },
      rules: {
        coin: [
         { validator: validateCoin, trigger: 'blur' }
        ]
      },
      addRules: {
        username: [
          { required: true, message: '账号名称不能为空', trigger: 'blur' }
        ],
        userRealname: [
          { required: true, message: '用户姓名不能为空', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '密码不能为空', trigger: 'blur' }
        ]
      }
    }
  },
  mounted() {
    console.log('This is staffDetail')
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
    fetch() {
      let me = this;
      if (me.isEdit) {
        getStaffInfo({
          fid: me.$route.query.fid,
          uid: me.$route.query.uid
        }).then((res) => {
          if(res.ok) {
            me.staffInfo = res.data.info
          } else {
            me.$Message.error(res.errorMsg + ":" + res.info);
          }
        })
      }
    },
    handleAddSubmit(name) {
      let me = this;
      this.$Modal.confirm({
        render: (createElement) => {
          var self = this;
          return createElement('div', [
              createElement('h2', '确认操作'),
              createElement('h4', `确认创建员工${me.formAddData.username}?`)
          ]);
        },
        onOk() {
          me.$refs[name].validate((valid) => {
            if (valid) {
              addStaff({
                fid: me.$route.query.fid,
                username: me.formAddData.username,
                userRealname: me.formAddData.userRealname,
                password: me.formAddData.password
              }).then ((res) => {
                if(res.errorCode == 0) {
                   me.$Message.success('员工创建成功:');
                   setTimeout(() => {
                    me.$router.push({ 
                      name: 'association_account',
                      query: {
                        fid: me.$route.query.fid,
                        firmname: me.$route.query.firmname
                      }
                    })
                   }, 2000)
                } else {
                  me.$Message.error(res.errorMsg + ":" + res.info);
                }
              }, () => {
                me.$Message.error('员工创建成功失败');
              })
            } else {
              me.$Message.error('请检查填写');
            }
          })
        }
      })
    },
    handleSubmit(name) {
      let me = this;
       this.$Modal.confirm({
        render: (createElement) => {
          var self = this;
          return createElement('div', [
              createElement('h2', '确认操作'),
              createElement('h4', `确认添加员工福利点数${me.formData.coin}?`)
          ]);
        },
        onOk() {
          me.$refs[name].validate((valid) => {
            if (valid) {
              deliverStaffCoin({
                fid: me.$route.query.fid,
                uid: me.$route.query.uid,
                coin: me.formData.coin
              }).then ((res) => {
                if(res.errorCode == 0) {
                   me.$Message.success('员工福利点数操作成功:');
                   me.fetch()
                } else {
                  console.log(res)
                  me.$Message.error(res.errorMsg + ":" + res.info);
                }
              }, () => {
                me.$Message.error('员工福利点数操作失败');
              })
            } else {
              me.$Message.error('请检查填写');
            }
          })
        }
      })
    }
  }
}
</script>
<style lang="less" scoped>
.mg-staff{
  padding: 40px;
  text-align: left;
}
.staff-info {
  margin-top: 30px;
  font-size: 16px;
  div {
    margin: 20px 0;
  }
}
</style>
