<template>
  <section id="alt-qrcode" v-if="altVisible">
    <div class="alt-modal">
      <img src="./close.png" alt="" class="alt-close" @click="closeModal">
      <div class="alt-title">扫码添加您的专属顾问</div>
      <ul class="alt-content">
        <li>8年保险从业经验</li>
        <li>解读条款挑保险</li>
        <li>您不懂的交给我</li>
      </ul>
      <img src="./qrcode.jpg" alt="" class="alt-img">
      <div class="alt-or"><span>或者您也可以</span></div>
      <div class="alt-phone">
        <div class="alt-phone-des"> <span>拨打客服热线：</span> <span>95596</span></div>
        <a href="tel:95596" class="alt-phone-call">立即拨打</a>
      </div>
    </div>
  </section>
</template>
<script>
  export default {
    data() {
      return {

      }
    },
    props: {
      altVisible: {
        type: Boolean,
        default: true
      }
    },
    methods:{
        closeModal(){
            this.$emit("closeModal")
        }
    }
  }

</script>
<style scoped>
  #alt-qrcode {
    position: fixed;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0,.5);
    top: 0;
    left: 0;
    z-index: 999;
  }

  .alt-modal {
    width: 8.266667rem;
    height: 11.466667rem;
    background: #FFFFFF;
    border-radius: .32rem;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    margin: auto;
  }

  .alt-title {
    font-family: PingFangSC-Semibold;
    font-size: .586667rem;
    color: #333333;
    letter-spacing: 0;
    text-align: center;
    line-height: .64rem;
    margin-top: 1.28rem;
  }

  .alt-content {
    list-style: none;
    font-family: PingFangSC-Regular;
    font-size: .426667rem;
    color: #333333;
    letter-spacing: 0;
    text-align: center;
    line-height: .586667rem;
    margin-top: .613333rem;
  }

  .alt-img {
    display: block;
    width: 3.786667rem;
    height: 3.786667rem;
    margin: auto;
    margin-top: .426667rem;
  }

  .alt-or {
    font-family: PingFangSC-Regular;
    font-size: .373333rem;
    color: #A5A5A5;
    letter-spacing: 0;
    text-align: center;
    line-height: .64rem;
    position: relative;
    margin: 0 .64rem;
    margin-top: .453333rem;
    box-sizing: border-box;

  }

  .alt-or::before {
    position: absolute;
    content: "";
    height: .026667rem;
    width: 100%;
    background-color: #E4E4E4;
    left: 0;
    top: 50%;
  }

  .alt-or>span {
    position: relative;
    z-index: 2;
    background-color: #fff;
    padding: 0 .293333rem;
  }

  .alt-phone {
    display: flex;
    justify-content: space-between;
    padding: 0 .506667rem;
    font-family: PingFangSC-Regular;
    font-size: .373333rem;
    color: #333333;
    letter-spacing: 0;
    text-align: center;
    line-height: .826667rem;
    margin-top: .453333rem;
  }

  .alt-phone-des span {
    vertical-align: middle;
  }

  .alt-phone-des span:nth-child(2) {
    font-family: PingFangSC-Regular;
    font-size: .56rem;
    color: #FF5714;
    letter-spacing: 0;
    text-align: center;
  }

  .alt-phone-call {
    width: 2.506667rem;
    height: .826667rem;
    line-height: .773333rem;
    box-sizing: border-box;
    font-family: PingFangSC-Regular;
    font-size: .373333rem;
    color: #333333;
    letter-spacing: 0;
    text-align: center;
    text-decoration: none;
    background: #FFFFFF;
    border: .026667rem solid #E0E0E0;
    border-radius: .106667rem;
  }

  .alt-close {
    position: absolute;
    width: .373333rem;
    height: .373333rem;
    top: .48rem;
    right: .48rem;
  }

</style>
