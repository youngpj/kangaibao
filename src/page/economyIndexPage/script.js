import economicDateGroup from "@/components/economic-date-group.vue";
import economicRadioGroup from "@/components/economic-radio-group.vue";
import rangeGroup from "@/components/range-group.vue";
import rangeTowGroup from "@/components/range2-group.vue";
import scrollNum from "@/components/scroll-num.vue";
import moment from "moment";
import config from "@/config.js";
import xuzhiUrl from "@/assets/doc/toubaoxuzhi.pdf";
import tiaokuanUrl from "@/assets/doc/baoxiantiaokuan.pdf";
import picViewer from "@/components/pic-viewer.vue";
import { mapState, mapGetters, mapMutations } from 'vuex'
import altQrcode from '@/components/altQrcode/altQrcode.vue'

export default {
    name: "Index",
    isPage: true, // 必填项
    Data: {
        altVisible: false,
        xuzhiImgList: [
            { url: require('@/assets/doc/toubaoxuzhi/0_1.jpg') },
            { url: require('@/assets/doc/toubaoxuzhi/0_2.jpg') },
            { url: require('@/assets/doc/toubaoxuzhi/0_3.jpg') },
        ],
        tiaokuanImgList: [
            { url: require('@/assets/doc/baoxiantiaokuan/0_01.jpg') },
            { url: require('@/assets/doc/baoxiantiaokuan/0_02.jpg') },
            { url: require('@/assets/doc/baoxiantiaokuan/0_03.jpg') },
            { url: require('@/assets/doc/baoxiantiaokuan/0_04.jpg') },
            { url: require('@/assets/doc/baoxiantiaokuan/0_05.jpg') },
            { url: require('@/assets/doc/baoxiantiaokuan/0_06.jpg') },
            { url: require('@/assets/doc/baoxiantiaokuan/0_07.jpg') },
            { url: require('@/assets/doc/baoxiantiaokuan/0_08.jpg') },
            { url: require('@/assets/doc/baoxiantiaokuan/0_09.jpg') },
            { url: require('@/assets/doc/baoxiantiaokuan/0_10.jpg') },
            { url: require('@/assets/doc/baoxiantiaokuan/0_11.jpg') },
            { url: require('@/assets/doc/baoxiantiaokuan/0_12.jpg') },
            { url: require('@/assets/doc/baoxiantiaokuan/0_13.jpg') },
            { url: require('@/assets/doc/baoxiantiaokuan/0_14.jpg') },
            { url: require('@/assets/doc/baoxiantiaokuan/0_15.jpg') },
            { url: require('@/assets/doc/baoxiantiaokuan/0_16.jpg') },
            { url: require('@/assets/doc/baoxiantiaokuan/0_17.jpg') },
            { url: require('@/assets/doc/baoxiantiaokuan/0_18.jpg') },
            { url: require('@/assets/doc/baoxiantiaokuan/0_19.jpg') },
            { url: require('@/assets/doc/baoxiantiaokuan/0_20.jpg') }
        ],
        xuzhiUrl: xuzhiUrl,
        tiaokuanUrl: tiaokuanUrl,
        lastRange1: 0,
        range1: 0,
        lastRange2: 1,
        range2: 1,
        minValue: 1,
        forbid: false,
        userCheckInfo: {
            birthDate: new Date("1985/01/01"), // 被保人出生日期
            relation: "", // 与被保人关系
            hasShebao: "有" // 有无社保
        },
        totalPayment: 87,
        hasRecommend: false,
        hasWarninged: false,
        dateOpt: {
            startDate: Date.now() - 1000 * 60 * 60 * 24 * 365 * 80,
            endDate: new Date()
        },
        limitAgeDate: 27,
        range1Upgrade: true,
        range2Upgrade: true,
        randcheck: "",
        unfold: false,
        moneyChange: false,
        inconformityAge: true,
        hasSecurity: false, //选择有无社保弹窗
    },
    willEnterPage: function(data) {},
    didEnterPage(data) {
        this.getTotalPayment();
    },
    methods: {
        resetData() {
            this.range1 = 0;
            this.range2 = 0;
            this.userCheckInfo = {
                birthDate: new Date("1985/01/01"), // 被保人出生日期
                relation: "", // 与被保人关系
                hasShebao: "" // 有无社保
            };
            this.hasRecommend = false;
            this.hasWarninged = false;
        },
        onRange(evt) {
            var target = evt.target;
            // console.log(target.value);
            if (target.value < 50) {
                target.value = 10;
            } else {
                target.value = 90;
            }
        },
        getTotalPayment: function() {
            
            var timer = null;
            var get = function() {
                
                if (this.range2 > 0 && this.userCheckInfo.birthDate && this.userCheckInfo.hasShebao) {
                    
                    var ageObj = getAge(this.userCheckInfo.birthDate);
                    if (ageObj.age < 0 || ageObj.age > 60 || (ageObj.age == 0 && ageObj.ageDate < this.limitAgeDate)) { return; }
                    this.$http.post('/api/facade/policy/pricing', {
                        "insureparameters": {
                            "BIRTHDAY": moment(this.userCheckInfo.birthDate).format('YYYY-MM-DD'),
                            "MPN": parseInt(1),
                            "OPN": parseInt(this.range1),
                            "RELATIONWITHHOLDER": "SELF",
                            "SOCIALSECURITY": this.userCheckInfo.hasShebao == '有' ? 1 : 0
                        },
                        "productCode": config.productCode
                    }).then(res => {
                        
                        this.moneyChange = true;
                        if (res.data.code === '0000') {
                            this.totalPayment = res.data.attachment.ProductInfo.app;

                            this.$localStorage.setItem('storeInfos', {
                                'MPN':  this.range2,
                                'OPN':  this.randcheck ? 1 : 0,
                                'SOCIALSECURITY': this.userCheckInfo.hasShebao == '有' ? 1 : 0,
                                'birthday': `${this.userCheckInfo.birthDate.getFullYear()}-${this.userCheckInfo.birthDate.getMonth() + 1}-${this.userCheckInfo.birthDate.getDate()}` + "T00:00:00.000+0800"
                            });

                            this.actionMonitor();
                        }
                                
                    }).catch(err => {
                        console.log(err);
                        this.$message.warning('服务器异常了');
                    })
                } else {
                   
                };
            }
            
            return function() {
                
                if (timer) { clearTimeout(timer) };
                timer = setTimeout(() => {
                    get.apply(this);
                }, 300);
            }
        }(),
        toInsure() {
            v.$hmt.trackEvent(this.version, 'click', 'home_next')
                // _hmt.push(["_trackEvent", "button", "click", "home_kebjs_next"]);
            if (this.totalPayment) {
                if (this.range1 == 0 && !this.hasWarninged) {
                    this.hasWarninged = true;
                }
            }

            this.$hmt.trackEvent2('jsb', 'to_order');
        },
        checkUserInfo() {
            v.$hmt.trackEvent(this.version, 'click', 'home_sure')
                // _hmt.push(["_trackEvent", "button", "click", "home_kebjs_sure"]);
            if (!this.userCheckInfo.birthDate) {
                this.$message.alert("提示", "请选择被保人出生日期");
            } else if (!this.userCheckInfo.hasShebao) {
                this.$message.alert("提示", "请选择被保人社保情况");
            } else if (!this.inconformityAge) {
                this.$message.toast("被保险人年龄不适用");
            } else {
                this.$localStorage.setItem('storeInfos', {
                    'MPN':  this.range2,
                    'OPN':  this.randcheck ? 1 : 0,
                    'SOCIALSECURITY': this.userCheckInfo.hasShebao == '有' ? 1 : 0,
                    'birthday': `${this.userCheckInfo.birthDate.getFullYear()}-${this.userCheckInfo.birthDate.getMonth() + 1}-${this.userCheckInfo.birthDate.getDate()}` + "T00:00:00.000+0800"
                });
                setTimeout(() => {
                    v.$acMonitor.sendInput('_是，确认投保 ');
                    this.$switchTo("/inform");
                }, 100)
                v.$hmt.trackEvent(this.version, 'click', 'home_yes')
                return
                this.$message.confirm(
                    "",
                    "投保本产品是否是您本人意愿？",
                    (res) => {
                        if (res) {
                            this.$localStorage.setItem('storeInfos', {
                                'MPN':  this.range2,
                                'OPN':  this.randcheck ? 1 : 0,
                                'SOCIALSECURITY': this.userCheckInfo.hasShebao == '有' ? 1 : 0,
                                'birthday': `${this.userCheckInfo.birthDate.getFullYear()}-${this.userCheckInfo.birthDate.getMonth() + 1}-${this.userCheckInfo.birthDate.getDate()}` + "T00:00:00.000+0800"
                            });
                            setTimeout(() => {
                                v.$acMonitor.sendInput('_是，确认投保 ');
                                this.$switchTo("/inform");
                            }, 100)
                            v.$hmt.trackEvent(this.version, 'click', 'home_yes')
                                // _hmt.push(["_trackEvent", "button", "message", "home_kebjs_yes"]);
                        } else {
                            this.stopScroll(false);
                            v.$acMonitor.sendInput('不投保');
                            v.$hmt.trackEvent(this.version, 'click', 'home_no')
                                // _hmt.push(["_trackEvent", "button", "click", "home_kebjs_no"]);
                        }
                    },
                    "是，确定投保",
                    "不投保"
                );
            }
        },
        recommend() {
            // if (!this.hasRecommend && this.userCheckInfo.birthDate && this.userCheckInfo.relation && this.userCheckInfo.hasShebao) {
            //     var ageObj = getAge(this.userCheckInfo.birthDate);
            //     this.forbid = false;
            //     this.minValue = 1;
            //     this.range1 = 1;
            //     if (ageObj.age < 61 && ageObj.age > 49) {
            //         this.range2 = 4;
            //     } else if (ageObj.age < 50 && ageObj.age > 24) {
            //         setTimeout(() => {
            //             this.range2 = 3;
            //         })
            //     } else {
            //         this.range2 = 1;
            //     }
            //     // this.hasRecommend = true;
            // } else {
            //     this.forbid = true;
            // }
        },
        more() {
            this.$message.alert(
                "",
                "重症监护室床位费、基本医疗\n药品费、医生费、治疗费、护理\n费、检查检验费、手术费用",
                null,
                "我知道了"
            );
        },
        actionMonitor() {
            if (this.userCheckInfo.birthDate && this.userCheckInfo.hasShebao) {
                setTimeout(() => {
                    v.$acMonitor.sendInput();
                }, 100);
            }
        },
        switchToPage(url) {
            this.$router.push('/')
                // location.href = location.origin + '/kangebao/index.html?oid=' + this.$url.parseUrl('oid');
        },
        unfoldFun(value) {
            this.unfold = value;
        },
        selectSecurity(value) {
            this.hasSecurity = value; //选择有无社保
        },
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
        toGoldAct() {
            _hmt.push(['_trackEvent', 'button', 'click', '投保页面-我要领取'])
            this.$switchTo('/goldAct')
        },
        showImgViewer: function(viewer) {
            this.$refs[viewer].open();
        },
        toXuzhi(){
            this.$switchTo('/xuzhi')
        },
    },
    computed: {
        fmtBirtyday: function() {
            return this.userCheckInfo.birthDate ? moment(this.userCheckInfo.birthDate).format('YYYY-MM-DD') : '';
        },
        //根据url上是否有poid,判断显示活动banner
        actBannerVisible() {
            return !!this.$url.parseUrl('poid')
        },
        ...mapState([
            "version"
        ])
    },
    components: {
        rangeGroup,
        rangeTowGroup,
        scrollNum,
        economicDateGroup,
        economicRadioGroup,
        picViewer,
        altQrcode
    },
    watch: {
        "userCheckInfo.birthDate": function(value, oldValue) {
            var ageObj = getAge(value);
            if (
                ageObj.age < 0 ||
                ageObj.age > 60 ||
                (ageObj.age == 0 && ageObj.ageDate < this.limitAgeDate)
            ) {
                v.$message.toast("被保险人年龄不适用");
                // this.userCheckInfo.birthDate = '';
                this.inconformityAge = false;
                this.moneyChange = false;
                if (!this.randcheck) {
                    this.totalPayment = 87
                } else {
                    this.totalPayment = 426
                }
            } else {
                this.inconformityAge = true;
                setTimeout(() => {
                    this.recommend();
                    this.getTotalPayment();
                }, 100);
            }
            v.$hmt.trackEvent(this.version, 'click', 'home_both')
                // _hmt.push(["_trackEvent", "button", "click", "home_kebjs_both"]);
            this.actionMonitor();
        },
        range1: function(value, oldValue) {
             console.log(value,'value')
            if (value >= 2) {
                this.minValue = value;
                this.range2 = this.range2 < value ? value : this.range2;
            } else {
                this.minValue = 1;
            }
            if (value > oldValue) {
                this.range1Upgrade = true;
            } else {
                this.range1Upgrade = false;
            }
            this.lastRange1 = oldValue;
            //this.getTotalPayment();
            this.actionMonitor();
        },
        range2: function(value, oldValue) {
            if (value > oldValue) {
                this.range2Upgrade = true;
            } else {
                this.range2Upgrade = false;
            }
            this.lastRange2 = oldValue;
            this.actionMonitor();
        },
        "userCheckInfo.hasShebao": function(value, oldValue) {
            v.$hmt.trackEvent(this.version, 'click', 'home_social')
                // _hmt.push(["_trackEvent", "button", "click", "home_kebjs_social"]);
            this.recommend();
            this.getTotalPayment();
            this.actionMonitor();
        },
        "userCheckInfo.relation": function(value, oldValue) {
            // this.recommend();
            // this.getTotalPayment();
            if (this.userCheckInfo.birthDate && this.userCheckInfo.hasShebao) {
                v.$acMonitor.sendInput();
            }
        },
        "randcheck": function(value, oldValue) {
            if (value) {
                this.range1 = 1;
            } else {
                this.range1 = 0;
            }
            if (value && (!this.userCheckInfo.birthDate || !this.userCheckInfo.hasShebao)) {
                this.totalPayment = 426
            } else if (!value && (!this.userCheckInfo.birthDate || !this.userCheckInfo.hasShebao)) {
                this.totalPayment = 87
            } else {
                this.getTotalPayment();
            }
        },
        'unfold': function(value, oldValue) {
            // _hmt.push(["_trackEvent", "button", "click", "home_kebjs_more"]);
        }
    }
};

window.moment = moment;

function getAge(date) {
    var birthDate = moment(date);
    var birthTime = new Date(date).getTime();
    var now = new Date();
    var nowDate = moment(Date.now() + 1000 * 60 * 60 * 24);
    var nowTime = new Date(nowDate).getTime();
    var age = 0;
    var ageDate = 0;

    if (birthDate.year() > nowDate.year()) {
        return null;
    } else if (
        birthDate.month() < nowDate.month() ||
        (birthDate.month() === nowDate.month() &&
            birthDate.date() <= nowDate.date())
    ) {
        age = nowDate.year() - birthDate.year();
        ageDate = Math.floor(
            (nowTime -
                new Date(
                    `${nowDate.year()}/${birthDate.month() + 1}/${birthDate.date()}`
                )) /
            (1000 * 60 * 60 * 24)
        );
    } else {
        age = nowDate.year() - birthDate.year() - 1;
        ageDate = Math.floor(
            (nowTime -
                new Date(
                    `${nowDate.year() - 1}/${birthDate.month() + 1}/${birthDate.date()}`
                )) /
            (1000 * 60 * 60 * 24)
        );
    }

    return { age, ageDate };
}