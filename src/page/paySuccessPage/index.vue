<template>
  <div class="page">
    <div class="img-container">
      <img src="../../assets/image/paysuccess.png" alt="" class="icon">
    </div>
    <div class="result">支付成功</div>
    <div class="desc">
      我们会尽快完成您的投保信息审核，您可以在订单查询页面查询您的订单状态。
    </div>
    <div class="btn" @click="toOrderList">查看订单信息</div>
    <div class="btn" @click="closeApp">返回公众号</div>
  </div>
</template>
<script src="./script.js"></script>
<style scoped src="./style.css"></style>