<template>
  <div>
    <nav class="navbar navbar-expand-lg navbar-light" id="mainNav">
      <div class="container px-4 px-lg-5">
        <router-link :to="{name: 'HomeView'}">Home</router-link> |
        <router-link :to="{name: 'CommentView'}">Comment</router-link> |
        <router-link :to="{name: 'RecommandView'}">Recommand</router-link> |
        <router-link :to="{name: 'SearchView'}">Search</router-link> |
        <router-link :to="{name: 'ProfileView'}">Profile</router-link>
      </div>
    </nav>
  </div>
</template>

<script>
export default {
  name: 'NavBar',
}
</script>

<style>

</style>