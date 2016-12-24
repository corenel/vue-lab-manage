<template>
    <section class="section">
        <h1 class="title">Simulation</h1>
        <h3 class="subtitle">Simulate in Matlab and plot figure here.</h3>
        <hr>
        <div class="columns">
            <div class="column">
                <div class="box">
                    <tab :active-index = "1" style= "width: 100%; height: 610px;">
                        <tab-item title="Single Tank">
                            That's single tank simulation.
                        </tab-item>
                        <tab-item title="Couple Tank">
                            <table class="table is-bordered is-striped is-narrow">
                                <thead>
                                <tr>
                                    <th> Parameters </th>
                                    <th> Value</th>
                                </tr>
                                </thead>
                                <tbody>
                                <tr v-for="(item, index) in params">
                                    <td>{{ item.name }}</td>
                                    <td>
                                        <p class="control">
                                            <input v-model="item.value" class="input" placeholder="Input a value">
                                        </p>
                                    </td>
                                </tr>
                                </tbody>
                            </table>
                            <button id="setParams"
                                    v-on:click="setParams()"
                                    class="button is-success">Set</button>
                            <button id="startSim"
                                    v-on:click="startSim()"
                                    class="button is-danger">Start</button>
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
                    <tab :active-index = "1" style= "width: 100%; height: 400px">
                        <tab-item title="Chart">
                            <chart :type = "'line'" :data = "chartData" :options = "charOptions"></chart>
                        </tab-item>
                        <tab-item title="Data">
                            <table class="table is-bordered is-striped is-narrow">
                                <thead>
                                    <tr>
                                        <th>Time (s)</th>
                                        <th v-for="label in chartLabels">{{ label }} (cm)</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="(item, index) in tableData">
                                        <td>{{ item.time.toFixed(5) }}</td>
                                        <td v-for="label in chartLabels">{{ item[label].toFixed(8) }}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </tab-item>
                    </tab>
                </div>
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
                chartLabels: ['level_1', 'level_2'],
                chartColors: {
                    'level_1': '75, 192, 192',
                    'level_2': '54, 162, 235'
                },
                params: {
                    mdl: {
                        name: 'Model',
                        value: 'Tank2'
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
                    },
                    Kp_1: {
                        name: 'Kp_1',
                        value: '7.2152'
                    },
                    Ki_1: {
                        name: 'Ki_1',
                        value: '9.1061'
                    },
                    Kff_1: {
                        name: 'Kff_1',
                        value: '2.3911'
                    },
                    Kp_2: {
                        name: 'Kp_2',
                        value: '5.0934'
                    },
                    Ki_2: {
                        name: 'Ki_2',
                        value: '1.7436'
                    },
                    Kff_2: {
                        name: 'Kff_2',
                        value: '1'
                    }
                }
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
                        document.getElementById('startSim').classList.remove('is-loading')
                        this.chartLabels.forEach(function (y) {
                            let x = 'time'
                            let reData = {
                                label: y,
                                data: [],
                                fill: true,
                                lineTension: 0.1,
                                backgroundColor: 'rgba(' + that.chartColors[y] + ',0.4)',
                                borderColor: 'rgba(' + that.chartColors[y] + ',1)',
                                borderCapStyle: 'butt',
                                borderDash: [],
                                borderDashOffset: 0.0,
                                borderJoinStyle: 'miter',
                                pointBorderColor: 'rgba(' + that.chartColors[y] + ',1)',
                                pointBackgroundColor: '#fff',
                                pointBorderWidth: 1,
                                pointHoverRadius: 5,
                                pointHoverBackgroundColor: 'rgba(' + that.chartColors[y] + ',1)',
                                pointHoverBorderColor: 'rgba(220,220,220,1)',
                                pointHoverBorderWidth: 2,
                                pointRadius: 1,
                                pointHitRadius: 10
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
                        console.log(this.receivedMsg)
                    }
                }
            }
        },
        methods: {
            startSim: function () {
                document.getElementById('startSim').classList.add('is-loading')
                // $socket is socket.io-client instance
                this.$socket.emit('toMatlab', JSON.stringify({
                    name: 'sim'
                }))
            },
            setParams: function () {
//                document.getElementById('setParams').classList.add('is-loading')
                console.log('a1')
                this.$socket.emit('toMatlab', JSON.stringify({
                    name: 'params',
                    data: this.params
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
//                    legend: {
//                        display: true
//                    },
                    scales: {
                        xAxes: [{
                            type: 'linear',
                            position: 'bottom'
                        }]
                    }
                }
            },
            tableData () {
                let tmpData = []
                let that = this
                if (this.receivedMsg['time'] !== undefined) {
                    for (let i = 0; i < this.receivedMsg['time'].length; i++) {
                        tmpData[i] = {
                            time: this.receivedMsg['time'][i][0]
                        }
                        this.chartLabels.forEach(function (y) {
                            tmpData[i][y] = that.receivedMsg[y][i][0]
                        })
                    }
                }
                return tmpData
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
