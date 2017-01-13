<template>
    <section class="section">
        <h1 class="title">Discuss</h1>
        <h3 class="subtitle">Follow your heart.</h3>
        <div class="columns">
            <p style="text-align:center;">
                <img id='comment' src="../../assets/img/comment.svg" />
            </p>
        </div>
    </section>
</template>
<style>
    #comment {
        margin: 0 10px;
    }
</style>
<script>
    export default{
        data () {
            return {
                msg: 'hello vue'
            }
        },
        components: {
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
