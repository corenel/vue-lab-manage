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
                            <p>That's couple tank simulation.</p>
                            <p>That's couple tank simulation.</p>
                            <p>That's couple tank simulation.</p>
                            <button id="show-modal"
                                    v-on:click="showModal = true"
                                    class="button is-info">Params</button>
                            <modal v-if="showModal" @close="showModal = false">
                                <h1 slot="header">Params Panel</h1>
                                <table slot="body" class="table is-bordered is-striped is-narrow">
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
                                <div slot="footer">
                                    <button id="setParams"
                                            v-on:click="setParams()"
                                            class="button is-success">Set</button>
                                    <button v-on:click="closeModal()"
                                            class="button is-info">Close</button>
                                </div>
                            </modal>
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
                    <tab :active-index = "0" style= "width: 100%;">
                        <tab-item title="Chart" style="max-width: 700px;">
                            <chart :type = "'line'"
                                   :data = "chartData"
                                   :options = "chartOptions"
                                   :isChanged = 'chartChanged'></chart>
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
    #show-modal {
        margin: 10px 0;
    }
    #startSim {
        margin: 10px 0;
    }
</style>
<script>
    import Chart from '../../ui/Chart.vue'
    import {Tab, TabItem} from '../../ui/Tab'
    import Modal from '../../ui/Modal/Modal.vue'
    export default{
        data () {
            return {
                receivedMsg: '',
                chartLabels: ['level_1', 'level_2'],
                chartData: {datasets: []},
                chartColors: {
                    'level_1': '220, 220, 220',
                    'level_2': '151, 187, 205'
                },
                chartOptions: {
                    scales: {
                        xAxes: [{
                            type: 'linear',
                            position: 'bottom'
                        }]
                    }
                },
                chartChanged: false,
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
                },
                showModal: false
            }
        },
        components: {
            Chart,
            Tab,
            TabItem,
            Modal
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
                        this.chartChanged = !this.chartChanged
                        // Reformat data for each label in this.chartLabels
                        this.chartLabels.forEach(function (y) {
                            let x = 'time'
                            let reData = {
                                label: y,
                                data: [],
                                fill: true,
                                lineTension: 0.1,
                                backgroundColor: 'rgba(' + that.chartColors[y] + ',0.2)',
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
                            // Put time and value into reData
                            for (let i = 0; i < that.receivedMsg[x].length; i++) {
                                reData.data.push({
                                    x: that.receivedMsg[x][i][0],
                                    y: that.receivedMsg[y][i][0]
                                })
                            }
                            // If that.chartData.datasets have this reData before, just update it
                            // Otherwise push new one
                            let elementPos = that.chartData.datasets.map(function (obj) {
                                return obj.label
                            }).indexOf(y)
                            if (elementPos !== -1) {
                                that.chartData.datasets[elementPos] = reData
                            } else {
                                that.chartData.datasets.push(reData)
                            }
                        })
                        console.log(this.receivedMsg)
                    } else if (this.receivedMsg['type'] === 'params' &&
                        this.receivedMsg['status'] === 'success') {
                        document.getElementById('setParams').classList.remove('is-loading')
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
                document.getElementById('setParams').classList.add('is-loading')
                console.log('a1')
                this.$socket.emit('toMatlab', JSON.stringify({
                    name: 'params',
                    data: this.params
                }))
            },
            closeModal: function () {
                this.showModal = false
            }
        },
        computed: {
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
