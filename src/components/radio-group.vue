<template>
    <div class="checkbox-group">
        <div class="name-container">{{name}}</div>
        <div class="check-container">
            <div class="check-item" v-for="(item, index) in checkList" :key="index">
                <input v-resetInput :name="name" type="radio" :checked="item.label == value" @click="handleClick" :value="item.label"/>
                <label>{{ item.label }}</label>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data: function() {
        return {
            lastValue: this.value,
            currentValue: this.value
        }
    },
    props: ["name", "checkList", "value"],
    mounted: function() {
        
    },
    methods: {
        handleClick(evt) {
            var value = evt.target.value;
            
            if (value == this.lastValue) {
                value = '';
            } 
            this.$emit('input', value);
            this.lastValue = value;
        }
    }
}
</script>
<style scoped>
    .checkbox-group{
        position: relative;
        padding: .266667rem 0;
        border-bottom: 1px solid #eee;
        overflow: hidden;
        clear: both;
        line-height: .746667rem;
    }

    .checkbox-group:last-child{
        border-bottom: none;
    }

    .name-container{
        float: left;
        /* display: inline-block; */
        font-size: .426667rem;
        color: #333;
        margin-right: .2rem;
    }

    .check-container{
        float: right;
    }

    .check-item{
        position: relative;
        float: left;
        width: 1.6rem;
        height: .746667rem;
        line-height: .746667rem;
        border-radius: .373333rem;
        /* overflow: hidden; */
        margin: 0 .10rem;
    }

    .check-item input{
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        opacity: 0;
        background-color: transparent;
        z-index: 1;
    }

    .check-item input:checked + label{
        background: #FFA12D;
        color: #fff;
        border: 1px solid #FFA12D;
        box-shadow: 0 1px 6px 0 #FFCA8E;
    }

    .check-item label{
        display: block;
        position: absolute;
        width: 100%;
        height: 100%;
        left: 0px;
        top: 0px;
        text-align: center;
        color: #333;
        font-size: .373333rem;
        border: 1px solid #d6d6d6;
        border-radius: .373333rem;
        line-height: .8rem;
    }
</style>