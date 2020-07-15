<template>
    <div id="app">
        <transition :name="animation">
            <router-view class="page-container" comp-type="page"></router-view>
        </transition>
        <transition name="fade">
            <ios-loading v-show="loading" :desc="loadingDesc"/>
        </transition>
        <input v-resetInput type="hidden" input-tag="main_source" value="wechat"/>
        <input v-resetInput type="hidden" input-tag="project_name" value="康e保"/>
    </div>
</template>
<script>
    import IosLoading from "@/components/ios-loading.vue";

    export default {
        name: "app",
        data: function() {
            return {
                loading: false,
                animation: 'fade',
                loadingDesc: ''
            };
        },
        created() {
            // this.updateVuex()
        },
        components: {
            IosLoading
        },
        methods: {
            //更新vuex值至本地
            updateVuex() {
                //在页面加载时读取localStorage里的状态信息
                localStorage.getItem("storeState") && this.$store.replaceState(Object.assign(this.$store.state, JSON.parse(localStorage.getItem("storeState"))));

                //在页面刷新时将vuex里的信息保存到localStorage里
                window.addEventListener("beforeunload", () => {
                    localStorage.setItem("storeState", JSON.stringify(this.$store.state))
                })
            }
        }
    };
</script>
<style>
    * {
        margin: 0px;
        padding: 0px;
        box-sizing: border-box;
    }
    
    html,
    body {
        height: 100%;
        width: 100%;
        overflow: hidden;
    }
    
    #app {
        position: relative;
        height: 100%;
        width: 100%;
    }
    
    .page-container {
        position: absolute;
        left: 0px;
        top: 0px;
        width: 100%;
    }
    /* .page{
    position: absolute;
    height: 100%;
    width: 100%;
    background: #F17A7A;
    color: #fff;
} */
</style>