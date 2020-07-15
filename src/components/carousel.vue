<template>
    <div id="carousel">
        <swiper :options="swiperOption">
            <swiper-slide>Slide 1</swiper-slide>
            <swiper-slide>Slide 2</swiper-slide>
            <swiper-slide>Slide 3</swiper-slide>
            <swiper-slide>Slide 4</swiper-slide>
            <swiper-slide>Slide 5</swiper-slide>
            <swiper-slide>Slide 6</swiper-slide>
            <swiper-slide>Slide 7</swiper-slide>
            <swiper-slide>Slide 8</swiper-slide>
            <swiper-slide>Slide 9</swiper-slide>
            <swiper-slide>Slide 10</swiper-slide>
            <div class="swiper-pagination" slot="pagination"></div>
        </swiper>
    </div>
</template>
<script>
    import 'swiper/dist/css/swiper.css'
    import {
        swiper,
        swiperSlide
    } from 'vue-awesome-swiper'
    export default {
        data() {
            return {
                swiperOption: {
                    pagination: {
                        el: '.swiper-pagination'
                    },
                    effect: 'fade',
                }
            }
        },
        components: {
            swiper,
            swiperSlide
        }
    }
</script>
<style scoped>
    .swiper-slide {
        height: 120px;
        line-height: 100px;
        text-align: center;
        background-color: #fff;
    }
</style>