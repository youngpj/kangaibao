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
    willEnterPage: function(data) {
    },
    didEnterPage: function(data) {
    },
    methods: {}
}