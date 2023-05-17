<template>
  <div id="app">
    <nav>
      <!-- TODO: 홈 -->
      <router-link to="/">Home</router-link> |
      <!-- TODO: 평론 리스트 -->
      <!-- TODO: 추천 영화 -->
      <!-- TODO: 검색 -->
      <!-- TODO: 프로필 -->
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
