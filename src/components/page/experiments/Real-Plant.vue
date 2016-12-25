<template>
    <section class="section">
        <h1 class="title">Real Plant</h1>
        <h3 class="subtitle">Do experiments in real plant and plot figure here.</h3>
        <div class="columns">
            <div class="column">
                <div class="box">
                    <tab :active-index = "0" style= "width: 100%;">
                        <tab-item title="Single Tank">
                            <p>That's single tank simulation.</p>
                        </tab-item>
                        <tab-item title="Couple Tank">
                            <p>That's couple tank simulation.</p>
                        </tab-item>
                        <!--<tab-item title="Quad Tank">-->
                            <!--That's quad tank simulation.-->
                        <!--</tab-item>-->
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
