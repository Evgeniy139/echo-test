import axios from 'axios'

export default {
    state: {
        user: {}
    },

    mutations: {
        updateUser( state, user ) {
            state.user = user
        }
    },

    getters: {
        getUser( state ) {
            return state.user
        }
    },

    actions: {
        getUser( context ) {
            axios({
                method: 'get',
                url: 'https://backend-front-test.dev.echo-company.ru/api/user',
                headers: { 
                    Authorization: context.getters.getAuthToken
                }
            })
            .then((response) => {
                context.commit( 'updateUser', response.data )
            })
            .catch((error)=> {
                context.commit( 'updateAuth', error.response.data ) 
            })
        }
    }

}
