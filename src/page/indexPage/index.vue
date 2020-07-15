<template>
    <div id="page" class="page">
        <agentAlert
            :agent-alert-show="agentAlertShow"
            :agent-name="agentName"
            @handleAgentSelf="handleAgentSelf"
            @handleAgentClose="handleAgentClose"
        ></agentAlert>
        <header>
            <img src="../../assets/image/banner-new.jpg" alt="">
        </header>
        <main>
            <div class="main-container">
                <div class="sec sec3">
                    <div class="scheme">
                        <div class="scheme-title">
                            <h1>
                                住院医疗保障
                            </h1>
                            <p>一般医疗保障金</p>
                        </div>
                    </div>
                    
                    <div class="amount-val">
                        <strong>{{ range2Vals[range2 - 1] }}</strong> 万
                    </div>

                    <div class="fangan-container fangan-container2">
                        <div class="mianpeie-content">
                            <div class="mianpeie-key">免赔额</div>
                            <div class="mianpeie-val">0元</div>
                        </div>
                        <div class="fangan-infos-container" v-show="range2 > 0">
                            <div class="fainfo-item">
                                <div class="key">床位费和膳食费</div>
                                <div class="val" v-if="range2">
                                    <scroll-num 
                                        left-txt="每日限额"
                                        right-txt="元"
                                        :upgrade="lastRange2 && (mustPlanInfos[range2 - 1].amtPerday != mustPlanInfos[lastRange2 - 1].amtPerday) && range2Upgrade" 
                                        :lowgrade="lastRange2 && (mustPlanInfos[range2 - 1].amtPerday != mustPlanInfos[lastRange2 - 1].amtPerday) && !range2Upgrade" 
                                        v-model="mustPlanInfos[range2 - 1].amtPerday"
                                        />
                                </div>
                            </div>
                            <div class="fainfo-item">
                                <div class="key">基本医疗费、医生费等<img class="more" src="../../assets/image/more.png" alt="查看更多" @click="more" /></div>
                                <div class="val">{{range2 && mustPlanInfos[range2 - 1].medicineAmt}}</div>
                            </div>
                            <div class="fainfo-item">
                                <div class="key">扩展药品费</div>
                                <div class="val" v-if="range2">
                                    <scroll-num 
                                        
                                        :right-txt="mustPlanInfos[range2 - 1].drug"
                                        :upgrade="lastRange2 && (mustPlanInfos[range2 - 1].drug != mustPlanInfos[lastRange2 - 1].drug) && range2Upgrade" 
                                        :lowgrade="lastRange2 && (mustPlanInfos[range2 - 1].drug != mustPlanInfos[lastRange2 - 1].drug) && !range2Upgrade" 
                                        />
                                </div>
                            </div>
                            
                            <div class="fainfo-item">
                                <div class="key">特殊门诊医疗费用</div>
                                <div class="val" v-if="range2">
                                    <scroll-num 
                                        :right-txt="mustPlanInfos[range2 - 1].special"
                                        :upgrade="lastRange2 && (mustPlanInfos[range2 - 1].special != mustPlanInfos[lastRange2 - 1].special) && range2Upgrade" 
                                        :lowgrade="lastRange2 && (mustPlanInfos[range2 - 1].special != mustPlanInfos[lastRange2 - 1].special) && !range2Upgrade" 
                                        />
                                </div>
                            </div>
                            <div class="fainfo-item">
                                <div class="key">手术植入器材</div>
                                <div class="val" v-if="range2">
                                    <scroll-num 
                                        :left-txt="mustPlanInfos[range2 - 1].surgery  ? '年限额' : '不含'"
                                        :right-txt="mustPlanInfos[range2 - 1].surgery  ? '万元' : ''"
                                        v-model="mustPlanInfos[range2 - 1].surgery"
                                        :upgrade="lastRange2 && (mustPlanInfos[range2 - 1].surgery != mustPlanInfos[lastRange2 - 1].surgery) && range2Upgrade" 
                                        :lowgrade="lastRange2 && (mustPlanInfos[range2 - 1].surgery != mustPlanInfos[lastRange2 - 1].surgery) && !range2Upgrade" 
                                        />
                                </div>
                            </div>
                            <div class="fainfo-item">
                                <div class="key">住院前后门急诊费用</div>
                                <div class="val">{{range2 && mustPlanInfos[range2 - 1].beforeAfter}}</div>
                            </div>
                            <!-- <div class="fainfo-item">
                                <div class="key">免赔额</div>
                                <div class="val">{{range2 && mustPlanInfos[range2 - 1].deductibles}}</div>
                            </div> -->
                            <div class="fainfo-item">
                                <div class="key">赔付比例</div>
                                <div class="val" v-if="range2">
                                    <scroll-num 
                                        left-txt=""
                                        right-txt="%"
                                        :upgrade="lastRange2 && (mustPlanInfos[range2 - 1].percent != mustPlanInfos[lastRange2 - 1].percent) && range2Upgrade" 
                                        :lowgrade="lastRange2 && (mustPlanInfos[range2 - 1].percent != mustPlanInfos[lastRange2 - 1].percent) && !range2Upgrade" 
                                        v-model="mustPlanInfos[range2 - 1].percent"
                                        />
                                </div>
                                <!-- <div class="val">{{range2 && mustPlanInfos[range2 - 1].percent}}</div> -->
                            </div>
                            <div class="fainfo-item">
                                <div class="key">恶性肿瘤医疗保险金</div>
                                <div class="val" v-if="range2">
                                    <scroll-num 
                                        :right-txt="mustPlanInfos[range2 - 1].exing ? '万' : '不含'"
                                        :upgrade="lastRange2 && (mustPlanInfos[range2 - 1].exing != mustPlanInfos[lastRange2 - 1].exing) && range2Upgrade" 
                                        :lowgrade="lastRange2 && (mustPlanInfos[range2 - 1].exing != mustPlanInfos[lastRange2 - 1].exing) && !range2Upgrade" 
                                        v-model="mustPlanInfos[range2 - 1].exing"
                                        />
                                </div>
                            </div>
                        </div>
                    </div>

                    <amount-selector-group v-model="range2" :options="['6万', '12万', '30万', '100万']" :min-value="minValue"/>
                </div>
                <div class="sec sec2">
                    <div class="scheme">
                        
                        <div class="scheme-title">
                            <div class="check-box-opt">
                                <input v-resetInput type="checkbox" v-model="checkedOpt"/>
                                <div>可选保障</div>
                            </div>
                            <h1>
                                普通门急诊医疗保险金
                            </h1>
                        </div>
                        <!-- <range-group v-model="range1" :forbid="forbid" :params="[{value: 0, label: '0'},{value: 33.3, label: '2000'},{value: 66.6, label: '5000'},{value: 100, label: '10000'}]" /> -->

                    </div>

                    <div class="amount-val">
                        <strong>{{ range1Vals[range1 - 1] }}</strong> {{ !range1 ? '未选择' : range1 == 3 ? '万' : '千' }}
                    </div>
                    <div class="fangan-container" v-show="range1 > 0">
                        <!-- <range-group v-model="range1" :forbid="forbid" :params="[{value: 0, label: '0'},{value: 33.3, label: '2000'},{value: 66.6, label: '5000'},{value: 100, label: '10000'}]" /> -->
                        <div class="fangan-infos-container">
                            <div class="fainfo-item">
                                <div class="key">普通门急诊保险金</div>
                                <div class="val" v-if="range1">
                                    <scroll-num 
                                        left-txt="￥"
                                        :upgrade="lastRange1 && (optionPlanInfos[range1 - 1].amount != optionPlanInfos[lastRange1 - 1].amount) && range1Upgrade" 
                                        :lowgrade="lastRange1 && (optionPlanInfos[range1 - 1].amount != optionPlanInfos[lastRange1 - 1].amount) && !range1Upgrade" 
                                        v-model="optionPlanInfos[range1 - 1].amount"
                                        />
                                </div>
                            </div>
                            <div class="fainfo-item">
                                <div class="key">单次赔付限额</div>
                                <div class="val" v-if="range1">
                                    <scroll-num
                                        left-txt="￥" 
                                        :upgrade="lastRange1 && (optionPlanInfos[range1 - 1].limit != optionPlanInfos[lastRange1 - 1].limit) && range1Upgrade" 
                                        :lowgrade="lastRange1 && (optionPlanInfos[range1 - 1].limit != optionPlanInfos[lastRange1 - 1].limit) && !range1Upgrade" 
                                        v-model="optionPlanInfos[range1 - 1].limit"
                                        />
                                </div>
                            </div>
                            <div class="fainfo-item">
                                <div class="key">单次免赔额</div>
                                <div class="val" v-if="range1">
                                    <scroll-num 
                                        left-txt="￥"
                                        :upgrade="lastRange1 && (optionPlanInfos[range1 - 1].deductibles != optionPlanInfos[lastRange1 - 1].deductibles) && range1Upgrade" 
                                        :lowgrade="lastRange1 && (optionPlanInfos[range1 - 1].deductibles != optionPlanInfos[lastRange1 - 1].deductibles) && !range1Upgrade" 
                                        v-model="optionPlanInfos[range1 - 1].deductibles"
                                        />
                                </div>
                            </div>
                            <div class="fainfo-item">
                                <div class="key">赔付比例</div>
                                <div class="val" v-if="range1">
                                    <scroll-num 
                                        right-txt="%"
                                        :upgrade="lastRange1 && (optionPlanInfos[range1 - 1].percent != optionPlanInfos[lastRange1 - 1].percent) && range1Upgrade" 
                                        :lowgrade="lastRange1 && (optionPlanInfos[range1 - 1].percent != optionPlanInfos[lastRange1 - 1].percent) && !range1Upgrade" 
                                        v-model="optionPlanInfos[range1 - 1].percent"
                                        />
                                </div>
                            </div>
                            <div class="fainfo-item">
                                <div class="key">扩展药品费</div>
                                <div class="val" v-if="range1">
                                    <scroll-num 
                                        :right-txt="optionPlanInfos[range1 - 1].drug"
                                        :upgrade="lastRange1 && (optionPlanInfos[range1 - 1].drug != optionPlanInfos[lastRange1 - 1].drug) && range1Upgrade" 
                                        :lowgrade="lastRange1 && (optionPlanInfos[range1 - 1].drug != optionPlanInfos[lastRange1 - 1].drug) && !range1Upgrade" 
                                        />
                                </div>
                            </div>
                        </div>
                    </div>

                    <amount-selector-group  v-show="range1 > 0" v-model="range1" :options="['2千', '5千', '1万']" />
                </div>
                
            </div>
            <div class="clear"></div>
            <div class="product-item red-packet-item" @click="toGoldAct" v-if="actBannerVisible">
                <p>您有最高<span>66元</span>红包待领取</p>
                <div class="bonus-btn">立即领取></div>

            </div>
            <div class="container">
                <div class="block-head">
                    <h2>理赔说明</h2>
                </div>
                <div class="line"></div>
                <div class="inshort-container">
                    <div class="index-num"></div>
                    <div class="inshort-header">第一步：线下申请</div>
                    <div class="inshort-content">
                        请您将理赔材料邮寄至：上海市浦东新区陆家嘴西路99号18楼（民生健康险事业部）
                    </div>
                </div>
                <div class="inshort-container">
                    <div class="index-num"></div>
                    <div class="inshort-header">第二步：完成理赔</div>
                    <div class="inshort-content">
                        我们会根据审核结果将理赔款项支付到受益人指定账户
                    </div>
                </div>
                <div class="more-container">
                    <img src="../../assets/image/more-hui.png" alt="">
                    更多详情请阅读<a @click="toXuzhi">《投保须知》</a>和<a @click="showImgViewer('tiaokuanViewer')">《保险条款》</a>
                </div>
            </div>

            <!-- 常见问题按钮 -->
            <div class="ques-btn" @click="toFaq" click-tag="常见问题">
                <span>常见问题</span>
                <img src="../../assets/image/jiantouyou.png" alt="" class="arrow">
            </div>

        </main>

        <div class="infos-group">
            <div class="infos-key">被保人</div>
            <div class="infos-check-item" @click="openSelector('shebaoCheck')">
                <shebao-selector v-model="userCheckInfo.hasShebao" ref="shebaoCheck" />
            </div>
            <div class="infos-check-item" @click="openSelector('birthCheck')">
                <birtyday-selector v-model="userCheckInfo.birthDate" ref="birthCheck"/>
            </div>
        </div>

        <footer>
            <div class="footer-left-content">
                <div class="kefu">
                    <a @click="altVisible=true" click-tag="客服">客服</a>
                </div>
                <div class="amount" v-show="totalPayment"><span>￥</span>{{totalPayment.toFixed(2)}}</div>
                <div class="amount" v-show="!totalPayment"><span>￥</span>{{checkedOpt ? '426' : '87'}}<span style="color: #117EFF;"> 起</span></div>
            </div>
            <div class="footer-right-btn active" @click="toInform" click-tag="我要投保">我要投保</div>
        </footer>

        <!-- <pic-viewer :pic-list="xuzhiImgList" ref="xuzhiViewer"/> -->
        <pic-viewer :pic-list="tiaokuanImgList" ref="tiaokuanViewer"/>

        <!-- 埋点用标签 -->
        <div class="monitor">
            <input v-resetInput type="hidden" v-model="fmtBirtyday" input-tag="出生日期">
            <input v-resetInput type="hidden" v-model="userCheckInfo.hasShebao" input-tag="有无社保">
            <input v-resetInput type="hidden" v-model="range1" input-tag="普通门急诊医疗保险金">
            <input v-resetInput type="hidden" v-model="range2" input-tag="一般医疗保险金">
            <input v-resetInput type="hidden" v-model="totalPayment" input-tag="每年保费">         
        </div>
        <altQrcode :altVisible="altVisible" @closeModal="altVisible=false"></altQrcode>
    </div>
</template>
<script src="./script.js"></script>
<style scoped src="./style.css"></style>