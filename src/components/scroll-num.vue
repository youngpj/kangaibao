<template>
    <div class="scroll-num" :class="{'val-up': upgrade, 'val-low': lowgrade}">
        <div class="left-text" v-show="leftTxt">{{leftTxt}} </div>
        <div class="right-text" v-show="rightTxt"> {{rightTxt}}</div>
        <div class="num-item" v-for="(item, index) in valArr" :key="index" :style="{backgroundPosition: pianyi +' ' + (4 - item * 15) + 'px'}"></div>
        <!-- <img src="../assets/image/up.png" class="trend-arrow" v-show="upgrade"/>
        <img src="../assets/image/down.png" class="trend-arrow" v-show="lowgrade"/> -->
    </div>
</template>
<script>
export default { 
    name: 'scrollNum',
    data: function() {
        return {
            lastVal: this.value
        }
    },
    props: ['value', 'lowgrade', 'upgrade', 'leftTxt', 'rightTxt'],
    computed: {
        'valArr': function() {
            return this.lastVal ? this.lastVal.split('') : [];
        },
        'pianyi': function() {
            if (this.upgrade) {
                return '0';
            } else if (this.lowgrade){
                return '-10px';
            } else {
                return '-18px';
            }
        }
    },
    watch: {
        'value': function(val, oldVal) {
            // console.log(val, oldVal);
            if (val.length > oldVal.length) {
                var zero = '';
                for(var i = 0, len = val.length - oldVal.length; i < len; i++) {
                    zero += '0';
                }
                console.log(zero);
                this.lastVal = zero + oldVal;
                setTimeout(() => {
                    this.lastVal = val;
                }, 5)
            } else if (val.length < oldVal.length) {
                this.lastVal = oldVal.substring(oldVal.length - val.length);
                setTimeout(() => {
                    this.lastVal = val;
                }, 5)
            } else {
                this.lastVal = val;
            }

            
        }
    },
    methods: {
        scroll() {

        }
    }
}
</script>
<style scoped>
    .scroll-num{
        position: relative;
        /* display: inline; */
        float: right;
    }

    .left-text{
        float: left;
    }

    .right-text{
        float:right;
        /* vertical-align: middle; */
        height: 19px;
        line-height: 19px;
    }

    .num-item{
        float: left;
        height: 19px;
        width: 8px;
        /* margin: 0 .026667rem; */
        background-image: url('../assets/image/number.png');
        background-size: 27px;
        background-position: 0 4px;
        background-repeat: no-repeat;
        transition: background-position-y .5s;
    }

    .scroll-num.val-up{
        color: #FF5A5E;
    }

    .scroll-num.val-low{
        color: #7ed321;
    }

    .trend-arrow{
        position: absolute;
        right: -10px;
        top: 4px;
        width: 9px;
    }
</style>