import Vuex from 'vuex'

window.Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        
    },
    mutations: {
        increment(state) {
            state.count++
        }
    }
})
