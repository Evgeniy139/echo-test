import axios from 'axios'
import router from '@/router/index'

export default {
    actions: {
        authLogin( context, data ) {
            axios({
                method: 'post',
                url: 'https://backend-front-test.dev.echo-company.ru/api/auth/login',
                headers: {'Content-Type': 'application/json'},
                data: JSON.stringify(data)
            })
            .then(( response ) => {
                context.commit( 'updateAuth', response.data )
                if ( data.saveAuth ) localStorage.setItem('auth', JSON.stringify( response.data ) )
                router.push({ name: 'Home' })
            })
            .catch(( error ) => {
                if ( error.response ) context.commit( 'updateAuth', error.response.data )
            })
        },

        authLogout( context ) {
            if ( localStorage.getItem('auth') ) localStorage.removeItem( 'auth' )
            context.commit('updateAuth', {})
            router.push({ name: 'Login' })
        }
    }

}