import VueClipboard from 'vue-clipboard2'
import Vuex from 'vuex'

window.Vue = require('vue');
Vue.use(Vuex)
Vue.use(VueClipboard);

Vue.component('v-sprite-maker', require('./components/SpriteMaker.vue'));

const store = new Vuex.Store({
    state: {
        count: 0
    },
    mutations: {
        increment (state) {
            state.count++
        }
    }
})

const app = new Vue({
    el: '#app'
});
