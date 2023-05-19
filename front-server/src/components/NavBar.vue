<template>
  <div>
    <nav class="navbar navbar-expand-lg navbar-light" id="mainNav">
      <div class="container px-4 px-lg-5">
        <router-link :to="{name: 'HomeView'}">Home</router-link> |
        <router-link :to="{name: 'CommentView'}">Comment</router-link> |
        <router-link :to="{name: 'RecommandView'}">Recommand</router-link> |
        <input type="text" @keyup.enter="moveSearchView" v-model.trim="movieTitle">
        <button @click="moveSearchView">검색</button> |
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
  data() {
    return{
      movieTitle: ''
    }
  },
  methods: {
    logout() {
      this.$store.dispatch('logout/logout')
    },

    moveSearchView() {
      if (!this.movieTitle){
        alert('검색 결과가 없습니다.')
        return
      }
      this.$store.dispatch('search/getSearchMovieList', this.movieTitle)
      
      this.$router.push({name : 'SearchView', query : {title : this.movieTitle}})
        .catch(err => {
          // 중복된 네비게이션 오류를 처리합니다.
          if (err.name !== 'NavigationDuplicated') {
            throw err;
          }
        });
      this.movieTitle = ''
    }
  }
}
</script>

<style>

</style>