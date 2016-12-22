<template>
    <div>
        <p>{{ name }}</p>
        <input v-model="name">
        <p>{{ msg }}</p>
        <input v-model="msg">
        <button v-on:click="clickButton()">send message</button>
    </div>
</template>
<style>
</style>
<script>
    export default{
        data () {
            return {
                name: 'Vue',
                msg: 'hello vue'
            }
        },
        components: {
        },
        sockets: {
            connect: function () {
                console.log('socket connected')
            },
            asda: function (val) {
                console.log('this method fired by socket server. eg: io.emit("customEmit", data)')
            }
        },
        methods: {
            clickButton: function () {
                // $socket is socket.io-client instance
                this.$socket.emit('private message', this.name, this.msg)
            }
        }
    }
</script>
