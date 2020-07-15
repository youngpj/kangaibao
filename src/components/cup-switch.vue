<template>
    <div class="ios-checkbox">
        <input v-resetInput type="checkbox" id="ios-checkbox" name="emulate-ios-button" class="raw-checkbox" v-model="cupSwitch">
        <label for="ios-checkbox" class="emulate-ios-button" @click="changeSwitch"></label>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                cupSwitch: this.randcheck
            }
        },
        props:['randcheck'],
        mounted() {},
        methods: {
            changeSwitch() {
                let _this = this;
                setTimeout(function() {
                    _this.$emit("changeSwitch", _this.cupSwitch)
                }, 0);
            }
        }
    }
</script>
<style scoped>
    * {
        -webkit-tap-highlight-color: transparent;
    }
    
    .emulate-ios-button {
        display: inline-block;
        background: #fff6f6;
        border: .026667rem solid #ffffff;
        border-radius: .453333rem;
        width: 1.786667rem;
        height: .8rem;
        cursor: pointer;
        position: relative;
        -webkit-transition: all .3s ease;
        transition: all .3s ease;
    }
    
    .emulate-ios-button:after {
        content: '';
        background: #ffffff;
        border: .026667rem solid #fb6763;
        box-shadow: 0 .053333rem .106667rem 0 #deb7b6;
        width: .8rem;
        height: .8rem;
        box-sizing: border-box;
        border-radius: 100%;
        position: absolute;
        left: 0;
        top: -0.026667rem;
        -webkit-transform: translateZ(0);
        transform: translateZ(0);
        -webkit-transition: all .3s ease;
        transition: all .3s ease;
    }
    
    .emulate-ios-button:active:after {
        width: .8rem;
    }
    
    .raw-checkbox {
        height: 2rem;
        width: 2rem;
        display: none;
    }
    
    .raw-checkbox:checked+label {
        background: #f88582;
    }
    /* 这里是伪元素偏移,初始是0.9+0.05 ,所以这里1.05rem */
    
    .raw-checkbox:checked+label:after {
        left: 1.05rem;
    }
    
    .raw-checkbox:checked+label:active:after {
        left: .5rem;
    }
</style>