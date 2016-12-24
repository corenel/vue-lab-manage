<template>
    <section class="section">
        <h1 class="title">Simulation</h1>
        <h3 class="subtitle">Simulate in Matlab and plot figure here.</h3>
        <hr>
        <div class="columns">
            <div class="column">
                <div class="box">
                    <tab :active-index = "1" style= "width: 100%; height: 300px;">
                        <tab-item title="Single Tank">
                            That's single tank simulation.
                        </tab-item>
                        <tab-item title="Couple Tank">
                            <p>That's couple tank simulation.</p>
                            <p>That's couple tank simulation.</p>
                            <p>That's couple tank simulation.</p>
                            <p>That's couple tank simulation.</p>
                            <p>That's couple tank simulation.</p>
                            <p>That's couple tank simulation.</p>
                            <p>That's couple tank simulation.</p>
                            <p>That's couple tank simulation.</p>
                            <button id="startSim" v-on:click="clickButton('sim_tank_2')" class="button is-info">
                                Start
                            </button>
                        </tab-item>
                        <tab-item title="Quad Tank">
                            That's quad tank simulation.
                        </tab-item>
                    </tab>
                </div>
            </div>
        </div>
        <div class="column is-half">
            <div class="box">
                <h3 class="title">
                    Let's start
                </h3>
                <chart :type = "'line'" :data = "chartData" :options = "charOptions"></chart>
            </div>
        </div>
    </section>
</template>
<style>
</style>
<script>
    import Chart from '../../ui/Chart.vue'
    import {Tab, TabItem} from '../../ui/Tab'
    export default{
        data () {
            return {
                receivedMsg: '',
                receivedChart: [],
                chartLabels: ['level_1', 'level_2']
            }
        },
        components: {
            Chart,
            Tab,
            TabItem
        },
        sockets: {
            connect: function () {
                console.log('socket connected')
            },
            fromMatlab: function (data) {
//                console.log(data)
                if (data !== null) {
                    let that = this
                    try {
                        this.receivedMsg = JSON.parse(data)
                    } catch (err) {
//                        console.log(data)
                        console.log(err)
                        document.getElementById('startSim').classList.remove('is-loading')
                    }
                    if (this.receivedMsg['type'] === 'chart') {
//                        this.receivedChart = []
                        document.getElementById('startSim').classList.remove('is-loading')
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

                            let elementPos = that.receivedChart.map(function (obj) {
                                return obj.label
                            }).indexOf(y)
                            if (elementPos !== -1) {
                                that.receivedChart[elementPos] = reData
                            } else {
                                that.receivedChart.push(reData)
                            }
                        })
                        console.log(this.receivedChart)
                    }
                }
            }
        },
        methods: {
            clickButton: function (simModel) {
                document.getElementById('startSim').classList.add('is-loading')
                // $socket is socket.io-client instance
                this.$socket.emit('toMatlab', JSON.stringify({
                    name: simModel
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
