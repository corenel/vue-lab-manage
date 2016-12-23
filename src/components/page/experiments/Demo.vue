<template>
    <div>
        <p>{{ name }}</p>
        <input v-model="name">
        <p>{{ msg }}</p>
        <input v-model="msg">
        <button v-on:click="clickButton()">send message</button>
        <p>{{ receivecMsg }}</p>
    </div>
</template>
<style>
</style>
<script>
    export default{
        data () {
            return {
                name: 'Vue',
                msg: 'hello vue',
                receivecMsg: ''
            }
        },
        components: {
        },
        sockets: {
            connect: function () {
                console.log('socket connected')
            },
            fromMatlab: function (data) {
                if (data !== null) {
                    this.receivecMsg = data
                }
            }
        },
        methods: {
            clickButton: function () {
                // $socket is socket.io-client instance
                this.$socket.emit('toMatlab', this.name, this.msg)
            }
        }
    }
</script>
