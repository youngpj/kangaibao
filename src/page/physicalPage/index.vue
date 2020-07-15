<template>
  <div class="page">
    <div class="page-wrapper">
      <div class="banner"></div>
      <div class="container">
        <div class="sec1">
          <span class="font1">活动期间分享活动页面至微信好友或者朋友圈，就能获得一份</span>
          <span class="font5">价值470元的免费体检券。</span>
        </div>
        <div class="sec2">
          <p>
            <span class="font3">*一张体检券可同时为父母两人免费体检</span></p>
         
        </div>
        <div class="btn" @click="checkDetail">查看活动详情</div>
        <div class="atag-container">
          <a href="javascript:void(0);" class="atag" @click="toQuery">查看订单信息</a>
          <a href="javascript:void(0);" class="atag" @click="backWechat">返回公众号</a>
        </div>
      </div>
    </div>
  </div>
</template>
<script src="./script.js"></script>
<style scoped src="./style.css"></style>