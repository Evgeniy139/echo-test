import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import { ifNotAuthenticated, ifAuthenticated } from './middleware/auth'

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home,
        beforeEnter: ifAuthenticated
    },
    {
        path: '/login',
        name: 'Login',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "about" */ '../views/Login.vue'),
        beforeEnter: ifNotAuthenticated
    },
    {
        path: '/registration',
        name: 'Registration',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "about" */ '../views/Registration.vue'),
        beforeEnter: ifNotAuthenticated
    },
    {
        path: '/forgot-password',
        name: 'ForgotPassword',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "about" */ '../views/ForgotPassword.vue'),
        beforeEnter: ifNotAuthenticated
    },
    {
        path: '*',
        name: 'NotFound',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "about" */ '../views/NotFound.vue')
    }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router
