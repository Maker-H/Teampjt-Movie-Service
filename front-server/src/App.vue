<template>
  <div id="app">
    <nav>
      <router-link :to="{name: 'HomeView'}">Home</router-link> |
      <!-- TODO: 평론 리스트 -->
      <router-link :to="{name: 'CommentView'}">Comment</router-link> |
      <router-link :to="{name: 'RecommandView'}">Recommand</router-link> |
      <router-link :to="{name: 'SearchView'}">Search</router-link> |
      <router-link :to="{name: 'ProfileView'}">Profile</router-link>
    </nav>
    <router-view/>
  </div>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>
