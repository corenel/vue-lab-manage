<template>
    <section class="content">
        <h1 class="title">Modals</h1>
        <button id="show-modal" @click="showModal = true">Show Modal</button>
        <!-- use the modal component, pass in the prop -->
        <modal v-if="showModal" @close="showModal = false">
            <!--
              you can use custom content here to overwrite
              default content
            -->
            <h3 slot="header">custom header</h3>
        </modal>
    </section>
</template>
<style>
</style>
<script>
    import Modal from '../../ui/Modal/Modal.vue'
    export default{
        data () {
            return {
                showModal: false
            }
        },
        methods: {

        },
        components: {
            Modal
        }
    }
</script>
