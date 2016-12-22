import Vue from 'vue'
import VueRouter from 'vue-router'
import VueSocketio from 'vue-socket.io'

import App from './Desktop'
import {menu} from './config'

Vue.use(VueRouter)

Vue.use(VueSocketio, 'localhost:1234')

let routes = menu.map(function (item) {
    return item
})
routes.push({
    path: '*',
    redirect: '/dashboard'
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

// Now we can start the app!
// The router will create an instance of App and mount to
// the element matching the selector app.

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router: router,
    template: '<app></app>',
    components: {
        app: App
    }
})
