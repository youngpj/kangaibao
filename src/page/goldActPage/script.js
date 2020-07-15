export default {
    name: 'goldActPage',
    isPage: true,
    Data: {
    },
    beforeRouteEnter(to, from, next) {
        next(vm => {
            vm.$data.title = 'hahaha'
        })
    },
    willEnterPage: function(data) {
    },
    didEnterPage: function(data) {
    },
    methods: {}
}