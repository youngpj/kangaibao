import gaozhiUrl from '../../assets/doc/jiankanggaozhi.pdf';
// import jubaoUrl from '../../assets/doc/拒保职业表.xlsx';
import rejectGroup from "@/components/reject-profession-group.vue";
import jubaoData from '../../assets/doc/jubaozhiye.json';
import picViewer from '@/components/pic-viewer.vue';
import { mapState } from 'vuex'

export default {
    name: 'Index',
    isPage: true, // 必填项
    Data: {
        gaozhiUrl: gaozhiUrl,
        picList: [
            { url: require('@/assets/doc/jubaozhiye/0_1.jpg') },
            { url: require('@/assets/doc/jubaozhiye/0_2.jpg') },
            { url: require('@/assets/doc/jubaozhiye/0_3.jpg') },
            { url: require('@/assets/doc/jubaozhiye/0_4.jpg') },
            { url: require('@/assets/doc/jubaozhiye/0_5.jpg') },
            { url: require('@/assets/doc/jubaozhiye/0_6.jpg') },
            { url: require('@/assets/doc/jubaozhiye/0_7.jpg') },
        ],
        jubaoData: jubaoData,
        qipaoVisible: false
    },
    willEnterPage: function(data) {
        // console.log(data);
        // console.log('will');
    },
    didEnterPage(data) {
        // console.log('did')
    },
    methods: {
        gaozhi() {
            v.$hmt.trackEvent(this.version, 'click', 'health_agreement1')
                // _hmt.push(['_trackEvent', 'button', 'click', 'health_kangebao_agreement1']);
        },
        reject() {
            v.$hmt.trackEvent(this.version, 'click', 'health_yes')
                // _hmt.push(['_trackEvent', 'button', 'click', 'health_kangebao_yes']);
            this.$message.toast('抱歉，被保险人没有通过投保健康测试，暂时无法投保！');
            setTimeout(() => {
                this.$goBackward();
            }, 2000);
        },
        toInsure() {
            v.$hmt.trackEvent(this.version, 'click', 'health_allno')

            if (this.version == 'cup') {
                this.$hmt.trackEvent2('bwb', 'confirm');
            } else if (this.version == 'economy') {
                this.$hmt.trackEvent2('jsb', 'confirm');
            } else {
                this.$hmt.trackEvent2('dzb', 'confirm');
            }
            // _hmt.push(['_trackEvent', 'button', 'click', 'health_kangebao_allno']);
            this.$showLoading();
            this.$switchTo('/insure');
        },
        openViewer() {
            v.$hmt.trackEvent(this.version, 'click', 'health_agreement2')
            this.$refs.picviewer.open();
        },
        more(evt) {
            this.qipaoVisible = true;
            // setTimeout(() => {
            //     this.qipaoVisible = false;
            // }, 10000);
            evt.preventDefault();
            evt.stopPropagation();
        },
        closeMore() {
            this.qipaoVisible = false;
        }
    },
    computed: {
        ...mapState([
            "version"
        ])
    },
    components: {
        picViewer: picViewer,
        rejectGroup
    }
}