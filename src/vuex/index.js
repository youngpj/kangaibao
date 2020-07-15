import Vue from 'vue';
import Vuex from 'vuex';
import config from '@/config.js';
Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        'version': 'index',
        'activeIndex': 0,
        'jobOptions': {
            9000001: {
                value: "9000001",
                type: 1,
                label: "事业单位负责人"
            },
            9000002: {
                value: "9000002",
                type: 1,
                label: "专业技术人员"
            },
            9000003: {
                value: "9000003",
                type: 1,
                label: "商业工作人员"
            },
            9000004: {
                value: "9000004",
                type: 1,
                label: "服务性工作人员"
            },
            9000005: {
                value: "9000005",
                type: 2,
                label: "农林牧渔劳动者"
            },
            9000006: {
                value: "9000006",
                type: 2,
                label: "生产、运输工作者"
            },
            9000007: {
                value: "9000007",
                type: 1,
                label: "办事人员"
            },
            9000008: {
                value: "9000008",
                type: 2,
                label: "其他劳动者"
            }
        },
    },
    getters: {
        config(state) {
            return config[state.version]
        }
    },
    mutations: {
        setVersion(state, payload) {
            state.version = payload
        },
        setSwiperIndex(state, index) {
            state.activeIndex = index
        }
    }
});