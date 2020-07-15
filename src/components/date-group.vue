<template>
    <div class="checkbox-group">
        <div class="name-container">{{label}}</div>
        <div class="check-container">
            <div class="check-item" @click="openPicker">
                <!-- <input v-resetInput type="date" :value="value" @input="handleInput" :placeholder="placeholder" /> -->
                <label>{{value ? new Date(value).getFullYear() + '-' + (new Date(value).getMonth() + 1) + '-' + new Date(value).getDate() : placeholder}}</label>
            </div>
        </div>
        <div class="desc-content">{{desc}}</div>
        <img src="../assets/image/jiantouxia.png" alt="" class="arrow-xia" v-show="!desc">
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

        <img src="../assets/image/jiantouxia.png" alt="" class="arrow-xia" />
    </div>
</template>
<script>
// import moment from "moment";
var nowDate = new Date();   
export default {
  data: function() {
    return {
      pickerValue: this.value ? new Date(this.value) : new Date(),
      startDate: new Date(this.option.startDate),
      endDate: this.option.endYear
        ? new Date(
            nowDate.getFullYear() +
              this.option.endYear +
              "/" +
              (nowDate.getMonth() + 1) +
              "/" +
              nowDate.getDate()
          )
        : new Date(this.option.endDate),
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
.mint-datetime{
  pointer-events: all;
}

.checkbox-group {
  position: relative;
  padding: 0.266667rem 0;
  border-bottom: 1px solid #eee;
  overflow: hidden;
  clear: both;
  line-height: 0.746667rem;
}

.checkbox-group:last-child {
  border-bottom: none;
}

.name-container {
  float: left;
  /* display: inline-block; */
  font-size: 0.426667rem;
  color: #333;
  margin-right: 0.4rem;
}

.check-container {
  float: right;
  margin-right: 20px;
}

.check-item {
  position: relative;
  float: left;
  width: 3.2rem;
  height: 0.746667rem;
  line-height: 0.746667rem;
  border-radius: 0.373333rem;
  /* overflow: hidden; */
  margin: 0 0.1rem;
  text-align: left;
}

.check-item input {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
  background-color: transparent;
  z-index: 1;
}

.check-item input:checked + label {
  background: #ffa12d;
  color: #fff;
  /* border: 1px solid #FFA12D; */
}

.check-item label {
  display: block;
  position: absolute;
  width: 100%;
  height: 100%;
  left: 0px;
  top: 0px;
  text-align: right;
  color: #333;
  font-size: 0.373333rem;
  /* border: 1px solid #d6d6d6; */
  border-radius: 0.373333rem;
  line-height: 0.8rem;
}

.desc-content {
  float: left;
  /* float: right; */
  font-size: 0.373333rem;
  color: #333;
  opacity: .3;
}

.arrow-xia {
  position: absolute;
  top: 50%;
  right: 0.133333rem;
  transform: translateY(-50%);
  width: 0.373333rem;
}

.arrow-xia {
  position: absolute;
  top: 50%;
  right: 0.133333rem;
  transform: translateY(-50%);
  width: 0.373333rem;
}
</style>