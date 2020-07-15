<template>
  <div class="page" id="home">
    <!-- <carousel></carousel> -->
    <div class="home-container">
      <div class="bg-color-containter" :class="containerBg"></div>
      <header>
        <div class="head-top">
          <h3 class="head-title">康e保</h3>
          <p class="head-content">适合每个家庭的医疗保障</p>
          <div class="head-btn">
            <span @click="openLandingModal(0)">住院0免赔
              <i></i>
            </span>
            <span @click="openLandingModal(1)">门急诊可选
              <i></i>
            </span>
          </div>
        </div>
        <img src="~homeImg/header_bg.jpg" alt="">
        <p class="head-tip">适用人群28天-60周岁，保障期限1年</p>
        <ul class="head-entrance">
          <li @click="toEconomy">
            <i></i>经适版</li>
          <li @click="toCup">
            <i></i>保温杯版</li>
          <li @click="toKangebao">
            <i></i>定制版</li>
        </ul>
        <!-- <swiper :options="swiperOption" class="head-slider"> -->
        <!-- <swiper-slide class="examine slider-item">
                        <p class="examine-content">  活动期间分享活动页面至微信好友或者朋友圈， 
就能获得一份  <span>价值470元的免费体检券。</span></p>
                        <p>*一张体检券可同时为父母两人免费体检</p>
                        <span class="check" @click="checkActDetail">查看活动详情</span>
                    </swiper-slide> -->
        <!-- <swiper-slide class="landing slider-item">
                        
                   </swiper-slide>                   -->
        <!-- <div class="swiper-pagination" slot="pagination"></div>                 -->
        <!-- </swiper> -->
      </header>
      <main>
        <ul class="main-content">
          <li>
            <div class="version-intro">
              <img src="~homeImg/version_title1.png" alt="">
              <p class="version-title">经济适用，居家必备</p>
              <div class="version-price">
                <span>¥
                  <span>87</span>
                </span>起</div>
            </div>
            <div class="version-word">
              <ul>
                <li>6万保额</li>
                <li>住院0免赔</li>
                <li>门急诊可选</li>
              </ul>
              <span @click="toEconomy2">获取保障</span>
            </div>
          </li>
          <li>
            <div class="version-intro">
              <img src="~homeImg/version_title2.png" alt="">
              <p class="version-title">送给自己的第一份保险</p>
              <p class="version-tip">高至95%赔付</p>
              <p class="version-tip">扩展社保外用药</p>
              <div class="version-price">
                <span>¥
                  <span>329</span>
                </span>起</div>
            </div>
            <div class="version-word">
              <ul>
                <li>30万/12万保额</li>
                <li>住院0免赔</li>
                <li>门急诊可选</li>
              </ul>
              <span @click="toCup2">获取保障</span>
            </div>
          </li>
          <li>
            <div class="version-intro">
              <img src="~homeImg/version_title3.png" alt="">
              <p class="version-title">自由选择，量身定制</p>
              <div class="version-price">
                <span>¥
                  <span>87</span>
                </span>起</div>
            </div>
            <div class="version-word">
              <ul>
                <li>保额自定义</li>
                <li>住院0免赔</li>
                <li>门急诊可选</li>
              </ul>
              <span @click="toKangebao2">获取保障</span>
            </div>
          </li>
        </ul>
      </main>
      <footer>
        <div class="foot-content">
          <img src="~homeImg/version_title4.png" alt="">
          <p class="foot-title">即将到来，敬请期待</p>
          <span class="foot-btn">敬请期待…</span>
        </div>
        <div class="foot-tip">
          <p>
            <span>
              <i></i>适合自己的保险，才是好保险
              <i></i>
            </span>
          </p>
          <p>康e保</p>
        </div>
      </footer>
    </div>
    <landingModal :landingModalVisible="landingModalVisible" @closeModal="closeModal" :landOption="landOption"></landingModal>
  </div>
</template>
<script src="./script.js"></script>
<style src="./style.css"></style>