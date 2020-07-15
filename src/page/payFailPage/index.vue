<template>
  <div class="page">
    <div class="img-container">
      <img src="../../assets/image/payfail.png" alt="" class="icon">
    </div>
    <div class="result">支付失败</div>
    <div class="desc">
      由于不知名的原因，您的订单支付失败。您可以到[个人中心]-[保单查询]页面继续对当前订单完成支付。
    </div>
    <div class="btn" @click="toOrderList">查看订单信息</div>
    <div class="btn" @click="closeApp">返回公众号</div>
  </div>
</template>
<script src="./script.js"></script>
<style scoped src="./style.css"></style>