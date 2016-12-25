<template>
    <nav class="nav header-bar">
        <div class="nav-left">
            <a class="nav-item " href="/">
                Home
            </a>
        </div>
        <div class="nav-center">
            <h1>Lab Management</h1>
        </div>
        <div id="nav-menu" class="nav-right nav-menu">
            <a class="nav-item" v-show="user.id">
                <span>Hi, {{ user.name }}</span>
                <span class="tag is-small"
                      v-on:click="submit">logout</span>
            </a>
        </div>
    </nav>
</template>
<style lang="scss">
    .header-bar {
        background: #fff;
        height: 58px;
        line-height: 58px;
        font-size: 14px;
        padding: 0 0 0 15px;
        text-align: left;
    }
</style>
<script>
    import { mapState, mapActions } from 'vuex'
    import { USER_SIGNOUT } from '../../store/user'
    export default {
        methods: {
            ...mapActions([USER_SIGNOUT]),
            submit () {
                this.USER_SIGNOUT()
                this.$router.replace({ path: '/login' })
            }
        },
        computed: mapState({
            user: state => state.user
        })
    }
</script>
