import config from '@/config.js'
import { url } from '@/plugins/url.js';
import { mapState } from 'vuex'
export default {
    name: 'SubPage',
    isPage: true,
    Data: {
        name: 'logan',
        age: '12'
    },
    beforeRouteEnter(to, from, next) {
        next(vm => {
            vm.$data.title = 'hahaha'
        })
    },
    willEnterPage: function(data) {},
    didEnterPage: function(data) {},
    methods: {
        backWechat() {
            v.$hmt.trackEvent(this.version, 'click', 'success_home')
            wx && wx.closeWindow();
        },
        toQuery() {
            v.$hmt.trackEvent(this.version, 'click', 'success_order')
            location.href = config.queryUrl;
        },
        checkDetail() {
            v.$hmt.trackEvent(this.version, 'click', 'success_activity')
            location.href = location.href.indexOf('test') > -1 ? 'http://test.msjk95596.com/se/index.html' : 'http://www.msjk95596.com/se/index.html'
        }
    },
    computed: {
        ...mapState([
            'version'
        ]),
    }
}