<template>
    <section class="section content">
        <h2>Gettysburg Address</h2>
        <p>Four score and seven years ago our fathers brought forth on this continent, a new nation, conceived in liberty, and dedicated to the proposition that "all men are created equal."</p>
        <p>Now we are engaged in a great civil war, testing whether that nation, or any nation so conceived, and so dedicated, can long endure. We are met on a great battle field of that war. We have come to dedicate a portion of that field, as a final resting place for those who here gave their lives, that that nation might live. It is altogether fitting and proper that we should do this.</p>
        <p>But, in a larger sense, we can not dedicate—we can not consecrate—we can not hallow—this ground. The brave men, living and dead, who struggled here, have consecrated it, far above our poor power to add or detract. The world will little note, nor long remember what we say here; but it can never forget what they did here.</p>
        <p>It is for us the living, rather, to be dedicated here to the unfinished work which they who fought here have thus far so nobly advanced. It is rather for us to be here dedicated to the great task remaining before us—that from these honored dead we take increased devotion to that cause for which they gave the last full measure of devotion—that we here highly resolve that these dead shall not have died in vain—that this nation, under God, shall have a new birth of freedom—and that government of the people, by the people, for the people, shall not perish from the earth.</p>
        <modal v-if="showModal" @close="showModal = true">
            <h1 slot="header">Login</h1>
            <form slot="body" class="login" v-on:submit.prevent="submit">
                <label class="label">UserID</label>
                <p class="control has-icon has-icon-right">
                    <input class="input" type="text" placeholder="Your userid" v-model="form.id">
                    <i v-show="btn && !form.id" class="fa fa-warning"></i>
                    <span v-show="btn && !form.id" class="help is-danger">This userid is invalid</span>
                </p>
                <label class="label">Username</label>
                <p class="control has-icon has-icon-right">
                    <input class="input" type="text" placeholder="Your username" v-model="form.name">
                    <i v-show="btn && !form.name" class="fa fa-warning"></i>
                    <span v-show="btn && !form.name" class="help is-danger">This username is invalid</span>
                </p>
                <button class="button btn-default">Login</button>
            </form>
            <div slot="footer"></div>
        </modal>
    </section>
</template>
<style>
</style>
<script>
    import { mapActions } from 'vuex'
    import { USER_SIGNIN } from '../../../store/user'
    import Modal from '../../ui/Modal/Modal.vue'

    export default {
        data () {
            return {
                showModal: true,
                btn: false,
                form: {
                    id: '',
                    name: ''
                }
            }
        },
        methods: {
            ...mapActions([USER_SIGNIN]),
            submit () {
                this.btn = true
                if (!this.form.id || !this.form.name) return
                this.USER_SIGNIN(this.form)
                this.$router.replace({ path: '/dashboard' })
            }
        },
        components: {
            Modal
        }
    }
</script>
