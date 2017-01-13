---
nav: zh-Hans
---

# matlab-socket

主要实现的是根据Web端发来的命令来进⾏相应的实验操作，并回传结果的功能。具体功能如下

* 对Quanser⽔箱实物及其仿真模型进⾏操作，实现常规实验教学功能；
* 通过Socket中继与Web Server进⾏通信，实现命令获取与实验数据回传。

其中第⼀点在实验室现有条件下即可实现，⽆需额外开发。下⾯主要讲第⼆点。Matlab⾃带的Socket通信模块具有很⼤的局限性，只能实现最为基本的消息收发功能，⽽对于通信Event的设置，`Cell`与`Struct`对象的整体发送等功能并没有原⽣的⽀持。因此本系统通过⼀个Socket中继来实现将Matlab简陋的Socket消息转化为Socket.io⽀持的标准格式的功能。具体实现将下文介绍。

![socket](assets/socket.png)

Socket消息通信功能⽰意图如上所⽰，其中Web Client、Web Server以及Socket Relay之间采⽤Socket.io库进⾏通信，消息格式亦如下所⽰。SocketRelay与Matlab之间使⽤⾃⼰实现的Socket通信库进⾏基础的通信。

为实现JavaScript中的Object对象与Matlab中的`Cell`及`Struct`对象之间的相互转换，使⽤JSON作为中间通信的字符串格式。具体流程如下：

* Matlab通过`jsonlab`库中的`savejson()`函数将`Struct`对象转化为`JSON`格式的字符串，通过Socket消息辗转传到WebServer，WebSrever使⽤`JSON.parse()`函数将`JSON`格式的字符串转化为JavaScript的`Object`对象，传到WebClient以供使⽤。
* 反之亦然，WebClient将操作指令通过`JSON.stringify()`函数转化为`JSON`格式的字符串，通过Socket消息传到Matlab端，Matlab端将消息使⽤`loadjson()`函数转化为`Cell`对象，读取其中的指令并执⾏。

JSON字符串格式如下，其中`event`为消息名称，`data`为消息内容。

```json
{
  'event':'params',
  'data':{...}
}
```

Matlab端的Socket库，以及Socket Relay的具体实现，可见`matlab-socket/lib/server/`与`matlab-socket/app.js`。
