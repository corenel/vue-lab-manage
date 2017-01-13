# vue-lab-manage

Doing and managing experiments online.

## Introduction

`vue-lab-manage` is a web-based lab management system using Vue.js. It simply allows you to do simulation and real-plant experiments online without going to the lab. It samrtly reads and excute the `.slx` files with given parameters and finally displays results with charts.

<p class="warning">

Note that it should be used with `matlab-socket` repo as backend.

</p>

## Preparation
You must have `Node.js` installed in your system.

If you're using OS X or Windows, the best way to install `Node.js` is to use one of the installers from the `Node.js` download page. If you're using Linux, you can use the installer, or you can check NodeSource's binary distributions to see whether or not there's a more recent version that works with your system.

## Quick Start

```bash
$ git clone https://github.com/corenel/vue-lab-manage.git
$ cd vue-lab-manage
# Install dependencies
$ npm install
# Run web server
$ npm run dev
```

Note that before this, we need `matlab-socket` as backend:

```bash
$ git clone https://github.com/corenel/matlab-socketio.git
$ cd matlab-socket
# Run matlab
$ ./matlabStart.sh
# Run socket.io adapter
$ node run test
```

## Configuration

### Port and proxy

In `config/index.js`, you can modify `port` (default is `8082`) and proxy `target` (default is `localhost`).

```javascript
  dev: {
    env: require('./dev.env'),
    port: 8082,
    productionSourceMap: true,
    proxyTable: {
      '/rpc': {
        target: 'http://localhost',
        changeOrigin: true,
        pathRewrite:{
          '^/rpc' : '/data'
        }
      }
    }
  }
```

### Pre-difined control parameters

In `config/ctl.params.js`, you can modify control parameters in `json` format.

```json
         nnmpc: {
             name: 'nnmpc',
             params: {
                 mdl: {
                     name: 'Model',
                     value: 'sim_tank_2_nnmpc'
                 },
                 StopTime: {
                     name: 'Stop time',
                     value: '30'
                 },
                 L10: {
                     name: 'Tank 1 level setpoint',
                     value: '15'
                 },
                 L20: {
                     name: 'Tank 2 level setpoint',
                     value: '15'
                 }
             }
         }
```

### Router
In `src/config.js`, you can modify router settings for components.

```javascript
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
                path: '/experiments/model',
                name: 'model',
                label: 'Model',
                component: makeComponent('./components/page/experiments/Model.vue')
            },
            {
                path: '/experiments/simulation',
                name: 'simulation',
                label: 'Simulation',
                component: makeComponent('./components/page/experiments/Simulation.vue')
            },
            {
                path: '/experiments/real-plant',
                name: 'real-plant',
                label: 'Real Plant',
                component: makeComponent('./components/page/experiments/Real-Plant.vue')
            }
        ]
    }
]
export {menu}
```

## Development

The development setup is basically `webpack` + `vue.js`:

```bash
$ cd vue-lab-manage
$ npm run dev
# then edit files in ./src dir
# web pages will hot-reload
```

## Contributing

1. Fork it!
2. Create your feature branch: `git checkout -b my-new-feature`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin my-new-feature`
5. Submit a pull request :D

## Tips

You may use `Vue.js devtools` ([download](https://chrome.google.com/webstore/detail/vuejs-devtools/nhdogjmejiglipccpnnnanhbledajbpd)) for debug.

## Prior art

`vue-lab-manage` wouldn't exist if it wasn't for excellent prior art, it's inspired by these projects:

* [vue.js](https://vuejs.org/) for framework
* [docsify](https://github.com/QingWei-Li/docsify) for documentation writing
