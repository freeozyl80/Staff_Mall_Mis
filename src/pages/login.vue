<template>
  <div class="mg-login">
    <div class="mg-login-area">
        <h2>超级管理员登录系统</h2>

        <Form ref="formValidate" :rules="ruleValidate" :model="formValidate" :label-width="60" class="mg-form">

          <FormItem class="mg-form-item" label="用户名" prop="account" required>
            <Input v-model="formValidate.account" placeholder="请输入用户名"></Input>
          </FormItem>

          <FormItem class="mg-form-item" label="密码" prop="pwd" required>
            <Input v-model="formValidate.pwd" placeholder="请输入密码" type="password"></Input>
          </FormItem>

          <FormItem class="mg-submit">
            <Button type="primary" @click="handleSubmit('formValidate')">登录</Button>
          </FormItem>

        </Form>

    </div>
  </div>
</template>

<script>
import { AdiminLogin } from '@src/service/account'
export default {
  name: 'Login',
  mounted() {
    console.log('This is Login Page')
  },
   data () {
    return {
      formValidate: {
        account: '',
        pwd: ''
      },
      ruleValidate: {
        account: [
          { required: true, message: '请输入用户名', trigger: 'blur' }
        ],
        pwd: [
          { required: true, message: '请输入密码', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    handleSubmit (name) {
      let me = this;
      me.$refs[name].validate((valid) => {
        if (valid) {
          AdiminLogin({
            name: me.formValidate.name,
            pwd: me.formValidate.pwd
          }).then((res) => {
            if(res && res.ok) {
              me.$Message.success('登录成功!');
            } else {
              me.$Message.success('登录失败!');
            }
          })

        } else {
          me.$Message.error('请检查输入!');
        }
      })
    }
  }
}
</script>
<style lang="less" scoped>
.mg-login {
  background: #2DB7F5;
  width: 100%;
  height: 100%;
  .mg-login-area {
    background: #fff;
    width: 400px;
    height: 300px;
    position: relative;
    margin-left: -200px;
    left: 50%;
    top: 20%;
    padding: 20px;
    border-radius: 10px;
    .mg-form {
      margin-top: 50px;
      .mg-form-item {
        margin: 40px 0;
      }
      .mg-submit {
        text-align: right;
      }
    }
  }
}
</style>
