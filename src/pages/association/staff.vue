<template>
  <div class="mg-staff">

    <Divider orientation="left">机构{{$route.query.firmname}}：员工操作页面</Divider>
      <div class="staff-info">
        <div>staff 姓名: <span>{{staffInfo.username}}</span></div>
        <div>剩余福利点数: <span>{{staffInfo.coi}}</span></div>
      </div>
    <div style="max-width: 500px; text-align: left">
    </div>

      <Form ref="formData" :model="formData" :rules="rules" :label-width="100" width="400">

        <FormItem label="更新福利点数" prop="coin">
          <Input v-model="formData.coin" placeholder="输入coin" number></Input>
        </FormItem>

        <FormItem>
          <Button type="primary" @click="handleSubmit('formData')">确定</Button>
        </FormItem>

      </Form>
  </div>
</template>

<script>
import { getStaffInfo, deliverStaffCoin } from '@src/service/firm'

export default {
  name: 'staffDetail',
  data() {
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
      staffInfo: {},
      formData: {
        coin: 100
      },
      rules: {
        coin: [
         { validator: validateCoin, trigger: 'blur' }
        ]
      }
    }
  },
  mounted() {
    console.log('This is staffDetail')
  },
  watch: {
    '$route': 'fetch'
  },
  mounted() {
    let me = this;
    me.fetch()
  },
  methods: {
    fetch() {
      let me = this;
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
    },
    handleSubmit(name) {
      let me = this;
      this.$refs[name].validate((valid) => {
        if (valid) {
          deliverStaffCoin({
            fid: me.$route.query.fid,
            uid: me.$route.query.uid,
            coin: me.formData.coin
          }).then ((res) => {
            if(res.errorCode == 0) {
               me.$Message.success('员工福利点数操作成功:');
               me.fetch()
            }
          }, () => {
            me.$Message.error('员工福利点数操作失败');
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
