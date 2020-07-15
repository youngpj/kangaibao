<template>
    <div class="ecnomic-checkbox-group">
        <div >
            <div @click="openPicker">
                <!-- <input v-resetInput type="date" :value="value" @input="handleInput" :placeholder="placeholder" /> -->
                <!-- <label>{{value ? new Date(value).getFullYear() + '-' + (new Date(value).getMonth() + 1) + '-' + new Date(value).getDate() : placeholder}}</label> -->
                <label>{{value ? moment(value).format('YYYY-MM-DD')  : placeholder}}</label>
                 &nbsp;<img src="~cupImg/btn_arrow.png" alt="" class="arrow-xia" />       
            </div>
        </div>
        <mt-datetime-picker
          ref="picker" 
          type="date" 
          yearFormat="{value} 年" 
          monthFormat="{value} 月"
          dateFormat="{value} 日" 
          :startDate="startDate" 
          :endDate="endDate" 
          :value="pickerValue" 
          :visible="visiable"
          @confirm="handleConfirm">
        </mt-datetime-picker>
    </div>
</template>
<script>
    import moment from "moment";
    var nowDate = new Date();
    export default {
        data: function() {
            return {
                pickerValue: this.value ? new Date(this.value) : new Date(),
                startDate: new Date(this.option.startDate),
                endDate: this.option.endYear ?
                    new Date(
                        nowDate.getFullYear() +
                        this.option.endYear +
                        "/" +
                        (nowDate.getMonth() + 1) +
                        "/" +
                        nowDate.getDate()
                    ) : new Date(this.option.endDate),
                visiable: false
            };
        },
        mounted() {
            this.$refs.picker.$el.addEventListener('click', () => {
                if (!this.$refs.picker.visible) {
                    this.stopScroll(false);
                }
            });
        },
        props: ["label", "desc", "value", "placeholder", 'option'],

        methods: {
            moment: moment,
            openPicker() {
                this.$refs.picker.open();
                this.stopScroll(true);

                setTimeout(() => {
                    document.getElementsByClassName('v-modal')[0].addEventListener('click', () => {

                        if (!this.$refs.picker.visible) {
                            this.stopScroll(false);
                        }
                    });
                }, 100)
            },
            handleConfirm(value) {
                console.log(value);
                this.$emit("input", value);
            },
            onOpen() {
                console.log('open...');
            },
            onClose() {
                console.log('close...')
            },
            stopScroll: function() {

                var handleStopScroll = function(evt) {
                    evt.preventDefault();
                }

                return function(tag) {
                    if (tag) {
                        console.log('禁止滚动');
                        document.getElementsByClassName('page')[0].addEventListener('touchmove', handleStopScroll);
                    } else {
                        console.log('开启滚动');
                        document.getElementsByClassName('page')[0].removeEventListener('touchmove', handleStopScroll);
                    }
                }
            }()
        },
        watch: {
            'value': function(v) {
                if (v == this.checkVal) {
                    this.checked = true;
                } else {
                    this.checked = false;
                    this.pickerValue = new Date(v);
                }
            },
            'visiable': function(v) {
                console.log(v);
            }
        }
    };
</script>
<style scoped>
    .mint-datetime {
        pointer-events: all;
    }
    
    .ecnomic-checkbox-group {
        position: relative;
        padding: 0;
        border-bottom: none;
        overflow: hidden;
        text-align: center;
        color: #4b9af7;
    }
    
    .security-bottom-arrow {
        width: .186667rem;
        height: .186667rem;
        border-top: 1px solid #AEB3CC;
        border-right: 1px solid #AEB3CC;
        transform: rotate(135deg);
        display: inline-block;
        position: relative;
        top: -0.05rem;
    }
    
    .arrow-xia {
        width: 0.373333rem;
    }
</style>