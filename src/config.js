import indexShareIcon from '@/assets/image/shareicon.jpg'
import economyShareIcon from '@/assets/image/economic/shareimg.jpg'
import cupShareIcon from '@/assets/image/cup/cupShare.jpg'
import homeShareIcon from '@/assets/image/home/landing.jpg'

//分享页面，分几个不同版本
//index,康e保
//economy,康e保经适版
var apiTest=location.pathname.split('/')[1]||'i';
apiTest=apiTest.includes('insb')?('/'+apiTest):'/ins';
var config = {
    productCode: '111807',
    landing: {
        projectTitle: '康e保系列',
        defaultShareOption: {
            title: '民生康e保系列',
            desc: '适合每个家庭的医疗保障 (住院0免赔+门急诊可选)',
            imgUrl: homeShareIcon,
            link: `${location.origin}${location.pathname}?source=share&redirect_path=landing`
        },
    },
    index: {
        projectTitle: '康e保',
        defaultShareOption: {
            title: '民生健康·康e保',
            desc: '你的专属门急诊和住院报销解决方案',
            imgUrl: indexShareIcon,
            link: `${location.origin}${location.pathname}?source=share`
        },
    },
    economy: {
        projectTitle: '康e保（经适版）',
        defaultShareOption: {
            title: '居家必备·康e保（经适版）',
            desc: '适合自己的保险才是好保险',
            imgUrl: economyShareIcon,
            link: `${location.origin}${location.pathname}?source=share&redirect_path=economy`
        },
    },
    cup: {
        projectTitle: '康e保（保温杯版）',
        defaultShareOption: {
            title: '重视自己·康 e 保（保温杯版）',
            desc: '送给自己的第一份保险',
            imgUrl: cupShareIcon,
            link: `${location.origin}${location.pathname}?source=share&redirect_path=cup`
        },
    },
    baseURL: location.href.indexOf('activity.minshenglife') > -1 ? '/ins':apiTest,
    msUrl:location.href.indexOf('activity.minshenglife') > -1?'http://www.msjk95596.com':'http://test.msjk95596.com',
    queryUrl: getQueryUrl()
}

function getQueryUrl() {
    var testOrigin = 'http://activitytest.minshenglife.com/i/web/index.html',  // 测试环境地址
    prodOrigin = 'http://activity.minshenglife.com/i/web/index.html';  // 生产环境地址
    
    var devAuthApi = 'http://test.msjk95596.com/act/wechat/base/access_token/?state=',
    prodAuthApi = 'http://www.msjk95596.com/act/wechat/base/access_token/?state=',
    url = '';

    if (/test/.test(location.origin)) {
        url = devAuthApi + testOrigin;
    } else {
        url = prodAuthApi + prodOrigin;
    }

    return url;
}

export default config;