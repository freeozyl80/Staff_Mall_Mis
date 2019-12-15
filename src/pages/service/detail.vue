<template>
  <div class="mg-detail">

    <Divider orientation="left">客服操作</Divider>

    <Form ref="formData" :model="formData" :rules="rules" :label-width="80">

        <FormItem label="客服名称（英文）" prop="name">
          <Input v-model="formData.name" placeholder="请输入客服名称（英文" :disabled="isEdit"></Input>
        </FormItem>

        <FormItem label="客服名称(中文)" prop="realname">
          <Input v-model="formData.realname" placeholder="输入客服名称(中文)" :disabled="isEdit"></Input>
        </FormItem>

        <FormItem label="密码" prop="pwd" v-if="!isEdit">
          <Input v-model="formData.pwd" placeholder="请输入客服密码"></Input>
        </FormItem>

        <FormItem>
          <Button v-if="!isEdit" type="primary" @click="handleSubmit('formData', 1)">新建客服</Button>
          <Button v-if="isEdit" type="primary" @click="handleSubmit('formData', 2)">下线客服</Button>
        </FormItem>

      </Form>

  </div>
</template>

<script>
import { offService, createService} from '@src/service/account'
export default {
  name: 'serviceDetail',
  data() {
    let isEdit = Boolean(this.$route.query.mode != 'new')
    return {
      isEdit: isEdit,
      formData: {
        name: this.$route.query.username || '',
        realname: this.$route.query.realname || '',
        pwd: ''
      },
      rules: {
        name: [
          { required: true, message: '客服名称不能为空', trigger: 'blur' }
        ],
        realName: [
          { required: true, message: '客服名称(中文)不能为空', trigger: 'blur' }
        ],
        pwd: [
          { required: true, message: '客服密码不能为空', trigger: 'blur' }
        ]
      }
    }
  },
  mounted() {
    console.log('This is serviceDetail')
  },
  methods: {
    handleSubmit(name) {
      let me = this;
      let fun
      if (me.isEdit) {
        fun = offService
      } else {
        fun = createService
      }
      this.$Modal.confirm({
        render: (createElement) => {
          var self = this;
          return createElement('div', [
              createElement('h2', '确认操作'),
              createElement('h4', `客服操作确认？`)
          ]);
        },
        onOk() {
          me.$refs[name].validate((valid) => {
            if (valid) {
              let formData = Object.assign({}, me.isEdit ? {
                uid: me.$route.query.uid
              }: me.formData)
              console.log(formData)
              fun(formData).then ((res) => {
                if(res.errorCode == 0) {
                   me.$Message.success('客服操作成功');
                   setTimeout(() => {
                    me.$router.push({ 
                      name: 'service_list'
                    })
                   }, 2000)
                }
              }, () => {
                me.$Message.error('客服操作失败');
              })
            } else {
              me.$Message.error('请检查填写');
            }
          })
        }
      })
    },
  }
}
</script>
<style lang="less" scoped>
.mg-detail{
  text-align: left;
  padding: 40px;
}
</style>
