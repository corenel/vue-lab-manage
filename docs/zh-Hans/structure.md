---
nav: zh-Hans
---

# 网站架构

下文将解释整个网站的架构。

## 简介

本网站为一个Vue.js项目，基于vue-webpack模板，并且使用了bulma、chart.js以及font awesome等库。整个网站基于Vue 2.x版本，并使用了配套的vue-router 2.x以及vuex。

## 概览

整个网站主要可以分为三个部分

* Web Client
* Web Server
* Matlab端

![architecture](assets/architecture.png)

## Web Client
主要为用户提供交互界面。具体的来说，主要实现以下功能：

* 根据用户输入，通过Server向Matlab端发送指令；
* 根据Matlab反馈数据，为用户展示可视化的实验数据；
* 提供其他静态页面的展示。

### 组件
前端的组件主要是放在`src/components`中，其中又分为三个文件夹：

* `mobile`：移动端的组件（目前未完成，只放了一些demo）
* `pages`：PC端的组件
* `ui`：通用的ui库，例如`Tab`、`Modal`、`Menu`、`NavBar`等。

组件主要是用`Vue.js`的`template`功能开发的，一个组件即为一个`*.vue`文件，其内混合了`Html`、`CSS`与`JavaScript`。示例如下：

```
<!--> src/components/Dashboard.vue <-->
<template>
    <section class="section content">
        <h2>Welcome to lab management system</h2>
        <div class="columns">
            <div class="column">
                <div class="notification is-success has-text-centered">
                    <p class="title">Users</p>
                    <p class="subtitle">2</p>
                </div>
            </div>
            <div class="column">
                <div class="notification is-info has-text-centered">
                    <p class="title">Notice</p>
                    <p class="subtitle">22</p>
                </div>
            </div>
            <div class="column">
                <div class=" notification is-warning has-text-centered">
                    <p class="title">Devices</p>
                    <p class="subtitle">6</p>
                </div>
            </div>
            <div class="column">
                <div class="notification is-danger has-text-centered">
                    <p class="title">Warnings</p>
                    <p class="subtitle">48</p>
                </div>
            </div>
        </div>
    </section>
</template>
<style>
    /* always present */
    .expand-transition {
        transition: all .3s ease;
        height: 30px;
        padding: 10px;
        background-color: #eee;
        overflow: hidden;
    }

    /* .expand-enter defines the starting state for entering */
    /* .expand-leave defines the ending state for leaving */
    .expand-enter, .expand-leave {
        height: 0;
        padding: 0 10px;
        opacity: 0;
    }
</style>
<script>
    import { mapState } from 'vuex'
    export default{
        data () {
            return {

            }
        },
        computed: mapState({
            user: state => state.user
        }),
        created () {

        },
        beforeDestroy () {
            if (this.timer) {
                clearInterval(this.timer)
            }
        },
        components: {

        }
    }
</script>
```

#### Header
`src/components/pages/Header.vue`主要定义网页顶部导航栏的一些信息。如下所示，左端是一个指向`Home`的链接，中间是系统的名称，右端则为登录名与登出按钮。关于登录状态的管理，请见下文。

```
<template>
    <nav class="nav header-bar">
        <div class="nav-left">
            <a class="nav-item " href="/">
                Home
            </a>
        </div>
        <div class="nav-center">
            <h1>Lab Management</h1>
        </div>
        <div id="nav-menu" class="nav-right nav-menu">
            <a class="nav-item" v-show="user.id">
                <span>Hi, {{ user.name }}</span>
                <span class="tag is-small"
                      v-on:click="submit">logout</span>
            </a>
        </div>
    </nav>
</template>
```

#### Sidebar Nav
`src/components/pages/SideNaviBar.vue`主要定义网页侧边栏的一些信息。侧边栏的内容（所加载的组件）由`src/config.js`定义。

```
<template>
    <div :class="['side-bar']">
        <div class="header-logo">
            <i class="fa fa-diamond"></i>
        </div>
        <navi :model="menu" class="menu"></navi>
        <div class="user-info-link">
            <a href="#"></a>
        </div>
        <div class="collapse-nav" @click="toggleCollapse()">
            <i class="fa fa-angle-left"></i>
        </div>
    </div>
</template>
```

#### Desktop
`src/Desktop.vue`主要定义网页的主体部分。其中定义了Vue的Instance，并设置`id="app"`。同时，也引入了Header与Sidebar Nav。

```
<template>
    <div id="app" :class="{'collapsed':collapsed}">
        <side-navi :collapsed.sync="collapsed"></side-navi>
        <section class="app-main">
            <div class="app-main-header">
                <header-bar></header-bar>
            </div>
            <div class="app-main-body">
                <div class="container">
                    <router-view></router-view>
                </div>
            </div>
        </section>
    </div>
</template>
```

#### Login
`src/components/pages/login/Login.vue`主要定义了登录页面的相关界面与操作，其中调用了Vuex的状态来判断是否登录。关于登录状态的管理，请见下文。

```
<template>
    <section class="section content">
        <h2>Gettysburg Address</h2>
        <p>Four score and seven years ago our fathers brought forth on this continent, a new nation, conceived in liberty, and dedicated to the proposition that "all men are created equal."</p>
        <p>Now we are engaged in a great civil war, testing whether that nation, or any nation so conceived, and so dedicated, can long endure. We are met on a great battle field of that war. We have come to dedicate a portion of that field, as a final resting place for those who here gave their lives, that that nation might live. It is altogether fitting and proper that we should do this.</p>
        <p>But, in a larger sense, we can not dedicate—we can not consecrate—we can not hallow—this ground. The brave men, living and dead, who struggled here, have consecrated it, far above our poor power to add or detract. The world will little note, nor long remember what we say here; but it can never forget what they did here.</p>
        <p>It is for us the living, rather, to be dedicated here to the unfinished work which they who fought here have thus far so nobly advanced. It is rather for us to be here dedicated to the great task remaining before us—that from these honored dead we take increased devotion to that cause for which they gave the last full measure of devotion—that we here highly resolve that these dead shall not have died in vain—that this nation, under God, shall have a new birth of freedom—and that government of the people, by the people, for the people, shall not perish from the earth.</p>
        <modal v-if="showModal" @close="showModal = true">
            <h1 slot="header">Login</h1>
            <form slot="body" class="login" v-on:submit.prevent="submit">
                <label class="label">UserID</label>
                <p class="control has-icon has-icon-right">
                    <input class="input" type="text" placeholder="Your userid" v-model="form.id">
                    <i v-show="btn && !form.id" class="fa fa-warning"></i>
                    <span v-show="btn && !form.id" class="help is-danger">This userid is invalid</span>
                </p>
                <label class="label">Username</label>
                <p class="control has-icon has-icon-right">
                    <input class="input" type="text" placeholder="Your username" v-model="form.name">
                    <i v-show="btn && !form.name" class="fa fa-warning"></i>
                    <span v-show="btn && !form.name" class="help is-danger">This username is invalid</span>
                </p>
                <button class="button btn-default">Login</button>
            </form>
            <div slot="footer"></div>
        </modal>
    </section>
</template>
```

<p class="tip">

登录页面的背景是林肯的葛底斯堡演说。

</p>

#### Example
下以`src/components/experiments/Simulation.vue`为例介绍一个具体页面的结构。

`<template>`中主要放的是html，其简略版本如下：

```
<template>
    <section class="section">
        <h1 class="title">Simulation</h1>
        <h3 class="subtitle">Simulate in Matlab and plot figure here.</h3>
        <!--<hr>-->
        <div class="columns">
            <div class="column">
                <div class="box">
                    <tab :active-index = "1" style= "width: 100%; max-height: 650px;">
                        <tab-item title="Single Tank">
                            That's single tank simulation.
                        </tab-item>
                        <tab-item title="Couple Tank">
                          ...
                        </tab-item>
                        <tab-item title="Quad Tank">
                            That's quad tank simulation.
                        </tab-item>
                    </tab>
                </div>
            </div>
        </div>
        <div class="columns">
            <div class="column">
                <div class="box">
                    <tab :active-index = "0" style= "width: 100%;">
                        <tab-item title="Chart" style="max-width: 700px;">
                            ...
                        </tab-item>
                        <tab-item title="Data">
                            ...
                        </tab-item>
                    </tab>
                </div>
            </div>
        </div>
    </section>
</template>
```

* 首先是一个`<section></section>`，定义了整个主体的风格。
* `section`内分为一个`h1`标题，一个`h3`副标题，一条水平分界线，以及两个`Tab`组件。
* 第一个`Tab`组件内含三个标签，分别是单容、双容与四容水箱。
* 第二个`Tab`组件内含了`Chart`组件与另外一个`table`。

##### Tab
`Tab`组件定义在`src/components/ui/Tab/Tab.vue`内，主要的调用方法如下：

```
<template>
  <tab :active-index = "0" style= "width: 100%;">
      <tab-item title="Chart">
        ...
      </tab-item>
      <tab-item title="Data">
        ...
      </tab-item>
  </tab>
</template>
<script>
  import {Tab, TabItem} from '../../ui/Tab'
  export default{
    components: {
        Tab,
        TabItem
    }
  }
</script>
```

其中`:active-index`为默认激活的标签序号；`tab-item`为各个子标签，可按需设置。

##### Modal
`Modal`组件定义在`src/components/ui/Modal/Modal.vue`内，主要的调用方法如下：

```
<template>
  <button id="show-modal"
          v-on:click="showModal = true"
          class="button is-info">Params</button>
  <modal v-if="showModal" @close="showModal = false">
      <h1 slot="header">...</h1>
      <div slot="body">
        ...
      </div>
      <div slot="footer">
        ...
      </div>
  </modal>
</template>
<script>
  import Modal from '../../ui/Modal/Modal.vue'
  export default{
    data () {
        return {
            showModal: false
        }
    },
    components: {
        Modal
    }
  }
</script>
```

其中`header`、`body`、`footer`的`slot`可以用来替代默认的`Modal`的页面相应部分。

<p class="tip">

替代了`footer`之后，需要手动设置关闭Modal的methods。具体可见`src/components/experiments/Simulation.vue`内的实现。

</p>

##### Chart
`Chart`组件定义在`src/components/ui/Chart.vue`内，主要的调用方法如下：

```
<template>
  <chart :type = "'line'"
         :data = "chartData"
         :options = "chartOptions"></chart>
</template>
<script>
  import Modal from '../../ui/Modal/Modal.vue'
  export default{
    data () {
        return {
          chartData: {datasets: []},
          chartOptions: {
              scales: {
                  xAxes: [{
                      type: 'linear',
                      position: 'bottom'
                  }]
              }
          }
        }
    },
    components: {
        Modal
    }
  }
</script>
```

`Chart`组件实际上是调用了`Chart.js`库，具体使用方法可见其[文档](http://www.chartjs.org/docs/)。

组件的`props`中，`type`设置图的类型，`data`指定绘图数据，`options`指定绘图的一些设置。其中，`data`所需要的数据格式如下，其中具体选项的设置请参考官方文档。

```json
{
  datasets: [
    {
      label: y,
      data: [
        {
          x: -10,
          y: 0
        }, {
          x: 0,
          y: 10
        }, {
          x: 10,
          y: 5
        }
      ],
      fill: true,
      lineTension: 0.1,
      backgroundColor: 'rgba('91, 193, 244',0.2)',
      borderColor: 'rgba('91, 193, 244',1)',
      borderCapStyle: 'butt',
      borderDash: [],
      borderDashOffset: 0.0,
      borderJoinStyle: 'miter',
      pointBorderColor: 'rgba('91, 193, 244',1)',
      pointBackgroundColor: '#fff',
      pointBorderWidth: 1,
      pointHoverRadius: 5,
      pointHoverBackgroundColor: 'rgba('91, 193, 244',1)',
      pointHoverBorderColor: 'rgba(220,220,220,1)',
      pointHoverBorderWidth: 2,
      pointRadius: 1,
      pointHitRadius: 10
    }
  ]
}
```
<p class="tip">

另外，可以在全局设置`chartColors`，用以控制各条线的颜色；设置`chartChanged`来强制刷新图中曲线。具体见`src/components/experiments/Simulation.vue`内的实现。

</p>

## Web Server
使⽤ Node.js 编写，同时使⽤ Socket.io 库来与 Matlab 以及 Web Client 进⾏通信。其实现的主要功能如下：

* 使⽤服务端渲染（Server Side Render，SSR）技术，在服务端渲染客户端所需的⽹页，加快⾸屏速度，提升兼容性；
* 使⽤ Webpack 构建并打包，⽣成静态⽂件；
* 使⽤ Vue-router 实现路由功能；
* 使⽤ Vuex 实现各组件间集中式的状态管理；
* 使⽤ Socket.io 库接收 Matlab 端发送的消息，并将其转发⾄ Web Client 端；并接收 Web Client 端发送的指令，将其发给 Matlab 端；

### Socket.io
本系统使用`socket.io`进行通信，相关设置在`build/dev-server.js`与`src/main.js`中。

`build/dev-server.js`中主要是开启了socket.io的服务器，并监听和转发来自Matlab端与Web Client的消息。

```javascript
// build/dev-server.js
var io = require('socket.io')(1234)
var matlabServer = io.of('/matlab')
var webClient = io.of('/client')

// Socket.io communication between server and client
console.log('[Socket] Listening at http://localhost:1234')

matlabServer.on('connection', function (socket) {
    socket.on('fromMatlab', function (data) {
        try {
            data = JSON.parse(data)
        } catch (err) {
            console.log(err)
        }
        console.log('[Socket][Matlab][' + data.event + ']', data)
        // console.log(data.event)
        webClient.emit(data.event, data)
    })
})

webClient.on('connection', function (socket) {
    socket.on('toMatlab', function (data) {
        console.log('[Socket][Web Client]', data)
        matlabServer.emit('toMatlab', data)
    })
})

io.on('connection', function (socket) {
    console.log('[Socket] user connected: ' + socket.id)
    socket.on('disconnect', function () {
        console.log('[Socket] user disconnected: ' + socket.id)
    })
})
```

`src/main.js`中开启的是Web Client的socket client，使用了vue-socketio库。

```javascript
// src/main.js
Vue.use(VueSocketio, 'localhost:1234/client')
```

之后即可在组件中添加有关`socket`的监听事项：

```
<script>
  export default{
    sockets: {
            connect: function () {
                console.log('socket connected')
            },
            params: function (data) {
                if (data !== null) {
                    if (data['status'] === 'success') {
                        document.getElementById('setParams').classList.remove('is-loading')
                        this.closeModal()
                    }
                }
            }
        }
  }
</script>
```

### Router
本系统使用`vue-router`进行路由管理。在`src/config.js`中，你可以设置需要加载的组件。

<p class="tip">

此外，当用户未登录时，对于所有页面的访问均重定向至`Login`页面。具体见`src/main.js`内的实现。

</p>

### Vuex
本系统使用`vuex`进行组件之间的状态共享。在`src/store/user.js`中，你可以设置需要有关用户登录的状态管理。

```javascript
import Vue from 'vue'

export const USER_SIGNIN = 'USER_SIGNIN'
export const USER_SIGNOUT = 'USER_SIGNOUT'

export default {
  state: JSON.parse(sessionStorage.getItem('user')) || {},
  mutations: {
    [USER_SIGNIN] (state, user) {
      sessionStorage.setItem('user', JSON.stringify(user))
      // Object.assign(state, user)
      // To be reactive
      Object.keys(user).forEach(k => Vue.set(state, k, user[k]))
    },
    [USER_SIGNOUT] (state) {
      sessionStorage.removeItem('user')
      Object.keys(state).forEach(k => Vue.delete(state, k))
    }
  },
  actions: {
    [USER_SIGNIN] ({ commit }, user) {
      commit(USER_SIGNIN, user)
    },
    [USER_SIGNOUT] ({ commit }) {
      commit(USER_SIGNOUT)
    }
  }
}
```

当用户登录时，通过`USER_SIGNIN`方法传入用户的`id`与`username`，并保存于`localStorage`中。注销时，则将登录信息删去。后续添加真正的用户管理系统时，可在此增加验证的步骤，并保存于Cookies中。

关于在Client端上的用户登录状态读取、用户登录动作调用等，主要用的是`vuex`的`mapActions`方法。具体实现可见`src/components/ui/Header.vue`与`src/components/pages/login/Login.vue`。

## Matlab端
详见matlab-socket的[文档](/#/zh-Hans/matlab-socketio)。
