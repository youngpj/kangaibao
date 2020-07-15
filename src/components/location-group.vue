<template>
    <div class="location-group">
        <label>{{ label }}</label>
        <img src="../assets/image/location.png" class="icon"/>
        <div class="city">{{ city }}</div>
        <div class="input-container">
            <input v-resetInput type="text" :class="{'dirty': selfDirty}" :value="value" @input="handleInput" :placeholder="placeholder" @focus="onFocus" @blur="onBlur">
            <!-- <div class="ps-container" v-if="selfDirty">
                <p class="ps" v-if="!value">*{{placeholder || '选项不能为空'}}</p>
            </div> -->
        </div>
        
    </div>
</template>
<script>
    var u = navigator.userAgent;
    var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
    var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端

    export default {
        data: function() {
            return {
                currentValue: this.value,
                selfDirty: false,
                isFocus: false
            }
        },
        props: ['value', 'label', 'placeholder', 'city', 'dirty'],
        methods: {
            handleInput(evt) {
                var value = event.target.value;
                console.log(value);
                this.$emit('input', value);
            },
            onFocus(evt) {
                if (isAndroid) {
                    setTimeout(() => {
                        evt.target.scrollIntoView();
                    }, 1000);
                }
                this.isFocus = true;
            },
            onBlur() {
                this.selfDirty = true;
                this.isFocus = false;
            }
        },
        watch: {
            'dirty': function(value) {
                value && (this.selfDirty = true);
            },
            'value': function() {
                this.selfDirty = true;
            }
        }
    }
</script>
<style scoped>
    .location-group {
        background-color: #fff;
        padding: .32rem 0 .266667rem;
        border-top: 1px solid #eee;
        clear: both;
        overflow: hidden;
    }
    
    input {
        float: left;
        border: none;
        font-size: .373333rem;
        color: #333;
        outline: none;
        line-height: 22px;
        -webkit-user-select: auto;
    }
    
    label {
        float: left;
        width: 1.866667rem;
        font-size: .373333rem;
        color: #333333;
        /* margin-right: .266667rem; */
    }
    
    img.icon {
        float: left;
        width: .346667rem;
        margin-right: .266667rem;
    }
    
    .city {
        float: left;
        position: relative;
        /* top: .053333rem; */
        font-size: .373333rem;
        margin-right: 8px;
    }
    
    .input-container {
        position: relative;
        float: left;
        height: 100%;
        width: 4rem;
    }
    
    .ps-container {
        position: absolute;
        font-size: .32rem;
        color: #FF0000;
        bottom: -.266667rem;
        /* transform: scale(.9); */
    }
    
    input.dirty::-webkit-input-placeholder {
        color: #ff0000;
    }
</style>