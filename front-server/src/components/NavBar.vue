<template>
  <div>
    <nav>
      <router-link :to="{name: 'HomeView'}">Home</router-link> |
      <router-link :to="{name: 'CommentView'}">Comment</router-link> |
      <router-link :to="{name: 'RecommandView'}">Recommand</router-link> |
      <router-link :to="{name: 'SearchView'}">Search</router-link> |
      <router-link :to="{name: 'ProfileView'}">Profile</router-link>
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