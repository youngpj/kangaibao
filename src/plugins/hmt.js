/* 
    康e保项目，因不同版本，百度埋点内容不同，做封装处理
    百度统计中,html中引入js后，全局有_hmt对象
    _hmt绑定到Vue实例上

    trackEvent:追踪事件
        _hmt.push(['_trackEvent', 'button', 'event', 'question_kangebao_back']);
        v.$hmt.trackEvent(version, action, label)
        v.$hmt.trackEvent(this.version, 'click', 'home_next')
    trackPageview:追踪页面
        _hmt.push(['_trackPageview', pageURL])    
        v.$hmt.trackPageview(location.pathname + '/#' + path + "?version=" + version)
*/
var Hmt = function() {}

Hmt.prototype.trackEvent = function(version, action, name) {
    //判断下当前康e保版本
    var label
    switch (version) {
        //康e保
        case 'index':
            label = indexLabel(name)
            break
            // 康e保(保温杯)
        case 'cup':
            label = cupLabel(name)
            break
            //康e保(经适版)
        case 'economy':
            label = economyLabel(name)
            break
    }
    if (label) {
        _hmt.push(['_trackEvent', 'button', action, label])
        console.log(version, action, label)
    }
}

Hmt.prototype.trackPageview = function(pageURL) {
    _hmt.push(['_trackPageview', pageURL])
}

Hmt.prototype.trackEvent2 = function(page, event) {
    v.$acMonitor.trackEvent({
        page: page,
        event: event
    });
    _hmt.push(['_trackEvent', page, 'click', event]);
}

Hmt.prototype.trackPageview2 = function(page) {
    v.$acMonitor.trackEvent({
        page: page
    });
    _hmt.push(['_trackPageview', page]);
}

//康e保 埋点
function indexLabel(name) {
    var labelObj = {
        'home_next': 'home_kangebao_next', //产品详情⻚_点击_⽴即投保
        'home_back': 'home_kangebao_back', //产品详情⻚_点击_返回
        'home_share': 'home_kangebao_share', //产品详情⻚_点击_分享
        'home_character': 'home_kangebao_character', //产品详情⻚_点击_⻆⾊
        'home_social': 'home_kangebao_social', //产品详情⻚_点击_社保
        'home_both': 'home_kangebao_both', //产品详情⻚_点击_出⽣⽇期
        'home_question': 'home_kangebao_question', //产品详情⻚_点击_常⻅问题
        'home_pop': 'home_kangebao_pop', //产品详情⻚浮层_展示_选择投保⼈信息
        'question_back': 'question_kangebao_back', //常⻅问题⻚_点击_返回

        'health_back': 'health_kangebao_back', //健康告知⻚_点击_返回
        'health_close': 'health_kangebao_close', //健康告知⻚_点击_关闭
        'health_allno': 'health_kangebao_allno', //健康告知⻚_点击_以上全否
        'health_yes': 'health_kangebao_yes', //健康告知⻚_点击_部分为是
        'health_agreement1': 'health_kangebao_agreement1', //健康告知⻚_点击_健康告知
        'health_agreement2': 'health_kangebao_agreement2', //健康告知⻚_点击_拒保职业类别表

        'insure_back': 'insure_kangebao_back', //投保信息⻚_点击_返回
        'insure_close': 'insure_kangebao_close', //投保信息⻚_点击_关闭
        'insure_pop1': 'insure_kangebao_pop1', //投保信息⻚浮层_展示_位置获取
        'insure_pop2': 'insure_kangebao_pop2', //投保信息⻚浮层_展示_位置地区不⽀持购买
        'insure_pop3': 'insure_kangebao_pop3', //投保信息⻚浮层_展示_被保⼈不⽀持购买
        'insure_pop4': 'insure_kangebao_pop4', //投保信息⻚浮层_展示_退出流程
        'insure_allow': 'insure_kangebao_allow', //投保信息⻚浮层_点击_位置获取允许
        'insure_reject': 'insure_kangebao_reject', //投保信息⻚浮层_点击_位置获取拒绝
        'insure_confirm': 'insure_kangebao_confirm', //投保信息⻚浮层_点击_确认退出
        'insure_cancel2': 'insure_kangebao_cancel2', //投保信息⻚浮层_点击_取消
        'insure_verify': 'insure_kangebao_verify', //投保信息⻚_点击_发送验证码
        'insure_cancel1': 'insure_kangebao_cancel1', //投保信息⻚_点击_取消
        'insure_pay': 'insure_kangebao_pay', //投保信息⻚_点击_⽴即⽀付

        'confirm_back': 'confirm_kangebao_back', //投保信息确认⻚_点击_返回
        'confirm_close': 'confirm_kangebao_close', //投保信息确认⻚_点击_关闭
        'confirm_pay': 'confirm_kangebao_pay', //投保信息确认⻚_点击_支付

        'success_close': 'success_kangebao_close', //投保成功⻚_点击_关闭
        'success_order': 'success_kangebao_order', //投保成功⻚_点击_订单信息
        'success_home': 'success_kangebao_home', //投保成功⻚_点击_返回公众号
        'fail_close': 'fail_kangebao_close', //投保失败⻚_点击_关闭
        'fail_order': 'fail_kangebao_order', //投保失败⻚_点击_订单信息
        'fail_home': 'fail_kangebao_home', //投保失败⻚_点击_返回公众号


    }
    return labelObj[name]
}

//康e保(保温杯) 埋点
function cupLabel(name) {
    var labelObj = {
        'home_next': 'home_kebbwb_next', //产品详情⻚_点击_⽴即投保
        'home_back': 'home_kebbwb_back', //产品详情⻚_点击_返回
        'home_share': 'home_kebbwb_share', //产品详情⻚_点击_分享
        'home_social': 'home_kebbwb_social', //产品详情⻚_点击_社保
        'home_both': 'home_kebbwb_birthday', //产品详情⻚_点击_出⽣⽇期
        'home_sure': 'home_kebbwb_sure', //产品详情页_点击_确定投保
        'home_no': 'home_kebbwb_no', //产品详情页浮层_点击_不投保
        'home_yes': 'home_kebbwb_yes', //产品详情页_点击_是，确认投保
        'home_more': 'home_kebbwb_more', //产品详情页_点击_展开详情
        'home_emergency': 'home_kebbwb_emergency', //产品详情页_点击_普通门急诊医疗保障
        'home_hospital': 'home_kebbwb_hospital', //产品详情页_点击_住院医疗保障
        'home_notice': 'home_kebbwb_notice', //产品详情页_点击_投保须知
        'home_terms': 'home_kebbwb_terms', //产品详情页_点击_保险条款
        'home_keb': 'home_kebbwb_keb', //产品详情页_点击_完整版康 e 保

        'health_back': 'health_kebbwb_back', //健康告知⻚_点击_返回
        'health_close': 'health_kebbwb_close', //健康告知⻚_点击_关闭
        'health_allno': 'health_kebbwb_allno', //健康告知⻚_点击_以上全否
        'health_yes': 'health_kebbwb_yes', //健康告知⻚_点击_部分为是
        'health_agreement2': 'health_kebbwb_job', //健康告知⻚_点击_拒保职业类别表

        'insure_back': 'insure_kebjs_back', //投保信息⻚_点击_返回
        'insure_close': 'insure_kebjs_close', //投保信息⻚_点击_关闭
        'insure_popAge1': 'insure_kebjs_popAge1', //投保信息页浮层_展示_投保人年龄不符 
        'insure_popAge2': 'insure_kebjs_popAge2', //投保信息页浮层_展示_被保人年龄不符 
        'insure_popArea': 'insure_kebjs_popArea', //投投保信息页浮层_展示_投保人地区不符 
        'insure_popAmount': 'insure_kebjs_popAmount', //投保信息页浮层_展示_被保人已在保 
        'insure_popCancel': 'insure_kebjs_popCancel', //投保信息页浮层_展示_退出流程 
        'insure_confirm': 'insure_kebjs_confirm', //投保信息⻚浮层_点击_确认退出
        'insure_cancel2': 'insure_kebjs_cancel1', //投保信息⻚浮层_点击_取消
        'insure_verify': 'insure_kebjs_verify', //投保信息⻚_点击_发送验证码
        'insure_cancel1': 'insure_kebjs_cancel2', //投保信息⻚_点击_取消
        'insure_pay': 'insure_kebjs_pay', //投保信息⻚_点击_⽴即⽀付

        'confirm_back': 'confirm_kebbwb_back', //投保信息确认⻚_点击_返回
        'confirm_close': 'confirm_kebbwb_close', //投保信息确认⻚_点击_关闭
        'confirm_pay': 'confirm_kebbwb_pay', //投保信息确认⻚_点击_支付

        'success_close': 'success_kebbwb_close', //投保成功⻚_点击_关闭
        'success_order': 'success_kebbwb_order', //投保成功⻚_点击_订单信息
        'success_home': 'success_kebbwb_home', //投保成功⻚_点击_返回公众号
        'fail_close': 'fail_kebbwb_close', //投保失败⻚_点击_关闭
        'fail_order': 'fail_kebbwb_order', //投保失败⻚_点击_订单信息
        'fail_home': 'fail_kebbwb_home', //投保失败⻚_点击_返回公众号


    }
    return labelObj[name]
}

//康e保(经适版) 埋点
function economyLabel(name) {
    var labelObj = {
        'home_next': 'home_kebjs_next', //产品详情⻚_点击_⽴即投保
        'home_back': 'home_kebjs_back', //产品详情⻚_点击_返回
        'home_share': 'home_kebjs_share', //产品详情⻚_点击_分享
        'home_social': 'home_kebjs_social', //产品详情⻚_点击_社保
        'home_both': 'home_kebjs_birthday', //产品详情⻚_点击_出⽣⽇期
        'home_sure': 'home_kebjs_sure', //产品详情页_点击_确定投保
        'home_no': 'home_kebjs_no', //产品详情页浮层_点击_不投保
        'home_yes': 'home_kebjs_yes', //产品详情页_点击_是，确认投保

        'health_back': 'health_kebjs_back', //健康告知⻚_点击_返回
        'health_close': 'health_kebjs_close', //健康告知⻚_点击_关闭
        'health_allno': 'health_kebjs_allno', //健康告知⻚_点击_以上全否
        'health_yes': 'health_kebjs_yes', //健康告知⻚_点击_部分为是
        'health_agreement2': 'health_kebjs_job', //健康告知⻚_点击_拒保职业类别表

        'insure_back': 'insure_kebjs_back', //投保信息⻚_点击_返回
        'insure_close': 'insure_kebjs_close', //投保信息⻚_点击_关闭
        'insure_popAge1': 'insure_kebjs_popAge1', //投保信息页浮层_展示_投保人年龄不符 
        'insure_popAge2': 'insure_kebjs_popAge2', //投保信息页浮层_展示_被保人年龄不符 
        'insure_popArea': 'insure_kebjs_popArea', //投投保信息页浮层_展示_投保人地区不符 
        'insure_popAmount': 'insure_kebjs_popAmount', //投保信息页浮层_展示_被保人已在保 
        'insure_popCancel': 'insure_kebjs_popCancel', //投保信息页浮层_展示_退出流程 
        'insure_confirm': 'insure_kebjs_confirm', //投保信息⻚浮层_点击_确认退出
        'insure_cancel2': 'insure_kebjs_cancel1', //投保信息⻚浮层_点击_取消
        'insure_verify': 'insure_kebjs_verify', //投保信息⻚_点击_发送验证码
        'insure_cancel1': 'insure_kebjs_cancel2', //投保信息⻚_点击_取消
        'insure_pay': 'insure_kebjs_pay', //投保信息⻚_点击_⽴即⽀付

        'confirm_back': 'confirm_kebjs_back', //投保信息确认⻚_点击_返回
        'confirm_close': 'confirm_kebjs_close', //投保信息确认⻚_点击_关闭
        'confirm_pay': 'confirm_kebjs_pay', //投保信息确认⻚_点击_支付

        'success_close': 'success_kebjs_close', //投保成功⻚_点击_关闭
        'success_order': 'success_kebjs_order', //投保成功⻚_点击_订单信息
        'success_home': 'success_kebjs_home', //投保成功⻚_点击_返回公众号
        'fail_close': 'fail_kebjs_close', //投保失败⻚_点击_关闭
        'fail_order': 'fail_kebjs_order', //投保失败⻚_点击_订单信息
        'fail_home': 'fail_kebjs_home', //投保失败⻚_点击_返回公众号


    }
    return labelObj[name]
}

var install = function(Vue, options) {
    var hmt = new Hmt()
    Vue.prototype.$hmt = hmt;
}

export default {
    install: install
}