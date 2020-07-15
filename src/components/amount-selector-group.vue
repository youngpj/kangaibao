<template>
    <div class="amount-selector-group">
        <div class="amount-selector-title">
            请选择保障金额
        </div>
        <div class="select-container">
            <div class="select-item" :class="{'active': value == index + 1, 'off': minValue && index < minValue - 1 }" @click="select(index)" v-for="(item, index) in options" :key="index" :style="{ left: index * 100 / (options.length - 1) + '%' }">{{item}}</div>
        </div>
    </div>
</template>
<script>
export default {
    name: 'amountSelector',
    data: function() {
        return {

        }
    },
    props: ['value', 'options', 'minValue'], 
    methods: {
        select: function(index) {
            if (index < this.minValue - 1) return;
            this.$emit('input', index + 1); 
        }
    }
}
</script>
<style scoped>
.amount-selector-group{
    position: relative;
    margin: 0 .4rem;
}

.amount-selector-title{
    font-size: .373333rem;
    color: #333;
    margin-bottom: .426667rem;
}

.select-container{
    position: relative;
    height: 1.6rem;
    margin-bottom: .533333rem;
    margin: 0 .666667rem;
}

.select-container::before{
    content: '';
    display: block;
    position: absolute;
    left: 0;
    top: 50%;
    height: 2px;
    width: 100%;
    background-color: #FFD6A9;
}

.select-item{
    position: absolute;
    top: 50%;
    transform: translate(-50%, -50%);
    height: .746667rem;
    line-height: .746667rem;
    text-align: center;
    width: 1.333333rem;
    background-color: #fff;
    border: 1px solid #F8D4BE;
    border-radius: .373333rem;
    color: #333333;
    font-size: .373333rem;
}

.select-item.active{
    background-color: #FF9615;
    transform: translate(-50%, -50%) scale(1.2);
    color: #fff;
    box-shadow: 0 2px 4px 0 #FFCA8E;
    font-size: .373333rem;
    border: none;
}

.select-item.off{
    background: #FFFFFF;
    border: 1px solid #EFEFEF;
    color: #C1BFBD;
}
</style>