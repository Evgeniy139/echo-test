import axios from 'axios'
import router from '@/router/index'

export default {
    actions: {
        registration( context, data ) {
            axios({
                method: 'post',
                url: 'https://backend-front-test.dev.echo-company.ru/api/user/registration',
                headers: {'Content-Type': 'application/json'},
                data: JSON.stringify(data)
            })
            .then((response) => {
                context.commit('updateAuth', response.data)
                localStorage.setItem('auth', JSON.stringify( response.data ) )
                router.push({ name: 'Home' })
            })
            .catch((error)=> {
                if (error.response) context.commit('updateAuth', error.response.data)
            })
        }
    }

}