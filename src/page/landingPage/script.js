import landingModal from '../../components/landing-modal.vue'
import carousel from "../../components/carousel.vue"
import 'swiper/dist/css/swiper.css'
import { swiper, swiperSlide } from 'vue-awesome-swiper'
import { mapState } from 'vuex';
export default {
    name: 'SubPage',
    title: "康e保系列",
    isPage: true,
    data() {
        return {
            landingModalVisible: false,
            landOption: 0,
            // swiperOption: {
            //     speed: 300,
            //     autoplay: {
            //         delay: 5000,
            //         stopOnLastSlide: false,
            //         disableOnInteraction: true,
            //     },
            //     loop: true,
            //     pagination: {
            //         el: '.swiper-pagination',
            //         type: 'custom',
            //         renderCustom: function(swiper, current, total) {
            //             const activeColor = '#FD8654'
            //             const normalColor = '#E6E6E6'
            //             let color = ''
            //             let paginationStyle = ''
            //             let html = ''
            //             for (let i = 1; i <= total; i++) {
            //                 if (i === current) {
            //                     color = activeColor
            //                 } else {
            //                     color = normalColor
            //                 }
            //                 paginationStyle = `background:${color};opacity:1;margin-right:.16rem`
            //                 html += `<span class="swiper-pagination-bullet" style=${paginationStyle}></span>`
            //             }
            //             return html
            //         },
            //     },
            //     on: {
            //         transitionEnd: function(swiper) {
            //             v.$store.commit('setSwiperIndex', this.activeIndex)
            //         },
            //     },
            //     effect: 'fade',
            // },
            // 自定义分页样式
        }
    },
    willEnterPage: function(data) {
        this.$hmt.trackPageview2('landpage');
    },
    didEnterPage: function(data) {},
    components: {
        landingModal,
        carousel,
        swiper,
        swiperSlide
    },
    watch: {

    },
    methods: {
        closeModal() {
            v.$hmt.trackEvent(this.version, 'click', 'lp_keb_close')
            this.landingModalVisible = false
        },
        checkActDetail() {
            v.$hmt.trackEvent(this.version, 'click', 'lp_keb_activity')
                // location.href = 'http://test.msjk95596.com/se/index.html'
            location.href = location.href.indexOf('test') > -1 ? 'http://test.msjk95596.com/se/index.html' : 'http://www.msjk95596.com/se/index.html'
        },
        openLandingModal(option) {
            if (option == 0) {
                v.$hmt.trackEvent(this.version, 'click', 'lp_keb_0')
            } else {
                v.$hmt.trackEvent(this.version, 'click', 'lp_keb_clinic')
            }
            this.landOption = option;
            this.landingModalVisible = true
        },
        toKangebao() {
            v.$hmt.trackEvent(this.version, 'click', 'lp_keb_dzb')
            v.$hmt.trackEvent2('landpage', 'dzb_1');
            this.$router.push("/")
        },
        toCup() {
            v.$hmt.trackEvent(this.version, 'click', 'lp_keb_bwb')
            v.$hmt.trackEvent2('landpage', 'bwb_1');
            this.$router.push('/cup')
        },
        toEconomy() {
            v.$hmt.trackEvent(this.version, 'click', 'lp_keb_jsb')
            v.$hmt.trackEvent2('landpage', 'jsb_1');
            this.$router.push('/economy')
        },
        toKangebao2() {
            v.$hmt.trackEvent(this.version, 'click', 'lp_keb_dzb2')
            v.$hmt.trackEvent2('landpage', 'dzb_2');
            this.$router.push("/")
        },
        toCup2() {
            v.$hmt.trackEvent(this.version, 'click', 'lp_keb_bwb2')
            v.$hmt.trackEvent2('landpage', 'bwb_2');
            this.$router.push('/cup')
        },
        toEconomy2() {
            v.$hmt.trackEvent(this.version, 'click', 'lp_keb_jsb2')
            v.$hmt.trackEvent2('landpage', 'jsb_2');
            this.$router.push('/economy')
        },
    },
    computed: {
        ...mapState([
            'activeIndex',
            'version'
        ]),
        containerBg() {
            return 'bg1';
            // return this.activeIndex % 2 == 0 ? "bg1" : "bg2"
        }
    }
}