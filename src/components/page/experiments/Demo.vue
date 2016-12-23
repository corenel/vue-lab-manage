<template>
    <div>
        <p>Command: {{ name }}</p>
        <input v-model="name">
        <p>Message: {{ msg }}</p>
        <input v-model="msg">
        <button v-on:click="clickButton()">send message</button>
        <!--<ul class="list">-->
            <!--<li v-for="(value, key) in receivedMsg">-->
                <!--{{ key }}: {{ value }}-->
            <!--</li>-->
        <!--</ul>-->
        <div class="column is-half">
            <div class="box">
                <h3 class="title">Simulation</h3>
                <chart :type = "'line'" :data = "chartData" :options = "charOptions"></chart>
            </div>
        </div>
    </div>
</template>
<style>
</style>
<script>
    import Chart from '../../ui/Chart.vue'
    export default{
        data () {
            return {
                name: 'Vue',
                msg: 'hello vue',
                receivedMsg: '',
                receivedChart: [],
                chartLabels: ['level_1', 'level_2']
            }
        },
        components: {
            Chart
        },
        sockets: {
            connect: function () {
                console.log('socket connected')
            },
            fromMatlab: function (data) {
                if (data !== null) {
                    let that = this
                    this.receivedMsg = JSON.parse(data)
                    if (this.receivedMsg['type'] === 'chart') {
                        this.chartLabels.forEach(function (y) {
                            let x = 'time'
                            let reData = {
                                label: y,
                                data: [],
                                pointRadius: 1
                            }
                            for (let i = 0; i < that.receivedMsg[x].length; i++) {
                                reData.data.push({
                                    x: that.receivedMsg[x][i][0],
                                    y: that.receivedMsg[y][i][0]
                                })
                            }
                            that.receivedChart.push(reData)
                        })
                    }
                }
            }
        },
        methods: {
            clickButton: function () {
                // $socket is socket.io-client instance
                this.$socket.emit('toMatlab', JSON.stringify({
                    name: this.name,
                    msg: this.msg
                }))
            }
        },
        computed: {
            chartData () {
                return {
                    datasets: this.receivedChart
                }
            },
            charOptions () {
                return {
                    scales: {
                        xAxes: [{
                            type: 'linear',
                            position: 'bottom'
                        }]
                    }
                }
            }
        },
        created () {
        },
        beforeDestroy () {
            if (this.timer) {
                clearInterval(this.timer)
            }
        }
    }
</script>
