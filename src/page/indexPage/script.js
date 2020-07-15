import radioGroup from '@/components/radio-group.vue';
import dateGroup from '@/components/date-group.vue';
import rangeGroup from '@/components/range-group.vue';
import rangeTowGroup from '@/components/range2-group.vue';
import scrollNum from '@/components/scroll-num.vue';
import agentAlert from '@/components/agent-alert.vue';
import amountSelectorGroup from '@/components/amount-selector-group.vue'
import moment from 'moment';
import config from '@/config.js';
// import xuzhiUrl from "@/assets/doc/toubaoxuzhi.pdf";
// import tiaokuanUrl from "@/assets/doc/baoxiantiaokuan.pdf";

import picViewer from '@/components/pic-viewer.vue';
import shebaoSelector from '@/components/shebao-selector.vue';
import birtydaySelector from '@/components/birtyday-selector.vue';
import { mapState } from "vuex"
import altQrcode from '@/components/altQrcode/altQrcode.vue'

export default {
    name: 'Index',
    isPage: true, // 必填项
    Data: {
        altVisible: false,
        isReadonly:false,
        agentAlertShow:false,
        agentName:'',
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
        ],
        lastRange1: 0,
        range1Vals: ['2', '5', '1'],
        range1: 0,
        lastRange2: 1,
        range2Vals: ['6', '12', '30', '100'],
        range2: 1,
        checkedOpt: false,
        minValue: 1,
        forbid: false,
        userCheckInfo: {
            birthDate: new Date("1985/01/01"), // 被保人出生日期
            relation: '', // 与被保人关系
            hasShebao: '有', // 有无社保
        },
        totalPayment: 0,
        mustPlanInfos: [{
            amtPerday: '50',
            medicineAmt: '无单项最高限额',
            drug: '不含',
            surgery: '',
            special: '不含',
            beforeAfter: '无单项最高限额',
            deductibles: '0元',
            percent: '50',
            exing: ''
        }, {
            amtPerday: '300',
            medicineAmt: '无单项最高限额',
            drug: '无单项最高限额',
            surgery: '2',
            special: '不含',
            beforeAfter: '无单项最高限额',
            deductibles: '0元',
            percent: '85',
            exing: ''
        }, {
            amtPerday: '300',
            medicineAmt: '无单项最高限额',
            drug: '无单项最高限额',
            surgery: '2',
            special: '无单项最高限额',
            beforeAfter: '无单项最高限额',
            deductibles: '0元',
            percent: '95',
            exing: ''
        }, {
            amtPerday: '300',
            medicineAmt: '无单项最高限额',
            drug: '无单项最高限额',
            surgery: '2',
            special: '无单项最高限额',
            beforeAfter: '无单项最高限额',
            deductibles: '0元',
            percent: '95',
            exing: '100'
        }],
        optionPlanInfos: [{
            amount: '2000',
            limit: '300',
            deductibles: '50',
            percent: '50',
            drug: '不含'
        }, {
            amount: '5000',
            limit: '400',
            deductibles: '50',
            percent: '70',
            drug: '无单项最高限额'
        }, {
            amount: '10000',
            limit: '500',
            deductibles: '50',
            percent: '90',
            drug: '无单项最高限额'
        }],
        hasRecommend: false,
        hasWarninged: false,
        dateOpt: {
            startDate: Date.now() - (1000 * 60 * 60 * 24 * 365 * 80),
            endDate: new Date()
        },
        limitAgeDate: 27,
        range1Upgrade: true,
        range2Upgrade: true
    },
    willEnterPage: function(data) {
        // this.resetData();
        this.getTotalPayment();
    },
    didEnterPage(data) {

    },
    methods: {
        judgeAgent(){
            this.$showLoading();
            this.$http.post('/api/facade/customer/findCustomer')
              .then((res) => {
                  console.log(res);
                  this.$hideLoading();
                  if(res.data.code == '0000'){
                      var isAgent = res.data.attachment.customerLabelList.findIndex((value, index, arr) => {
                          return value.labelCode == '10001';
                      })
                      console.log(isAgent)
                      if(isAgent < 0){
                          setTimeout(() => {
                              this.$switchTo("/inform");
                          }, 200);
                      }else{
                          //是代理人；
                          this.agentName = res.data.attachment.customerBaseInfos[0] ? res.data.attachment.customerBaseInfos[0].customerName : res.data.attachment.customerName;
                          this.agentIdNumber =  res.data.attachment.customerBaseInfos[0] ? res.data.attachment.customerBaseInfos[0].idNumber : res.data.attachment.idNumber;
                          this.agentAlertShow = true;
                      }
                  }else{
                      setTimeout(() => {
                          this.$switchTo("/inform");
                      }, 200);
                  }
              }).catch((error) => {
                this.$hideLoading();
                  console.log(error);
                  setTimeout(() => {
                      this.$switchTo("/inform");
                  }, 200);
              })
        },
        handleAgentSelf(){
            this.agentAlertShow = false;
            var agentInfo={
                agentName:this.agentName,
                agentIdNumber:this.agentIdNumber
            }
            sessionStorage.setItem('agentInfo',JSON.stringify(agentInfo));
            setTimeout(() => {
                this.$switchTo("/inform");
            }, 200);
        },
        handleAgentClose(){
            this.agentAlertShow = false;
        },
        openSelector(selector) {
            this.$refs[selector].open();
        },
        resetData() {
            this.range1 = 0;
            this.range2 = 0;
            this.userCheckInfo = {
                birthDate: new Date("1985/01/01"), // 被保人出生日期
                relation: '', // 与被保人关系
                hasShebao: '', // 有无社保
            };
            this.hasRecommend = false;
            this.hasWarninged = false;
        },
        onRange(evt) {
            var target = evt.target;
            // console.log(target.value);
            if (target.value < 50) { target.value = 10 } else { target.value = 90 }
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
                            "MPN": parseInt(this.range2),
                            "OPN": parseInt(this.range1),
                            "RELATIONWITHHOLDER": "SELF",
                            "SOCIALSECURITY": this.userCheckInfo.hasShebao == '有' ? 1 : 0
                        },
                        "productCode": config.productCode
                    }).then(res => {

                        if (res.data.code === '0000') {
                            this.totalPayment = res.data.attachment.ProductInfo.app;
                            
                            this.$localStorage.setItem('storeInfos', {
                                'MPN': this.range2,
                                'OPN': this.range1,
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
                    this.totalPayment = 0;
                };
            }

            return function() {

                if (timer) { clearTimeout(timer) };
                timer = setTimeout(() => {
                    get.apply(this);
                }, 300);
            }
        }(),
        toInform() {
            var ageObj = getAge(this.userCheckInfo.birthDate);
            console.log("ageObj",ageObj)

            if (!this.userCheckInfo.birthDate) {
                this.$message.toast('请选择被保人出生日期');
                return;
            } else if (ageObj.age < 0 || ageObj.age > 60 || (ageObj.age == 0 && ageObj.ageDate < this.limitAgeDate)) {
                v.$message.toast('被保险人年龄不适用');
                this.totalPayment = 0;
                return;
            };

            v.$hmt.trackEvent(this.version, 'click', 'home_next')
                // _hmt.push(['_trackEvent', 'button', 'click', 'home_kangebao_next']);
            if (this.totalPayment) {
                this.$localStorage.setItem('storeInfos', {
                    'MPN': this.range2,
                    'OPN': this.range1,
                    'SOCIALSECURITY': this.userCheckInfo.hasShebao == '有' ? 1 : 0,
                    'birthday': `${this.userCheckInfo.birthDate.getFullYear()}-${this.userCheckInfo.birthDate.getMonth() + 1}-${this.userCheckInfo.birthDate.getDate()}` + "T00:00:00.000+0800"
                });
                if (this.range1 == 0 && !this.hasWarninged) {
                    v.$hmt.trackEvent(this.version, 'message', 'home_pop')
                        // _hmt.push(['_trackEvent', 'button', 'message', 'home_kangebao_pop']);
                    this.hasWarninged = true;
                    this.$message.confirm('', '普通门急诊医疗保险金为0\n无法报销门急诊费用', (res) => {
                        if (!res) {
                            // this.$switchTo('/inform');
                            this.judgeAgent();
                        }
                    }, '重新选择', '坚持投保');
                } else {
                    // this.$switchTo('/inform');
                    this.judgeAgent();
                }

            }

            this.$hmt.trackEvent2('dzb', 'to_order');
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
            this.$message.alert('', '重症监护室床位费、基本医疗\n药品费、医生费、治疗费、护理\n费、检查检验费、手术费用', null, '我知道了')
        },
        toFaq() {
            v.$hmt.trackEvent(this.version, 'click', 'home_question')
                // _hmt.push(['_trackEvent', 'button', 'click', 'home_kangebao_question']);
            this.$switchTo('/faq');
        },
        actionMonitor() {
            if (this.userCheckInfo.birthDate && this.userCheckInfo.hasShebao) {
                setTimeout(() => {
                    v.$acMonitor.sendInput();
                }, 1000);
            }
        },
        moment: function() {
            return moment;
        },
        showImgViewer: function(viewer) {
            this.$refs[viewer].open();
        },
        toXuzhi(){
            this.$switchTo('/xuzhi')
        },
        toGoldAct() {

            _hmt.push(['_trackEvent', 'button', 'click', '投保页面-我要领取'])
            this.$switchTo('/goldAct')
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
            'version'
        ])
    },
    components: {
        radioGroup,
        dateGroup,
        rangeGroup,
        rangeTowGroup,
        scrollNum,
        agentAlert,
        picViewer,
        shebaoSelector,
        birtydaySelector,
        amountSelectorGroup,
        altQrcode
    },
    watch: {
        'userCheckInfo.birthDate': function(value, oldValue) {

            var ageObj = getAge(value);
            // console.log(ageObj);
            if (ageObj.age < 0 || ageObj.age > 60 || (ageObj.age == 0 && ageObj.ageDate < this.limitAgeDate)) {
                v.$message.toast('被保险人年龄不适用');
                this.totalPayment = 0;
            } else {

                setTimeout(() => {
                    this.recommend();
                    this.getTotalPayment();
                }, 100);
            }
            v.$hmt.trackEvent(this.version, 'click', 'home_both')
                // _hmt.push(['_trackEvent', 'button', 'click', 'home_kangebao_both']);

        },
        'range1': function(value, oldValue) {
            if (value >= 2) {
                this.minValue = value;
                this.range2 = this.range2 < value ? value : this.range2;
            } else {
                this.minValue = 1;
            }

            this.getTotalPayment();
            if (value > oldValue) {
                this.range1Upgrade = true;
            } else {
                this.range1Upgrade = false;
            }
            this.lastRange1 = oldValue;

        },
        'range2': function(value, oldValue) {
            this.getTotalPayment();
            if (value > oldValue) {
                this.range2Upgrade = true;
            } else {
                this.range2Upgrade = false;
            }
            this.lastRange2 = oldValue;

        },
        'userCheckInfo.hasShebao': function(value, oldValue) {
            v.$hmt.trackEvent(this.version, 'click', 'home_social')
                // _hmt.push(['_trackEvent', 'button', 'click', 'home_kangebao_social']);
            this.recommend();
            this.getTotalPayment();

        },
        'userCheckInfo.relation': function(value, oldValue) {
            v.$hmt.trackEvent(this.version, 'click', 'home_character')
                // _hmt.push(['_trackEvent', 'button', 'click', 'home_kangebao_character']);
                // this.recommend();
                // this.getTotalPayment();
            if (this.userCheckInfo.birthDate && this.userCheckInfo.hasShebao) {
                v.$acMonitor.sendInput();
            }
        },
        'checkedOpt': function(value) {
            if (!value) {
                this.range1 = 0;
            } else {
                this.range1 = 1;
            }
        }
    }
}

function getAge(date) {
    var birthDate = moment(date);
    var birthTime = new Date(date).getTime();
    var now = new Date();
    var nowDate = moment(Date.now() + (1000 * 60 * 60 * 24));
    var nowTime = new Date(nowDate).getTime();
    var age = 0;
    var ageDate = 0;

    if (birthDate.year() > nowDate.year()) {
        return null;
    } else if ((birthDate.month() < nowDate.month()) || (birthDate.month() === nowDate.month() && birthDate.date() <= nowDate.date())) {
        age = nowDate.year() - birthDate.year();
        ageDate = Math.floor((nowTime - new Date(`${nowDate.year()}/${birthDate.month() + 1}/${birthDate.date()}`)) / (1000 * 60 * 60 * 24));
    } else {
        age = nowDate.year() - birthDate.year() - 1;
        ageDate = Math.floor((nowTime - new Date(`${nowDate.year() - 1}/${birthDate.month() + 1}/${birthDate.date()}`)) / (1000 * 60 * 60 * 24));
    }

    return { age, ageDate };
}