<template>
    <div id="page" class="page">        
        <main>
            <div class='main-container'>
                <div class="product-item hospitalized  hospital-anm" :class="{'active':unfold}">
                    <img src="../../assets/image/economic/bg1.png" alt="" class="content-img">
                    <div class='hospitalized-item'>
                        <div class="flexbt rule-box">
                            <p>住院医疗保障</p>
                            <div class="money-box">
                                <span>6</span>万</div>
                        </div>
                        <div class="sub-rule" v-show='unfold'>一般医疗保障金</div>
                        <div class="flexbt free-rule-box">
                            <p>免赔额</p>
                            <p>0元</p>
                        </div>
                    </div>
                    <div class="unfold-text" @click="unfoldFun(false)">
                        <div class="flexbt">
                            <p>赔付比例</p>
                            <p class="unfold-money">50%</p>
                        </div>
                        <div class="flexbt">
                            <p>药品目录</p>
                            <p class="unfold-money">社保内用药</p>
                        </div>
                    </div>
                </div>
                <div class="product-item unfold-anm" :class="{'active':unfold}">
                    <div class="link">
                        <img src="../../assets/image/economic/link.png" alt="" class='line-img'>
                        <img src="../../assets/image/economic/link.png" alt="" class='line-img'>
                    </div>
                    <div class="outpatient-box">
                        <div class="flexcenter normal-outpatient">
                            <div><input v-resetInput type="checkbox" v-model="randcheck" click-tag="复选框">
                                <p>可选保障</p>
                            </div>
                        </div>
                        <div class="flexbt rule-box">
                            <p>普通门急诊医疗保障</p>
                            <div class="money-box">
                                <span>2</span>千</div>
                        </div>
                    </div>
                    <div class="unfold" @click="unfoldFun(true)" v-show="!unfold" click-tag='展开详情'>展开详情
                        <i class="bottom-arrow"></i>
                    </div>
                    <div class="unfold-text" @click="unfoldFun(false)" v-show="unfold">
                        <div class="flexbt">
                            <p>单次赔付限额</p>
                            <p class="unfold-money">300元</p>
                        </div>
                        <div class="flexbt">
                            <p>单次免赔额</p>
                            <p class="unfold-money">50元</p>
                        </div>
                        <div class="flexbt">
                            <p>赔付比例</p>
                            <p class="unfold-money">50%</p>
                        </div>
                        <div class="flexbt">
                            <p>药品目录</p>
                            <p class="unfold-money">社保内用药</p>
                        </div>
                    </div>
                </div>
                <div class="product-item red-packet-item" @click="toGoldAct" v-if="actBannerVisible">
                    <p>您有最高<span>66元</span>红包待领取</p>
                    <div class="bonus-btn">立即领取></div>

                </div>

                <div class="product-item">
                    <img src="../../assets/image/economic/title1.png" class="title-img">
                    <img src="../../assets/image/economic/compare.png" class="compare-img">
                    <div class="example-box">
                        <img src="../../assets/image/economic/examplebtn.png" alt="" class="examplebtn">
                        <div class="example">
                            <div class="avator">
                                <img src="../../assets/image/economic/man.png" alt="">
                            </div>
                            <div class="example-text">小王买了
                                <span>康e保（经适版）</span>，免赔额为0元。小王住院花了8000元（除了社保报销的），按照50%的赔付比例，那么这次赔付为4000元。
                            </div>
                        </div>
                        <div class="example">
                            <div class="avator">
                                <img src="../../assets/image/economic/women.png">
                            </div>
                            <div class="example-text">小芳买了个保险A，免赔额为 10000元。小芳去看病花了 8000元（除了社保报销的），那么这次1分钱赔不到。</div>
                        </div>
                    </div>
                    <img src="../../assets/image/economic/bg2.png" alt="" class="content-img">
                    <img src="../../assets/image/economic/title2.png" class="title-img">
                    <img src="../../assets/image/economic/bg3.png" alt="" class="content-img">
                    <img src="../../assets/image/economic/title3.png" class="title-img">
                    <img src="../../assets/image/economic/bg4.png" class="content-img">
                    <div class="medical-spend">
                        <div>2017年1-11月，全国三级公立医院人均住院费用为13129.2元；全国三级公立医院次均门诊费用为304.2元。</div>
                        <p>*数据来源：国家卫生健康委员会统计信息中心</p>
                    </div>
                    <img src="../../assets/image/economic/bg5.png" alt="" class='blockimg'>
                </div>
                <div class="more-container"><img src="../../assets/image/economic/shape.png"> 更多详情请阅读
                    <a href="javascript:void(0);" @click="toXuzhi">《投保须知》</a>和
                    <a href="javascript:void(0);" @click="showImgViewer('tiaokuanViewer')">《保险条款》</a>您也可以查看
                    <span @click='switchToPage()'>完整版“康e保” </span>
                </div>
                <div class="claim-inf product-item">
                    <div class="block-head">
                        <h2>理赔说明</h2>
                    </div>
                    <div class="line"></div>
                    <div class="inshort-container">
                        <div class="index-num">1</div>
                        <div class="inshort-header">第1步：线下申请</div>
                        <div class="inshort-content">
                            请您将理赔材料邮寄至：上海市浦东新区陆家嘴西路99号18楼（民生健康险事业部）
                        </div>
                    </div>
                    <div class="inshort-container">
                        <div class="index-num">2</div>
                        <div class="inshort-header">第2步：完成理赔</div>
                        <div class="inshort-content">
                            我们会根据审核结果将理赔款项支付到受益人指定账户。
                        </div>
                    </div>
                </div>
                <div class="product-item faq">
                    <div class="faq-title">常见问题</div>
                    <div class="faq-item">
                        <p>什么是等待期？有多少天？</p>
                        A：自本合同生效之日起 30 日(含)内为等待期。在等待期内，被保险人因疾病接受治疗的，无论是否延续至可选责任等待期后，我们均不承担本合同的可选责任。续保合同无等待期。被保险人因意外伤害治疗的，无等待期。
                    </div>
                    <div class="faq-item">
                        <p>保障期限是多久？什么时候生效？</p>
                        A：本产品的保险期间为1年，自合同生效日零时起计算。本产品T+1日生效（今日投保明日零时生效）。
                    </div>
                    <div class="faq-item">
                        <p>本产品保证可以续保吗？</p>
                        A：不保证。在每一保险期间届满前，您可以续保本合同，经我们审核同意并按续保时对应的费率收取保险费后本合同将延续有效。如果本保险产品停售，本合同不再接受续保。被保人81岁也不能续保。
                    </div>
                    <div class="faq-item">
                        <p> 投保前已经生的病可以报销么？</p>
                        A：不可以。为了使大家可以用最优的保费获得最高的保障，在发生疾病时真正获得高额医疗费用报销，本险种不接受带病投保的行为。投保前已患有的疾病以及症状，均不属于保障范围。
                    </div>
                    <div class="faq-item">
                        <p> 电子保单是否具有合法的法律效力？</p>
                        A：根据《中华人民共和国合同法》第十一条规定，数据电文是合法的合同表现形式，电子保单与纸质保单具有同等的法律效力。
                    </div>
                </div>
            </div>
            <div class="clear"></div>
        </main>        
        <footer>
            <div class="user-modal" v-show='hasSecurity' @click='selectSecurity(false)'></div>
            <div class="select-inf">
                <div class='recognizee'>
                    被保人
                </div>
                <div class="select-item has-security" @click='selectSecurity(true)'>
                    {{userCheckInfo.hasShebao}}社保 
                    <img src="~cupImg/btn_arrow.png" alt="" class="arrow-xia security-xia" />
                </div>
                <div class='select-item select-birthday'> 
                    <economic-date-group :option="dateOpt" v-model="userCheckInfo.birthDate" desc="" label="被保人出生日期" placeholder="出生日期" />
                </div>
                <div class='select-security' :class="{'active':hasSecurity}">  
                     <economic-radio-group v-model="userCheckInfo.hasShebao" :checkList="[{label: '有', checked: true}, {label: '无'}]" :hasSecurity="hasSecurity" @selectSecurity='selectSecurity($event)' /> 
                </div>  
            </div>
            <div class="submit-box">
                <a @click="altVisible=true" class="service flexcenter">
                    <div class="service-item">
                        <img src="../../assets/image/economic/servericon.png" alt="" class="service-img">
                        <p>客服</p>
                    </div>
                </a>
                <div class="border-line"></div>
                <div class="total-container">
                    <span class="orange">￥</span>
                    <span class="orange big">{{totalPayment}}</span>&nbsp; 
                    <i v-show="!moneyChange"> 起</i>
                </div>
                <div click-tag="立即投保" class="submit-btn active" @click="checkUserInfo" >立即投保</div>
            </div>
        </footer>

        <!-- <pic-viewer :pic-list="xuzhiImgList" ref="xuzhiViewer"/> -->
        <pic-viewer :pic-list="tiaokuanImgList" ref="tiaokuanViewer"/>

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