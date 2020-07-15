import Vue from 'vue'
import Router from 'vue-router'
import init from '../initPlugin'

var Index = () =>
    import ('@/page/indexPage/index.vue')
var Landing = () =>
    import ('@/page/landingPage/index.vue')
var Economy = () =>
    import ('@/page/economyIndexPage/index.vue')
var Cup = () =>
    import ('@/page/cupIndexPage/index.vue')
var FAQ = () =>
    import ('@/page/FAQPage/index.vue')
var Inform = () =>
    import ('@/page/informPage/index.vue')
var Confirm = () =>
    import ('@/page/confirmPage/index.vue')
var Physical = () =>
    import ('@/page/physicalPage/index.vue')
var PaySuccess = () =>
    import ('@/page/paySuccessPage/index.vue')
var PayFail = () =>
    import ('@/page/payFailPage/index.vue')
var Insure = () =>
    import ('@/page/insurePage/index.vue')
var GoldAct = () =>
    import ('@/page/goldActPage/index.vue')
var Xuzhi = () =>
import ('@/page/provisionPage/toubaoxuzhi.vue');

Vue.use(Router)

var routes = [
    { path: '/', name: 'Index', component: Index },
    { path: '/landing', name: 'Landing', component: Landing },
    { path: '/faq', name: 'FAQ', component: FAQ },
    { path: '/inform', name: 'Inform', component: Inform },
    { path: '/confirm', name: 'Confirm', component: Confirm },
    { path: '/paysuccess', name: 'PaySuccess', component: PaySuccess },
    { path: '/physical', name: 'Physical', component: Physical },
    { path: '/payfail', name: 'PayFail', component: PayFail },
    { path: '/insure', name: 'Insure', component: Insure },
    { path: '/economy', name: 'Economy', component: Economy },
    { path: '/cup', name: 'Cup', component: Cup },
    { path: '/goldAct', name: 'GoldAct', component: GoldAct },
    { path: '/xuzhi', name: 'Xuzhi', component: Xuzhi }
]

export default new Router({
    routes: routes
})