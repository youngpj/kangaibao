import inputGroup from '@/components/input-group.vue'
import smsGroup from '@/components/sms-group.vue'
import selectGroup from '@/components/select-group.vue'
// import searchGroup from '@/components/search-group.vue'
import dateGroup from '@/components/fdate-group.vue'
import locationGroup from '@/components/location-group.vue'
import cityPickerGroup from '@/components/city-picker-group.vue';
import agreeGroup from '@/components/agree-group.vue'
import datePickerGroup from '@/components/date-picker-group.vue'
import jobselectGroup from '@/components/jobselect-group.vue'

import config from '@/config.js'
import moment from 'moment'
import { mapState } from 'vuex';

export default {
    name: 'SubPage',
    isPage: true,
    Data: {
        isReadonly:false,
        insureds: { // 被保险人信息
            name: '',
            idNum: '',
            idCutoffDate: '',
            relation: '',
            phone: '',
            address: '',
            job: '',
            jobType: "",
            jobCode: ''
        },
        province: '',//被保人省份
        placeDetial: '',//被保人详细地址
        policyHolder: { // 投保人信息
            name: '',
            idNum: '',
            idCutoffDate: '',
            city: '',
            job: '',
            jobType: "",
            jobCode: '',
            phone: '',
            address: ''
        },
        smsCode: '',
        allRight: false,
        location: {
            latitude: '31.2402',
            longitude: '121.49302',
            city: '上海市'
        },
        storeInfos: null,
        agree: false,
        hideInsuredsIdCut: false,
        limitAge: 16,
        smsLock: false,
        dateOpt: {
            startDate: new Date(),
            endYear: 20
        },
        allDirty: false,
        openId: null,
        isSelf: true,
        showPolicyHolder: true,
        showInsureds: true,
        limitAgeDate: 27,
        captchaImg: '', // 图形验证码图片
        captchaCode: '',
        captchaVisiable: false,
        userInfo: '', //查wx 用户信息
        family:'',//家庭成员列表 过滤
        newInsureds:''
    },
    beforeRouteEnter(to, from, next) {
        next(vm => {})
    },
    willEnterPage: function(data) {
        var agentInfo = sessionStorage.getItem('agentInfo');
        if(agentInfo){
            this.isReadonly = true;
            this.policyHolder.name = JSON.parse(agentInfo).agentName;
            this.policyHolder.idNum = JSON.parse(agentInfo).agentIdNumber;
        }
        this.$hideLoading();
        this.loadStoreInfos();
        this.$showLoading();
        this.createCaptcha();
        this.$url.getQueryStrDecode('oid', (openId) => {
            this.openId = openId
            this.$hideLoading()
                // alert(this.openId)
        })
        this.checkUserInfo()
    },
    didEnterPage: function(data) {
        this.getLocation()
            // this.policyHolder.city = "上海市"
    },
    methods: {
        checkUserInfo() {
            this.axios
                .get(`${config.msUrl}/cms/api/user/my/WX`)
                //.get('./data.json')
                .then(res => {
                    if (res.data.code == "0") {
                        this.userInfo = res.data.content;
                        this.assignObj(this.policyHolder, this.userInfo)                
                        this.insureds.relation == '' ? this.insureds.relation = 'SELF' : ""
                    } else {

                    }
                })
                .catch(err => {
                    console.log(err);
                    // this.$message.toast(err);
                });
        },
        assignObj(obj, data,flag=false) { //合并 object
            //不为空就不写入,   jobCode  先看看字典里面有没有 没有为空
            var keyArr = ['name', 'email']
            for (var key in obj) {
                if (obj[key] != ''&&!flag) {  
                    continue;
                }
                console.log(key);
                if (key == 'idNum') {
                    obj[key] = data.idnumber
                } else if (key == 'idCutoffDate') {
                    obj[key] = data.idValidTime=='1'?'长期':data.idValidTime
                }else if (key == 'phone') {
                    obj[key] = data.mobile
                }else if(data[key]&&keyArr.includes(key)) {
                    obj[key] = data[key]
                }else if(key=='jobCode'){  
                    if(this.jobOptions[data.jobCode]){
                        obj[key] = data[key]
                    }else{
                        obj[key]=''
                    }
                  
                }
            }
        },
        filterData(obj, key, value) {
            return obj.filter(item => item[key] == value)
        },
        chooseInsurds(index) {
            if (this.family.length > 0) {
                this.assignObj(this.insureds, this.family[index],true)
                this.insureds.idNum ? this.newInsureds = false : this.newInsureds = true;
            } else {
                this.resetInsureds()
            }
        },
        resetInsureds() {
            for (var key in this.insureds) {
                if(!['relation','shebao','address'].includes(key)){
                    this.insureds[key]=''   
                }
            }
            this.newInsureds = true
        },
        loadStoreInfos() {
            this.storeInfos = this.$localStorage.getItem('storeInfos')

            // this.removeFields('insureds', ['idCutoffDate', 'phone', 'address']);
            // this.removeFields('policyHolder', ['idCutoffDate', 'address']);
        },
        removeFields(type, fields) {
            fields.forEach(field => {
                console.log(type, field);
                // if (field == 'job') {
                //     this[type][field] = '中共中央和地方各级党组织负责人';
                // } else if (field == 'jobType') {
                //     this[type][field] = 1;
                // } else if (field == 'jobCode') {
                //     this[type][field] = '1010101';
                // } else if (field == 'idCutoffDate') {
                //     this[type][field] = '长期';
                // } else
                //  if (field == 'address') {
                //     this[type][field] = 'null-上海市-null-null';
                // } else {
                //     this[type][field] = '';
                // }
            })
        },
        onSendSms: function(countDown) {
            v.$hmt.trackEvent(this.version, 'click', 'insure_verify')
                // _hmt.push(['_trackEvent', 'button', 'click', 'insure_kangebao_verify'])
            if (this.smsLock) return

            this.smsLock = true
            if (!this.policyHolder.phone) {
                this.smsLock = false
            } else if (!this.isPhoneNo(this.policyHolder.phone)) {
                this.smsLock = false
            } else {
                this.smsLock = false
                    // 弹出图形验证码弹框
                this.showCaptchaModal()

                this.sendSmsSuccess = function() {
                    countDown();
                    if (this.version == 'cup') {
                        this.$hmt.trackEvent2('bwb', 'sms');
                    } else if (this.version == 'economy') {
                        this.$hmt.trackEvent2('jsb', 'sms');
                    } else {
                        this.$hmt.trackEvent2('dzb', 'sms');
                    }
                }

                this.sendSmsFail = function(err) {
                    this.$message.toast(err);
                    this.captchaCode = '';
                    this.createCaptcha();
                }

                // this.$http.get(`/rest/v0/sms/captcha/${this.policyHolder.phone}`).then(res => {
                //     this.smsLock = false
                //     if (res.data.returnCode === 'SUCCESS') {
                //         countDown()
                //     } else {
                //         this.$message.toast(res.data.errorMsg)
                //     }
                // })
            }
        },
        showCaptchaModal: function() {
            this.captchaVisiable = true;
            this.createCaptcha();
            this.captchaCode = '';
        },
        sendSmsCode: function(params, open) {
            if (!this.captchaCode) {
                this.$message.toast('请输入图形验证码');
                open()
                return;
            };


            this.$http.get(`/api/facade/auth/sendCaptcha/${this.policyHolder.phone}/${this.captchaCode}`).then(res => {
                open()

                if (res.data.code == '0000') {
                    this.captchaVisiable = false;
                    this.sendSmsSuccess && this.sendSmsSuccess();
                } else if (res.data.code == '0001') {
                    this.sendSmsFail && this.sendSmsFail(res.data.message);
                } else {
                    this.sendSmsFail && this.sendSmsFail(res.data.message);
                }
            }).catch(err => {
                open();
                this.captchaVisiable = false;
                this.$message.toast(err.response.data.ErrorMsg);
            })
        },
        // 生成图形验证码
        createCaptcha() {

            v.$http.get('/api/facade/auth/createImage').then(res => {
                if (res.data.code == '0000') {
                    this.captchaImg = 'data:image/jpeg;base64,' + res.data.attachment;
                }
            })

        },
        resetInfo() {
            var insureds = { // 被保险人信息
                name: '',
                relation: '',
                phone: '',
                idNum: '',
                address: '',
                idCutoffDate: '',
                job: '',
                jobType: '',
                jobCode: ''
            }
            var policyHolder = { // 投保人信息
                name: '',
                idNum: '',
                idCutoffDate: '',
                city: '',
                job: '',
                jobType: '',
                jobCode: '',
                phone: '',
                address: ''
            }

            this.insureds = insureds
            this.policyHolder = policyHolder
        },
        verifySms: function() {
            if (!this.smsCode) {
                this.$message.toast('验证码不能为空') 
            } else {
                return new Promise((resolve, reject) => {
                    this.$http.get(`/api/facade/auth/verifyCaptcha/${this.policyHolder.phone}/${this.smsCode}`).then(res => {

                        if (res.data.code === '0000') {
                            resolve()
                        } else if (res.data.code == '0001') {
                            reject('验证码有误')
                        } else {
                            reject(res.data.message);
                        }
                    }).catch(err => {
                        // this.smsCode = ''
                        reject(err)
                    })
                })
            }
        },
        onSelectPolicyJob(job) {
            // this.policyHolder.job = job.n
            this.policyHolder.jobType = job.t
            this.policyHolder.jobCode = job.c
        },
        onSelectInsuredsJob(job) {
            // this.insureds.job = job.n
            this.insureds.jobType = job.t
            this.insureds.jobCode = job.c
        },
        getArea(value) {
            this.province = value
            if (this.province == '' || this.placeDetial.length<5) {
                this.insureds.address = '';
                return;
            }
            this.insureds.address = this.province + this.placeDetial;
        },
        checkBindId(){ //投保人身份证绑定
            return new Promise((resolve, reject) => {
                if(this.userInfo.id&&this.userInfo.bindIdNumber!=1){
                    var data={                     
                            id:this.userInfo.id,
                            idnumber:this.policyHolder.idNum
                    }
                    this.axios.post(`${config.msUrl}/cms/api/user/iFollowCheck`,data).then(res => {
                        if (res.data.code === '0') {
                            resolve()
                        } else if(res.data.code === '-103') {
                            this.$message.confirm('投保人已被绑定', '投保人身份证已被其他账号绑定<br/>是否继续以此人身份投保', (val) => {
                                if (val) {
                                    resolve()
                                }else{
                                    reject() 
                                }
                            }, '确认', '取消')
                        }
                    }).catch(err => {
                        resolve()
                    });
                }else{
                    resolve()
                }
            })
        },
        createPolicy(params, open) {
            v.$hmt.trackEvent(this.version, 'click', 'insure_pay')
                // _hmt.push(['_trackEvent', 'button', 'click', 'insure_kangebao_pay'])
            this.allDirty = true
            if (!this.allRight) {
                open()
                return
            }

            Promise.resolve().then(() => {
                    return this.checkInfos()
                }).then(() => {
                    return this.checkPolicyHolderAge()
                }).then(() => {
                    return this.verifySms()
                }).then(() => {
                    return this.checkBindId()
                }).then(() => {
                    var today = new Date()
                    var nextYear = moment(today.getFullYear() + 1 + '/' + (today.getMonth() + 1) + '/' + today.getDate()).format('YYYY-MM-DD')
                    var tomorrow = moment(new Date(Date.now() + 1000 * 60 * 60 * 24)).format('YYYY-MM-DD')
                    var openId = this.openId || this.$localStorage.getItem('openId')

                    if (!openId && !v.$url.parseUrl('mini')) {
                        this.$message.alert('', '获取授权信息失败')
                        return
                    }

                    var reqOpt = {
                            "beInsuredCustomers": [{
                                 "address": this.insureds.address,
                                "customerName": this.insureds.name,
                                "idNumber": this.insureds.idNum,
                                "mobile": "",
                                // "mobile": this.insureds.phone,
                                "parameters": {
                                     "IDVALIDTIME":this.insureds.idCutoffDate=='长期'?'1': moment(this.insureds.idCutoffDate ).format('YYYY-MM-DD'),
                                    "JOB": this.insureds.job,
                                    "JOBTYPE": parseInt(this.insureds.jobType),
                                    "JOBCODE": this.insureds.jobCode,
                                    "SOCIALSECURITY": parseInt(this.storeInfos['SOCIALSECURITY']),
                                },
                                "relationWithHolder": this.insureds.relation
                            }],
                            "holderCustomer": {
                                "address": `null-${this.policyHolder.city}-null`,
                                "customerName": this.policyHolder.name,
                                "idNumber": this.policyHolder.idNum,
                                "mobile": this.policyHolder.phone,
                                "parameters": {
                                     "IDVALIDTIME": this.policyHolder.idCutoffDate=='长期'?'1': moment(this.policyHolder.idCutoffDate ).format('YYYY-MM-DD'),
                                    "JOB": this.policyHolder.job,
                                    "JOBTYPE": parseInt(this.policyHolder.jobType),
                                    "JOBCODE": this.policyHolder.jobCode,
                                    "RESIDENTAREA": this.policyHolder.city
                                }
                            },
                            "informparameter": {
                                "INFORM_RESULT": "是"
                            },
                            "insureparameters": {
                                "CRSFLAG":1,
                                "MPN": parseInt(this.storeInfos['MPN']),
                                "OPN": parseInt(this.storeInfos['OPN']),
                                "main_source": 'wechat'
                            },
                            "productCode": config.productCode
                        }
                        //判断是康e保经适版，增加字段
                    if (this.version == 'economy') {
                        reqOpt.insureparameters['VERSION_TYPE'] = 'A';
                        reqOpt.insureparameters['project_name'] = '康e保（经适版）';
                    } else
                    //判断是康e保保温杯，增加字段
                    if (this.version == 'cup') {
                        reqOpt.insureparameters['VERSION_TYPE'] = 'CUP';
                        reqOpt.insureparameters['project_name'] = '康e保（保温杯）';
                    } else {
                        reqOpt.insureparameters['project_name'] = '康e保（定制版）';
                    }

                    if (v.$url.parseUrl('source')) {
                        reqOpt.insureparameters['source'] = v.$url.parseUrl('source')
                    };

                    //判断是否是代理人活动,增加动态字段
                    if (this.poid) {
                        reqOpt.insureparameters['PROXYOID'] = this.poid
                    }
                    if (this.agentId) {
                        reqOpt.insureparameters['AGENTID_V1'] = this.agentId
                    }
                    v.$localStorage.setItem('orderinfo', reqOpt)
                    console.log(reqOpt)

                    this.$showLoading();
                    var _this = this;
                    this.$http.post('/api/facade/policy/valid', reqOpt).then(res => {
                        this.$hideLoading();
                        open();
                        if (res.data.code == '0000') {
                            this.$switchTo('/confirm')
                            if (this.version == 'cup') {
                                this.$hmt.trackEvent2('bwb', 'ok');
                            } else if (this.version == 'economy') {
                                this.$hmt.trackEvent2('jsb', 'ok');
                            } else {
                                this.$hmt.trackEvent2('dzb', 'ok');
                            }
                        } else {
                            _hmt.push(['_trackEvent', 'button', 'message', 'insure_kangebao_pop3']);
                            if (res.data.message == '每名被保险人只能购买一份该产品。') {
                                if (this.version == 'index') {
                                    v.$hmt.trackEvent(this.version, 'message', 'insure_pop3')
                                } else {
                                    v.$hmt.trackEvent(this.version, 'message', 'insure_popAmount')
                                }
                                this.$message.alert('无法购买', '被保人已购买过此保险\n无法反复投保', function() {
                                    _this.$switchTo('/landing');
                                }, '确定');
                            } else if (res.data.message == '每名被保险人只能有一份未支付投保单。') {
                                this.$message.alert('无法购买', '被保人已有待支付订单\n请完成支付', function() {
                                    _this.$switchTo('/landing');
                                }, '确定');
                            } else {
                                if (this.version == 'index') {
                                    v.$hmt.trackEvent(this.version, 'message', 'insure_pop3')
                                } else {
                                    v.$hmt.trackEvent(this.version, 'message', 'insure_popAge2')
                                }
                                this.$message.alert('', res.data.message);
                            }
                        }
                    });

                })
                .catch(err => {
                    open()
                    console.log(err)

                    if (err == '未满18') {
                        v.$hmt.trackEvent(this.version, 'message', 'insure_popAge1')
                        this.$message.alert('', '由于作为投保人，您未能年满18岁，\n根据国家法律，您无法参与投保。\n为您对我们的信任我们深表感激。')
                    } else if(err){
                        this.$message.toast(err)
                    }

                    this.$hideLoading()
                })
        },
        getLocation() {
            // this.policyHolder.city='北京市'
            // return;
            this.$showLoading('正在获取位置信息...')
            Promise.resolve().then(() => {
                _hmt.push(['_trackEvent', 'button', 'message', 'insure_kangebao_pop1'])
                return this.$wxsdk.getLocation()
            }).then(location => {
                this.location.longitude = location.longitude;
                this.location.latitude = location.latitude;

                return this.$http.get(`/api/facade/file/getCity?location=${location.longitude},${location.latitude}&coordsys=gps`).then(res => {
                    console.log(res);
                    setTimeout(() => {
                        this.$hideLoading()
                        if (res.data.code == '0000' && res.data.attachment.code == 0) {
                            if (!res.data.attachment.result) {
                                _hmt.push(['_trackEvent', 'button', 'message', 'insure_kangebao_pop2'])
                                this.$message.alert('', '您所在地区不支持购买此产品', () => {
                                    setTimeout(() => {
                                        wx && wx.closeWindow()
                                    }, 300)
                                }, '我知道了')
                            } else {
                                this.policyHolder.city = this.location.city = res.data.attachment.city;
                            }
                        }
                    }, 500)
                })
            }).catch(err => {
                console.log(err)
                this.$hideLoading()
                this.$message.alert('', '无法获取您的位置信息', () => {
                    setTimeout(() => {
                        this.$goBackward()
                    }, 300)
                }, '我知道了')
            })
        },
        checkInfos() {

            return Promise.resolve().then(() => {
                return new Promise((resolve, reject) => {
                    var hasEmpty = false

                    if (this.insureds.relation == 'SELF') {
                        this.insureds.phone = this.policyHolder.phone;
                    }
                    console.log(this.policyHolder, this.insureds)
                    Object.keys(this.policyHolder).forEach(key => {

                        if (!this.policyHolder[key] && key != 'address') {
                            hasEmpty = true
                        }
                    })

                    Object.keys(this.insureds).forEach(key => {

                        if (!this.insureds[key]  && key != 'phone') {
                            if (key == 'idCutoffDate') {
                                if (this.insureds.idNum) {
                                    if (this.isCardNo(this.insureds.idNum)) {
                                        var idNumDate = this.insureds.idNum.substr(6, 4) + '-' + this.insureds.idNum.substr(10, 2) + '-' + this.insureds.idNum.substr(12, 2)
                                        var ageObj = getAge(idNumDate, true)

                                        if (ageObj.age >= this.limitAge) {
                                            hasEmpty = true
                                        }
                                    }
                                }
                            } else {
                                console.log('empty');
                                hasEmpty = true
                            }
                        }
                    })

                    if (hasEmpty) { reject('选项不能为空！') }

                    if (!this.isCardNo(this.policyHolder.idNum)) {
                        reject('投保人身份证格式有误')
                    }

                    if (!this.isPhoneNo(this.policyHolder.phone)) { reject('投保人手机格式有误') }

                    // if (!this.isPhoneNo(this.insureds.phone)) { reject('被保险人手机格式有误') }

                    if (!this.isCardNo(this.insureds.idNum)) {
                        reject('被保险人身份证格式有误')
                    }

                    // if (this.policyHolder.jobType > 4 && this.insureds.relation == 'SELF') {
                    //     reject('投保人职业无法投保')
                    // }

                    if (!this.smsCode) { reject('验证码不能为空') }

                    if (!this.agree) { reject('请阅读条款') }

                    resolve()
                })
            }).then(() => {
                return this.checkPolicyHolderAge();
            }).then(() => {
                return this.checkInsuredsAge();
            })

        },
        checkPolicyHolderAge() {
            var idNum = this.policyHolder.idNum
            var birthDay = new Date(idNum.substr(6, 4) + '/' + idNum.substr(10, 2) + '/' + idNum.substr(12, 2))

            var ageObj = getAge(birthDay)

            return new Promise((resolve, reject) => {
                if (ageObj.age < 18) {
                    reject('未满18')
                } else {
                    resolve()
                }
            })
        },
        checkInsuredsAge() {
            var idNum = this.insureds.idNum;
            var birthDay = new Date(idNum.substr(6, 4) + '/' + idNum.substr(10, 2) + '/' + idNum.substr(12, 2))

            var ageObj = getAge(birthDay, true);

            return new Promise((resolve, reject) => {
                if (ageObj.age < 0 || ageObj.age > 60 || (ageObj.age == 0 && ageObj.ageDate < this.limitAgeDate)) {
                    this.$message.toast('被保人年龄不适用');
                    reject('被保险人年龄不适用');
                } else {
                    resolve();
                }
            });

        },
        handleCheckPolicyAge: function() {
            var lock = false;

            return function() {
                if (!this.isCardNo(this.policyHolder.idNum)) return;

                if (lock) return;
                lock = true;
                this.checkPolicyHolderAge().then(() => {
                    lock = false;
                }).catch(err => {
                    this.$message.alert('', '由于作为投保人，您未能年满18岁，\n根据国家法律，您无法参与投保。\n为您对我们的信任我们深表感激。', function() {
                        lock = false;
                    });
                });
            }

        }(),
        handleCheckInsuredsAge: function() {
            var lock = false;

            return function() {
                if (!this.isCardNo(this.insureds.idNum)) return;

                if (lock) return;
                lock = true;

                this.checkInsuredsAge().then(() => {
                    lock = false;
                }).catch(err => {
                    this.$message.toast('被保人年龄不适用');
                    lock = false;
                });
            }

        }(),
        isPhoneNo(tel) {
            var pattern = /^1[23456789]\d{9}$/
            return pattern.test(tel)
        },
        isCardNo: function() {
            // 身份证号码验证
            // 验证身份证
            var powers = new Array('7', '9', '10', '5', '8', '4', '2', '1', '6', '3', '7', '9', '10', '5', '8', '4', '2')
            var parityBit = new Array('1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2')

            return function(_id) {
                _id = _id.toUpperCase()
                if (_id.length != 18) {
                    return false
                }
                // var pattern = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/
                // return pattern.test(card)
                _id = _id + ''
                var _num = _id.substr(0, 17)
                var _parityBit = _id.substr(17)
                var _power = 0
                for (var i = 0; i < 17; i++) {
                    // 校验每一位的合法性

                    if (_num.charAt(i) < '0' || _num.charAt(i) > '9') {
                        return false
                        break
                    } else {
                        // 加权

                        _power += parseInt(_num.charAt(i)) * parseInt(powers[i])
                            // //设置性别
                            // if (i == 16 && parseInt(_num.charAt(i)) % 2 == 0) {
                            // sex = "female"
                            // } else {
                            // sex = "male"
                            // }
                    }
                }
                // 取模
                var mod = parseInt(_power) % 11
                if (parityBit[mod] == _parityBit) {
                    return true
                }
                return false
            }
        }(),
        handleInfoChange: function() {
            var checkTimer = null
            return function() {
                if (checkTimer) { clearTimeout(checkTimer) }
                // if (this.insureds.relation) this.syncInsuredInfo();
                checkTimer = setTimeout(() => {
                    this.checkInfos().then(res => {
                        this.allRight = true
                    }).catch(err => {
                        this.allRight = false
                        console.log(err)
                    })
                }, 800)

                this.storageUserInfos()
            }
        }(),
        exit: function() {
            v.$hmt.trackEvent(this.version, 'click', 'insure_cancel1')
                // _hmt.push(['_trackEvent', 'button', 'click', 'insure_kangebao_cancel1'])
            v.$hmt.trackEvent(this.version, 'message', 'insure_pop4')
            v.$hmt.trackEvent(this.version, 'message', 'insure_popCancel')
                // _hmt.push(['_trackEvent', 'button', 'message', 'insure_kangebao_pop4'])
            this.$message.confirm('', '您尚未完成投保流程，\n是否确认退出？', (val) => {
                if (!val) {
                    v.$hmt.trackEvent(this.version, 'click', 'insure_confirm')
                        // _hmt.push(['_trackEvent', 'button', 'click', 'insure_kangebao_confirm'])
                    wx && wx.closeWindow()
                    this.$replace('/')
                } else {
                    v.$hmt.trackEvent(this.version, 'click', 'insure_cancel2')
                        // _hmt.push(['_trackEvent', 'button', 'click', 'insure_kangebao_cancel2'])
                }
            }, '取消', '确认退出')
        },
        storageUserInfos: function() {
            var storageTime = Date.now()
            this.$localStorage.setItem('insureds', this.insureds)
            this.$localStorage.setItem('policyHolder', this.policyHolder)
            this.$localStorage.setItem('storageTime', storageTime)
        },
        onChangeRelation() {
            let value = this.insureds.relation;

            this.removeFields('insureds', ['name', 'idNum', 'idCutoffDate', 'phone', 'address', 'job', 'jobCode']);
            this.removeFields('policyHolder', ['idCutoffDate']);
            if (value === 'SELF') {
                this.isSelf = true;
                this.insureds.name = this.policyHolder.name
                this.insureds.idNum = this.policyHolder.idNum
                this.insureds.phone = this.policyHolder.phone
                //this.insureds.address = this.policyHolder.city + this.policyHolder.address
                this.insureds.idCutoffDate = this.policyHolder.idCutoffDate

                if (this.policyHolder.jobType <= 4) {
                    this.insureds.job = this.policyHolder.job
                    this.insureds.jobType = this.policyHolder.jobType
                    this.insureds.jobCode = this.policyHolder.jobCode
                } else {
                    this.jobAlert();
                }
            } else {
                this.family=this.filterData(this.userInfo.userFamilies, 'relation', value)
                this.chooseInsurds(0)
                this.isSelf = false;
                this.insureds.name = this.insureds.name !== this.policyHolder.name ? this.insureds.name : ''
                this.insureds.idNum = this.insureds.idNum !== this.policyHolder.idNum ? this.insureds.idNum : ''
                this.insureds.phone = this.policyHolder.phone
                    // this.insureds.phone = this.insureds.phone !== this.policyHolder.phone ? this.insureds.phone : ''
                //this.insureds.address = this.insureds.address !== (this.policyHolder.city + this.policyHolder.address) ? this.insureds.address : ''
                //this.insureds.idCutoffDate = this.insureds.idCutoffDate !== this.policyHolder.idCutoffDate ? this.insureds.idCutoffDate : ''
                // this.insureds.job = this.insureds.job !== this.policyHolder.job ? this.insureds.job : ''
                // this.insureds.jobType = this.insureds.job !== this.policyHolder.job ? this.insureds.jobType : ''
                // this.insureds.jobCode = this.insureds.job !== this.policyHolder.job ? this.insureds.jobCode : ''
            }

            // this.removeFields('insureds', ['idCutoffDate', 'phone', 'address', 'job', 'jobType', 'jobCode']);
            // this.removeFields('policyHolder', ['idCutoffDate', 'job', 'jobType', 'jobCode']);


        },
        syncInsuredInfo() {
            let value = this.insureds.relation;
            if (value === 'SELF') {
                this.isSelf = true;
                this.insureds.name = this.policyHolder.name
                this.insureds.idNum = this.policyHolder.idNum
                this.insureds.phone = this.policyHolder.phone
                //this.insureds.address = this.policyHolder.city + this.policyHolder.address
                this.insureds.idCutoffDate = this.policyHolder.idCutoffDate

                if (this.policyHolder.jobType <= 4) {
                    this.insureds.job = this.policyHolder.job
                    this.insureds.jobType = this.policyHolder.jobType
                    this.insureds.jobCode = this.policyHolder.jobCode
                }
            }

        },
        jobAlert: function() {
            var isAlert = false;

            return function() {
                if (isAlert) return;
                isAlert = true;

                this.$message.alert('', '您当前所在的职业无法投保', function() {
                    isAlert = false;
                });
            }

        }(),
        judgePolicyHolder() {
            //验证投保人信息
            this.validateHolderInfo().then(res => {
                // this.showPolicyHolder = false
            }).catch(err => {
                this.showPolicyHolder = true
            });
        },
        validateHolderInfo() {
            let _this = this;
            let hasEmpty = false;
            let valiObj = {
                name: '',
                idNum: '',
                idCutoffDate: '',
                job: '',
                jobType: '',
                jobCode: '',
                address: ''
            };
            Object.keys(valiObj).forEach(key => {
                valiObj[key] = _this.policyHolder[key]
            });
            return Promise.resolve().then(() => {
                return new Promise((resolve, reject) => {
                    Object.keys(valiObj).forEach(key => {
                        if (!valiObj[key]) {
                            hasEmpty = true
                        }
                    });
                    if (hasEmpty) {
                        reject('选项不能为空！')
                    }

                    if (!this.isCardNo(valiObj.idNum)) {
                        reject('投保人身份证格式有误')
                    }

                    // if (valiObj.jobType > 4 && this.insureds.relation == 'SELF') {
                    //     reject('投保人职业无法投保')
                    // }

                    resolve()
                })
            }).then(() => {
                return this.checkPolicyHolderAge()
            })


        },
        judgeInsureds() {
            this.validateInsuredsInfo().then(res => {
                // this.showInsureds = false
            }).catch(err => {
                this.showInsureds = true
            })
        },
        validateInsuredsInfo() {
            let _this = this;
            let hasEmpty = false;
            let valiObj = {
                name: '',
                idNum: '',
                idCutoffDate: '',
                job: '',
                jobType: '',
                jobCode: '',
                address: ''
            };
            Object.keys(valiObj).forEach(key => {
                valiObj[key] = _this.insureds[key]
            });
            return Promise.resolve().then(() => {
                return new Promise((resolve, reject) => {
                    Object.keys(valiObj).forEach(key => {

                        if (!valiObj[key]) {
                            if (key == 'idCutoffDate') {
                                if (valiObj.idNum) {
                                    if (this.isCardNo(valiObj.idNum)) {
                                        var idNumDate = valiObj.idNum.substr(6, 4) + '-' + valiObj.idNum.substr(10, 2) + '-' + this.insureds.idNum.substr(12, 2)
                                        var ageObj = getAge(idNumDate, true)

                                        if (ageObj.age >= this.limitAge) {
                                            hasEmpty = true
                                        }
                                    }
                                }
                            } else {
                                hasEmpty = true
                            }
                        }
                    })

                    if (hasEmpty) {
                        reject('选项不能为空！')
                    }
                    if (!this.isPhoneNo(_this.insureds.phone) && _this.insureds.relation !== "SELF") {
                        reject('被保险人手机格式有误')
                    }

                    if (!this.isCardNo(valiObj.idNum)) {
                        reject('被保险人身份证格式有误')
                    }

                    resolve()
                })
            }).then(res => {
                return this.checkInsuredsAge();
            })


        },
        // getJobLabel(code) {
        //     return code ? this.jobOptions.filter(item => item.value == code)[0].label : ""
        // },
        // getJobType(code) {
        //     return code ? this.jobOptions.filter(item => item.value == code)[0].type : ""
        // },
    },
    components: {
        inputGroup,
        selectGroup,
        dateGroup,
        locationGroup,
        agreeGroup,
        smsGroup,
        datePickerGroup,
        jobselectGroup,
        cityPickerGroup
    },
    computed: {
        relationText: function() {
            let obj = {
                'SELF': "本人",
                'PARENTS': "父母",
                'SPOUSE': "配偶",
                'CHILD': "子女",
            }
            return obj[this.insureds.relation]
        },
        //玩赚 康e保活动，增加代理人oid字段
        poid() {
            console.log('==>poid', this.$url.parseUrl('poid'))
            return this.$url.parseUrl('poid') || ""
                // return sessionStorage.getItem("poid") || ""
        },
        agentId() {
            console.log('==>agentId', this.$url.parseUrl('agentId'))
            return this.$url.parseUrl('agentId') || ""
                // return sessionStorage.getItem("poid") || ""
        },
        ...mapState([
            'version',
            'jobOptions'
        ])
    },
    watch: {
        'insureds.relation': function(value) {
            this.onChangeRelation();
            this.handleInfoChange()
        },
        'insureds.idNum': function(value) {
            var idNumDate = value.substr(6, 4) + '-' + value.substr(10, 2) + '-' + value.substr(12, 2)
            if (this.isCardNo(value)) {
                var ageObj = getAge(idNumDate, true)
                if (ageObj.age < this.limitAge) {
                    this.hideInsuredsIdCut = true
                } else {
                    this.hideInsuredsIdCut = false
                }

                this.checkInfos().then(res => {
                    this.allRight = true
                }).catch(err => {
                    this.allRight = false
                    console.log(err)
                })
            } else {
                this.allRight = false
            }

            this.handleInfoChange()
        },
        'agree': function(value) {
            if (value) {
                this.checkInfos().then(res => {
                    this.allRight = true
                }).catch(err => {
                    this.allRight = false
                    console.log(err)
                })
            } else {
                this.allRight = false
            }
        },
        'insureds.address': function() {
            this.handleInfoChange()
        },
        'insureds.idCutoffDate': function() {
            this.handleInfoChange()
        },
        'insureds.name': function() {
            this.handleInfoChange()
        },
        'insureds.phone': function() {
            this.handleInfoChange()
        },
        'insureds.jobCode': function(val) {
            if(val){
                this.insureds.job= this.jobOptions[val].label||'';
                this.insureds.jobType= this.jobOptions[val].type||'';
            }
            this.handleInfoChange()
        },
        'policyHolder.address': function() {
            this.handleInfoChange();
            this.syncInsuredInfo();
        },
        'policyHolder.city': function() {
            this.handleInfoChange();
            this.syncInsuredInfo();
        },
        'policyHolder.idCutoffDate': function() {
            this.handleInfoChange();
            this.syncInsuredInfo();
        },
        'policyHolder.idNum': function() {
            this.handleInfoChange();
            this.syncInsuredInfo();
        },
        'policyHolder.name': function() {
            this.handleInfoChange();
            this.syncInsuredInfo();
        },
        'policyHolder.phone': function(val, newVal) {
            let phone = this.policyHolder.phone;
            if (this.insureds.relation === "SELF" && phone && this.isPhoneNo(phone)) {
                this.insureds.phone = phone;
            }
            this.handleInfoChange();
            this.syncInsuredInfo();
        },
        'policyHolder.jobCode': function(val) {
            if(val){
                this.policyHolder.job= this.jobOptions[val].label
                this.policyHolder.jobType= this.jobOptions[val].type
            }
            this.handleInfoChange();
            this.syncInsuredInfo();

            setTimeout(() => {
                if (this.insureds.relation == 'SELF') {
                    this.insureds.job = this.policyHolder.job;
                    this.insureds.jobCode = this.policyHolder.jobCode;
                    this.insureds.phone = this.policyHolder.phone;
                }
            }, 300);

        },
        'smsCode': function() {
            this.handleInfoChange()
        },
        '$route': () => {
            console.log(arguments)
        },
        'placeDetial'(){
            this.getArea(this.province) 
        }

    }
}

function getAge(date, one = false) {
    var birthDate = moment(date);
    var nowDate = one ? moment(Date.now() + (1000 * 60 * 60 * 24)) : moment(Date.now());;
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
    console.log(age)
    return { age, ageDate };
}