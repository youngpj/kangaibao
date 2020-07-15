<template>
    <div class="page">
        <div class="form-container">
            <div class="form-title" @click="showPolicyHolder=true">
                <p>投保人信息</p>
                <span class="form-title-icon" @click="showPolicyHolder=true" v-show="!showPolicyHolder"></span>
                <span class="form-title-name" v-show="!showPolicyHolder">姓名：{{policyHolder.name}}</span>
            </div>
            <div class="input-container" v-show="showPolicyHolder">
                <input-group v-model="policyHolder.name" label="姓名：" type='name' placeholder="请输入投保人姓名" :dirty="allDirty" :readonly="isReadonly||this.userInfo.bindIdNumber==1" />
                <input-group v-model="policyHolder.idNum" label="身份证号：" placeholder="请输入投保人身份证号码" type="idcard" :dirty="allDirty" @blur="handleCheckPolicyAge" :readonly="isReadonly||this.userInfo.bindIdNumber==1" />
                <date-picker-group :option="dateOpt" v-model="policyHolder.idCutoffDate" :dirty="allDirty" label="有效期限：" placeholder="请选择投保人身份证有效期限" :category="'policyHolder'" />
                <select-group v-model="policyHolder.jobCode" label="职业类别：" placeholder="请选择" :dirty="allDirty" :options="jobOptions" />
                <sms-group v-model="policyHolder.phone" label="手机号：" placeholder="请输入投保人手机号" @onSend="onSendSms" :dirty="allDirty" />
                <input-group v-model="smsCode" label="验证码：" placeholder="请输入手机验证码" :dirty="allDirty" />
                <!-- <jobselect-group label="职业：" v-model="policyHolder.job" placeholder="请选择投保人职业" :limit="false" @select="onSelectPolicyJob" :dirty="allDirty"/>  -->
                <!-- <location-group label="地址：" :city="policyHolder.city" placeholder="请输入详细地址" :dirty="allDirty" v-model="policyHolder.address"/> -->
            </div>

        </div>

        <div class="form-container" :class="{changePosition:!showPolicyHolder}" @click="judgePolicyHolder">
            <div class="form-title" @click="showInsureds=true">
                <p>被保险人信息</p>
                <span class="form-title-icon" @click="showInsureds=true" v-show="!showInsureds"></span>
                <span class="form-title-name" v-show="!showInsureds">关系：{{relationText}}</span>
            </div>
            <div class="input-container" v-show="showInsureds">
                <!-- <select-group ref="relation" v-model="insureds.relation" label="关系：" placeholder="被保人是您的" :dirty="allDirty" :options="[{value: 'SELF', label: '本人'}, {value: 'PARENTS', label: '父母'}, {value: 'SPOUSE', label: '配偶'}, {value: 'CHILD', label: '子女'}]"/>  -->
                <div class='relation flex'>
                    <div v-for="(item,index) in [{value: 'SELF', label: '本人'}, {value: 'PARENTS', label: '父母'}, {value: 'SPOUSE', label: '配偶'}, {value: 'CHILD', label: '子女'}]" :key='index' :class='{active:insureds.relation==item.value}' @click='insureds.relation=item.value;chooseInsurds(0)'>
                        {{item.label}}
                    </div>
                </div>
                <div class='relation flex familyBox' v-show='insureds.relation!="SELF"'>
                    <div v-for="(item,index) in family" :key='index' :class='{active:(insureds.idNum==item.idnumber&&insureds.name==item.name&&!newInsureds)}' @click='chooseInsurds(index)'>
                        {{item.name}}
                    </div>
                    <div @click="resetInsureds" :class='{active:newInsureds}'>+添加</div>
                </div>
                <div v-show="!isSelf">
                    <input-group v-model="insureds.name" label="姓名：" type='name' placeholder="请输入被保险人姓名" :readonly='!newInsureds&&insureds.name' :dirty="allDirty" />
                    <!-- <input-group v-model="insureds.phone" label="手机号：" placeholder="请输入被保险人手机号码" :dirty="allDirty" type="phone"/>   -->
                    <input-group v-model="insureds.idNum" label="身份证号：" placeholder="请输入被保险人身份证号码" :dirty="allDirty" type="idcard" :readonly='!newInsureds&&insureds.idNum' @blur="handleCheckInsuredsAge" />
                    <date-picker-group :option="dateOpt" v-model="insureds.idCutoffDate" label="有效期限：" placeholder="请选择被保险人身份证有效期" v-show="!hideInsuredsIdCut" :dirty="allDirty" :category="'insureds'" />
                    <select-group v-show="insureds.relation && insureds.relation != 'SELF'" v-model="insureds.jobCode" label="职业类别：" placeholder="请选择" :dirty="allDirty" :options="jobOptions" />
                    <!-- <jobselect-group v-model="insureds.job" label="职业：" placeholder="请选择被保险人职业" @select="onSelectInsuredsJob" :limit="true" :dirty="allDirty"/>  -->
                </div>
                <city-picker-group :dirty="allDirty" label="所在城市：" :value='province' placeholder="被保险人所在城市" @outputArea="getArea"></city-picker-group>
                <input-group v-model="placeDetial" label="详细地址：" type="address" placeholder="请输入被保险人地址" :dirty="allDirty" />
            </div>
        </div>

        <!-- <div class="form-container" :class="{changePosition:!showInsureds}" @click="judgeInsureds">
      <div class="form-title">
        通讯信息
      </div>
      <div class="input-container">
        <sms-group v-model="policyHolder.phone" label="手机号：" placeholder="请输入投保人手机号" @onSend="onSendSms" :dirty="allDirty"/>
        <input-group v-model="smsCode" label="验证码：" placeholder="请输入手机验证码" :dirty="allDirty" />        
      </div>
    </div> -->

        <agree-group v-model="agree" />

        <footer>
            <div class="footer-btn" @click="exit" click-tag="取消">取消</div>
            <div class="footer-btn" :class="{ 'active': allRight}" v-safeClick="{fn: createPolicy}" click-tag="立即投保">立即投保</div>
        </footer>

        <transition name="zoomIn">
            <div class="captcha-modal" v-show="captchaVisiable">
                <div class="overlay"></div>
                <div class="captcha-container">
                    <div class="captcha-title">请输入图形验证码</div>
                    <div class="captcha-input-container">
                        <input v-resetInput type="text" placeholder="" v-model="captchaCode" />
                        <div class="pic-container">
                            <img :src="captchaImg" alt="图形验证码失效了">
                        </div>
                    </div>
                    <div class="captcha-btn" v-safeClick="{fn:sendSmsCode}">确定</div>
                    <img src="../../assets/image/close.png" alt="" class="captcha-close-btn" @click="captchaVisiable = false;">
                    <img src="../../assets/image/refresh.png" alt="" class="captcha-refresh-btn" @click="createCaptcha">
                </div>
            </div>
        </transition>

        <!-- 埋点用标签 -->
        <div class="monitor">
            <input v-resetInput type="hidden" v-model="policyHolder.address" input-tag="投保人地址">
            <input v-resetInput type="hidden" v-model="policyHolder.city" input-tag="投保人城市">
            <input v-resetInput type="hidden" v-model="policyHolder.idCutoffDate" input-tag="投保人身份证有效期">
            <input v-resetInput type="hidden" v-model="policyHolder.idNum" input-tag="投保人身份证">
            <input v-resetInput type="hidden" v-model="policyHolder.job" input-tag="投保人职业">
            <input v-resetInput type="hidden" v-model="policyHolder.name" input-tag="投保人姓名">
            <input v-resetInput type="hidden" v-model="policyHolder.phone" input-tag="投保人手机号" phone-number>

            <input v-resetInput type="hidden" v-model="insureds.address" input-tag="被保人地址">
            <input v-resetInput type="hidden" v-model="insureds.relation" input-tag="被保人与被保人关系">
            <input v-resetInput type="hidden" v-model="insureds.idCutoffDate" input-tag="被保人身份证有效期">
            <input v-resetInput type="hidden" v-model="insureds.idNum" input-tag="被保人身份证">
            <input v-resetInput type="hidden" v-model="insureds.job" input-tag="被保人职业">
            <input v-resetInput type="hidden" v-model="insureds.name" input-tag="被保人姓名">
            <input v-resetInput type="hidden" v-model="insureds.phone" input-tag="被保人手机号">

            <input v-resetInput type="hidden" v-model="agree" input-tag="我已阅读">

        </div>
    </div>
</template>
<script src="./script.js"></script>
<style scoped src="./style.css"></style>