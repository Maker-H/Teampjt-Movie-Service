<template>
  <div>
    <nav class="navbar navbar-expand-lg navbar-light" id="mainNav">
      <div class="container px-4 px-lg-5">
        <router-link :to="{name: 'HomeView'}">Home</router-link> |
        <router-link :to="{name: 'CommentView'}">Comment</router-link> |
        <router-link :to="{name: 'RecommandView'}">Recommand</router-link> |
        <router-link :to="{name: 'SearchView'}">Search</router-link> |
        <router-link :to="{name: 'ProfileView'}">Profile</router-link> |
        <!-- 로그인 했을 때 -->
        <button @click="logout">Logout</button>
        <!-- 로그인 안했을 때 -->
        <router-link :to="{name: 'LoginView'}">Login</router-link>
        <router-link :to="{name: 'SignUpView'}">SignUp</router-link>

      </div>
    </nav>
  </div>
</template>

<script>
export default {
  name: 'NavBar',
  methods: {
    logout() {
      this.$store.dispatch('logout/logout')
    }
  }
}
</script>

<style>

</style>