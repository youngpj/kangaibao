<template>
    <div id="cup-radio">
        <input v-resetInput type="radio" v-model="hospitalVal" id="choose-one" value="3">
        <label for="choose-one" @click="chooseHospital">30<span>万</span></label>
        <input v-resetInput type="radio" v-model="hospitalVal"  id="choose-two" value="2">
        <label for="choose-two" @click="chooseHospital">12<span>万</span></label>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                hospitalVal: this.hospitalChoose
            }
        },
        props:['hospitalChoose'],
        mounted() {
            this.$emit("chooseHospital", this.hospitalVal)
        },
        methods: {
            chooseHospital() {
                Vue.nextTick(() => {
                    this.$emit("chooseHospital", this.hospitalVal)
                }) 
            }
        }
    }
</script>
<style scoped>
    #cup-radio {
        position: relative;
        width: 3.733333rem;
    }
    
    #cup-radio label {
        position: absolute;
        /* display: inline-block; */
        top: 50%;
        margin-top: -0.426667rem;
        border: 1px solid #f9d1d0;
        border-radius: .453333rem;
        width: 1.76rem;
        height: .853333rem;
        line-height: .8rem;
        text-align: center;
        font-family: PingFangSC-Medium;
        font-size: .533333rem;
        color: #F09794;
        box-sizing: border-box;
    }
    
    #cup-radio label span {
        font-size: .373333rem
    }
    
    #cup-radio label:nth-of-type(1) {
        left: 0;
    }
    
    #cup-radio label:nth-of-type(2) {
        left: 50%;
    }
    
    #cup-radio input {
        display: none;
    }
    
    #cup-radio input:checked+label {
        background-image: linear-gradient(-55deg, #fb6763 11%, #f3a8a6 92%);
        color: #FFFFFF;
    }
</style>