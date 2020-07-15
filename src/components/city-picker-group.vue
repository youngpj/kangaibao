<template>
    <div class="date-picker-group" @click='toSelect' :class="{'dirty': !value && dirty,'active':value}">
        <div class="row clearfix">
            <label>{{label}}</label>
            <div class="input-container">
                <div id="city-select">
                    <div id="trigger1" :class='{active:value!=""}'>
                        {{value?value:placeholder}}
                    </div>
                </div>
            </div>

        </div>
        <img src="../assets/image/jiantouxia.png" alt="" class="arrow-xia">
    </div>
</template>
<script>
import { areaData } from "../assets/doc/city.js";
import MobileSelect from "mobile-select";
export default {
    name: "datePickerGroup",
    data: function() {
        return {
            areaData
        };
    },
    props: ["value", "option", "label", "placeholder", "dirty", "category"],
    mounted() {
        var _this = this;
        var mobileSelect1 = new MobileSelect({
            trigger: "#trigger1",
            title: "",
            wheels: [
                {
                    data: areaData
                }
            ],
            callback: function(indexArr, data) {
                // var trigger1 = document.getElementById("trigger1");
                // trigger1.innerHTML = "";
                var areaStr = "";
                if (Array.isArray(data)) {
                    console.log(data);
                    areaStr = data.map(item => item.value + "-").join("");
                }
                areaStr = areaStr.substring(0, areaStr.length - 1);
                console.log(areaStr);
                _this.$emit("outputArea", areaStr);
            }
        });
    },
    methods: {
        stopScroll: (function() {
            var handleStopScroll = function(evt) {
                evt.preventDefault();
            };

            return function(tag) {
                if (tag) {
                    console.log("禁止滚动");
                    document
                        .getElementsByClassName("page")[0]
                        .addEventListener("touchmove", handleStopScroll);
                } else {
                    console.log("开启滚动");
                    document
                        .getElementsByClassName("page")[0]
                        .removeEventListener("touchmove", handleStopScroll);
                }
            };
        })(),
        toSelect() {
            document.querySelector("#trigger1").click();
        }
    },
    watch: {},
    computed: {}
};
</script>
<style scoped>
.date-picker-group {
    position: relative;
    background-color: #fff;
    padding: 0.32rem 0 0.266667rem;
    border-top: 1px solid #eee;
    clear: both;
    overflow: hidden;
}
.date-picker-group.active > .row > label {
    float: left;
    font-size: 0.373333rem;
    color: #333333;
    width: 2.88rem;
}
.arrow-xia {
    position: absolute;
    top: 50%;
    right: 0.133333rem;
    transform: translateY(-50%);
    width: 0.373333rem;
}
.date-picker-group .input-container {
    position: absolute;
    border: none;
    left: 2.86rem;
    font-size: 0.373333rem;
    color: #333;
    outline: none;
    line-height: 0.586667rem;
    width: 100%;
    background: transparent;
}
#trigger1.active {
    color: #333;
    line-height: 0.56rem;
}
#trigger1 {
    color: #858585;;
    font-size: 0.373333rem;
}
.date-picker-group .arrow-xia {
    position: absolute;
    top: 0.586667rem;
    right: 0.133333rem;
    transform: translateY(-50%);
    width: 0.373333rem;
}

.date-picker-group input {
    position: relative;
    top: -0.026667rem;
    width: 0.4rem;
    height: 0.4rem;
    vertical-align: middle;
    border: none;
}

.date-picker-group input:checked::after {
    opacity: 1;
}

.date-picker-group .check-container {
    position: relative;
    font-size: 0.373333rem;
    float: left;
    /* padding-top: .053333rem; */
    margin-right: 5px;
    /* padding-left: 2.48rem; */
    line-height: 0.56rem;
}

.date-picker-group .empty {
    color: #858585;
}

.date-picker-group .ps-container {
    position: absolute;
    font-size: 0.32rem;
    color: #ff0000;
    bottom: -0.266667rem;
    /* transform: scale(.9); */
}

.date-picker-group .dirty {
    color: #f00;
}

.date-picker-group .sel-style {
    height: 45px;
    text-align: center;
    font-size: 16px;
    color: #333333;
    line-height: 45px;
    display: flex;
    justify-content: space-around;
}

.date-picker-group .switch-checkbox {
    display: none;
}

.date-picker-group .switch-label {
    position: relative;
    box-sizing: border-box;
    top: 12px;
    display: block;
    border-radius: 24px;
    height: 26px;
    width: 40px;
    cursor: pointer;
    background: #ffffff;
    border: 1px solid #e5e5e5;
    user-select: none;
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
}

.date-picker-group .switch-label::before {
    content: "";
    display: block;
    border-radius: 24px;
    height: 24px;
    background-color: white;
    transform: scale(1, 1);
    -webkit-transform: scale(1, 1);
    transition: all 0.3s ease;
    -webkit-transition: all 0.3s ease;
}

.date-picker-group .switch-label::after {
    content: "";
    position: absolute;
    top: 50%;
    left: 50%;
    margin-top: -11px;
    margin-left: -9px;
    width: 22px;
    height: 22px;
    border-radius: 22px;
    background-color: white;
    box-shadow: 1px 1px 1px 1px rgba(0, 0, 0, 0.08);
    transform: translateX(-9px);
    transition: all 0.3s ease;
    -webkit-transform: translateX(-9px);
    -webkit-transition: all 0.3s ease;
}

.date-picker-group .switch-checkbox:checked ~ .switch-label:after {
    transform: translateX(5px);
    -webkit-transform: translateX(5px);
}

.date-picker-group .switch-checkbox:checked ~ .switch-label:before {
    background-color: #faa200;
}

.date-picker-group .mask-style {
    display: none;
    width: 100%;
    height: 100%;
    position: absolute;
    bottom: 0;
    left: 0;
    background: rgba(0, 0, 0, 0.05);
    z-index: 99;
    color: white;
}
</style>