<template>
  <div class="welcome-area">
    <Steps :current="0" direction="vertical" class="step">
        <Step title="步骤一" content="合作机构管理-新建合作机构"></Step>
        <Step title="步骤二" content="合作机构管理-账号管理-批量添加员工"></Step>
        <Step title="步骤三" content="合作机构管理-商品管理-批量添加商品"></Step>
        <Step title="步骤四" content="合作机构管理-账号管理-设立管理员"></Step>
        <Step title="步骤五" content="合作机构管理-账号管理-分配点数"></Step>
        <Step title="步骤六" content="合作机构管理-商品管理-商品修改"></Step>
        <Step title="步骤七" content="合作机构管理-订单管理"></Step>
    </Steps>
  </div>
</template>
<style scoped>
.welcome-area{
  text-align: left;
  padding: 20px;
}
.step {
  margin-left: 50px;
  margin-top: 50px;
}
</style>
<script>
    export default {
        
    }
</script>