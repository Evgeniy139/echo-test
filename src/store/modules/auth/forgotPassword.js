import axios from 'axios'
import router from '@/router/index'

export default {
    actions: {
        forgotStart( context, data ) {
            axios({
                method: 'post',
                url: 'https://backend-front-test.dev.echo-company.ru/api/user/forgot-start',
                headers: {'Content-Type': 'application/json'},
                data: JSON.stringify(data)
            })
            .then(( response ) => {
                context.commit( 'updateAuthSms', response.data.success )
                context.commit( 'updateAuth', response.data )
            })
            .catch(( error )=> {
                if ( error.response ) context.commit( 'updateAuth', error.response.data )
            })
        },

        forgotEnd( context, data ) {
            axios({
                method: 'post',
                url: 'https://backend-front-test.dev.echo-company.ru/api/user/forgot-end',
                headers: {'Content-Type': 'application/json'},
                data: JSON.stringify( data )
            })
            .then((response) => {
                context.commit( 'updateAuth', response.data )
                router.push({ name: 'Home' })
            })
            .catch(( error )=> {
                if ( error.response ) context.commit( 'updateAuth', error.response.data )
            })
        }
    }

}