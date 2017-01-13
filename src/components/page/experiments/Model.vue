<template>
    <section class="section">
        <h1 class="title">Model</h1>
        <h3 class="subtitle">Mechanism model of tanks.</h3>
        <div class="columns">
            <div class="column">
                <div class="box">
                    <tab :active-index = "0" style= "width: 100%;">
                        <tab-item title="Single Tank">
                            <p style="text-align:center;">
                                <img src="../../../assets/img/conf1_model.png" width="670"/>
                            </p>
                            <p><img src="../../../assets/img/conf1_model_1.png" width="510"/></p>
                            <p><img src="../../../assets/img/conf1_model_2.png" width="510"/></p>
                        </tab-item>
                        <tab-item title="Couple Tank">
                            <p>That's couple tank simulation.</p>
                        </tab-item>
                        <tab-item title="Quad Tank">
                            That's quad tank simulation.
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
    import {Tab, TabItem} from '../../ui/Tab'
    export default{
        data () {
            return {
                msg: 'hello vue'
            }
        },
        components: {
            Tab,
            TabItem
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
