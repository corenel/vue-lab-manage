<template>
    <section class="section">
        <h1 class="title">Real Plant</h1>
        <h3 class="subtitle">Do experiments in real plant and plot figure here.</h3>
        <div class="columns">
            <div class="column">
                <div class="box">
                    <tab :active-index = "1" style= "width: 100%;">
                        <tab-item title="Single Tank">
                            <p>That's single tank simulation.</p>
                        </tab-item>
                        <tab-item title="Couple Tank">
                            <p style="text-align:center;">
                                <img src="../../../assets/img/conf2_PI_FF.png"/>
                            </p>
                            <button id="show-modal"
                                    class="button">Params</button>
                            <button id="startSim"
                                    class="button">Start</button>
                        </tab-item>
                        <!--<tab-item title="Quad Tank">-->
                            <!--That's quad tank simulation.-->
                        <!--</tab-item>-->
                    </tab>
                </div>
            </div>
        </div>
        <div class="tile is-ancestor">
            <div class="tile is-vertical is-12">
                <div class="tile">
                    <div class="tile is-parent">
                        <article class="tile is-child notification is-info">
                            <p class="title">Tank 1 Level</p>
                            <p class="subtitle">{{ monitorData.level_1 }} cm</p>
                        </article>
                    </div>
                    <div class="tile is-parent">
                        <article class="tile is-child notification is-success">
                            <p class="title">Tank 2 Level</p>
                            <p class="subtitle">{{ monitorData.level_2 }} cm</p>
                        </article>

                    </div>
                    <div class="tile is-parent">
                        <article class="tile is-child notification is-warning">
                            <p class="title">Voltage</p>
                            <p class="subtitle">{{ monitorData.voltage }} V</p>
                        </article>
                    </div>
                </div>
                <!--<div class="tile is-parent">-->
                    <!--<article class="tile is-child notification is-danger">-->
                        <!--<p class="title">Warning!</p>-->
                        <!--<p class="subtitle">Tank is using significant energy!</p>-->
                        <!--<div class="content">-->
                            <!--<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin ornare magna eros, eu-->
                                <!--pellentesque tortor vestibulum ut. Maecenas non massa sem. Etiam finibus odio quis-->
                                <!--feugiat facilisis.</p>-->
                        <!--</div>-->
                    <!--</article>-->
                <!--</div>-->
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
</style>
<script>
    import Chart from '../../ui/Chart.vue'
    import {Tab, TabItem} from '../../ui/Tab'
    export default{
        data () {
            return {
                msg: 'hello vue',
                receivedData: '{"event":"chart","time":[[0],[0.000008827090171],[0.00005296254103],[0.0002736397953],[0.001377026067],[0.006843045117],[0.01319403518],[0.01319403518],[0.02981580405],[0.08549488994],[0.11477667],[0.11477667],[0.2311341805],[0.5739038482],[1.173903848],[1.773903848],[2.373903848],[2.973903848],[3.573903848],[4.173903848],[4.773903848],[5.373903848],[5.973903848],[6.573903848],[7.173903848],[7.773903848],[8.254696549],[8.254696549],[8.854696549],[9.031446727],[9.031446727],[9.031446727],[9.631446727],[10.2073162],[10.8073162],[11.27929247],[11.75126873],[12.26822917],[12.84495994],[13.44495994],[13.90778848],[14.37061702],[14.87563536],[15.23165592],[15.23165592],[15.63768493],[15.74997112],[15.74997112],[15.92822224],[15.92822224],[16.10647335],[16.28472447],[16.64122671],[17.24122671],[17.5095485],[17.5095485],[18.1095485],[18.31710651],[18.31710651],[18.91710651],[19.51710651],[20.11710651],[20.71710651],[21.31710651],[21.62154962],[21.62154962],[22.22154962],[22.82154962],[23.42154962],[24.02154962],[24.62154962],[25.22154962],[25.82154962],[26.42154962],[27.02154962],[27.62154962],[28.22154962],[28.82154962],[29.42154962],[30]],"level_1":[[0],[0.00004127831515],[0.0002475011976],[0.001276898845],[0.006404986601],[0.0316019533],[0.06062453155],[0.06062453155],[0.1357559071],[0.381969588],[0.5090347737],[0.5090347737],[1.002163749],[2.38023078],[4.617839342],[6.699485309],[8.661137399],[10.5233079],[12.29972345],[14.00039707],[15.63304442],[17.20384199],[18.71787526],[20.17942306],[21.59214784],[22.9592286],[24.02364954],[24.02364954],[24.86940009],[25],[25],[25],[25.21969152],[25.21412495],[25.12237626],[25.05076452],[25.00199645],[24.97719035],[24.97448155],[24.9840483],[24.99240453],[24.99857386],[25.00212123],[25.0029629],[25.0029629],[24.59466761],[24.35723429],[24.35723429],[23.92837476],[23.92837476],[23.48706008],[23.04985298],[22.18776153],[20.7739415],[20.15673709],[20.15673709],[18.95055247],[18.60265379],[18.60265379],[17.74886672],[17.0379469],[16.42024767],[15.88131126],[15.41950799],[15.21512392],[15.21512392],[14.87910995],[14.64866714],[14.51364292],[14.44577099],[14.41806832],[14.41355121],[14.42491744],[14.45014398],[14.48823307],[14.53703129],[14.59305444],[14.65233813],[14.71136045],[14.76559571]],"level_2":[[0],[1.846654042e-8],[2.739571269e-7],[0.000003172788999],[0.00003500185344],[0.0003742562988],[0.0009821841958],[0.0009821841958],[0.003238235802],[0.01493646633],[0.02282761796],[0.02282761796],[0.06212892953],[0.2238237696],[0.601008489],[1.050854499],[1.549404167],[2.083775679],[2.645756469],[3.229608095],[3.83108042],[4.446895554],[5.074448933],[5.711623125],[6.356665303],[7.008103079],[7.533879938],[7.533879938],[8.188993129],[8.379113869],[8.379113869],[8.379113869],[9.009036041],[9.586855853],[10.15879067],[10.58779365],[10.99982793],[11.43340979],[11.89727886],[12.35952264],[12.70283427],[13.03516594],[13.38577199],[13.62567244],[13.62567244],[13.88932965],[13.95876999],[13.95876999],[14.06485788],[14.06485788],[14.16563967],[14.26113222],[14.43651631],[14.6859551],[14.77945487],[14.77945487],[14.9511366],[15],[15],[15.1160918],[15.200211],[15.257129],[15.29055195],[15.30392725],[15.30414863],[15.30414863],[15.29390908],[15.27307792],[15.24599634],[15.21607842],[15.18550664],[15.15551452],[15.12682406],[15.09996233],[15.07538654],[15.05347569],[15.03447939],[15.01848647],[15.0054324],[14.99546003]]}',
                monitorData: {
                    level_1: 14.4501,
                    level_2: 15.0999,
                    voltage: 10.3566
                },
                chartLabels: ['level_1', 'level_2'],
                chartColors: {
                    'level_1': '91, 193, 244',
                    'level_2': '69, 211, 225'
                },
                chartOptions: {
                    scales: {
                        xAxes: [{
                            type: 'linear',
                            position: 'bottom'
                        }]
                    }
                },
                chartChanged: false
            }
        },
        components: {
            Chart,
            Tab,
            TabItem
        },
        created () {
        },
        beforeDestroy () {
            if (this.timer) {
                clearInterval(this.timer)
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
            },
            receivedMsg () {
                return JSON.parse(this.receivedData)
            },
            chartData () {
                let that = this
                let tmpData = {datasets: []}
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
                    tmpData.datasets.push(reData)
                })
                return tmpData
            }
        }
    }
</script>
