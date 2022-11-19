<template>
  <div id="app">
    <!--    <nav>-->
    <!--      <router-link to="/">Home</router-link> |-->
    <!--      <router-link to="/about">About</router-link> |-->
    <!--      <router-link to="/login">Login</router-link>-->
    <!--    </nav>-->


    <nav class="navbar navbar-expand-lg fixed-top navbar-dark bg-dark" aria-label="Main navigation">
      <div class="container-fluid">
        <router-link class="navbar-brand" to="/">Product Forum</router-link>

        <div class="navbar-collapse offcanvas-collapse" id="navbarsExampleDefault">
          <li class="nav-item">
            <router-link class="nav-link " to="/all-posts">All Posts</router-link>
          </li>
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li class="nav-item">
              <router-link class="nav-link " to="/dashboard">Dashboard</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link " to="/pending-posts">Pending Posts</router-link>
            </li>
          </ul>

          <div class="text-end me-md-4">
            <a href="#" class="text-white me-3" v-if="authenticated">{{user.name}}</a>
            <a href="#" class="btn btn-outline-light me-2"  @click.prevent="signOut" v-if="authenticated">Sign out</a>
            <span v-else>
               <router-link class="btn btn-outline-light me-2" to="/login">Login</router-link>
              <router-link class="btn btn-warning" to="/register">Sign-up</router-link>
            </span>

          </div>

        </div>
      </div>
    </nav>

    <main class="container">
      <router-view/>
    </main>

  </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  computed: {
    ...mapGetters({
      authenticated: 'auth/authenticated',
      user: 'auth/user'
    })
  },
  methods:{
    ...mapActions({
      signOutAction: 'auth/signOut'
    }),
    async signOut () {
      await this.signOutAction()
      this.$router.replace({ name: 'home' })
    }
  }
}
</script>
