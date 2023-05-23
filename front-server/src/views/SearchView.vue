<template>
  <div>
    <h3 class="p-3 text-white" style="margin-top: 50px"><b>'{{ $route.query.title }}' 에 대한 검색 결과입니다.</b></h3>
    <div class="p-2" v-if="!searchMovies.length">
      <h5 class="p-3 text-danger"><b>일치하는 검색결과가 없습니다.</b></h5>
      <button @click="moveHome" class="btn btn-light">HOME으로 이동하기</button>
    </div>
    <div v-else class="p-5">
      <MovieItemList :movies="searchMovies"/>
    </div>
    <div></div>
  </div>
</template>

<script>
import MovieItemList from '@/components/MovieItemList.vue'

export default {
  name: 'SearchView',
  components: {
    MovieItemList
  },
  data() {
    return {
    }
  },
  // created() {
  //   this.getSearchMovieList()
  // },
  computed: {
    searchMovies() {
      console.log(this.$store.state.search.searchMovieList)
      return this.$store.state.search.searchMovieList
    }
  },
  methods: {
    moveHome() {
      this.$router.push({name : 'HomeView'})
    }
    // getSearchMovieList() {
    //   const movieTitle = this.$route.query.title
    //   this.$store.dispatch('search/getSearchMovieList', movieTitle)
    // }
  }
}
</script>

<style>

</style>