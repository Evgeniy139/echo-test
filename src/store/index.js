import Vue from 'vue'
import Vuex from 'vuex'
import auth from './modules/auth/authMain'
import user from './modules/user/user'

Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        auth,
        user
    }
})
