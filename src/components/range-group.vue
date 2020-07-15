<template>
    <div class="range-group">
        <input v-resetInput type="range" @input="onRange" @touchstart="onTouchstart" @touchend="onTouchend" :value="value * kedu" />
        <div class="kedu-container">
            <div class="kedu-item" v-for="(item, index) in params" :key="index" :style="{ left: index / (params.length - 1) * 100 + '%' }" :class="{'active': val >= index * kedu}" @click="onClickKedu(index)"></div>
        </div>
        <div class="move" :style="{left: val + '%'}">|||</div>
        <div class="progress-line" :style="{width: val + '%'}"></div>
        <div class="label" v-for="(item, index) in params" :key="index" :style="{ 'left': (kedu * index) + '%' }" :class="{'active': checkIndex == index && index != 0, 'forbid': forbid && index !== 0}"><span>￥</span>{{item.label}}</div>
    </div>
</template>
<script>
export default {
    data: function() {
        
        return {
            val: this.value * (100 / (this.params.length - 1)),
            isTouch: false,
            kedu: 100 / (this.params.length - 1),
            checkIndex: this.value,
        }
    },
    beforeMount() {
       
    },
    props: ['params', 'value', 'forbid'],
    methods: {
        onRange(evt) {
            if (this.forbid) return;
            var value = evt.target.value;
            this.val = value;
            setTimeout(() => {
                if (this.isTouch) return;
                var n = Math.round(this.val / this.kedu);
                this.val = n * this.kedu;
                this.checkIndex = n;
                this.$emit('input', n);
            }, 100)
        },
        onTouchstart() {
            this.isTouch = true;
        },
        onTouchend() {
            var n = Math.round(this.val / this.kedu);
            this.val = n * this.kedu;
            this.checkIndex = n;
            this.$emit('input', n);
            this.isTouch = false;
        },
        onClickKedu(n) {
            this.val = n * this.kedu;
            this.checkIndex = n;
            this.$emit('input', n);
        }
    },
    watch: {
        'value'(value) {
            this.checkIndex = value;
            this.val =  value * this.kedu;
        },
        'forbid'(value) {
            if (value) {
                // this.checkIndex = 0;
                // this.val = 0;
                // this.value = 0;
                this.$emit('input', 0);
            }
        }
    }
}
</script>
<style scoped>
.range-group{
    position: relative;
    width: 8rem;
    height: 1.76rem;
    margin: 0 auto;
    padding-top: .586667rem;
    
}

.range-group input{
    position: absolute;
    width: 100%;
    outline: none;
}

.label{
    position: absolute;
    top: -0.4rem;
    left: 0;
    transform: translateX(-50%);
    font-size: .373333rem;
}

.label:nth-child(2){
    transform: translateX(-30%);
}

.label:nth-child(4){
    transform: translateX(-60%);
}

.label:last-child{
    transform: translateX(-70%);
}

.label.active{
    color: #FFA000;
    font-size: .746667rem;
    top: -0.8rem;
}

.label span{
    font-size: .373333rem;
}

input[type=range] {
    -webkit-appearance: none;
    width: 100%;
    border-radius: 10px; 
}
input[type=range]::-webkit-slider-thumb {
    /* -webkit-appearance: none; */
}   

input[type=range]::-webkit-slider-runnable-track {
    height: .16rem;
    border-radius: .08rem; /*将轨道设为圆角的*/
    background: #FFEDDD;
}

input[type=range]::-webkit-slider-thumb {
    -webkit-appearance: none;
    height: 1.2rem;
    width: 1.2rem;
    margin-top: -.466667rem; /*使滑块超出轨道部分的偏移量相等*/
    background: #FFA12D; 
    /* border-radius: 50%; 外观设置为圆形 */
    box-shadow: 0 1px 6px 0 #FFCA8E;
    opacity: 0;
    border:none;    
    position: relative;
    z-index: 2;
}

.move{
    display: block;
    position: absolute;
    top: 10px;
    height: .8rem;
    width: .8rem;
    background: #FFA12D; 
    border-radius: 50%; /*外观设置为圆形*/
    box-shadow: 0 1px 6px 0 #FFCA8E;
    z-index: 1;
    transform: translate(-50%, 0);
    line-height: .8rem;
    text-align: center;
    color: #fff;
    letter-spacing: 1px;
    font-size: 12px;
    pointer-events: none;
}

.progress-line{
    position: absolute;
    height: .133333rem;
    border-radius: .106667rem; /*将轨道设为圆角的*/
    background-color: #FFA12D;
    pointer-events: none;
}

.forbid{
    color: #c4c4c4;
}

.kedu-container{
    position: absolute;
    left: 0;
    width: 100%;
    height: .16rem;
}

.kedu-item{
    position: absolute;
    /* left: 0; */
    top: 50%;
    transform: translate(-50%, -50%);
    height: .32rem;
    width: .32rem;
    background: #FFD5B0;
    border-radius: 50%;
}

.kedu-item::after{
    content: '';
    display: block;
    height: .8rem;
    width: .8rem;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
}

.kedu-item.active{
    background-color: #FFA12D;
}


</style>