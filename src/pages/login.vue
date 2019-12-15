<template>
  <div class="mg-login">
    <div class="mg-login-area">
        <h2>电商管理系统</h2>

        <Form ref="formValidate" :rules="ruleValidate" :model="formValidate" :label-width="60" class="mg-form">

          <FormItem class="mg-form-item" label="用户名" prop="account" required>
            <Input v-model="formValidate.account" placeholder="请输入用户名"></Input>
          </FormItem>

          <FormItem class="mg-form-item" label="密码" prop="pwd" required>
            <Input v-model="formValidate.pwd" placeholder="请输入密码" type="password"></Input>
          </FormItem>

          <FormItem class="mg-form-item" label="类型" prop="type">
            <RadioGroup v-model="formValidate.type">
              <Radio label="1">超级管理员</Radio>
              <Radio label="2">普通管理员</Radio>
              <Radio label="4">客服</Radio>
            </RadioGroup> 
          </FormItem>

          <FormItem class="mg-submit">
            <Button type="primary" @click="handleSubmit('formValidate')">登录</Button>
          </FormItem>

        </Form>

    </div>
    <Hfooter></Hfooter>
  </div>
</template>

<script>
import Footer from '@src/components/footer.vue'
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
        pwd: '',
        type: '2'
      },
      ruleValidate: {
        account: [
          { required: true, message: '请输入用户名', trigger: 'blur' }
        ],
        pwd: [
          { required: true, message: '请输入密码', trigger: 'blur' }
        ],
        type: [
          { required: true, message: '请选择登录类型', trigger: 'blur' }
        ]
      }
    }
  },
  components: {
    'Hfooter': Footer
  },
  methods: {
    handleSubmit (name) {
      let me = this;
      me.$refs[name].validate((valid) => {
        if (valid) {
          AdiminLogin({
            name: me.formValidate.account,
            pwd: me.formValidate.pwd,
            type: me.formValidate.type
          }).then((res) => {
            if(res && res.ok) {
              me.$Message.success('登录成功!');
              setTimeout(() => {
                me.$router.push({name: 'welcome'})
              })
            } else {
              console.log(res)
              me.$Message.error(res.errorMsg + ':' + res.info);
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
  background: #3d3744;
  width: 100%;
  height: 100%;
  .mg-login-area {
    background: #fff;
    width: 400px;
    height: 400px;
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
