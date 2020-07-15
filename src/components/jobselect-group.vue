<template>
    <div class="jobselect-group select-group">
        <label for="job">{{ label }}</label>
        <div class="checked-value" @click="handleFocus" :class="{'empty': !value, 'dirty': !value && selfDirty}">
            {{value || placeholder}}
        </div>
        <img src="../assets/image/jiantouxia.png" alt="" class="arrow-xia" />

        <div class="select-container" v-show="selectVisible">
            <div class="overlay" @click="hideChecked"></div>
            <transition name="slideup">
            <div class="checked-container" v-show="checkedVisible">
                <div class="checked-header">职业</div>
                <div class="checked-item-container">
                    <div class="checked-item" :class="{'active': checkedIndex == 1}"  @click="checkTab(1)">{{ checkedOpt1 ? checkedOpt1.n : '请选择' }}</div>
                    <div class="checked-item" v-show="checkedOpt1" :class="{'active': checkedIndex == 2}"  @click="checkTab(2)">{{ checkedOpt2 ? checkedOpt2.n : '请选择'}}</div>
                    <div class="checked-item" v-show="checkedOpt2" :class="{'active': checkedIndex == 3}"  @click="checkTab(3)">{{ checkedOpt3 ? checkedOpt3.n : '请选择'}}</div>
                </div>
                <div class="opt-container" >
                    <div class="opt-item" 
                        :class="{'active': (checkedOpt1 && checkedIndex == 1 && checkedOpt1.c == item.c) || (checkedOpt2 && checkedIndex == 2 && checkedOpt2.c == item.c) || (checkedOpt3 && checkedIndex == 3 && checkedOpt3.c == item.c)}" 
                        v-for="(item, index) in cOptArr" 
                        :key="index" 
                        @click="check(item)">{{ item.n }}</div>
                </div>
            </div>
            </transition>
        </div>
    </div>
</template>
<script>
    import profession from "@/profession.js";

    export default {
        name: "jobselect",
        data: function() {
            return {
                selfDirty: false,
                selectVisible: false,
                checkedVisible: false,
                optArr1: [],
                optArr2: [],
                optArr3: [],
                checkedOpt1: null,
                checkedOpt2: null,
                checkedOpt3: null,
                cOptArr: [],
                checkedIndex: 1
            };
        },
        props: ["value", "label", "placeholder", "limit", "dirty"],
        methods: {
            filter() {
                console.log(this.value);
                if (!this.limit) {
                    this.optArr1 = profession.class1;
                    this.optArr2 = profession.class2;
                    this.optArr3 = profession.class3;
                } else {
                    var code1Arr = [];
                    var code2Arr = [];
                    profession.class3.forEach(item => {
                        if (item.t <= 4) {
                            this.optArr3.push(item);
                            var code1 = item.c.substring(0, 3);
                            var code2 = item.c.substring(0, 5);
                            if (code2Arr.indexOf(code2) == -1) {
                                code2Arr.push(code2);
                            }

                            if (code1Arr.indexOf(code1) == -1) {
                                code1Arr.push(code1);
                            }
                        }
                    });

                    profession.class2.forEach(item => {
                        if (code2Arr.indexOf(item.c) > -1) {
                            this.optArr2.push(item);
                        }
                    });

                    profession.class1.forEach(item => {
                        if (code1Arr.indexOf(item.c) > -1) {
                            this.optArr1.push(item);
                        }
                    });
                }

                this.cOptArr = this.optArr1;
            },
            handleFocus() {
                this.selectVisible = true;
                setTimeout(() => {
                    this.checkedVisible = true;
                }, 50)
            },
            hideChecked() {
                this.checkedVisible = false;
                setTimeout(() => {
                    this.selectVisible = false;
                }, 400)
            },
            check(checkedItem) {

                if (this.checkedIndex == 1) {
                    this.cOptArr = [];
                    this.checkedOpt3 = null;
                    this.checkedOpt2 = null;
                    this.checkedOpt1 = checkedItem;

                    this.optArr2.forEach(item => {
                        var code1 = item.c.substring(0, 3);
                        if (code1 == checkedItem.c) {
                            this.cOptArr.push(item);
                        }
                    });

                    this.checkedIndex = 2;
                } else if (this.checkedIndex == 2) {
                    this.cOptArr = [];

                    this.checkedOpt2 = null;
                    this.checkedOpt2 = checkedItem;

                    this.optArr3.forEach(item => {
                        var code2 = item.c.substring(0, 5);
                        if (code2 == checkedItem.c) {
                            this.cOptArr.push(item);
                        }
                    });

                    this.checkedIndex = 3;

                } else {
                    this.checkedOpt3 = checkedItem;
                    this.$emit('input', checkedItem.n);
                    this.$emit('select', checkedItem);
                    this.hideChecked();
                }


            },
            cancel(checkedItem) {
                this.cOptArr = [];
                // console.log(checkedItem.c);
                if (checkedItem.c.length == 3) {
                    this.checkedOpt1 = null;
                    this.checkedOpt2 = null;
                    this.cOptArr = this.optArr1;
                } else if (checkedItem.c.length == 5) {
                    this.checkedOpt2 = null;
                    var code1 = checkedItem.c.substring(0, 3);
                    this.optArr2.forEach(item => {
                        // console.log(item);
                        // var code1 = item.c.substring(0, 3);
                        if (code1 == item.c.substring(0, 3)) {
                            this.cOptArr.push(item);
                        }
                    });
                }
            },
            checkTab(index) {
                this.checkedIndex = index;
                if (index == 1) {
                    this.cOptArr = this.optArr1;
                } else if (index == 2) {
                    this.cOptArr = [];
                    if (this.checkedOpt1) {
                        this.optArr2.forEach(item => {
                            var code1 = item.c.substring(0, 3);
                            if (code1 == this.checkedOpt1.c) {
                                this.cOptArr.push(item);
                            }
                        });
                    }

                } else if (index == 3) {
                    this.cOptArr = [];
                    if (this.checkedOpt2) {
                        this.optArr3.forEach(item => {
                            var code1 = item.c.substring(0, 5);
                            if (code1 == this.checkedOpt2.c) {
                                this.cOptArr.push(item);
                            }
                        });
                    }
                }

                // setTimeout(() => {
                //   document.getElementsByClassName('opt-item active')[0] && document.getElementsByClassName('opt-item active')[0].scrollIntoView();
                //   document.getElementsByClassName('opt-item active')[1] && document.getElementsByClassName('opt-item active')[1].scrollIntoView();
                // })
            }
        },
        mounted() {
            // console.log(profession);
            this.filter();
            // setTimeout(() => {
            //   document.getElementsByClassName('opt-item active')[0] && document.getElementsByClassName('opt-item active')[0].scrollIntoView();
            //   document.getElementsByClassName('opt-item active')[1] && document.getElementsByClassName('opt-item active')[1].scrollIntoView();
            // })
        },
        watch: {
            dirty(v) {
                if (v) this.selfDirty = true;
            }
        }
    };
</script>
<style scoped>
    .select-group {
        position: relative;
        background-color: #fff;
        padding: 0.32rem 0 0.32rem;
        border-top: 1px solid #eee;
        clear: both;
        overflow: hidden;
        color: #333;
    }
    
    select,
    .checked-value {
        position: absolute;
        left: 1.866667rem;
        border: none;
        font-size: 0.373333rem;
        color: #333;
        outline: none;
        line-height: 0.586667rem;
        width: 6.666667rem;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
    }
    
    label {
        float: left;
        width: 1.866667rem;
        font-size: 0.373333rem;
        color: #333333;
        margin-right: 0.266667rem;
    }
    
    .arrow-xia {
        position: absolute;
        top: 50%;
        right: 0.133333rem;
        transform: translateY(-50%);
        width: 0.373333rem;
    }
    
    .select-container {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        z-index: 1;
    }
    
    .checked-container {
        position: absolute;
        bottom: 0;
        width: 100%;
        height: 10.666667rem;
        background-color: #fff;
    }
    
    .opt-container {
        overflow: auto;
        background-color: #fff;
    }
    
    .checked-item {
        float: left;
        width: 33.33%;
        line-height: 1.146667rem;
        background-color: #fff;
        padding: 0 0.533333rem;
        color: #333;
        /* border-bottom: 1px solid #eee; */
        font-size: 0.373333rem;
        /* background-image: url("../assets/image/cancel.png"); */
        background-repeat: no-repeat;
        background-size: 0.426667rem;
        background-position: right 0.4rem bottom 50%;
        text-align: center;
        height: 1.146667rem;
        text-overflow: ellipsis;
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
    }
    
    .opt-container {
        /* flex: 1; */
        background-color: #fff;
        height: 8.293333rem;
    }
    
    .opt-item {
        /* height: .933333rem; */
        padding: 0.2rem 0.5rem;
        line-height: 0.633333rem;
        background-color: #f8f8f8;
        /* padding-left: 0.533333rem; */
        color: #333;
        /* border-bottom: 1px solid #eee; */
        font-size: 0.373333rem;
    }
    
    .empty {
        color: #858585;
    }
    
    .dirty {
        color: red;
    }
    
    .overlay {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, .4);
    }
    
    .checked-header {
        font-size: .426667rem;
        text-align: center;
        padding: .32rem 0;
        border-bottom: 1px solid #EEEEEE;
    }
    
    .checked-item-container {
        clear: both;
        overflow: hidden;
        border-bottom: 1px solid #EEEEEE;
    }
    
    .checked-item.active {
        color: #E87400;
        border-bottom: 2px solid #E87400;
    }
    
    .opt-item {
        background-color: #fff;
    }
    
    .opt-item.active {
        color: #E87400;
    }
</style>