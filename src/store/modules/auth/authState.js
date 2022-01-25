export default {
    state: {
        auth: {},
        sms: false
    },

    mutations: {
        initialiseStoreAuth( state ) {
            state.auth = JSON.parse( localStorage.auth )
        },

        updateAuth( state, data ) {
            state.auth = data
        },

        cleanAuthMessage( state ) {
            state.auth.message = ''
        },

        updateAuthSms( state, data ) {
            state.sms = data
        },

        cleanAuthSms( state ) {
            state.sms = ''
        }
    },

    getters: {
        getAuthToken( state ) {
            return state.auth.token
        },

        getAuthSuccess( state ) {
            return state.auth.success
        },

        getServMessage( state ) {
            if ( state.auth.errors ) return state.auth.errors[0].msg
            return state.auth.message
        },

        getAuthenticated( state ) {
            if ( state.auth.success && !!state.auth.token ) return true
            return false
        },

        getAuthSms( state ) {
            return state.sms
        }
    }

}