<template>
    <div class="select-group">
        <label for="">{{label}}</label>
        <!-- <div class="value-container"> -->
        <select v-resetInput :value="value" @input="handleInput" :class="{'empty': !value, 'dirty': !value && selfDirty}" @blur="onBlur">
            <option value="">{{placeholder}}</option>
            <option v-for="(item, index) in options" :key="index" :value="item.value" :selected="item.value == value ? 'selected' : ''">{{ item.label }}</option>
        </select>

        <!-- <div class="ps-container" v-show="!value && selfDirty ">
            <p class="ps">*{{placeholder || '选项不能为空'}}</p>
        </div> -->
        <!-- </div> -->

        <img src="../assets/image/jiantouxia.png" alt="" class="arrow-xia">
    </div>
</template>
<script>
    export default {
        data: function() {
            return {
                currentValue: this.value,
                selfDirty: false
            };
        },
        props: ["value", "label", "placeholder", "options", "dirty"],
        methods: {
            handleInput(evt) {
                var value = event.target.value;
                this.$emit("input", value);
            },
            onBlur() {
                this.selfDirty = true;
            }
        },
        watch: {
            dirty: function(v) {
                if (v) this.selfDirty = true;
            }
        }
    };
</script>
<style scoped>
    .select-group {
        position: relative;
        background-color: #fff;
        padding: 0.32rem 0 0.266667rem;
        border-top: 1px solid #eee;
        clear: both;
        overflow: hidden;
    }
    
    select {
        position: absolute;
        /* float: left; */
        border: none;
        left: 2.76rem;
        font-size: 0.373333rem;
        color: #333;
        outline: none;
        line-height: 0.586667rem;
        width: 100%;
        background: transparent;
    }
    
    label {
        float: left;
        font-size: 0.373333rem;
        color: #333333;
        width: 2.86667rem;
        /* margin-right: 0.266667rem; */
    }
    
    .arrow-xia {
        position: absolute;
        top: 50%;
        right: 0.133333rem;
        transform: translateY(-50%);
        width: 0.373333rem;
    }
    
    .empty {
        color: #858585;
    }
    
    .value-container {
        position: relative;
        float: left;
        /* height: 100%; */
    }
    
    .ps-container {
        position: absolute;
        font-size: 0.32rem;
        color: #ff0000;
        bottom: -0.026667rem;
        left: 1.466667rem;
        /* transform: scale(.9); */
    }
    
    option {
        color: #333;
    }
    
    select.dirty {
        color: #ff0000;
    }
</style>