<template>
    <div>
        <main class="">
            <router-view/>
        </main>
    </div>
</template>

<!--<script>-->
<!--import {mapActions} from 'vuex'-->
<!--export default {-->
<!--  name: "DashboardAuthLayout",-->
<!--  data(){-->
<!--    return {-->
<!--      user:this.$store.state.auth.user-->
<!--    }-->
<!--  },-->
<!--  methods:{-->
<!--    ...mapActions({-->
<!--      signOut:"auth/signOut"-->
<!--    }),-->
<!--    async signOut () {-->
<!--      await this.signOutAction()-->
<!--      this.$router.replace({ name: 'home' })-->
<!--    }-->
<!--  }-->
<!--}-->
<!--</script>-->
<script>
import {mapGetters, mapActions} from 'vuex'

export default {
    name: "DashboardAuthLayout",
    data() {
        return {
            user: this.$store.state.auth.user
        }
    },
    computed: {
        ...mapGetters({
            authenticated: 'auth/authenticated',
            authUser: 'auth/user'
        })
    },
    methods: {
        ...mapActions({
            signOutAction: 'auth/signOut'
        }),
        async signOut() {
            await this.signOutAction()
            this.$router.replace({name: 'home'})
        }
    }
}
</script>

<style scoped>

</style>
