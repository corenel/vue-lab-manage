---
nav: zh-Hans
---

# vue-lab-manage

在线上完成仿真实验与实物实验！

## 简介

`vue-lab-manage`是一个使用`Vue.js`开发的基于网页端的实验室管理系统。它能让你直接在网上进行仿真实验与实物实验，而不用跑到实验室去做。`vue-lab-manage`会直接读取并执行服务器上已有的仿真文件，并且加上你自己的参数配置。跑完实验之后，它会显示历史数据并生成图表。

<p class="warning">

需要注意的是本系统必须使用`matlab-socket`作为后端。

</p>

## 安装Node.js
你必须在需要部署的电脑上安装`Node.js`。

如果你是用的是Windows或者macOS，安装Node.js的最佳方式是去[这里](https://nodejs.org/en/download/)下个安装包。如果你用的是Linux，你可以用自带的包管理软件来安装。

## 快速入门

```bash
$ git clone https://github.com/corenel/vue-lab-manage.git
$ cd vue-lab-manage
# Install dependencies
$ npm install
# Run web server
$ npm run dev
```

注意在启动web server之前，我们需要启动`matlab-socket`这个后端：

```bash
$ git clone https://github.com/corenel/matlab-socketio.git
$ cd matlab-socket
# Run matlab
$ ./matlabStart.sh
# Run socket.io adapter
$ node run test
```

## 配置文件

### 端口与代理

在`config/index.js`中可以修改端口`port`(默认`8082`)和代理`target`(默认`localhost`).

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

### 预置的控制参数

在`config/ctl.params.js`中可以修改或添加控制参数，注意需要用`json`格式.

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

### 路由设置
在`src/config.js`中，你可以设置需要加载的组件。

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

进行开发的话使用的是`webpack` + `vue.js`:

```bash
$ cd vue-lab-manage
$ npm run dev
# 然后就可以修改 ./src 文件夹中的文件了
# 修改保存后打开的网页会热加载
```

## 贡献
1. 首先当然是Fork
2. 创建你自己的分支: `git checkout -b my-new-feature`
3. 提交你的修改: `git commit -am 'Add some feature'`
4. push到你自己的fork repo上: `git push origin my-new-feature`
5. 发送一个Pull Request :D

## 提示

开发的时候，你可以用`Vue.js devtools` ([download](https://chrome.google.com/webstore/detail/vuejs-devtools/nhdogjmejiglipccpnnnanhbledajbpd))插件来在Chrome上进行调试。

## Prior art

`vue-lab-manage` wouldn't exist if it wasn't for excellent prior art, it's inspired by these projects:

* [vue.js](https://vuejs.org/) for framework
* [docsify](https://github.com/QingWei-Li/docsify) for documentation writing
