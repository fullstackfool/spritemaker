import VueClipboard from 'vue-clipboard2'

window.Vue = require('vue');
Vue.use(VueClipboard);

Vue.component('v-sprite-maker', require('./components/SpriteMaker.vue'));

const app = new Vue({
    el: '#app',
    store: require('./store')
});
