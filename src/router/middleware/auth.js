import store from '../../store'

if (localStorage.getItem('auth')) store.commit('initialiseStoreAuth')

const ifNotAuthenticated = (to, from, next) => {
    if (store.getters.getAuthenticated) return next({ name: 'Home' })
    next()
}
const ifAuthenticated = (to, from, next) => {
    if (!store.getters.getAuthenticated) return next({ name: 'Login' })
    next()
}

export {
    ifNotAuthenticated,
    ifAuthenticated
}