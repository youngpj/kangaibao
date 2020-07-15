<template>
    <div class="checkbox-group">
         <label class='item-security' v-for="(item, index) in checkList" :key="index"> 
              <input v-resetInput  type="radio" :checked="item.label == value" @click="handleClick" :value="item.label"/>
            <div>{{ item.label }}社保</div> 
            <div><img src="../assets/image/economic/right.png" alt="" class='right'></div> 
        </label> 
    </div>
</template>
<script>
    export default {
        data: function() {
            return {
                currentValue: this.value
            }
        },
        props: ["hasSecurity", "checkList", "value"],
        mounted: function() {

        },
        methods: {
            handleClick(evt) {
                var value = evt.target.value;
                this.$emit('input', value);
                this.$emit('selectSecurity', false);
            }
        }
    }
</script>
<style scoped>
    .checkbox-group {
        width: 100%;
        height: 100%;
        color: #4b9af7;
    }
    
    .item-security {
        font-size: .373333rem;
        line-height: 1.173333rem;
        border-bottom: 1px solid #EAEDFD;
        padding: 0 .693333rem 0 .853333rem;
        color: #333;
        display: flex;
        align-items: center;
        justify-content: space-between;
        position: relative;
    }
    
    .item-security:last-child {
        border-bottom: none;
    }
    
    .item-security.checked {
        color: #2861F7;
    }
    
    .checkbox-group {
        position: relative;
        padding: 0;
        border-bottom: 1px solid #eee;
        overflow: hidden;
        clear: both;
        line-height: .746667rem;
    }
    
    .checkbox-group:last-child {
        border-bottom: none;
    }
    
    .right {
        width: .373333rem;
        display: none;
    }
    
    .checkbox-group input {
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        opacity: 0;
        background-color: transparent;
        z-index: 1;
    }
    
    .checkbox-group input:checked+div {
        color: #2861F7;
    }
    
    .checkbox-group input:checked+div+div .right {
        display: block;
    }
    
    .check-item label {
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
    }
</style>