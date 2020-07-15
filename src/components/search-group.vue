<template>
    <div class="select-group">
        <label for="">{{label}}</label>
        <!-- <div class="value-container"> -->
            <div class="checked-value" @click="handleFocus" :class="{'empty': !value, 'dirty': !value && selfDirty}">
                {{value || placeholder}}
                <!-- <div class="ps-container" v-show="selfDirty ">
                    <p class="ps" v-if="!value">*{{placeholder || '选项不能为空'}}</p>
                </div> -->
            </div>       
            
        <!-- </div> -->
        <img src="../assets/image/jiantouxia.png" alt="" class="arrow-xia">     
        <div class="search-container" v-show="searchVisiable">
            <div class="overlay" ></div>
            <div class="input-container">
                <input v-resetInput type="text" class="search-input" placeholder="请输入职业关键字" @input="handleInput" @blur="onBlur"/>
            </div>
            <div class="select-container" @click="hideSelf">
                <div class="select-item" v-for="(item, index) in proArr" :key="index" @click="handleChange(item)">
                    {{item.n}}
                    <span style="color: #888;">{{`(${item.c2.n},${item.c1.n})`}}</span>
                </div>
            </div>
        </div>      
    </div>
</template>
<script>
import profession from '@/profession.js';

var filter = function(str, limit) {
    if (str.length < 2) { return };
    
    var resArr = [];

    profession.class3.forEach(item => {
        if (item.n.indexOf(str) > -1) {
            if (!limit || limit && item.t <= 4) {
                var code1 = item.c.substring(0, 3);
                var code2 = item.c.substring(0, 5);

                profession.class1.forEach(cItem => {
                    if (cItem.c == code1) {
                        item.c1 = cItem;
                    }
                });

                profession.class2.forEach(cItem => {
                    
                    if (cItem.c == code2) {
                        item.c2 = cItem;
                    }
                });

                resArr.push(item);
            }
            
        }
    });

    return resArr;
}

export default {
    data: function() {
        return {
            searchVisiable: false,
            currentValue: this.value,
            proArr: [],
            selfDirty: false
        }
    },
    props: ['value', 'label', 'placeholder', 'limit', 'dirty'],
    methods: {
        handleInput(evt) {
            var value = event.target.value;
            this.proArr = filter(value, this.limit);
        },
        handleChange(item) {
            // console.log(item);
            var code1 = item.c.substring(0, 3);
            var code2 = item.c.substring(0, 5);
            var val = '' + item.n;
            console.log(code1, code2);
            profession.class1.forEach(cItem => {
                if (cItem.c == code1) {
                    val +=  ' ' + cItem.n;
                }
            });

            profession.class2.forEach(cItem => {
                
                if (cItem.c == code2) {
                    // console.log(cItem);
                    val += ' ' + cItem.n;
                }
            });
            
            this.$emit('input', val);
            this.hideSelf();

            this.$emit('select', item);
        },
        handleFocus(evt) {
            this.searchVisiable = true;
            var parent = evt.target.parentElement;
            console.log(parent);
            var input = parent.getElementsByTagName('INPUT')[0];
            setTimeout(() => {
                input.focus();
            }, 300);
        },
        hideSelf() {
            setTimeout(() => {this.searchVisiable = false}, 300)
        },
        onBlur() {
            this.selfDirty = true;
        }
    },
    watch: {
        'dirty': function(v) {
            if (v) {
                this.selfDirty = true;
            }
        }
    }
}
</script>
<style scoped>
    .select-group{
        position: relative;
        background-color: #fff;
        padding: .32rem 0 .32rem;
        border-bottom: 1px solid #eee;
        clear: both;
        overflow: hidden;
    }

    select, .checked-value{
        position: absolute;
        left: 1.386667rem;
        border: none;
        font-size: .373333rem;
        color: #333;
        outline: none;
        line-height: .586667rem;
        width: 6.666667rem;
        white-space: nowrap;
        text-overflow: ellipsis;
        /* overflow: hidden; */
    }

    label{
        float: left;
        font-size: .373333rem;
        color: #333333;
        margin-right: .266667rem;
    }

    .arrow-xia{
        position: absolute;
        top: 50%;
        right: .133333rem;
        transform: translateY(-50%);
        width: .373333rem;
    }

    .search-container{
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: 1;
    }

    .overlay{
        position: absolute;
        left: 0;
        top: 0;
        height: 100%;
        width: 100%;
        background-color: rgba(0, 0, 0, .5);
    }

    .input-container{
        position: absolute;
        width: 100%;
        height: 1.1rem;
        background-color: #fff;
        z-index: 1;
        padding: .266667rem .533333rem;
        border-bottom: 1px solid #eee;
    }

    .input-container input{
        display: block;
        border: none;
        font-size: .4rem;
        outline: none;
        width: 100%;
        -webkit-user-select:auto;
    }

    .select-container{
        position: absolute;
        top: 1.1rem;
        bottom: 0;
        width: 100%;
        z-index: 1;
        overflow: auto;
    }

    .select-item{
        /* height: .933333rem; */
        line-height: .933333rem;        
        background-color: #f8f8f8;
        padding-left: .533333rem;
        color: #333;
        border-bottom: 1px solid #eee;
        font-size: .373333rem;
    }

    .select-item:active{
        background-color: #eee;
    }

    .empty{
        color: #858585;
    }

    .value-container{
        position: relative;
        float: left;
        height: 100%;
    }

    .ps-container{
        position: absolute;
        font-size: .32rem;
        color: #FF0000;
        bottom: -.35rem;
        /* transform: scale(.9); */
    }

    .dirty{
        color: #f00;
    }
</style>