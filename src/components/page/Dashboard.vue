<template>
    <section class="section content">
        <h2>Welcome to lab management system</h2>
        <div class="columns">
            <div class="column">
                <div class="notification is-success has-text-centered">
                    <p class="title">Users</p>
                    <p class="subtitle">2</p>
                </div>
            </div>
            <div class="column">
                <div class="notification is-info has-text-centered">
                    <p class="title">Notice</p>
                    <p class="subtitle">22</p>
                </div>
            </div>
            <div class="column">
                <div class=" notification is-warning has-text-centered">
                    <p class="title">Devices</p>
                    <p class="subtitle">6</p>
                </div>
            </div>
            <div class="column">
                <div class="notification is-danger has-text-centered">
                    <p class="title">Warnings</p>
                    <p class="subtitle">48</p>
                </div>
            </div>
        </div>
    </section>
</template>
<style>
    /* always present */
    .expand-transition {
        transition: all .3s ease;
        height: 30px;
        padding: 10px;
        background-color: #eee;
        overflow: hidden;
    }

    /* .expand-enter defines the starting state for entering */
    /* .expand-leave defines the ending state for leaving */
    .expand-enter, .expand-leave {
        height: 0;
        padding: 0 10px;
        opacity: 0;
    }
</style>
<script>
    import { mapState } from 'vuex'
    export default{
        data () {
            return {

            }
        },
        computed: mapState({
            user: state => state.user
        }),
        created () {

        },
        beforeDestroy () {
            if (this.timer) {
                clearInterval(this.timer)
            }
        },
        components: {

        }
    }
</script>
