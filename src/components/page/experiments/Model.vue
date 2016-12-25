<template>
    <section class="section">
        <h1 class="title">Model</h1>
        <h3 class="subtitle">Mechanism model of tanks.</h3>
        <div class="columns">
            <div class="column">
                <div class="box">
                    <tab :active-index = "0" style= "width: 100%;">
                        <tab-item title="Single Tank">
                            <p>That's single tank simulation.</p>
                            <p>When $a \ne 0$, there are two solutions to \(ax^2 + bx + c = 0\) and they are
                                $$x = {-b \pm \sqrt{b^2-4ac} \over 2a}.$$</p>
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
//    import 'mathjax/MathJax.js?config=TeX-AMS_HTML'
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
