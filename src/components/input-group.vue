<template>
    <div class="input-group">
        <label>{{ label }}</label>
        <div v-if='readonly' class='readonly'></div>
        <div class="input-container clearfix">
            <input v-resetInput type="text" :readonly="readonly" :class="{'dirty': selfDirty,'rey':readonly}" :value="value" @input="handleInput" :placeholder="placeholder" @focus="onFocus" @blur="onBlur">
            <div class="ps-container" v-show="selfDirty && !isFocus">
                <p class="ps" v-if="value && type == 'phone' && !isPhoneNo(value)">*手机号格式有误</p>
                <p class="ps" v-else-if="value && type == 'idcard' && !isCardNo(value)">*身份证号格式有误</p>
                 <p class="ps" v-else-if="value && type == 'address' && !isAddress(value)">*详细地址格式有误</p>
                   <p class="ps" v-else-if="value && type == 'name' && !isName(value)">*姓名格式有误</p>
            </div>
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
        props: ['value', 'label', 'placeholder', 'type', 'dirty','readonly'],
        methods: {
            handleInput(evt) {
                var value = event.target.value;
                this.$emit('input', value);
            },
            onFocus(evt) {
                if (isAndroid) {
                    setTimeout(() => {
                        evt.target.scrollIntoViewIfNeeded();
                    }, 1000);
                }

                this.isFocus = true;
            },
            onBlur() {
                this.selfDirty = true;
                this.isFocus = false;
                this.$emit('blur');
            },
             /**
         * 最少两个汉字，最多32个允许存在 .·最为分隔符
         */
        isName(str) {
            let pattern1 = /^[\u4e00-\u9fa5][\u4e00-\u9fa5(\.|·)]{0,30}[\u4e00-\u9fa5]+$/;
            let pattern2 = /(\.|·){2}/;
            return pattern1.test(str) && !pattern2.test(str);
        },
            isPhoneNo(tel) {
                var pattern = /^1[23456789]\d{9}$/;
                return pattern.test(tel);
            },
            isCardNo: function() {
                // 身份证号码验证
                // 验证身份证
                var powers = new Array("7", "9", "10", "5", "8", "4", "2", "1", "6", "3", "7", "9", "10", "5", "8", "4", "2");
                var parityBit = new Array("1", "0", "X", "9", "8", "7", "6", "5", "4", "3", "2");

                return function(_id) {
                    _id = _id.toUpperCase();
                    if (_id.length != 18) {
                        return false;
                    }
                    // var pattern = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
                    // return pattern.test(card);
                    _id = _id + "";
                    var _num = _id.substr(0, 17);
                    var _parityBit = _id.substr(17);
                    var _power = 0;
                    for (var i = 0; i < 17; i++) {
                        //校验每一位的合法性

                        if (_num.charAt(i) < '0' || _num.charAt(i) > '9') {
                            return false;
                            break;
                        } else {
                            //加权

                            _power += parseInt(_num.charAt(i)) * parseInt(powers[i]);
                            // //设置性别
                            // if (i == 16 && parseInt(_num.charAt(i)) % 2 == 0) {
                            // sex = "female";
                            // } else {
                            // sex = "male";
                            // }
                        }
                    }
                    //取模
                    var mod = parseInt(_power) % 11;
                    if (parityBit[mod] == _parityBit) {
                        return true;
                    }
                    return false;
                }
            }(),
            isAddress(value){
                return value.length>4
            }
        },
        watch: {
            'dirty': function(value) {
                if (value) {
                    this.selfDirty = true;
                }
            }
        }
    }
</script>
<style scoped>
    .input-group {
        position: relative;
        background-color: #fff;
        padding: .32rem 0 .266667rem;
        border-top: 1px solid #eee;
        clear: both;
        overflow: hidden;
    }
    .readonly {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
         z-index:2;
    }
    input {
        float: left;
        border: none;
        font-size: .373333rem;
        color: #333;
        outline: none;
        line-height: 22px;
        -webkit-user-select: auto;
        width: 5rem;
    }
    input.rey {
        color: #c1c1c1;
    }
     input::-webkit-input-placeholder{
        color:#858585;
    }
    label {
        float: left;
        font-size: .373333rem;
        color: #333333;
        width: 2.88rem;
        /* margin-right: .266667rem; */
    }
    
    .input-container {
        position: relative;
        /* float: left; */
        height: 100%;
        /* width: calc(100% - 1.866667rem) */
    }
    
    .ps-container {
        position: absolute;
        font-size: .32rem;
        color: #FF0000;
        right: 0;
        bottom: .106667rem;
        /* transform: scale(.9); */
    }
    
    input.dirty::-webkit-input-placeholder {
        color: #ff0000;
    }
    
    .clearfix:after {
        display: block;
        clear: both;
        content: "";
        visibility: hidden;
        height: 0;
    }
    
    .clearfix {
        zoom: 1;
    }
</style>