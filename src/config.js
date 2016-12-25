/**
 * Created by Administrator on 2016/7/11.
 */

import makeComponent from './component-loader'

let menu = [
    {
        path: '/dashboard',
        icon: 'dashboard',
        name: 'Dashboard',
        label: 'Dashboard',
        component: makeComponent('./components/page/Dashboard.vue')
    },
    {
        path: '/introduction',
        name: 'introduction',
        label: 'Introduction',
        icon: 'cog',
        isShowSubMenu: false,
        component: {
            template: '<router-view></router-view>'
        },
        children: [
            {
                path: '/introduction/about',
                name: 'about',
                label: 'About',
                component: makeComponent('./components/page/introduction/About.vue')
            }
        ]
    },
    {
        path: '/experiments',
        name: 'experiments',
        label: 'Experiments',
        icon: 'cog',
        isShowSubMenu: false,
        component: {
            template: '<router-view></router-view>'
        },
        children: [
            {
                path: '/experiments/demo',
                name: 'demo',
                label: 'Demo',
                component: makeComponent('./components/page/experiments/Demo.vue')
            },
            {
                path: '/experiments/simulation',
                name: 'simulation',
                label: 'Simulation',
                component: makeComponent('./components/page/experiments/Simulation.vue')
            }
        ]
    }
]
export {menu}
