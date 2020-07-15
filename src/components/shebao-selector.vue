<template>
    <div class="shebao-selector" >
        <span @click="open">{{ value == '有' ? '有社保' : '无社保'}}</span>
        <transition name="fade">
            <div class="overlay" v-show="visible" @click="close"></div>
        </transition>
        <transition name="slideup">
            <div class="select-container" v-show="visible">
                <div class="select-item">
                    <div class="select-key" :class="{ 'active': value == '有' }" @click="select(true)">有社保</div>
                </div>
                <div class="select-item">
                    <div class="select-key" :class="{ 'active': value == '无'}" @click="select(false)">无社保</div>
                </div>
            </div>
        </transition>
    </div>
</template>
<script>
export default {
    name: 'shebaoSelector',
    data: function() {
        return {
            'visible': false,
            'lock': false
        }
    },
    props: ['value'],
    methods: {
        open: function() {
            if (this.lock) return;
            setTimeout(() => {
                this.visible = true;
            }, 100)
        },
        close: function() {
            this.lock = true;
            setTimeout(() => {
                this.lock = false;
            }, 400)

            setTimeout(() => {
                this.visible = false;
            }, 100)
        },
        select: function(hasShebao) {
            
            this.$emit('input', hasShebao ? '有' : '无');
            this.close();
        }
    }
}
</script>
<style scoped>
.shebao-selector{
    display: inline;
}

.overlay{
    display: block;
    position: fixed;
    left: 0;
    top: 0;
    height: 100%;
    width: 100%;
    background-color: rgba(0, 0, 0, .6);
}

.select-container{
    position: fixed;
    left: 0;
    bottom: 0;
    width: 100%;
    background-color: #fff;
}

.select-item{
    height: 1.173333rem;
    line-height: 1.173333rem;
    padding-left: .8rem;
    font-size: .373333rem;
    color: #333333;
    border-bottom: 1px solid #EAEDFD;
}

.select-item .select-key{
    transition: all .3s;
    background-position: right .693333rem top .48rem;
}

.select-item .select-key.active{
    color: #2861F7;
    background-image: url('../assets/image/gou.png');
    background-size: .373333rem;
    background-repeat: no-repeat;
    
}
</style>