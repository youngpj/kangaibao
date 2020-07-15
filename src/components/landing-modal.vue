<template>
    <div class="landing-modal" v-if="landingModalVisible">
        <div class="modal">
            <span class="close" @click="close"></span>
            <template v-if="landOption==0">
                <div class="intro">
                <div class="title">0免赔是指免赔额为0元</div>
                <div class="content">
                    免赔额 是指被保险人需自行承担，保险公司不予赔偿的部分。相同条件下，免赔额越低，被保险人能获得的 赔偿越高。
                </div>
            </div>
            <div class="detail">
                <p class="example">举个例子：</p>
                小明买了个保险A，免赔额为 10,000元。小明去看病花了 8,000元（除了社保报销的），那么这次1分钱赔不到。
                小王买了康e保，免赔额为0元。小王住院花了 8,000元（除了社保报销的），按照95%的赔付比例，那么这次赔付为7,600元。
            </div>
            </template>
<template v-else>
                <div class="intro">
                <div class="title">普通门急诊医疗保障</div>
                <div class="content">
                    门急诊保障 是否选择取决于被保险人的身体健康度，如果被保险人隔三差五往医院跑，那这份保障还是少不了。
                </div>
            </div>
            <div class="detail">
                <p class="example">统计数据：</p>                
                2017年1-11月，全国三级公立医院次均门诊费用为304.2元。
                *数据来源：国家卫生健康委员会统计信息中心
            </div>
            </template>
</div>
</div>
</template>
<script>
    export default {
        data() {
            return {

            }
        },
        methods: {
            close() {
                this.$emit("closeModal")
            }
        },
        props: {
            landOption: {
                default: 1,
                type: Number
            },
            landingModalVisible: {
                default: false,
                type: Boolean
            }
        }
    }
</script>
<style scoped>
    .landing-modal {
        position: fixed;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        background-color: rgba(0, 0, 0, .4);
    }
    
    .modal {
        position: absolute;
        top: 2.773333rem;
        left: 50%;
        transform: translate3d(-50%, 0, 0);
        width: 80%;
        /* max-width: 8.4rem; */
        background: #FFFFFF;
        border-radius: .16rem;
    }
    
    .intro {
        width: 100%;
        height: 3.786667rem;
        padding: .586667rem .453333rem;
        box-sizing: border-box;
        background: url(~homeImg/home_bg.png) no-repeat 0 0/100% 100%;
    }
    
    .intro .title {
        font-family: PingFangSC-Semibold;
        font-size: .48rem;
        color: #FFFFFF;
        letter-spacing: 0;
        text-align: center;
    }
    
    .intro .content {
        font-family: PingFangSC-Medium;
        font-size: .373333rem;
        color: #FFFFFF;
        letter-spacing: 0;
        text-align: justify;
        margin-top: .373333rem;
        line-height: .586667rem;
    }
    
    .close {
        position: absolute;
        left: 50%;
        margin-left: -0.4rem;
        bottom: -1.306667rem;
        width: .773333rem;
        height: .773333rem;
        background: url(~homeImg/close.png) no-repeat 0 0/100% 100%;
    }
    
    .detail {
        padding: .4rem .453333rem .666667rem;
        font-family: PingFangSC-Regular;
        font-size: .373333rem;
        color: #8A8A8A;
        text-align: justify;
        line-height: .586667rem;
    }
    
    .detail .example {
        color: #000;
    }
</style>