import Vue from 'vue'
import App from './App'
import router from './router'
import './lib/css/transition.css'
import './lib/css/common.css'
import initPlugin from './initPlugin/index.js'
import rem from 'amfe-flexible'
import store from './vuex/index.js'
import config from '@/config.js'
import { DatetimePicker } from "mint-ui";
Vue.component(DatetimePicker.name, DatetimePicker);
import { Picker } from 'mint-ui';
Vue.component(Picker.name, Picker);
import 'mint-ui/lib/style.css'

window.Vue = Vue;
window.v = Vue.prototype;
Vue.prototype.$store = store
initPlugin();

Vue.config.productionTip = false;
Vue.prototype.$showLoading = function (desc) {
    desc = desc || '';
    setTimeout(() => {
        app.page.$root.$children[0].loading = true;
        app.page.$root.$children[0].loadingDesc = desc;
    })
}

Vue.prototype.$hideLoading = function () {
    setTimeout(() => {
        app.page.$root.$children[0].loading = false;
    })
}

v.$wxsdk.apiTicket('/hc/v0/shares/sign');

var openid = v.$url.parseUrl('token');
// var openid = v.$url.parseUrl('oid');  // 临时
var accesskey = '15EOvS2ePZ';
if(parseUrl('mini')){
    accesskey = parseUrl('accesskey')
}
v.$http.setCommonHeaders({
    accesskey: accesskey,
    signature: 'test',
    token: openid,
    CHANNELTYPE: 'WEIXINMS'
});

v.$http.setDomain(config.baseURL);
v.$lonix.setDomain(config.baseURL);

router.beforeEach((to, from, next) => {
    if (to.path == "/landing") {
        store.commit('setVersion', 'landing')
    }
    if (to.path == "/" || to.path == "/index") {
        store.commit('setVersion', "index")
    }
    if (to.path == '/economy') {
        store.commit('setVersion', 'economy')
    }
    if (to.path == '/cup') {
        store.commit('setVersion', 'cup')
    }
    console.log(store.state.version)
    var defaultShareOption = config[store.state.version].defaultShareOption
    console.log(defaultShareOption)
    v.$wxsdk.setDefaultShare(defaultShareOption)
    next()
})

v.$wxsdk.onShareSuccess = function (t) {
    var version = store.state.version
    v.$hmt.trackEvent(version, 'event', 'home_share');
    if (t == 'appMessage') {
        v.$hmt.trackEvent2('globe', 'friend');
    } else {
        v.$hmt.trackEvent2('globe', 'friend_group');
    }
    // _hmt.push(['_trackEvent', 'button', 'click', 'home_kangebao_share']);
};

v.$wxsdk.onReady(() => { });

v.$url.getQueryStrDecode('oid', function (openId) {

    v.$localStorage.setItem('openId', openId);
    localStorage.setItem('openid', openId);
    v.$sessionStorage.setItem('openId', openId);
    sessionStorage.setItem('openid', openId);
    new Vue({
        el: '#app',
        data: {},
        router,
        store,
        template: '<App/>',
        components: { App }
    });
});

// 百度统计的pv，uv
Vue.mixin({
    beforeRouteEnter(to, from, next) {
        var path = to.fullPath;
        var version = store.state.version
        console.log('version', version)
        if (to.fullPath == '/') {
            path += 'index';
        };

        !!window._hmt && v.$hmt.trackPageview(location.pathname + '/#' + path + "?version=" + version)
        // !!window._hmt && _hmt.push(['_trackPageview', location.pathname + '/#' + path]);

        if (from.fullPath == '/faq') {
            v.$hmt.trackEvent(version, 'event', 'question_back')
            // _hmt.push(['_trackEvent', 'button', 'event', 'question_kangebao_back']);
        } else if (from.fullPath == '/inform') {
            v.$hmt.trackEvent(version, 'event', 'health_back')
            // _hmt.push(['_trackEvent', 'button', 'event', 'health_kangebao_back']);
        } else if (from.fullPath == '/insure') {
            v.$hmt.trackEvent(version, 'event', 'insure_back')
            // _hmt.push(['_trackEvent', 'button', 'event', 'insure_kangebao_back']);
        } else if (from.fullPath == '/confirm') {
            v.$hmt.trackEvent(version, 'event', 'confirm_back')
            // _hmt.push(['_trackEvent', 'button', 'event', 'confirm_kangebao_back']);
        } else if (from.fullPath == '/') {
            v.$hmt.trackEvent(version, 'event', 'home_back')
            // _hmt.push(['_trackEvent', 'button', 'event', 'home_kangebao_back']);
        }
        next();
    }
});


// 解决安卓因调整字体大小导致的布局问题
(function () {
    if (typeof WeixinJSBridge == "object" && typeof WeixinJSBridge.invoke == "function") {
        handleFontSize();
    } else {
        if (document.addEventListener) {
            document.addEventListener("WeixinJSBridgeReady", handleFontSize, false);
        } else if (document.attachEvent) {
            document.attachEvent("WeixinJSBridgeReady", handleFontSize);
            document.attachEvent("onWeixinJSBridgeReady", handleFontSize);
        }
    }

    function handleFontSize() {
        // 设置网页字体为默认大小
        WeixinJSBridge.invoke('setFontSizeCallback', {
            'fontSize': 0
        });
        // 重写设置网页字体大小的事件
        WeixinJSBridge.on('menu:setfont', function () {
            WeixinJSBridge.invoke('setFontSizeCallback', {
                'fontSize': 0
            });
        });
    }
})();