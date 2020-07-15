<template>
    <div class="content">
        <div class="agent-mask" v-show="agentAlertShow">
            <div class="agent-box" :style="{width:agentBoxWidth,height:agentBoxHeight}">
                <p class="agent-title1" v-show="isAgentSelf"><span>{{agentName}}</span>先生(女士)您好</p>
                <p v-show="isAgentSelf">您是否为自己及家人投保？</p>
                <p class="qrcode-title" v-show="!isAgentSelf">扫描下方二维码</p>
                <p class="qrcode-desc" v-show="!isAgentSelf">进入代理人小程序，分享赢金币</p>
                <div class="agent-botton-box" v-show="isAgentSelf">
                    <span @click="handleNoAgentSelf">否</span>
                    <span class="agent-botton-yes" @click="handleAgentSelf">是</span>
                </div>
                <div class="agent-qrcode" v-show="!isAgentSelf"><img src="../assets/image/agent-qrcode.png"/></div>
                <div class="agent-close" @click="agentClose"><img src="../assets/image/ic_coin_close.png"/></div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data: function() {
        return {
            isAgentSelf:true,
            agentBoxWidth:'7.466667rem',
            agentBoxHeight:'4.5rem',
        };
    },
    props: ['agentAlertShow','agentName'],
    methods: {
        handleNoAgentSelf(){
            this.isAgentSelf = false;
            this.agentBoxWidth = ' 8.4rem';
            this.agentBoxHeight = '9.973333rem'
        },
        handleAgentSelf(){
            this.$emit("handleAgentSelf", "");
        },
        agentClose(){
            this.isAgentSelf=true;
            this.agentBoxWidth = '7.466667rem';
            this.agentBoxHeight = '4.5rem'
            this.$emit("handleAgentClose", "");
        },
    },
    watch: {
    }
};
</script>
<style scoped>
    .agent-mask{
        position: fixed;
        width: 100%;
        height: 100%;
        background-color: rgba(1,1,1,.5);
        z-index: 99;
    }
    .agent-box,.agent-box-qrcode{
        font-family: PingFangSC-Regular;
        font-size: 18px;
        color: #31313D;
        text-align: center;
        background-color: #fff;
        /* width: 7.466667rem;
        height: 4.426667rem; */
        position: fixed;
        left: 0;
        right: 0;
        margin: auto;
        top: 3.2rem;
        border-radius: 4px;
    }
    .agent-box-qrcode{
        /* width: 8.4rem;
        height: 9.973333rem; */
    }
    .agent-title1{
            margin-top: 30px;
    }
    .agent-botton-box{
        margin-top: 30px;
    }
    .agent-botton-box span{
        width: 3.733333rem;
        height: 1.333333rem;
        line-height: 1.333333rem;
        text-align: center;
        float: left;
        font-family: PingFangSC-Semibold;
        font-size: .48rem;
        color: #31313D;
    }
    .agent-botton-box .agent-botton-yes{
        color: #616AFE;
    }
    .qrcode-title{
        font-family: PingFangSC-Semibold;
        font-size: .48rem;
        color: #616AFE;
        margin-top: .613333rem;
    }
    .qrcode-desc{
        font-family: PingFangSC-Regular;
        font-size: .4rem;
        color: #000000;
        margin-bottom: .48rem;
    }
    .agent-qrcode{
        width: 6.533333rem;
        height: 6.533333rem;
        margin: 0 auto;
    }
    .agent-qrcode img{
        width: 100%;
        height: 100%;
        display: block;
    }
    .agent-close{
        width: .96rem;
        height: .96rem;
        position: absolute;
        bottom: -1.333333rem;
        left: 0;
        right: 0;
        margin: auto;
    }
    .agent-close img{
        width: 100%;
        height: 100%;
    }
</style>