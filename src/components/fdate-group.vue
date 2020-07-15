<template>
    <div class="checkbox-group">
        <div class="name-container">{{label}}</div>
        <div class="check-container">
            <div class="check-item">
                <input v-resetInput type="date" :value="currentValue" @input="handleInput" :placeholder="placeholder"/>
                <!-- <calendar
                    :value="currentValue"
                    :defaultDate="new Date()"
                    @change="handleInput">
                </calendar> -->
                <label>{{value || placeholder}}</label>
            </div>
            
        </div>
        <div class="desc-content">{{desc}}</div>
        <img src="../assets/image/jiantouxia.png" alt="" class="arrow-xia" v-show="!desc">
    </div>
</template>
<script>
export default {
    data: function() {
        return {
            currentValue: this.value
        }
    },
    mounted() {
        
    },
    props: ["label", "desc", "value", "placeholder"],
    methods: {
        handleInput(evt) {
            var value = event.target.value;
            this.$emit('input', value);
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
        font-size: .373333rem;
        color: #333;
        margin-right: .2rem;
    }

    .check-container{
        float: left;
    }

    .check-item{
        position: relative;
        float: left;
        width: 5rem;
        height: .746667rem;
        line-height: .746667rem;
        border-radius: .373333rem;
        /* overflow: hidden; */
        margin: 0 .10rem;
        text-align: left;
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
        /* border: 1px solid #FFA12D; */
    }

    .check-item label{
        display: block;
        position: absolute;
        width: 100%;
        height: 100%;
        left: 0px;
        top: 0px;
        text-align: left;
        color: #333;
        font-size: .373333rem;
        /* border: 1px solid #d6d6d6; */
        border-radius: .373333rem;
        line-height: .8rem;
    }

    .desc-content{
        position: absolute;
        right: 0;
        /* float: right; */
        font-size: .373333rem;
        color: #646464;
    }

    .arrow-xia{
        position: absolute;
        top: 50%;
        right: .133333rem;
        transform: translateY(-50%);
        width: .373333rem;
    }
</style>