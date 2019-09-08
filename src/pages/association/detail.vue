<template>
  <div class="mg-detail">

    <Divider orientation="left" v-if="!isEdit">新建 合作机构</Divider>
    <Divider orientation="left" v-if="isEdit">编辑 合作机构</Divider>

    <div style="max-width: 500px; text-align: left">
	    <Form ref="formData" :model="formData" :rules="rules" :label-width="80">

	      <FormItem label="机构简称（英文）" prop="firmName">
	        <Input v-model="formData.firmName" placeholder="输入firmName"></Input>
	      </FormItem>

	      <FormItem label="机构全称" prop="firmRealName">
	        <Input v-model="formData.firmRealName" placeholder="输入机构全称"></Input>
	      </FormItem>

           <FormItem label="机构金额" prop="balance">
          <Input v-model="formData.balance" placeholder="输入机构初始金额" type="number"></Input>
        </FormItem>

	      <FormItem>
	        <Button type="primary" @click="handleSubmit('formData')">新建合作机构</Button>
	      </FormItem>

	    </Form>
    </div>

  </div>
</template>

<script>
import {firmAdd} from '@src/service/firm.js'

export default {
  name: 'AssociationDetail',
  data() {
    let isEdit = Boolean(this.$route.query.mode != 'new')
    return {
      isEdit: isEdit,
      formData: {
        firmName: '',
        firmRealName: '',
        balance: 0
      },
      rules: {
        firmName: [
          { required: true, message: '机构名称不能为空', trigger: 'blur' }
        ],
        firmRealName: [
          { required: true, message: '机构全称不能为空', trigger: 'blur' }
        ],
        balance: [
          { required: true, message: '机构初始金额不能为空', trigger: 'blur' }
        ]
      }
    }
  },
  mounted() {
    console.log('This is AssociationDetail')
  },
  methods: {
    handleSubmit(name) {
      let me = this;
      this.$refs[name].validate((valid) => {
        if (valid) {
          firmAdd({
            firmName: me.formData.firmName,
            firmRealName: me.formData.firmRealName,
            balance: me.formData.balance
          }).then ((res) => {
            if(res.errorCode == 0) {
               me.$Message.success('机构注册成功:' + res.data.firmname + '(' + res.data.firm_realname  +')');
               setTimeout(() => {
                me.$router.push({ name: 'association_list'})
               }, 2000)
            }
          }, () => {
            me.$Message.error('机构注册失败');
          })
        } else {
          me.$Message.error('请检查填写');
        }
      })
    }
  }
}
</script>
<style lang="less" scoped>
.mg-detail{
  padding: 40px;
}
</style>
