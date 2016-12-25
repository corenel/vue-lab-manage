import Vue from 'vue'
import VueRouter from 'vue-router'
import VueSocketio from 'vue-socket.io'

import App from './Desktop'
import {menu} from './config'
import makeComponent from './component-loader'
import store from './store/'

Vue.use(VueRouter)

Vue.use(VueSocketio, 'localhost:1234/client')

let routes = menu.map(function (item) {
    return item
})
routes.push(
    {
        path: '/login',
        meta: {auth: false},
        component: makeComponent('./components/page/login/Login.vue')
    },
    {
        path: '/',
        meta: {auth: false},
        redirect: '/dashboard'
    },
    {
        path: '*',
        redirect: '/login'
    })

// Create a router instance.
// You can pass in additional options here, but let's
// keep it simple for now.
let router = new VueRouter({
    scrollBehavior: function () {
        return { x: 0, y: 0 }
    },
    linkActiveClass: 'active',
    routes: routes
})

// Login verification
router.beforeEach(({ meta, path }, from, next) => {
    let { auth = true } = meta
    let isLogin = Boolean(store.state.user.id)

    if (auth && !isLogin && path !== '/login') {
        return next({ path: '/login' })
    }
    next()
})

// Now we can start the app!
// The router will create an instance of App and mount to
// the element matching the selector app.

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router: router,
    store: store,
    template: '<app></app>',
    components: {
        app: App
    }
})
