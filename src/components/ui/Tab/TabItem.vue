<template>
    <div class="tab" v-show="show">
        <slot></slot>
    </div>
</template>
<style>
</style>
<script>
    export default{
        props: {
            title: String,
            required: true
        },
        data () {
            return {
                index: 0
            }
        },
        mounted () {
            this.index = this.$parent.items.length
//            this.show = this.$parent.activeIndex === this.index
            this.$parent.items.push({
                title: this.title
            })
        },
        beforeDestroy () {
            this.$parent.items.splice(this.index, 1)
        },
        components: {
        },
        computed: {
            show () {
                return this.$parent.activeIndex === this.index
            }
        }
    }
</script>
